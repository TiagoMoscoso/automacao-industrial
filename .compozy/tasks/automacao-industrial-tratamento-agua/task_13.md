---
status: completed
title: Roteiro de apresentação e verificação final
type: docs
complexity: low
dependencies:
  - task_12
---

# Task 13: Roteiro de apresentação e verificação final

## Overview

Cria o roteiro de 15 minutos para a apresentação acadêmica e executa o checklist completo de todos os 17 critérios de aceite do projeto. Garante que o estudante sabe exatamente o que mostrar e em que ordem, e que nenhum requisito acadêmico ou técnico ficou pendente.

<critical>
- ALWAYS READ o PRD (Fase 3, Métricas de Sucesso, jornada principal) e specs.md seção 27 antes de começar
- REFERENCE specs.md seção 27 para os 17 critérios de aceite que devem ser verificados um a um
- FOCUS ON "WHAT" — criar o roteiro didático e verificar os critérios; não implementar código
- MINIMIZE CODE — apenas Markdown; roteiro com tempos e pontos-chave
- TESTS REQUIRED — verificar que o roteiro tem os pontos obrigatórios e que o checklist está completo
</critical>

<requirements>
- MUST criar `docs/roteiro-apresentacao.md` com roteiro estruturado de 15 minutos com timestamps sugeridos, cobrindo: (1) Apresentação da planta e P&ID, (2) Demonstração da operação normal, (3) Explicação da Matriz de Causa e Efeito, (4) Acionamento dos 6 cenários de demonstração, (5) Ajuste manual de variável e intertravamento automático, (6) Breve tour pelo código no VS Code com breakpoint, (7) Encerramento
- MUST o roteiro deve ter tempo sugerido para cada bloco que some <=15 minutos
- MUST criar `docs/verificacao-final.md` com checklist dos 17 critérios de aceite de specs.md seção 27, com campo de status (pendente/ok) para cada item
- MUST o checklist deve cobrir obrigatoriamente os 5 requisitos acadêmicos da disciplina
- MUST o checklist deve cobrir os critérios técnicos: testes passando, Docker Compose funcional, `.venv` usada, VS Code debug funcional, código em português
- MUST todos os documentos em português do Brasil
- SHOULD o roteiro deve indicar quais slides ou telas mostrar em cada momento (ex: "mostrar sinóptico com operação normal", "abrir VS Code com breakpoint na matriz_causa_efeito.py")
</requirements>

## Subtasks

- [x] 13.1 Criar `docs/roteiro-apresentacao.md` com roteiro de 15 minutos com timestamps, pontos-chave e o que mostrar em cada momento
- [x] 13.2 Criar `docs/verificacao-final.md` com checklist dos 17 critérios de aceite de specs.md seção 27
- [x] 13.3 Preencher o checklist verificando cada critério contra o estado atual do projeto

## Implementation Details

Ver specs.md seção 27 para os 17 critérios exatos a verificar. O roteiro de 15 minutos deve ser realista — reservar pelo menos 3 minutos para a demonstração ao vivo dos cenários e 2 minutos para o tour no código. O checklist de verificação final deve ser o primeiro artefato consultado antes de considerar o projeto pronto.

### Relevant Files

- `.specs/specs.md` — seção 27 (17 critérios de aceite do projeto), seção 28 (ordem de ações), seção 26 (6 cenários)
- `.compozy/tasks/automacao-industrial-tratamento-agua/_prd.md` — seção "Objetivos acadêmicos" (5 requisitos), "Jornada principal" (7 passos), "Métricas de Sucesso", seção "Plano de Entrega — Fase 3"
- `docs/pid-conceitual.md` — task_12, referenciado no roteiro (momento 1)
- `docs/arquitetura-automacao.md` — task_12, referenciado no roteiro (momento 1)

### Dependent Files

Nenhum arquivo de código depende desta task — ela é o ponto final do projeto.

### Related ADRs

- [ADR-001: Abordagem de produto — Simulador web acadêmico com backend Python e frontend React](adrs/adr-001.md) — Contexto da decisão que justifica a estrutura da apresentação

## Deliverables

- `docs/roteiro-apresentacao.md`
- `docs/verificacao-final.md`
- Unit tests com 80%+ coverage **(REQUIRED)**
- Integration tests de verificação de conteúdo do roteiro e checklist **(REQUIRED)**

## Tests

- Unit tests:
  - [ ] `docs/roteiro-apresentacao.md` existe e contém a string "15 minutos" ou timestamps de duração
  - [ ] `docs/roteiro-apresentacao.md` menciona os 6 cenários de demonstração
  - [ ] `docs/roteiro-apresentacao.md` menciona o VS Code e breakpoint
  - [ ] `docs/roteiro-apresentacao.md` menciona a Matriz de Causa e Efeito
  - [ ] `docs/verificacao-final.md` existe e contém os 17 critérios de aceite de specs.md seção 27
  - [ ] `docs/verificacao-final.md` contém as strings "Docker Compose", ".venv" e "VS Code"
  - [ ] `docs/verificacao-final.md` contém os 5 requisitos acadêmicos (P&ID, lista de instrumentos, folha de dados, arquitetura, matriz)
- Integration tests:
  - [ ] Todos os 2 documentos existem nos caminhos esperados
  - [ ] `docs/verificacao-final.md` tem 17 itens de checklist (um por critério de aceite de specs.md seção 27)
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All tests passing
- Test coverage >=80%
- Roteiro de apresentação com timestamps que somam <=15 minutos
- Roteiro cobre todos os 6 cenários de demonstração
- Checklist com todos os 17 critérios de aceite de specs.md seção 27
- Os 5 requisitos acadêmicos da disciplina verificados no checklist
- Todos os documentos em português do Brasil
