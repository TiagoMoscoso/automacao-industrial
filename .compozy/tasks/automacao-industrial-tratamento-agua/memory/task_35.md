# Task Memory: task_35.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot

Add explanatory header block and collapsible "Como ler as tags industriais?" panel to `PainelAjusteVariaveis.tsx`, above the variable cards grid.

## Important Decisions

- Removed unused imports (`formatarValorEngenharia`, `obterClasseCssStatus`, `obterLabelStatus`, `obterStatusOperacional`) left over from task_34 — they caused `tsc` to fail with TS6192.
- Updated test assertions in `componentes.test.tsx`: tags that appear as `<strong>` in the guide examples (FIT-101, LIT-101, DPIT-101, AIT-101, FIT-201) now use `getAllByText(...).length > 0` instead of `getByText(...)` to avoid "multiple elements" error.

## Learnings

- The guide examples panel introduces duplicate tag text nodes, so any test using `getByText` on those tags must switch to `getAllByText`.

## Files / Surfaces

- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — added two blocks + removed stale imports
- `frontend/src/componentes/componentes.css` — appended styles for introducao, guia-tags, guia-conteudo, tabela-prefixos
- `frontend/src/componentes/componentes.test.tsx` — updated 5 assertions to `getAllByText`

## Errors / Corrections

- Build failed initially: stale imports from task_34 (TS6192). Fixed by removing the unused import block.
- Test failed: `getByText('FIT-101')` found 2 elements. Fixed by switching to `getAllByText`.

## Ready for Next Run

Task complete. Build passes, all 57 tests pass. No follow-up work needed.
