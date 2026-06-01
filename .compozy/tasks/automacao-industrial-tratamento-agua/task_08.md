---
status: completed
title: Página principal e integração frontend-backend
type: frontend
complexity: medium
dependencies:
  - task_05
  - task_07
---

# Task 8: Página principal e integração frontend-backend

## Overview

Compõe todos os componentes na tela principal, implementa o loop de polling do estado da planta e define o estilo visual supervisório da interface. Ao final desta task, o frontend está integrado ao backend e o usuário pode ver a planta operando em tempo real no navegador.

<critical>
- ALWAYS READ o PRD (F3, jornada principal) e specs.md seções 11.4, 11.1 e princípios de interface do PRD antes de começar
- REFERENCE specs.md seção 10.3 para a estratégia de polling (GET /api/planta/estado a cada ~1s)
- FOCUS ON "WHAT" — compor a tela, manter estado global e fazer o polling; componentes filhos já existem
- MINIMIZE CODE — a lógica de negócio já está no backend; aqui é só composição e polling
- TESTS REQUIRED — testar que o polling chama a API e atualiza o estado, e que todos os componentes recebem as props corretas
</critical>

<requirements>
- MUST implementar `paginas/PaginaPrincipal.tsx` com composição de todos os 6 componentes da task_07 mais `PainelAjusteVariaveis` (task_09, pode ser placeholder na task_08)
- MUST implementar loop de polling em `PaginaPrincipal` usando `useEffect` + `setInterval` chamando `clienteApiPlanta.obterEstado()` a cada ~1000ms, armazenando resultado em `useState<EstadoPlanta>`
- MUST o estado atual deve ser passado via props para `SinoticoPlanta`, `CartaoVariavel` (x10 variáveis), `PainelAlarmes`, `PainelAtuadores`
- MUST os callbacks de ação (iniciar, pausar, reiniciar, aplicar cenário) devem chamar `clienteApiPlanta` e atualizar o estado local
- MUST implementar `App.tsx` montando `PaginaPrincipal` com título da aplicação
- MUST implementar `main.tsx` como ponto de entrada React padrão
- MUST implementar `estilos/principal.css` com estilo supervisório industrial: fundo escuro ou cinza, fontes legíveis, layout em grid ou flex com os painéis, cores industriais (verde=ok, amarelo=alerta, vermelho=falha/alarme)
- MUST o layout deve ser claro e navegável durante uma apresentação ao vivo — sem elementos decorativos desnecessários
- MUST tratar erro de conexão com o backend graciosamente (exibir mensagem de erro, não quebrar a interface)
- SHOULD usar `React.StrictMode` para facilitar debug durante a apresentação
</requirements>

## Subtasks

- [x] 8.1 Implementar `main.tsx` e `App.tsx` com ponto de entrada da aplicação
- [x] 8.2 Implementar `paginas/PaginaPrincipal.tsx` com composição dos painéis e loop de polling via `useEffect`
- [x] 8.3 Implementar callbacks de ação (iniciar, pausar, reiniciar, aplicar cenário, alterar variáveis) chamando `clienteApiPlanta`
- [x] 8.4 Implementar `estilos/principal.css` com layout supervisório e estados visuais de alarme/bloqueio
- [x] 8.5 Verificar integração completa frontend-backend com backend rodando localmente

## Implementation Details

Todos os arquivos em `frontend/src/`. O polling deve ser limpo no retorno do `useEffect` (clearInterval) para evitar memory leak. O estado `EstadoPlanta` deve ser compartilhado via props (não context), pois a aplicação é de página única e o estado não é muito profundo. O `principal.css` deve definir variáveis CSS para as cores de estado (--cor-normal, --cor-alerta, --cor-falha) para consistência entre componentes. Ver PRD "Princípios de interface" para guias de estilo (lembrar de IHM supervisória).

### Relevant Files

- `.specs/specs.md` — seção 11.4 (layout esperado da tela principal), seção 10.3 (estratégia de polling)
- `.compozy/tasks/automacao-industrial-tratamento-agua/_prd.md` — seção F3 (componentes da tela), "Jornada principal" e "Princípios de interface"
- `frontend/src/componentes/*.tsx` — task_07, componentes compostos aqui
- `frontend/src/servicos/clienteApiPlanta.ts` — task_06, funções de API usadas nos callbacks
- `frontend/src/dominio/estadoPlanta.ts` — task_06, tipo do estado centralizado
- `frontend/src/paginas/` — diretório criado em task_01

### Dependent Files

- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — task_09, adicionado à tela principal nesta task (pode ser placeholder)
- `frontend/Dockerfile` — task_10, usa o build do Vite que parte de `main.tsx`
- `.vscode/launch.json` — task_11, inicia o servidor Vite que serve esta aplicação

### Related ADRs

- [ADR-001: Abordagem de produto — Simulador web acadêmico com backend Python e frontend React](adrs/adr-001.md) — Frontend React representa IHM/SCADA; estilo supervisório reforça conceito acadêmico

## Deliverables

- `frontend/src/paginas/PaginaPrincipal.tsx`
- `frontend/src/App.tsx`
- `frontend/src/main.tsx`
- `frontend/src/estilos/principal.css`
- Unit tests com 80%+ coverage **(REQUIRED)**
- Integration tests do loop de polling e callbacks de ação **(REQUIRED)**

## Tests

- Unit tests:
  - [x] `PaginaPrincipal` renderiza sem erros com estado inicial mockado
  - [x] `PaginaPrincipal` exibe `CartaoVariavel` para cada uma das 10 variáveis de processo
  - [x] Loop de polling chama `clienteApiPlanta.obterEstado` após montagem do componente
  - [x] `clearInterval` é chamado ao desmontar o componente (sem memory leak)
  - [x] Callback `onAcionarCenario("emergencia")` chama `clienteApiPlanta.aplicarCenario("emergencia")`
  - [x] Erro de fetch exibe mensagem de erro na interface sem quebrar o componente
- Integration tests:
  - [x] `App` monta `PaginaPrincipal` sem erros
  - [x] Após receber estado de emergência do polling, `PainelAlarmes` exibe alarme de emergência
  - [x] `tsc --noEmit` passa sem erros de tipo em todos os arquivos desta task
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All tests passing
- Test coverage >=80%
- Tela principal renderizando com todos os painéis compostos
- Polling ativo atualizando estado a cada ~1s
- Callbacks de ação conectados ao `clienteApiPlanta`
- Estilo supervisório industrial com cores de estado definidas em variáveis CSS
- Todos os textos em português do Brasil
- `tsc --noEmit` passa sem erros
- Interface funcional com backend rodando localmente (verificação manual)
