---
status: completed
title: Documentação técnica
type: docs
complexity: medium
dependencies:
  - task_10
  - task_11
---

# Task 12: Documentação técnica

## Overview

Cria toda a documentação técnica e acadêmica do projeto: README com instruções de execução, P&ID conceitual da planta, lista completa de instrumentos, folha de dados do FIT-101 e documentação da arquitetura de automação. Atende diretamente os 5 requisitos acadêmicos da disciplina.

<critical>
- ALWAYS READ o PRD (objetivos acadêmicos, Fase 3) e specs.md seções 19, 20, 21, 22 antes de começar
- REFERENCE specs.md para os conteúdos exatos de cada documento (P&ID já descrito na seção 19, lista na 20, folha de dados na 21, arquitetura na 22)
- FOCUS ON "WHAT" — criar os documentos com o conteúdo especificado; não redesenhar a arquitetura
- MINIMIZE CODE — documentação em Markdown; P&ID pode ser diagrama Mermaid ou draw.io
- TESTS REQUIRED — verificar que cada documento existe, tem as seções obrigatórias e atende os critérios mínimos (ex: folha de dados com >=10 especificações)
</critical>

<requirements>
- MUST criar `README.md` na raiz com seções: (1) Visão geral do projeto, (2) Como executar localmente com `.venv`, (3) Como executar via Docker Compose, (4) Como depurar no VS Code, (5) Estrutura do projeto
- MUST o README deve conter o comando `source .venv/bin/activate && pip install -e backend/[dev]` para execução local do backend
- MUST o README deve conter o comando `docker compose up --build` para execução Docker
- MUST criar `docs/pid-conceitual.md` com o P&ID conceitual em Mermaid ou descrição textual estruturada, identificando todos os instrumentos com seus tags industriais conforme specs.md seção 19
- MUST criar `docs/lista-instrumentos.md` com tabela de todos os 16 instrumentos da lista em specs.md seção 20: tag, instrumento, função
- MUST criar `docs/folha-dados-fit101.md` com no mínimo 14 especificações técnicas do FIT-101 conforme specs.md seção 21 (tag, serviço, tipo, fluido, faixa de medição, sinal de saída, comunicação, alimentação, precisão, diâmetro nominal, material eletrodos, material corpo, grau de proteção, temperatura operação, pressão máxima, instalação)
- MUST criar `docs/arquitetura-automacao.md` com os três níveis de automação (campo, controle, supervisão) conforme specs.md seção 22, incluindo a tabela de equivalência sistema real vs. sistema simulado
- MUST todos os documentos em português do Brasil
- MUST todos os documentos em Markdown com formatação clara e tabelas onde aplicável
</requirements>

## Subtasks

- [x] 12.1 Criar `README.md` raiz com instruções de execução local, Docker e VS Code debug
- [x] 12.2 Criar `docs/pid-conceitual.md` com P&ID em Mermaid ou texto estruturado com todos os instrumentos identificados
- [x] 12.3 Criar `docs/lista-instrumentos.md` com tabela dos 16 instrumentos
- [x] 12.4 Criar `docs/folha-dados-fit101.md` com as >=14 especificações técnicas do FIT-101
- [x] 12.5 Criar `docs/arquitetura-automacao.md` com os três níveis e tabela de equivalência

## Implementation Details

Ver specs.md seções 19–22 para o conteúdo exato de cada documento. O P&ID em `pid-conceitual.md` pode usar um diagrama Mermaid `flowchart TD` representando o fluxo de processo definido em specs.md seção 19. A `folha-dados-fit101.md` deve conter exatamente a tabela de specs.md seção 21 mais especificações adicionais para atingir >=14 itens. O `arquitetura-automacao.md` deve incluir a tabela de equivalência de specs.md seção 22.4.

### Relevant Files

- `.specs/specs.md` — seção 19 (P&ID), seção 20 (lista instrumentos), seção 21 (folha de dados FIT-101), seção 22 (arquitetura automação com 3 níveis e tabela equivalência)
- `.compozy/tasks/automacao-industrial-tratamento-agua/_prd.md` — seção "Objetivos → Requisitos Acadêmicos" (5 itens obrigatórios), seção "Métricas de Sucesso"
- `.compozy/tasks/automacao-industrial-tratamento-agua/adrs/adr-001.md` — contexto da decisão de arquitetura para referenciar no README

### Dependent Files

- `docs/roteiro-apresentacao.md` — task_13, roteiro referencia os documentos desta task

### Related ADRs

- [ADR-001: Abordagem de produto — Simulador web acadêmico com backend Python e frontend React](adrs/adr-001.md) — README deve explicar a relação entre o sistema simulado e o CLP/IHM real

## Deliverables

- `README.md` (raiz)
- `docs/pid-conceitual.md`
- `docs/lista-instrumentos.md`
- `docs/folha-dados-fit101.md`
- `docs/arquitetura-automacao.md`
- Unit tests com 80%+ coverage **(REQUIRED)**
- Integration tests de verificação de conteúdo obrigatório **(REQUIRED)**

## Tests

- Unit tests:
  - [ ] `README.md` existe e contém a string `docker compose up --build`
  - [ ] `README.md` contém a string `.venv` (instruções de uso do ambiente)
  - [ ] `docs/lista-instrumentos.md` existe e contém tabela com pelo menos 16 linhas (um por instrumento)
  - [ ] `docs/lista-instrumentos.md` contém a string `FIT-101`
  - [ ] `docs/folha-dados-fit101.md` existe e contém pelo menos 14 linhas de especificação técnica
  - [ ] `docs/folha-dados-fit101.md` contém as strings `4–20 mA` e `IP67`
  - [ ] `docs/arquitetura-automacao.md` contém as strings "campo", "controle" e "supervisão"
  - [ ] `docs/arquitetura-automacao.md` contém a tabela de equivalência com "CLP" e "Backend Python"
  - [ ] `docs/pid-conceitual.md` existe e contém todos os tags industriais principais (FIT-101, LIT-101, PIT-101)
- Integration tests:
  - [ ] Todos os 5 documentos existem nos caminhos esperados
  - [ ] README tem seções para execução local, Docker e VS Code
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All tests passing
- Test coverage >=80%
- `README.md` com instruções completas para execução local, Docker e VS Code debug
- `docs/lista-instrumentos.md` com 16 instrumentos identificados
- `docs/folha-dados-fit101.md` com >=14 especificações técnicas do FIT-101
- `docs/arquitetura-automacao.md` com os 3 níveis e tabela de equivalência real vs. simulado
- `docs/pid-conceitual.md` com todos os instrumentos identificados por tag
- Todos os 5 requisitos acadêmicos da disciplina cobertos pelos documentos
