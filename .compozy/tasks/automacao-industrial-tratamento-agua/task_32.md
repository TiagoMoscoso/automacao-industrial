---
status: completed
title: Expandir metadados de equipamentos com dados operacionais
type: frontend
complexity: medium
dependencies:
    - task_27
---

# Task 32: Expandir metadados de equipamentos com dados operacionais

## Overview

O catálogo `CATALOGO_EQUIPAMENTOS` em `frontend/src/dominio/equipamentos.ts` (criado na task 27)
já contém `nomeAbreviado`, `instrumento`, `funcao`, `categoria` e `papelNoProcesso` para 20 equipamentos.

Esta task expande a interface `MetadadosEquipamento` com campos opcionais que viabilizam
status operacional calculado, faixas normais de operação, explicação didática da nomenclatura
das tags e descrição do impacto de cada ajuste. Os dados são preenchidos apenas para as
10 variáveis de processo ajustáveis manualmente.

Nenhum componente é alterado nesta task — apenas o arquivo de domínio.

<critical>
- ALWAYS READ `frontend/src/dominio/equipamentos.ts` antes de editar
- ALWAYS READ `frontend/src/componentes/PainelAjusteVariaveis.tsx` para confirmar as 10 tags de processo
- DO NOT alterar campos existentes da interface (apenas adicionar novos campos opcionais)
- DO NOT alterar backend, API ou Docker
- DO NOT adicionar dependências externas
- FOLLOW a convenção de nomenclatura portuguesa do projeto (nomes de variáveis em português)
</critical>

<requirements>
- MUST adicionar os seguintes campos opcionais à interface `MetadadosEquipamento`:
  - `faixaNormal?: { min: number; max: number }`
  - `faixaAtencao?: { min?: number; max?: number }`
  - `faixaCritica?: { min?: number; max?: number }`
  - `tipoSinal?: string`
  - `nivelArquitetura?: string`
  - `areaProcesso?: string`
  - `explicacaoTag?: ExplicacaoTag` (nova interface auxiliar exportada)
  - `impactoOperacional?: string`
  - `efeitoAumento?: string`
  - `efeitoDiminuicao?: string`
  - `dicaOperador?: string`
- MUST exportar interface auxiliar `ExplicacaoTag` com campos: `prefixo`, `significadoPrefixo`, `significadoPortugues`, `significadoNumero`
- MUST preencher os novos campos para as 10 variáveis de processo: FIT-101, FIT-102, LIT-101, PIT-101, DPIT-101, TIT-101, AIT-101, AIT-102, AIT-103, FIT-201
- MUST manter todos os campos e entradas existentes inalterados
- MUST garantir que `obterMetadados` continue funcionando sem alteração
- SHOULD deixar comentário JSDoc mínimo em cada novo campo da interface
</requirements>

## Subtasks

- [x] 32.1 Ler `equipamentos.ts` e `PainelAjusteVariaveis.tsx` completos
- [x] 32.2 Adicionar interfaces `ExplicacaoTag` e campos opcionais a `MetadadosEquipamento`
- [x] 32.3 Preencher dados das 10 variáveis de processo no `CATALOGO_EQUIPAMENTOS`
- [x] 32.4 Executar `cd frontend && npm run build` para garantir compilação sem erros

## Implementation Details

### Interface atualizada

```typescript
export interface ExplicacaoTag {
  /** Ex: "FIT" */
  prefixo: string
  /** Ex: "Flow Indicator Transmitter" */
  significadoPrefixo: string
  /** Ex: "Transmissor indicador de vazão" */
  significadoPortugues: string
  /** Ex: "Malha da linha principal de tratamento" */
  significadoNumero: string
}

export interface MetadadosEquipamento {
  tag: string
  nomeAbreviado: string
  instrumento: string
  funcao: string
  categoria: string
  papelNoProcesso: string
  unidade?: string
  /** Faixa de operação normal na simulação */
  faixaNormal?: { min: number; max: number }
  /** Faixa de atenção (valores acima/abaixo do normal mas antes do crítico) */
  faixaAtencao?: { min?: number; max?: number }
  /** Faixa crítica (aciona alarme na simulação) */
  faixaCritica?: { min?: number; max?: number }
  /** Ex: "4–20 mA" */
  tipoSinal?: string
  /** Camada da arquitetura ISA-95: Campo, Controle, Supervisão */
  nivelArquitetura?: string
  /** Ex: "Linha principal de tratamento" */
  areaProcesso?: string
  /** Decomposição didática da nomenclatura da tag */
  explicacaoTag?: ExplicacaoTag
  /** Papel operacional resumido desta variável no processo */
  impactoOperacional?: string
  /** O que acontece quando o operador aumenta este valor na simulação */
  efeitoAumento?: string
  /** O que acontece quando o operador diminui este valor na simulação */
  efeitoDiminuicao?: string
  /** Contexto para o operador/aluno sobre uso em planta real */
  dicaOperador?: string
}
```

### Dados para as 10 variáveis de processo

#### FIT-101
```typescript
faixaNormal: { min: 6, max: 14 },
tipoSinal: '4–20 mA',
nivelArquitetura: 'Campo',
areaProcesso: 'Linha principal de tratamento',
explicacaoTag: {
  prefixo: 'FIT',
  significadoPrefixo: 'Flow Indicator Transmitter',
  significadoPortugues: 'Transmissor indicador de vazão',
  significadoNumero: 'Malha da linha principal de entrada da planta',
},
impactoOperacional: 'Define a quantidade de água bruta entrando na planta.',
efeitoAumento: 'Aumenta a alimentação da planta e pode elevar o nível do tanque.',
efeitoDiminuicao: 'Reduz a produção de água tratada.',
dicaOperador: 'Em uma planta real, usada para balancear alimentação e demanda.',
```

#### FIT-102
```typescript
faixaNormal: { min: 5, max: 13 },
tipoSinal: '4–20 mA',
nivelArquitetura: 'Campo',
areaProcesso: 'Linha principal de tratamento',
explicacaoTag: {
  prefixo: 'FIT',
  significadoPrefixo: 'Flow Indicator Transmitter',
  significadoPortugues: 'Transmissor indicador de vazão',
  significadoNumero: 'Malha da linha principal de saída da planta',
},
impactoOperacional: 'Indica quanto de água tratada está sendo enviada ao processo.',
efeitoAumento: 'Representa maior demanda ou maior retirada do tanque.',
efeitoDiminuicao: 'Representa menor envio ao processo.',
```

#### LIT-101
```typescript
faixaNormal: { min: 40, max: 80 },
faixaAtencao: { min: 20, max: 90 },
faixaCritica: { min: 10, max: 95 },
tipoSinal: '4–20 mA',
nivelArquitetura: 'Campo',
areaProcesso: 'Linha principal de tratamento',
explicacaoTag: {
  prefixo: 'LIT',
  significadoPrefixo: 'Level Indicator Transmitter',
  significadoPortugues: 'Transmissor indicador de nível',
  significadoNumero: 'Tanque principal da planta (T-101)',
},
impactoOperacional: 'Mostra o volume relativo de água tratada armazenado.',
efeitoAumento: 'Aproxima o tanque de condição de nível alto.',
efeitoDiminuicao: 'Aproxima o tanque de condição de nível baixo.',
dicaOperador: 'Valores muito altos ativam alarme de nível alto; muito baixos ativam alarme de nível baixo.',
```

#### PIT-101
```typescript
faixaNormal: { min: 3, max: 7 },
faixaAtencao: { min: 2, max: 8 },
faixaCritica: { max: 10 },
tipoSinal: '4–20 mA',
nivelArquitetura: 'Campo',
areaProcesso: 'Linha principal de tratamento',
explicacaoTag: {
  prefixo: 'PIT',
  significadoPrefixo: 'Pressure Indicator Transmitter',
  significadoPortugues: 'Transmissor indicador de pressão',
  significadoNumero: 'Linha principal de tratamento',
},
impactoOperacional: 'Indica a condição hidráulica da linha principal.',
efeitoAumento: 'Pode indicar restrição, maior carga ou esforço da bomba.',
efeitoDiminuicao: 'Pode indicar baixa vazão, falha de bomba ou perda de pressão.',
```

#### DPIT-101
```typescript
faixaNormal: { min: 0, max: 0.8 },
faixaAtencao: { min: 0.8, max: 1.2 },
faixaCritica: { min: 1.2 },
tipoSinal: '4–20 mA',
nivelArquitetura: 'Campo',
areaProcesso: 'Linha principal de tratamento',
explicacaoTag: {
  prefixo: 'DPIT',
  significadoPrefixo: 'Differential Pressure Indicator Transmitter',
  significadoPortugues: 'Transmissor indicador de pressão diferencial',
  significadoNumero: 'Filtro da linha principal (F-101)',
},
impactoOperacional: 'Indica possível saturação do filtro F-101.',
efeitoAumento: 'Simula filtro ficando obstruído/saturado.',
efeitoDiminuicao: 'Simula filtro limpo ou baixa perda de carga.',
dicaOperador: 'Em uma planta real, valores críticos indicam necessidade de retrolavagem ou troca de elemento filtrante.',
```

#### TIT-101
```typescript
faixaNormal: { min: 15, max: 35 },
tipoSinal: '4–20 mA',
nivelArquitetura: 'Campo',
areaProcesso: 'Linha principal de tratamento',
explicacaoTag: {
  prefixo: 'TIT',
  significadoPrefixo: 'Temperature Indicator Transmitter',
  significadoPortugues: 'Transmissor indicador de temperatura',
  significadoNumero: 'Linha principal de tratamento',
},
impactoOperacional: 'Monitora a condição térmica da água tratada.',
efeitoAumento: 'Pode indicar aquecimento ou condição anormal no processo.',
efeitoDiminuicao: 'Pode indicar água mais fria ou variação de processo.',
```

#### AIT-101
```typescript
faixaNormal: { min: 6.5, max: 8.5 },
faixaAtencao: { min: 6.0, max: 9.0 },
faixaCritica: { min: 5.5, max: 9.5 },
tipoSinal: '4–20 mA ou comunicação digital',
nivelArquitetura: 'Campo',
areaProcesso: 'Linha principal de tratamento',
explicacaoTag: {
  prefixo: 'AIT',
  significadoPrefixo: 'Analyzer Indicator Transmitter',
  significadoPortugues: 'Analisador indicador de pH',
  significadoNumero: 'Ponto de análise da linha principal (pH)',
},
impactoOperacional: 'Indica se a água está ácida, neutra ou alcalina.',
efeitoAumento: 'Simula água mais alcalina.',
efeitoDiminuicao: 'Simula água mais ácida. Valores fora da faixa podem levar ao descarte.',
```

#### AIT-102
```typescript
faixaNormal: { min: 0, max: 5 },
faixaAtencao: { min: 5, max: 10 },
faixaCritica: { min: 10 },
tipoSinal: '4–20 mA ou comunicação digital',
nivelArquitetura: 'Campo',
areaProcesso: 'Linha principal de tratamento',
explicacaoTag: {
  prefixo: 'AIT',
  significadoPrefixo: 'Analyzer Indicator Transmitter',
  significadoPortugues: 'Analisador indicador de turbidez',
  significadoNumero: 'Ponto de análise da linha principal (turbidez)',
},
impactoOperacional: 'Indica a presença de partículas em suspensão na água.',
efeitoAumento: 'Simula piora da qualidade da água (maior turbidez).',
efeitoDiminuicao: 'Simula água mais clarificada.',
```

#### AIT-103
```typescript
faixaNormal: { min: 100, max: 1200 },
tipoSinal: '4–20 mA ou comunicação digital',
nivelArquitetura: 'Campo',
areaProcesso: 'Linha principal de tratamento',
explicacaoTag: {
  prefixo: 'AIT',
  significadoPrefixo: 'Analyzer Indicator Transmitter',
  significadoPortugues: 'Analisador indicador de condutividade',
  significadoNumero: 'Ponto de análise da linha principal (condutividade)',
},
impactoOperacional: 'Indica a concentração de sais e íons dissolvidos na água.',
efeitoAumento: 'Simula aumento de sólidos dissolvidos.',
efeitoDiminuicao: 'Simula água com menor concentração iônica.',
```

#### FIT-201
```typescript
faixaNormal: { min: 2, max: 8 },
tipoSinal: '4–20 mA',
nivelArquitetura: 'Campo',
areaProcesso: 'Sistema de dosagem química',
explicacaoTag: {
  prefixo: 'FIT',
  significadoPrefixo: 'Flow Indicator Transmitter',
  significadoPortugues: 'Transmissor indicador de vazão química',
  significadoNumero: 'Sistema auxiliar de dosagem química (área 201)',
},
impactoOperacional: 'Indica quanto produto químico está sendo dosado.',
efeitoAumento: 'Simula maior dosagem química no processo.',
efeitoDiminuicao: 'Simula menor correção química.',
dicaOperador: 'A dosagem correta depende do pH e da vazão de entrada de água bruta.',
```

### Relevant Files

- `frontend/src/dominio/equipamentos.ts` — único arquivo modificado
- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — leitura apenas (confirmar tags)

### Dependent Files (serão alterados nas tasks seguintes)

- `frontend/src/dominio/statusVariavel.ts` — task 33 (usa `MetadadosEquipamento`)
- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — tasks 34, 35

## Deliverables

- `frontend/src/dominio/equipamentos.ts` atualizado com novos campos **(REQUIRED)**
- Todos os campos existentes inalterados **(REQUIRED)**
- 10 variáveis de processo com dados operacionais preenchidos **(REQUIRED)**
- Build passando sem erros TypeScript **(REQUIRED)**

## Tests

- Unit tests:
  - [ ] `cd frontend && npm run build` retorna exit code 0
  - [ ] `obterMetadados('FIT-101')?.faixaNormal` retorna `{ min: 6, max: 14 }`
  - [ ] `obterMetadados('DPIT-101')?.faixaCritica` retorna `{ min: 1.2 }`
  - [ ] `obterMetadados('FV-101')?.faixaNormal` retorna `undefined` (atuadores não têm faixa)
  - [ ] `obterMetadados('TAG-X')` retorna `undefined` sem erro

## Success Criteria

- Interface expandida com campos opcionais documentados
- Todos os 20 equipamentos existentes mantidos (campos novos são opcionais)
- 10 variáveis de processo com `faixaNormal`, `explicacaoTag`, `impactoOperacional`, `efeitoAumento`, `efeitoDiminuicao`
- Nenhum componente alterado nesta task
- Build passa sem erros
