---
status: completed
title: Reorganizar fluxo principal e linha de dosagem química
type: frontend
complexity: medium
dependencies:
  - task_22
---

# Task 23: Reorganizar fluxo principal e linha de dosagem química

## Overview
Redesenhar a geometria da linha de dosagem química em `SinoticoPlanta.tsx` para que ela se conecte de forma limpa e visível à linha principal antes do tanque T-101. O bloco "Injeção química" deve ter espaço adequado e aparência natural. A conexão vertical entre as duas linhas deve ser precisa e proporcional, sem parecer grosseira ou descolada.

<critical>
- ALWAYS READ `auditoria-sinotico.md` (task_21) e `SinoticoPlanta.tsx` completo antes de começar
- ALWAYS READ o resultado da task_22 para considerar as novas dimensões de T-101
- REFERENCE o ponto de conexão entre a linha de dosagem (y=340) e a linha principal (y=100) — verificar se a linha vertical existente está posicionada corretamente
- FOCUS ON "WHAT" — reorganizar geometria SVG; não alterar lógica de estado
- TESTS REQUIRED — `npm run build` e `npm run typecheck` devem passar ao final
</critical>

<requirements>
- MUST reposicionar ou redesenhar a linha de dosagem química para que o ponto de injeção (INJECAO) se conecte visivelmente à linha principal, preferencialmente antes do tanque T-101
- MUST garantir que o bloco "Injeção química" tenha largura suficiente para exibir a tag e o valor sem truncamento
- MUST garantir que a linha vertical de conexão entre a dosagem e a linha principal esteja alinhada ao ponto de chegada correto (antes do tanque)
- MUST NÃO alterar a posição dos equipamentos da linha principal (FV-101, FIT-101, P-101, F-101, T-101, P-102)
- MUST NÃO alterar a lógica de estado dos equipamentos (funções `estadoEquipamento`, `temAlarme`)
- MUST NÃO alterar contratos da API nem tipos de domínio
- MUST NÃO adicionar dependências externas
- SHOULD verificar se TK-201, P-201 e FIT-201 precisam de reposicionamento horizontal para que o bloco de dosagem fique distribuído uniformemente
- SHOULD garantir que a linha de dosagem química usa o mesmo marcador de seta (`seta`) que as demais linhas
</requirements>

## Subtasks
- [x] 23.1 Ler `auditoria-sinotico.md` e mapear a geometria atual da linha de dosagem (coordenadas de TK-201, P-201, FIT-201, INJECAO e da linha vertical de conexão)
- [x] 23.2 Calcular o ponto x ideal de conexão com a linha principal (deve coincidir com a posição x de chegada à linha principal, antes de T-101)
- [x] 23.3 Ajustar as coordenadas de INJECAO e da linha vertical em `SinoticoPlanta.tsx`
- [x] 23.4 Ajustar largura do bloco INJECAO se necessário para evitar truncamento de texto
- [x] 23.5 Verificar visualmente que TK-201, P-201, FIT-201 e INJECAO estão distribuídos com espaçamento adequado
- [x] 23.6 Executar `cd frontend && npm run build` e `npm run typecheck` e confirmar sucesso
- [x] 23.7 Inspecionar visualmente no navegador que a linha de dosagem entra limpa na linha principal

## Implementation Details
A linha de dosagem química atual está posicionada em y=340 (centro), enquanto a linha principal está em y=100. A conexão vertical parte do ponto INJECAO (x≈370) e desce até a linha principal. O problema atual é que:

1. O bloco INJECAO está posicionado em x=370, mas T-101 começa em x=475 — a conexão pode não estar visivelmente chegando ao trecho correto da linha principal
2. A largura do bloco INJECAO (padrão de 60px) pode ser insuficiente para exibir "Injeção Química" sem truncamento
3. O espaçamento entre TK-201 (x=115), P-201 (x=205), FIT-201 (x=275) e INJECAO (x=370) pode estar irregular

Ponto de chegada ideal: a linha vertical deve chegar na linha principal em um ponto x entre F-101 (x≈365+60=425) e T-101 (x=475), ou seja, em torno de x=440–460.

Ao ajustar, manter o conector vertical com aparência limpa — linha reta, sem ângulos abruptos.

### Relevant Files
- `frontend/src/componentes/SinoticoPlanta.tsx` — arquivo principal a modificar
- `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-sinotico.md` — referência de geometria (task_21)

### Dependent Files
- `frontend/src/componentes/SinoticoPlanta.tsx` — modificado por esta task, lido pelas tasks 24–25

## Deliverables
- `SinoticoPlanta.tsx` com linha de dosagem química conectada limpa à linha principal **(REQUIRED)**
- Bloco INJECAO sem truncamento de texto **(REQUIRED)**
- `npm run build` passando **(REQUIRED)**

## Tests
- Unit tests:
  - [x] `npm run typecheck` retorna exit code 0 sem erros TypeScript
  - [x] `npm run build` retorna exit code 0
- Integration tests:
  - [x] No navegador, a linha de dosagem química conecta visivelmente à linha principal antes do tanque
  - [x] O bloco "Injeção química" exibe a tag completa sem truncamento
  - [x] A linha vertical de conexão está alinhada geometricamente ao ponto de chegada
  - [x] TK-201, P-201, FIT-201 e INJECAO têm espaçamento visual equilibrado
- Test coverage target: N/A (ajuste visual)
- All tests must pass

## Success Criteria
- Linha de dosagem conecta visivelmente à linha principal antes de T-101
- Bloco INJECAO com largura adequada para exibir texto completo
- Linha vertical de conexão geometricamente precisa e limpa
- Espaçamento entre equipamentos da dosagem uniforme
- `npm run build` e `npm run typecheck` passando sem erros
- Nenhuma regressão nas funcionalidades de estado e alarme
