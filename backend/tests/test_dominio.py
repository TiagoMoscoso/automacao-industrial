"""
Testes unitários e de integração para a camada de domínio do backend.

Verifica criação de instâncias, valores padrão, integridade dos modelos e
ausência de dependências indevidas com outras camadas.
"""

import ast
from datetime import datetime
from pathlib import Path

import pytest

from automacao_industrial.dominio.acoes_controle import AcoesControle
from automacao_industrial.dominio.alarme import Alarme, TipoAlarme
from automacao_industrial.dominio.estado_processo import EstadoProcesso
from automacao_industrial.dominio.limites_operacionais import LimitesOperacionais
from automacao_industrial.dominio.tags_instrumentos import TagsInstrumentos

DIRETORIO_DOMINIO = (
    Path(__file__).parent.parent / "src" / "automacao_industrial" / "dominio"
)

CAMADAS_PROIBIDAS = ("controle", "simulacao", "api", "aplicacao")


# ---------------------------------------------------------------------------
# EstadoProcesso
# ---------------------------------------------------------------------------


def test_estado_processo_instancia_com_campos_float_e_bool():
    estado = EstadoProcesso()

    campos_float = [
        "vazao_entrada_m3h",
        "vazao_saida_m3h",
        "nivel_tanque_percentual",
        "pressao_linha_bar",
        "pressao_diferencial_filtro_bar",
        "temperatura_agua_c",
        "ph",
        "turbidez_ntu",
        "condutividade_us_cm",
        "vazao_dosagem_l_h",
        "abertura_valvula_entrada_percentual",
    ]
    for campo in campos_float:
        valor = getattr(estado, campo)
        assert isinstance(valor, float), (
            f"Campo '{campo}' deveria ser float, mas é {type(valor)}"
        )

    campos_bool = [
        "bomba_principal_ligada",
        "bomba_saida_ligada",
        "bomba_dosadora_ligada",
        "valvula_descarte_aberta",
        "emergencia_acionada",
        "bomba_dosadora_em_falha",
    ]
    for campo in campos_bool:
        valor = getattr(estado, campo)
        assert isinstance(valor, bool), (
            f"Campo '{campo}' deveria ser bool, mas é {type(valor)}"
        )


def test_estado_processo_tem_todos_os_campos_de_processo():
    estado = EstadoProcesso()
    campos_esperados = [
        "vazao_entrada_m3h",
        "vazao_saida_m3h",
        "nivel_tanque_percentual",
        "pressao_linha_bar",
        "pressao_diferencial_filtro_bar",
        "temperatura_agua_c",
        "ph",
        "turbidez_ntu",
        "condutividade_us_cm",
        "vazao_dosagem_l_h",
    ]
    for campo in campos_esperados:
        assert hasattr(estado, campo), f"Campo ausente em EstadoProcesso: {campo}"


def test_estado_processo_tem_todos_os_campos_manipulados():
    estado = EstadoProcesso()
    campos_esperados = [
        "bomba_principal_ligada",
        "bomba_saida_ligada",
        "bomba_dosadora_ligada",
        "abertura_valvula_entrada_percentual",
        "valvula_descarte_aberta",
    ]
    for campo in campos_esperados:
        assert hasattr(estado, campo), f"Campo manipulado ausente: {campo}"


def test_estado_processo_tem_flags_de_estado():
    estado = EstadoProcesso()
    assert hasattr(estado, "emergencia_acionada")
    assert hasattr(estado, "bomba_dosadora_em_falha")
    assert estado.emergencia_acionada is False
    assert estado.bomba_dosadora_em_falha is False


def test_estado_processo_aceita_valores_personalizados():
    estado = EstadoProcesso(
        nivel_tanque_percentual=70.0,
        ph=7.2,
        turbidez_ntu=2.0,
        bomba_principal_ligada=True,
    )
    assert estado.nivel_tanque_percentual == 70.0
    assert estado.ph == 7.2
    assert estado.turbidez_ntu == 2.0
    assert estado.bomba_principal_ligada is True


# ---------------------------------------------------------------------------
# AcoesControle
# ---------------------------------------------------------------------------


def test_acoes_controle_processo_liberado_verdadeiro_por_padrao():
    acoes = AcoesControle()
    assert acoes.processo_liberado is True


def test_acoes_controle_lista_alarmes_vazia_por_padrao():
    acoes = AcoesControle()
    assert acoes.alarmes_ativos == []


def test_acoes_controle_listas_sao_independentes():
    """Cada instância deve ter sua própria lista de alarmes."""
    acoes1 = AcoesControle()
    acoes2 = AcoesControle()
    acoes1.alarmes_ativos.append(Alarme(tipo=TipoAlarme.EMERGENCIA, mensagem="teste"))
    assert len(acoes2.alarmes_ativos) == 0


def test_acoes_controle_campos_padrao_falso():
    acoes = AcoesControle()
    assert acoes.bomba_principal_ligar is False
    assert acoes.bomba_saida_ligar is False
    assert acoes.bomba_dosadora_ligar is False
    assert acoes.valvula_descarte_abrir is False
    assert acoes.abertura_valvula_entrada_percentual == 0.0


# ---------------------------------------------------------------------------
# TipoAlarme
# ---------------------------------------------------------------------------


def test_tipo_alarme_emergencia_e_membro_valido():
    assert TipoAlarme.EMERGENCIA in TipoAlarme


def test_tipo_alarme_todos_os_membros_existem():
    membros_esperados = [
        "NIVEL_ALTO_ALTO",
        "NIVEL_BAIXO_BAIXO",
        "PRESSAO_ALTA",
        "FILTRO_SATURADO",
        "PH_FORA_DA_FAIXA",
        "TURBIDEZ_ALTA",
        "CONDUTIVIDADE_ALTA",
        "FALHA_DOSADORA",
        "EMERGENCIA",
    ]
    nomes = [m.name for m in TipoAlarme]
    for membro in membros_esperados:
        assert membro in nomes, f"Membro ausente em TipoAlarme: {membro}"


# ---------------------------------------------------------------------------
# Alarme
# ---------------------------------------------------------------------------


def test_alarme_com_tipo_nivel_alto_alto_tem_mensagem_nao_vazia():
    alarme = Alarme(
        tipo=TipoAlarme.NIVEL_ALTO_ALTO,
        mensagem="Nível alto-alto: tanque acima de 95%",
    )
    assert alarme.mensagem != ""
    assert alarme.tipo == TipoAlarme.NIVEL_ALTO_ALTO


def test_alarme_timestamp_e_datetime():
    alarme = Alarme(tipo=TipoAlarme.EMERGENCIA, mensagem="Emergência acionada")
    assert isinstance(alarme.timestamp, datetime)


def test_alarme_e_imutavel():
    alarme = Alarme(tipo=TipoAlarme.PRESSAO_ALTA, mensagem="Pressão elevada")
    with pytest.raises(Exception):
        alarme.mensagem = "novo valor"  # type: ignore[misc]


# ---------------------------------------------------------------------------
# LimitesOperacionais
# ---------------------------------------------------------------------------


def test_limite_nivel_alto_alto():
    assert LimitesOperacionais.NIVEL_ALTO_ALTO == 95.0


def test_limite_nivel_baixo_baixo():
    assert LimitesOperacionais.NIVEL_BAIXO_BAIXO == 10.0


def test_limite_pressao_alta():
    assert LimitesOperacionais.PRESSAO_ALTA_BAR == 8.0


def test_limite_dpress_filtro():
    assert LimitesOperacionais.DPRESS_FILTRO_BAR == 1.5


def test_limite_ph_minimo_e_maximo():
    assert LimitesOperacionais.PH_MINIMO == 6.5
    assert LimitesOperacionais.PH_MAXIMO == 8.5


def test_limite_turbidez_maxima():
    assert LimitesOperacionais.TURBIDEZ_MAXIMA_NTU == 5.0


def test_limite_condutividade_maxima():
    assert LimitesOperacionais.CONDUTIVIDADE_MAXIMA_US_CM == 1200.0


# ---------------------------------------------------------------------------
# TagsInstrumentos
# ---------------------------------------------------------------------------


def test_tag_fit_101_valor_correto():
    assert TagsInstrumentos.FIT_101 == "FIT-101"


def test_todos_os_tags_de_processo_existem():
    tags_processo = [
        TagsInstrumentos.FIT_101,
        TagsInstrumentos.FIT_102,
        TagsInstrumentos.LIT_101,
        TagsInstrumentos.PIT_101,
        TagsInstrumentos.DPIT_101,
        TagsInstrumentos.TIT_101,
        TagsInstrumentos.AIT_101,
        TagsInstrumentos.AIT_102,
        TagsInstrumentos.AIT_103,
        TagsInstrumentos.FIT_201,
    ]
    assert len(tags_processo) == 10
    for tag in tags_processo:
        assert isinstance(tag, str) and tag != "", f"Tag inválida: {tag!r}"


def test_todos_os_16_tags_existem():
    todos = [
        TagsInstrumentos.FIT_101,
        TagsInstrumentos.FIT_102,
        TagsInstrumentos.LIT_101,
        TagsInstrumentos.PIT_101,
        TagsInstrumentos.DPIT_101,
        TagsInstrumentos.TIT_101,
        TagsInstrumentos.AIT_101,
        TagsInstrumentos.AIT_102,
        TagsInstrumentos.AIT_103,
        TagsInstrumentos.FIT_201,
        TagsInstrumentos.FV_101,
        TagsInstrumentos.XV_101,
        TagsInstrumentos.P_101,
        TagsInstrumentos.P_102,
        TagsInstrumentos.P_201,
        TagsInstrumentos.VFD_101,
    ]
    assert len(todos) == 16
    assert len(set(todos)) == 16, "Tags duplicadas detectadas"


def test_tags_formatados_com_hifen():
    """Tags industriais devem conter hífen, seguindo a convenção de P&ID."""
    tags = [
        TagsInstrumentos.FIT_101,
        TagsInstrumentos.LIT_101,
        TagsInstrumentos.PIT_101,
        TagsInstrumentos.AIT_101,
        TagsInstrumentos.P_101,
        TagsInstrumentos.FV_101,
    ]
    for tag in tags:
        assert "-" in tag, f"Tag sem hífen: {tag}"


# ---------------------------------------------------------------------------
# Integração — importações e isolamento de camada
# ---------------------------------------------------------------------------


def test_importacao_modulos_dominio_sem_erro():
    """Importar todos os módulos do domínio não deve lançar exceção."""
    from automacao_industrial.dominio import (  # noqa: F401
        acoes_controle,
        alarme,
        estado_processo,
        limites_operacionais,
        tags_instrumentos,
    )


def _coletar_imports_do_arquivo(caminho: Path) -> list[str]:
    """Retorna a lista de módulos importados em um arquivo Python."""
    arvore = ast.parse(caminho.read_text(encoding="utf-8"))
    modulos: list[str] = []
    for no in ast.walk(arvore):
        if isinstance(no, ast.Import):
            for alias in no.names:
                modulos.append(alias.name)
        elif isinstance(no, ast.ImportFrom):
            if no.module:
                modulos.append(no.module)
    return modulos


@pytest.mark.parametrize(
    "arquivo",
    [
        "limites_operacionais.py",
        "tags_instrumentos.py",
        "alarme.py",
        "estado_processo.py",
        "acoes_controle.py",
    ],
)
def test_modulo_dominio_nao_importa_camadas_superiores(arquivo: str):
    """Domínio não pode importar de controle, simulacao, api ou aplicacao."""
    caminho = DIRETORIO_DOMINIO / arquivo
    imports = _coletar_imports_do_arquivo(caminho)
    for modulo in imports:
        for camada_proibida in CAMADAS_PROIBIDAS:
            assert camada_proibida not in modulo, (
                f"{arquivo} importa da camada proibida '{camada_proibida}': {modulo}"
            )
