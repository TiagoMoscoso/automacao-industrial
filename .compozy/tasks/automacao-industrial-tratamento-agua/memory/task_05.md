# Task Memory: task_05.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Implementar a API HTTP FastAPI da planta com 7 endpoints de specs.md §10.8,
  CORS, factory `criar_aplicacao()` e testes de integração.

## Important Decisions
- Baseline antes das edições: `pytest tests/test_api_planta.py` falha com
  exit code 4 porque o arquivo ainda não existe.
- Rotas `iniciar` e `pausar` retornam `StatusSimulacaoResponse`.
  `reiniciar`, `variaveis` e `cenarios` retornam `EstadoPlantaResponse`.
- Testes usam `httpx.AsyncClient` com `ASGITransport`, pois httpx 0.28.1 não
  aceita mais o atalho `AsyncClient(app=...)`.

## Learnings
- `AGENTS.md` e `CLAUDE.md` não existem na raiz deste workspace; usar PRD,
  specs.md, ADR e código existente como fonte de verdade.
- CORS só aparece em resposta comum quando a requisição inclui header `Origin`;
  o teste de CORS envia `Origin: http://localhost:5173`.

## Files / Surfaces
- `backend/src/automacao_industrial/api/esquemas.py` e
  `backend/src/automacao_industrial/aplicacao/configuracao.py` já existem e
  serão reaproveitados.
- Implementados/ajustados: `api/rotas_planta.py`, `api/app.py`,
  `aplicacao/fabrica_aplicacao.py`, `api/esquemas.py`,
  `backend/tests/test_api_planta.py`.
- `ruff format` também reformatou arquivos existentes apontados pelo check:
  `simulacao/cenarios_simulacao.py`, `simulacao/servico_simulacao.py` e
  `tests/test_dominio.py`.

## Errors / Corrections
- Troquei `FastAPI.on_event("shutdown")` por lifespan para remover warning de
  depreciação.
- Corrigidas linhas longas em `api/esquemas.py` e `api/rotas_planta.py`.

## Ready for Next Run
- Validação final executada: `pytest` no backend passou com 170 testes e 99%
  de cobertura; `ruff check .` e `ruff format --check .` passaram; factory
  `criar_aplicacao()` expõe os 7 endpoints mínimos e `/docs`.
