# Workflow Memory

Keep only durable, cross-task context here. Do not duplicate facts that are obvious from the repository, PRD documents, or git history.

## Current State

Task 01 complete. Monorepo structure exists. All subsequent tasks can reference backend and frontend paths.
Task 05 complete. Backend FastAPI is available through `criar_aplicacao()` and
`automacao_industrial.api.app:app`.

## Shared Decisions

- **Build backend**: Use `setuptools.build_meta` in `pyproject.toml`. The name `setuptools.backends.legacy:build` does not exist and will fail pip install.
- **Python env**: `.venv` at repo root uses Python 3.14.4 (symlink to `/usr/bin/python`). All Python commands must use `source .venv/bin/activate`. Do NOT create another venv.
- **No _techspec.md**: The techspec was not generated as a separate file. Use `specs.md` sections directly as source of truth for all implementation tasks.
- **Language**: All code, comments, variable names, and module names in Portuguese (BR), per specs.md section 16. Exceptions: library APIs, reserved words, standard filenames.

## Shared Learnings

- `tomllib` is stdlib in Python 3.11+; no extra dependency needed for TOML parsing in tests.
- ruff E501 applies to all lines including docstrings — keep all lines ≤88 chars in backend Python files. `# noqa` inside triple-quoted strings is NOT recognized; must shorten the line.
- ruff UP045 requires `X | None` instead of `Optional[X]`; no `from typing import Optional` needed in Python 3.11+.
- Coverage "module-not-imported" warning is harmless when running pytest from the repo root; it does not affect results.
- Docker BuildKit/Bake can fail from the non-ASCII workspace path
  `Automação Industrial` with a gRPC non-printable header error. Use
  `COMPOSE_BAKE=false DOCKER_BUILDKIT=0 docker compose ...` if that appears.

## Open Risks

- Python 3.14.4 is newer than `requires-python = ">=3.11"`. If any dependency has an upper bound on Python version, install may fail. Monitor when adding new dependencies.

## Handoffs
- Task 39 complete em 2026-06-01. O `README.md` agora inclui a seção
  "Arquitetura de Automação" para apoiar a task 40, com diagrama Mermaid,
  equipamentos por camada, comunicação, 6 equivalências real x simulado e
  diferenciação entre P&ID, sinóptico e arquitetura.
- Task 37 complete em 2026-06-01. `ArquiteturaAutomacao.tsx` existe como
  componente independente e usa `frontend/src/dados/arquiteturaAutomacao.ts`.
  A task 38 deve apenas integrar o componente na interface, sem recriar dados
  ou estilos de arquitetura.
- Task 21 complete em 2026-05-31. `auditoria-sinotico.md` foi reescrita como
  auditoria completa do estado atual do sinóptico, com geometria, tabela dos 14
  equipamentos, três linhas lógicas, 11 problemas classificados por causa,
  arquivos e tasks 22-25 responsáveis.
- Task 26 complete em 2026-05-31. Validação final do sinóptico registrada em
  `.compozy/tasks/automacao-industrial-tratamento-agua/validacao-sinotico.md`.
  Evidências: `npm run build`, `npm run typecheck`, `docker compose up --build`,
  smoke test do frontend/API via `curl` e screenshot Firefox headless.
- Tasks 21–26 (refinamento visual do sinóptico, rodada 2) abertas em 2026-05-31.
  Nova fila exclusiva para polir visualmente o `SinoticoPlanta.tsx`:
  auditoria geométrica e de dados (task_21) → proporções e formatação
  (task_22) → fluxo principal e dosagem química (task_23) →
  linha de descarte, setas e conectores (task_24) → cores, estados visuais
  e legibilidade (task_25) → build e inspeção visual final (task_26).

  Restrições da rodada:
  - Não alterar backend.
  - Não alterar contratos da API.
  - Não alterar Docker.
  - Não mexer no painel de cenários.
  - Não mexer no ajuste manual de variáveis.
  - Não implementar lógica industrial no frontend.
  - Não adicionar dependências pesadas.
  - Manter código, textos, comentários e documentação em português do Brasil.

  Objetivo visual:
  tornar o sinóptico mais limpo, geométrico, proporcional e didático para a
  apresentação acadêmica, corrigindo especialmente dosagem química, descarte,
  setas, conectores, proporções, cores e legibilidade.
- O artefato `auditoria-sinotico.md` exigido pelas tasks 22–26 foi recriado
  durante a task 25 a partir do estado atual do código, porque estava ausente
  no workspace apesar de ser requisito da task 21.
- Tasks 14–20 (refinamento visual frontend) **concluídas** (2026-05-31).
  Interface refinada com:
  - Controles de simulação removidos (task_15): `ControleSimulacao.tsx` existe
    mas não é renderizado em `PaginaPrincipal.tsx`.
  - Layout reestruturado com sinóptico em destaque (task_16): grid supervisório
    com painel lateral compacto e faixa inferior de variáveis.
  - Sinóptico SVG corrigido geometricamente (task_17): `viewBox 900×420`, todos
    os equipamentos da linha principal com `y=78, h=44`, três linhas lógicas
    separadas (principal y=100, descarte y=230, dosagem y=340).
  - Painéis operacionais polidos e coesos (task_18): hierarquia tipográfica,
    cores semânticas, espaçamento consistente.
  - Build e Docker validados (task_19): todos os 12 critérios de aceite do PRD
    passaram; evidências em `validacao-refinamento.md`.
  - Revisão final documentada (task_20): `docs/verificacao-final.md` atualizado
    com seção "Refinamento Visual do Frontend"; RF01–RF10 confirmados cobertos.
- Task 14 complete. Auditoria em
  `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-frontend.md`.
  Conflito crítico de tema: `componentes.css` usa light mode hardcoded
  (`#f8fafc`) enquanto `principal.css` define dark theme via custom properties.
  Tasks 16/18 devem unificar os temas. SVG do sinóptico tem `viewBox 900×420`
  com 14 nós e 5 linhas; bombas P-101/P-102 têm altura 58px vs 44px dos demais
  equipamentos — gera desalinhamento visual a corrigir na task_17.
- Task 04 complete. Simulation layer is fully implemented and tested.
- Task 05 API endpoints implemented: `GET /api/saude`,
  `GET /api/planta/estado`, `POST /api/planta/iniciar`,
  `POST /api/planta/pausar`, `POST /api/planta/reiniciar`,
  `POST /api/planta/variaveis`, `POST /api/planta/cenarios/{nome_cenario}`.
- Frontend tasks should consume `EstadoPlantaResponse` from the backend API.
  Control command field for FV-101 is
  `abertura_valvula_entrada_comandada_percentual`; measured/current valve
  field remains `abertura_valvula_entrada_percentual`.
- Task 06 complete. Frontend domain types expose camelCase fields; the API
  client maps backend `snake_case` responses to those frontend contracts.
- Matrix consolidation logic: AND for pump bools, AND for `processo_liberado`, OR for
  `valvula_descarte_abrir`, min() for `abertura_valvula_entrada_percentual`, extend for alarms.
- Task 10 Docker production serves frontend through nginx on port 80 and
  proxies `/api/*` to the `backend` Compose service on port 8000.
