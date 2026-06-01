---
status: completed
title: Camada de domínio do backend
type: backend
complexity: medium
dependencies:
  - task_01
---

# Task 2: Camada de domínio do backend

## Overview

Implementa os cinco módulos da camada de domínio do backend: modelos de estado da planta, ações de controle, alarmes, limites operacionais e tags de instrumentos. Esta camada representa os conceitos centrais da planta — sem ela, as camadas de controle e simulação não têm com o que operar.

<critical>
- ALWAYS READ o PRD (F1, F2) e specs.md seções 10.5, 18, 23 antes de começar
- REFERENCE specs.md para os 10 tags de processo, 5 variáveis manipuladas, 10 regras da matriz e limites operacionais exatos
- FOCUS ON "WHAT" — definir os modelos de dados do domínio, não a lógica de controle
- MINIMIZE CODE — esta camada é só modelos; nenhum if de negócio aqui
- TESTS REQUIRED — testes de criação, valores padrão e validação de modelos
</critical>

<requirements>
- MUST implementar `estado_processo.py` como dataclass com todos os 10 campos de variáveis de processo (FIT-101, FIT-102, LIT-101, PIT-101, DPIT-101, TIT-101, AIT-101, AIT-102, AIT-103, FIT-201) e 5 variáveis manipuladas (P-101, P-102, P-201, FV-101, XV-101) mais flag `emergencia_acionada` e `bomba_dosadora_em_falha`
- MUST implementar `acoes_controle.py` como dataclass com campos para estado de cada bomba/válvula, `processo_liberado: bool` e lista de alarmes ativos
- MUST implementar `alarme.py` com enum de tipos de alarme (NIVEL_ALTO_ALTO, NIVEL_BAIXO_BAIXO, PRESSAO_ALTA, FILTRO_SATURADO, PH_FORA_DA_FAIXA, TURBIDEZ_ALTA, CONDUTIVIDADE_ALTA, FALHA_DOSADORA, EMERGENCIA) e dataclass de alarme com tipo, mensagem e timestamp
- MUST implementar `limites_operacionais.py` com todas as constantes numéricas dos limites usados na Matriz de Causa e Efeito (specs.md seção 23): NIVEL_ALTO_ALTO=95.0, NIVEL_BAIXO_BAIXO=10.0, PRESSAO_ALTA_BAR=8.0, DPRESS_FILTRO_BAR=1.5, PH_MINIMO=6.5, PH_MAXIMO=8.5, TURBIDEZ_MAXIMA_NTU=5.0, CONDUTIVIDADE_MAXIMA_US_CM=1200.0
- MUST implementar `tags_instrumentos.py` com constantes string para todos os 16 tags da lista de instrumentos (specs.md seção 20): FIT_101, FIT_102, LIT_101, PIT_101, DPIT_101, TIT_101, AIT_101, AIT_102, AIT_103, FIT_201, FV_101, XV_101, P_101, P_102, P_201, VFD_101
- MUST usar type hints completos em todos os campos
- MUST usar nomes em português do Brasil (exceto tags industriais)
- SHOULD usar `@dataclass` ou `dataclass(frozen=True)` para modelos imutáveis onde cabível
- MUST esta camada não deve importar nada de `controle/`, `simulacao/`, `api/` ou `aplicacao/`
</requirements>

## Subtasks

- [x] 2.1 Implementar `limites_operacionais.py` com todas as constantes numéricas dos limites operacionais da matriz
- [x] 2.2 Implementar `tags_instrumentos.py` com constantes string de todos os 16 tags industriais
- [x] 2.3 Implementar `alarme.py` com enum de tipos e dataclass de alarme (tipo + mensagem + timestamp)
- [x] 2.4 Implementar `estado_processo.py` com dataclass cobrindo todas as variáveis de processo, manipuladas e flags de estado
- [x] 2.5 Implementar `acoes_controle.py` com dataclass de resultado de controle (bombas, válvulas, processo liberado, alarmes)
- [x] 2.6 Escrever testes unitários para criação de instâncias, valores padrão e integridade dos modelos

## Implementation Details

Todos os arquivos em `backend/src/automacao_industrial/dominio/`. Ver specs.md seção 10.5 para a responsabilidade da camada e seção 18 para a lista completa de variáveis. Os limites em `limites_operacionais.py` são os mesmos usados em toda a Matriz de Causa e Efeito (specs.md seção 23) — centralizá-los aqui evita números mágicos espalhados no código.

### Relevant Files

- `.specs/specs.md` — seções 10.5 (responsabilidade do domínio), 18.1 (variáveis de processo), 18.2 (variáveis manipuladas), 20 (lista de instrumentos), 23 (Matriz de Causa e Efeito com limites exatos)
- `.compozy/tasks/automacao-industrial-tratamento-agua/_prd.md` — seção F1 (lista de variáveis) e F2 (regras da matriz)
- `backend/src/automacao_industrial/dominio/__init__.py` — criado em task_01

### Dependent Files

- `backend/src/automacao_industrial/controle/regras_causa_efeito.py` — task_03, importa `EstadoProcesso`, `AcoesControle`, `LimitesOperacionais`, `TipoAlarme`
- `backend/src/automacao_industrial/controle/matriz_causa_efeito.py` — task_03, importa do domínio
- `backend/src/automacao_industrial/simulacao/simulador_planta.py` — task_04, importa `EstadoProcesso`
- `backend/src/automacao_industrial/api/esquemas.py` — task_05, espelha `EstadoProcesso` em Pydantic
- `backend/tests/test_matriz_causa_efeito.py` — task_03, usa modelos desta task

### Related ADRs

- [ADR-001: Abordagem de produto — Simulador web acadêmico com backend Python e frontend React](adrs/adr-001.md) — Decisão de usar Python com camadas separadas (domínio, controle, simulação, API)

## Deliverables

- `backend/src/automacao_industrial/dominio/estado_processo.py`
- `backend/src/automacao_industrial/dominio/acoes_controle.py`
- `backend/src/automacao_industrial/dominio/alarme.py`
- `backend/src/automacao_industrial/dominio/limites_operacionais.py`
- `backend/src/automacao_industrial/dominio/tags_instrumentos.py`
- `backend/tests/test_dominio.py` com testes unitários
- Unit tests com 80%+ coverage **(REQUIRED)**
- Integration tests de importação entre módulos do domínio **(REQUIRED)**

## Tests

- Unit tests:
  - [x] `EstadoProcesso()` cria instância com todos os campos no tipo correto (float para variáveis contínuas, bool para discretas)
  - [x] `AcoesControle()` cria instância com `processo_liberado=True` por padrão e lista de alarmes vazia
  - [x] `TipoAlarme.EMERGENCIA` é membro válido do enum
  - [x] `LimitesOperacionais.NIVEL_ALTO_ALTO` é `95.0` (verificar valor exato conforme specs.md)
  - [x] `LimitesOperacionais.PH_MINIMO` é `6.5` e `LimitesOperacionais.PH_MAXIMO` é `8.5`
  - [x] `TagsInstrumentos.FIT_101` é a string `"FIT-101"`
  - [x] Todos os 10 tags de processo existem em `TagsInstrumentos`
  - [x] Alarme criado com tipo `TipoAlarme.NIVEL_ALTO_ALTO` tem mensagem não vazia
- Integration tests:
  - [x] `from automacao_industrial.dominio import estado_processo, alarme, acoes_controle, limites_operacionais, tags_instrumentos` importa sem erro
  - [x] Nenhum módulo do domínio importa de `controle/`, `simulacao/`, `api/` ou `aplicacao/`
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All tests passing
- Test coverage >=80%
- Todos os 5 módulos do domínio criados nos caminhos corretos
- Nenhum número mágico de limite operacional fora de `limites_operacionais.py`
- Nenhum import de camadas superiores nos módulos de domínio
- Type hints completos em todos os campos dos modelos
- Nomes 100% em português do Brasil (exceto tags industriais e palavras reservadas)
