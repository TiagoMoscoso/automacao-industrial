---
status: completed
title: Polir painéis operacionais
type: frontend
complexity: medium
dependencies:
  - task_17
---

# Task 18: Polir painéis operacionais

## Overview
Refinar a aparência dos componentes `PainelAlarmes.tsx`, `PainelAtuadores.tsx`, `PainelCenarios.tsx`, `CartaoVariavel.tsx` e o indicador de processo liberado/bloqueado, tornando-os visualmente coesos, legíveis e semânticos. Estados operacionais (normal/alerta/crítico/ligado/desligado/aberto/fechado/liberado/bloqueado) devem ser claros sem poluição visual.

<critical>
- ALWAYS READ o PRD de refinamento (seção RF09, RNF01, RNF02, RNF03) e o `auditoria-frontend.md` antes de começar
- REFERENCE os estados definidos no RF09: normal, alerta, crítico, ligado/desligado, aberto/fechado, processo liberado/bloqueado
- FOCUS ON "WHAT" — melhorar aparência e semântica visual; não alterar lógica de negócio ou props
- MINIMIZE CODE — alterações em CSS e JSX de apresentação apenas; não adicionar bibliotecas visuais externas
- TESTS REQUIRED — verificar que os estados visuais são aplicados corretamente e que os testes existentes passam
</critical>

<requirements>
- MUST garantir coesão visual entre `PainelAlarmes`, `PainelAtuadores`, `PainelCenarios` e `CartaoVariavel`
- MUST tornar o indicador de processo liberado/bloqueado imediatamente legível (posição, cor, tipografia)
- MUST usar as custom properties de cor já definidas (`--cor-normal`, `--cor-alerta`, `--cor-falha`, `--cor-comando`) sem criar novas variáveis CSS desnecessárias
- MUST garantir que alarmes críticos (ex: EMERGENCIA, NIVEL_ALTO_ALTO) sejam visualmente evidentes
- MUST garantir que estados de atuador (ligado/desligado, aberto/fechado) sejam distinguíveis sem depender apenas de cor
- MUST preservar todos os props e a lógica de cada componente — apenas a camada visual muda
- MUST NOT alterar os contratos de dados (tipos TypeScript) de nenhum componente
- MUST NOT remover informações exibidas — apenas reorganizar ou melhorar a apresentação
- SHOULD reduzir bordas pesadas e blocos excessivos nos cards e painéis
- SHOULD melhorar espaçamento interno (`padding`, `gap`) para melhor legibilidade
- SHOULD garantir que o painel de cenários destaca visualmente o cenário de "Emergência" com tratamento diferenciado
</requirements>

## Subtasks
- [x] 18.1 Refinar `CartaoVariavel.tsx` e suas classes em `componentes.css`: melhorar padding, hierarquia tipográfica e indicadores de estado
- [x] 18.2 Refinar `PainelAlarmes.tsx`: melhorar legibilidade dos alarmes ativos, hierarquia entre alarme crítico e alerta, e indicador de processo liberado/bloqueado
- [x] 18.3 Refinar `PainelAtuadores.tsx`: melhorar clareza dos estados ligado/desligado e aberto/fechado com texto e indicador visual consistentes
- [x] 18.4 Refinar `PainelCenarios.tsx`: garantir espaçamento, hierarquia e destaque visual para o cenário de emergência
- [x] 18.5 Executar `npm run typecheck`, `npm run lint` e `npm run test` para confirmar zero erros e zero regressões

## Implementation Details
Os arquivos a modificar são:
- `frontend/src/componentes/CartaoVariavel.tsx` — ajustes de JSX de apresentação
- `frontend/src/componentes/PainelAlarmes.tsx` — ajustes de JSX de apresentação
- `frontend/src/componentes/PainelAtuadores.tsx` — ajustes de JSX de apresentação
- `frontend/src/componentes/PainelCenarios.tsx` — ajustes de JSX de apresentação
- `frontend/src/componentes/componentes.css` — ajustes de classes CSS dos painéis

As custom properties de cor já definidas em `principal.css` são suficientes:
- `--cor-normal`: #25a45a (verde) — estado operacional normal
- `--cor-alerta`: #f5b942 (amarelo) — alerta ou fora da faixa
- `--cor-falha`: #d94b4b (vermelho) — falha crítica ou alarme
- `--cor-comando`: #2f6f9f (azul) — ação ou elemento de controle

Para estados ligado/desligado e aberto/fechado em atuadores, usar além da cor um indicador textual claro (ex: "● Ligada" vs "○ Desligada") para garantir acessibilidade.

### Relevant Files
- `frontend/src/componentes/CartaoVariavel.tsx` — card de variável de processo
- `frontend/src/componentes/PainelAlarmes.tsx` — painel de alarmes e status do processo
- `frontend/src/componentes/PainelAtuadores.tsx` — painel de atuadores
- `frontend/src/componentes/PainelCenarios.tsx` — painel de cenários de demonstração
- `frontend/src/componentes/componentes.css` — estilos de todos os componentes acima
- `frontend/src/dominio/alarme.ts` — os 9 tipos de alarme com seus identificadores
- `frontend/src/estilos/principal.css` — custom properties de cor (não modificar)
- `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-frontend.md` — estado atual dos painéis

### Dependent Files
- `frontend/src/componentes/componentes.css` — modificado por esta task
- `frontend/src/componentes/componentes.test.tsx` — testes existentes devem continuar passando

### Related ADRs
- [ADR-001: Abordagem de produto](adrs/adr-001.md) — Define que o frontend representa a camada de supervisão; painéis devem comunicar estado industrial com clareza

## Deliverables
- `CartaoVariavel.tsx`, `PainelAlarmes.tsx`, `PainelAtuadores.tsx`, `PainelCenarios.tsx` com aparência refinada
- `componentes.css` atualizado com as classes de polimento
- `npm run typecheck` passando **(REQUIRED)**
- `npm run test` passando sem regressões **(REQUIRED)**

## Tests
- Unit tests:
  - [x] `CartaoVariavel` com `estado="falha"` renderiza com classe CSS de falha visível
  - [x] `CartaoVariavel` com `estado="alerta"` renderiza com classe CSS de alerta visível
  - [x] `PainelAlarmes` com alarme do tipo EMERGENCIA exibe o alarme com destaque de falha
  - [x] `PainelAlarmes` com processo bloqueado exibe o indicador "BLOQUEADO" de forma evidente
  - [x] `PainelAtuadores` com bomba ligada exibe indicador textual de estado ligado
  - [x] `PainelAtuadores` com válvula aberta exibe percentual de abertura de FV-101
  - [x] `PainelCenarios` renderiza os 6 cenários com o botão "Emergência" com classe CSS diferenciada
  - [x] Os testes existentes em `componentes.test.tsx` continuam passando sem alterações de comportamento
- Integration tests:
  - [x] `npm run typecheck` retorna exit code 0
  - [x] `npm run lint` retorna exit code 0
  - [x] `npm run test` retorna exit code 0
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- Todos os 4 componentes têm aparência visualmente coesa
- Estados operacionais (normal/alerta/crítico/ligado/desligado/aberto/fechado/liberado/bloqueado) são claros e semânticos
- Alarme de emergência visualmente evidente
- Indicador de processo liberado/bloqueado imediatamente legível
- Nenhum prop ou contrato de dados foi alterado
- Nenhuma biblioteca visual externa foi adicionada
