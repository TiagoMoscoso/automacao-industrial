"""Verifica os arquivos de execução via Docker Compose."""

from pathlib import Path

RAIZ = Path(__file__).parent.parent.parent


def test_dockerfile_backend_expoe_porta_8000():
    conteudo = (RAIZ / "backend" / "Dockerfile").read_text(encoding="utf-8")

    assert "EXPOSE 8000" in conteudo
    assert "python -m pip install ." in conteudo
    assert "automacao_industrial.api.app:app" in conteudo


def test_dockerfile_frontend_tem_estagios_build_e_serve():
    conteudo = (RAIZ / "frontend" / "Dockerfile").read_text(encoding="utf-8")

    assert "FROM node:20-alpine AS build" in conteudo
    assert "FROM nginx:1.27-alpine AS serve" in conteudo
    assert "npm run build" in conteudo
    assert "EXPOSE 80" in conteudo


def test_docker_compose_define_backend_frontend_e_portas():
    conteudo = (RAIZ / "docker-compose.yml").read_text(encoding="utf-8")

    assert "backend:" in conteudo
    assert "frontend:" in conteudo
    assert '"8000:8000"' in conteudo
    assert '"80:80"' in conteudo
    assert "depends_on:" in conteudo
    assert "rede_automacao" in conteudo


def test_docker_compose_dev_configura_hot_reload():
    conteudo = (RAIZ / "docker-compose.dev.yml").read_text(encoding="utf-8")

    assert "--reload" in conteudo
    assert '"5173:5173"' in conteudo
    assert "./backend:/app" in conteudo
    assert "./frontend:/app" in conteudo


def test_dockerignore_exclui_artefatos_obrigatorios():
    conteudo = (RAIZ / ".dockerignore").read_text(encoding="utf-8")

    for entrada in [
        ".venv/",
        "node_modules/",
        "__pycache__/",
        "*.pyc",
        ".git/",
        ".compozy/",
        ".specs/",
    ]:
        assert entrada in conteudo


def test_nginx_proxy_encaminha_api_para_backend():
    conteudo = (RAIZ / "frontend" / "nginx.conf").read_text(encoding="utf-8")

    assert "location /api/" in conteudo
    assert "proxy_pass http://backend:8000/api/;" in conteudo
