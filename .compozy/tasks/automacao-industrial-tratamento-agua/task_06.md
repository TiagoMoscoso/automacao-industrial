---
status: completed
title: Domínio e serviços do frontend
type: frontend
complexity: low
dependencies:
  - task_01
---

# Task 6: Domínio e serviços do frontend

## Overview

Implementa as interfaces TypeScript que espelham os modelos do backend e o cliente HTTP que consome a API. Esta é a fundação do frontend — define os contratos de dado que todos os componentes React vão usar e centraliza toda a comunicação com o backend em um único serviço.

<critical>
- ALWAYS READ o PRD (F3) e specs.md seções 11.1, 11.3 antes de começar
- REFERENCE specs.md seção 11.3 para os caminhos exatos dos arquivos e seção 10.8 para os endpoints consumidos
- FOCUS ON "WHAT" — definir tipos TypeScript e funções de API; sem lógica de UI aqui
- MINIMIZE CODE — interfaces TypeScript simples e funções fetch; sem estado global complexo nesta task
- TESTS REQUIRED — verificar tipagem correta e que chamadas de API retornam o tipo esperado
</critical>

<requirements>
- MUST implementar `dominio/estadoPlanta.ts` com interface `EstadoPlanta` espelhando o response de `GET /api/planta/estado`: campos para todas as 10 variáveis de processo, 5 variáveis manipuladas, `processoLiberado: boolean`, `emergenciaAcionada: boolean`, `alarmes: Alarme[]`
- MUST implementar `dominio/alarme.ts` com type ou interface `Alarme` (tipo + mensagem) e enum ou union type `TipoAlarme` com os mesmos valores do backend
- MUST implementar `dominio/acoesControle.ts` com interface `AcoesControle` para o estado dos atuadores (bombas e válvulas)
- MUST implementar `servicos/clienteApiPlanta.ts` com funções assíncronas cobrindo todos os 7 endpoints: `obterEstado(): Promise<EstadoPlanta>`, `iniciarSimulacao(): Promise<void>`, `pausarSimulacao(): Promise<void>`, `reiniciarSimulacao(): Promise<void>`, `alterarVariaveis(variaveis: Record<string, number | boolean>): Promise<EstadoPlanta>`, `aplicarCenario(nome: string): Promise<EstadoPlanta>`
- MUST o cliente deve usar a URL base configurável (default `http://localhost:8000`) para facilitar a mudança para Docker
- MUST usar `fetch` nativo ou biblioteca leve; sem axios ou bibliotecas pesadas
- MUST tipagem explícita em todas as funções (parâmetros e retorno)
- MUST nomes em português do Brasil para interfaces, funções e variáveis
</requirements>

## Subtasks

- [x] 6.1 Implementar `dominio/alarme.ts` com enum `TipoAlarme` e interface `Alarme`
- [x] 6.2 Implementar `dominio/acoesControle.ts` com interface `AcoesControle`
- [x] 6.3 Implementar `dominio/estadoPlanta.ts` com interface `EstadoPlanta` completa
- [x] 6.4 Implementar `servicos/clienteApiPlanta.ts` com as 6 funções de API

## Implementation Details

Todos os arquivos em `frontend/src/`. Ver specs.md seção 11.3 para os caminhos exatos. Os campos de `EstadoPlanta` devem ter os mesmos nomes em camelCase que o backend retorna em snake_case — usar a convenção do backend (`nivel_tanque_percentual`) convertida para camelCase (`nivelTanquePercentual`), ou manter snake_case e documentar a escolha. O `clienteApiPlanta.ts` deve tratar erros HTTP (4xx/5xx) lançando erros com mensagens em português.

### Relevant Files

- `.specs/specs.md` — seção 11.1 (responsabilidade do frontend), seção 11.3 (estrutura de pastas), seção 10.8 (endpoints consumidos)
- `.compozy/tasks/automacao-industrial-tratamento-agua/_prd.md` — seção F3 (componentes e dados exibidos)
- `backend/src/automacao_industrial/api/esquemas.py` — task_05, define o contrato exato de request/response que este módulo espelha
- `frontend/src/dominio/` — diretório criado em task_01

### Dependent Files

- `frontend/src/componentes/CartaoVariavel.tsx` — task_07, usa `EstadoPlanta`
- `frontend/src/componentes/PainelAlarmes.tsx` — task_07, usa `Alarme` e `TipoAlarme`
- `frontend/src/componentes/PainelAtuadores.tsx` — task_07, usa `AcoesControle`
- `frontend/src/componentes/PainelCenarios.tsx` — task_07, usa `aplicarCenario`
- `frontend/src/componentes/ControleSimulacao.tsx` — task_07, usa `iniciarSimulacao`, `pausarSimulacao`, `reiniciarSimulacao`
- `frontend/src/paginas/PaginaPrincipal.tsx` — task_08, usa `obterEstado` no loop de polling

### Related ADRs

- [ADR-001: Abordagem de produto — Simulador web acadêmico com backend Python e frontend React](adrs/adr-001.md) — Frontend depende de contratos HTTP, não de detalhes internos do backend (inversão de dependência)

## Deliverables

- `frontend/src/dominio/estadoPlanta.ts`
- `frontend/src/dominio/alarme.ts`
- `frontend/src/dominio/acoesControle.ts`
- `frontend/src/servicos/clienteApiPlanta.ts`
- Unit tests com 80%+ coverage **(REQUIRED)**
- Integration tests de chamada à API com mock de fetch **(REQUIRED)**

## Tests

- Unit tests:
  - [x] `TipoAlarme` contém os mesmos 9 valores do enum Python no backend
  - [x] `EstadoPlanta` tem campo `nivelTanquePercentual` (ou equivalente) do tipo `number`
  - [x] `EstadoPlanta` tem campo `alarmes` do tipo `Alarme[]`
  - [x] `clienteApiPlanta.obterEstado()` com mock de fetch retornando JSON válido retorna objeto tipado como `EstadoPlanta`
  - [x] `clienteApiPlanta.aplicarCenario("nivel_alto_alto")` faz POST para `/api/planta/cenarios/nivel_alto_alto`
  - [x] `clienteApiPlanta.alterarVariaveis({"ph": 9.1})` faz POST para `/api/planta/variaveis` com body correto
- Integration tests:
  - [x] Todos os 4 arquivos de domínio/serviço importam sem erro de TypeScript (`tsc --noEmit`)
  - [x] Nenhum arquivo de domínio/serviço importa de `componentes/` ou `paginas/`
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All tests passing
- Test coverage >=80%
- Todos os 4 arquivos criados nos caminhos corretos
- `EstadoPlanta` cobre todos os campos retornados pelo backend (task_05)
- `clienteApiPlanta` cobre os 6 endpoints necessários
- Tipagem explícita em todos os parâmetros e retornos
- Nenhum import de `componentes/` ou `paginas/`
