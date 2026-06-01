// P&ID Conceitual — simbologia inspirada na norma ISA 5.1
// Fluxo da esquerda para a direita: TK-101 → FV-101 → FIT-101 → P-101/P-102 → F-101 → TK-102
// Instrumentos representados por círculos; válvulas por borboleta (▷◁); bombas por círculo+triângulo

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
          viewBox="0 0 1000 480"
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
          </defs>

          {/* ── Fundo ── */}
          <rect width="1000" height="480" fill="#111820" rx="8" />

          {/* ══════════════════════════════════════════
              LINHA PRINCIPAL DE PROCESSO (y = 200)
          ══════════════════════════════════════════ */}

          {/* Trecho: TK-101 → FV-101 */}
          <line x1="130" y1="200" x2="220" y2="200" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          {/* Trecho: FV-101 → FIT-101 */}
          <line x1="250" y1="200" x2="320" y2="200" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          {/* Trecho: FIT-101 → P-101 */}
          <line x1="360" y1="200" x2="430" y2="200" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          {/* Trecho: P-101 → F-101 */}
          <line x1="480" y1="200" x2="570" y2="200" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          {/* Trecho: F-101 → TK-102 */}
          <line x1="630" y1="200" x2="750" y2="200" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />

          {/* ── TK-101 Tanque de Entrada ── */}
          <g transform="translate(40, 155)">
            <rect x="0" y="0" width="90" height="90" rx="4" fill="#182431" stroke="#3a6a9a" strokeWidth="2" />
            <path d="M0,10 Q45,-10 90,10" fill="none" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="0" y1="10" x2="0" y2="0" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="90" y1="10" x2="90" y2="0" stroke="#3a6a9a" strokeWidth="2" />
            <text x="45" y="52" textAnchor="middle" fill="#8aabca" fontSize="11" fontWeight="bold">TK-101</text>
            <text x="45" y="68" textAnchor="middle" fill="#6a8aaa" fontSize="9">Tanque</text>
            <text x="45" y="80" textAnchor="middle" fill="#6a8aaa" fontSize="9">Entrada</text>
          </g>

          {/* ── FV-101 Válvula de Controle ── */}
          <g transform="translate(220, 188)">
            {/* borboleta: dois triângulos opostos */}
            <polygon points="0,12 16,0 16,24" fill="#2a4a6a" stroke="#5a9acf" strokeWidth="1.5" />
            <polygon points="30,12 14,0 14,24" fill="#2a4a6a" stroke="#5a9acf" strokeWidth="1.5" />
            <line x1="15" y1="0" x2="15" y2="-14" stroke="#5a9acf" strokeWidth="1.5" />
            <circle cx="15" cy="-20" r="8" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="15" y="-16" textAnchor="middle" fill="#8aabca" fontSize="7">FC</text>
            <text x="15" y="36" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">FV-101</text>
          </g>

          {/* ── FIT-101 Transmissor de Vazão ── */}
          <g transform="translate(320, 180)">
            <circle cx="20" cy="20" r="18" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="20" y="17" textAnchor="middle" fill="#8aabca" fontSize="7" fontWeight="bold">FIT</text>
            <text x="20" y="27" textAnchor="middle" fill="#8aabca" fontSize="7">101</text>
            <text x="20" y="50" textAnchor="middle" fill="#6a8aaa" fontSize="9">m³/h</text>
          </g>

          {/* ── P-101 Bomba Principal ── */}
          <g transform="translate(430, 175)">
            <circle cx="25" cy="25" r="23" fill="#182431" stroke="#25a45a" strokeWidth="2" />
            <polygon points="14,10 14,40 38,25" fill="#25a45a" opacity="0.7" />
            <text x="25" y="58" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">P-101</text>
            <text x="25" y="70" textAnchor="middle" fill="#6a8aaa" fontSize="8">Bomba</text>
            <text x="25" y="80" textAnchor="middle" fill="#6a8aaa" fontSize="8">Principal</text>
          </g>

          {/* ── P-102 Bomba Reserva (abaixo de P-101) ── */}
          <g transform="translate(430, 290)">
            <circle cx="25" cy="25" r="23" fill="#182431" stroke="#f5b942" strokeWidth="2" />
            <polygon points="14,10 14,40 38,25" fill="#f5b942" opacity="0.6" />
            <text x="25" y="58" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">P-102</text>
            <text x="25" y="70" textAnchor="middle" fill="#6a8aaa" fontSize="8">Bomba</text>
            <text x="25" y="80" textAnchor="middle" fill="#6a8aaa" fontSize="8">Reserva</text>
            {/* conexão P-102 → linha principal */}
            <line x1="25" y1="-65" x2="25" y2="0" stroke="#5a7a9a" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#seta-sinal)" />
          </g>

          {/* ── F-101 Filtro ── */}
          <g transform="translate(570, 165)">
            <rect x="0" y="0" width="60" height="70" rx="6" fill="#182431" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="10" y1="20" x2="50" y2="20" stroke="#3a6a9a" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="10" y1="30" x2="50" y2="30" stroke="#3a6a9a" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="10" y1="40" x2="50" y2="40" stroke="#3a6a9a" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="10" y1="50" x2="50" y2="50" stroke="#3a6a9a" strokeWidth="1" strokeDasharray="3 2" />
            <text x="30" y="82" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">F-101</text>
            <text x="30" y="94" textAnchor="middle" fill="#6a8aaa" fontSize="9">Filtro</text>
          </g>
          {/* DPIT-101 acima do filtro */}
          <g transform="translate(583, 118)">
            <circle cx="16" cy="16" r="14" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="16" y="13" textAnchor="middle" fill="#8aabca" fontSize="6" fontWeight="bold">DPIT</text>
            <text x="16" y="22" textAnchor="middle" fill="#8aabca" fontSize="6">101</text>
            <line x1="16" y1="30" x2="16" y2="47" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="3 2" />
          </g>

          {/* ── TK-102 Tanque de Saída ── */}
          <g transform="translate(750, 155)">
            <rect x="0" y="0" width="90" height="90" rx="4" fill="#182431" stroke="#3a6a9a" strokeWidth="2" />
            <path d="M0,10 Q45,-10 90,10" fill="none" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="0" y1="10" x2="0" y2="0" stroke="#3a6a9a" strokeWidth="2" />
            <line x1="90" y1="10" x2="90" y2="0" stroke="#3a6a9a" strokeWidth="2" />
            <text x="45" y="52" textAnchor="middle" fill="#8aabca" fontSize="11" fontWeight="bold">TK-102</text>
            <text x="45" y="68" textAnchor="middle" fill="#6a8aaa" fontSize="9">Tanque</text>
            <text x="45" y="80" textAnchor="middle" fill="#6a8aaa" fontSize="9">Saída</text>
          </g>

          {/* FIT-102 após TK-102 */}
          <g transform="translate(855, 180)">
            <circle cx="20" cy="20" r="18" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="20" y="17" textAnchor="middle" fill="#8aabca" fontSize="7" fontWeight="bold">FIT</text>
            <text x="20" y="27" textAnchor="middle" fill="#8aabca" fontSize="7">102</text>
            <text x="20" y="50" textAnchor="middle" fill="#6a8aaa" fontSize="9">Saída</text>
          </g>
          <line x1="840" y1="200" x2="855" y2="200" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          <line x1="875" y1="200" x2="960" y2="200" stroke="#8aabca" strokeWidth="3" markerEnd="url(#seta)" />
          <text x="970" y="204" fill="#6a8aaa" fontSize="10">Processo</text>

          {/* ══════════════════════════════════════════
              INSTRUMENTOS DE CAMPO (acima da linha)
          ══════════════════════════════════════════ */}

          {/* LIT-101 — Nível TK-101 */}
          <g transform="translate(58, 100)">
            <line x1="18" y1="28" x2="18" y2="55" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#seta-sinal)" />
            <circle cx="18" cy="16" r="14" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="18" y="13" textAnchor="middle" fill="#8aabca" fontSize="7" fontWeight="bold">LIT</text>
            <text x="18" y="22" textAnchor="middle" fill="#8aabca" fontSize="7">101</text>
            <text x="18" y="-2" textAnchor="middle" fill="#6a8aaa" fontSize="8">Nível %</text>
          </g>

          {/* PIT-101 — Pressão linha (entre FIT-101 e P-101) */}
          <g transform="translate(375, 100)">
            <line x1="18" y1="28" x2="18" y2="80" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#seta-sinal)" />
            <circle cx="18" cy="16" r="14" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="18" y="13" textAnchor="middle" fill="#8aabca" fontSize="7" fontWeight="bold">PIT</text>
            <text x="18" y="22" textAnchor="middle" fill="#8aabca" fontSize="7">101</text>
            <text x="18" y="-2" textAnchor="middle" fill="#6a8aaa" fontSize="8">bar</text>
          </g>

          {/* TIT-101 — Temperatura */}
          <g transform="translate(510, 100)">
            <line x1="18" y1="28" x2="18" y2="75" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#seta-sinal)" />
            <circle cx="18" cy="16" r="14" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="18" y="13" textAnchor="middle" fill="#8aabca" fontSize="7" fontWeight="bold">TIT</text>
            <text x="18" y="22" textAnchor="middle" fill="#8aabca" fontSize="7">101</text>
            <text x="18" y="-2" textAnchor="middle" fill="#6a8aaa" fontSize="8">°C</text>
          </g>

          {/* ══════════════════════════════════════════
              LINHA DE DESCARTE (y = 340)
          ══════════════════════════════════════════ */}
          {/* Derivação do TK-101 para descarte */}
          <line x1="85" y1="245" x2="85" y2="340" stroke="#5a7a9a" strokeWidth="2" />
          <line x1="85" y1="340" x2="210" y2="340" stroke="#5a7a9a" strokeWidth="2" markerEnd="url(#seta)" />

          {/* XV-101 Válvula de Descarte */}
          <g transform="translate(210, 328)">
            <polygon points="0,12 16,0 16,24" fill="#2a4a6a" stroke="#d94b4b" strokeWidth="1.5" />
            <polygon points="30,12 14,0 14,24" fill="#2a4a6a" stroke="#d94b4b" strokeWidth="1.5" />
            <line x1="15" y1="0" x2="15" y2="-14" stroke="#d94b4b" strokeWidth="1.5" />
            <circle cx="15" cy="-20" r="8" fill="#182431" stroke="#d94b4b" strokeWidth="1.5" />
            <text x="15" y="-16" textAnchor="middle" fill="#d94b4b" fontSize="7">XS</text>
            <text x="15" y="36" textAnchor="middle" fill="#8aabca" fontSize="10" fontWeight="bold">XV-101</text>
            <text x="15" y="48" textAnchor="middle" fill="#6a8aaa" fontSize="8">Descarte</text>
          </g>
          <line x1="242" y1="340" x2="330" y2="340" stroke="#5a7a9a" strokeWidth="2" markerEnd="url(#seta)" />
          <text x="345" y="344" fill="#6a8aaa" fontSize="10">Descarte</text>

          {/* ══════════════════════════════════════════
              LINHA DE DOSAGEM QUÍMICA (y = 420)
          ══════════════════════════════════════════ */}
          <g transform="translate(300, 395)">
            <rect x="0" y="0" width="60" height="50" rx="4" fill="#182431" stroke="#3a5a7a" strokeWidth="1.5" />
            <text x="30" y="24" textAnchor="middle" fill="#8aabca" fontSize="9" fontWeight="bold">TK-201</text>
            <text x="30" y="36" textAnchor="middle" fill="#6a8aaa" fontSize="8">Dosagem</text>
          </g>

          {/* P-201 Bomba Dosadora */}
          <g transform="translate(390, 402)">
            <circle cx="18" cy="18" r="16" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <polygon points="9,7 9,29 28,18" fill="#5a9acf" opacity="0.6" />
            <text x="18" y="44" textAnchor="middle" fill="#8aabca" fontSize="9" fontWeight="bold">P-201</text>
          </g>

          {/* FIT-201 Transmissor Dosagem */}
          <g transform="translate(438, 402)">
            <circle cx="16" cy="16" r="14" fill="#182431" stroke="#5a9acf" strokeWidth="1.5" />
            <text x="16" y="13" textAnchor="middle" fill="#8aabca" fontSize="7" fontWeight="bold">FIT</text>
            <text x="16" y="22" textAnchor="middle" fill="#8aabca" fontSize="7">201</text>
          </g>

          {/* Linha de dosagem para linha principal */}
          <line x1="360" y1="395" x2="360" y2="375" stroke="#5a7a9a" strokeWidth="1.5" />
          <line x1="408" y1="395" x2="408" y2="375" stroke="#5a7a9a" strokeWidth="1.5" />
          <line x1="454" y1="395" x2="454" y2="375" stroke="#5a7a9a" strokeWidth="1.5" />
          <line x1="300" y1="420" x2="300" y2="395" stroke="#5a7a9a" strokeWidth="1.5" />
          {/* seta para cima até linha principal */}
          <line x1="454" y1="375" x2="454" y2="205" stroke="#5a7a9a" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#seta-sinal)" />

          {/* ══════════════════════════════════════════
              ANALISADORES DE QUALIDADE
          ══════════════════════════════════════════ */}

          {/* AIT-101 pH — após filtro */}
          <g transform="translate(660, 100)">
            <line x1="18" y1="28" x2="18" y2="65" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#seta-sinal)" />
            <circle cx="18" cy="16" r="14" fill="#182431" stroke="#f5b942" strokeWidth="1.5" />
            <text x="18" y="13" textAnchor="middle" fill="#f5b942" fontSize="7" fontWeight="bold">AIT</text>
            <text x="18" y="22" textAnchor="middle" fill="#f5b942" fontSize="7">101</text>
            <text x="18" y="-2" textAnchor="middle" fill="#6a8aaa" fontSize="8">pH</text>
          </g>

          {/* AIT-102 Turbidez */}
          <g transform="translate(700, 100)">
            <line x1="18" y1="28" x2="18" y2="65" stroke="#5a7a9a" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#seta-sinal)" />
            <circle cx="18" cy="16" r="14" fill="#182431" stroke="#f5b942" strokeWidth="1.5" />
            <text x="18" y="13" textAnchor="middle" fill="#f5b942" fontSize="7" fontWeight="bold">AIT</text>
            <text x="18" y="22" textAnchor="middle" fill="#f5b942" fontSize="7">102</text>
            <text x="18" y="-2" textAnchor="middle" fill="#6a8aaa" fontSize="8">NTU</text>
          </g>

          {/* ══════════════════════════════════════════
              TÍTULO E LEGENDA DO P&ID
          ══════════════════════════════════════════ */}
          <rect x="0" y="454" width="1000" height="26" fill="#0d1520" />
          <text x="10" y="470" fill="#5a8aaa" fontSize="10">
            P&amp;ID Conceitual — Planta de Tratamento de Água | Norma ISA 5.1 (simplificada)
          </text>
          <text x="600" y="470" fill="#5a8aaa" fontSize="10">
            ○ Instrumento de campo &nbsp;|&nbsp; ▷◁ Válvula &nbsp;|&nbsp; ⊙▶ Bomba &nbsp;|&nbsp; ─── Linha processo &nbsp;|&nbsp; - - Sinal
          </text>
        </svg>
      </div>

      <div className="pid-legenda">
        <h3 className="legenda-titulo">Tags do Diagrama</h3>
        <div className="pid-legenda-grid">
          {[
            { tag: 'TK-101', desc: 'Tanque de entrada (água bruta)' },
            { tag: 'TK-102', desc: 'Tanque de saída (água tratada)' },
            { tag: 'P-101',  desc: 'Bomba principal (operação normal)' },
            { tag: 'P-102',  desc: 'Bomba reserva (redundância)' },
            { tag: 'P-201',  desc: 'Bomba dosadora de produto químico' },
            { tag: 'FV-101', desc: 'Válvula de controle de vazão de entrada' },
            { tag: 'XV-101', desc: 'Válvula de descarte (shutdown)' },
            { tag: 'F-101',  desc: 'Filtro de processo' },
            { tag: 'FIT-101', desc: 'Transmissor de vazão de entrada (m³/h)' },
            { tag: 'FIT-102', desc: 'Transmissor de vazão de saída (m³/h)' },
            { tag: 'FIT-201', desc: 'Transmissor de vazão de dosagem (L/h)' },
            { tag: 'LIT-101', desc: 'Transmissor de nível do tanque de entrada (%)' },
            { tag: 'PIT-101', desc: 'Transmissor de pressão da linha (bar)' },
            { tag: 'DPIT-101', desc: 'Transmissor de pressão diferencial do filtro (bar)' },
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
