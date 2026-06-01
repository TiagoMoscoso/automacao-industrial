import './componentes.css'

interface PropriedadesControleSimulacao {
  simulacaoAtiva: boolean
  onIniciar: () => void
  onPausar: () => void
  onReiniciar: () => void
}

export function ControleSimulacao({
  simulacaoAtiva,
  onIniciar,
  onPausar,
  onReiniciar,
}: PropriedadesControleSimulacao): JSX.Element {
  return (
    <section
      className="controle-simulacao"
      aria-labelledby="titulo-controle-simulacao"
    >
      <h2 id="titulo-controle-simulacao">Simulação</h2>
      <div className="botoes-simulacao">
        <button
          className="botao-simulacao"
          disabled={simulacaoAtiva}
          onClick={onIniciar}
          type="button"
        >
          Iniciar
        </button>
        <button
          className="botao-simulacao"
          disabled={!simulacaoAtiva}
          onClick={onPausar}
          type="button"
        >
          Pausar
        </button>
        <button
          className="botao-simulacao"
          onClick={onReiniciar}
          type="button"
        >
          Reiniciar
        </button>
      </div>
    </section>
  )
}
