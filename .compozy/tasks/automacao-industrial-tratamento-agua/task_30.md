---
status: completed
title: Atualizar sinóptico com labels didáticos e tooltips
type: frontend
complexity: medium
dependencies:
  - task_27
---

# Task 30: Atualizar sinóptico com labels didáticos e tooltips

## Overview

Atualizar `SinoticoPlanta.tsx` para:

1. Usar `nomeAbreviado` do catálogo (task 27) como label secundário nos blocos
   do sinóptico, exibindo tag + descrição curta dentro do retângulo SVG.
2. Adicionar tooltip nativo (`<title>` SVG ou atributo HTML `title`) em cada
   equipamento, com texto `instrumento — funcao` do catálogo.

O resultado visual esperado dentro de cada bloco SVG:

```
┌──────────────────────┐
│ FIT-101              │
│ Sensor de vazão      │  ← nomeAbreviado (menor, fraco)
│ 10,0 m³/h            │
└──────────────────────┘
```

Ao passar o cursor: tooltip "Transmissor indicador de vazão — Mede a vazão de
entrada de água bruta."

<critical>
- ALWAYS READ `SinoticoPlanta.tsx` completo antes de editar
- ALWAYS READ `auditoria-sinotico.md` para entender o estado atual do layout
- ALWAYS READ `frontend/src/dominio/equipamentos.ts` (task 27) antes de começar
- ALWAYS READ `componentes.css` para classes do sinóptico antes de adicionar estilos
- DO NOT alterar a lógica de cálculo de estado (ativo/inativo/alerta/falha/bloqueado)
- DO NOT alterar geometria, coordenadas SVG, linhas de processo, setas nem conectores
- DO NOT criar textos tão longos que transbordem do bloco SVG — use `nomeAbreviado` e não `funcao` diretamente no bloco
- DO NOT alterar backend, API ou Docker
- FOCUS ON didática sem poluição visual
</critical>

<requirements>
- MUST importar `obterMetadados` de `../dominio/equipamentos`
- MUST exibir `nomeAbreviado` como texto secundário dentro do bloco SVG de cada equipamento
- MUST adicionar tooltip em cada equipamento com `instrumento — funcao`
- MUST usar elemento `<title>` SVG dentro do `<g>` do equipamento (padrão acessível SVG) OU atributo `title` no `<rect>` ou `<g>`, conforme o padrão já usado no projeto
- MUST garantir que o texto do `nomeAbreviado` não transborde do retângulo do equipamento — truncar com `textLength` ou posicionamento cuidadoso
- MUST NÃO alterar a interface `EquipamentoSinotico` removendo campos existentes (pode adicionar)
- MUST NÃO alterar lógica de estado visual dos equipamentos
- SHOULD usar `nomeAbreviado` curto (ex: "Sensor de vazão") e não a `funcao` completa dentro do bloco
- SHOULD usar font-size menor para o label secundário (ex: 8–9px, vs ~11px para a tag)
- SHOULD colocar o label secundário entre a tag e o valor, ou abaixo da tag
</requirements>

## Subtasks

- [x] 30.1 Ler `SinoticoPlanta.tsx` completo, `auditoria-sinotico.md` e `equipamentos.ts`
- [x] 30.2 Identificar onde o componente `<Equipamento>` (ou equivalente) renderiza a tag e o valor
- [x] 30.3 Adicionar `<title>` SVG com `instrumento — funcao` dentro do grupo de cada equipamento
- [x] 30.4 Renderizar `nomeAbreviado` como texto SVG secundário abaixo da tag
- [x] 30.5 Ajustar posicionamento Y dos textos se necessário para acomodar o label adicional
- [x] 30.6 Adicionar/ajustar estilos CSS para `.equipamento__descricao` se necessário
- [x] 30.7 Verificar que nenhum texto transborda visualmente nos blocos menores
- [x] 30.8 Executar `cd frontend && npm run build`
- [x] 30.9 Executar `cd frontend && npm run test`
- [ ] 30.10 Inspecionar visualmente o sinóptico no navegador

## Implementation Details

### Tooltip SVG acessível

Dentro do `<g>` ou `<rect>` de cada equipamento, adicionar:

```tsx
const meta = obterMetadados(equipamento.tag);

<g className={`equipamento equipamento--${equipamento.estado}`}>
  {meta && (
    <title>{`${meta.instrumento} — ${meta.funcao}`}</title>
  )}
  <rect ... />
  {/* tag */}
  <text>{equipamento.tag}</text>
  {/* descrição curta */}
  {meta?.nomeAbreviado && (
    <text
      className="equipamento__descricao"
      y={equipamento.y + OFFSET_DESCRICAO}
      fontSize="8"
      fill="currentColor"
      opacity="0.7"
      textAnchor="middle"
    >
      {meta.nomeAbreviado}
    </text>
  )}
  {/* valor */}
  {equipamento.valor !== undefined && (
    <text>{equipamento.valor}</text>
  )}
</g>
```

> Ajustar `OFFSET_DESCRICAO` com base no espaço disponível em cada equipamento.
> Para equipamentos muito pequenos (ex: válvulas), pode ser necessário abreviar ou omitir o label.

### Equipamentos pequenos (válvulas, bombas compactas)

Verificar o `altura` de cada equipamento no array. Se `altura < 50`, o label
secundário pode ser omitido para não poluir o diagrama — usar apenas o tooltip.

### Relevant Files

- `frontend/src/componentes/SinoticoPlanta.tsx` — componente principal a ser atualizado
- `frontend/src/componentes/componentes.css` — adicionar `.equipamento__descricao` se necessário
- `frontend/src/dominio/equipamentos.ts` — fonte das descrições (task 27)
- `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-sinotico.md` — auditoria atual

## Deliverables

- `SinoticoPlanta.tsx` com tooltips em todos os equipamentos **(REQUIRED)**
- Labels didáticos visíveis nos equipamentos com espaço suficiente **(REQUIRED)**
- Build passando **(REQUIRED)**
- Testes existentes passando **(REQUIRED)**

## Tests

- Unit tests:
  - [x] `cd frontend && npm run build` retorna exit code 0
  - [x] `cd frontend && npm run test` retorna exit code 0
- Integration tests:
  - [ ] Todos os equipamentos do sinóptico mostram tooltip ao passar o cursor
  - [ ] Equipamentos com espaço suficiente exibem o `nomeAbreviado`
  - [ ] Nenhum texto transborda do bloco de equipamento
  - [ ] Linhas de processo, setas e conectores não foram alterados
  - [ ] Estados visuais (ativo/inativo/alerta/falha) continuam funcionais
  - [ ] Sinóptico legível em 1920×1080

## Success Criteria

- Tooltips em todos os equipamentos com `instrumento — funcao`
- Labels didáticos visíveis no diagrama onde couberem
- Nenhuma alteração em geometria, lógica de estado ou backend
- Build e testes passam
