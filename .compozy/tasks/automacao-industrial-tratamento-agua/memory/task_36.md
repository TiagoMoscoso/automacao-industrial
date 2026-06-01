# Task Memory: task_36.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot

- Criar `frontend/src/dados/arquiteturaAutomacao.ts` como fonte de dados
  tipada da arquitetura de automação, sem componentes React nem lógica de
  controle.
- Validar com `cd frontend && npm run build` e checagem de cobertura dos dados.

## Important Decisions

- `frontend/src/tipos/` não existe e as interfaces em `frontend/src/dominio/`
  não são compatíveis com o modelo conceitual; a task deve exportar interfaces
  próprias no novo arquivo.
- Usar `.specs/specs.md` como techspec efetivo, conforme memória compartilhada,
  porque não há `_techspec.md` separado neste workflow.

## Learnings

- O arquivo alvo ainda não existe antes da implementação.
- Validação de dados via transpilação TypeScript confirmou: campo 16,
  controle 11, supervisão 6, rede 5 e equivalência simulada exatamente 6.
- `npm run test` passa, mas atualiza artefatos rastreados em `frontend/coverage/`;
  esses artefatos são ruído gerado pela validação e não pertencem ao escopo.

## Files / Surfaces

- Criado: `frontend/src/dados/arquiteturaAutomacao.ts`.
- Atualizados para rastreamento: `task_36.md` e `_tasks.md`.

## Errors / Corrections

- `rg` não está instalado no ambiente; leitura de arquivos foi feita com
  `find`, `grep` e `sed`.

## Ready for Next Run

- Task 37 pode importar `arquiteturaAutomacao` e as interfaces exportadas de
  `frontend/src/dados/arquiteturaAutomacao.ts`.
