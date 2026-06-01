---
status: completed
title: Remover controles de simulação da interface
type: frontend
complexity: low
dependencies:
  - task_14
---

# Task 15: Remover controles de simulação da interface

## Overview
Remover da interface o componente `ControleSimulacao.tsx` e todas as suas referências em `PaginaPrincipal.tsx`, eliminando os botões Iniciar, Pausar e Reiniciar da tela. Os endpoints do backend e as funções do cliente de API permanecem intocados; apenas o elemento visual é removido.

<critical>
- ALWAYS READ o PRD de refinamento (`.compozy/tasks/prd-refinamento-frontend.md/prd-refinamento-frontend.md`) e o `auditoria-frontend.md` antes de começar
- REFERENCE a seção RF04 do PRD para os limites desta remoção
- FOCUS ON "WHAT" — remover apenas a renderização do componente e seus handlers na página principal
- MINIMIZE CODE — não refatorar outros componentes; não remover funções da API; não alterar o backend
- TESTS REQUIRED — verificar que os botões não aparecem na interface e que os testes existentes continuam passando
</critical>

<requirements>
- MUST remover a importação de `ControleSimulacao` em `PaginaPrincipal.tsx`
- MUST remover a renderização de `<ControleSimulacao ... />` do JSX da página principal
- MUST remover os handlers `onIniciar`, `onPausar` e `onReiniciar` se forem usados exclusivamente pelo componente removido
- MUST remover o estado `simulacaoAtiva` de `PaginaPrincipal.tsx` se não for usado por nenhum outro componente
- MUST NOT remover `iniciarSimulacao`, `pausarSimulacao` e `reiniciarSimulacao` de `clienteApiPlanta.ts`
- MUST NOT alterar nenhum arquivo do backend
- MUST NOT alterar `ControleSimulacao.tsx` — apenas parar de importá-lo e renderizá-lo
- SHOULD verificar se `estado.simulacaoAtiva` é usado por outros componentes (ex: sinóptico) antes de removê-lo do estado
- SHOULD executar `npm run typecheck` e `npm run lint` após a remoção para confirmar zero erros
</requirements>

## Subtasks
- [x] 15.1 Ler `PaginaPrincipal.tsx` por completo e mapear todas as referências a `ControleSimulacao`, `simulacaoAtiva`, `onIniciar`, `onPausar` e `onReiniciar`
- [x] 15.2 Verificar se `estado.simulacaoAtiva` é consumido por algum outro componente além de `ControleSimulacao`
- [x] 15.3 Remover a importação, a renderização e os handlers exclusivos do controle de simulação em `PaginaPrincipal.tsx`
- [x] 15.4 Executar `npm run typecheck` e `npm run lint` para confirmar zero erros de compilação
- [x] 15.5 Executar `npm run test` para confirmar que os testes existentes continuam passando

## Implementation Details
O arquivo principal a modificar é `frontend/src/paginas/PaginaPrincipal.tsx`.

Passos esperados:
1. Remover `import { ControleSimulacao } from '../componentes/ControleSimulacao'`
2. Remover `<ControleSimulacao ... />` do JSX
3. Remover os callbacks `iniciarSimulacao`, `pausarSimulacao`, `reiniciarSimulacao` se usados apenas ali
4. Se `estado.simulacaoAtiva` só alimentava `ControleSimulacao`, ele pode ser descartado da desestruturação do estado

O componente `ControleSimulacao.tsx` não deve ser deletado do disco nesta task — apenas não deve ser importado. A exclusão física pode ocorrer em task futura após confirmação de não uso.

### Relevant Files
- `frontend/src/paginas/PaginaPrincipal.tsx` — único arquivo a ser modificado
- `frontend/src/componentes/ControleSimulacao.tsx` — componente a ser desreferenciado (não deletar)
- `frontend/src/servicos/clienteApiPlanta.ts` — NÃO modificar; funções de controle permanecem
- `frontend/src/dominio/estadoPlanta.ts` — verificar se `simulacaoAtiva` está no tipo `EstadoPlanta`
- `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-frontend.md` — referência da auditoria (task_14)

### Dependent Files
- `frontend/src/paginas/PaginaPrincipal.tsx` — modificado por esta task
- `frontend/src/paginas/PaginaPrincipal.test.tsx` — pode precisar remover testes do componente de simulação

### Related ADRs
- [ADR-001: Abordagem de produto](adrs/adr-001.md) — Confirma que endpoints do backend são preservados mesmo com remoção da UI

## Deliverables
- `frontend/src/paginas/PaginaPrincipal.tsx` sem importação nem renderização de `ControleSimulacao`
- `npm run typecheck` passando sem erros **(REQUIRED)**
- `npm run test` passando sem regressões **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] `PaginaPrincipal.tsx` não importa `ControleSimulacao` após a modificação
  - [ ] Renderizar `PaginaPrincipal` em teste não produz elemento com texto "Iniciar", "Pausar" ou "Reiniciar"
  - [ ] Os testes existentes em `PaginaPrincipal.test.tsx` continuam passando sem alterações de comportamento
- Integration tests:
  - [ ] `npm run typecheck` retorna exit code 0 após a remoção
  - [ ] `npm run lint` retorna exit code 0 após a remoção
  - [ ] `npm run test` retorna exit code 0 após a remoção
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- Os botões Iniciar, Pausar e Reiniciar não aparecem na interface
- Zero erros de TypeScript e lint após a modificação
- `clienteApiPlanta.ts` inalterado — funções de controle do backend preservadas
- Nenhum arquivo do backend foi alterado
