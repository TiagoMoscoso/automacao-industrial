// P&ID Conceitual — simbologia inspirada na norma ISA 5.1
// Fluxo da esquerda para a direita: TK-101 → FV-101 → FIT-101 → P-101/P-102 → F-101 → TK-102
// viewBox 1200×600: linha principal em y=240, instrumentos em y=110, descarte em y=395, dosagem em y=495

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
          viewBox="0 0 1200 600"
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
            <marker id="seta-descarte" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#5a7a9a" />
            </marker>
          </defs>

          {/* ── Fundo ── */}
          <rect width="1200" height="600" fill="#111820" rx="8" />

          {/* ══════════════════════════════════════════
              LINHA PRINCIPAL DE PROCESSO (y = 240)
          ══════════════════════════════════════════ */}

          {/* TK-101 → FV-101 */}
          <line x1="125" y1="240" x2="192" y2="240" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          {/* FV-101 → FIT-101 */}
          <line x1="222" y1="240" x2="267" y2="240" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          {/* FIT-101 → P-101 */}
          <line x1="308" y1="240" x2="382" y2="240" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          {/* P-101 → F-101 */}
          <line x1="440" y1="240" x2="528" y2="240" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          {/* F-101 → TK-102 */}
          <line x1="594" y1="240" x2="745" y2="240" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          {/* TK-102 → FIT-102 */}
          <line x1="840" y1="240" x2="902" y2="240" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          {/* FIT-102 → Processo */}
          <line x1="942" y1="240" x2="1120" y2="240" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />

          {/* ── TK-101 Tanque de Entrada ── */}
          <g transform="translate(30, 195)">
            <rect x="0" y="0" width="95" height="95" rx="4" fill="#182431" stroke="#3a6a9a" strokeWidth="2" />
            <path d="M0,12 Q47,-12 95,12" fill="none" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="0" y1="12" x2="0" y2="0" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="95" y1="12" x2="95" y2="0" stroke="#3a6a9a" strokeWidth="2" />
            <text x="47" y="53" textAnchor="middle" fill="#8aabca" fontSize="13" fontWeight="bold">TK-101</text>
            <text x="47" y="70" textAnchor="middle" fill="#6a8aaa" fontSize="11">Tanque de Entrada</text>
          </g>

          {/* ── FV-101 Válvula de Controle de Vazão ── */}
          <g transform="translate(192, 228)">
            <polygon points="0,12 16,0 16,24" fill="#2a4a6a" stroke="#5a9acf" strokeWidth="1.5" />
            <polygon points="30,12 14,0 14,24" fill="#2a4a6a" stroke="#5a9acf" strokeWidth="1.5" />
            <line x1="15" y1="0" x2="15" y2="-16" stroke="#5a9acf" strokeWidth="1.5" />
            <circle cx="15" cy="-24" r="10" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="15" y="-20" textAnchor="middle" fill="#8aabca" fontSize="9" fontWeight="bold">FC</text>
            <text x="15" y="38" textAnchor="middle" fill="#8aabca" fontSize="11" fontWeight="bold">FV-101</text>
          </g>

          {/* ── FIT-101 Transmissor de Vazão de Entrada ── */}
          <g transform="translate(267, 220)">
            <circle cx="20" cy="20" r="20" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="20" y="17" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">FIT</text>
            <text x="20" y="28" textAnchor="middle" fill="#8aabca" fontSize="10">101</text>
            <text x="20" y="52" textAnchor="middle" fill="#6a8aaa" fontSize="10">m³/h</text>
          </g>

          {/* ── P-101 Bomba Principal ── */}
          <g transform="translate(382, 212)">
            <circle cx="28" cy="28" r="28" fill="#182431" stroke="#25a45a" strokeWidth="2" />
            <polygon points="15,11 15,45 43,28" fill="#25a45a" opacity="0.7" />
            <text x="28" y="68" textAnchor="middle" fill="#8aabca" fontSize="12" fontWeight="bold">P-101</text>
            <text x="28" y="82" textAnchor="middle" fill="#6a8aaa" fontSize="11">Bomba Principal</text>
          </g>

          {/* ── P-102 Bomba Reserva (abaixo de P-101) ── */}
          <g transform="translate(382, 315)">
            <circle cx="28" cy="28" r="28" fill="#182431" stroke="#f5b942" strokeWidth="2" />
            <polygon points="15,11 15,45 43,28" fill="#f5b942" opacity="0.6" />
            <text x="28" y="68" textAnchor="middle" fill="#8aabca" fontSize="12" fontWeight="bold">P-102</text>
            <text x="28" y="82" textAnchor="middle" fill="#6a8aaa" fontSize="11">Bomba Reserva</text>
            {/* conexão P-102 → processo (standby) */}
            <line x1="28" y1="0" x2="28" y2="-47" stroke="#5a7a9a" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#seta-sinal)" />
          </g>

          {/* ── F-101 Filtro de Processo ── */}
          <g transform="translate(528, 203)">
            <rect x="0" y="0" width="66" height="74" rx="6" fill="#182431" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="10" y1="22" x2="56" y2="22" stroke="#3a6a9a" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="10" y1="33" x2="56" y2="33" stroke="#3a6a9a" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="10" y1="44" x2="56" y2="44" stroke="#3a6a9a" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="10" y1="55" x2="56" y2="55" stroke="#3a6a9a" strokeWidth="1" strokeDasharray="3 2" />
            <text x="33" y="88" textAnchor="middle" fill="#8aabca" fontSize="12" fontWeight="bold">F-101</text>
            <text x="33" y="103" textAnchor="middle" fill="#6a8aaa" fontSize="11">Filtro</text>
          </g>

          {/* ── DPIT-101 acima do Filtro ── */}
          <g transform="translate(543, 125)">
            <circle cx="18" cy="18" r="18" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="18" y="15" textAnchor="middle" fill="#8aabca" fontSize="9" fontWeight="bold">DPIT</text>
            <text x="18" y="26" textAnchor="middle" fill="#8aabca" fontSize="10">101</text>
            <line x1="18" y1="36" x2="18" y2="78" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#seta-sinal)" />
          </g>

          {/* ── TK-102 Tanque de Saída ── */}
          <g transform="translate(745, 195)">
            <rect x="0" y="0" width="95" height="95" rx="4" fill="#182431" stroke="#3a6a9a" strokeWidth="2" />
            <path d="M0,12 Q47,-12 95,12" fill="none" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="0" y1="12" x2="0" y2="0" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="95" y1="12" x2="95" y2="0" stroke="#3a6a9a" strokeWidth="2" />
            <text x="47" y="53" textAnchor="middle" fill="#8aabca" fontSize="13" fontWeight="bold">TK-102</text>
            <text x="47" y="70" textAnchor="middle" fill="#6a8aaa" fontSize="11">Tanque de Saída</text>
          </g>

          {/* ── FIT-102 Transmissor de Vazão de Saída ── */}
          <g transform="translate(902, 220)">
            <circle cx="20" cy="20" r="20" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="20" y="17" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">FIT</text>
            <text x="20" y="28" textAnchor="middle" fill="#8aabca" fontSize="10">102</text>
            <text x="20" y="52" textAnchor="middle" fill="#6a8aaa" fontSize="10">m³/h</text>
          </g>

          {/* Label final: Processo */}
          <text x="1130" y="244" fill="#8aabca" fontSize="12" fontWeight="bold">Processo</text>

          {/* ══════════════════════════════════════════
              INSTRUMENTOS DE CAMPO (acima da linha — y ≈ 110)
          ══════════════════════════════════════════ */}

          {/* LIT-101 — Nível TK-101 */}
          <g transform="translate(59, 92)">
            <circle cx="18" cy="18" r="18" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="18" y="15" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">LIT</text>
            <text x="18" y="26" textAnchor="middle" fill="#8aabca" fontSize="10">101</text>
            <text x="18" y="-6" textAnchor="middle" fill="#6a8aaa" fontSize="10">Nível %</text>
            <line x1="18" y1="36" x2="18" y2="148" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#seta-sinal)" />
          </g>

          {/* PIT-101 — Pressão linha */}
          <g transform="translate(330, 92)">
            <circle cx="18" cy="18" r="18" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="18" y="15" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">PIT</text>
            <text x="18" y="26" textAnchor="middle" fill="#8aabca" fontSize="10">101</text>
            <text x="18" y="-6" textAnchor="middle" fill="#6a8aaa" fontSize="10">bar</text>
            <line x1="18" y1="36" x2="18" y2="148" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#seta-sinal)" />
          </g>

          {/* TIT-101 — Temperatura */}
          <g transform="translate(450, 92)">
            <circle cx="18" cy="18" r="18" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="18" y="15" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">TIT</text>
            <text x="18" y="26" textAnchor="middle" fill="#8aabca" fontSize="10">101</text>
            <text x="18" y="-6" textAnchor="middle" fill="#6a8aaa" fontSize="10">°C</text>
            <line x1="18" y1="36" x2="18" y2="148" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#seta-sinal)" />
          </g>

          {/* AIT-101 — pH (após filtro) */}
          <g transform="translate(622, 92)">
            <circle cx="18" cy="18" r="18" fill="#182431" stroke="#f5b942" strokeWidth="1.5" />
            <text x="18" y="15" textAnchor="middle" fill="#f5b942" fontSize="10" fontWeight="bold">AIT</text>
            <text x="18" y="26" textAnchor="middle" fill="#f5b942" fontSize="10">101</text>
            <text x="18" y="-6" textAnchor="middle" fill="#6a8aaa" fontSize="10">pH</text>
            <line x1="18" y1="36" x2="18" y2="148" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#seta-sinal)" />
          </g>

          {/* AIT-102 — Turbidez */}
          <g transform="translate(712, 92)">
            <circle cx="18" cy="18" r="18" fill="#182431" stroke="#f5b942" strokeWidth="1.5" />
            <text x="18" y="15" textAnchor="middle" fill="#f5b942" fontSize="10" fontWeight="bold">AIT</text>
            <text x="18" y="26" textAnchor="middle" fill="#f5b942" fontSize="10">102</text>
            <text x="18" y="-6" textAnchor="middle" fill="#6a8aaa" fontSize="10">NTU</text>
            <line x1="18" y1="36" x2="18" y2="148" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#seta-sinal)" />
          </g>

          {/* ══════════════════════════════════════════
              LINHA DE DESCARTE (y = 395)
          ══════════════════════════════════════════ */}
          {/* Derivação descendo do TK-101 */}
          <line x1="77" y1="290" x2="77" y2="395" stroke="#5a7a9a" strokeWidth="2" />
          <line x1="77" y1="395" x2="188" y2="395" stroke="#5a7a9a" strokeWidth="2" markerEnd="url(#seta-descarte)" />

          {/* XV-101 Válvula de Descarte */}
          <g transform="translate(188, 383)">
            <polygon points="0,12 16,0 16,24" fill="#2a4a6a" stroke="#d94b4b" strokeWidth="1.5" />
            <polygon points="30,12 14,0 14,24" fill="#2a4a6a" stroke="#d94b4b" strokeWidth="1.5" />
            <line x1="15" y1="0" x2="15" y2="-16" stroke="#d94b4b" strokeWidth="1.5" />
            <circle cx="15" cy="-24" r="10" fill="#182431" stroke="#d94b4b" strokeWidth="1.5" />
            <text x="15" y="-20" textAnchor="middle" fill="#d94b4b" fontSize="9" fontWeight="bold">XS</text>
            <text x="15" y="38" textAnchor="middle" fill="#8aabca" fontSize="12" fontWeight="bold">XV-101</text>
            <text x="15" y="53" textAnchor="middle" fill="#6a8aaa" fontSize="11">Descarte</text>
          </g>
          <line x1="220" y1="395" x2="340" y2="395" stroke="#5a7a9a" strokeWidth="2" markerEnd="url(#seta-descarte)" />
          <text x="352" y="399" fill="#6a8aaa" fontSize="12">Descarte</text>

          {/* ══════════════════════════════════════════
              LINHA DE DOSAGEM QUÍMICA (y ≈ 495)
          ══════════════════════════════════════════ */}

          {/* TK-201 Tanque de Dosagem */}
          <g transform="translate(330, 468)">
            <rect x="0" y="0" width="65" height="55" rx="4" fill="#182431" stroke="#3a5a7a" strokeWidth="1.5" />
            <text x="32" y="26" textAnchor="middle" fill="#8aabca" fontSize="11" fontWeight="bold">TK-201</text>
            <text x="32" y="41" textAnchor="middle" fill="#6a8aaa" fontSize="10">Dosagem</text>
          </g>

          {/* P-201 Bomba Dosadora */}
          <g transform="translate(420, 478)">
            <circle cx="18" cy="18" r="17" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <polygon points="9,7 9,29 29,18" fill="#5a9acf" opacity="0.6" />
            <text x="18" y="47" textAnchor="middle" fill="#8aabca" fontSize="11" fontWeight="bold">P-201</text>
          </g>

          {/* FIT-201 Transmissor de Dosagem */}
          <g transform="translate(478, 480)">
            <circle cx="16" cy="16" r="16" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="16" y="13" textAnchor="middle" fill="#8aabca" fontSize="9" fontWeight="bold">FIT</text>
            <text x="16" y="24" textAnchor="middle" fill="#8aabca" fontSize="10">201</text>
            <text x="16" y="45" textAnchor="middle" fill="#6a8aaa" fontSize="10">L/h</text>
          </g>

          {/* Linhas horizontais de dosagem */}
          <line x1="395" y1="495" x2="420" y2="495" stroke="#5a7a9a" strokeWidth="1.5" markerEnd="url(#seta-sinal)" />
          <line x1="455" y1="495" x2="478" y2="495" stroke="#5a7a9a" strokeWidth="1.5" markerEnd="url(#seta-sinal)" />

          {/* Seta dosagem subindo até linha principal */}
          <line x1="494" y1="464" x2="494" y2="241" stroke="#5a7a9a" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#seta-sinal)" />

          {/* ══════════════════════════════════════════
              RODAPÉ — Legenda ISA
          ══════════════════════════════════════════ */}
          <rect x="0" y="572" width="1200" height="28" fill="#0d1520" />
          <text x="12" y="588" fill="#5a8aaa" fontSize="11">
            P&amp;ID Conceitual — Planta de Tratamento de Água | Norma ISA 5.1 (simplificada)
          </text>
          <text x="660" y="588" fill="#5a8aaa" fontSize="11">
            ○ Instrumento  |  ▷◁ Válvula  |  ⊙▶ Bomba  |  ─── Processo  |  - - Sinal
          </text>
        </svg>
      </div>

      <div className="pid-legenda">
        <h3 className="legenda-titulo">Tags do Diagrama</h3>
        <div className="pid-legenda-grid">
          {[
            { tag: 'TK-101',  desc: 'Tanque de entrada (água bruta)' },
            { tag: 'TK-102',  desc: 'Tanque de saída (água tratada)' },
            { tag: 'P-101',   desc: 'Bomba principal (operação normal)' },
            { tag: 'P-102',   desc: 'Bomba reserva (redundância)' },
            { tag: 'P-201',   desc: 'Bomba dosadora de produto químico' },
            { tag: 'FV-101',  desc: 'Válvula de controle de vazão de entrada' },
            { tag: 'XV-101',  desc: 'Válvula de descarte (shutdown)' },
            { tag: 'F-101',   desc: 'Filtro de processo' },
            { tag: 'FIT-101', desc: 'Transmissor de vazão de entrada (m³/h)' },
            { tag: 'FIT-102', desc: 'Transmissor de vazão de saída (m³/h)' },
            { tag: 'FIT-201', desc: 'Transmissor de vazão de dosagem (L/h)' },
            { tag: 'LIT-101', desc: 'Transmissor de nível do tanque de entrada (%)' },
            { tag: 'PIT-101', desc: 'Transmissor de pressão da linha (bar)' },
            { tag: 'DPIT-101',desc: 'Transmissor de pressão diferencial do filtro (bar)' },
            { tag: 'TIT-101', desc: 'Transmissor de temperatura (°C)' },
            { tag: 'AIT-101', desc: 'Analisador de pH' },
            { tag: 'AIT-102', desc: 'Analisador de turbidez (NTU)' },
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
