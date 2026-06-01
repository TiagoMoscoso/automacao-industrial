---
status: completed
title: Redesenhar layout principal
type: frontend
complexity: medium
dependencies:
  - task_15
---

# Task 16: Redesenhar layout principal

## Overview
Reestruturar o CSS Grid de `PaginaPrincipal.tsx` e `principal.css` para dar protagonismo visual ao sinóptico da planta, organizar painéis laterais de forma compacta (alarmes, atuadores, cenários), dispor as variáveis de processo em faixa inferior e rebaixar o ajuste manual para posição de menor destaque. O objetivo é uma interface mais limpa, com hierarquia visual clara e menos ruído.

<critical>
- ALWAYS READ o PRD de refinamento (seções RF07, RNF01, RNF02, RNF03) e o `auditoria-frontend.md` antes de começar
- REFERENCE o layout proposto no RF07 do PRD como direção, não como especificação rígida
- FOCUS ON "WHAT" — reestruturar o layout, não refatorar lógica de negócio ou estado
- MINIMIZE CODE — alterar apenas arquivos de layout e JSX estrutural; não modificar props dos componentes filhos
- TESTS REQUIRED — verificar que o layout compila e que os componentes filhos continuam recebendo as props corretas
</critical>

<requirements>
- MUST dar protagonismo ao sinóptico: ele deve ocupar a maior área visual da página
- MUST dispor alarmes, atuadores e cenários em painel lateral compacto à direita do sinóptico
- MUST dispor as variáveis de processo (`CartaoVariavel`) em faixa abaixo do sinóptico
- MUST dispor o ajuste manual de variáveis em posição inferior, com menor destaque visual
- MUST exibir o status geral do processo (liberado/bloqueado) em local óbvio, preferencialmente no cabeçalho ou próximo ao sinóptico
- MUST preservar todos os componentes filhos existentes — nenhum pode ser removido nesta task
- MUST preservar toda a lógica de polling, estado e handlers de `PaginaPrincipal.tsx` — apenas o JSX e o CSS mudam
- MUST manter a responsividade para as larguras já definidas (breakpoints em 1100px e 680px)
- SHOULD reduzir bordas pesadas, blocos excessivos e áreas vazias sem propósito
- SHOULD garantir que o cabeçalho identifique a planta com nome e status em um único lugar
</requirements>

## Subtasks
- [x] 16.1 Definir o novo esquema de CSS Grid em `principal.css`: áreas nomeadas para sinóptico, lateral, variáveis e ajuste-manual
- [x] 16.2 Ajustar o JSX de `PaginaPrincipal.tsx` para refletir as novas áreas do grid, sem alterar props ou lógica
- [x] 16.3 Refinar o cabeçalho para exibir nome da planta e status do processo de forma clara e compacta
- [x] 16.4 Ajustar breakpoints responsivos em `principal.css` para o novo layout (1100px e 680px)
- [x] 16.5 Executar `npm run typecheck`, `npm run lint` e `npm run test` para confirmar zero erros

## Implementation Details
Os arquivos a modificar são:
- `frontend/src/paginas/PaginaPrincipal.tsx` — estrutura JSX e classes CSS
- `frontend/src/estilos/principal.css` — definição do CSS Grid e custom properties

Direção do layout (RF07):
```
┌─────────────────────────────────────────────────────────────┐
│ Planta de Tratamento de Água             Status do Processo │
├───────────────────────────────────────┬─────────────────────┤
│                                       │ Alarmes             │
│           Sinóptico da Planta         │ Atuadores           │
│                                       │ Cenários            │
├───────────────────────────────────────┴─────────────────────┤
│ Variáveis de Processo                                       │
├─────────────────────────────────────────────────────────────┤
│ Ajuste Manual de Variáveis                                  │
└─────────────────────────────────────────────────────────────┘
```

Não criar bibliotecas de layout externas. Usar apenas CSS Grid nativo com `grid-template-areas`.

### Relevant Files
- `frontend/src/paginas/PaginaPrincipal.tsx` — JSX e estrutura do layout
- `frontend/src/estilos/principal.css` — grid, custom properties e breakpoints
- `frontend/src/componentes/componentes.css` — estilos dos painéis filhos (não modificar)
- `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-frontend.md` — layout atual documentado na task_14

### Dependent Files
- `frontend/src/paginas/PaginaPrincipal.tsx` — modificado por esta task
- `frontend/src/estilos/principal.css` — modificado por esta task
- `frontend/src/paginas/PaginaPrincipal.test.tsx` — pode precisar de atualização de seletores CSS

### Related ADRs
- [ADR-001: Abordagem de produto](adrs/adr-001.md) — Confirma que o frontend representa a camada de supervisão; o layout deve comunicar isso

## Deliverables
- `PaginaPrincipal.tsx` com novo JSX estrutural refletindo o layout proposto
- `principal.css` com novo CSS Grid e áreas nomeadas
- `npm run typecheck` passando **(REQUIRED)**
- `npm run test` passando sem regressões **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] Renderizar `PaginaPrincipal` em teste produz um elemento com classe do sinóptico como elemento dominante
  - [ ] Todos os componentes filhos (sinóptico, alarmes, atuadores, cenários, variáveis, ajuste manual) estão presentes no render
  - [ ] O cabeçalho contém o nome da planta e o indicador de status do processo
  - [ ] Os testes existentes em `PaginaPrincipal.test.tsx` continuam passando
- Integration tests:
  - [ ] `npm run typecheck` retorna exit code 0
  - [ ] `npm run lint` retorna exit code 0
  - [ ] `npm run test` retorna exit code 0
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- O sinóptico ocupa a posição de maior destaque na página
- Painéis laterais compactos à direita do sinóptico
- Variáveis de processo em faixa inferior
- Ajuste manual em posição de menor destaque
- Layout responsivo funcional nos breakpoints 1100px e 680px
- Nenhuma lógica de estado ou polling foi alterada
