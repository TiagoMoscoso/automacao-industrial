---
status: completed
title: Simulador da planta (camada de simulação)
type: backend
complexity: medium
dependencies:
  - task_03
---

# Task 4: Simulador da planta (camada de simulação)

## Overview

Implementa a camada de simulação do backend: o loop temporal que atualiza variáveis ao longo do tempo, os 6 cenários de demonstração com valores predefinidos e o serviço que integra simulação e controle, gerenciando o ciclo de vida da simulação (iniciar, pausar, reiniciar). Esta camada é o que dá vida à planta ao longo do tempo.

<critical>
- ALWAYS READ o PRD (F1, F4) e specs.md seções 10.7 e 26 antes de começar
- REFERENCE specs.md seção 10.7 para os exemplos de comportamento dinâmico e seção 26 para os valores exatos dos 6 cenários
- FOCUS ON "WHAT" — simular dinâmica simplificada e gerenciar os cenários; não simular física real
- MINIMIZE CODE — o simulador deve ser funcional e didático, não um solver de equações diferenciais
- TESTS REQUIRED — cada cenário deve ter um teste que verifica os valores iniciais e o estado resultante após a aplicação do controlador
</critical>

<requirements>
- MUST implementar `simulador_planta.py` com função ou classe `SimuladorPlanta` que recebe `EstadoProcesso` e um delta de tempo e retorna novo `EstadoProcesso` com as variáveis atualizadas segundo dinâmica simplificada
- MUST o simulador deve implementar pelo menos: (1) P-101 ligada → FIT-101 sobe, nível tende a subir; (2) P-102 ligada → FIT-102 sobe, nível tende a cair; (3) operação contínua do filtro → DPIT-101 tende a subir gradualmente; (4) P-201 desligada → dosagem cai, pH pode sair da faixa ao longo do tempo
- MUST implementar `cenarios_simulacao.py` com função `obter_cenario(nome: str) -> EstadoProcesso` retornando o estado inicial de cada um dos 6 cenários definidos em specs.md seção 26: `operacao_normal`, `nivel_alto_alto`, `nivel_baixo_baixo`, `ph_fora_da_faixa`, `turbidez_alta`, `emergencia`
- MUST os valores dos cenários devem corresponder exatamente aos definidos em specs.md seção 26 (ex: operação normal: nível=70%, pH=7.2, turbidez=2 NTU, pressão=5 bar; nível alto-alto: nível=96%)
- MUST implementar `servico_simulacao.py` com classe `ServicoSimulacao` que: mantém o estado atual, aceita comandos `iniciar()`, `pausar()`, `reiniciar()`, executa o loop de atualização chamando simulador + controlador, expõe `estado_atual: EstadoProcesso` e `acoes_atuais: AcoesControle`
- MUST `ServicoSimulacao.reiniciar()` deve retornar ao cenário de operação normal
- MUST `ServicoSimulacao.aplicar_cenario(nome: str)` deve carregar um cenário e recalcular as ações
- MUST `ServicoSimulacao.alterar_variaveis(variaveis: dict)` deve atualizar campos específicos do estado e recalcular as ações
- MUST esta camada não deve importar de `api/` ou `aplicacao/`
</requirements>

## Subtasks

- [x] 4.1 Implementar `simulador_planta.py` com lógica de atualização temporal simplificada para os comportamentos definidos em specs.md seção 10.7
- [x] 4.2 Implementar `cenarios_simulacao.py` com os 6 cenários com valores exatos de specs.md seção 26
- [x] 4.3 Implementar `servico_simulacao.py` integrando `SimuladorPlanta` e `ControladorTratamentoAgua`, gerenciando ciclo de vida da simulação
- [x] 4.4 Escrever `backend/tests/test_simulador_planta.py` cobrindo a dinâmica temporal e os 6 cenários
- [x] 4.5 Verificar que cada cenário produz as ações esperadas quando passado pelo controlador

## Implementation Details

Todos os arquivos em `backend/src/automacao_industrial/simulacao/`. Ver specs.md seção 10.7 para exemplos de comportamento dinâmico. A dinâmica não precisa ser fisicamente precisa — deve ser plausível e didática. O `ServicoSimulacao` deve ser projetado para ser instanciado uma vez na aplicação (singleton ou instância única gerenciada pela factory em task_05). O loop de simulação pode usar threading ou asyncio — a decisão deve ser tomada considerando a integração com FastAPI (specs.md seção 10.3 sugere SSE ou polling).

### Relevant Files

- `.specs/specs.md` — seção 10.7 (comportamento dinâmico: bomba→nível), seção 26 (valores exatos dos 6 cenários), seção 10.3 (estratégia de atualização em tempo real)
- `.compozy/tasks/automacao-industrial-tratamento-agua/_prd.md` — seção F4 (cenários de demonstração com resultado esperado)
- `backend/src/automacao_industrial/dominio/estado_processo.py` — importado por todos os módulos de simulação
- `backend/src/automacao_industrial/controle/controlador_tratamento_agua.py` — usado por `ServicoSimulacao`
- `backend/src/automacao_industrial/simulacao/__init__.py` — criado em task_01

### Dependent Files

- `backend/src/automacao_industrial/api/rotas_planta.py` — task_05, usa `ServicoSimulacao` para todos os endpoints
- `backend/src/automacao_industrial/aplicacao/fabrica_aplicacao.py` — task_05, instancia `ServicoSimulacao`

### Related ADRs

- [ADR-001: Abordagem de produto — Simulador web acadêmico com backend Python e frontend React](adrs/adr-001.md) — A camada de simulação representa a dinâmica da planta que em um sistema real seria física real

## Deliverables

- `backend/src/automacao_industrial/simulacao/simulador_planta.py`
- `backend/src/automacao_industrial/simulacao/cenarios_simulacao.py`
- `backend/src/automacao_industrial/simulacao/servico_simulacao.py`
- `backend/tests/test_simulador_planta.py`
- Unit tests com 80%+ coverage **(REQUIRED)**
- Integration tests dos 6 cenários com resultado esperado **(REQUIRED)**

## Tests

- Unit tests:
  - [x] `obter_cenario("operacao_normal")` retorna estado com nível=70.0, pH=7.2, turbidez=2.0, pressão=5.0 (valores exatos de specs.md seção 26.1)
  - [x] `obter_cenario("nivel_alto_alto")` retorna estado com nível=96.0
  - [x] `obter_cenario("nivel_baixo_baixo")` retorna estado com nível=8.0
  - [x] `obter_cenario("ph_fora_da_faixa")` retorna estado com pH=9.1
  - [x] `obter_cenario("turbidez_alta")` retorna estado com turbidez=7.0
  - [x] `obter_cenario("emergencia")` retorna estado com `emergencia_acionada=True`
  - [x] `SimuladorPlanta.atualizar(estado_com_p101_ligada, dt)` retorna novo estado com nível maior que o anterior
  - [x] `SimuladorPlanta.atualizar(estado_com_p102_ligada_p101_desligada, dt)` retorna novo estado com nível menor que o anterior
- Integration tests:
  - [x] `ServicoSimulacao` com cenário `nivel_alto_alto` aplicado: `acoes_atuais` tem P-101 desligada e FV-101 fechada e alarme NIVEL_ALTO_ALTO presente
  - [x] `ServicoSimulacao` com cenário `emergencia` aplicado: `acoes_atuais` tem todas as bombas False e `processo_liberado=False`
  - [x] `ServicoSimulacao.reiniciar()` restaura estado de operação normal
  - [x] `ServicoSimulacao.alterar_variaveis({"ph": 9.1})` recalcula ações e bloqueia processo
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All tests passing
- Test coverage >=80%
- Todos os 6 cenários implementados com valores exatos de specs.md seção 26
- `ServicoSimulacao` expõe `iniciar`, `pausar`, `reiniciar`, `aplicar_cenario`, `alterar_variaveis`
- Loop temporal simplificado com pelo menos 4 comportamentos dinâmicos de specs.md seção 10.7
- Nenhum import de `api/` ou `aplicacao/` nos arquivos de simulação
