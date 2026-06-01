import { TipoAlarme, type Alarme } from '../dominio/alarme'
import './componentes.css'

interface PropriedadesPainelAlarmes {
  alarmes: Alarme[]
  processoLiberado: boolean
}

const ALARMES_CRITICOS = new Set<TipoAlarme>([
  TipoAlarme.Emergencia,
  TipoAlarme.NivelAltoAlto,
])

export function PainelAlarmes({
  alarmes,
  processoLiberado,
}: PropriedadesPainelAlarmes): JSX.Element {
  const classeEstado = processoLiberado
    ? 'estado-processo--liberado'
    : 'estado-processo--bloqueado'
  const textoEstado = processoLiberado ? 'LIBERADO' : 'BLOQUEADO'

  return (
    <section className="painel-alarmes" aria-labelledby="titulo-alarmes">
      <h2 id="titulo-alarmes">Alarmes</h2>
      <span className={`estado-processo ${classeEstado}`}>
        Processo {textoEstado}
      </span>

      {alarmes.length === 0 ? (
        <p className="sem-alarmes">Sem alarmes ativos</p>
      ) : (
        <div className="lista-alarmes">
          {alarmes.map((alarme) => (
            <article
              className={
                ALARMES_CRITICOS.has(alarme.tipo)
                  ? 'alarme-item alarme-item--critico'
                  : 'alarme-item'
              }
              key={`${alarme.tipo}-${alarme.timestamp}`}
            >
              <strong>{alarme.tipo}</strong>
              <p>{alarme.mensagem}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
