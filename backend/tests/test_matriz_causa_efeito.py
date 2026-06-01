"""
Testes unitários para as regras da Matriz de Causa e Efeito e para a função avaliar.

Cobre todas as 10 regras individualmente e valida a consolidação de múltiplas
regras ativas pela função avaliar.
"""

from automacao_industrial.controle.matriz_causa_efeito import avaliar
from automacao_industrial.controle.regras_causa_efeito import (
    regra_condutividade_alta,
    regra_emergencia,
    regra_falha_dosadora,
    regra_filtro_saturado,
    regra_nivel_alto_alto,
    regra_nivel_baixo_baixo,
    regra_operacao_normal,
    regra_ph_fora_da_faixa,
    regra_pressao_alta,
    regra_turbidez_alta,
)
from automacao_industrial.dominio.alarme import TipoAlarme
from automacao_industrial.dominio.estado_processo import EstadoProcesso


def _estado_normal() -> EstadoProcesso:
    """Estado de operação normal — todas as variáveis dentro dos limites."""
    return EstadoProcesso(
        nivel_tanque_percentual=70.0,
        pressao_linha_bar=5.0,
        pressao_diferencial_filtro_bar=0.5,
        ph=7.2,
        turbidez_ntu=2.0,
        condutividade_us_cm=850.0,
        emergencia_acionada=False,
        bomba_dosadora_em_falha=False,
    )


# ---------------------------------------------------------------------------
# regra_emergencia
# ---------------------------------------------------------------------------


class TestRegraEmergencia:
    def test_emergencia_acionada_desliga_todas_as_bombas(self):
        estado = _estado_normal()
        estado.emergencia_acionada = True
        resultado = regra_emergencia(estado)
        assert resultado is not None
        assert resultado.bomba_principal_ligar is False
        assert resultado.bomba_saida_ligar is False
        assert resultado.bomba_dosadora_ligar is False

    def test_emergencia_acionada_bloqueia_processo(self):
        estado = _estado_normal()
        estado.emergencia_acionada = True
        resultado = regra_emergencia(estado)
        assert resultado is not None
        assert resultado.processo_liberado is False

    def test_emergencia_acionada_gera_alarme_emergencia(self):
        estado = _estado_normal()
        estado.emergencia_acionada = True
        resultado = regra_emergencia(estado)
        assert resultado is not None
        tipos = [a.tipo for a in resultado.alarmes_ativos]
        assert TipoAlarme.EMERGENCIA in tipos

    def test_sem_emergencia_retorna_none(self):
        estado = _estado_normal()
        assert regra_emergencia(estado) is None


# ---------------------------------------------------------------------------
# regra_nivel_alto_alto
# ---------------------------------------------------------------------------


class TestRegraNivelAltoAlto:
    def test_nivel_96_retorna_p101_desligada_e_fv101_fechada(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 96.0
        resultado = regra_nivel_alto_alto(estado)
        assert resultado is not None
        assert resultado.bomba_principal_ligar is False
        assert resultado.abertura_valvula_entrada_percentual == 0.0

    def test_nivel_95_exato_dispara_regra(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 95.0
        resultado = regra_nivel_alto_alto(estado)
        assert resultado is not None
        assert resultado.bomba_principal_ligar is False

    def test_nivel_94_9_nao_dispara(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 94.9
        assert regra_nivel_alto_alto(estado) is None

    def test_nivel_alto_alto_nao_desliga_p102(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 96.0
        resultado = regra_nivel_alto_alto(estado)
        assert resultado is not None
        assert resultado.bomba_saida_ligar is True

    def test_nivel_alto_alto_gera_alarme(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 96.0
        resultado = regra_nivel_alto_alto(estado)
        assert resultado is not None
        tipos = [a.tipo for a in resultado.alarmes_ativos]
        assert TipoAlarme.NIVEL_ALTO_ALTO in tipos


# ---------------------------------------------------------------------------
# regra_nivel_baixo_baixo
# ---------------------------------------------------------------------------


class TestRegraNivelBaixoBaixo:
    def test_nivel_8_retorna_p102_desligada(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 8.0
        resultado = regra_nivel_baixo_baixo(estado)
        assert resultado is not None
        assert resultado.bomba_saida_ligar is False

    def test_nivel_10_exato_dispara_regra(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 10.0
        resultado = regra_nivel_baixo_baixo(estado)
        assert resultado is not None
        assert resultado.bomba_saida_ligar is False

    def test_nivel_10_1_nao_dispara(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 10.1
        assert regra_nivel_baixo_baixo(estado) is None

    def test_nivel_baixo_baixo_nao_desliga_p101(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 8.0
        resultado = regra_nivel_baixo_baixo(estado)
        assert resultado is not None
        assert resultado.bomba_principal_ligar is True

    def test_nivel_baixo_baixo_gera_alarme(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 8.0
        resultado = regra_nivel_baixo_baixo(estado)
        assert resultado is not None
        tipos = [a.tipo for a in resultado.alarmes_ativos]
        assert TipoAlarme.NIVEL_BAIXO_BAIXO in tipos


# ---------------------------------------------------------------------------
# regra_pressao_alta
# ---------------------------------------------------------------------------


class TestRegraPressaoAlta:
    def test_pressao_acima_de_8_desliga_p101(self):
        estado = _estado_normal()
        estado.pressao_linha_bar = 8.5
        resultado = regra_pressao_alta(estado)
        assert resultado is not None
        assert resultado.bomba_principal_ligar is False

    def test_pressao_8_exato_nao_dispara(self):
        estado = _estado_normal()
        estado.pressao_linha_bar = 8.0
        assert regra_pressao_alta(estado) is None

    def test_pressao_alta_gera_alarme(self):
        estado = _estado_normal()
        estado.pressao_linha_bar = 9.0
        resultado = regra_pressao_alta(estado)
        assert resultado is not None
        tipos = [a.tipo for a in resultado.alarmes_ativos]
        assert TipoAlarme.PRESSAO_ALTA in tipos

    def test_pressao_alta_nao_desliga_p102(self):
        estado = _estado_normal()
        estado.pressao_linha_bar = 9.0
        resultado = regra_pressao_alta(estado)
        assert resultado is not None
        assert resultado.bomba_saida_ligar is True


# ---------------------------------------------------------------------------
# regra_filtro_saturado
# ---------------------------------------------------------------------------


class TestRegraFiltroSaturado:
    def test_filtro_saturado_gera_alarme_manutencao(self):
        estado = _estado_normal()
        estado.pressao_diferencial_filtro_bar = 2.0
        resultado = regra_filtro_saturado(estado)
        assert resultado is not None
        tipos = [a.tipo for a in resultado.alarmes_ativos]
        assert TipoAlarme.FILTRO_SATURADO in tipos

    def test_filtro_no_limite_1_5_nao_dispara(self):
        estado = _estado_normal()
        estado.pressao_diferencial_filtro_bar = 1.5
        assert regra_filtro_saturado(estado) is None

    def test_filtro_saturado_nao_bloqueia_processo(self):
        estado = _estado_normal()
        estado.pressao_diferencial_filtro_bar = 2.0
        resultado = regra_filtro_saturado(estado)
        assert resultado is not None
        assert resultado.processo_liberado is True

    def test_filtro_saturado_nao_desliga_bombas(self):
        estado = _estado_normal()
        estado.pressao_diferencial_filtro_bar = 2.0
        resultado = regra_filtro_saturado(estado)
        assert resultado is not None
        assert resultado.bomba_principal_ligar is True
        assert resultado.bomba_saida_ligar is True


# ---------------------------------------------------------------------------
# regra_ph_fora_da_faixa
# ---------------------------------------------------------------------------


class TestRegraPhForaDaFaixa:
    def test_ph_alto_bloqueia_processo(self):
        estado = _estado_normal()
        estado.ph = 9.1
        resultado = regra_ph_fora_da_faixa(estado)
        assert resultado is not None
        assert resultado.processo_liberado is False

    def test_ph_alto_gera_alarme_ph(self):
        estado = _estado_normal()
        estado.ph = 9.1
        resultado = regra_ph_fora_da_faixa(estado)
        assert resultado is not None
        tipos = [a.tipo for a in resultado.alarmes_ativos]
        assert TipoAlarme.PH_FORA_DA_FAIXA in tipos

    def test_ph_baixo_bloqueia_processo(self):
        estado = _estado_normal()
        estado.ph = 6.4
        resultado = regra_ph_fora_da_faixa(estado)
        assert resultado is not None
        assert resultado.processo_liberado is False

    def test_ph_normal_retorna_none(self):
        estado = _estado_normal()
        estado.ph = 7.2
        assert regra_ph_fora_da_faixa(estado) is None

    def test_ph_no_limite_inferior_6_5_retorna_none(self):
        estado = _estado_normal()
        estado.ph = 6.5
        assert regra_ph_fora_da_faixa(estado) is None

    def test_ph_no_limite_superior_8_5_retorna_none(self):
        estado = _estado_normal()
        estado.ph = 8.5
        assert regra_ph_fora_da_faixa(estado) is None


# ---------------------------------------------------------------------------
# regra_turbidez_alta
# ---------------------------------------------------------------------------


class TestRegraTurbidezAlta:
    def test_turbidez_7_bloqueia_processo_e_abre_xv101(self):
        estado = _estado_normal()
        estado.turbidez_ntu = 7.0
        resultado = regra_turbidez_alta(estado)
        assert resultado is not None
        assert resultado.processo_liberado is False
        assert resultado.valvula_descarte_abrir is True

    def test_turbidez_alta_gera_alarme(self):
        estado = _estado_normal()
        estado.turbidez_ntu = 7.0
        resultado = regra_turbidez_alta(estado)
        assert resultado is not None
        tipos = [a.tipo for a in resultado.alarmes_ativos]
        assert TipoAlarme.TURBIDEZ_ALTA in tipos

    def test_turbidez_no_limite_5_nao_dispara(self):
        estado = _estado_normal()
        estado.turbidez_ntu = 5.0
        assert regra_turbidez_alta(estado) is None

    def test_turbidez_alta_nao_desliga_bombas(self):
        estado = _estado_normal()
        estado.turbidez_ntu = 7.0
        resultado = regra_turbidez_alta(estado)
        assert resultado is not None
        assert resultado.bomba_principal_ligar is True
        assert resultado.bomba_saida_ligar is True


# ---------------------------------------------------------------------------
# regra_condutividade_alta
# ---------------------------------------------------------------------------


class TestRegraCondutividadeAlta:
    def test_condutividade_1300_bloqueia_processo(self):
        estado = _estado_normal()
        estado.condutividade_us_cm = 1300.0
        resultado = regra_condutividade_alta(estado)
        assert resultado is not None
        assert resultado.processo_liberado is False

    def test_condutividade_alta_gera_alarme(self):
        estado = _estado_normal()
        estado.condutividade_us_cm = 1300.0
        resultado = regra_condutividade_alta(estado)
        assert resultado is not None
        tipos = [a.tipo for a in resultado.alarmes_ativos]
        assert TipoAlarme.CONDUTIVIDADE_ALTA in tipos

    def test_condutividade_no_limite_1200_nao_dispara(self):
        estado = _estado_normal()
        estado.condutividade_us_cm = 1200.0
        assert regra_condutividade_alta(estado) is None

    def test_condutividade_alta_nao_desliga_bombas(self):
        estado = _estado_normal()
        estado.condutividade_us_cm = 1300.0
        resultado = regra_condutividade_alta(estado)
        assert resultado is not None
        assert resultado.bomba_principal_ligar is True
        assert resultado.bomba_saida_ligar is True


# ---------------------------------------------------------------------------
# regra_falha_dosadora
# ---------------------------------------------------------------------------


class TestRegraFalhaDosadora:
    def test_falha_dosadora_desliga_p201(self):
        estado = _estado_normal()
        estado.bomba_dosadora_em_falha = True
        resultado = regra_falha_dosadora(estado)
        assert resultado is not None
        assert resultado.bomba_dosadora_ligar is False

    def test_falha_dosadora_gera_alarme(self):
        estado = _estado_normal()
        estado.bomba_dosadora_em_falha = True
        resultado = regra_falha_dosadora(estado)
        assert resultado is not None
        tipos = [a.tipo for a in resultado.alarmes_ativos]
        assert TipoAlarme.FALHA_DOSADORA in tipos

    def test_falha_dosadora_nao_desliga_p101_nem_p102(self):
        estado = _estado_normal()
        estado.bomba_dosadora_em_falha = True
        resultado = regra_falha_dosadora(estado)
        assert resultado is not None
        assert resultado.bomba_principal_ligar is True
        assert resultado.bomba_saida_ligar is True

    def test_sem_falha_retorna_none(self):
        estado = _estado_normal()
        assert regra_falha_dosadora(estado) is None


# ---------------------------------------------------------------------------
# regra_operacao_normal
# ---------------------------------------------------------------------------


class TestRegraOperacaoNormal:
    def test_variaveis_normais_libera_todas_bombas_e_processo(self):
        estado = _estado_normal()
        resultado = regra_operacao_normal(estado)
        assert resultado is not None
        assert resultado.bomba_principal_ligar is True
        assert resultado.bomba_saida_ligar is True
        assert resultado.bomba_dosadora_ligar is True
        assert resultado.processo_liberado is True
        assert resultado.alarmes_ativos == []

    def test_com_emergencia_retorna_none(self):
        estado = _estado_normal()
        estado.emergencia_acionada = True
        assert regra_operacao_normal(estado) is None

    def test_com_nivel_alto_alto_retorna_none(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 95.0
        assert regra_operacao_normal(estado) is None

    def test_com_nivel_baixo_baixo_retorna_none(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 10.0
        assert regra_operacao_normal(estado) is None

    def test_com_ph_fora_retorna_none(self):
        estado = _estado_normal()
        estado.ph = 9.0
        assert regra_operacao_normal(estado) is None

    def test_com_turbidez_alta_retorna_none(self):
        estado = _estado_normal()
        estado.turbidez_ntu = 6.0
        assert regra_operacao_normal(estado) is None

    def test_com_falha_dosadora_retorna_none(self):
        estado = _estado_normal()
        estado.bomba_dosadora_em_falha = True
        assert regra_operacao_normal(estado) is None


# ---------------------------------------------------------------------------
# avaliar — consolidação de múltiplas regras
# ---------------------------------------------------------------------------


class TestAvaliarMatriz:
    def test_estado_normal_processo_liberado_sem_alarmes(self):
        estado = _estado_normal()
        resultado = avaliar(estado)
        assert resultado.processo_liberado is True
        assert resultado.alarmes_ativos == []
        assert resultado.bomba_principal_ligar is True
        assert resultado.bomba_saida_ligar is True

    def test_emergencia_retorna_todas_bombas_desligadas(self):
        estado = _estado_normal()
        estado.emergencia_acionada = True
        resultado = avaliar(estado)
        assert resultado.bomba_principal_ligar is False
        assert resultado.bomba_saida_ligar is False
        assert resultado.bomba_dosadora_ligar is False
        assert resultado.processo_liberado is False

    def test_nivel_alto_e_ph_fora_aplica_ambos_efeitos(self):
        """Quando nivel alto-alto e pH fora da faixa ocorrem juntos, ambos os
        efeitos devem ser aplicados: P-101 desligada E processo bloqueado."""
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 96.0
        estado.ph = 9.0
        resultado = avaliar(estado)
        assert resultado.bomba_principal_ligar is False
        assert resultado.abertura_valvula_entrada_percentual == 0.0
        assert resultado.processo_liberado is False
        tipos = [a.tipo for a in resultado.alarmes_ativos]
        assert TipoAlarme.NIVEL_ALTO_ALTO in tipos
        assert TipoAlarme.PH_FORA_DA_FAIXA in tipos

    def test_filtro_saturado_apenas_gera_alarme_sem_parar_processo(self):
        estado = _estado_normal()
        estado.pressao_diferencial_filtro_bar = 2.0
        resultado = avaliar(estado)
        assert resultado.processo_liberado is True
        assert resultado.bomba_principal_ligar is True
        tipos = [a.tipo for a in resultado.alarmes_ativos]
        assert TipoAlarme.FILTRO_SATURADO in tipos
