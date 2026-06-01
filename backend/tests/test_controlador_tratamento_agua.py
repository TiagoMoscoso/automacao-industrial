"""
Testes de integração para o ControladorTratamentoAgua.

Verifica o comportamento completo do controlador: desde a entrada do estado
da planta até as ações de controle resultantes, passando pela Matriz de
Causa e Efeito.
"""

from automacao_industrial.controle.controlador_tratamento_agua import (
    ControladorTratamentoAgua,
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


class TestControladorTratamentoAgua:
    def setup_method(self):
        self.controlador = ControladorTratamentoAgua()

    # --- Operação normal ---

    def test_operacao_normal_libera_processo_sem_alarmes(self):
        estado = _estado_normal()
        acoes = self.controlador.executar(estado)
        assert acoes.processo_liberado is True
        assert acoes.alarmes_ativos == []
        assert acoes.bomba_principal_ligar is True
        assert acoes.bomba_saida_ligar is True
        assert acoes.bomba_dosadora_ligar is True

    # --- Emergência ---

    def test_emergencia_desliga_todas_as_bombas(self):
        estado = _estado_normal()
        estado.emergencia_acionada = True
        acoes = self.controlador.executar(estado)
        assert acoes.bomba_principal_ligar is False
        assert acoes.bomba_saida_ligar is False
        assert acoes.bomba_dosadora_ligar is False

    def test_emergencia_bloqueia_processo(self):
        estado = _estado_normal()
        estado.emergencia_acionada = True
        acoes = self.controlador.executar(estado)
        assert acoes.processo_liberado is False

    def test_emergencia_gera_alarme_emergencia(self):
        estado = _estado_normal()
        estado.emergencia_acionada = True
        acoes = self.controlador.executar(estado)
        tipos = [a.tipo for a in acoes.alarmes_ativos]
        assert TipoAlarme.EMERGENCIA in tipos

    # --- Nível alto-alto ---

    def test_nivel_alto_alto_para_p101_e_fecha_fv101(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 96.0
        acoes = self.controlador.executar(estado)
        assert acoes.bomba_principal_ligar is False
        assert acoes.abertura_valvula_entrada_percentual == 0.0

    def test_nivel_alto_alto_nao_para_p102(self):
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 96.0
        acoes = self.controlador.executar(estado)
        assert acoes.bomba_saida_ligar is True

    # --- Turbidez alta ---

    def test_turbidez_alta_abre_descarte_e_bloqueia_processo(self):
        estado = _estado_normal()
        estado.turbidez_ntu = 7.0
        acoes = self.controlador.executar(estado)
        assert acoes.valvula_descarte_abrir is True
        assert acoes.processo_liberado is False

    # --- Múltiplas condições simultâneas ---

    def test_nivel_alto_e_ph_fora_aplica_ambos_os_efeitos(self):
        """Sem emergência ativa, nível alto-alto e pH fora da faixa juntos devem
        aplicar seus efeitos combinados: P-101 parada E processo bloqueado."""
        estado = _estado_normal()
        estado.nivel_tanque_percentual = 96.0
        estado.ph = 9.0
        acoes = self.controlador.executar(estado)
        assert acoes.bomba_principal_ligar is False
        assert acoes.processo_liberado is False
        tipos = [a.tipo for a in acoes.alarmes_ativos]
        assert TipoAlarme.NIVEL_ALTO_ALTO in tipos
        assert TipoAlarme.PH_FORA_DA_FAIXA in tipos

    # --- Falha dosadora ---

    def test_falha_dosadora_desliga_apenas_p201(self):
        estado = _estado_normal()
        estado.bomba_dosadora_em_falha = True
        acoes = self.controlador.executar(estado)
        assert acoes.bomba_dosadora_ligar is False
        assert acoes.bomba_principal_ligar is True
        assert acoes.bomba_saida_ligar is True

    # --- Condutividade alta ---

    def test_condutividade_alta_bloqueia_processo(self):
        estado = _estado_normal()
        estado.condutividade_us_cm = 1500.0
        acoes = self.controlador.executar(estado)
        assert acoes.processo_liberado is False
        tipos = [a.tipo for a in acoes.alarmes_ativos]
        assert TipoAlarme.CONDUTIVIDADE_ALTA in tipos

    # --- Prioridade da emergência ---

    def test_emergencia_tem_prioridade_sobre_nivel_alto(self):
        """Com emergência e nível alto-alto ativos, o resultado deve ser o da
        emergência (apenas alarme EMERGENCIA, não NIVEL_ALTO_ALTO)."""
        estado = _estado_normal()
        estado.emergencia_acionada = True
        estado.nivel_tanque_percentual = 96.0
        acoes = self.controlador.executar(estado)
        assert acoes.bomba_principal_ligar is False
        assert acoes.bomba_saida_ligar is False
        tipos = [a.tipo for a in acoes.alarmes_ativos]
        assert TipoAlarme.EMERGENCIA in tipos
        assert TipoAlarme.NIVEL_ALTO_ALTO not in tipos

    # --- Isolamento de camada ---

    def test_controlador_nao_importa_simulacao_nem_api(self):
        """A camada de controle não deve depender de simulacao, api ou aplicacao."""
        import ast
        from pathlib import Path

        caminho = (
            Path(__file__).parent.parent
            / "src"
            / "automacao_industrial"
            / "controle"
            / "controlador_tratamento_agua.py"
        )
        arvore = ast.parse(caminho.read_text(encoding="utf-8"))
        modulos: list[str] = []
        for no in ast.walk(arvore):
            if isinstance(no, ast.Import):
                for alias in no.names:
                    modulos.append(alias.name)
            elif isinstance(no, ast.ImportFrom) and no.module:
                modulos.append(no.module)

        camadas_proibidas = ("simulacao", "api", "aplicacao")
        for modulo in modulos:
            for camada in camadas_proibidas:
                assert camada not in modulo, (
                    f"controlador_tratamento_agua.py importa de '{camada}': {modulo}"
                )
