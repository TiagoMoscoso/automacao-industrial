---
status: completed
title: Matriz de Causa e Efeito (camada de controle)
type: backend
complexity: medium
dependencies:
    - task_02
---

# Task 3: Matriz de Causa e Efeito (camada de controle)

## Overview

Implementa a camada de controle do backend: as 10 regras de intertravamento como funções puras, a orquestração dessas regras pela Matriz de Causa e Efeito e o controlador principal que aplica as ações ao estado da planta. Esta é a funcionalidade acadêmica central do projeto e deve ser coberta por testes exaustivos.

<critical>
- ALWAYS READ o PRD (F2) e specs.md seção 23 (Matriz de Causa e Efeito) e seção 10.6 antes de começar
- REFERENCE specs.md seção 23 para as 10 regras exatas com condições e efeitos — não inventar regras
- FOCUS ON "WHAT" — implementar as regras de intertravamento, não a dinâmica da planta
- MINIMIZE CODE — cada regra deve ser uma função pura simples; evitar if aninhados desnecessários
- TESTS REQUIRED — todos os 10 cenários de regra devem ter testes explícitos; esta é a parte mais crítica a testar
</critical>

<requirements>
- MUST implementar `regras_causa_efeito.py` com exatamente 10 funções puras, uma por regra da matriz (specs.md seção 23): `regra_emergencia`, `regra_nivel_alto_alto`, `regra_nivel_baixo_baixo`, `regra_pressao_alta`, `regra_filtro_saturado`, `regra_ph_fora_da_faixa`, `regra_turbidez_alta`, `regra_condutividade_alta`, `regra_falha_dosadora`, `regra_operacao_normal`
- MUST cada função de regra receber `EstadoProcesso` e retornar `Optional[AcoesControle]` (None se a regra não se aplicar, ações se aplicar)
- MUST implementar `matriz_causa_efeito.py` com função `avaliar(estado: EstadoProcesso) -> AcoesControle` que avalia as regras em ordem de prioridade (emergência primeiro, operação normal por último) e retorna as ações consolidadas
- MUST implementar `controlador_tratamento_agua.py` com classe `ControladorTratamentoAgua` que recebe estado e retorna ações de controle via `ControladorTratamentoAgua.executar(estado: EstadoProcesso) -> AcoesControle`
- MUST usar constantes de `LimitesOperacionais` para todos os limiares — proibido usar números literais
- MUST regra de emergência deve ter maior prioridade (avaliada primeiro e suas ações sobrescrevem tudo)
- MUST quando `emergencia_acionada=True`, todas as bombas devem estar desligadas e `processo_liberado=False`
- MUST quando nível >= 95%, P-101 deve ser desligada e FV-101 deve ser fechada
- MUST quando nível <= 10%, P-102 deve ser desligada
- MUST quando pH < 6.5 ou pH > 8.5, `processo_liberado=False`
- MUST quando turbidez > 5 NTU, `processo_liberado=False` e XV-101 deve ser aberta
- SHOULD cada regra gerar o alarme correspondente via `TipoAlarme`
- MUST esta camada não deve importar de `simulacao/`, `api/` ou `aplicacao/`
</requirements>

## Subtasks

- [x] 3.1 Implementar `regras_causa_efeito.py` com as 10 funções puras, uma por regra da matriz (specs.md seção 23)
- [x] 3.2 Implementar `matriz_causa_efeito.py` com a função `avaliar` que orquestra as regras em ordem de prioridade
- [x] 3.3 Implementar `controlador_tratamento_agua.py` com a classe `ControladorTratamentoAgua`
- [x] 3.4 Escrever `backend/tests/test_matriz_causa_efeito.py` cobrindo todas as 10 regras individualmente
- [x] 3.5 Escrever `backend/tests/test_controlador_tratamento_agua.py` cobrindo a integração do controlador completo

## Implementation Details

Todos os arquivos em `backend/src/automacao_industrial/controle/`. Ver specs.md seção 10.6 para responsabilidade da camada. A ordem de prioridade das regras na `matriz_causa_efeito.py` deve ser: emergência → nível alto-alto → nível baixo-baixo → pressão alta → turbidez alta → pH fora da faixa → condutividade alta → falha dosadora → filtro saturado → operação normal. Usar `LimitesOperacionais` importados do domínio em todas as comparações.

### Relevant Files

- `.specs/specs.md` — seção 23 (10 regras exatas com condições e efeitos), seção 10.6 (responsabilidade da camada de controle)
- `.compozy/tasks/automacao-industrial-tratamento-agua/_prd.md` — seção F2 (tabela completa da Matriz de Causa e Efeito)
- `backend/src/automacao_industrial/dominio/estado_processo.py` — importado por todas as regras
- `backend/src/automacao_industrial/dominio/acoes_controle.py` — retorno de todas as regras
- `backend/src/automacao_industrial/dominio/limites_operacionais.py` — todos os limiares das regras
- `backend/src/automacao_industrial/dominio/alarme.py` — tipos de alarme gerados pelas regras
- `backend/src/automacao_industrial/controle/__init__.py` — criado em task_01

### Dependent Files

- `backend/src/automacao_industrial/simulacao/servico_simulacao.py` — task_04, usa `ControladorTratamentoAgua`
- `backend/tests/test_simulador_planta.py` — task_04, pode usar regras para verificar comportamento esperado
- `backend/src/automacao_industrial/api/rotas_planta.py` — task_05, não usa diretamente (passa pelo serviço de simulação)

### Related ADRs

- [ADR-001: Abordagem de produto — Simulador web acadêmico com backend Python e frontend React](adrs/adr-001.md) — O Python representa a lógica de controle que em uma planta real estaria no CLP

## Deliverables

- `backend/src/automacao_industrial/controle/regras_causa_efeito.py`
- `backend/src/automacao_industrial/controle/matriz_causa_efeito.py`
- `backend/src/automacao_industrial/controle/controlador_tratamento_agua.py`
- `backend/tests/test_matriz_causa_efeito.py`
- `backend/tests/test_controlador_tratamento_agua.py`
- Unit tests com 80%+ coverage **(REQUIRED)**
- Integration tests para o controlador completo **(REQUIRED)**

## Tests

- Unit tests:
  - [ ] `regra_emergencia` com `emergencia_acionada=True` retorna ações com todas as bombas False e `processo_liberado=False`
  - [ ] `regra_emergencia` com `emergencia_acionada=False` retorna `None`
  - [ ] `regra_nivel_alto_alto` com `nivel_tanque_percentual=96.0` retorna ações com P-101 desligada e FV-101 fechada
  - [ ] `regra_nivel_alto_alto` com `nivel_tanque_percentual=94.9` retorna `None`
  - [ ] `regra_nivel_baixo_baixo` com `nivel_tanque_percentual=8.0` retorna ações com P-102 desligada
  - [ ] `regra_nivel_baixo_baixo` com `nivel_tanque_percentual=10.1` retorna `None`
  - [ ] `regra_ph_fora_da_faixa` com `ph=9.1` retorna ações com `processo_liberado=False` e alarme PH_FORA_DA_FAIXA
  - [ ] `regra_ph_fora_da_faixa` com `ph=6.4` retorna ações com `processo_liberado=False`
  - [ ] `regra_ph_fora_da_faixa` com `ph=7.2` retorna `None`
  - [ ] `regra_turbidez_alta` com `turbidez_ntu=7.0` retorna ações com `processo_liberado=False` e XV-101 aberta
  - [ ] `regra_condutividade_alta` com `condutividade_us_cm=1300.0` retorna ações com `processo_liberado=False`
  - [ ] `regra_operacao_normal` com todas as variáveis dentro dos limites retorna ações com todas as bombas ligadas e `processo_liberado=True`
- Integration tests:
  - [ ] `ControladorTratamentoAgua().executar(estado)` com estado de emergência retorna todas as bombas False
  - [ ] `ControladorTratamentoAgua().executar(estado)` com estado de operação normal retorna `processo_liberado=True` sem alarmes
  - [ ] Avaliar estado com nível alto-alto E pH fora da faixa simultaneamente prioriza emergência não presente e aplica ambos os efeitos
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All tests passing
- Test coverage >=80%
- Todas as 10 regras implementadas e testadas individualmente
- Nenhum número literal de limite nos arquivos da camada de controle (todos via `LimitesOperacionais`)
- Emergência tem prioridade absoluta sobre todas as demais regras
- `ControladorTratamentoAgua` integra corretamente todas as 10 regras
- Nenhum import de `simulacao/`, `api/` ou `aplicacao/` nos arquivos de controle
