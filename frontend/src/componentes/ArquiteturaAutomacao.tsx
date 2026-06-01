import type React from 'react'

import { arquiteturaAutomacao } from '../dados/arquiteturaAutomacao'
import type { EquipamentoCampo } from '../dados/arquiteturaAutomacao'
import './componentes.css'

type GrupoCampo = Record<string, EquipamentoCampo[]>

export function ArquiteturaAutomacao(): JSX.Element {
  const instrumentosPorFuncao = agruparCampoPorFuncao()
  const redesSupervisaoControle = arquiteturaAutomacao.rede.filter((item) =>
    item.nome.toLowerCase().includes('switch') ||
    item.nome.toLowerCase().includes('scada'),
  )
  const redesControleCampo = arquiteturaAutomacao.rede.filter((item) =>
    item.nome.toLowerCase().includes('sinais') ||
    item.nome.toLowerCase().includes('inversor'),
  )

  return (
    <section
      aria-labelledby="titulo-arquitetura-automacao"
      className="arquitetura__container"
    >
      <header className="arquitetura__cabecalho">
        <p className="arquitetura__subtitulo">Campo, controle e supervisão</p>
        <h2
          className="arquitetura__titulo"
          id="titulo-arquitetura-automacao"
        >
          Arquitetura de Automação
        </h2>
      </header>

      <Camada titulo="Nível de Supervisão" variante="supervisao">
        <ul className="arquitetura__lista arquitetura__lista--grade">
          {arquiteturaAutomacao.supervisao.map((equipamento) => (
            <li className="arquitetura__item" key={equipamento.nome}>
              <strong>{equipamento.nome}</strong>
              <span>{equipamento.descricao}</span>
            </li>
          ))}
        </ul>
        <BadgeSimulado texto="Frontend React com sinóptico, cards e alarmes" />
      </Camada>

      <Conector
        direcao="Dados de processo sobem | comandos descem"
        itens={redesSupervisaoControle}
        titulo="Rede industrial entre supervisão e controle"
      />

      <Camada titulo="Nível de Controle" variante="controle">
        <ul className="arquitetura__lista arquitetura__lista--compacta">
          {arquiteturaAutomacao.controle.map((equipamento) => (
            <li className="arquitetura__item" key={equipamento.nome}>
              <strong>{equipamento.nome}</strong>
              <span>
                {equipamento.descricao} — {equipamento.especificacao}
              </span>
            </li>
          ))}
        </ul>
        <BadgeSimulado texto="Backend Python + Matriz de Causa e Efeito" />
      </Camada>

      <Conector
        direcao="Medições sobem | acionamentos descem"
        itens={redesControleCampo}
        titulo="Rede / sinais industriais entre controle e campo"
      />

      <Camada titulo="Nível de Campo" variante="campo">
        <div className="arquitetura__grupos-campo">
          {Object.entries(instrumentosPorFuncao).map(([funcao, instrumentos]) => (
            <article className="arquitetura__grupo-campo" key={funcao}>
              <h4>{funcao}</h4>
              <ul className="arquitetura__lista arquitetura__lista--tags">
                {instrumentos.map((instrumento) => (
                  <li className="arquitetura__item" key={instrumento.tag}>
                    <strong>{instrumento.tag}</strong>
                    <span>{instrumento.descricao}</span>
                    <em>{instrumento.tipoSinal}</em>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <BadgeSimulado texto="Modelo de planta no backend Python" />
      </Camada>

      <aside className="arquitetura__legenda" aria-label="Equivalência didática">
        <h3>Sistema real x sistema simulado</h3>
        <ul className="arquitetura__equivalencias">
          {arquiteturaAutomacao.equivalenciaSimulado.map((par) => (
            <li className="arquitetura__equivalencia" key={par.sistemaReal}>
              <span>{par.sistemaReal}</span>
              <strong>{par.sistemaSimulado}</strong>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  )
}

function Camada({
  children,
  titulo,
  variante,
}: {
  children: React.ReactNode
  titulo: string
  variante: 'supervisao' | 'controle' | 'campo'
}): JSX.Element {
  return (
    <section
      className={`arquitetura__camada arquitetura__camada--${variante}`}
      aria-label={titulo}
    >
      <span className="arquitetura__camada-label">{titulo}</span>
      {children}
    </section>
  )
}

function Conector({
  direcao,
  itens,
  titulo,
}: {
  direcao: string
  itens: typeof arquiteturaAutomacao.rede
  titulo: string
}): JSX.Element {
  return (
    <div className="arquitetura__conector" aria-label={titulo}>
      <span className="arquitetura__seta" aria-hidden="true">
        ↕
      </span>
      <div className="arquitetura__rede">
        <strong>{titulo}</strong>
        <span>{direcao}</span>
        <ul className="arquitetura__rede-lista">
          {itens.map((item) => (
            <li key={item.nome}>
              {item.nome}: {item.protocolo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function BadgeSimulado({ texto }: { texto: string }): JSX.Element {
  return (
    <p className="arquitetura__badge-simulado">
      Simulado por: <strong>{texto}</strong>
    </p>
  )
}

function agruparCampoPorFuncao(): GrupoCampo {
  return arquiteturaAutomacao.campo.reduce<GrupoCampo>((grupos, item) => {
    const grupoAtual = grupos[item.funcao] ?? []
    return {
      ...grupos,
      [item.funcao]: [...grupoAtual, item],
    }
  }, {})
}
