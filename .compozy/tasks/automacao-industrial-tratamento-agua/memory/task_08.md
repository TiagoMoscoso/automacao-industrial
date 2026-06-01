# Task Memory: task_08.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot

- Implementar a página principal React em `frontend/src`, integrando os
  componentes da task 07 ao cliente HTTP da task 06 com polling a cada 1000 ms.
- Baseline antes das edições: `npm run typecheck` passa, mas
  `PaginaPrincipal.tsx`, `App.tsx`, `main.tsx` e `principal.css` ainda não
  existem.

## Important Decisions

- `PaginaPrincipal` mantém `EstadoPlanta` por `useState`, sem context, e faz
  polling com `window.setInterval` de 1000 ms.
- Os comandos `iniciar`, `pausar` e `reiniciar` chamam a API de comando e em
  seguida fazem `obterEstado()`, porque esses endpoints retornam status do loop
  e não o estado completo da planta.
- `PainelAjusteVariaveis` foi implementado como painel mínimo/placeholder com
  três campos (`nivel_tanque_percentual`, `ph`, `turbidez_ntu`) para já
  exercitar o callback `alterarVariaveis`; task 09 pode expandir.

## Learnings

- O projeto não tem `AGENTS.md`/`CLAUDE.md` no repositório; há apenas
  `.claude/settings.local.json`.
- `frontend/index.html` existia sem script de entrada. Foi necessário incluir
  `<script type="module" src="/src/main.tsx"></script>`; antes disso, o build
  transformava só 1 módulo e não montaria a aplicação no navegador.

## Files / Surfaces

- Planejado: `frontend/src/paginas/PaginaPrincipal.tsx`,
  `frontend/src/App.tsx`, `frontend/src/main.tsx`,
  `frontend/src/estilos/principal.css` e testes de página/app.
- Tocados: `frontend/index.html`,
  `frontend/src/componentes/PainelAjusteVariaveis.tsx`,
  `frontend/src/paginas/PaginaPrincipal.tsx`,
  `frontend/src/paginas/PaginaPrincipal.test.tsx`,
  `frontend/src/App.tsx`, `frontend/src/main.tsx`,
  `frontend/src/estilos/principal.css`.

## Errors / Corrections

- Testes com fake timers globais travavam `waitFor`; correção foi restringir
  fake timers aos casos de polling/cleanup e usar timers reais nos demais testes.
- O teste de comando de simulação passou a clicar `Pausar` após o estado carregado,
  porque `Iniciar` fica desabilitado quando a simulação aparece ativa.

## Ready for Next Run

- Verificação local executada: frontend `typecheck`, `lint`, `test` com
  cobertura, `build`; backend `pytest`; backend e Vite iniciados localmente e
  `GET /api/planta/estado` respondeu diretamente e via dev server.
