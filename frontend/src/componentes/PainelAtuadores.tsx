import type { AcoesControle } from '../dominio/acoesControle'
import './componentes.css'

interface AtuadorVisual {
  tag: string
  nome: string
  ativo: boolean
  textoAtivo: string
  textoInativo: string
  detalhe?: string
}

interface PropriedadesPainelAtuadores {
  acoes: AcoesControle
}

export function PainelAtuadores({
  acoes,
}: PropriedadesPainelAtuadores): JSX.Element {
  const abertura = acoes.aberturaValvulaEntradaComandadaPercentual
  const atuadores: AtuadorVisual[] = [
    {
      tag: 'P-101',
      nome: 'Bomba principal',
      ativo: acoes.bombaPrincipalLigar,
      textoAtivo: 'Ligada',
      textoInativo: 'Desligada',
    },
    {
      tag: 'P-102',
      nome: 'Bomba de saída',
      ativo: acoes.bombaSaidaLigar,
      textoAtivo: 'Ligada',
      textoInativo: 'Desligada',
    },
    {
      tag: 'P-201',
      nome: 'Bomba dosadora',
      ativo: acoes.bombaDosadoraLigar,
      textoAtivo: 'Ligada',
      textoInativo: 'Desligada',
    },
    {
      tag: 'FV-101',
      nome: 'Válvula de entrada',
      ativo: abertura > 0,
      textoAtivo: 'Aberta',
      textoInativo: 'Fechada',
      detalhe: abertura > 0 ? `${abertura}%` : undefined,
    },
    {
      tag: 'XV-101',
      nome: 'Válvula de descarte',
      ativo: acoes.valvulaDescarteAbrir,
      textoAtivo: 'Aberta',
      textoInativo: 'Fechada',
    },
  ]

  return (
    <section className="painel-atuadores" aria-labelledby="titulo-atuadores">
      <h2 id="titulo-atuadores">Atuadores</h2>
      <div className="lista-atuadores">
        {atuadores.map((atuador) => {
          const classeEstado = atuador.ativo
            ? 'atuador__estado--ativo'
            : 'atuador__estado--inativo'
          return (
            <article className="atuador" key={atuador.tag}>
              <div className="atuador__tag">{atuador.tag}</div>
              <div>{atuador.nome}</div>
              <span className={`atuador__estado ${classeEstado}`}>
                {atuador.ativo ? atuador.textoAtivo : atuador.textoInativo}
              </span>
              {atuador.detalhe ? <div>{atuador.detalhe}</div> : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}
