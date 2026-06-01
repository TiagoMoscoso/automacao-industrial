---
status: completed
title: Componentes React
type: frontend
complexity: high
dependencies:
  - task_06
---

# Task 7: Componentes React

## Overview

Implementa os 6 componentes React que compõem a interface supervisória da planta: o sinóptico visual do fluxo de processo, o card de variável, o painel de alarmes, o painel de atuadores, o painel de cenários e os controles de simulação. Cada componente é independente e recebe dados via props do estado centralizado na página principal.

<critical>
- ALWAYS READ o PRD (F3) e specs.md seções 11.4 (tela principal), 11.1, 11.2 antes de começar
- REFERENCE specs.md seção 11.4 para a representação visual mínima do sinóptico e os 7 elementos da tela
- FOCUS ON "WHAT" — exibir dados e emitir eventos; sem chamadas de API nos componentes
- MINIMIZE CODE — componentes simples e focados; sem bibliotecas de gráficos desnecessárias
- TESTS REQUIRED — cada componente deve ter testes de renderização com dados normais e com estados críticos (alarme, bloqueio, emergência)
</critical>

<requirements>
- MUST implementar `SinoticoPlanta.tsx` com representação visual do fluxo de processo usando SVG ou CSS (sem bibliotecas externas): [Água Bruta]→[FV-101]→[FIT-101]→[P-101]→[Filtro F-101]→[Tanque T-101]→[P-102]→[Processo] com linha de descarte [T-101]→[XV-101]→[Descarte] e linha química [TK-201]→[P-201]→[FIT-201]→injeção; estados de equipamentos devem ser visualmente distintos (ligado/desligado, aberto/fechado, alerta)
- MUST implementar `CartaoVariavel.tsx` recebendo props `tag`, `nome`, `valor`, `unidade` e `estado: "normal" | "alerta" | "falha"`; cor de fundo deve mudar por estado (verde→normal, amarelo→alerta, vermelho→falha)
- MUST implementar `PainelAlarmes.tsx` recebendo lista de alarmes ativos e flag `processoLiberado`; deve indicar claramente se o processo está LIBERADO (verde) ou BLOQUEADO (vermelho); lista de alarmes vazia deve exibir "Sem alarmes ativos"
- MUST implementar `PainelAtuadores.tsx` recebendo estado das variáveis manipuladas (P-101, P-102, P-201, FV-101, XV-101); exibir estado de cada atuador com indicador visual de ligado/desligado ou aberto/fechado
- MUST implementar `PainelCenarios.tsx` recebendo callback `onAcionarCenario(nome: string)` e exibindo os 6 botões de cenários definidos em PRD F4: "Operação Normal", "Nível Alto-Alto", "Nível Baixo-Baixo", "pH Fora da Faixa", "Turbidez Alta", "Emergência"
- MUST implementar `ControleSimulacao.tsx` recebendo callbacks `onIniciar`, `onPausar`, `onReiniciar` e flag `simulacaoAtiva`; exibir botões "Iniciar", "Pausar" e "Reiniciar"
- MUST todos os textos visíveis no frontend em português do Brasil
- MUST estados críticos (alarme, bloqueio, emergência) devem ser visualmente evidentes — cores distintas e indicadores claros, não apenas sutis
- SHOULD usar CSS puro ou CSS modules; evitar CSS-in-JS pesado
</requirements>

## Subtasks

- [x] 7.1 Implementar `CartaoVariavel.tsx` com variação de cor por estado (normal/alerta/falha)
- [x] 7.2 Implementar `PainelAlarmes.tsx` com lista de alarmes e indicador de processo liberado/bloqueado
- [x] 7.3 Implementar `PainelAtuadores.tsx` com estado visual de cada atuador
- [x] 7.4 Implementar `PainelCenarios.tsx` com os 6 botões de cenários
- [x] 7.5 Implementar `ControleSimulacao.tsx` com botões de controle de simulação
- [x] 7.6 Implementar `SinoticoPlanta.tsx` com representação visual SVG/CSS do fluxo de processo e estados dinâmicos

## Implementation Details

Todos os arquivos em `frontend/src/componentes/`. Ver specs.md seção 11.4 para a representação textual do sinóptico. O `SinoticoPlanta` é o componente mais complexo — usar SVG simples com elementos `<rect>`, `<circle>`, `<line>` e `<text>` para representar equipamentos e linhas de processo. Cada equipamento do sinóptico deve mudar de cor (cinza=desligado/fechado, verde=ligado/aberto, vermelho=em alarme) baseado nas props recebidas. Não usar bibliotecas de SCADA ou diagramas externas.

### Relevant Files

- `.specs/specs.md` — seção 11.4 (representação visual mínima do sinóptico), seção 25.1 (escopo do frontend), princípios de interface da seção de UX do PRD
- `.compozy/tasks/automacao-industrial-tratamento-agua/_prd.md` — seção F3 (7 componentes da tela principal), seção F4 (6 cenários e resultado esperado), seção "Princípios de interface"
- `frontend/src/dominio/estadoPlanta.ts` — task_06, interface principal recebida como props
- `frontend/src/dominio/alarme.ts` — task_06, tipo Alarme usado em PainelAlarmes
- `frontend/src/dominio/acoesControle.ts` — task_06, tipo AcoesControle usado em PainelAtuadores
- `frontend/src/componentes/` — diretório criado em task_01

### Dependent Files

- `frontend/src/paginas/PaginaPrincipal.tsx` — task_08, compõe todos os componentes desta task
- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — task_09, segue o mesmo padrão de componente
- `frontend/src/estilos/principal.css` — task_08, estilos compartilhados referenciados pelos componentes

### Related ADRs

- [ADR-001: Abordagem de produto — Simulador web acadêmico com backend Python e frontend React](adrs/adr-001.md) — Frontend React representa a tela supervisória/IHM; sinóptico substitui tela de SCADA real

## Deliverables

- `frontend/src/componentes/SinoticoPlanta.tsx`
- `frontend/src/componentes/CartaoVariavel.tsx`
- `frontend/src/componentes/PainelAlarmes.tsx`
- `frontend/src/componentes/PainelAtuadores.tsx`
- `frontend/src/componentes/PainelCenarios.tsx`
- `frontend/src/componentes/ControleSimulacao.tsx`
- Unit tests com 80%+ coverage **(REQUIRED)**
- Integration tests de renderização com estados críticos **(REQUIRED)**

## Tests

- Unit tests:
  - [ ] `CartaoVariavel` com `estado="normal"` renderiza com classe/cor verde
  - [ ] `CartaoVariavel` com `estado="falha"` renderiza com classe/cor vermelha
  - [ ] `PainelAlarmes` com `processoLiberado=true` e lista vazia exibe "Sem alarmes ativos" e indicador verde
  - [ ] `PainelAlarmes` com `processoLiberado=false` exibe indicador "BLOQUEADO" em vermelho
  - [ ] `PainelAlarmes` com lista de alarmes não vazia exibe cada alarme da lista
  - [ ] `PainelCenarios` renderiza 6 botões com textos em português
  - [ ] `PainelCenarios` ao clicar em "Emergência" chama `onAcionarCenario("emergencia")`
  - [ ] `ControleSimulacao` com `simulacaoAtiva=true` renderiza botão "Pausar" habilitado
  - [ ] `PainelAtuadores` com P-101 ligada exibe indicador de bomba ativa
  - [ ] `SinoticoPlanta` renderiza sem erros com estado de operação normal
  - [ ] `SinoticoPlanta` com emergência acionada aplica classe/cor de alerta nos equipamentos afetados
- Integration tests:
  - [ ] Todos os 6 componentes importam e renderizam sem erros com `@testing-library/react`
  - [ ] Nenhum componente faz chamada direta à API (sem fetch/clienteApiPlanta nos componentes)
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All tests passing
- Test coverage >=80%
- Todos os 6 componentes criados e renderizando corretamente
- `SinoticoPlanta` representa o fluxo de processo de specs.md seção 11.4 com elementos dinâmicos
- Estados críticos visualmente evidentes (emergência, bloqueio, alarme) com cores distintas
- Todos os textos em português do Brasil
- Nenhum componente faz chamada direta à API
