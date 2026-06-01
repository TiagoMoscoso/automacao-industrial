"""Testes de integração da API HTTP da planta."""

import pytest
from httpx import ASGITransport, AsyncClient

from automacao_industrial.api.app import app as app_padrao
from automacao_industrial.aplicacao.fabrica_aplicacao import criar_aplicacao


@pytest.fixture
def anyio_backend() -> str:
    """Executa os testes assíncronos apenas no backend asyncio."""
    return "asyncio"


@pytest.fixture
def app():
    """Aplicação FastAPI nova para cada teste, com estado isolado."""
    return criar_aplicacao()


@pytest.fixture
async def cliente(app):
    """Cliente HTTP em memória, sem subir servidor real."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as cliente:
        yield cliente


@pytest.mark.anyio
async def test_get_saude_retorna_ok(cliente):
    resposta = await cliente.get("/api/saude")

    assert resposta.status_code == 200
    assert resposta.json() == {"status": "ok"}


@pytest.mark.anyio
async def test_get_estado_retorna_estado_completo(cliente):
    resposta = await cliente.get("/api/planta/estado")

    assert resposta.status_code == 200
    corpo = resposta.json()
    assert corpo["nivel_tanque_percentual"] == 70.0
    assert "alarmes_ativos" in corpo


@pytest.mark.anyio
async def test_post_iniciar_retorna_status_200(cliente):
    resposta = await cliente.post("/api/planta/iniciar")

    assert resposta.status_code == 200
    assert resposta.json()["em_execucao"] is True

    await cliente.post("/api/planta/pausar")


@pytest.mark.anyio
async def test_post_pausar_retorna_status_200(cliente):
    await cliente.post("/api/planta/iniciar")
    resposta = await cliente.post("/api/planta/pausar")

    assert resposta.status_code == 200
    assert "em_execucao" in resposta.json()


@pytest.mark.anyio
async def test_post_reiniciar_retorna_estado_de_operacao_normal(cliente):
    await cliente.post("/api/planta/cenarios/emergencia")
    resposta = await cliente.post("/api/planta/reiniciar")

    assert resposta.status_code == 200
    corpo = resposta.json()
    assert corpo["nivel_tanque_percentual"] == 70.0
    assert corpo["processo_liberado"] is True
    assert corpo["alarmes_ativos"] == []


@pytest.mark.anyio
async def test_post_variaveis_com_ph_alcalino_bloqueia_processo(cliente):
    resposta = await cliente.post("/api/planta/variaveis", json={"ph": 9.1})

    assert resposta.status_code == 200
    corpo = resposta.json()
    assert corpo["ph"] == 9.1
    assert corpo["processo_liberado"] is False


@pytest.mark.anyio
async def test_post_cenario_nivel_alto_alto_retorna_estado_esperado(cliente):
    resposta = await cliente.post("/api/planta/cenarios/nivel_alto_alto")

    assert resposta.status_code == 200
    corpo = resposta.json()
    assert corpo["nivel_tanque_percentual"] == 96.0
    assert corpo["bomba_principal_ligar"] is False


@pytest.mark.anyio
async def test_post_cenario_inexistente_retorna_404(cliente):
    resposta = await cliente.post("/api/planta/cenarios/cenario_inexistente")

    assert resposta.status_code == 404
    assert resposta.json()["detail"] == "Cenário não encontrado"


@pytest.mark.anyio
async def test_post_variaveis_com_campo_invalido_retorna_422(cliente):
    resposta = await cliente.post(
        "/api/planta/variaveis",
        json={"campo_invalido": 1},
    )

    assert resposta.status_code == 422


@pytest.mark.anyio
async def test_get_estado_apos_cenario_emergencia_retorna_bloqueio(cliente):
    await cliente.post("/api/planta/cenarios/emergencia")
    resposta = await cliente.get("/api/planta/estado")

    assert resposta.status_code == 200
    corpo = resposta.json()
    assert corpo["emergencia_acionada"] is True
    assert corpo["processo_liberado"] is False


@pytest.mark.anyio
async def test_reiniciar_apos_emergencia_restaura_processo(cliente):
    await cliente.post("/api/planta/cenarios/emergencia")
    resposta = await cliente.post("/api/planta/reiniciar")

    assert resposta.status_code == 200
    assert resposta.json()["processo_liberado"] is True


@pytest.mark.anyio
async def test_get_estado_retorna_cors_para_frontend(cliente):
    resposta = await cliente.get(
        "/api/planta/estado",
        headers={"Origin": "http://localhost:5173"},
    )

    assert resposta.status_code == 200
    assert resposta.headers["access-control-allow-origin"] == "*"


@pytest.mark.anyio
async def test_documentacao_fastapi_esta_acessivel():
    transport = ASGITransport(app=app_padrao)
    async with AsyncClient(transport=transport, base_url="http://test") as cliente:
        resposta = await cliente.get("/docs")

    assert resposta.status_code == 200
