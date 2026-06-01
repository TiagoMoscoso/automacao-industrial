---
status: completed
title: Auditar geometria e dados do sinóptico atual
type: docs
complexity: low
dependencies:
  - task_20
---

# Task 21: Auditar geometria e dados do sinóptico atual

## Overview
Ler `SinoticoPlanta.tsx` e os arquivos CSS relacionados ao sinóptico, documentar em detalhe todos os problemas geométricos, de escala, de dados e visuais identificados. O resultado é um documento `auditoria-sinotico.md` que servirá de referência para as tasks 22–25. Nenhum arquivo de código deve ser alterado nesta task.

<critical>
- ALWAYS READ `frontend/src/componentes/SinoticoPlanta.tsx`, `frontend/src/componentes/componentes.css` e `frontend/src/estilos/principal.css` antes de começar
- REFERENCE a lista de 11 problemas observados no PRD de refinamento do sinóptico como ponto de partida da auditoria
- FOCUS ON "WHAT" — documentar; não implementar nenhuma alteração de código
- MINIMIZE CODE — apenas escrita do documento de auditoria; zero alterações em componentes, estilos ou backend
- TESTS REQUIRED — verificar que o documento foi criado e contém as seções obrigatórias
</critical>

<requirements>
- MUST criar `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-sinotico.md` com as seguintes seções:
  1. Dimensões atuais do SVG (viewBox, largura, altura)
  2. Tabela de equipamentos com posição (x, y), dimensões (w, h) e estado visual atual
  3. Descrição das três linhas lógicas (principal, descarte, dosagem química) com coordenadas
  4. Problemas identificados numerados de 1 a 11 (conforme listagem do PRD de refinamento)
  5. Problemas adicionais encontrados na auditoria, se houver
  6. Referências de arquivos a modificar nas tasks seguintes
- MUST NOT alterar nenhum arquivo de código (`.tsx`, `.ts`, `.css`, `.html`, `.json`)
- MUST NOT alterar nenhum arquivo fora de `.compozy/tasks/automacao-industrial-tratamento-agua/`
- SHOULD incluir screenshots ou descrições textuais dos problemas visuais observados
- SHOULD avaliar se o valor "570%" do tanque é problema de lógica de formatação ou de escala visual
- SHOULD indicar quais problemas são de SVG/TSX e quais são de CSS para facilitar as tasks seguintes
</requirements>

## Subtasks
- [x] 21.1 Ler `SinoticoPlanta.tsx` e mapear posições, dimensões e lógica de todos os 14 equipamentos
- [x] 21.2 Ler `componentes.css` e `principal.css` e extrair todas as classes relacionadas ao sinóptico
- [x] 21.3 Documentar os 11 problemas visuais identificados com análise de causa-raiz em cada um
- [x] 21.4 Criar `auditoria-sinotico.md` com todas as seções obrigatórias
- [x] 21.5 Verificar que nenhum arquivo de código foi alterado

## Implementation Details
O documento de auditoria deve cobrir os 11 problemas observados no PRD:

1. Layout visualmente desequilibrado
2. Linha de dosagem química mal conectada à linha principal
3. Bloco "Injeção química" apertado e visualmente estranho
4. Conexão vertical da dosagem química com a linha principal grosseira
5. Seta verde vertical grande e dominante demais
6. Linha de descarte do tanque até XV-101 e Descarte pesada demais
7. Tanque T-101 grande demais em relação aos demais equipamentos
8. Valor do tanque exibindo "570%" (erro de formatação ou escala visual)
9. Muito espaço vazio à direita e abaixo do sinóptico
10. Setas e linhas sem aparência de diagrama técnico limpo
11. Sinóptico precisa parecer maquete industrial elegante, não caixas conectadas

Para cada problema, registrar:
- Causa provável (SVG/TSX ou CSS)
- Arquivo(s) a modificar
- Task responsável pela correção (22–25)

### Relevant Files
- `frontend/src/componentes/SinoticoPlanta.tsx` — componente principal do sinóptico
- `frontend/src/componentes/componentes.css` — estilos dos equipamentos SVG
- `frontend/src/estilos/principal.css` — variáveis de tema e layout geral

### Dependent Files
- `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-sinotico.md` — criado por esta task, lido pelas tasks 22–25

## Deliverables
- `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-sinotico.md` criado e completo **(REQUIRED)**
- Nenhum arquivo de código alterado **(REQUIRED)**

## Tests
- Unit tests:
  - [x] `auditoria-sinotico.md` existe em `.compozy/tasks/automacao-industrial-tratamento-agua/`
  - [x] O documento contém as 6 seções obrigatórias
  - [x] O documento lista os 11 problemas numerados
  - [x] O documento inclui tabela de equipamentos com posições e dimensões
- Integration tests:
  - [x] Nenhum arquivo em `frontend/` foi modificado (verificado por snapshot de timestamps; diretório não é Git worktree)
  - [x] Nenhum arquivo em `backend/` foi modificado (verificado por snapshot de timestamps; diretório não é Git worktree)
- Test coverage target: N/A (task documental)
- All tests must pass

## Success Criteria
- `auditoria-sinotico.md` criado com todas as seções obrigatórias
- 11 problemas documentados com análise de causa-raiz
- Tabela de equipamentos com posições e dimensões mapeadas
- Classificação de cada problema por arquivo de origem (TSX ou CSS)
- Nenhum arquivo de código alterado
