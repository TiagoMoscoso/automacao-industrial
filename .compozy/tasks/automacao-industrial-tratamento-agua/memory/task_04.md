# Task Memory: task_04.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot

Implement the simulation layer: `SimuladorPlanta`, `cenarios_simulacao`, `ServicoSimulacao`.
All 54 tests pass, 100% coverage across all simulation modules. COMPLETE.

## Important Decisions

- **`dataclasses.replace()` for copies**: `SimuladorPlanta.atualizar()` returns a new `EstadoProcesso`
  via `dataclasses.replace(estado)`. This preserves immutability of the input state.
- **`threading.Event` for loop control**: `ServicoSimulacao` uses `self._parar = threading.Event()`.
  The loop calls `_parar.wait(timeout=intervalo_s)` — returns True when paused (exits loop),
  False on timeout (continues). Cleaner than a bool flag.
- **Simulation rates balanced for normal operation**: `_TAXA_ENTRADA_NIVEL_PCT_S = 2.5`,
  `_TAXA_SAIDA_NIVEL_PCT_S = 2.0`. At 80% valve opening: 2.5 × 0.8 = 2.0 = drain rate.
  Normal operation (both pumps on, 80% valve) results in a roughly stable level.
- **pH drift target**: `_PH_SEM_DOSAGEM = 8.8` — above the 8.5 limit, so disabling P-201
  will eventually trigger the pH alarm.
- **`alterar_variaveis` type ignore**: `dataclasses.replace(self._estado_atual, **variaveis)`
  requires `# type: ignore[arg-type]` since mypy can't narrow `dict[str, object]`.
- **Scenario factory pattern**: `_FABRICA_CENARIOS: dict[str, Callable[[], EstadoProcesso]]`
  ensures each `obter_cenario()` call returns a fresh independent instance.

## Learnings

- `threading.Event.wait(timeout)` returns True if event was set, False on timeout.
  `while not self._parar.wait(timeout)` is the idiomatic pattern for a stoppable loop.
- `dataclasses.replace(estado, **variaveis)` raises `TypeError` on unknown field names —
  acceptable for this didactic tool; no extra validation needed.
- Simulation tests with threading: use `intervalo_s=0.05` and `time.sleep(0.2–0.4)` in tests
  for reliable thread behavior without making the suite slow.

## Files / Surfaces

- `backend/src/automacao_industrial/simulacao/simulador_planta.py`
- `backend/src/automacao_industrial/simulacao/cenarios_simulacao.py`
- `backend/src/automacao_industrial/simulacao/servico_simulacao.py`
- `backend/tests/test_simulador_planta.py`

## Errors / Corrections

- ruff E501: docstring in `_executar_loop` was 89 chars; shortened to fit ≤ 88.
- ruff I001: import block in test file needed `ruff --fix` to sort correctly.

## Ready for Next Run

Task 05 (API layer) can import `ServicoSimulacao` as a singleton:
```python
from automacao_industrial.simulacao.servico_simulacao import ServicoSimulacao
```
Use `servico.aplicar_cenario(nome)`, `servico.alterar_variaveis(variaveis)`,
`servico.iniciar()`, `servico.pausar()`, `servico.reiniciar()`,
`servico.estado_atual`, `servico.acoes_atuais`.
