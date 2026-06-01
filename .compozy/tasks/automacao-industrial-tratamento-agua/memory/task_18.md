# Task Memory: task_18.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot

Polish visual appearance of `CartaoVariavel`, `PainelAlarmes`, `PainelAtuadores`, `PainelCenarios` and their CSS. Do NOT alter business logic, props, or TypeScript contracts. COMPLETED.

## Important Decisions

- `componentes.css` base theme migrated from hardcoded light colors (`#f8fafc`, `#17202a`, `#c8d0d8`) to custom properties (`var(--cor-painel)`, `var(--cor-texto)`, `var(--cor-borda)`). `principal.css` already overrides most of these via cascade (it is imported LAST in `PaginaPrincipal.tsx`).
- Actuator state indicators (● / ○) added via CSS `::before` pseudo-elements — NOT DOM text — so `getByText('Ligada')` / `getByText('Fechada')` tests continue to pass (pseudo-element content does not appear in `textContent`).
- FV-101 `detalhe` only rendered when `aberturaValvulaEntradaComandadaPercentual > 0` (was always rendered including "0%").
- Critical alarms (EMERGENCIA, NIVEL_ALTO_ALTO) get class `alarme-item--critico` (red left border, darker background).
- Emergency scenario button gets `width: 100%; margin-top: 8px` to visually separate it on its own row in the flex list.
- `estado-processo` changed from `display: inline-block` to `display: block` with full width and centered text for better readability.
- `lista-atuadores` changed to `flex-direction: column; flex-wrap: nowrap` for vertical stacking.
- Regular `alarme-item` gets yellow (`var(--cor-alerta)`) 4px left border; critical gets red 4px left border.

## Files / Surfaces

- `frontend/src/componentes/componentes.css` — rewritten (dark theme + polish)
- `frontend/src/componentes/CartaoVariavel.tsx` — added `cartao-variavel__nome` class, separated valor/unidade spans
- `frontend/src/componentes/PainelAlarmes.tsx` — imports TipoAlarme, adds `alarme-item--critico` to EMERGENCIA/NIVEL_ALTO_ALTO
- `frontend/src/componentes/PainelAtuadores.tsx` — detalhe only shown when valve is open (> 0%)
- `frontend/src/componentes/componentes.test.tsx` — 4 new tests added

## Verification

- `npm run typecheck`: exit 0
- `npm run lint`: exit 0
- `npm run test`: 51/51 passed, coverage 94.26% (target ≥80%)

## Ready for Next Run

Task 18 COMPLETE. Task 19 (Validar build, Docker e inspeção visual) can proceed.
