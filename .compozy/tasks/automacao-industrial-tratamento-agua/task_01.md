---
status: completed
title: Estrutura do monorepo e configuração inicial
type: infra
complexity: low
dependencies: []
---

# Task 1: Estrutura do monorepo e configuração inicial

## Overview

Cria a estrutura completa de diretórios do monorepo e todos os arquivos de configuração iniciais de backend e frontend, sem implementar nenhuma lógica de negócio. Esta task é a base que todas as demais dependem — sem ela, nenhum módulo pode ser criado ou referenciado corretamente.

<critical>
- ALWAYS READ o PRD e o specs.md antes de começar
- REFERENCE specs.md seções 10.4 (estrutura backend), 11.3 (estrutura frontend), 9 (monorepo), 12 (ambiente Python) e 13 (ambiente frontend)
- FOCUS ON "WHAT" — criar estrutura e configuração, não implementar lógica
- MINIMIZE CODE — apenas arquivos de configuração e `__init__.py` vazios
- TESTS REQUIRED — verificar que a estrutura criada está correta e que as dependências instalam sem erro
</critical>

<requirements>
- MUST criar exatamente a estrutura de pastas definida no specs.md seção 9 e seções 10.4/11.3
- MUST criar `backend/pyproject.toml` com Python >=3.11, dependências de produção (fastapi, uvicorn, pydantic) e desenvolvimento (pytest, ruff, httpx), configuração ruff e pytest
- MUST criar `frontend/package.json` com scripts: dev, build, preview, lint; dependências react, react-dom, typescript, vite
- MUST criar `frontend/tsconfig.json` compatível com React + Vite
- MUST criar `frontend/vite.config.ts` com proxy apontando `/api` para `http://localhost:8000`
- MUST criar `__init__.py` vazio em cada pacote Python: `automacao_industrial/`, `dominio/`, `controle/`, `simulacao/`, `api/`, `aplicacao/`
- MUST usar obrigatoriamente a `.venv` já existente para qualquer execução local de Python — não criar outro ambiente virtual
- MUST verificar que `source .venv/bin/activate && python --version` executa sem erro
- SHOULD criar `.gitignore` na raiz cobrindo `.venv/`, `node_modules/`, `__pycache__/`, `*.pyc`, `dist/`, `.env`
</requirements>

## Subtasks

- [x] 1.1 Criar estrutura de diretórios do monorepo conforme specs.md seção 9 (`backend/`, `frontend/`, `docs/`, `.vscode/`, `.tasks/`)
- [x] 1.2 Criar `backend/pyproject.toml` com todas as dependências e configurações de ruff/pytest
- [x] 1.3 Criar todos os `__init__.py` nos pacotes Python definidos em specs.md seção 10.4
- [x] 1.4 Criar `frontend/package.json`, `frontend/tsconfig.json` e `frontend/vite.config.ts`
- [x] 1.5 Criar `.gitignore` na raiz
- [x] 1.6 Verificar que `.venv` existe e que `python --version` funciona com ela

## Implementation Details

Criar todos os arquivos de configuração exatamente nos caminhos definidos em specs.md. O `pyproject.toml` deve usar `[project]` com `requires-python = ">=3.11"` e `[tool.ruff]` com target `py311`. O `vite.config.ts` deve configurar o proxy `/api` → `http://localhost:8000` para que o frontend em dev consuma o backend sem CORS manual.

### Relevant Files

- `.specs/specs.md` — seções 9, 10.4, 11.3, 12.2, 12.3, 13 definem exatamente os arquivos a criar
- `.venv/` — ambiente Python existente a ser usado (não recriar)
- `.tasks/` — diretório já criado, apenas confirmar existência

### Dependent Files

- `backend/src/automacao_industrial/dominio/estado_processo.py` — criado em task_02, depende desta estrutura
- `backend/tests/` — criado em tasks subsequentes, depende do `pyproject.toml`
- `frontend/src/` — todos os componentes e domínio dependem do package.json e tsconfig

### Related ADRs

- [ADR-001: Abordagem de produto — Simulador web acadêmico com backend Python e frontend React](adrs/adr-001.md) — Justifica a separação backend/frontend no monorepo e o uso de FastAPI + React/Vite

## Deliverables

- Diretório `backend/` com estrutura de pacotes Python e `pyproject.toml`
- Diretório `frontend/` com `package.json`, `tsconfig.json`, `vite.config.ts`
- `.gitignore` na raiz
- Todos os `__init__.py` criados
- Verificação de que `.venv` funciona corretamente
- Testes de verificação de estrutura com cobertura >=80%

## Tests

- Unit tests:
  - [x] Verificar que todos os diretórios de pacotes Python existem (`dominio/`, `controle/`, `simulacao/`, `api/`, `aplicacao/`)
  - [x] Verificar que todos os `__init__.py` existem nos diretórios de pacotes
  - [x] Verificar que `pyproject.toml` é válido (parseable como TOML) e contém as chaves obrigatórias (`[project]`, `[tool.ruff]`, `[tool.pytest.ini_options]`)
  - [x] Verificar que `frontend/package.json` contém os scripts `dev`, `build`, `preview`, `lint`
  - [x] Verificar que `vite.config.ts` contém configuração de proxy para `/api`
- Integration tests:
  - [x] `source .venv/bin/activate && python -c "import sys; print(sys.version)"` executa sem erro
  - [x] `source .venv/bin/activate && pip install -e backend/[dev] --dry-run` não reporta conflitos de dependências
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All tests passing
- Test coverage >=80%
- Estrutura de pastas idêntica à definida em specs.md seções 9, 10.4 e 11.3
- `pyproject.toml` válido com todas as dependências declaradas
- `.venv` existente e funcional, sem novo ambiente criado
- `vite.config.ts` com proxy `/api` configurado
