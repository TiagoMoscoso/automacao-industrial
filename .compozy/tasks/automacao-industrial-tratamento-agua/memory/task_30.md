# Task Memory: task_30.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot

Adicionado tooltips SVG (`<title>`) e labels didáticos (`nomeAbreviado`) ao sinóptico.

## Important Decisions

- Usado `textLength={largura - 6}` + `lengthAdjust="spacingAndGlyphs"` para evitar overflow nos blocos estreitos (P-101/P-102/P-201, width=50).
- Reposicionamento condicional dos textos: quando `temDescricao && temValor`, yNome recua 10px e yValor avança 1px para acomodar terceira linha.
- Tags `AGUA` e `INJECAO` não estão no catálogo → sem tooltip/label (obterMetadados retorna undefined).
- CSS sibling selectors `.equipamento--falha ~ .equipamento__descricao` adicionado para legibilidade em estados críticos.

## Learnings

- SinoticoPlanta.tsx usa componente interno `Equipamento` — a mudança foi localizada nele, sem impacto em geometria ou lógica de estados.
- `obterMetadados` retorna `MetadadosEquipamento | undefined`; verificação `meta?.nomeAbreviado` necessária antes de renderizar.

## Files / Surfaces

- `frontend/src/componentes/SinoticoPlanta.tsx` — import adicionado, componente Equipamento atualizado
- `frontend/src/componentes/componentes.css` — `.equipamento__descricao` adicionado com state rules

## Errors / Corrections

Nenhum. Build e testes passaram na primeira tentativa.

## Ready for Next Run

Task completa. Diff pronto para revisão manual (auto-commit desabilitado).
