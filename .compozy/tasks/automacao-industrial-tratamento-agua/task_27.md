---
status: completed
title: Criar catálogo centralizado de equipamentos
type: frontend
complexity: low
dependencies:
    - task_26
---

# Task 27: Criar catálogo centralizado de equipamentos

## Overview

Criar um arquivo de metadados centralizado para todos os equipamentos industriais
da planta de tratamento de água. Hoje, as strings de nome e descrição estão
espalhadas em `SinoticoPlanta.tsx`, `PainelAjusteVariaveis.tsx` e
`PaginaPrincipal.tsx`, sem padrão comum. Esta task elimina essa duplicação e
cria a base para as tasks 28–31.

<critical>
- ALWAYS READ `frontend/src/dominio/estadoPlanta.ts` antes de começar, para alinhar os nomes de tags
- ALWAYS READ `frontend/src/componentes/SinoticoPlanta.tsx` (array `equipamentos`) e `frontend/src/componentes/PainelAjusteVariaveis.tsx` (array `VARIAVEIS_PROCESSO`) para confirmar todas as tags existentes
- DO NOT alterar backend, API ou Docker
- DO NOT adicionar dependências externas
- FOLLOW a convenção de nomenclatura portuguesa já usada no projeto (nomes de variáveis e funções em português)
</critical>

<requirements>
- MUST criar `frontend/src/dominio/equipamentos.ts`
- MUST definir interface `MetadadosEquipamento` com campos: `tag`, `nomeAbreviado`, `instrumento`, `funcao`, `categoria`, `papelNoProcesso`, e `unidade` (opcional)
- MUST criar objeto `CATALOGO_EQUIPAMENTOS` cobrindo as 20 tags listadas abaixo
- MUST exportar função `obterMetadados(tag: string): MetadadosEquipamento | undefined`
- MUST garantir que `obterMetadados` retorne `undefined` para tags desconhecidas (sem lançar erro)
- MUST NÃO duplicar as strings — este arquivo é a única fonte de verdade
- MUST NÃO importar nem depender de nenhum componente React
- MUST NÃO alterar nenhum arquivo existente nesta task (somente criar o novo arquivo)
- SHOULD adicionar comentário JSDoc mínimo na interface explicando o propósito
</requirements>

## Subtasks

- [ ] 27.1 Ler `estadoPlanta.ts`, array `equipamentos` do sinóptico e array `VARIAVEIS_PROCESSO` do painel de ajuste
- [ ] 27.2 Criar arquivo `frontend/src/dominio/equipamentos.ts`
- [ ] 27.3 Definir interface `MetadadosEquipamento`
- [ ] 27.4 Preencher `CATALOGO_EQUIPAMENTOS` com todos os 20 equipamentos
- [ ] 27.5 Implementar `obterMetadados(tag)`
- [ ] 27.6 Executar `cd frontend && npm run build` para garantir que o arquivo compila

## Implementation Details

### Interface

```typescript
/** Metadados didáticos de um equipamento industrial da planta. */
export interface MetadadosEquipamento {
  tag: string;
  nomeAbreviado: string;      // label curto para UI (ex: "Sensor de vazão de entrada")
  instrumento: string;        // tipo do instrumento (ex: "Transmissor indicador de vazão")
  funcao: string;             // descrição completa da função no processo
  categoria: string;          // ex: "Transmissor / sensor analógico", "Atuador"
  papelNoProcesso: string;    // resumo do papel no fluxo da planta
  unidade?: string;           // unidade de engenharia, quando aplicável
}
```

### Catálogo completo

Todos os 20 equipamentos e suas descrições:

| Tag | nomeAbreviado | instrumento | funcao | categoria | unidade |
|-----|---------------|-------------|--------|-----------|---------|
| FIT-101 | Sensor de vazão de entrada | Transmissor indicador de vazão | Mede a vazão de entrada de água bruta | Transmissor / sensor analógico | m³/h |
| FIT-102 | Sensor de vazão de saída | Transmissor indicador de vazão | Mede a vazão de saída para o processo | Transmissor / sensor analógico | m³/h |
| LIT-101 | Sensor de nível do tanque | Transmissor indicador de nível | Mede o nível do tanque T-101 | Transmissor / sensor analógico | % |
| PIT-101 | Sensor de pressão da linha | Transmissor indicador de pressão | Mede a pressão da linha principal | Transmissor / sensor analógico | bar |
| DPIT-101 | Sensor de saturação do filtro | Transmissor indicador de pressão diferencial | Mede a pressão diferencial do filtro F-101, indicando possível saturação | Transmissor / sensor analógico | bar |
| TIT-101 | Sensor de temperatura da água | Transmissor indicador de temperatura | Mede a temperatura da água | Transmissor / sensor analógico | °C |
| AIT-101 | Analisador de pH | Analisador indicador de pH | Mede o pH da água tratada | Analisador de qualidade | pH |
| AIT-102 | Analisador de turbidez | Analisador indicador de turbidez | Mede a turbidez da água | Analisador de qualidade | NTU |
| AIT-103 | Analisador de condutividade | Analisador indicador de condutividade | Mede a condutividade da água | Analisador de qualidade | uS/cm |
| FIT-201 | Sensor de vazão química | Transmissor indicador de vazão química | Mede a vazão de dosagem química | Transmissor / sensor analógico | L/h |
| FV-101 | Válvula de controle de entrada | Válvula de controle | Controla a entrada de água bruta | Atuador | % |
| XV-101 | Válvula on/off de descarte | Válvula discreta | Desvia água fora de especificação para descarte | Atuador discreto | — |
| P-101 | Bomba principal | Bomba | Bombeia água bruta para o filtro | Bomba / acionamento | — |
| P-102 | Bomba de saída | Bomba | Envia água tratada para o processo ou caldeira | Bomba / acionamento | — |
| P-201 | Bomba dosadora química | Bomba dosadora | Injeta produto químico no processo | Bomba / dosagem química | — |
| VFD-101 | Inversor da bomba principal | Inversor de frequência | Controla a velocidade da bomba P-101 | Acionamento elétrico | % |
| F-101 | Filtro industrial | Filtro | Remove impurezas da água antes do tanque | Equipamento de processo | — |
| T-101 | Tanque de água tratada | Tanque | Armazena água tratada | Equipamento de processo | — |
| TK-201 | Tanque químico | Tanque de produto químico | Armazena produto químico usado na dosagem | Equipamento auxiliar | — |
| PROCESSO | Saída para processo | — | Representa o destino final da água tratada | Destino de processo | — |
| DESCARTE | Descarte | — | Recebe água fora de especificação | Destino de processo | — |

### Relevant Files

- `frontend/src/dominio/estadoPlanta.ts` — referência para os campos do estado
- `frontend/src/componentes/SinoticoPlanta.tsx` — array `equipamentos` (tags do sinóptico)
- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — array `VARIAVEIS_PROCESSO` (tags do painel)

### Dependent Files (serão alterados nas tasks seguintes)

- `frontend/src/componentes/CartaoVariavel.tsx` — task 28
- `frontend/src/paginas/PaginaPrincipal.tsx` — task 28
- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — task 29
- `frontend/src/componentes/SinoticoPlanta.tsx` — task 30

## Deliverables

- `frontend/src/dominio/equipamentos.ts` criado e compilando **(REQUIRED)**
- Todos os 20 equipamentos cadastrados **(REQUIRED)**
- `obterMetadados` retorna `undefined` para tag desconhecida **(REQUIRED)**

## Tests

- Unit tests:
  - [ ] `cd frontend && npm run build` retorna exit code 0
  - [ ] `obterMetadados('FIT-101')` retorna objeto com `nomeAbreviado === 'Sensor de vazão de entrada'`
  - [ ] `obterMetadados('TAG-INEXISTENTE')` retorna `undefined` sem lançar exceção
- Test coverage target: N/A (arquivo de dados puro; cobertura via testes das tasks dependentes)

## Success Criteria

- Arquivo criado em `frontend/src/dominio/equipamentos.ts`
- Interface TypeScript clara e sem `any`
- Todos os 20 equipamentos presentes com todos os campos obrigatórios preenchidos
- `obterMetadados` funciona com fallback seguro
- Nenhum arquivo existente foi alterado
- Build do frontend passa sem erros
