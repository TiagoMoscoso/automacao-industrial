import './componentes.css'

interface CenarioVisual {
  nome: string
  valor: string
  emergencia?: boolean
}

interface PropriedadesPainelCenarios {
  onAcionarCenario: (nome: string) => void
}

const cenarios: CenarioVisual[] = [
  { nome: 'Operação Normal', valor: 'operacao_normal' },
  { nome: 'Nível Alto-Alto', valor: 'nivel_alto_alto' },
  { nome: 'Nível Baixo-Baixo', valor: 'nivel_baixo_baixo' },
  { nome: 'pH Fora da Faixa', valor: 'ph_fora_da_faixa' },
  { nome: 'Turbidez Alta', valor: 'turbidez_alta' },
  { nome: 'Emergência', valor: 'emergencia', emergencia: true },
]

export function PainelCenarios({
  onAcionarCenario,
}: PropriedadesPainelCenarios): JSX.Element {
  return (
    <section className="painel-cenarios" aria-labelledby="titulo-cenarios">
      <h2 id="titulo-cenarios">Cenários</h2>
      <div className="lista-cenarios">
        {cenarios.map((cenario) => (
          <button
            className={
              cenario.emergencia
                ? 'botao-cenario botao-cenario--emergencia'
                : 'botao-cenario'
            }
            key={cenario.valor}
            onClick={() => onAcionarCenario(cenario.valor)}
            type="button"
          >
            {cenario.nome}
          </button>
        ))}
      </div>
    </section>
  )
}
