# Task Memory: task_14.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot

Produzir `auditoria-frontend.md` com 9 seções obrigatórias documentando a estrutura atual do frontend sem modificar código. Referência: RF03 do PRD de refinamento.

## Important Decisions

- Incluiu seção "Problemas Visuais" (PV-01 a PV-08) com observações concretas para orientar tasks 15–18.
- Contou 10 seções numeradas (9 obrigatórias + seção extra "Referência de arquivos") — todos os testes passam com ≥9 seções.

## Learnings

- `componentes.css` usa cores hardcoded em light mode (`#f8fafc`, `#17202a`), enquanto `principal.css` define dark theme via custom properties — conflito de tema identificado como PV-01.
- O SVG do sinóptico usa `viewBox="0 0 900 420"` com 14 equipamentos e 5 linhas de processo. Bombas P-101 e P-102 têm altura 58px (vs 44px dos demais nós), rompendo alinhamento visual — identificado como PV-04.
- O marcador de seta é aplicado em todas as linhas, incluindo a ascendente de dosagem química — identificado como PV-05.
- `ControleSimulacao` está em `area-controles` junto com `PainelCenarios`, ocupa espaço que será liberado na task_15.

## Files / Surfaces

- Criado: `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-frontend.md`
- Lidos (sem modificação): todos os arquivos TSX, CSS e TS do frontend listados no relatório

## Errors / Corrections

- Nenhum.

## Ready for Next Run

- `auditoria-frontend.md` está pronto e passa 50/50 verificações.
- Task_15 pode usar o relatório como referência para remover `ControleSimulacao.tsx` e seu acoplamento em `PaginaPrincipal.tsx` + `principal.css`.
- PV-01 (conflito de tema CSS) é o item de maior impacto para as tasks de estilo (16/18).
