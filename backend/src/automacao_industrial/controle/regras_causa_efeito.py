"""
Regras de intertravamento da Matriz de Causa e Efeito.

Cada função recebe um EstadoProcesso e retorna AcoesControle | None:
- None se a condição da regra não se aplica ao estado atual.
- AcoesControle com os efeitos específicos da regra se a condição se aplica.

Campos não restringidos por uma regra são definidos como True (bombas) ou
100.0 (válvula de entrada) para que a lógica AND/min da matriz funcione
corretamente ao consolidar múltiplas regras ativas.

Referência: specs.md seção 23 e PRD seção F2.
"""

from automacao_industrial.dominio.acoes_controle import AcoesControle
from automacao_industrial.dominio.alarme import Alarme, TipoAlarme
from automacao_industrial.dominio.estado_processo import EstadoProcesso
from automacao_industrial.dominio.limites_operacionais import LimitesOperacionais


def regra_emergencia(estado: EstadoProcesso) -> AcoesControle | None:
    """Regra de máxima prioridade: para toda a planta ao acionar emergência."""
    if not estado.emergencia_acionada:
        return None
    return AcoesControle(
        bomba_principal_ligar=False,
        bomba_saida_ligar=False,
        bomba_dosadora_ligar=False,
        abertura_valvula_entrada_percentual=0.0,
        valvula_descarte_abrir=False,
        processo_liberado=False,
        alarmes_ativos=[
            Alarme(TipoAlarme.EMERGENCIA, "Emergência acionada: planta parada")
        ],
    )


def regra_nivel_alto_alto(estado: EstadoProcesso) -> AcoesControle | None:
    """Para P-101 e fecha FV-101 quando nível atingir ou ultrapassar 95%."""
    if estado.nivel_tanque_percentual < LimitesOperacionais.NIVEL_ALTO_ALTO:
        return None
    return AcoesControle(
        bomba_principal_ligar=False,
        bomba_saida_ligar=True,
        bomba_dosadora_ligar=True,
        abertura_valvula_entrada_percentual=0.0,
        valvula_descarte_abrir=False,
        processo_liberado=True,
        alarmes_ativos=[
            Alarme(
                TipoAlarme.NIVEL_ALTO_ALTO,
                "Nível alto-alto: P-101 parada e FV-101 fechada",
            )
        ],
    )


def regra_nivel_baixo_baixo(estado: EstadoProcesso) -> AcoesControle | None:
    """Para P-102 quando nível cair até ou abaixo de 10% para evitar cavitação."""
    if estado.nivel_tanque_percentual > LimitesOperacionais.NIVEL_BAIXO_BAIXO:
        return None
    return AcoesControle(
        bomba_principal_ligar=True,
        bomba_saida_ligar=False,
        bomba_dosadora_ligar=True,
        abertura_valvula_entrada_percentual=100.0,
        valvula_descarte_abrir=False,
        processo_liberado=True,
        alarmes_ativos=[
            Alarme(
                TipoAlarme.NIVEL_BAIXO_BAIXO,
                "Nível baixo-baixo: P-102 parada para evitar cavitação",
            )
        ],
    )


def regra_pressao_alta(estado: EstadoProcesso) -> AcoesControle | None:
    """Para P-101 quando pressão da linha exceder 8 bar."""
    if estado.pressao_linha_bar <= LimitesOperacionais.PRESSAO_ALTA_BAR:
        return None
    return AcoesControle(
        bomba_principal_ligar=False,
        bomba_saida_ligar=True,
        bomba_dosadora_ligar=True,
        abertura_valvula_entrada_percentual=100.0,
        valvula_descarte_abrir=False,
        processo_liberado=True,
        alarmes_ativos=[Alarme(TipoAlarme.PRESSAO_ALTA, "Pressão alta: P-101 parada")],
    )


def regra_filtro_saturado(estado: EstadoProcesso) -> AcoesControle | None:
    """Gera alarme de manutenção quando pressão diferencial exceder 1,5 bar."""
    if estado.pressao_diferencial_filtro_bar <= LimitesOperacionais.DPRESS_FILTRO_BAR:
        return None
    return AcoesControle(
        bomba_principal_ligar=True,
        bomba_saida_ligar=True,
        bomba_dosadora_ligar=True,
        abertura_valvula_entrada_percentual=100.0,
        valvula_descarte_abrir=False,
        processo_liberado=True,
        alarmes_ativos=[
            Alarme(TipoAlarme.FILTRO_SATURADO, "Filtro saturado: manutenção necessária")
        ],
    )


def regra_ph_fora_da_faixa(estado: EstadoProcesso) -> AcoesControle | None:
    """Bloqueia envio ao processo quando pH estiver fora da faixa 6,5–8,5."""
    if LimitesOperacionais.PH_MINIMO <= estado.ph <= LimitesOperacionais.PH_MAXIMO:
        return None
    return AcoesControle(
        bomba_principal_ligar=True,
        bomba_saida_ligar=True,
        bomba_dosadora_ligar=True,
        abertura_valvula_entrada_percentual=100.0,
        valvula_descarte_abrir=False,
        processo_liberado=False,
        alarmes_ativos=[
            Alarme(TipoAlarme.PH_FORA_DA_FAIXA, "pH fora da faixa: processo bloqueado")
        ],
    )


def regra_turbidez_alta(estado: EstadoProcesso) -> AcoesControle | None:
    """Bloqueia processo e abre XV-101 quando turbidez exceder 5 NTU."""
    if estado.turbidez_ntu <= LimitesOperacionais.TURBIDEZ_MAXIMA_NTU:
        return None
    return AcoesControle(
        bomba_principal_ligar=True,
        bomba_saida_ligar=True,
        bomba_dosadora_ligar=True,
        abertura_valvula_entrada_percentual=100.0,
        valvula_descarte_abrir=True,
        processo_liberado=False,
        alarmes_ativos=[
            Alarme(
                TipoAlarme.TURBIDEZ_ALTA,
                "Turbidez alta: descarte aberto e processo bloqueado",
            )
        ],
    )


def regra_condutividade_alta(estado: EstadoProcesso) -> AcoesControle | None:
    """Bloqueia envio ao processo quando condutividade exceder 1200 µS/cm."""
    if estado.condutividade_us_cm <= LimitesOperacionais.CONDUTIVIDADE_MAXIMA_US_CM:
        return None
    return AcoesControle(
        bomba_principal_ligar=True,
        bomba_saida_ligar=True,
        bomba_dosadora_ligar=True,
        abertura_valvula_entrada_percentual=100.0,
        valvula_descarte_abrir=False,
        processo_liberado=False,
        alarmes_ativos=[
            Alarme(
                TipoAlarme.CONDUTIVIDADE_ALTA, "Condutividade alta: processo bloqueado"
            )
        ],
    )


def regra_falha_dosadora(estado: EstadoProcesso) -> AcoesControle | None:
    """Desliga P-201 quando bomba dosadora estiver em falha."""
    if not estado.bomba_dosadora_em_falha:
        return None
    return AcoesControle(
        bomba_principal_ligar=True,
        bomba_saida_ligar=True,
        bomba_dosadora_ligar=False,
        abertura_valvula_entrada_percentual=100.0,
        valvula_descarte_abrir=False,
        processo_liberado=True,
        alarmes_ativos=[
            Alarme(
                TipoAlarme.FALHA_DOSADORA,
                "Falha na dosadora: operação automática bloqueada",
            )
        ],
    )


def regra_operacao_normal(estado: EstadoProcesso) -> AcoesControle | None:
    """Libera bombas, válvulas e processo quando variáveis estão dentro dos limites."""
    condicoes_normais = (
        not estado.emergencia_acionada
        and estado.nivel_tanque_percentual < LimitesOperacionais.NIVEL_ALTO_ALTO
        and estado.nivel_tanque_percentual > LimitesOperacionais.NIVEL_BAIXO_BAIXO
        and estado.pressao_linha_bar <= LimitesOperacionais.PRESSAO_ALTA_BAR
        and estado.pressao_diferencial_filtro_bar
        <= LimitesOperacionais.DPRESS_FILTRO_BAR
        and LimitesOperacionais.PH_MINIMO <= estado.ph <= LimitesOperacionais.PH_MAXIMO
        and estado.turbidez_ntu <= LimitesOperacionais.TURBIDEZ_MAXIMA_NTU
        and estado.condutividade_us_cm <= LimitesOperacionais.CONDUTIVIDADE_MAXIMA_US_CM
        and not estado.bomba_dosadora_em_falha
    )
    if not condicoes_normais:
        return None
    return AcoesControle(
        bomba_principal_ligar=True,
        bomba_saida_ligar=True,
        bomba_dosadora_ligar=True,
        abertura_valvula_entrada_percentual=100.0,
        valvula_descarte_abrir=False,
        processo_liberado=True,
        alarmes_ativos=[],
    )
