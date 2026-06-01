# Task Memory: task_16.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot

Reestruturar o layout CSS Grid de `PaginaPrincipal.tsx` + `principal.css`:
- Sinóptico dominante (esquerda, maior área)
- Lateral compacta à direita: PainelAlarmes + PainelAtuadores + PainelCenarios
- Variáveis de processo em faixa inferior full-width
- PainelAjusteVariaveis em área de menor destaque no rodapé

New grid areas: `"sinotico lateral"` / `"variaveis variaveis"` / `"ajuste ajuste"`

## Important Decisions

- `area-controles` é removida; PainelCenarios migra para `area-lateral`
- PainelAjusteVariaveis ganha nova área `area-ajuste` com menor destaque visual (heading menor + cor secundária)
- `area-controles` CSS rules removidas (sem uso)
- Breakpoint 1100px: empilha tudo (`sinotico / lateral / variaveis / ajuste`)
- Breakpoint 680px: ajustes de cabeçalho/padding sem mudança de grid (mantém igual ao atual)

## Learnings

- SinoticoPlanta renderiza h2 "Sinóptico da planta" — testável por texto
- PainelAlarmes tem h2 "Alarmes"; PainelAtuadores tem h2 "Atuadores"
- Estado inicial usa `estadoInicialPlanta` (processoLiberado: false) antes da API responder

## Files / Surfaces

- `frontend/src/paginas/PaginaPrincipal.tsx` — JSX estrutural modificado
- `frontend/src/estilos/principal.css` — grid areas e classes CSS modificadas
- `frontend/src/paginas/PaginaPrincipal.test.tsx` — novos testes de layout adicionados

## Errors / Corrections

None.

## Ready for Next Run

Task complete. Diff is ready for manual review (--auto-commit=false).
42/42 tests pass; coverage 94%+. All quality gates green.
Next task: task_17 — refatorar sinóptico da planta (SVG geometry, pump height alignment).
