"""
Limites operacionais da planta de tratamento de água.

Centraliza todas as constantes numéricas usadas pela Matriz de Causa e Efeito,
evitando números mágicos espalhados nas camadas de controle e simulação.
Referência: specs.md seção 23.
"""


class LimitesOperacionais:
    """Constantes de limite usadas nas regras de intertravamento da planta."""

    NIVEL_ALTO_ALTO: float = 95.0
    """Nível do tanque (%) que dispara parada de P-101 e fechamento de FV-101."""

    NIVEL_BAIXO_BAIXO: float = 10.0
    """Nível do tanque (%) abaixo do qual P-102 é parada para evitar cavitação."""

    PRESSAO_ALTA_BAR: float = 8.0
    """Pressão da linha (bar) acima da qual P-101 é parada e alarme é gerado."""

    DPRESS_FILTRO_BAR: float = 1.5
    """Pressão diferencial do filtro (bar) que dispara alarme de manutenção."""

    PH_MINIMO: float = 6.5
    """Valor mínimo de pH aceitável; abaixo desse valor o processo é bloqueado."""

    PH_MAXIMO: float = 8.5
    """Valor máximo de pH aceitável; acima desse valor o processo é bloqueado."""

    TURBIDEZ_MAXIMA_NTU: float = 5.0
    """Turbidez máxima (NTU); acima disso processo é bloqueado e descarte é aberto."""

    CONDUTIVIDADE_MAXIMA_US_CM: float = 1200.0
    """Condutividade máxima (µS/cm); acima disso o envio ao processo é bloqueado."""
