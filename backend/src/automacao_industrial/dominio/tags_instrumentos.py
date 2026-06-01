"""
Tags industriais dos instrumentos da planta de tratamento de água.

Centraliza as strings de identificação dos 16 instrumentos do P&ID,
garantindo consistência entre camadas sem depender de strings literais espalhadas.
Referência: specs.md seção 20.
"""


class TagsInstrumentos:
    """Constantes de tag para todos os instrumentos do P&ID."""

    # Variáveis de processo
    FIT_101: str = "FIT-101"
    """Transmissor de vazão de entrada de água bruta."""

    FIT_102: str = "FIT-102"
    """Transmissor de vazão de saída para o processo."""

    LIT_101: str = "LIT-101"
    """Transmissor de nível do tanque T-101."""

    PIT_101: str = "PIT-101"
    """Transmissor de pressão da linha principal."""

    DPIT_101: str = "DPIT-101"
    """Transmissor de pressão diferencial do filtro F-101."""

    TIT_101: str = "TIT-101"
    """Transmissor de temperatura da água."""

    AIT_101: str = "AIT-101"
    """Analisador de pH da água tratada."""

    AIT_102: str = "AIT-102"
    """Analisador de turbidez da água."""

    AIT_103: str = "AIT-103"
    """Analisador de condutividade da água."""

    FIT_201: str = "FIT-201"
    """Transmissor de vazão de dosagem química."""

    # Variáveis manipuladas
    FV_101: str = "FV-101"
    """Válvula de controle de entrada de água bruta."""

    XV_101: str = "XV-101"
    """Válvula on/off de descarte de água fora de especificação."""

    P_101: str = "P-101"
    """Bomba principal — bombeia água para o filtro."""

    P_102: str = "P-102"
    """Bomba de saída — envia água tratada ao processo."""

    P_201: str = "P-201"
    """Bomba dosadora — injeta produto químico."""

    VFD_101: str = "VFD-101"
    """Inversor de frequência — controla a velocidade de P-101."""
