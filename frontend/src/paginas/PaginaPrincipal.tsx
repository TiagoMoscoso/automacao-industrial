import { useCallback, useEffect, useState } from 'react'

import { CartaoVariavel } from '../componentes/CartaoVariavel'
import type { EstadoCartaoVariavel } from '../componentes/CartaoVariavel'
import { MatrizCausaEfeito } from '../componentes/MatrizCausaEfeito'
import { PainelAjusteVariaveis } from '../componentes/PainelAjusteVariaveis'
import { PainelAlarmes } from '../componentes/PainelAlarmes'
import { PainelAtuadores } from '../componentes/PainelAtuadores'
import { PainelCenarios } from '../componentes/PainelCenarios'
import { PidConceitual } from '../componentes/PidConceitual'
import { SinoticoPlanta } from '../componentes/SinoticoPlanta'
import { obterMetadados } from '../dominio/equipamentos'
import { TipoAlarme } from '../dominio/alarme'
import type { EstadoPlanta } from '../dominio/estadoPlanta'
import * as clienteApiPlanta from '../servicos/clienteApiPlanta'
import '../estilos/principal.css'

type AbaAtiva = 'supervisorio' | 'documentacao'

const INTERVALO_POLLING_MS = 1000

export function PaginaPrincipal(): JSX.Element {
  const [estado, setEstado] = useState<EstadoPlanta>(estadoInicialPlanta)
  const [mensagemErro, setMensagemErro] = useState<string | null>(null)
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('supervisorio')

  const atualizarEstado = useCallback(async (): Promise<void> => {
    try {
      const estadoAtualizado = await clienteApiPlanta.obterEstado()
      setEstado(estadoAtualizado)
      setMensagemErro(null)
    } catch (erro) {
      setMensagemErro(mensagemErroApi(erro))
    }
  }, [])

  useEffect(() => {
    void atualizarEstado()
    const identificador = window.setInterval(() => {
      void atualizarEstado()
    }, INTERVALO_POLLING_MS)

    return () => {
      window.clearInterval(identificador)
    }
  }, [atualizarEstado])

  async function acionarCenario(nome: string): Promise<void> {
    try {
      const estadoAtualizado = await clienteApiPlanta.aplicarCenario(nome)
      setEstado(estadoAtualizado)
      setMensagemErro(null)
    } catch (erro) {
      setMensagemErro(mensagemErroApi(erro))
    }
  }

  async function alterarVariavel(
    campo: string,
    valor: number | boolean,
  ): Promise<void> {
    try {
      const estadoAtualizado = await clienteApiPlanta.alterarVariaveis(
        { [campo]: valor },
      )
      setEstado(estadoAtualizado)
      setMensagemErro(null)
    } catch (erro) {
      setMensagemErro(mensagemErroApi(erro))
    }
  }

  return (
    <main className="pagina-principal">
      <header className="cabecalho-principal">
        <div>
          <p className="cabecalho-principal__subtitulo">
            IHM supervisória didática
          </p>
          <h1>Automação Industrial: Tratamento de Água</h1>
        </div>
        <span
          className={
            estado.processoLiberado
              ? 'indicador-global indicador-global--normal'
              : 'indicador-global indicador-global--falha'
          }
        >
          Processo {estado.processoLiberado ? 'liberado' : 'bloqueado'}
        </span>
      </header>

      {mensagemErro ? (
        <div className="mensagem-erro" role="alert">
          {mensagemErro}
        </div>
      ) : null}

      <nav className="navegacao-abas" role="tablist">
        <button
          role="tab"
          aria-selected={abaAtiva === 'supervisorio'}
          className={`aba-botao ${abaAtiva === 'supervisorio' ? 'aba-botao--ativa' : ''}`}
          onClick={() => setAbaAtiva('supervisorio')}
        >
          Supervisório
        </button>
        <button
          role="tab"
          aria-selected={abaAtiva === 'documentacao'}
          className={`aba-botao ${abaAtiva === 'documentacao' ? 'aba-botao--ativa' : ''}`}
          onClick={() => setAbaAtiva('documentacao')}
        >
          Documentação Técnica
        </button>
      </nav>

      {abaAtiva === 'supervisorio' && (
        <section className="grade-supervisoria">
          <div className="area-sinotico">
            <SinoticoPlanta estado={estado} />
          </div>

          <div className="area-lateral">
            <PainelAlarmes
              alarmes={estado.alarmes}
              processoLiberado={estado.processoLiberado}
            />
            <PainelAtuadores acoes={estado} />
            <PainelCenarios
              onAcionarCenario={(nome) => {
                void acionarCenario(nome)
              }}
            />
          </div>

          <section className="painel-variaveis" aria-labelledby="titulo-variaveis">
            <h2 id="titulo-variaveis">Variáveis de processo</h2>
            <div className="grade-variaveis">
              {variaveisProcesso(estado).map((variavel) => (
                <CartaoVariavel
                  descricao={obterMetadados(variavel.tag)?.nomeAbreviado}
                  estado={variavel.estado}
                  key={variavel.tag}
                  nome={variavel.nome}
                  tag={variavel.tag}
                  unidade={variavel.unidade}
                  valor={variavel.valor}
                />
              ))}
            </div>
          </section>

          <div className="area-ajuste">
            <PainelAjusteVariaveis
              estadoAtual={estado}
              onAlterarVariavel={(campo, valor) => {
                void alterarVariavel(campo, valor)
              }}
            />
          </div>
        </section>
      )}

      {abaAtiva === 'documentacao' && (
        <div className="documentacao-tecnica">
          <p className="documentacao-intro">
            Esta aba apresenta os documentos técnicos que fundamentam a lógica de controle da planta simulada.
            A <strong>Matriz de Causa e Efeito</strong> é o espelho visual do algoritmo implementado em{' '}
            <code>controle/regras_causa_efeito.py</code>. O <strong>P&amp;ID Conceitual</strong> representa
            a disposição dos equipamentos e instrumentos seguindo a norma ISA 5.1 simplificada.
          </p>
          <PidConceitual />
          <MatrizCausaEfeito />
        </div>
      )}
    </main>
  )
}

interface VariavelProcesso {
  tag: string
  nome: string
  valor: number | string
  unidade: string
  estado: EstadoCartaoVariavel
}

function variaveisProcesso(estado: EstadoPlanta): VariavelProcesso[] {
  return [
    variavel('FIT-101', 'Vazão de entrada', estado.vazaoEntradaM3h, 'm3/h'),
    variavel('FIT-102', 'Vazão de saída', estado.vazaoSaidaM3h, 'm3/h'),
    variavel('LIT-101', 'Nível do tanque', estado.nivelTanquePercentual, '%'),
    variavel('PIT-101', 'Pressão da linha', estado.pressaoLinhaBar, 'bar'),
    variavel(
      'DPIT-101',
      'Diferencial do filtro',
      estado.pressaoDiferencialFiltroBar,
      'bar',
    ),
    variavel('TIT-101', 'Temperatura da água', estado.temperaturaAguaC, 'C'),
    variavel('AIT-101', 'pH', estado.ph, ''),
    variavel('AIT-102', 'Turbidez', estado.turbidezNtu, 'NTU'),
    variavel(
      'AIT-103',
      'Condutividade',
      estado.condutividadeUsCm,
      'uS/cm',
    ),
    variavel('FIT-201', 'Dosagem química', estado.vazaoDosagemLH, 'L/h'),
  ].map((item) => ({
    ...item,
    estado: estadoVariavel(item.tag, item.valor, estado),
  }))
}

function variavel(
  tag: string,
  nome: string,
  valor: number | string,
  unidade: string,
): Omit<VariavelProcesso, 'estado'> {
  return { tag, nome, valor, unidade }
}

function estadoVariavel(
  tag: string,
  valor: number | string,
  estado: EstadoPlanta,
): EstadoCartaoVariavel {
  if (estado.emergenciaAcionada || temAlarme(estado, TipoAlarme.Emergencia)) {
    return 'falha'
  }

  if (typeof valor !== 'number') {
    return 'normal'
  }

  const alarmesFalhaPorTag: Record<string, TipoAlarme[]> = {
    'LIT-101': [TipoAlarme.NivelAltoAlto, TipoAlarme.NivelBaixoBaixo],
    'PIT-101': [TipoAlarme.PressaoAlta],
    'DPIT-101': [TipoAlarme.FiltroSaturado],
    'AIT-101': [TipoAlarme.PhForaDaFaixa],
    'AIT-102': [TipoAlarme.TurbidezAlta],
    'AIT-103': [TipoAlarme.CondutividadeAlta],
    'FIT-201': [TipoAlarme.FalhaDosadora],
  }

  if (alarmesFalhaPorTag[tag]?.some((tipo) => temAlarme(estado, tipo))) {
    return 'falha'
  }

  if (
    (tag === 'LIT-101' && (valor >= 90 || valor <= 15)) ||
    (tag === 'PIT-101' && valor >= 7) ||
    (tag === 'DPIT-101' && valor >= 1.2) ||
    (tag === 'AIT-101' && (valor < 6.8 || valor > 8.2)) ||
    (tag === 'AIT-102' && valor >= 4) ||
    (tag === 'AIT-103' && valor >= 1100)
  ) {
    return 'alerta'
  }

  return 'normal'
}

function temAlarme(estado: EstadoPlanta, tipo: TipoAlarme): boolean {
  return estado.alarmes.some((alarme) => alarme.tipo === tipo)
}

function mensagemErroApi(erro: unknown): string {
  if (erro instanceof Error) {
    return `Falha de comunicação com o backend: ${erro.message}`
  }

  return 'Falha de comunicação com o backend.'
}

export const estadoInicialPlanta: EstadoPlanta = {
  vazaoEntradaM3h: 0,
  vazaoSaidaM3h: 0,
  nivelTanquePercentual: 0,
  pressaoLinhaBar: 0,
  pressaoDiferencialFiltroBar: 0,
  temperaturaAguaC: 0,
  ph: 0,
  turbidezNtu: 0,
  condutividadeUsCm: 0,
  vazaoDosagemLH: 0,
  bombaPrincipalLigada: false,
  bombaSaidaLigada: false,
  bombaDosadoraLigada: false,
  aberturaValvulaEntradaPercentual: 0,
  valvulaDescarteAberta: false,
  emergenciaAcionada: false,
  bombaDosadoraEmFalha: false,
  bombaPrincipalLigar: false,
  bombaSaidaLigar: false,
  bombaDosadoraLigar: false,
  aberturaValvulaEntradaComandadaPercentual: 0,
  valvulaDescarteAbrir: false,
  processoLiberado: false,
  alarmes: [],
}
