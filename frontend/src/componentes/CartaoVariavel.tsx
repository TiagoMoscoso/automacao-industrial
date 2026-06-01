import './componentes.css'

export type EstadoCartaoVariavel = 'normal' | 'alerta' | 'falha'

interface PropriedadesCartaoVariavel {
  tag: string
  nome: string
  valor: number | string
  unidade: string
  estado: EstadoCartaoVariavel
  descricao?: string
}

const rotulosEstado: Record<EstadoCartaoVariavel, string> = {
  normal: 'Normal',
  alerta: 'Alerta',
  falha: 'Falha',
}

export function CartaoVariavel({
  tag,
  nome,
  valor,
  unidade,
  estado,
  descricao,
}: PropriedadesCartaoVariavel): JSX.Element {
  return (
    <article className={`cartao-variavel cartao-variavel--${estado}`}>
      <div className="cartao-variavel__tag">{tag}</div>
      {descricao && (
        <span className="cartao-variavel__descricao">{descricao}</span>
      )}
      <div className="cartao-variavel__nome">{nome}</div>
      <div className="cartao-variavel__valor">
        {valor}
        {unidade && (
          <span className="cartao-variavel__unidade"> {unidade}</span>
        )}
      </div>
      <span className="cartao-variavel__estado">{rotulosEstado[estado]}</span>
    </article>
  )
}
