---
status: completed
title: Configuração Docker Compose
type: infra
complexity: medium
dependencies:
  - task_05
  - task_08
---

# Task 10: Configuração Docker Compose

## Overview

Cria a configuração Docker completa para executar o sistema inteiro com um único comando. Garante que `docker compose up --build` sobe backend e frontend, o frontend é acessível no navegador e se comunica com o backend. Esta task é crítica para a demonstração em sala — o sistema deve subir sem erros em qualquer máquina.

<critical>
- ALWAYS READ o PRD (F5) e specs.md seções 14 e 9 antes de começar
- REFERENCE specs.md seção 14 para os arquivos esperados, portas, serviços mínimos e comandos
- FOCUS ON "WHAT" — fazer o sistema subir e ser acessível; não otimizar a imagem agora
- MINIMIZE CODE — Dockerfiles simples e funcionais; sem multi-stage complexo no primeiro momento
- TESTS REQUIRED — verificar que `docker compose up --build` sobe sem erros e os endpoints respondem
</critical>

<requirements>
- MUST criar `backend/Dockerfile` que instala dependências do `pyproject.toml` e inicia o servidor com `uvicorn` na porta 8000
- MUST criar `frontend/Dockerfile` com build multi-stage: estágio de build com Node e `npm run build`, estágio final com nginx servindo os arquivos estáticos na porta 80
- MUST criar `docker-compose.yml` com dois serviços: `backend` (porta 8000) e `frontend` (porta 80), com `frontend` dependendo de `backend`
- MUST criar `docker-compose.dev.yml` com volumes montados e hot reload para desenvolvimento (backend com `--reload`, frontend com servidor Vite na porta 5173)
- MUST criar `.dockerignore` na raiz excluindo `.venv/`, `node_modules/`, `__pycache__/`, `*.pyc`, `.git/`, `.compozy/`, `.specs/`
- MUST o frontend em produção deve se comunicar com o backend via nome de serviço Docker (`http://backend:8000`) ou via proxy Nginx
- MUST o CORS do backend deve aceitar a origem do frontend em ambos os ambientes (localhost:5173 em dev, porta 80 em prod)
- MUST `docker compose up --build` deve completar sem erros e `curl http://localhost:8000/api/saude` deve retornar `{"status": "ok"}`
- MUST o frontend em `http://localhost` (porta 80) deve carregar a aplicação React e fazer polling do backend com sucesso
- SHOULD backend não usar a `.venv` local no Docker — deve instalar dependências via pip no Dockerfile
</requirements>

## Subtasks

- [x] 10.1 Criar `backend/Dockerfile` com instalação de dependências via pip e início com uvicorn
- [x] 10.2 Criar `frontend/Dockerfile` com build multi-stage (node build + nginx serve)
- [x] 10.3 Criar `docker-compose.yml` com serviços backend e frontend e configuração de rede
- [x] 10.4 Criar `docker-compose.dev.yml` com volumes e hot reload
- [x] 10.5 Criar `.dockerignore` na raiz
- [x] 10.6 Verificar comunicação frontend→backend dentro do Docker Compose

## Implementation Details

Ver specs.md seção 14 para os arquivos esperados e portas. O `frontend/Dockerfile` deve copiar o `nginx.conf` ou usar configuração padrão do nginx que redireciona `/api/*` para o serviço backend (`proxy_pass http://backend:8000`). Isso elimina problemas de CORS em produção. O `docker-compose.yml` deve definir uma network compartilhada para que `frontend` alcance `backend` pelo nome do serviço. Para o backend, instalar dependências com `pip install -e .` ou `pip install .` sem usar `.venv`.

### Relevant Files

- `.specs/specs.md` — seção 14 (regras obrigatórias Docker: arquivos, portas, serviços, comandos esperados)
- `.compozy/tasks/automacao-industrial-tratamento-agua/_prd.md` — seção F5 (comportamento esperado do Docker Compose)
- `backend/pyproject.toml` — task_01, define dependências instaladas no Dockerfile do backend
- `frontend/package.json` — task_01, define scripts de build usados no Dockerfile do frontend
- `backend/src/automacao_industrial/aplicacao/fabrica_aplicacao.py` — task_05, ponto de entrada do uvicorn
- `frontend/vite.config.ts` — task_01, proxy de dev (usado no docker-compose.dev.yml, não no prod)

### Dependent Files

- `.vscode/tasks.json` — task_11, inclui tasks para rodar `docker compose up` e `docker compose down`
- `README.md` — task_12, documenta os comandos Docker para execução

### Related ADRs

- [ADR-001: Abordagem de produto — Simulador web acadêmico com backend Python e frontend React](adrs/adr-001.md) — Docker Compose garante execução em qualquer máquina durante apresentação sem configuração manual

## Deliverables

- `backend/Dockerfile`
- `frontend/Dockerfile`
- `docker-compose.yml`
- `docker-compose.dev.yml`
- `.dockerignore`
- Testes de verificação de execução via Docker Compose
- Unit tests com 80%+ coverage **(REQUIRED)**
- Integration tests de subida dos serviços e comunicação **(REQUIRED)**

## Tests

- Unit tests:
  - [x] `backend/Dockerfile` contém instrução `EXPOSE 8000`
  - [x] `frontend/Dockerfile` contém dois estágios (build e serve)
  - [x] `docker-compose.yml` define os serviços `backend` e `frontend`
  - [x] `docker-compose.yml` mapeia porta `8000:8000` para backend e `80:80` para frontend
  - [x] `.dockerignore` exclui `.venv/` e `node_modules/`
- Integration tests:
  - [x] `docker compose up --build` completa sem erros (exit code 0)
  - [x] `curl http://localhost:8000/api/saude` retorna `{"status": "ok"}` com status 200
  - [x] `curl http://localhost` retorna HTML da aplicação React (status 200)
  - [x] Frontend em `http://localhost` consegue fazer `GET /api/planta/estado` (sem erro de CORS)
  - [x] `docker compose down` para ambos os serviços sem erros
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All tests passing
- Test coverage >=80%
- `docker compose up --build` sobe sem erros
- Backend acessível em `http://localhost:8000`
- Frontend acessível em `http://localhost`
- Frontend comunica com backend dentro do Docker sem erros de CORS
- `.dockerignore` correto (`.venv` e `node_modules` excluídos)
