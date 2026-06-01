# Task Memory: task_21.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Criar a auditoria documental do sinóptico atual em
  `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-sinotico.md`,
  sem alterar arquivos de código.
- Fonte primária lida: `SinoticoPlanta.tsx`, `componentes.css`,
  `principal.css`, `task_21.md`, `_prd.md`, `_tasks.md`, `adr-001.md` e
  memória compartilhada.

## Important Decisions
- Como o diretório atual não é um Git worktree, a checagem de "nenhum arquivo de
  código alterado" será feita por snapshot de timestamps dos arquivos de código
  em `frontend/` e `backend/`, além de restringir as edições via patch.

## Learnings
- O sinóptico atual usa `viewBox="0 0 900 420"`, sem `width`/`height`
  explícitos no SVG; a escala visual vem de CSS (`max-width: 100%`,
  `height: auto`) e do grid em `principal.css`.
- O valor do tanque é renderizado diretamente como
  `estado.nivelTanquePercentual%`, sem arredondamento, clamp ou validação visual.
- A auditoria final foi reescrita a partir do código atual e da lista de 11
  problemas da task; cada problema agora indica causa provável, arquivos e task
  22-25 responsável.
- No código atual, `formatarPercentualSinotico` já limita visualmente o nível
  entre 0 e 100; a auditoria classifica o "570%" como defesa/formatação de
  display no sinóptico, não como escala geométrica do tanque.

## Files / Surfaces
- Criado/reescrito: `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-sinotico.md`.
- Arquivos de código lidos e não modificados: `frontend/src/componentes/SinoticoPlanta.tsx`,
  `frontend/src/componentes/componentes.css`, `frontend/src/estilos/principal.css`.
- Atualizados para tracking/memória: `task_21.md`, `_tasks.md` e
  `memory/task_21.md`.

## Errors / Corrections
- `AGENTS.md` e `CLAUDE.md` solicitados no briefing não existem no repo atual.
- `rg` não está instalado; exploração feita com `find`, `grep`, `sed` e `nl`.
- O diretório não contém `.git`; `git status` não pode ser usado aqui.

## Ready for Next Run
- Auditoria criada e validada. Antes de qualquer handoff, reexecutar a
  verificação documental final se houver novas alterações de tracking.
