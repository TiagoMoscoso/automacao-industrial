---
status: completed
title: Criar utilitários de status operacional para variáveis de processo
type: frontend
complexity: low
dependencies:
    - task_32
---

# Task 33: Criar utilitários de status operacional para variáveis de processo

## Overview

Criar o arquivo `frontend/src/dominio/statusVariavel.ts` com funções utilitárias
que calculam e apresentam o status operacional de cada variável a partir de seu
valor atual e dos metadados de faixa (task 32).

Este módulo não depende de React — é puro TypeScript de domínio — e será consumido
pelo componente de card na task 34.

<critical>
- ALWAYS READ `frontend/src/dominio/equipamentos.ts` (task 32) antes de criar o arquivo
- DO NOT importar nenhum componente React neste arquivo
- DO NOT alterar `equipamentos.ts` nem nenhum componente existente
- DO NOT adicionar dependências externas
- FOLLOW a convenção de nomenclatura portuguesa do projeto
</critical>

<requirements>
- MUST exportar tipo `StatusOperacional` como union de strings literais:
  `'normal' | 'baixo' | 'alto' | 'atencao' | 'critico' | 'desconhecido'`
- MUST exportar função `obterStatusOperacional(valor: number, metadados: MetadadosEquipamento): StatusOperacional`
- MUST exportar função `formatarValorEngenharia(valor: number, unidade: string): string`
- MUST exportar função `obterLabelStatus(status: StatusOperacional): string`
- MUST exportar função `obterDescricaoStatus(status: StatusOperacional): string`
- MUST exportar função `obterClasseCssStatus(status: StatusOperacional): string`
- MUST retornar `'desconhecido'` quando `metadados.faixaNormal` não estiver definido
- SHOULD dar prioridade: verificar `faixaCritica` antes de `faixaAtencao` antes de `faixaNormal`
</requirements>

## Subtasks

- [x] 33.1 Ler `equipamentos.ts` completo para entender os tipos `MetadadosEquipamento` e `ExplicacaoTag`
- [x] 33.2 Criar `frontend/src/dominio/statusVariavel.ts` com todas as funções exportadas
- [x] 33.3 Executar `cd frontend && npm run build` para garantir compilação sem erros

## Implementation Details

### Lógica de `obterStatusOperacional`

```
se não há faixaNormal → 'desconhecido'

verificar faixaCritica (se definida):
  se faixaCritica.min definido e valor < faixaCritica.min → 'critico'
  se faixaCritica.max definido e valor > faixaCritica.max → 'critico'

verificar faixaAtencao (se definida):
  se faixaAtencao.min definido e valor < faixaAtencao.min → 'atencao'
  se faixaAtencao.max definido e valor > faixaAtencao.max → 'atencao'

verificar faixaNormal:
  se valor < faixaNormal.min → 'baixo'
  se valor > faixaNormal.max → 'alto'
  caso contrário → 'normal'
```

Nota: para variáveis com faixa crítica apenas por cima (ex: DPIT-101, AIT-102), `faixaCritica.min`
não existe e só `faixaCritica.max` é verificado.

### Mapeamentos das funções auxiliares

| status | label | classe CSS |
|--------|-------|------------|
| `'normal'` | "Normal" | `"status--normal"` |
| `'baixo'` | "Baixo" | `"status--baixo"` |
| `'alto'` | "Alto" | `"status--alto"` |
| `'atencao'` | "Atenção" | `"status--atencao"` |
| `'critico'` | "Crítico" | `"status--critico"` |
| `'desconhecido'` | "—" | `"status--desconhecido"` |

### `formatarValorEngenharia`

- Se a unidade for `'pH'` → 1 casa decimal sempre
- Se o valor for inteiro → sem casas decimais
- Caso contrário → 1 casa decimal
- Exemplo: `formatarValorEngenharia(10, 'm³/h')` → `"10"`, `formatarValorEngenharia(7.2, 'pH')` → `"7,2"` (usar `toLocaleString('pt-BR')`)

### `obterDescricaoStatus`

Retornar descrição curta:
- `'normal'` → "Dentro da faixa operacional"
- `'baixo'` → "Abaixo da faixa normal"
- `'alto'` → "Acima da faixa normal"
- `'atencao'` → "Fora da faixa, requer atenção"
- `'critico'` → "Fora do limite crítico — alarme"
- `'desconhecido'` → "Sem faixa definida"

### Relevant Files

- `frontend/src/dominio/equipamentos.ts` — importar `MetadadosEquipamento`
- `frontend/src/dominio/statusVariavel.ts` — arquivo a ser criado

### Dependent Files

- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — task 34 importará este módulo

## Deliverables

- `frontend/src/dominio/statusVariavel.ts` criado e compilando **(REQUIRED)**
- Todas as funções exportadas funcionando **(REQUIRED)**
- Build passando **(REQUIRED)**

## Tests

- Unit tests:
  - [x] `cd frontend && npm run build` retorna exit code 0
  - [x] `obterStatusOperacional(10, metadadosFIT101)` retorna `'normal'` (10 está em 6–14)
  - [x] `obterStatusOperacional(2, metadadosFIT101)` retorna `'baixo'` (2 < 6)
  - [x] `obterStatusOperacional(20, metadadosFIT101)` retorna `'alto'` (20 > 14)
  - [x] `obterStatusOperacional(1.5, metadadosDPIT101)` retorna `'critico'` (1.5 > 1.2)
  - [x] `obterStatusOperacional(0.9, metadadosDPIT101)` retorna `'atencao'` (0.9 em 0.8–1.2)
  - [x] `obterStatusOperacional(0.5, metadadosDPIT101)` retorna `'normal'` (0.5 em 0–0.8)
  - [x] `obterStatusOperacional(5, { tag: 'FV-101', ... })` retorna `'desconhecido'` (sem faixaNormal)
  - [x] `obterLabelStatus('critico')` retorna `'Crítico'`
  - [x] `obterClasseCssStatus('normal')` retorna `'status--normal'`

## Success Criteria

- Arquivo criado sem importações de React
- Lógica de prioridade crítico > atenção > normal correta
- `'desconhecido'` retornado quando não há `faixaNormal`
- Todas as funções auxiliares com mapeamentos completos para os 6 status
- Build passa sem erros
