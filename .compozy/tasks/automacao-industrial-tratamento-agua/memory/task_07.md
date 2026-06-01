# Task Memory: task_07.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot

- Implementar os 6 componentes React supervisórios em
  `frontend/src/componentes/` com testes de renderização e cobertura >=80%.
- Componentes devem apenas exibir props e emitir callbacks; não devem importar
  nem chamar serviços de API.

## Important Decisions

- Como `_techspec.md` não existe, usar `_prd.md`, `_tasks.md`, `specs.md` e
  ADR-001 como fontes da task.

## Learnings

- O script de teste usa Vitest; `--runInBand` não é uma opção válida neste
  projeto. Usar os scripts npm sem esse argumento.
- Testes de componentes exigiram `@testing-library/react`, `@testing-library/jest-dom`
  e ambiente `jsdom` no Vitest.

## Files / Surfaces

- Alvos: `frontend/src/componentes/` e testes próximos aos componentes.
- Contratos de props devem reutilizar tipos de `frontend/src/dominio/`.
- Criados os 6 componentes, CSS compartilhado em
  `frontend/src/componentes/componentes.css` e testes em
  `frontend/src/componentes/componentes.test.tsx`.
- `frontend/vitest.config.ts` agora usa `environment: 'jsdom'` para testes de
  renderização React.

## Errors / Corrections

- Tentativa inicial de baseline com `npm test -- --runInBand` falhou por opção
  inválida do Vitest, sem executar testes.
- Primeira rodada dos testes de componentes acumulou DOM entre casos; corrigido
  com `cleanup()` em `afterEach`.

## Ready for Next Run

- Task verificada com `npm run typecheck && npm run lint && npm test &&
  npm run build`, cobertura global acima de 80%.
