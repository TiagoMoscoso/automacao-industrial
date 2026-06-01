"""Verifica a documentação técnica exigida pela disciplina."""

import re
from pathlib import Path

RAIZ = Path(__file__).parent.parent.parent
DOCS = RAIZ / "docs"


def ler(caminho: Path) -> str:
    return caminho.read_text(encoding="utf-8")


def linhas_de_tabela(conteudo: str) -> list[str]:
    return [
        linha
        for linha in conteudo.splitlines()
        if linha.startswith("|") and not linha.startswith("|---")
    ]


def test_documentos_obrigatorios_existem():
    caminhos = [
        RAIZ / "README.md",
        DOCS / "pid-conceitual.md",
        DOCS / "lista-instrumentos.md",
        DOCS / "folha-dados-fit101.md",
        DOCS / "arquitetura-automacao.md",
        DOCS / "roteiro-apresentacao.md",
        DOCS / "verificacao-final.md",
    ]

    for caminho in caminhos:
        assert caminho.is_file(), f"Documento ausente: {caminho}"


def test_readme_contem_execucao_local_docker_e_vscode():
    conteudo = ler(RAIZ / "README.md")

    assert "Visão geral do projeto" in conteudo
    assert "Como executar localmente com `.venv`" in conteudo
    assert "Como executar via Docker Compose" in conteudo
    assert "Como depurar no VS Code" in conteudo
    assert "Estrutura do projeto" in conteudo
    assert "source .venv/bin/activate && pip install -e backend/[dev]" in conteudo
    assert "docker compose up --build" in conteudo
    assert ".venv" in conteudo


def test_lista_instrumentos_tem_dezesseis_instrumentos_e_fit101():
    conteudo = ler(DOCS / "lista-instrumentos.md")
    linhas = linhas_de_tabela(conteudo)
    linhas_de_dados = [linha for linha in linhas if not linha.startswith("| Tag ")]

    assert len(linhas_de_dados) >= 16
    assert "FIT-101" in conteudo


def test_folha_dados_fit101_tem_especificacoes_minimas():
    conteudo = ler(DOCS / "folha-dados-fit101.md")
    linhas = linhas_de_tabela(conteudo)
    linhas_de_dados = [linha for linha in linhas if not linha.startswith("| Item ")]

    assert len(linhas_de_dados) >= 14
    assert "4–20 mA" in conteudo
    assert "IP67" in conteudo


def test_arquitetura_contem_niveis_e_equivalencia():
    conteudo = ler(DOCS / "arquitetura-automacao.md")
    conteudo_minusculo = conteudo.lower()

    for termo in ["campo", "controle", "supervisão"]:
        assert termo in conteudo_minusculo

    assert "CLP" in conteudo
    assert "Backend Python" in conteudo
    assert "| Sistema real | Sistema simulado |" in conteudo


def test_pid_conceitual_contem_tags_industriais_principais():
    conteudo = ler(DOCS / "pid-conceitual.md")
    tags = [
        "FIT-101",
        "FIT-102",
        "LIT-101",
        "PIT-101",
        "DPIT-101",
        "TIT-101",
        "AIT-101",
        "AIT-102",
        "AIT-103",
        "FIT-201",
        "FV-101",
        "XV-101",
        "P-101",
        "P-102",
        "P-201",
        "VFD-101",
    ]

    for tag in tags:
        assert tag in conteudo


def test_roteiro_apresentacao_contem_pontos_obrigatorios():
    conteudo = ler(DOCS / "roteiro-apresentacao.md")

    assert "15 minutos" in conteudo
    assert "Matriz de Causa e Efeito" in conteudo
    assert "VS Code" in conteudo
    assert "breakpoint" in conteudo

    cenarios = [
        "Operação Normal",
        "Nível Alto-Alto",
        "Nível Baixo-Baixo",
        "pH Fora da Faixa",
        "Turbidez Alta",
        "Emergência",
    ]

    for cenario in cenarios:
        assert cenario in conteudo


def test_roteiro_apresentacao_soma_no_maximo_quinze_minutos():
    conteudo = ler(DOCS / "roteiro-apresentacao.md")
    intervalos = re.findall(r"\| (\d{2}):(\d{2})-(\d{2}):(\d{2}) \|", conteudo)

    duracao_total = sum(
        (int(fim_min) * 60 + int(fim_seg))
        - (int(inicio_min) * 60 + int(inicio_seg))
        for inicio_min, inicio_seg, fim_min, fim_seg in intervalos
    )

    assert intervalos
    assert duracao_total <= 15 * 60


def test_verificacao_final_contem_criterios_e_requisitos():
    conteudo = ler(DOCS / "verificacao-final.md")

    for numero in range(1, 18):
        assert f"Critério {numero:02d}" in conteudo

    termos_tecnicos = ["Docker Compose", ".venv", "VS Code"]
    requisitos_academicos = [
        "P&ID",
        "lista de instrumentos",
        "folha de dados",
        "arquitetura",
        "Matriz de Causa e Efeito",
    ]

    for termo in termos_tecnicos + requisitos_academicos:
        assert termo in conteudo


def test_verificacao_final_tem_dezessete_itens_de_checklist():
    conteudo = ler(DOCS / "verificacao-final.md")
    itens = re.findall(r"^- \[x\] \*\*Critério \d{2}\*\*", conteudo, re.MULTILINE)

    assert len(itens) == 17


def test_verificacao_final_marca_todos_criterios_como_ok():
    conteudo = ler(DOCS / "verificacao-final.md")
    status_ok = re.findall(r"\*\*Critério \d{2}\*\* — Status: ok\.", conteudo)

    assert len(status_ok) == 17
