# Task Memory: task_29.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot

Exibir `nomeAbreviado` do catálogo de equipamentos abaixo da tag no painel de ajuste de variáveis.

## Important Decisions

- Reused `.cartao-variavel__descricao` style pattern but created `.campo-ajuste__descricao` as separate class for BEM consistency.
- Changed `.campo-ajuste__cabecalho` from `flex justify-content: space-between` to `flex-direction: column` so tag and description stack vertically.
- Did NOT remove `nome` from `VARIAVEIS_PROCESSO` — kept for backward safety; description now comes from `obterMetadados`.

## Learnings

- All 10 tags in `VARIAVEIS_PROCESSO` are present in `CATALOGO_EQUIPAMENTOS` in `equipamentos.ts`.

## Files / Surfaces

- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — added import + description span
- `frontend/src/componentes/componentes.css` — added `.campo-ajuste__descricao`, split `.campo-ajuste__cabecalho` from shared rule

## Errors / Corrections

None.

## Ready for Next Run

Task complete. Build and tests pass. Diff ready for manual review.
