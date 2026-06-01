---
status: completed
title: Revisar roteiro de apresentação de 15 minutos com foco nos requisitos acadêmicos
type: docs
complexity: low
dependencies:
  - task_38
  - task_39
---

# Task 40: Revisar roteiro de apresentação de 15 minutos com foco nos requisitos acadêmicos

## Overview

Atualizar ou criar o roteiro final de apresentação oral do projeto, organizado para caber em 15 minutos e cobrir explicitamente todos os cinco requisitos da disciplina. O roteiro orienta o apresentador sobre quando mostrar cada documento ou tela (sinóptico, P&ID, folha de dados, arquitetura, matriz de Causa e Efeito), indica os tempos recomendados por bloco e deixa claro que o sistema Python + React é uma simulação didática — e não um sistema de automação industrial real. O arquivo deve ser fácil de ler durante a apresentação, com marcações de tempo e pontos de ação ("mostrar tela X", "abrir documento Y").

<critical>
- ALWAYS READ o roteiro de apresentação existente (task_13 e qualquer atualização posterior), o `_prd.md` e os requisitos acadêmicos listados no PRD
- REFERENCE a seção de arquitetura do README (task_39) e a seção na interface (task_38) para saber exatamente o que será mostrado
- FOCUS ON "WHAT" — escrever/atualizar o roteiro; não criar novos componentes ou código
- MINIMIZE CODE — apenas Markdown; sem scripts, sem automação
- TESTS REQUIRED — verificar que todos os 5 requisitos acadêmicos aparecem explicitamente no roteiro e que o tempo total soma 15 minutos
</critical>

<requirements>
- MUST organizar o roteiro em 6 blocos com tempo definido totalizando 15 minutos
- MUST bloco 1 (2 min): Planta escolhida, variáveis do processo e justificativa
- MUST bloco 2 (3 min): P&ID e lista de instrumentos — mostrar o P&ID e citar os 10+ instrumentos
- MUST bloco 3 (2 min): Folha de dados do FIT-101 — mostrar as 10+ especificações técnicas
- MUST bloco 4 (3 min): Arquitetura de automação — mostrar seção na interface e diagrama no README
- MUST bloco 5 (4 min): Matriz de Causa e Efeito e demonstração ao vivo no simulador
- MUST bloco 6 (1 min): Fechamento — resumo e perguntas
- MUST cada bloco indicar qual tela, documento ou componente abrir durante a apresentação
- MUST o roteiro mencionar explicitamente que "Python simula o CLP" e "React simula a IHM/SCADA"
- MUST o roteiro deixar claro que o sistema é uma simulação didática, não um sistema industrial real
- MUST NÃO ultrapassar 15 minutos no total
- SHOULD incluir dicas de transição entre blocos ("ao fechar o P&ID, abrir o simulador")
- SHOULD incluir uma checklist de preparação antes da apresentação (arquivos abertos, simulador rodando, etc.)
</requirements>

## Subtasks

- [x] 40.1 Ler o roteiro existente (task_13 ou arquivo de apresentação gerado) e os requisitos acadêmicos no `_prd.md`
- [x] 40.2 Verificar o que foi implementado nas tasks 36–39 para saber o que estará disponível na interface
- [x] 40.3 Escrever ou atualizar o roteiro com os 6 blocos e os tempos definidos
- [x] 40.4 Adicionar marcações de ação ("mostrar", "abrir", "demonstrar") em cada bloco
- [x] 40.5 Adicionar checklist de preparação pré-apresentação
- [x] 40.6 Revisar se todos os 5 requisitos acadêmicos aparecem explicitamente
- [x] 40.7 Salvar o roteiro em `docs/roteiro-apresentacao.md` (ou atualizar o arquivo existente)

## Implementation Details

Estrutura esperada do roteiro:

```markdown
# Roteiro de Apresentação — Simulador de Tratamento de Água
**Tempo total: 15 minutos**

---

## Checklist pré-apresentação
- [ ] Simulador rodando (`docker compose up` ou `npm run dev` + `uvicorn`)
- [ ] P&ID conceitual aberto (PDF ou imagem)
- [ ] Folha de dados do FIT-101 aberta
- [ ] README aberto na seção "Arquitetura de Automação"
- [ ] Navegador na página principal do simulador

---

## Bloco 1 — Planta e variáveis (2 min)
**Requisito atendido: #1 — Planta com mínimo 10 variáveis**

- Apresentar: planta de tratamento de água com etapas de captação, filtração e distribuição
- Citar as variáveis monitoradas: vazão (FIT-101, FIT-102, FIT-201), nível (LIT-101),
  pressão (PIT-101, DPIT-101), temperatura (TIT-101), pH (AIT-101), cloro (AIT-102), turbidez (AIT-103)
- **Mostrar:** sinóptico da planta no simulador (tela inicial)
- Total: 10 variáveis de processo + atuadores

---

## Bloco 2 — P&ID e lista de instrumentos (3 min)
**Requisito atendido: #2 — P&ID com identificação e lista de instrumentos**

- **Abrir:** P&ID conceitual (PDF/imagem)
- Explicar a simbologia ISA: transmissores (IT), válvulas (V), bombas (P)
- Percorrer a lista de instrumentos: tag, função, tipo de sinal
- Destacar: FIT-101, LIT-101, AIT-101/102/103 como instrumentos analíticos críticos
- Transição: "Com os instrumentos identificados, vejamos a especificação técnica de um deles"

---

## Bloco 3 — Folha de dados do FIT-101 (2 min)
**Requisito atendido: #3 — Folha de dados com mínimo 10 especificações**

- **Abrir:** folha de dados do FIT-101 (PDF ou seção de especificações na interface)
- Percorrer as 10+ especificações: tag, descrição, princípio de medição, faixa, sinal de saída,
  alimentação, proteção IP, temperatura de operação, classe de exatidão, normas aplicáveis
- Destacar: por que esse instrumento é crítico para o controle de vazão da planta

---

## Bloco 4 — Arquitetura de automação (3 min)
**Requisito atendido: #4 — Arquitetura com especificação mínima dos equipamentos**

- **Mostrar:** seção "Arquitetura de Automação" no simulador (interface React)
- Explicar as três camadas:
  - **Campo:** transmissores e atuadores enviam/recebem sinais 4-20 mA e digitais
  - **Controle:** CLP executa lógica, lê entradas e comanda saídas
  - **Supervisão:** IHM/SCADA permite monitoramento e operação
- **Mostrar:** diagrama Mermaid no README (seção "Arquitetura de Automação")
- Destacar equivalência: "Neste projeto, o backend Python **simula o CLP** e o frontend React **simula a IHM/SCADA**. Não é um sistema industrial real — é uma simulação didática da arquitetura."
- **Mostrar:** tabela de equivalência na interface

---

## Bloco 5 — Matriz de Causa e Efeito e demonstração (4 min)
**Requisito atendido: #5 — Algoritmo de controle com Matriz de Causa e Efeito**

- **Mostrar:** código da Matriz de Causa e Efeito no backend Python (`backend/controle/`)
- Explicar: linhas = causas (condições de processo), colunas = efeitos (ações automáticas)
- Exemplo ao vivo: "Se o nível do tanque atingir o limite máximo, o que acontece?"
- **Demonstrar no simulador:** ajustar variável via painel de ajuste manual → observar resposta automática
- Mostrar alarme ou mudança de estado no sinóptico
- Transição: "Isso demonstra que a lógica de intertravamento está implementada e funcionando"

---

## Bloco 6 — Fechamento (1 min)

- Resumo: planta com 10+ variáveis → P&ID → folha de dados → arquitetura → matriz de controle
- Reforçar: simulação didática fiel à arquitetura real de automação industrial
- Abrir para perguntas

---

**Tempo total: 2 + 3 + 2 + 3 + 4 + 1 = 15 minutos**
```

### Relevant Files

- `docs/roteiro-apresentacao.md` — criar ou atualizar
- `docs/` — verificar arquivos de apresentação gerados por task_13
- `README.md` — referência para seção de arquitetura (task_39)
- `frontend/src/componentes/SecaoArquitetura.tsx` — o que será mostrado na interface (task_38)

### Dependent Files

Nenhum — este é o último documento da sequência de tasks 36–40.

### Related ADRs

- `_prd.md` — requisitos acadêmicos #1 a #5
- task_13 — roteiro original

## Deliverables

- Arquivo `docs/roteiro-apresentacao.md` criado/atualizado **(REQUIRED)**
- 6 blocos com tempos somando exatamente 15 minutos **(REQUIRED)**
- Todos os 5 requisitos acadêmicos referenciados explicitamente **(REQUIRED)**
- Marcações de ação ("mostrar X", "abrir Y") em cada bloco **(REQUIRED)**
- Checklist de preparação pré-apresentação **(REQUIRED)**
- Distinção clara entre simulação didática e sistema industrial real **(REQUIRED)**

## Tests

- Conteúdo:
  - [ ] Roteiro menciona os 5 requisitos acadêmicos pelo número (#1 a #5)
  - [ ] Soma dos tempos dos 6 blocos = 15 minutos exatos
  - [ ] Bloco 4 contém a frase diferenciando simulação de sistema real
  - [ ] Checklist pré-apresentação está presente com pelo menos 4 itens
  - [ ] Cada bloco contém pelo menos uma instrução de ação ("Mostrar", "Abrir", "Demonstrar")
- Coerência:
  - [ ] Os documentos/telas referenciados no roteiro existem no projeto (P&ID, folha de dados, sinóptico, seção de arquitetura, código da matriz)

## Success Criteria

- O roteiro cabe em 15 minutos sem omitir nenhum requisito acadêmico
- Qualquer membro do grupo consegue apresentar seguindo o roteiro sem improvisações
- O roteiro orienta com precisão quando mostrar cada tela, documento ou trecho de código
- Está explícito que Python simula o CLP e React simula a IHM/SCADA, sem vender como automação real
