# Task Memory: task_27.md

## Objective Snapshot

Criar `frontend/src/dominio/equipamentos.ts` com interface `MetadadosEquipamento`,
objeto `CATALOGO_EQUIPAMENTOS` (21 entradas: 20 tags + DESCARTE), e função
`obterMetadados(tag)`.

## Important Decisions

- PROCESSO e DESCARTE incluídos no catálogo (não têm unidade — campo omitido).
- Campos `instrumento` e `unidade` de PROCESSO/DESCARTE usam `'—'` ou omissão
  conforme a tabela da task spec.
- Nenhum arquivo existente foi alterado.

## Files / Surfaces

- `frontend/src/dominio/equipamentos.ts` — criado

## Learnings

- Build (`tsc && vite build`) passa sem erros com 41 módulos.

## Ready for Next Run

Task 27 completa. Tasks 28–31 podem importar `obterMetadados` e
`CATALOGO_EQUIPAMENTOS` de `frontend/src/dominio/equipamentos.ts`.
