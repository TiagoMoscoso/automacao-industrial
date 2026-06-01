---
status: completed
title: Refatorar sinóptico da planta
type: frontend
complexity: high
dependencies:
  - task_16
---

# Task 17: Refatorar sinóptico da planta

## Overview
Aprimorar o componente `SinoticoPlanta.tsx` (já implementado em SVG) para alinhar geometricamente linhas, setas e equipamentos, garantir espaçamento regular entre elementos, tags industriais legíveis, e distinção visual clara entre linha de processo principal, linha de descarte e linha de dosagem química. As cores devem ser usadas exclusivamente para comunicar estado operacional (normal/alerta/falha).

<critical>
- ALWAYS READ o PRD de refinamento (seção RF08) e o `auditoria-frontend.md` antes de começar
- REFERENCE o fluxo do processo definido no RF08: Água Bruta → FV-101 → FIT-101 → P-101 → F-101 → T-101 → P-102 → Processo; T-101 → XV-101 → Descarte; TK-201 → P-201 → FIT-201 → Injeção química
- FOCUS ON "WHAT" — corrigir geometria SVG, espaçamento e semântica de cores; não alterar lógica de estado
- MINIMIZE CODE — modificar apenas `SinoticoPlanta.tsx` e, se necessário, classes CSS em `componentes.css`
- TESTS REQUIRED — verificar que todos os 14 equipamentos renderizam, que as classes de estado são aplicadas corretamente e que os testes existentes passam
</critical>

<requirements>
- MUST manter todos os 14 elementos de equipamento já existentes: AGUA, FV-101, FIT-101, P-101, F-101, T-101, P-102, destino do processo, XV-101, descarte, TK-201, P-201, FIT-201, injeção química
- MUST alinhar as linhas de processo em traçado horizontal/vertical consistente, sem diagonais acidentais
- MUST usar setas SVG consistentes em direção e tamanho para indicar sentido do fluxo
- MUST garantir espaçamento regular entre equipamentos ao longo da linha de processo
- MUST tornar as tags industriais (ex: "FV-101", "P-101") legíveis com tamanho e contraste adequados
- MUST separar visualmente a linha de descarte (T-101 → XV-101 → Descarte) da linha principal
- MUST separar visualmente a linha de dosagem química (TK-201 → P-201 → FIT-201 → Injeção)
- MUST usar cores (`--cor-normal`, `--cor-alerta`, `--cor-falha`) apenas para estado operacional do equipamento
- MUST NOT usar cores decorativas ou gradientes que não comuniquem estado
- MUST NOT alterar os props do componente — a interface externa (`SinoticoPlantaProps`) permanece igual
- MUST NOT introduzir bibliotecas gráficas externas sem justificativa registrada
- SHOULD usar `<defs>` SVG para definir marcadores de seta reutilizáveis
- SHOULD aplicar `viewBox` fixo para garantir escala consistente em diferentes tamanhos de tela
</requirements>

## Subtasks
- [x] 17.1 Ler `SinoticoPlanta.tsx` por completo e mapear as coordenadas SVG atuais de cada equipamento e linha
- [x] 17.2 Redesenhar o layout SVG em rascunho (comentário no arquivo ou documento auxiliar): posições X/Y para cada equipamento nas três linhas de fluxo
- [x] 17.3 Implementar as correções geométricas: realinhar elementos, uniformizar espaçamento e corrigir setas
- [x] 17.4 Separar visualmente as três linhas de fluxo (principal, descarte, dosagem química) com traçado ou posicionamento distintos
- [x] 17.5 Ajustar tags industriais: tamanho de fonte, posicionamento relativo ao equipamento e contraste
- [x] 17.6 Executar `npm run typecheck`, `npm run lint` e `npm run test` para confirmar zero erros e zero regressões

## Implementation Details
O arquivo principal a modificar é `frontend/src/componentes/SinoticoPlanta.tsx`.

Se necessário, ajustes de CSS podem ser feitos em `frontend/src/componentes/componentes.css` apenas para classes já existentes do sinóptico.

Estrutura do fluxo a representar:
```
Linha principal:
  Água Bruta → FV-101 → FIT-101 → P-101 → F-101 → T-101 → P-102 → Processo

Linha de descarte (derivação do T-101):
  T-101 → XV-101 → Descarte

Linha de dosagem química (alimenta antes do T-101):
  TK-201 → P-201 → FIT-201 → Injeção (ponto de junção com a linha principal)
```

Padrão SVG recomendado para marcadores de seta:
- Definir um `<marker>` em `<defs>` e referenciar via `marker-end` nas linhas
- Usar `<line>` ou `<polyline>` para traçados retilíneos; evitar `<path>` com curvas desnecessárias

### Relevant Files
- `frontend/src/componentes/SinoticoPlanta.tsx` — único componente a ser modificado
- `frontend/src/componentes/componentes.css` — classes SVG do sinóptico (modificar apenas se necessário)
- `frontend/src/dominio/estadoPlanta.ts` — tipos que alimentam as props do sinóptico
- `frontend/src/dominio/alarme.ts` — tipos de alarme que influenciam estado visual dos equipamentos
- `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-frontend.md` — estrutura atual documentada

### Dependent Files
- `frontend/src/componentes/SinoticoPlanta.tsx` — modificado por esta task
- `frontend/src/componentes/componentes.test.tsx` — testes existentes do componente devem continuar passando

### Related ADRs
- [ADR-001: Abordagem de produto](adrs/adr-001.md) — Risco identificado: "Complexidade do sinóptico pode consumir mais tempo"; mitigação: usar SVG simples sem bibliotecas externas

## Deliverables
- `SinoticoPlanta.tsx` com geometria SVG corrigida e alinhada
- Três linhas de fluxo visualmente distintas (principal, descarte, dosagem)
- Tags industriais legíveis
- `npm run typecheck` passando **(REQUIRED)**
- `npm run test` passando sem regressões **(REQUIRED)**

## Tests
- Unit tests:
  - [x] Renderizar `SinoticoPlanta` com estado normal produz todos os 14 elementos de equipamento
  - [x] Equipamento com estado 'alerta' recebe a classe CSS de alerta correspondente
  - [x] Equipamento com estado 'inativo' recebe a classe CSS de inativo correspondente
  - [x] O SVG contém pelo menos um marcador de seta definido em `<defs>`
  - [x] As tags de texto (FV-101, P-101, etc.) estão presentes no render
  - [x] Os testes existentes em `componentes.test.tsx` relacionados ao sinóptico continuam passando
- Integration tests:
  - [x] `npm run typecheck` retorna exit code 0
  - [x] `npm run lint` retorna exit code 0
  - [x] `npm run test` retorna exit code 0
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- Linhas do sinóptico alinhadas horizontalmente/verticalmente sem diagonais acidentais
- Setas consistentes em direção e tamanho
- Três linhas de fluxo visualmente distintas
- Tags industriais legíveis
- Cores usadas apenas para estado operacional (normal/alerta/falha)
- Props do componente inalteradas — integração com `PaginaPrincipal.tsx` preservada
