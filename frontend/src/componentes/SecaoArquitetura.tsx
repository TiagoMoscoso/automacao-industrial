import { arquiteturaAutomacao } from '../dados/arquiteturaAutomacao'
import { ArquiteturaAutomacao } from './ArquiteturaAutomacao'
import './componentes.css'

export function SecaoArquitetura(): JSX.Element {
  return (
    <section
      aria-labelledby="titulo-secao-arquitetura"
      className="secao-arquitetura__container"
    >
      <header className="secao-arquitetura__cabecalho">
        <p className="secao-arquitetura__subtitulo">Requisito acadêmico 4</p>
        <h2
          className="secao-arquitetura__titulo"
          id="titulo-secao-arquitetura"
        >
          Arquitetura de Automação
        </h2>
        <p className="secao-arquitetura__definicao">
          A arquitetura de automação define como instrumentos, controladores,
          redes e sistemas supervisórios se organizam para medir, controlar e
          supervisionar um processo industrial. Nesta planta, ela separa o que
          acontece no campo, no controle e na supervisão da simulação.
        </p>
      </header>

      <details className="secao-arquitetura__detalhe">
        <summary>Ver explicação detalhada por nível</summary>
        <div className="secao-arquitetura__niveis">
          <article className="secao-arquitetura__nivel">
            <h3>Nível de Campo</h3>
            <p>
              É formado pelos instrumentos que medem vazão, pressão, nível,
              temperatura e qualidade da água, além dos atuadores como bombas e
              válvulas. Esses equipamentos interagem diretamente com o processo
              físico e enviam sinais ao CLP.
            </p>
          </article>

          <article className="secao-arquitetura__nivel">
            <h3>Nível de Controle</h3>
            <p>
              É composto pelo CLP e seus módulos de entrada e saída. Ele recebe
              sinais de campo, executa a lógica de controle e intertravamento, e
              devolve comandos para os atuadores.
            </p>
          </article>

          <article className="secao-arquitetura__nivel">
            <h3>Nível de Supervisão</h3>
            <p>
              É a camada de operação, formada por IHM, SCADA, alarmes e
              histórico de dados. Nela o operador acompanha variáveis, alarmes,
              estados dos equipamentos e comandos da planta.
            </p>
          </article>

          <article className="secao-arquitetura__nivel">
            <h3>Rede Industrial</h3>
            <p>
              A rede conecta campo, controle e supervisão por protocolos e
              sinais industriais, como 4-20 mA, HART, Modbus TCP, Profinet ou
              EtherNet/IP. No simulador, essa troca é representada pela API HTTP
              entre frontend e backend.
            </p>
          </article>
        </div>
      </details>

      <ArquiteturaAutomacao />

      <section
        aria-labelledby="titulo-equivalencia-arquitetura"
        className="secao-arquitetura__equivalencia"
      >
        <h3 id="titulo-equivalencia-arquitetura">
          Sistema Real x Sistema Simulado
        </h3>
        <div className="secao-arquitetura__tabela-wrapper">
          <table className="secao-arquitetura__tabela">
            <thead>
              <tr>
                <th>Sistema industrial real</th>
                <th>Sistema web simulado</th>
              </tr>
            </thead>
            <tbody>
              {arquiteturaAutomacao.equivalenciaSimulado.map((par) => (
                <tr key={par.sistemaReal}>
                  <td>{par.sistemaReal}</td>
                  <td>{par.sistemaSimulado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}
