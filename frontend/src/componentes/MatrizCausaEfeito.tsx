import { CAUSAS, EFEITOS, RELACOES } from '../dominio/matrizCausaEfeito';

export function MatrizCausaEfeito() {
  return (
    <section className="matriz-causa-efeito">
      <h2 className="secao-titulo">Matriz de Causa e Efeito</h2>
      <p className="secao-descricao">
        Cada linha representa um evento ou condição de processo detectado pelos instrumentos.
        Cada coluna representa uma ação de controle executada pelo sistema. As células marcadas com{' '}
        <strong>✕</strong> indicam que aquela causa dispara aquele efeito — correspondendo
        diretamente à lógica implementada em{' '}
        <code>controle/regras_causa_efeito.py</code> e{' '}
        <code>controle/matriz_causa_efeito.py</code> no backend.
      </p>

      <div className="matriz-container">
        <table className="matriz-tabela">
          <thead>
            <tr>
              <th className="matriz-celula-vazia" />
              {EFEITOS.map((efeito) => (
                <th key={efeito.id} className="matriz-cabecalho-coluna">
                  <div className="matriz-cabecalho-texto">
                    <span className="matriz-efeito-label">{efeito.label}</span>
                    {efeito.tagEquipamento !== '—' && (
                      <span className="matriz-tag">{efeito.tagEquipamento}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CAUSAS.map((causa, ci) => (
              <tr key={causa.id} className="matriz-linha">
                <td className="matriz-celula-causa">
                  <span className="matriz-causa-label">{causa.label}</span>
                  <span className="matriz-alarme-ref">{causa.alarmeBackend}</span>
                </td>
                {EFEITOS.map((efeito, ei) => (
                  <td
                    key={efeito.id}
                    className={`matriz-celula-relacao ${RELACOES[ci][ei] ? 'matriz-ativo' : 'matriz-inativo'}`}
                    aria-label={
                      RELACOES[ci][ei]
                        ? `${causa.label} aciona: ${efeito.label}`
                        : undefined
                    }
                  >
                    {RELACOES[ci][ei] ? '✕' : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="matriz-legenda">
        <h3 className="legenda-titulo">Legenda</h3>
        <ul className="legenda-lista">
          <li>
            <span className="legenda-simbolo ativo">✕</span>
            <span>Relação ativa — a causa dispara o efeito</span>
          </li>
          <li>
            <span className="legenda-simbolo inativo" />
            <span>Sem relação — a causa não dispara o efeito</span>
          </li>
          <li>
            <span className="legenda-tag-exemplo">P-101</span>
            <span>Tag do equipamento acionado, conforme nomenclatura ISA 5.1</span>
          </li>
          <li>
            <span className="legenda-codigo">EMERGENCIA</span>
            <span>Identificador do alarme correspondente no backend Python</span>
          </li>
        </ul>
        <p className="legenda-nota">
          Requisito 5 do trabalho: esta matriz é o espelho visual do algoritmo de controle.
          Cada "✕" corresponde a uma regra na função{' '}
          <code>avaliar_condicoes()</code> em <code>regras_causa_efeito.py</code>.
        </p>
      </div>
    </section>
  );
}
