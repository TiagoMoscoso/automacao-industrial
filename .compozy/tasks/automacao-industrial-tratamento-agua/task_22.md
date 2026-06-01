---
status: completed
title: Corrigir escala, formatação e proporção dos equipamentos
type: frontend
complexity: medium
dependencies:
  - task_21
---

# Task 22: Corrigir escala, formatação e proporção dos equipamentos

## Overview
Ajustar `SinoticoPlanta.tsx` para corrigir a proporção do tanque T-101 (atualmente grande demais em relação aos demais equipamentos), normalizar a altura de todos os blocos da linha principal para que fiquem uniformes, e corrigir a exibição do valor de nível (LIT-101) que aparece como "570%" — valor absurdo que indica erro de formatação ou escala de dado.

<critical>
- ALWAYS READ `auditoria-sinotico.md` (task_21) antes de começar para usar as dimensões mapeadas
- ALWAYS READ `SinoticoPlanta.tsx` completo antes de fazer qualquer alteração
- REFERENCE o viewBox atual (900×420) — NÃO alterar as dimensões do viewBox
- FOCUS ON "WHAT" — ajustar geometria e formatação de dados; não alterar lógica de estado
- TESTS REQUIRED — `npm run build` e `npm run typecheck` devem passar ao final
</critical>

<requirements>
- MUST redimensionar T-101 para que sua altura não seja superior a 1.5× a altura padrão dos demais equipamentos da linha principal (padrão atual: h=44)
- MUST garantir que todos os equipamentos da linha principal tenham o mesmo centro vertical (y central consistente)
- MUST corrigir a exibição do valor de nível do tanque (LIT-101): o valor deve ser exibido como percentual máximo de 100% — investigar se o problema é na leitura do campo (`nivel_tanque_percentual`) ou na formatação da string no TSX
- MUST NÃO alterar a lógica de cálculo do estado dos equipamentos (funções `estadoEquipamento`, `temAlarme`)
- MUST NÃO alterar contratos da API nem tipos de domínio do frontend
- MUST NÃO alterar `principal.css` nem variáveis CSS globais
- MUST NÃO adicionar dependências externas
- SHOULD ajustar a posição vertical do T-101 para que o centro permaneça na linha principal (y=100)
- SHOULD garantir que o texto de tag e valor dentro do T-101 continue centralizado após o redimensionamento
</requirements>

## Subtasks
- [x] 22.1 Ler `auditoria-sinotico.md` e confirmar dimensões atuais de T-101 e dos demais equipamentos
- [x] 22.2 Calcular novas dimensões de T-101 respeitando proporção ≤ 1.5× a altura padrão
- [x] 22.3 Ajustar `x`, `y`, `width`, `height` de T-101 em `SinoticoPlanta.tsx` e recentrar textos internos
- [x] 22.4 Localizar onde LIT-101 é formatado para exibição e corrigir para que o valor fique entre 0% e 100%
- [x] 22.5 Executar `cd frontend && npm run build` e `npm run typecheck` e confirmar sucesso
- [x] 22.6 Inspecionar visualmente o sinóptico no navegador e confirmar T-101 proporcional e valor correto

## Implementation Details
O campo de nível do tanque em `EstadoPlanta` é `nivelTanquePercentual` (mapeado de `nivel_tanque_percentual` no backend). Verificar se o valor retornado é 0–100 (percentual) ou 0–1 (fração). Se for fração, a formatação deve multiplicar por 100 antes de exibir. Se for percentual mas o display mostra 570%, o problema pode estar em um campo errado sendo lido (ex: `fluxo_entrada` sendo exibido no lugar de `nivelTanquePercentual`).

Para T-101, a geometria atual tem:
- Linha principal: `y=78, h=44` (centro y=100)
- T-101: `y=56, h=88` (centro y=100) — altura 2× maior que os demais

Proposta de ajuste: reduzir T-101 para `h=66` (1.5× padrão), reajustar `y` para `y=67` para manter centro em y=100.

Após ajuste, verificar que a linha de descarte (que parte do fundo do tanque) continua conectada corretamente.

### Relevant Files
- `frontend/src/componentes/SinoticoPlanta.tsx` — arquivo principal a modificar
- `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-sinotico.md` — referência de dimensões (task_21)
- `frontend/src/servicos/cliente-api.ts` — verificar mapeamento do campo `nivel_tanque_percentual`
- `frontend/src/dominio/tipos.ts` — verificar tipo de `nivelTanquePercentual`

### Dependent Files
- `frontend/src/componentes/SinoticoPlanta.tsx` — modificado por esta task, lido pelas tasks 23–25

## Deliverables
- `SinoticoPlanta.tsx` com T-101 em proporção ≤ 1.5× a altura padrão **(REQUIRED)**
- Valor de nível do tanque exibindo entre 0% e 100% **(REQUIRED)**
- `npm run build` passando **(REQUIRED)**

## Tests
- Unit tests:
  - [x] `npm run typecheck` retorna exit code 0 sem erros TypeScript
  - [x] `npm run build` retorna exit code 0
- Integration tests:
  - [x] No navegador, T-101 não se destaca desproporcional em relação a P-101, F-101 e P-102
  - [x] Valor de nível do tanque exibe entre 0% e 100% (não 570%)
  - [x] Centro vertical de todos os equipamentos da linha principal está alinhado
  - [x] Textos de tag e valor dentro de T-101 estão centralizados
- Test coverage target: N/A (ajuste visual)
- All tests must pass

## Success Criteria
- T-101 com altura ≤ 1.5× a altura padrão dos demais equipamentos (≤ 66px se padrão = 44px)
- Valor de nível exibindo corretamente (0–100%)
- Centro vertical da linha principal consistente entre todos os equipamentos
- `npm run build` e `npm run typecheck` passando sem erros
- Nenhuma regressão nas funcionalidades de estado e alarme
