# Task Memory: task_06.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Implement frontend TypeScript domain contracts and API client for task 06:
  alarm types, actuator/control state, full plant state, HTTP service, and tests.

## Important Decisions
- Frontend domain will expose camelCase names for React consumers while the API
  client maps backend `snake_case` JSON to those domain types.
- Include `verificarSaude()` in the API client to cover `/api/saude`, because
  the task text mentions 7 endpoints while only 6 plant functions are mandatory.

## Learnings
- Repository has no root `AGENTS.md`/`CLAUDE.md`; only neighboring repositories
  contain those files.
- Frontend baseline before task 06: `npm run build` fails with TS18003 because
  `src` has no TypeScript inputs; `npm test` is not defined.
- Final frontend validation passed after implementation: `npm run typecheck`,
  `npm test`, `npm run build`, and `npm run lint`.
- `npm test` uses Vitest with V8 coverage thresholds set to 80% for statements,
  branches, functions, and lines.

## Files / Surfaces
- Added frontend domain files under `frontend/src/dominio/`.
- Added `frontend/src/servicos/clienteApiPlanta.ts` with fetch-based API access
  and JSON mapping.
- Added Vitest tests/config, ESLint flat config, and minimal `index.html` needed
  for existing frontend scripts to run.

## Errors / Corrections
- Initial coverage was 78.04%, below the task target; added tests for simulation
  commands and error fallback to reach 97.56% statements/lines and 81.81%
  branches.
- Existing `npm run build` and `npm run lint` failed because frontend infra was
  missing `index.html` and `eslint.config.js`; added minimal config without UI
  logic.

## Ready for Next Run
- Task 07 can import `EstadoPlanta`, `Alarme`, `TipoAlarme`, `AcoesControle`,
  and API functions directly from the new domain/service modules.
