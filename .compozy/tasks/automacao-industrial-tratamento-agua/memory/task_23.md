# Task Memory: task_23.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Reorganizar somente a geometria SVG da linha de dosagem química em
  `SinoticoPlanta.tsx`, conectando a injeção à linha principal antes de T-101.
- Restrições ativas: não alterar posições da linha principal, lógica de
  `estadoEquipamento`/`temAlarme`, contratos de API, tipos de domínio ou
  dependências.

## Important Decisions
- `auditoria-sinotico.md` e `_techspec.md` não existem no workspace atual.
  Segui a memória da task 22 e usei `_prd.md`, `task_21.md`, `task_22.md`,
  memórias das tasks 21/22 e `SinoticoPlanta.tsx` como base factual.
- Ponto de conexão escolhido: `x=460`, entre F-101 (`x=365,w=80`, fim `445`)
  e T-101 (`x=475`), preservando a linha vertical já apontada para o trecho
  correto antes do tanque.

## Learnings
- Sinal pré-mudança: a linha vertical de dosagem já está em `x=460`, mas o
  bloco `INJECAO` está em `x=370,w=90` (centro `415`), então o conector chega
  no canto direito do bloco, não no seu centro.
- Implementação final: `P-201 x=215`, `FIT-201 x=295`, `INJECAO x=405,w=110`.
  O centro de `INJECAO` fica em `x=460`, alinhado ao conector vertical e antes
  de T-101 (`x=475`).
- Inspeção por Firefox headless em `http://127.0.0.1:5173/` confirmou que a
  linha de dosagem entra limpa na linha principal e que o texto de
  `Injeção química` não trunca.

## Files / Surfaces
- Modificado: `frontend/src/componentes/SinoticoPlanta.tsx`.
- Ampliado: `frontend/src/componentes/componentes.test.tsx` com regressão de
  geometria da dosagem química.

## Errors / Corrections
- `AGENTS.md`, `CLAUDE.md`, `_techspec.md` e `auditoria-sinotico.md` não foram
  encontrados no workspace.
- `rg` não está instalado; buscas feitas com `find`, `grep`, `sed` e `nl`.
- O diretório atual não é um Git worktree detectável; `git status` falha.

## Ready for Next Run
- Task 23 implementada e validada. Evidências: `npm run typecheck`,
  `npm run build` e
  `npm run test -- --run src/componentes/componentes.test.tsx` passaram com
  exit code 0.
- Escopo não expandido: a seta vertical ainda usa o marcador padrão `seta`; o
  refinamento de tamanho/estilo das setas fica para a task 24 conforme fila da
  rodada visual.
