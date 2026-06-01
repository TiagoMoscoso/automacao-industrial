---
status: completed
title: Validar build, Docker e inspeção visual
type: infra
complexity: medium
dependencies:
  - task_18
---

# Task 19: Validar build, Docker e inspeção visual

## Overview
Executar o pipeline completo de validação técnica e visual após o refinamento: build de produção do frontend, execução via Docker Compose, verificação da integração frontend-backend em funcionamento e inspeção visual no navegador conferindo os critérios de aceite do refinamento. Garantir que nenhuma regressão técnica ou visual foi introduzida nas tasks 14–18.

<critical>
- ALWAYS READ o PRD de refinamento (seção RF10, critérios de aceite da seção 14) antes de começar
- REFERENCE os 12 critérios de aceite futuros definidos na seção 14 do PRD como checklist de inspeção visual
- FOCUS ON "WHAT" — executar e verificar; não implementar código novo
- MINIMIZE CODE — apenas scripts de validação; nenhuma alteração de componentes ou estilos
- TESTS REQUIRED — registrar resultado de cada validação com status explícito (passou/falhou)
</critical>

<requirements>
- MUST executar `cd frontend && npm run build` e confirmar exit code 0
- MUST executar `cd frontend && npm run typecheck` e confirmar zero erros TypeScript
- MUST executar `cd frontend && npm run lint` e confirmar zero erros de lint
- MUST executar `cd frontend && npm run test` e confirmar que todos os testes passam
- MUST executar `docker compose up --build` a partir da raiz do repositório
- MUST usar o fallback `COMPOSE_BAKE=false DOCKER_BUILDKIT=0 docker compose up --build` caso o BuildKit falhe por causa do caminho com acento no diretório
- MUST verificar que o frontend está acessível em `http://localhost:80` (ou porta equivalente do Docker)
- MUST verificar que o frontend se comunica com o backend consultando `GET /api/saude` e `GET /api/planta/estado`
- MUST realizar inspeção visual no navegador verificando cada um dos 12 critérios de aceite da seção 14 do PRD
- MUST registrar o resultado de cada critério de aceite com status explícito (passou/falhou) em um documento de validação
- SHOULD verificar os 6 cenários de demonstração acionando-os na interface
- SHOULD verificar o painel de ajuste manual alterando ao menos uma variável e observando o efeito
</requirements>

## Subtasks
- [x] 19.1 Executar `npm run build`, `npm run typecheck`, `npm run lint` e `npm run test` no frontend e registrar resultados
- [x] 19.2 Executar `docker compose up --build` (com fallback se necessário) e verificar que os serviços sobem sem erro
- [x] 19.3 Abrir o frontend no navegador (`http://localhost:80`) e verificar que a interface carrega sem erros de console
- [x] 19.4 Acionar os 6 cenários de demonstração e verificar que alarmes, atuadores e sinóptico atualizam corretamente
- [x] 19.5 Preencher o documento de validação em `.compozy/tasks/automacao-industrial-tratamento-agua/validacao-refinamento.md` com resultado de cada critério de aceite

## Implementation Details
Nenhum arquivo de código será modificado. A task produz apenas um documento de validação.

Caminho do documento de saída:
`.compozy/tasks/automacao-industrial-tratamento-agua/validacao-refinamento.md`

O documento deve listar cada um dos 12 critérios da seção 14 do PRD com status (passou/falhou) e observação quando falhou:

```
1. O painel Simulação não aparece mais na interface — passou/falhou
2. Os botões Iniciar, Pausar e Reiniciar não aparecem mais — passou/falhou
3. Cenários de demonstração continuam funcionando — passou/falhou
4. Ajuste manual de variáveis continua funcionando — passou/falhou
5. Sinóptico mais alinhado, limpo e legível — passou/falhou
6. Setas e conexões do sinóptico visualmente consistentes — passou/falhou
7. Cards com espaçamento e hierarquia melhores — passou/falhou
8. Alarmes e estados críticos evidentes sem poluição visual — passou/falhou
9. Tela adequada para apresentação acadêmica — passou/falhou
10. npm run build passa — passou/falhou
11. docker compose up --build funciona — passou/falhou
12. Interface comunica com o backend — passou/falhou
```

Comando Docker com fallback (registrado na memória do workflow):
```bash
COMPOSE_BAKE=false DOCKER_BUILDKIT=0 docker compose up --build
```

### Relevant Files
- `frontend/package.json` — scripts de build, typecheck, lint e test
- `docker-compose.yml` — configuração Docker Compose
- `.compozy/tasks/automacao-industrial-tratamento-agua/memory/MEMORY.md` — fallback BuildKit documentado
- `.compozy/tasks/prd-refinamento-frontend.md/prd-refinamento-frontend.md` — 12 critérios de aceite (seção 14)

### Dependent Files
- `.compozy/tasks/automacao-industrial-tratamento-agua/validacao-refinamento.md` — criado por esta task, lido pela task_20

### Related ADRs
- [ADR-001: Abordagem de produto](adrs/adr-001.md) — Confirma que Docker Compose e VS Code debug são entregas do projeto

## Deliverables
- `.compozy/tasks/automacao-industrial-tratamento-agua/validacao-refinamento.md` com resultado de todos os 12 critérios
- `npm run build` passando **(REQUIRED)**
- `docker compose up --build` funcional **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] `npm run build` retorna exit code 0 sem erros de compilação
  - [ ] `npm run typecheck` retorna exit code 0 sem erros TypeScript
  - [ ] `npm run lint` retorna exit code 0 sem erros de lint
  - [ ] `npm run test` retorna exit code 0 com todos os testes passando
- Integration tests:
  - [ ] `docker compose up --build` sobe todos os serviços sem erro de saída
  - [ ] `GET http://localhost:80` retorna HTTP 200 com conteúdo HTML da interface
  - [ ] `GET http://localhost:80/api/saude` retorna HTTP 200 (proxy nginx → backend)
  - [ ] `GET http://localhost:80/api/planta/estado` retorna JSON com campos do `EstadoPlantaResponse`
  - [ ] `validacao-refinamento.md` existe e lista os 12 critérios de aceite todos com status "passou"
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- `npm run build` e `docker compose up --build` executam sem erros
- Todos os 12 critérios de aceite da seção 14 do PRD marcados como "passou"
- Documento `validacao-refinamento.md` criado e preenchido
- Nenhum arquivo de código foi modificado durante esta task
