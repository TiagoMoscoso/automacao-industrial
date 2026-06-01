---
status: completed
title: Validar sinóptico em build e inspeção visual
type: infra
complexity: low
dependencies:
  - task_25
---

# Task 26: Validar sinóptico em build e inspeção visual

## Overview

Executar a validação final da segunda rodada de refinamento do sinóptico da
planta. A task deve verificar build do frontend, funcionamento básico via Docker
quando aplicável e inspeção visual manual do sinóptico no navegador. O resultado
deve ser registrado em `validacao-sinotico.md`.

<critical>
- ALWAYS READ `auditoria-sinotico.md` antes de validar
- ALWAYS READ as tasks 22, 23, 24 e 25 para montar checklist visual
- FOCUS ON "WHAT" — validar e documentar; não implementar código novo
- MINIMIZE CODE — nenhuma alteração funcional nesta task
- TESTS REQUIRED — build do frontend e inspeção visual são obrigatórios
</critical>

<requirements>
- MUST executar `cd frontend && npm run build`
- MUST executar `cd frontend && npm run typecheck`, se o script existir
- MUST inspecionar visualmente o sinóptico no navegador
- MUST validar que os critérios das tasks 22, 23, 24 e 25 foram atendidos
- MUST criar `.compozy/tasks/automacao-industrial-tratamento-agua/validacao-sinotico.md`
- MUST registrar comandos executados, resultado, data e observações
- MUST NÃO implementar código novo
- MUST NÃO alterar backend
- MUST NÃO alterar contratos da API
- MUST NÃO alterar Docker
- SHOULD executar `docker compose up --build` quando aplicável
- SHOULD usar fallback de Docker caso ocorra erro de BuildKit/Bake por caminho com acento
</requirements>

## Subtasks

- [x] 26.1 Ler `auditoria-sinotico.md`
- [x] 26.2 Ler as tasks 22, 23, 24 e 25 e montar checklist de validação
- [x] 26.3 Executar `cd frontend && npm run build`
- [x] 26.4 Executar `cd frontend && npm run typecheck`, se o script existir
- [x] 26.5 Subir o frontend localmente ou via Docker para inspeção visual
- [x] 26.6 Conferir proporção do tanque T-101 e valor de nível
- [x] 26.7 Conferir linha de dosagem química
- [x] 26.8 Conferir linha de descarte, setas e conectores
- [x] 26.9 Conferir cores, contraste e legibilidade
- [x] 26.10 Criar `validacao-sinotico.md` com resultados e evidências textuais
- [x] 26.11 Atualizar `memory/MEMORY.md` com handoff da conclusão das tasks 21–26, se todos os critérios passarem

## Implementation Details

A validação deve ser objetiva e reproduzível.

Comandos mínimos:

```bash
cd frontend
npm run build
