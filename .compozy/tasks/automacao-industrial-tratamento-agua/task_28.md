---
status: completed
title: Exibir descrição didática nos cards de variáveis de processo
type: frontend
complexity: medium
dependencies:
  - task_27
---

# Task 28: Exibir descrição didática nos cards de variáveis de processo

## Overview

Atualizar o componente `CartaoVariavel` para aceitar e exibir uma descrição
didática curta abaixo da tag. Atualizar `PaginaPrincipal` para passar o
`nomeAbreviado` de cada variável usando o catálogo criado na task 27.
O resultado visual esperado é:

```
FIT-101
Sensor de vazão de entrada
10,0 m³/h   [NORMAL]
```

<critical>
- ALWAYS READ `CartaoVariavel.tsx` completo antes de editar
- ALWAYS READ `PaginaPrincipal.tsx` completo antes de editar
- ALWAYS READ `frontend/src/dominio/equipamentos.ts` (criado na task 27) antes de começar
- ALWAYS READ `componentes.css` para entender as classes existentes antes de adicionar estilos
- DO NOT alterar a lógica de alarmes nem o cálculo de estado do card
- DO NOT alterar backend, API ou Docker
- DO NOT adicionar dependências externas
- PRESERVE responsividade: o card não pode crescer de forma que quebre o grid
</critical>

<requirements>
- MUST adicionar prop opcional `descricao?: string` em `CartaoVariavel`
- MUST renderizar a descrição somente quando a prop for fornecida (não quebrar usos sem descrição)
- MUST exibir a descrição com hierarquia visual subordinada à tag: fonte menor, cor mais fraca
- MUST atualizar `PaginaPrincipal` para passar `descricao={obterMetadados(tag)?.nomeAbreviado}` em cada `CartaoVariavel`
- MUST importar `obterMetadados` de `../dominio/equipamentos` em `PaginaPrincipal`
- MUST NÃO duplicar strings de descrição em `PaginaPrincipal` — usar apenas o catálogo
- MUST NÃO alterar comportamento existente para cards sem a prop `descricao`
- MUST NÃO alterar nenhuma regra de alarme ou de estado visual (normal/alerta/falha)
- SHOULD usar classe CSS nova `cartao-variavel__descricao` para estilizar o texto
- SHOULD manter o valor (`valor + unidade`) como o elemento de maior destaque visual no card
</requirements>

## Subtasks

- [x] 28.1 Ler `CartaoVariavel.tsx`, `PaginaPrincipal.tsx` e `componentes.css`
- [x] 28.2 Adicionar prop `descricao?: string` na interface de props de `CartaoVariavel`
- [x] 28.3 Renderizar `<span className="cartao-variavel__descricao">` condicionalmente
- [x] 28.4 Adicionar classe `.cartao-variavel__descricao` em `componentes.css` (fonte ~0.7rem, cor `var(--cor-texto-secundario)` ou equivalente)
- [x] 28.5 Atualizar `PaginaPrincipal.tsx`: importar `obterMetadados` e passar `descricao` em cada `CartaoVariavel`
- [x] 28.6 Executar `cd frontend && npm run build`
- [x] 28.7 Executar `cd frontend && npm run test`
- [ ] 28.8 Inspecionar visualmente os cards no navegador

## Implementation Details

### CartaoVariavel.tsx

Adicionar `descricao?: string` na interface existente e renderizar um `<span>`
logo abaixo do elemento que exibe a tag:

```tsx
{descricao && (
  <span className="cartao-variavel__descricao">{descricao}</span>
)}
```

### componentes.css

```css
.cartao-variavel__descricao {
  display: block;
  font-size: 0.7rem;
  color: var(--cor-texto-secundario, #8a9bb5);
  margin-top: 0.1rem;
  line-height: 1.2;
}
```

### PaginaPrincipal.tsx

```tsx
import { obterMetadados } from '../dominio/equipamentos';

// Na função variaveisProcesso() ou equivalente, onde CartaoVariavel é instanciado:
<CartaoVariavel
  tag="FIT-101"
  nome="..."
  valor={estado.vazaoEntradaM3h}
  unidade="m³/h"
  estado={...}
  descricao={obterMetadados('FIT-101')?.nomeAbreviado}
/>
```

Repetir para as demais tags: FIT-102, LIT-101, PIT-101, DPIT-101, TIT-101, AIT-101, AIT-102, AIT-103, FIT-201.

### Hierarquia visual esperada

```
┌─────────────────────────────┐
│ FIT-101                     │  ← tag (font-weight bold, fonte normal)
│ Sensor de vazão de entrada  │  ← descricao (fonte ~0.7rem, cor fraca)
│                             │
│         10,0 m³/h           │  ← valor + unidade (destaque máximo)
│                     NORMAL  │  ← badge de estado
└─────────────────────────────┘
```

### Relevant Files

- `frontend/src/componentes/CartaoVariavel.tsx` — componente a ser atualizado
- `frontend/src/componentes/componentes.css` — adicionar `.cartao-variavel__descricao`
- `frontend/src/paginas/PaginaPrincipal.tsx` — passar prop `descricao`
- `frontend/src/dominio/equipamentos.ts` — fonte de verdade das descrições (task 27)

## Deliverables

- `CartaoVariavel.tsx` com prop `descricao` **(REQUIRED)**
- `componentes.css` com classe `.cartao-variavel__descricao` **(REQUIRED)**
- `PaginaPrincipal.tsx` passando descrição via catálogo para todas as variáveis **(REQUIRED)**
- Build passando **(REQUIRED)**
- Testes existentes passando sem modificações **(REQUIRED)**

## Tests

- Unit tests:
  - [ ] `cd frontend && npm run build` retorna exit code 0
  - [ ] `cd frontend && npm run test` retorna exit code 0
- Integration tests:
  - [ ] Cards de variáveis exibem a descrição curta abaixo da tag
  - [ ] Descrição não aparece quando prop não é passada (não quebra cards sem descrição)
  - [ ] Valor continua sendo o elemento mais visível do card
  - [ ] Layout do grid de cards não quebra em 1920×1080

## Success Criteria

- Todos os 10 cards de variáveis de processo exibem `nomeAbreviado` da tag
- Nenhuma string de descrição está hard-coded fora do catálogo
- Build e testes passam
- Layout responsivo preservado
