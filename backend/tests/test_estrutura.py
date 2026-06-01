"""
Verifica que a estrutura do monorepo e os arquivos de configuração foram criados
corretamente. Esses testes inspecionam o sistema de arquivos e o conteúdo dos
arquivos de configuração sem depender de lógica de negócio.
"""

import json
import tomllib
from pathlib import Path

RAIZ = Path(__file__).parent.parent.parent


def test_diretorios_pacotes_python_existem():
    base = RAIZ / "backend" / "src" / "automacao_industrial"
    pacotes = ["dominio", "controle", "simulacao", "api", "aplicacao"]
    for pacote in pacotes:
        assert (base / pacote).is_dir(), f"Diretório do pacote ausente: {pacote}"


def test_init_py_existem_em_todos_os_pacotes():
    base = RAIZ / "backend" / "src" / "automacao_industrial"
    pacotes = ["", "dominio", "controle", "simulacao", "api", "aplicacao"]
    for pacote in pacotes:
        caminho = base / pacote / "__init__.py"
        assert caminho.exists(), f"__init__.py ausente em: {base / pacote}"


def test_pyproject_toml_e_valido_e_completo():
    caminho = RAIZ / "backend" / "pyproject.toml"
    assert caminho.exists(), "backend/pyproject.toml não encontrado"
    with open(caminho, "rb") as f:
        dados = tomllib.load(f)
    assert "project" in dados, "Chave [project] ausente no pyproject.toml"
    assert "tool" in dados, "Seção [tool] ausente no pyproject.toml"
    assert "ruff" in dados["tool"], "Seção [tool.ruff] ausente no pyproject.toml"
    assert "pytest" in dados["tool"], "Seção [tool.pytest] ausente"
    assert "ini_options" in dados["tool"]["pytest"], (
        "Seção [tool.pytest.ini_options] ausente"
    )


def test_pyproject_toml_contem_dependencias_obrigatorias():
    caminho = RAIZ / "backend" / "pyproject.toml"
    with open(caminho, "rb") as f:
        dados = tomllib.load(f)
    deps = " ".join(dados["project"].get("dependencies", []))
    assert "fastapi" in deps, "fastapi não declarado em dependencies"
    assert "uvicorn" in deps, "uvicorn não declarado em dependencies"
    assert "pydantic" in deps, "pydantic não declarado em dependencies"


def test_package_json_contém_scripts_obrigatorios():
    caminho = RAIZ / "frontend" / "package.json"
    assert caminho.exists(), "frontend/package.json não encontrado"
    with open(caminho, encoding="utf-8") as f:
        dados = json.load(f)
    scripts = dados.get("scripts", {})
    for script in ["dev", "build", "preview", "lint"]:
        assert script in scripts, f"Script '{script}' ausente em package.json"


def test_vite_config_contem_proxy_api():
    caminho = RAIZ / "frontend" / "vite.config.ts"
    assert caminho.exists(), "frontend/vite.config.ts não encontrado"
    conteudo = caminho.read_text(encoding="utf-8")
    assert "/api" in conteudo, "Proxy '/api' não configurado em vite.config.ts"
    assert "localhost:8000" in conteudo, (
        "Target localhost:8000 não configurado no proxy"
    )


def test_gitignore_existe_na_raiz():
    caminho = RAIZ / ".gitignore"
    assert caminho.exists(), ".gitignore não encontrado na raiz"
    conteudo = caminho.read_text(encoding="utf-8")
    for entrada in [".venv/", "node_modules/", "__pycache__/", "*.pyc", ".env"]:
        assert entrada in conteudo, f"Entrada '{entrada}' ausente no .gitignore"


def test_diretorios_monorepo_existem():
    for diretorio in ["backend", "frontend", "docs", ".vscode", ".tasks"]:
        assert (RAIZ / diretorio).is_dir(), f"Diretório '{diretorio}' ausente"


def test_venv_existe():
    assert (RAIZ / ".venv").is_dir(), ".venv não encontrada na raiz"
    python = RAIZ / ".venv" / "bin" / "python"
    assert python.exists(), "Python não encontrado em .venv/bin/python"
