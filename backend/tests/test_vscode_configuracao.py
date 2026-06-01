"""Verifica as configuracoes de debug e tarefas do VS Code."""

import json
from pathlib import Path

RAIZ = Path(__file__).parent.parent.parent
VSCODE = RAIZ / ".vscode"


def carregar_json(caminho: Path):
    return json.loads(caminho.read_text(encoding="utf-8"))


def obter_configuracoes_debug():
    return carregar_json(VSCODE / "launch.json")["configurations"]


def test_arquivos_vscode_obrigatorios_existem():
    for nome_arquivo in [
        "launch.json",
        "tasks.json",
        "settings.json",
        "extensions.json",
    ]:
        assert (VSCODE / nome_arquivo).is_file()


def test_launch_json_tem_backend_e_frontend_validos():
    configuracoes = obter_configuracoes_debug()

    assert any("Backend" in config["name"] for config in configuracoes)
    assert any("Frontend" in config["name"] for config in configuracoes)


def test_debug_backend_usa_venv_e_nao_python_global():
    backend = next(
        config for config in obter_configuracoes_debug() if "Backend" in config["name"]
    )
    interpretador = backend.get("python") or backend.get("pythonPath")

    assert ".venv/bin/python" in interpretador
    assert "/usr/bin/python" not in interpretador
    assert backend["type"] == "debugpy"
    assert backend["request"] == "launch"
    assert backend["module"] == "uvicorn"
    assert backend["justMyCode"] is True


def test_debug_frontend_configura_vite_e_sourcemaps():
    frontend = next(
        config for config in obter_configuracoes_debug() if "Frontend" in config["name"]
    )

    assert frontend["type"] in {"chrome", "msedge"}
    assert frontend["url"] == "http://localhost:5173"
    assert frontend["webRoot"].endswith("/frontend/src")
    assert frontend["sourceMaps"] is True
    assert "sourceMapPathOverrides" in frontend


def test_tasks_json_tem_tarefas_obrigatorias():
    tarefas = carregar_json(VSCODE / "tasks.json")["tasks"]
    labels = {tarefa["label"] for tarefa in tarefas}

    assert {
        "Instalar deps backend",
        "Rodar backend",
        "Rodar testes backend",
        "Instalar deps frontend",
        "Rodar frontend (dev)",
        "Docker Compose up",
        "Docker Compose down",
    }.issubset(labels)


def test_settings_json_define_interpretador_da_venv():
    settings = carregar_json(VSCODE / "settings.json")

    assert settings["python.defaultInterpreterPath"].endswith(".venv/bin/python")
    assert settings["editor.formatOnSave"] is True


def test_extensions_json_recomenda_extensoes_obrigatorias():
    extensoes = carregar_json(VSCODE / "extensions.json")["recommendations"]

    assert "ms-python.python" in extensoes
    assert "ms-python.pylance" in extensoes
    assert "dbaeumer.vscode-eslint" in extensoes
    assert "esbenp.prettier-vscode" in extensoes
    assert "ms-vscode.vscode-typescript-next" in extensoes
