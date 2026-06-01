---
status: completed
title: Auditar frontend atual
type: frontend
complexity: low
dependencies:
  - task_13
---

# Task 14: Auditar frontend atual

## Overview
Inspecionar e documentar a estrutura atual do frontend, identificando cada componente, arquivo CSS, integração com a API e ponto de acoplamento relevante para o refinamento visual. O resultado é um relatório de auditoria que serve de referência para as tasks 15–19.

<critical>
- ALWAYS READ o PRD de refinamento (`.compozy/tasks/prd-refinamento-frontend.md/prd-refinamento-frontend.md`) antes de começar
- REFERENCE a seção RF03 do PRD para os itens que devem ser auditados
- FOCUS ON "WHAT" — documentar o que existe, sem modificar código
- MINIMIZE CODE — apenas leitura de arquivos; nenhuma alteração de código permitida
- TESTS REQUIRED — verificar que o relatório existe e contém as seções obrigatórias
</critical>

<requirements>
- MUST identificar a página principal (`PaginaPrincipal.tsx`) e o layout CSS Grid atual
- MUST identificar o componente de sinóptico (`SinoticoPlanta.tsx`) e seu esquema SVG
- MUST identificar o componente de controle de simulação (`ControleSimulacao.tsx`) e seus props
- MUST identificar o painel de cenários (`PainelCenarios.tsx`) e os 6 cenários disponíveis
- MUST identificar o painel de alarmes (`PainelAlarmes.tsx`) e os 9 tipos de alarme
- MUST identificar o painel de atuadores (`PainelAtuadores.tsx`) e os 5 atuadores
- MUST identificar os cards de variáveis (`CartaoVariavel.tsx`) e as 10 variáveis mapeadas
- MUST listar os arquivos CSS (`principal.css`, `componentes.css`) e as custom properties de cor
- MUST mapear os pontos de acoplamento com a API em `clienteApiPlanta.ts`
- MUST produzir o relatório em `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-frontend.md`
- SHOULD identificar problemas visuais concretos: desalinhamentos, excesso de bordas, hierarquia confusa
</requirements>

## Subtasks
- [x] 14.1 Ler `PaginaPrincipal.tsx` por completo: estrutura JSX, estado gerenciado, handlers de comando e layout atual
- [x] 14.2 Mapear cada componente em `frontend/src/componentes/`, listando props, responsabilidades e classes CSS relevantes
- [x] 14.3 Mapear `principal.css` e `componentes.css`: variáveis de cor, classes de layout CSS Grid e classes de estado
- [x] 14.4 Mapear `clienteApiPlanta.ts`: funções exportadas, campos camelCase ↔ snake_case e endpoints consumidos
- [x] 14.5 Escrever `auditoria-frontend.md` com seções para cada item auditado e uma seção de problemas visuais observados

## Implementation Details
Nenhum arquivo de código será modificado. A task produz apenas um documento de auditoria.

Caminho do relatório de saída:
`.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-frontend.md`

O relatório deve ter seções para: Página Principal, Sinóptico, Controle de Simulação (a remover), Cenários, Alarmes, Atuadores, Variáveis de Processo, Estilos e API. Deve incluir também uma seção "Problemas Visuais" com os itens concretos a corrigir nas tasks seguintes.

### Relevant Files
- `frontend/src/paginas/PaginaPrincipal.tsx` — orquestra todos os componentes e o layout
- `frontend/src/componentes/ControleSimulacao.tsx` — componente a ser removido na task_15
- `frontend/src/componentes/SinoticoPlanta.tsx` — sinóptico SVG a ser refinado na task_17
- `frontend/src/componentes/PainelAlarmes.tsx` — painel a ser polido na task_18
- `frontend/src/componentes/PainelAtuadores.tsx` — painel a ser polido na task_18
- `frontend/src/componentes/PainelCenarios.tsx` — painel a ser preservado
- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — painel a ser preservado com menor destaque
- `frontend/src/componentes/CartaoVariavel.tsx` — card de variável a ser polido na task_18
- `frontend/src/componentes/componentes.css` — estilos dos componentes
- `frontend/src/estilos/principal.css` — estilos globais e grid principal
- `frontend/src/servicos/clienteApiPlanta.ts` — cliente da API com mapeamento camelCase
- `frontend/src/dominio/estadoPlanta.ts` — tipos do domínio frontend

### Dependent Files
- `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-frontend.md` — criado por esta task, usado pelas tasks 15–18 como referência

### Related ADRs
- [ADR-001: Abordagem de produto](adrs/adr-001.md) — Define os limites frontend/backend que esta auditoria respeita

## Deliverables
- `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-frontend.md` com todas as seções obrigatórias preenchidas
- Testes de verificação da existência e completude do relatório **(REQUIRED)**

## Tests
- Unit tests:
  - [x] `auditoria-frontend.md` existe no caminho `.compozy/tasks/automacao-industrial-tratamento-agua/`
  - [x] O arquivo contém a seção "Página Principal" com referência a `PaginaPrincipal.tsx`
  - [x] O arquivo contém a seção "Sinóptico" com referência a `SinoticoPlanta.tsx`
  - [x] O arquivo contém a seção "Controle de Simulação" com referência a `ControleSimulacao.tsx`
  - [x] O arquivo contém a seção "Cenários" com os 6 cenários listados por nome
  - [x] O arquivo contém a seção "Alarmes" com pelo menos 9 tipos de alarme
  - [x] O arquivo contém a seção "Atuadores" com os 5 atuadores (P-101, P-102, P-201, FV-101, XV-101)
  - [x] O arquivo contém a seção "Estilos" com referência às custom properties `--cor-normal`, `--cor-alerta`, `--cor-falha`
  - [x] O arquivo contém a seção "API" com as funções do cliente listadas
- Integration tests:
  - [x] Todos os caminhos de arquivo referenciados no relatório existem no repositório
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- `auditoria-frontend.md` criado com todas as 9 seções obrigatórias
- Nenhum arquivo de código foi modificado
- O relatório cobre todos os itens exigidos pelo RF03 do PRD de refinamento
