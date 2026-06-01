# Task Memory: task_22.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Corrigir somente o sinóptico frontend para reduzir T-101, manter alinhamento
  da linha principal e formatar o valor visual de LIT-101 entre 0% e 100%.
- Restrições ativas: manter `viewBox 900x420`, não alterar backend, contratos de
  API, tipos de domínio, `estadoEquipamento`, `temAlarme`, CSS global ou
  dependências.

## Important Decisions
- `auditoria-sinotico.md` exigido pela task 22 não existe no workspace atual e
  `task_21.md` segue `pending`; usei `SinoticoPlanta.tsx` completo e a memória
  de `task_21` como base factual mínima para não bloquear a execução autorizada.
- O backend e o cliente frontend já usam `nivel_tanque_percentual` como valor
  percentual 0-100; a correção de "570%" será apenas no display do sinóptico,
  aplicando clamp de apresentação, sem alterar dados ou lógica de estado.

## Learnings
- Sinal pré-mudança: T-101 está em `x=475, y=56, w=90, h=88`, centro y=100,
  enquanto a linha principal usa `y=78, h=44`; o tanque tem 2x a altura padrão.
- A linha de descarte vertical inicia em `y=144`, fundo atual do tanque; ao
  reduzir T-101 para `y=67, h=66`, esse conector precisa iniciar em `y=133`.
- Verificação visual por Firefox headless em `http://127.0.0.1:5173/` confirmou
  T-101 proporcional, alinhado à linha principal e com texto interno centralizado.

## Files / Surfaces
- A modificar: `frontend/src/componentes/SinoticoPlanta.tsx`.
- Testes adicionados em `frontend/src/componentes/componentes.test.tsx` para
  geometria de T-101 e clamp visual de LIT-101.
- Lidos para investigação: `frontend/src/servicos/clienteApiPlanta.ts`,
  `frontend/src/dominio/estadoPlanta.ts`, cenários/schemas do backend.

## Errors / Corrections
- `AGENTS.md` e `CLAUDE.md` não existem no workspace.
- `rg` não está instalado; buscas feitas com `find`, `grep` e `sed`.
- O diretório atual não é um Git worktree detectável; não há `git status`.

## Ready for Next Run
- Task 22 implementada: T-101 em `y=67, h=66`, linha de descarte conectando em
  `y=133`, LIT-101 formatado no sinóptico com clamp visual 0-100%.
- Verificação final após tracking:
  `npm run typecheck`, `npm run build` e
  `npm run test -- --run src/componentes/componentes.test.tsx`, todos com exit
  code 0.
