"""
Estado atual da planta de tratamento de água.

Dataclass que reúne todas as variáveis de processo (medidas pelos instrumentos de
campo) e as variáveis manipuladas (estado dos atuadores), além de flags de estado
operacional. É o objeto central trocado entre as camadas de simulação e controle.
Referência: specs.md seções 18.1 e 18.2.
"""

from dataclasses import dataclass


@dataclass
class EstadoProcesso:
    """Estado instantâneo de todas as variáveis da planta."""

    # --- Variáveis de processo (medidas pelos instrumentos) ---

    vazao_entrada_m3h: float = 0.0
    """FIT-101 — Vazão de entrada de água bruta (m³/h)."""

    vazao_saida_m3h: float = 0.0
    """FIT-102 — Vazão de saída para o processo (m³/h)."""

    nivel_tanque_percentual: float = 0.0
    """LIT-101 — Nível do tanque de água tratada (%)."""

    pressao_linha_bar: float = 0.0
    """PIT-101 — Pressão da linha principal (bar)."""

    pressao_diferencial_filtro_bar: float = 0.0
    """DPIT-101 — Pressão diferencial do filtro F-101 (bar)."""

    temperatura_agua_c: float = 0.0
    """TIT-101 — Temperatura da água (°C)."""

    ph: float = 7.0
    """AIT-101 — pH da água tratada."""

    turbidez_ntu: float = 0.0
    """AIT-102 — Turbidez da água (NTU)."""

    condutividade_us_cm: float = 0.0
    """AIT-103 — Condutividade da água (µS/cm)."""

    vazao_dosagem_l_h: float = 0.0
    """FIT-201 — Vazão de dosagem química (L/h)."""

    # --- Variáveis manipuladas (estado dos atuadores) ---

    bomba_principal_ligada: bool = False
    """P-101 — Estado da bomba principal (liga/desliga)."""

    bomba_saida_ligada: bool = False
    """P-102 — Estado da bomba de saída (liga/desliga)."""

    bomba_dosadora_ligada: bool = False
    """P-201 — Estado da bomba dosadora (liga/desliga)."""

    abertura_valvula_entrada_percentual: float = 0.0
    """FV-101 — Abertura da válvula de entrada (0–100%)."""

    valvula_descarte_aberta: bool = False
    """XV-101 — Estado da válvula de descarte (abre/fecha)."""

    # --- Flags de estado operacional ---

    emergencia_acionada: bool = False
    """Indica que a parada de emergência foi acionada manualmente."""

    bomba_dosadora_em_falha: bool = False
    """Indica falha na bomba dosadora P-201, que bloqueia a operação automática."""
