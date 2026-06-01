# Task Memory: task_03.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot

Implement the control layer: 10 pure rule functions, the Cause-Effect Matrix orchestrator, and the main controller. All with 100% test coverage.

## Important Decisions

- Rule functions return `AcoesControle | None`. For non-restricted bool pump fields, rules return `True` so the matrix AND-logic does not accidentally turn pumps off.
- Matrix consolidation uses: AND for pumps and `processo_liberado`, OR for `valvula_descarte_abrir`, min() for `abertura_valvula_entrada_percentual`, extend for alarms.
- Emergency returns immediately (before any loop), giving it absolute priority. Its result does NOT include NIVEL_ALTO_ALTO or other alarms.
- `regra_operacao_normal` checks ALL alarm conditions are absent; returns None when any condition violates limits.
- `regra_filtro_saturado` only generates an alarm — does not restrict actuators or block the process.

## Learnings

- ruff E501 applies to docstrings too — keep docstring lines ≤ 88 chars.
- ruff UP045 requires `X | None` instead of `Optional[X]` (no `from typing import Optional` needed in Python 3.11+).
- `# noqa: E501` inside docstring triple-quote strings is NOT recognized by ruff; must actually shorten the line.

## Files / Surfaces

- `backend/src/automacao_industrial/controle/regras_causa_efeito.py` — 10 pure rule functions
- `backend/src/automacao_industrial/controle/matriz_causa_efeito.py` — `avaliar()` orchestrator
- `backend/src/automacao_industrial/controle/controlador_tratamento_agua.py` — `ControladorTratamentoAgua.executar()`
- `backend/tests/test_matriz_causa_efeito.py` — 51 unit tests across all 10 rules + matrix
- `backend/tests/test_controlador_tratamento_agua.py` — 12 integration tests

## Errors / Corrections

- Initial draft used `Optional[AcoesControle]` and had lines > 88 chars. Fixed to use `AcoesControle | None` and shortened docstrings.

## Ready for Next Run

Task complete. All 63 new tests pass (103 total). Coverage: 100% on all controle module files. Linter: clean. No literal numbers in control layer files. No imports from simulacao/api/aplicacao.
