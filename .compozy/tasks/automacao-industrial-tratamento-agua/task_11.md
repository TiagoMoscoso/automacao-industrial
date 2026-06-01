---
status: completed
title: Configuração VS Code debug
type: infra
complexity: low
dependencies:
  - task_05
  - task_08
---

# Task 11: Configuração VS Code debug

## Overview

Cria a configuração completa do VS Code para depurar backend Python e frontend React separadamente, com breakpoints funcionando em ambos. Permite ao estudante parar a execução na Matriz de Causa e Efeito durante a apresentação e explicar o código ao professor com o depurador ativo.

<critical>
- ALWAYS READ o PRD (F6, jornada secundária) e specs.md seções 15.1, 15.2, 15.3 antes de começar
- REFERENCE specs.md seção 15 para os 4 arquivos esperados e configurações obrigatórias de cada um
- FOCUS ON "WHAT" — criar configurações funcionais de debug; não modificar código-fonte
- MINIMIZE CODE — JSON/config apenas; nenhum código Python ou TypeScript nesta task
- TESTS REQUIRED — verificar que as configurações são JSON válido e contêm as chaves obrigatórias
</critical>

<requirements>
- MUST criar `.vscode/launch.json` com duas configurações de debug:
  1. "Backend Python" — tipo `python`, módulo ou arquivo de entrada do uvicorn, `pythonPath` apontando para `.venv/bin/python`, `env` com variáveis de desenvolvimento, `justMyCode: true`
  2. "Frontend React" — tipo `chrome` ou `msedge`, URL `http://localhost:5173`, `webRoot` para `frontend/src`, `sourceMapPathOverrides` para mapear sourcemaps do Vite
- MUST criar `.vscode/tasks.json` com tasks: "Instalar deps backend" (usando `.venv`), "Rodar backend", "Rodar testes backend", "Instalar deps frontend", "Rodar frontend (dev)", "Docker Compose up", "Docker Compose down"
- MUST criar `.vscode/settings.json` com `python.defaultInterpreterPath` apontando para `.venv/bin/python` e `editor.formatOnSave: true`
- MUST criar `.vscode/extensions.json` com extensões recomendadas: `ms-python.python`, `ms-python.pylance`, `dbaeumer.vscode-eslint`, `esbenp.prettier-vscode`, `ms-vscode.vscode-typescript-next`
- MUST o debug do backend deve obrigatoriamente usar `.venv` existente — não Python global
- MUST o debug do frontend deve usar sourcemaps do Vite para que breakpoints em `.tsx` funcionem no Chrome/Edge
- SHOULD a task "Rodar backend" deve ser o `preLaunchTask` da configuração de debug do backend
</requirements>

## Subtasks

- [x] 11.1 Criar `.vscode/launch.json` com configuração de debug do backend Python (via `.venv`) e do frontend React (Chrome/Edge + Vite)
- [x] 11.2 Criar `.vscode/tasks.json` com as 7 tasks de desenvolvimento
- [x] 11.3 Criar `.vscode/settings.json` com interpretador Python apontado para `.venv`
- [x] 11.4 Criar `.vscode/extensions.json` com extensões recomendadas

## Implementation Details

Ver specs.md seções 15.1, 15.2 e 15.3 para as configurações obrigatórias. Para o debug do backend, usar `"type": "debugpy"` (extensão Python moderna do VS Code) com `"request": "launch"`, `"module": "uvicorn"`, `"args": ["automacao_industrial.aplicacao.fabrica_aplicacao:criar_aplicacao", "--factory", "--reload"]`. Para o frontend, usar o Vite dev server (task "Rodar frontend" deve estar rodando) e a configuração Chrome com URL `http://localhost:5173`.

### Relevant Files

- `.specs/specs.md` — seção 15.1 (debug backend), seção 15.2 (debug frontend), seção 15.3 (tasks VS Code), seção 12.1 (uso obrigatório da .venv)
- `.compozy/tasks/automacao-industrial-tratamento-agua/_prd.md` — seção F6 (comportamento esperado do debug), jornada secundária
- `.venv/bin/python` — interpretador Python existente apontado pelas configs
- `backend/src/automacao_industrial/aplicacao/fabrica_aplicacao.py` — task_05, ponto de entrada do uvicorn no debug

### Dependent Files

- `README.md` — task_12, documenta como usar o debug no VS Code

### Related ADRs

- [ADR-001: Abordagem de produto — Simulador web acadêmico com backend Python e frontend React](adrs/adr-001.md) — Debug no VS Code é requisito explícito para demonstração durante apresentação

## Deliverables

- `.vscode/launch.json`
- `.vscode/tasks.json`
- `.vscode/settings.json`
- `.vscode/extensions.json`
- Unit tests com 80%+ coverage **(REQUIRED)**
- Integration tests de validação das configurações **(REQUIRED)**

## Tests

- Unit tests:
  - [x] `.vscode/launch.json` é JSON válido e contém configuração com `"name"` contendo "Backend"
  - [x] `.vscode/launch.json` é JSON válido e contém configuração com `"name"` contendo "Frontend"
  - [x] Configuração de debug do backend tem `"pythonPath"` ou `"python"` apontando para `.venv`
  - [x] `.vscode/tasks.json` é JSON válido e contém task com label "Rodar backend"
  - [x] `.vscode/settings.json` é JSON válido e tem `"python.defaultInterpreterPath"` com caminho da `.venv`
  - [x] `.vscode/extensions.json` é JSON válido e inclui `"ms-python.python"`
- Integration tests:
  - [x] Todos os 4 arquivos existem no diretório `.vscode/`
  - [x] Configuração do backend não referencia Python global (`/usr/bin/python`) — usa `.venv`
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All tests passing
- Test coverage >=80%
- Todos os 4 arquivos criados em `.vscode/`
- Debug do backend usa `.venv/bin/python` (não Python global)
- Debug do frontend usa sourcemaps do Vite para breakpoints em `.tsx`
- `settings.json` define interpretador Python da `.venv` como padrão do workspace
- `extensions.json` com extensões para Python, Pylance e ESLint
