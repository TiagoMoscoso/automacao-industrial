---
status: completed
title: Painel de ajuste manual de variáveis
type: frontend
complexity: medium
dependencies:
  - task_08
---

# Task 9: Painel de ajuste manual de variáveis

## Overview

Implementa o painel de ajuste manual de variáveis: formulário ou sliders que permitem ao usuário alterar qualquer variável de processo individualmente e observar imediatamente os efeitos da Matriz de Causa e Efeito na interface. Este painel é central para a demonstração acadêmica — permite mostrar ao professor como intertravamentos funcionam para qualquer valor de entrada.

<critical>
- ALWAYS READ o PRD (F3 item 7, jornada principal passo 6) e specs.md seção 25.1 antes de começar
- REFERENCE specs.md seção 18.1 para os limites físicos plausíveis de cada variável (para configurar min/max dos sliders)
- FOCUS ON "WHAT" — ajuste visual e chamada ao backend; a Matriz de Causa e Efeito reage automaticamente no backend
- MINIMIZE CODE — sliders ou campos numéricos simples; sem biblioteca de formulários pesada
- TESTS REQUIRED — testar que slider/campo ao ser alterado chama o endpoint correto e que o estado é atualizado
</critical>

<requirements>
- MUST implementar `componentes/PainelAjusteVariaveis.tsx` com controles de ajuste para todas as 10 variáveis de processo: FIT-101, FIT-102, LIT-101, PIT-101, DPIT-101, TIT-101, AIT-101, AIT-102, AIT-103, FIT-201
- MUST cada controle deve exibir: tag do instrumento, nome da variável, valor atual, unidade e um slider ou campo numérico para ajuste
- MUST cada slider deve ter limites min/max plausíveis para a variável (ex: LIT-101: 0–100%, AIT-101 pH: 0–14, PIT-101: 0–15 bar)
- MUST ao confirmar um novo valor (ex: ao soltar o slider ou pressionar Enter), chamar `clienteApiPlanta.alterarVariaveis({[campo]: valor})` e atualizar o estado da planta pai
- MUST o campo que causou um alarme deve ter indicação visual (borda vermelha ou ícone) baseada no estado atual do pai
- MUST incluir flag `emergenciaAcionada` como toggle ou botão separado no painel, pois é variável manipulada especial
- MUST o componente recebe `estadoAtual: EstadoPlanta` e `onAlterarVariavel: (campo: string, valor: number | boolean) => void` como props
- SHOULD usar debounce de ~300ms para chamadas de API ao mover sliders (evitar flood de requests)
- MUST todos os textos e labels em português do Brasil
</requirements>

## Subtasks

- [x] 9.1 Implementar `PainelAjusteVariaveis.tsx` com sliders ou campos numéricos para as 10 variáveis de processo
- [x] 9.2 Configurar min/max de cada slider baseado nos limites plausíveis de cada variável
- [x] 9.3 Conectar callback `onAlterarVariavel` ao `clienteApiPlanta.alterarVariaveis` na `PaginaPrincipal`
- [x] 9.4 Adicionar indicação visual de estado crítico nos controles cujas variáveis estão em alarme
- [x] 9.5 Implementar toggle de emergência e conectar ao callback de alterar variáveis

## Implementation Details

Arquivo em `frontend/src/componentes/PainelAjusteVariaveis.tsx`. Integrado na `PaginaPrincipal.tsx` da task_08 (que já tem um placeholder ou o componente é adicionado nesta task). O `onAlterarVariavel` na `PaginaPrincipal` deve chamar `clienteApiPlanta.alterarVariaveis`, aguardar o response e atualizar o estado local (não esperar o próximo ciclo de polling para refletir a mudança). Os limites min/max dos sliders podem ser definidos num objeto de configuração local no componente.

### Relevant Files

- `.specs/specs.md` — seção 18.1 (variáveis de processo com unidades), seção 25.1 (ajuste manual obrigatório)
- `.compozy/tasks/automacao-industrial-tratamento-agua/_prd.md` — seção F3 item 7 (painel de ajuste), jornada principal passo 6 ("o estudante ajusta um valor via slider")
- `frontend/src/servicos/clienteApiPlanta.ts` — task_06, função `alterarVariaveis`
- `frontend/src/dominio/estadoPlanta.ts` — task_06, interface para o estado recebido como prop
- `frontend/src/paginas/PaginaPrincipal.tsx` — task_08, onde o componente é montado e o callback é implementado

### Dependent Files

- `frontend/src/estilos/principal.css` — task_08, estilos de estado crítico (borda vermelha) definidos aqui, referenciados neste componente

### Related ADRs

- [ADR-001: Abordagem de produto — Simulador web acadêmico com backend Python e frontend React](adrs/adr-001.md) — Painel de ajuste manual permite demonstrar intertravamentos sem cenários predefinidos

## Deliverables

- `frontend/src/componentes/PainelAjusteVariaveis.tsx`
- `frontend/src/paginas/PaginaPrincipal.tsx` atualizada para integrar o painel (se ainda não integrado em task_08)
- Unit tests com 80%+ coverage **(REQUIRED)**
- Integration tests de chamada à API ao alterar variável **(REQUIRED)**

## Tests

- Unit tests:
  - [ ] `PainelAjusteVariaveis` renderiza controles para as 10 variáveis de processo
  - [ ] Slider de LIT-101 tem `min=0` e `max=100`
  - [ ] Slider de AIT-101 (pH) tem `min=0` e `max=14`
  - [ ] Ao alterar slider de LIT-101 para 96, callback `onAlterarVariavel("nivel_tanque_percentual", 96)` é chamado
  - [ ] Variável com alarme ativo exibe indicação visual de estado crítico (classe/borda vermelha)
  - [ ] Toggle de emergência chama `onAlterarVariavel("emergencia_acionada", true)` ao ativar
- Integration tests:
  - [ ] `PaginaPrincipal` com `PainelAjusteVariaveis` integrado: alterar pH via slider chama `clienteApiPlanta.alterarVariaveis` com `{"ph": valor}` e estado atualiza sem esperar próximo polling
  - [ ] `tsc --noEmit` passa sem erros de tipo no componente
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All tests passing
- Test coverage >=80%
- Controles para todas as 10 variáveis de processo com min/max corretos
- Alteração de variável reflete imediatamente no estado (não aguarda próximo poll)
- Indicação visual de estado crítico nos campos em alarme
- Toggle de emergência funcional
- Todos os textos em português do Brasil
