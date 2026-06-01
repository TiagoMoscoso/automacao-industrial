---
status: completed
title: API HTTP do backend
type: backend
complexity: medium
dependencies:
  - task_04
---

# Task 5: API HTTP do backend

## Overview

Implementa a camada de API do backend com FastAPI: os modelos Pydantic de request/response, os 7 endpoints da planta, a instância da aplicação com CORS e a factory que monta e conecta todas as camadas. Ao final desta task, o backend está funcional e acessível via HTTP.

<critical>
- ALWAYS READ o PRD (F1) e specs.md seções 10.8, 10.2 e 10.3 antes de começar
- REFERENCE specs.md seção 10.8 para os 7 endpoints mínimos com paths exatos
- FOCUS ON "WHAT" — expor os dados e aceitar os comandos; a lógica fica no ServicoSimulacao
- MINIMIZE CODE — rotas são finas: recebem request, chamam ServicoSimulacao, retornam response
- TESTS REQUIRED — testes de integração para cada endpoint cobrindo status code, payload e CORS
</critical>

<requirements>
- MUST implementar `esquemas.py` com modelos Pydantic para: `EstadoPlantatResponse` (espelho de `EstadoProcesso` + `AcoesControle` + alarmes), `AlterarVariaveisRequest` (dict de nome→valor), `AplicarCenarioRequest` (nome do cenário), `StatusSimulacaoResponse` (estado atual iniciada/pausada)
- MUST implementar `rotas_planta.py` com exatamente os 7 endpoints de specs.md seção 10.8:
  - `GET /api/saude` → retorna `{"status": "ok"}` e 200
  - `GET /api/planta/estado` → retorna `EstadoPlantaResponse` com estado completo atual
  - `POST /api/planta/iniciar` → inicia a simulação, retorna 200
  - `POST /api/planta/pausar` → pausa a simulação, retorna 200
  - `POST /api/planta/reiniciar` → reinicia ao estado de operação normal, retorna 200
  - `POST /api/planta/variaveis` → recebe `AlterarVariaveisRequest`, altera variáveis, retorna novo estado
  - `POST /api/planta/cenarios/{nome_cenario}` → aplica o cenário, retorna novo estado
- MUST implementar `app.py` com instância FastAPI, registro das rotas e CORS habilitado para `*` (didático) ou para `http://localhost:5173`
- MUST implementar `configuracao.py` com constantes de configuração: `HOST`, `PORTA`, `INTERVALO_SIMULACAO_S`
- MUST implementar `fabrica_aplicacao.py` com função `criar_aplicacao() -> FastAPI` que instancia `ServicoSimulacao`, cria o app e injeta a dependência
- MUST `POST /api/planta/cenarios/{nome_cenario}` retorna 404 se o cenário não existir
- MUST `POST /api/planta/variaveis` retorna 422 se o payload tiver campo inválido
- SHOULD usar `httpx.AsyncClient` nos testes de API para testar os endpoints sem subir servidor real
</requirements>

## Subtasks

- [x] 5.1 Implementar `esquemas.py` com todos os modelos Pydantic de request e response
- [x] 5.2 Implementar `rotas_planta.py` com os 7 endpoints, chamando `ServicoSimulacao` para cada operação
- [x] 5.3 Implementar `app.py` com a instância FastAPI e CORS configurado
- [x] 5.4 Implementar `configuracao.py` e `fabrica_aplicacao.py`
- [x] 5.5 Escrever `backend/tests/test_api_planta.py` com testes de integração para todos os 7 endpoints

## Implementation Details

Todos os arquivos em `backend/src/automacao_industrial/api/` e `aplicacao/`. A `fabrica_aplicacao.py` deve instanciar `ServicoSimulacao` e passá-la como dependência (FastAPI Depends ou via closure na criação das rotas). Usar `httpx.AsyncClient(app=app, base_url="http://test")` no pytest para testes sem servidor real. O `GET /api/planta/estado` é o endpoint mais chamado (polling ~1s do frontend) — manter sua resposta pequena e rápida. Ver specs.md seção 10.3 para justificativa de polling vs. SSE/WebSocket.

### Relevant Files

- `.specs/specs.md` — seção 10.8 (endpoints mínimos com paths), seção 10.2 (FastAPI), seção 10.3 (polling), seção 12.2 (dependências: fastapi, uvicorn, httpx)
- `.compozy/tasks/automacao-industrial-tratamento-agua/_prd.md` — seção F5 (execução via Docker, implica que API deve estar acessível na porta 8000)
- `backend/src/automacao_industrial/simulacao/servico_simulacao.py` — dependência principal das rotas
- `backend/src/automacao_industrial/simulacao/cenarios_simulacao.py` — usado para validar nomes de cenários
- `backend/src/automacao_industrial/api/__init__.py` e `aplicacao/__init__.py` — criados em task_01

### Dependent Files

- `frontend/src/servicos/clienteApiPlanta.ts` — task_06, consome exatamente estes endpoints e schemas
- `backend/Dockerfile` — task_10, usa o módulo de aplicação para iniciar o servidor (`uvicorn automacao_industrial.api.app:app`)
- `.vscode/launch.json` — task_11, inicia o backend apontando para `fabrica_aplicacao`

### Related ADRs

- [ADR-001: Abordagem de produto — Simulador web acadêmico com backend Python e frontend React](adrs/adr-001.md) — FastAPI escolhido pela documentação automática e tipagem, facilita debug durante apresentação

## Deliverables

- `backend/src/automacao_industrial/api/esquemas.py`
- `backend/src/automacao_industrial/api/rotas_planta.py`
- `backend/src/automacao_industrial/api/app.py`
- `backend/src/automacao_industrial/aplicacao/configuracao.py`
- `backend/src/automacao_industrial/aplicacao/fabrica_aplicacao.py`
- `backend/tests/test_api_planta.py`
- Unit tests com 80%+ coverage **(REQUIRED)**
- Integration tests para todos os 7 endpoints **(REQUIRED)**

## Tests

- Unit tests:
  - [ ] `GET /api/saude` retorna status 200 e body `{"status": "ok"}`
  - [ ] `GET /api/planta/estado` retorna status 200 e body com campo `nivel_tanque_percentual`
  - [ ] `POST /api/planta/iniciar` retorna status 200
  - [ ] `POST /api/planta/pausar` retorna status 200
  - [ ] `POST /api/planta/reiniciar` retorna status 200 e estado resetado para operação normal
  - [ ] `POST /api/planta/variaveis` com `{"ph": 9.1}` retorna 200 e novo estado com `processo_liberado=False`
  - [ ] `POST /api/planta/cenarios/nivel_alto_alto` retorna 200 e estado com nível=96.0
  - [ ] `POST /api/planta/cenarios/cenario_inexistente` retorna 404
  - [ ] `POST /api/planta/variaveis` com campo inválido retorna 422
- Integration tests:
  - [ ] `GET /api/planta/estado` após `POST /api/planta/cenarios/emergencia` retorna estado com `emergencia_acionada=True` e `processo_liberado=False`
  - [ ] `POST /api/planta/reiniciar` após cenário de emergência restaura `processo_liberado=True`
  - [ ] Resposta de `GET /api/planta/estado` contém headers CORS (`Access-Control-Allow-Origin`)
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All tests passing
- Test coverage >=80%
- Todos os 7 endpoints implementados e respondendo conforme specs.md seção 10.8
- CORS habilitado para o frontend (localhost:5173 ou `*`)
- `POST /api/planta/cenarios/{nome_cenario}` retorna 404 para cenário inexistente
- Backend inicializável via `uvicorn automacao_industrial.aplicacao.fabrica_aplicacao:criar_aplicacao --factory`
- Documentação automática FastAPI acessível em `/docs`
