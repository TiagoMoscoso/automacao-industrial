"""
Testes da camada de simulação: cenários, dinâmica temporal e serviço integrado.

Cobre o SimuladorPlanta (dinâmica temporal), os 6 cenários de demonstração
e o ServicoSimulacao (ciclo de vida e integração com o controlador).
"""

import time

import pytest

from automacao_industrial.dominio.alarme import TipoAlarme
from automacao_industrial.dominio.estado_processo import EstadoProcesso
from automacao_industrial.simulacao.cenarios_simulacao import obter_cenario
from automacao_industrial.simulacao.servico_simulacao import (
    ServicoSimulacao,
)
from automacao_industrial.simulacao.simulador_planta import SimuladorPlanta

# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------


def _estado_normal() -> EstadoProcesso:
    """Estado de referência: operação normal dentro dos limites operacionais."""
    return EstadoProcesso(
        nivel_tanque_percentual=70.0,
        pressao_linha_bar=5.0,
        pressao_diferencial_filtro_bar=0.5,
        ph=7.2,
        turbidez_ntu=2.0,
        condutividade_us_cm=850.0,
        bomba_principal_ligada=True,
        bomba_saida_ligada=True,
        bomba_dosadora_ligada=True,
        abertura_valvula_entrada_percentual=80.0,
        emergencia_acionada=False,
        bomba_dosadora_em_falha=False,
    )


# ---------------------------------------------------------------------------
# TestCenariosSimulacao — valores exatos de specs.md §26
# ---------------------------------------------------------------------------


class TestCenariosSimulacao:
    def test_operacao_normal_nivel_70(self):
        estado = obter_cenario("operacao_normal")
        assert estado.nivel_tanque_percentual == 70.0

    def test_operacao_normal_ph_7_2(self):
        estado = obter_cenario("operacao_normal")
        assert estado.ph == 7.2

    def test_operacao_normal_turbidez_2(self):
        estado = obter_cenario("operacao_normal")
        assert estado.turbidez_ntu == 2.0

    def test_operacao_normal_pressao_5(self):
        estado = obter_cenario("operacao_normal")
        assert estado.pressao_linha_bar == 5.0

    def test_operacao_normal_condutividade_850(self):
        estado = obter_cenario("operacao_normal")
        assert estado.condutividade_us_cm == 850.0

    def test_operacao_normal_sem_emergencia(self):
        estado = obter_cenario("operacao_normal")
        assert estado.emergencia_acionada is False

    def test_nivel_alto_alto_nivel_96(self):
        estado = obter_cenario("nivel_alto_alto")
        assert estado.nivel_tanque_percentual == 96.0

    def test_nivel_baixo_baixo_nivel_8(self):
        estado = obter_cenario("nivel_baixo_baixo")
        assert estado.nivel_tanque_percentual == 8.0

    def test_ph_fora_da_faixa_ph_9_1(self):
        estado = obter_cenario("ph_fora_da_faixa")
        assert estado.ph == 9.1

    def test_turbidez_alta_turbidez_7(self):
        estado = obter_cenario("turbidez_alta")
        assert estado.turbidez_ntu == 7.0

    def test_emergencia_flag_acionada(self):
        estado = obter_cenario("emergencia")
        assert estado.emergencia_acionada is True

    def test_cenario_invalido_lanca_key_error(self):
        with pytest.raises(KeyError, match="desconhecido"):
            obter_cenario("cenario_que_nao_existe")

    def test_cada_chamada_retorna_instancia_independente(self):
        """Garante que múltiplas chamadas retornam objetos distintos, não o mesmo."""
        a = obter_cenario("operacao_normal")
        b = obter_cenario("operacao_normal")
        assert a is not b

    def test_nivel_alto_alto_outras_variaveis_normais(self):
        """Cenário nivel_alto_alto mantém pH normal para que só o nível dispare."""
        estado = obter_cenario("nivel_alto_alto")
        assert estado.ph == 7.2
        assert estado.turbidez_ntu == 2.0


# ---------------------------------------------------------------------------
# TestSimuladorPlanta — dinâmica temporal (specs.md §10.7)
# ---------------------------------------------------------------------------


class TestSimuladorPlanta:
    def setup_method(self):
        self.simulador = SimuladorPlanta()

    # Comportamento 1: P-101 ligada → nível sobe

    def test_p101_ligada_nivel_sobe(self):
        estado = _estado_normal()
        estado.bomba_saida_ligada = False
        nivel_antes = estado.nivel_tanque_percentual
        novo = self.simulador.atualizar(estado, dt=1.0)
        assert novo.nivel_tanque_percentual > nivel_antes

    def test_p101_ligada_vazao_entrada_positiva(self):
        estado = _estado_normal()
        estado.bomba_saida_ligada = False
        novo = self.simulador.atualizar(estado, dt=1.0)
        assert novo.vazao_entrada_m3h > 0.0

    def test_p101_desligada_vazao_entrada_zero(self):
        estado = _estado_normal()
        estado.bomba_principal_ligada = False
        novo = self.simulador.atualizar(estado, dt=1.0)
        assert novo.vazao_entrada_m3h == 0.0

    def test_valvula_fechada_reduz_entrada(self):
        """Válvula parcialmente fechada reduz a taxa de entrada em relação a 100%."""
        estado_80pct = _estado_normal()
        estado_80pct.bomba_saida_ligada = False
        estado_80pct.abertura_valvula_entrada_percentual = 80.0

        estado_100pct = _estado_normal()
        estado_100pct.bomba_saida_ligada = False
        estado_100pct.abertura_valvula_entrada_percentual = 100.0

        novo_80 = self.simulador.atualizar(estado_80pct, dt=1.0)
        novo_100 = self.simulador.atualizar(estado_100pct, dt=1.0)
        assert novo_80.nivel_tanque_percentual < novo_100.nivel_tanque_percentual

    # Comportamento 2: P-102 ligada → nível cai

    def test_p102_ligada_p101_desligada_nivel_cai(self):
        estado = _estado_normal()
        estado.bomba_principal_ligada = False
        nivel_antes = estado.nivel_tanque_percentual
        novo = self.simulador.atualizar(estado, dt=1.0)
        assert novo.nivel_tanque_percentual < nivel_antes

    def test_p102_ligada_vazao_saida_positiva(self):
        estado = _estado_normal()
        novo = self.simulador.atualizar(estado, dt=1.0)
        assert novo.vazao_saida_m3h > 0.0

    def test_p102_desligada_vazao_saida_zero(self):
        estado = _estado_normal()
        estado.bomba_saida_ligada = False
        novo = self.simulador.atualizar(estado, dt=1.0)
        assert novo.vazao_saida_m3h == 0.0

    # Comportamento 3: filtro satura gradualmente

    def test_p101_ligada_dpit_sobe_gradualmente(self):
        estado = _estado_normal()
        dpit_antes = estado.pressao_diferencial_filtro_bar
        novo = self.simulador.atualizar(estado, dt=1.0)
        assert novo.pressao_diferencial_filtro_bar > dpit_antes

    def test_p101_desligada_dpit_nao_sobe(self):
        """Sem fluxo de P-101, o filtro não acumula mais sólidos no ciclo."""
        estado = _estado_normal()
        estado.bomba_principal_ligada = False
        dpit_antes = estado.pressao_diferencial_filtro_bar
        novo = self.simulador.atualizar(estado, dt=1.0)
        assert novo.pressao_diferencial_filtro_bar == dpit_antes

    def test_dpit_nao_ultrapassa_limite_fisico(self):
        """Pressão diferencial tem teto de 5 bar para evitar valores absurdos."""
        estado = _estado_normal()
        estado.pressao_diferencial_filtro_bar = 4.999
        novo = self.simulador.atualizar(estado, dt=1000.0)
        assert novo.pressao_diferencial_filtro_bar <= 5.0

    # Comportamento 4: pH deriva quando dosadora está desligada

    def test_p201_desligada_ph_deriva(self):
        estado = _estado_normal()
        estado.bomba_dosadora_ligada = False
        ph_antes = estado.ph
        novo = self.simulador.atualizar(estado, dt=1.0)
        assert novo.ph != ph_antes

    def test_p201_desligada_dosagem_zero(self):
        estado = _estado_normal()
        estado.bomba_dosadora_ligada = False
        novo = self.simulador.atualizar(estado, dt=1.0)
        assert novo.vazao_dosagem_l_h == 0.0

    def test_p201_ligada_dosagem_nominal(self):
        estado = _estado_normal()
        novo = self.simulador.atualizar(estado, dt=1.0)
        assert novo.vazao_dosagem_l_h > 0.0

    def test_ph_não_ultrapassa_limite_fisico(self):
        """pH fica dentro dos limites físicos mesmo com deriva prolongada."""
        estado = _estado_normal()
        estado.bomba_dosadora_ligada = False
        estado.ph = 13.9
        novo = self.simulador.atualizar(estado, dt=10000.0)
        assert 0.0 <= novo.ph <= 14.0

    # Garantia de imutabilidade do estado original

    def test_atualizar_nao_modifica_estado_original(self):
        estado = _estado_normal()
        nivel_original = estado.nivel_tanque_percentual
        self.simulador.atualizar(estado, dt=1.0)
        assert estado.nivel_tanque_percentual == nivel_original

    # Limites do nível (clamping)

    def test_nivel_nao_excede_100_pct(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 99.9
        estado.bomba_saida_ligada = False
        novo = self.simulador.atualizar(estado, dt=100.0)
        assert novo.nivel_tanque_percentual <= 100.0

    def test_nivel_nao_cai_abaixo_0_pct(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 0.1
        estado.bomba_principal_ligada = False
        novo = self.simulador.atualizar(estado, dt=100.0)
        assert novo.nivel_tanque_percentual >= 0.0


# ---------------------------------------------------------------------------
# TestServicoSimulacao — integração com controlador e ciclo de vida
# ---------------------------------------------------------------------------


class TestServicoSimulacao:
    def setup_method(self):
        self.servico = ServicoSimulacao()

    # --- Cenário: nivel_alto_alto ---

    def test_nivel_alto_alto_p101_desligada(self):
        self.servico.aplicar_cenario("nivel_alto_alto")
        assert self.servico.acoes_atuais.bomba_principal_ligar is False

    def test_nivel_alto_alto_fv101_fechada(self):
        self.servico.aplicar_cenario("nivel_alto_alto")
        assert self.servico.acoes_atuais.abertura_valvula_entrada_percentual == 0.0

    def test_nivel_alto_alto_gera_alarme(self):
        self.servico.aplicar_cenario("nivel_alto_alto")
        tipos = [a.tipo for a in self.servico.acoes_atuais.alarmes_ativos]
        assert TipoAlarme.NIVEL_ALTO_ALTO in tipos

    # --- Cenário: emergencia ---

    def test_emergencia_desliga_todas_as_bombas(self):
        self.servico.aplicar_cenario("emergencia")
        acoes = self.servico.acoes_atuais
        assert acoes.bomba_principal_ligar is False
        assert acoes.bomba_saida_ligar is False
        assert acoes.bomba_dosadora_ligar is False

    def test_emergencia_bloqueia_processo(self):
        self.servico.aplicar_cenario("emergencia")
        assert self.servico.acoes_atuais.processo_liberado is False

    # --- reiniciar() restaura estado normal ---

    def test_reiniciar_restaura_nivel_normal(self):
        self.servico.aplicar_cenario("nivel_alto_alto")
        self.servico.reiniciar()
        assert self.servico.estado_atual.nivel_tanque_percentual == 70.0

    def test_reiniciar_libera_processo(self):
        self.servico.aplicar_cenario("emergencia")
        self.servico.reiniciar()
        assert self.servico.acoes_atuais.processo_liberado is True

    def test_reiniciar_sem_alarmes_ativos(self):
        self.servico.aplicar_cenario("nivel_alto_alto")
        self.servico.reiniciar()
        assert self.servico.acoes_atuais.alarmes_ativos == []

    # --- alterar_variaveis() recalcula ações ---

    def test_alterar_ph_para_fora_da_faixa_bloqueia_processo(self):
        self.servico.alterar_variaveis({"ph": 9.1})
        assert self.servico.acoes_atuais.processo_liberado is False

    def test_alterar_ph_para_dentro_da_faixa_libera_processo(self):
        self.servico.alterar_variaveis({"ph": 9.1})
        self.servico.alterar_variaveis({"ph": 7.0})
        assert self.servico.acoes_atuais.processo_liberado is True

    def test_alterar_turbidez_alta_abre_descarte(self):
        self.servico.alterar_variaveis({"turbidez_ntu": 7.0})
        assert self.servico.acoes_atuais.valvula_descarte_abrir is True

    def test_alterar_nivel_alto_alto_para_p101(self):
        self.servico.alterar_variaveis({"nivel_tanque_percentual": 96.0})
        assert self.servico.acoes_atuais.bomba_principal_ligar is False

    # --- Ciclo de vida: iniciar, pausar, reiniciar ---

    def test_iniciar_ativa_loop(self):
        servico = ServicoSimulacao(intervalo_s=0.05)
        assert not servico.em_execucao
        servico.iniciar()
        assert servico.em_execucao
        servico.pausar()

    def test_iniciar_quando_ja_em_execucao_e_no_op(self):
        """Segunda chamada a iniciar() não deve lançar exceção nem criar thread nova."""
        servico = ServicoSimulacao(intervalo_s=0.05)
        servico.iniciar()
        thread_original = servico._thread
        servico.iniciar()  # deve ser no-op
        assert servico._thread is thread_original
        servico.pausar()

    def test_pausar_encerra_loop(self):
        servico = ServicoSimulacao(intervalo_s=0.05)
        servico.iniciar()
        servico.pausar()
        time.sleep(0.2)
        assert not servico.em_execucao

    def test_loop_atualiza_nivel_ao_longo_do_tempo(self):
        """Com P-101 on e P-102 off, loop deve aumentar o nível ao longo do tempo."""
        servico = ServicoSimulacao(intervalo_s=0.05)
        servico.alterar_variaveis({"bomba_saida_ligada": False})
        nivel_inicial = servico.estado_atual.nivel_tanque_percentual
        servico.iniciar()
        time.sleep(0.4)
        servico.pausar()
        assert servico.estado_atual.nivel_tanque_percentual > nivel_inicial

    def test_estado_atual_retorna_copia(self):
        """Modificar a cópia retornada por estado_atual não afeta o estado interno."""
        estado = self.servico.estado_atual
        estado.nivel_tanque_percentual = 999.0
        assert self.servico.estado_atual.nivel_tanque_percentual != 999.0

    def test_aplicar_cenario_invalido_lanca_key_error(self):
        with pytest.raises(KeyError):
            self.servico.aplicar_cenario("cenario_que_nao_existe")

    # --- Verificação dos outros cenários ---

    def test_nivel_baixo_baixo_desliga_p102(self):
        self.servico.aplicar_cenario("nivel_baixo_baixo")
        assert self.servico.acoes_atuais.bomba_saida_ligar is False

    def test_turbidez_alta_bloqueia_processo(self):
        self.servico.aplicar_cenario("turbidez_alta")
        assert self.servico.acoes_atuais.processo_liberado is False

    def test_turbidez_alta_abre_valvula_descarte(self):
        self.servico.aplicar_cenario("turbidez_alta")
        assert self.servico.acoes_atuais.valvula_descarte_abrir is True

    def test_ph_fora_da_faixa_bloqueia_processo(self):
        self.servico.aplicar_cenario("ph_fora_da_faixa")
        assert self.servico.acoes_atuais.processo_liberado is False

    def test_operacao_normal_processo_liberado_sem_alarmes(self):
        self.servico.aplicar_cenario("operacao_normal")
        acoes = self.servico.acoes_atuais
        assert acoes.processo_liberado is True
        assert acoes.alarmes_ativos == []
