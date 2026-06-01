// P&ID Conceitual — simbologia inspirada na norma ISA 5.1
// Camadas verticais: instrumentos y≈73 | linha principal y=215 | P-102 y=300-382
//                   descarte y=430 | dosagem y=540 | rodapé y=635
// viewBox 1200×660

export function PidConceitual() {
  return (
    <section className="pid-conceitual">
      <h2 className="secao-titulo">P&amp;ID Conceitual — Planta de Tratamento de Água</h2>
      <p className="secao-descricao">
        Diagrama de Processo e Instrumentação (P&amp;ID) conceitual baseado na norma ISA 5.1.
        Representa os principais equipamentos, instrumentos e fluxos da planta simulada.
      </p>

      <div className="pid-container">
        <svg
          viewBox="0 0 1200 660"
          xmlns="http://www.w3.org/2000/svg"
          className="pid-svg"
          role="img"
          aria-label="P&ID conceitual da planta de tratamento de água"
        >
          <defs>
            <marker id="seta" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#8aabca" />
            </marker>
            <marker id="seta-sinal" markerWidth="6" markerHeight="6" refX="5" refY="2.5" orient="auto">
              <path d="M0,0 L0,5 L6,2.5 z" fill="#5a7a9a" />
            </marker>
            <marker id="seta-sec" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#5a7a9a" />
            </marker>
          </defs>

          {/* ── Fundo ── */}
          <rect width="1200" height="660" fill="#111820" rx="8" />

          {/* ══ RÓTULOS DE SEÇÃO ══ */}
          <text x="12" y="34" fill="#3a5a7a" fontSize="11" fontFamily="monospace">LINHA PRINCIPAL</text>
          <line x1="12" y1="40" x2="1188" y2="40" stroke="#1e3048" strokeWidth="1" />
          <text x="12" y="420" fill="#2a4a5a" fontSize="11" fontFamily="monospace">DESCARTE</text>
          <line x1="12" y1="426" x2="500" y2="426" stroke="#1e3048" strokeWidth="1" />
          <text x="12" y="500" fill="#2a4a5a" fontSize="11" fontFamily="monospace">DOSAGEM QUÍMICA</text>
          <line x1="12" y1="506" x2="700" y2="506" stroke="#1e3048" strokeWidth="1" />

          {/* ══════════════════════════════════════════
              LINHA PRINCIPAL DE PROCESSO (y = 215)
          ══════════════════════════════════════════ */}

          {/* Segmentos da linha principal */}
          <line x1="125" y1="215" x2="192" y2="215" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          <line x1="222" y1="215" x2="267" y2="215" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          <line x1="307" y1="215" x2="382" y2="215" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          <line x1="438" y1="215" x2="528" y2="215" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          <line x1="593" y1="215" x2="745" y2="215" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          <line x1="840" y1="215" x2="902" y2="215" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          <line x1="942" y1="215" x2="1120" y2="215" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />

          {/* ── TK-101 Tanque de Entrada ── */}
          <g transform="translate(30, 168)">
            <rect x="0" y="0" width="95" height="95" rx="4" fill="#182431" stroke="#3a6a9a" strokeWidth="2" />
            <path d="M0,12 Q47,-12 95,12" fill="none" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="0" y1="12" x2="0" y2="0" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="95" y1="12" x2="95" y2="0" stroke="#3a6a9a" strokeWidth="2" />
            <text x="47" y="50" textAnchor="middle" fill="#8aabca" fontSize="13" fontWeight="bold">TK-101</text>
            <text x="47" y="66" textAnchor="middle" fill="#6a8aaa" fontSize="11">Tanque de</text>
            <text x="47" y="80" textAnchor="middle" fill="#6a8aaa" fontSize="11">Entrada</text>
          </g>

          {/* ── FV-101 Válvula de Controle ── */}
          <g transform="translate(192, 203)">
            <polygon points="0,12 16,0 16,24" fill="#2a4a6a" stroke="#5a9acf" strokeWidth="1.5" />
            <polygon points="30,12 14,0 14,24" fill="#2a4a6a" stroke="#5a9acf" strokeWidth="1.5" />
            <line x1="15" y1="0" x2="15" y2="-16" stroke="#5a9acf" strokeWidth="1.5" />
            <circle cx="15" cy="-25" r="11" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="15" y="-21" textAnchor="middle" fill="#8aabca" fontSize="9" fontWeight="bold">FC</text>
            <text x="15" y="40" textAnchor="middle" fill="#8aabca" fontSize="12" fontWeight="bold">FV-101</text>
          </g>

          {/* ── FIT-101 Transmissor de Vazão de Entrada ── */}
          <g transform="translate(267, 195)">
            <circle cx="20" cy="20" r="20" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="20" y="17" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">FIT</text>
            <text x="20" y="28" textAnchor="middle" fill="#8aabca" fontSize="10">101</text>
            <text x="20" y="54" textAnchor="middle" fill="#6a8aaa" fontSize="11">m³/h</text>
          </g>

          {/* ── P-101 Bomba Principal ── */}
          <g transform="translate(382, 187)">
            <circle cx="28" cy="28" r="28" fill="#182431" stroke="#25a45a" strokeWidth="2.5" />
            <polygon points="15,11 15,45 43,28" fill="#25a45a" opacity="0.75" />
            <text x="28" y="70" textAnchor="middle" fill="#8aabca" fontSize="12" fontWeight="bold">P-101</text>
            <text x="28" y="85" textAnchor="middle" fill="#6a8aaa" fontSize="11">Bomba Principal</text>
          </g>

          {/* ── P-102 Bomba Reserva (abaixo de P-101, mesma coluna) ── */}
          <g transform="translate(382, 300)">
            <circle cx="28" cy="28" r="28" fill="#182431" stroke="#f5b942" strokeWidth="2" />
            <polygon points="15,11 15,45 43,28" fill="#f5b942" opacity="0.65" />
            {/* standby: tracejado de P-102 topo até P-101 base */}
            <line x1="28" y1="0" x2="28" y2="-57" stroke="#5a7a9a" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#seta-sinal)" />
            <text x="28" y="70" textAnchor="middle" fill="#8aabca" fontSize="12" fontWeight="bold">P-102</text>
            <text x="28" y="85" textAnchor="middle" fill="#6a8aaa" fontSize="11">Bomba Reserva</text>
            <text x="28" y="100" textAnchor="middle" fill="#3a5a7a" fontSize="10">(standby)</text>
          </g>

          {/* ── F-101 Filtro de Processo ── */}
          <g transform="translate(528, 178)">
            <rect x="0" y="0" width="65" height="74" rx="6" fill="#182431" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="10" y1="20" x2="55" y2="20" stroke="#3a6a9a" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="10" y1="31" x2="55" y2="31" stroke="#3a6a9a" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="10" y1="42" x2="55" y2="42" stroke="#3a6a9a" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="10" y1="53" x2="55" y2="53" stroke="#3a6a9a" strokeWidth="1" strokeDasharray="3 2" />
            <text x="32" y="88" textAnchor="middle" fill="#8aabca" fontSize="12" fontWeight="bold">F-101</text>
            <text x="32" y="103" textAnchor="middle" fill="#6a8aaa" fontSize="11">Filtro</text>
          </g>

          {/* ── DPIT-101 acima do Filtro ── */}
          <g transform="translate(543, 108)">
            <circle cx="18" cy="18" r="18" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="18" y="15" textAnchor="middle" fill="#8aabca" fontSize="9" fontWeight="bold">DPIT</text>
            <text x="18" y="26" textAnchor="middle" fill="#8aabca" fontSize="10">101</text>
            <line x1="18" y1="36" x2="18" y2="70" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#seta-sinal)" />
          </g>

          {/* ── TK-102 Tanque de Saída ── */}
          <g transform="translate(745, 168)">
            <rect x="0" y="0" width="95" height="95" rx="4" fill="#182431" stroke="#3a6a9a" strokeWidth="2" />
            <path d="M0,12 Q47,-12 95,12" fill="none" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="0" y1="12" x2="0" y2="0" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="95" y1="12" x2="95" y2="0" stroke="#3a6a9a" strokeWidth="2" />
            <text x="47" y="50" textAnchor="middle" fill="#8aabca" fontSize="13" fontWeight="bold">TK-102</text>
            <text x="47" y="66" textAnchor="middle" fill="#6a8aaa" fontSize="11">Tanque de</text>
            <text x="47" y="80" textAnchor="middle" fill="#6a8aaa" fontSize="11">Saída</text>
          </g>

          {/* ── FIT-102 Transmissor de Vazão de Saída ── */}
          <g transform="translate(902, 195)">
            <circle cx="20" cy="20" r="20" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="20" y="17" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">FIT</text>
            <text x="20" y="28" textAnchor="middle" fill="#8aabca" fontSize="10">102</text>
            <text x="20" y="54" textAnchor="middle" fill="#6a8aaa" fontSize="11">m³/h</text>
          </g>

          {/* Label final: → Processo */}
          <text x="1130" y="219" fill="#8aabca" fontSize="13" fontWeight="bold">Processo</text>

          {/* ══════════════════════════════════════════
              INSTRUMENTOS DE CAMPO (acima — y ≈ 73)
              translate(x, 55): circle center y=73, signal line até y=215
          ══════════════════════════════════════════ */}

          {/* LIT-101 — Nível TK-101 */}
          <g transform="translate(59, 55)">
            <circle cx="18" cy="18" r="18" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="18" y="15" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">LIT</text>
            <text x="18" y="26" textAnchor="middle" fill="#8aabca" fontSize="10">101</text>
            <text x="18" y="-6" textAnchor="middle" fill="#6a8aaa" fontSize="10">Nível %</text>
            <line x1="18" y1="36" x2="18" y2="160" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#seta-sinal)" />
          </g>

          {/* PIT-101 — Pressão linha (antes de P-101) */}
          <g transform="translate(332, 55)">
            <circle cx="18" cy="18" r="18" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="18" y="15" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">PIT</text>
            <text x="18" y="26" textAnchor="middle" fill="#8aabca" fontSize="10">101</text>
            <text x="18" y="-6" textAnchor="middle" fill="#6a8aaa" fontSize="10">bar</text>
            <line x1="18" y1="36" x2="18" y2="160" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#seta-sinal)" />
          </g>

          {/* TIT-101 — Temperatura (após P-101) */}
          <g transform="translate(455, 55)">
            <circle cx="18" cy="18" r="18" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="18" y="15" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">TIT</text>
            <text x="18" y="26" textAnchor="middle" fill="#8aabca" fontSize="10">101</text>
            <text x="18" y="-6" textAnchor="middle" fill="#6a8aaa" fontSize="10">°C</text>
            <line x1="18" y1="36" x2="18" y2="160" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#seta-sinal)" />
          </g>

          {/* AIT-101 — pH (após filtro) */}
          <g transform="translate(628, 55)">
            <circle cx="18" cy="18" r="18" fill="#182431" stroke="#f5b942" strokeWidth="1.5" />
            <text x="18" y="15" textAnchor="middle" fill="#f5b942" fontSize="10" fontWeight="bold">AIT</text>
            <text x="18" y="26" textAnchor="middle" fill="#f5b942" fontSize="10">101</text>
            <text x="18" y="-6" textAnchor="middle" fill="#6a8aaa" fontSize="10">pH</text>
            <line x1="18" y1="36" x2="18" y2="160" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#seta-sinal)" />
          </g>

          {/* AIT-102 — Turbidez (após filtro) */}
          <g transform="translate(718, 55)">
            <circle cx="18" cy="18" r="18" fill="#182431" stroke="#f5b942" strokeWidth="1.5" />
            <text x="18" y="15" textAnchor="middle" fill="#f5b942" fontSize="10" fontWeight="bold">AIT</text>
            <text x="18" y="26" textAnchor="middle" fill="#f5b942" fontSize="10">102</text>
            <text x="18" y="-6" textAnchor="middle" fill="#6a8aaa" fontSize="10">NTU</text>
            <line x1="18" y1="36" x2="18" y2="160" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#seta-sinal)" />
          </g>

          {/* ══════════════════════════════════════════
              LINHA DE DESCARTE (y = 450)
          ══════════════════════════════════════════ */}

          {/* Derivação vertical de TK-101 (base y=263) até linha de descarte */}
          <line x1="77" y1="263" x2="77" y2="450" stroke="#5a7a9a" strokeWidth="2" />
          {/* Linha horizontal de descarte */}
          <line x1="77" y1="450" x2="188" y2="450" stroke="#5a7a9a" strokeWidth="2" markerEnd="url(#seta-sec)" />

          {/* XV-101 Válvula de Descarte */}
          <g transform="translate(188, 438)">
            <polygon points="0,12 16,0 16,24" fill="#2a2a3a" stroke="#d94b4b" strokeWidth="1.5" />
            <polygon points="30,12 14,0 14,24" fill="#2a2a3a" stroke="#d94b4b" strokeWidth="1.5" />
            <line x1="15" y1="0" x2="15" y2="-16" stroke="#d94b4b" strokeWidth="1.5" />
            <circle cx="15" cy="-25" r="11" fill="#182431" stroke="#d94b4b" strokeWidth="1.5" />
            <text x="15" y="-21" textAnchor="middle" fill="#d94b4b" fontSize="9" fontWeight="bold">XS</text>
            <text x="15" y="40" textAnchor="middle" fill="#8aabca" fontSize="12" fontWeight="bold">XV-101</text>
            <text x="15" y="55" textAnchor="middle" fill="#6a8aaa" fontSize="11">Descarte</text>
          </g>

          {/* Continuação descarte */}
          <line x1="220" y1="450" x2="360" y2="450" stroke="#5a7a9a" strokeWidth="2" markerEnd="url(#seta-sec)" />
          <text x="372" y="454" fill="#6a8aaa" fontSize="12">Descarte</text>

          {/* ══════════════════════════════════════════
              LINHA DE DOSAGEM QUÍMICA (y ≈ 548)
          ══════════════════════════════════════════ */}

          {/* TK-201 Tanque de Dosagem */}
          <g transform="translate(310, 522)">
            <rect x="0" y="0" width="68" height="55" rx="4" fill="#182431" stroke="#3a5a7a" strokeWidth="1.5" />
            <text x="34" y="26" textAnchor="middle" fill="#8aabca" fontSize="12" fontWeight="bold">TK-201</text>
            <text x="34" y="42" textAnchor="middle" fill="#6a8aaa" fontSize="10">Dosagem</text>
          </g>

          {/* P-201 Bomba Dosadora */}
          <g transform="translate(406, 531)">
            <circle cx="17" cy="17" r="17" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <polygon points="8,6 8,28 27,17" fill="#5a9acf" opacity="0.65" />
            <text x="17" y="46" textAnchor="middle" fill="#8aabca" fontSize="12" fontWeight="bold">P-201</text>
          </g>

          {/* FIT-201 Transmissor de Dosagem */}
          <g transform="translate(462, 532)">
            <circle cx="16" cy="16" r="16" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="16" y="13" textAnchor="middle" fill="#8aabca" fontSize="9" fontWeight="bold">FIT</text>
            <text x="16" y="24" textAnchor="middle" fill="#8aabca" fontSize="10">201</text>
            <text x="16" y="46" textAnchor="middle" fill="#6a8aaa" fontSize="10">L/h</text>
          </g>

          {/* Linhas horizontais de dosagem */}
          <line x1="378" y1="549" x2="406" y2="549" stroke="#5a7a9a" strokeWidth="1.5" markerEnd="url(#seta-sinal)" />
          <line x1="440" y1="548" x2="462" y2="548" stroke="#5a7a9a" strokeWidth="1.5" markerEnd="url(#seta-sinal)" />

          {/* Seta dosagem subindo até ponto de injeção na linha principal (x=494) */}
          <line x1="494" y1="516" x2="494" y2="216" stroke="#5a7a9a" strokeWidth="1.5" strokeDasharray="6 3" markerEnd="url(#seta-sinal)" />
          {/* Conecta FIT-201 ao ponto de injeção */}
          <line x1="478" y1="548" x2="494" y2="548" stroke="#5a7a9a" strokeWidth="1.5" />
          <line x1="494" y1="548" x2="494" y2="516" stroke="#5a7a9a" strokeWidth="1.5" />

          {/* ══════════════════════════════════════════
              RODAPÉ — Legenda ISA
          ══════════════════════════════════════════ */}
          <rect x="0" y="630" width="1200" height="30" fill="#0d1520" />
          <text x="12" y="649" fill="#5a8aaa" fontSize="11">
            P&amp;ID Conceitual — Planta de Tratamento de Água | Norma ISA 5.1 (simplificada)
          </text>
          <text x="630" y="649" fill="#5a8aaa" fontSize="11">
            ○ Instrumento  |  ▷◁ Válvula  |  ⊙▶ Bomba  |  ─── Processo  |  - - Sinal
          </text>
        </svg>
      </div>

      <div className="pid-legenda">
        <h3 className="legenda-titulo">Tags do Diagrama</h3>
        <div className="pid-legenda-grid">
          {[
            { tag: 'TK-101',   desc: 'Tanque de entrada (água bruta)' },
            { tag: 'TK-102',   desc: 'Tanque de saída (água tratada)' },
            { tag: 'P-101',    desc: 'Bomba principal (operação normal)' },
            { tag: 'P-102',    desc: 'Bomba reserva (redundância)' },
            { tag: 'P-201',    desc: 'Bomba dosadora de produto químico' },
            { tag: 'FV-101',   desc: 'Válvula de controle de vazão de entrada' },
            { tag: 'XV-101',   desc: 'Válvula de descarte (shutdown)' },
            { tag: 'F-101',    desc: 'Filtro de processo' },
            { tag: 'FIT-101',  desc: 'Transmissor de vazão de entrada (m³/h)' },
            { tag: 'FIT-102',  desc: 'Transmissor de vazão de saída (m³/h)' },
            { tag: 'FIT-201',  desc: 'Transmissor de vazão de dosagem (L/h)' },
            { tag: 'LIT-101',  desc: 'Transmissor de nível do tanque de entrada (%)' },
            { tag: 'PIT-101',  desc: 'Transmissor de pressão da linha (bar)' },
            { tag: 'DPIT-101', desc: 'Transmissor de pressão diferencial do filtro (bar)' },
            { tag: 'TIT-101',  desc: 'Transmissor de temperatura (°C)' },
            { tag: 'AIT-101',  desc: 'Analisador de pH' },
            { tag: 'AIT-102',  desc: 'Analisador de turbidez (NTU)' },
          ].map(({ tag, desc }) => (
            <div key={tag} className="pid-legenda-item">
              <span className="pid-tag">{tag}</span>
              <span className="pid-tag-desc">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
