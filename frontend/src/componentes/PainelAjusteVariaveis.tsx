import { useEffect, useMemo, useRef, useState } from 'react'

import { TipoAlarme } from '../dominio/alarme'
import type { EstadoPlanta } from '../dominio/estadoPlanta'
import { obterMetadados } from '../dominio/equipamentos'
import {
  formatarValorEngenharia,
  obterClasseCssStatus,
  obterLabelStatus,
  obterStatusOperacional,
} from '../dominio/statusVariavel'
import './componentes.css'

interface PropriedadesPainelAjusteVariaveis {
  estadoAtual: EstadoPlanta
  onAlterarVariavel: (campo: string, valor: number | boolean) => void
}

interface ConfiguracaoVariavel {
  tag: string
  nome: string
  campoApi: string
  campoEstado: keyof EstadoPlanta
  unidade: string
  minimo: number
  maximo: number
  passo: number
  alarmesCriticos: TipoAlarme[]
}

const TEMPO_DEBOUNCE_MS = 300

const VARIAVEIS_PROCESSO: ConfiguracaoVariavel[] = [
  {
    tag: 'FIT-101',
    nome: 'Vazão de entrada de água bruta',
    campoApi: 'vazao_entrada_m3h',
    campoEstado: 'vazaoEntradaM3h',
    unidade: 'm3/h',
    minimo: 0,
    maximo: 200,
    passo: 1,
    alarmesCriticos: [],
  },
  {
    tag: 'FIT-102',
    nome: 'Vazão de saída para processo',
    campoApi: 'vazao_saida_m3h',
    campoEstado: 'vazaoSaidaM3h',
    unidade: 'm3/h',
    minimo: 0,
    maximo: 200,
    passo: 1,
    alarmesCriticos: [],
  },
  {
    tag: 'LIT-101',
    nome: 'Nível do tanque de água tratada',
    campoApi: 'nivel_tanque_percentual',
    campoEstado: 'nivelTanquePercentual',
    unidade: '%',
    minimo: 0,
    maximo: 100,
    passo: 1,
    alarmesCriticos: [TipoAlarme.NivelAltoAlto, TipoAlarme.NivelBaixoBaixo],
  },
  {
    tag: 'PIT-101',
    nome: 'Pressão da linha principal',
    campoApi: 'pressao_linha_bar',
    campoEstado: 'pressaoLinhaBar',
    unidade: 'bar',
    minimo: 0,
    maximo: 15,
    passo: 0.1,
    alarmesCriticos: [TipoAlarme.PressaoAlta],
  },
  {
    tag: 'DPIT-101',
    nome: 'Pressão diferencial do filtro',
    campoApi: 'pressao_diferencial_filtro_bar',
    campoEstado: 'pressaoDiferencialFiltroBar',
    unidade: 'bar',
    minimo: 0,
    maximo: 3,
    passo: 0.1,
    alarmesCriticos: [TipoAlarme.FiltroSaturado],
  },
  {
    tag: 'TIT-101',
    nome: 'Temperatura da água',
    campoApi: 'temperatura_agua_c',
    campoEstado: 'temperaturaAguaC',
    unidade: 'C',
    minimo: 0,
    maximo: 80,
    passo: 0.5,
    alarmesCriticos: [],
  },
  {
    tag: 'AIT-101',
    nome: 'pH da água tratada',
    campoApi: 'ph',
    campoEstado: 'ph',
    unidade: 'pH',
    minimo: 0,
    maximo: 14,
    passo: 0.1,
    alarmesCriticos: [TipoAlarme.PhForaDaFaixa],
  },
  {
    tag: 'AIT-102',
    nome: 'Turbidez da água',
    campoApi: 'turbidez_ntu',
    campoEstado: 'turbidezNtu',
    unidade: 'NTU',
    minimo: 0,
    maximo: 20,
    passo: 0.1,
    alarmesCriticos: [TipoAlarme.TurbidezAlta],
  },
  {
    tag: 'AIT-103',
    nome: 'Condutividade da água',
    campoApi: 'condutividade_us_cm',
    campoEstado: 'condutividadeUsCm',
    unidade: 'uS/cm',
    minimo: 0,
    maximo: 2000,
    passo: 10,
    alarmesCriticos: [TipoAlarme.CondutividadeAlta],
  },
  {
    tag: 'FIT-201',
    nome: 'Vazão de dosagem química',
    campoApi: 'vazao_dosagem_l_h',
    campoEstado: 'vazaoDosagemLH',
    unidade: 'L/h',
    minimo: 0,
    maximo: 50,
    passo: 0.5,
    alarmesCriticos: [TipoAlarme.FalhaDosadora],
  },
]

export function PainelAjusteVariaveis({
  estadoAtual,
  onAlterarVariavel,
}: PropriedadesPainelAjusteVariaveis): JSX.Element {
  const temporizadores = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {},
  )
  const valoresIniciais = useMemo(
    () => valoresNumericosDoEstado(estadoAtual),
    [estadoAtual],
  )
  const [valores, setValores] = useState<Record<string, number>>(
    valoresIniciais,
  )

  useEffect(() => {
    setValores(valoresIniciais)
  }, [valoresIniciais])

  useEffect(
    () => () => {
      Object.values(temporizadores.current).forEach(window.clearTimeout)
    },
    [],
  )

  function agendarAlteracao(campo: string, valor: number): void {
    window.clearTimeout(temporizadores.current[campo])
    temporizadores.current[campo] = window.setTimeout(() => {
      onAlterarVariavel(campo, valor)
    }, TEMPO_DEBOUNCE_MS)
  }

  function confirmarAlteracao(campo: string, valor: number): void {
    window.clearTimeout(temporizadores.current[campo])
    onAlterarVariavel(campo, valor)
  }

  function alterarValor(configuracao: ConfiguracaoVariavel, valor: number): void {
    setValores((valoresAtuais) => ({
      ...valoresAtuais,
      [configuracao.campoApi]: valor,
    }))
    agendarAlteracao(configuracao.campoApi, valor)
  }

  function renderizarCardVariavel(configuracao: ConfiguracaoVariavel): JSX.Element {
    const valor = valores[configuracao.campoApi] ?? 0
    const critico = variavelEstaCritica(estadoAtual, configuracao)
    const metadados = obterMetadados(configuracao.tag)
    const status = metadados
      ? obterStatusOperacional(valor, metadados)
      : 'desconhecido'
    const numeroTag = configuracao.tag.split('-')[1]

    return (
      <div
        className={
          critico
            ? 'campo-ajuste campo-ajuste--critico'
            : 'campo-ajuste'
        }
        key={configuracao.tag}
      >
        <div className="campo-ajuste__cabecalho">
          <span className="campo-ajuste__tag">{configuracao.tag}</span>
          <span className={`status-badge ${obterClasseCssStatus(status)}`}>
            {obterLabelStatus(status)}
          </span>
        </div>
        {metadados?.nomeAbreviado && (
          <span className="campo-ajuste__descricao">
            {metadados.nomeAbreviado}
          </span>
        )}
        <span className="campo-ajuste__valor">
          Valor atual: {formatarValorEngenharia(valor, configuracao.unidade)}{' '}
          {configuracao.unidade}
        </span>
        {metadados?.faixaNormal && (
          <span className="campo-ajuste__faixa">
            Faixa normal: {metadados.faixaNormal.min}–{metadados.faixaNormal.max}{' '}
            {configuracao.unidade}
          </span>
        )}
        {metadados?.impactoOperacional && (
          <p className="campo-ajuste__impacto">
            {metadados.impactoOperacional}
          </p>
        )}
        <input
          aria-invalid={critico}
          aria-label={`Ajustar ${configuracao.tag}`}
          max={configuracao.maximo}
          min={configuracao.minimo}
          onChange={(evento) => {
            alterarValor(configuracao, Number(evento.target.value))
          }}
          onKeyDown={(evento) => {
            if (evento.key === 'Enter') {
              confirmarAlteracao(configuracao.campoApi, valor)
            }
          }}
          step={configuracao.passo}
          type="range"
          value={valor}
        />
        {critico ? (
          <span className="campo-ajuste__alarme">Alarme ativo</span>
        ) : null}
        {metadados?.explicacaoTag && (
          <details className="campo-ajuste__details">
            <summary>Entenda esta tag ▾</summary>
            <div className="campo-ajuste__explicacao">
              <span>
                <strong>{metadados.explicacaoTag.prefixo}</strong> ={' '}
                {metadados.explicacaoTag.significadoPrefixo}
              </span>
              <span>
                Português: {metadados.explicacaoTag.significadoPortugues}
              </span>
              <span>
                {numeroTag} = {metadados.explicacaoTag.significadoNumero}
              </span>
              {metadados.tipoSinal && (
                <span>Sinal: {metadados.tipoSinal}</span>
              )}
              {metadados.nivelArquitetura && (
                <span>Camada: {metadados.nivelArquitetura}</span>
              )}
              {metadados.efeitoAumento && (
                <span>↑ Aumentar: {metadados.efeitoAumento}</span>
              )}
              {metadados.efeitoDiminuicao && (
                <span>↓ Diminuir: {metadados.efeitoDiminuicao}</span>
              )}
              {metadados.dicaOperador && (
                <span>💡 {metadados.dicaOperador}</span>
              )}
            </div>
          </details>
        )}
      </div>
    )
  }

  return (
    <section
      className="painel-ajuste-variaveis"
      aria-labelledby="titulo-ajuste-variaveis"
    >
      <h2 id="titulo-ajuste-variaveis">Ajuste manual de variáveis</h2>

      <div className="ajuste-variaveis__introducao">
        <p>
          Esta área permite alterar manualmente variáveis simuladas da planta. Em uma
          planta real, esses valores seriam lidos de sensores e transmissores no nível
          de campo. Aqui, os sliders permitem simular diferentes condições operacionais
          para observar impactos no processo, alarmes e intertravamentos.
        </p>
        <p className="ajuste-variaveis__nota-didatica">
          Os valores e faixas são didáticos e servem para demonstração acadêmica.
        </p>
      </div>

      <details className="ajuste-variaveis__guia-tags">
        <summary>Como ler as tags industriais? ▾</summary>
        <div className="ajuste-variaveis__guia-conteudo">
          <p>
            A primeira parte da tag indica o tipo de variável ou equipamento.
            A parte numérica identifica a malha, área ou sequência do equipamento.
          </p>

          <table className="ajuste-variaveis__tabela-prefixos">
            <thead>
              <tr>
                <th>Prefixo</th>
                <th>Significado (EN)</th>
                <th>Português</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>F</td><td>Flow</td><td>Vazão</td></tr>
              <tr><td>L</td><td>Level</td><td>Nível</td></tr>
              <tr><td>P</td><td>Pressure</td><td>Pressão</td></tr>
              <tr><td>T</td><td>Temperature</td><td>Temperatura</td></tr>
              <tr><td>A</td><td>Analyzer</td><td>Analisador</td></tr>
              <tr><td>DP</td><td>Differential Pressure</td><td>Pressão diferencial</td></tr>
              <tr><td>I</td><td>Indicating</td><td>Indicador</td></tr>
              <tr><td>T (sufixo)</td><td>Transmitter</td><td>Transmissor</td></tr>
            </tbody>
          </table>

          <p>No simulador, os números identificam a área:</p>
          <ul>
            <li><strong>101</strong> — equipamentos da linha principal de tratamento</li>
            <li><strong>201</strong> — equipamentos do sistema de dosagem química</li>
          </ul>

          <p><strong>Exemplos:</strong></p>
          <ul>
            <li>
              <strong>FIT-101</strong>: F=Vazão, I=Indicador, T=Transmissor,
              101=linha principal
            </li>
            <li>
              <strong>LIT-101</strong>: L=Nível, I=Indicador, T=Transmissor,
              101=tanque principal
            </li>
            <li>
              <strong>DPIT-101</strong>: DP=Pressão diferencial, I=Indicador,
              T=Transmissor, 101=filtro da linha principal
            </li>
            <li>
              <strong>AIT-101</strong>: A=Analisador, I=Indicador, T=Transmissor,
              101=ponto de análise (pH)
            </li>
            <li>
              <strong>FIT-201</strong>: F=Vazão, I=Indicador, T=Transmissor,
              201=sistema de dosagem química
            </li>
          </ul>

          <p className="ajuste-variaveis__nota-didatica">
            A numeração acima é uma simplificação didática inspirada em convenções
            industriais (como a ISA-5.1), não uma norma completa de engenharia de
            planta.
          </p>
        </div>
      </details>

      <div className="ajuste-variaveis__grade">
        {VARIAVEIS_PROCESSO.map(renderizarCardVariavel)}
      </div>
      <label
        className={
          estadoAtual.emergenciaAcionada
            ? 'ajuste-emergencia ajuste-emergencia--ativo'
            : 'ajuste-emergencia'
        }
      >
        <input
          checked={estadoAtual.emergenciaAcionada}
          onChange={(evento) => {
            onAlterarVariavel('emergencia_acionada', evento.target.checked)
          }}
          type="checkbox"
        />
        Emergência acionada
      </label>
    </section>
  )
}

function valoresNumericosDoEstado(estado: EstadoPlanta): Record<string, number> {
  return Object.fromEntries(
    VARIAVEIS_PROCESSO.map((configuracao) => [
      configuracao.campoApi,
      Number(estado[configuracao.campoEstado]),
    ]),
  )
}

function variavelEstaCritica(
  estado: EstadoPlanta,
  configuracao: ConfiguracaoVariavel,
): boolean {
  return configuracao.alarmesCriticos.some((tipo) =>
    estado.alarmes.some((alarme) => alarme.tipo === tipo),
  )
}

