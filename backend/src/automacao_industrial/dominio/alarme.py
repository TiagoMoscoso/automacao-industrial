"""
Modelos de alarme da planta de tratamento de água.

Define os tipos de alarme possíveis e o registro imutável de um alarme ativo,
contendo tipo, mensagem descritiva e momento de ocorrência.
"""

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum


class TipoAlarme(Enum):
    """Categorias de alarme reconhecidas pela Matriz de Causa e Efeito."""

    NIVEL_ALTO_ALTO = "NIVEL_ALTO_ALTO"
    """Nível do tanque atingiu ou ultrapassou o limite alto-alto (≥ 95%)."""

    NIVEL_BAIXO_BAIXO = "NIVEL_BAIXO_BAIXO"
    """Nível do tanque caiu até ou abaixo do limite baixo-baixo (≤ 10%)."""

    PRESSAO_ALTA = "PRESSAO_ALTA"
    """Pressão da linha principal excedeu o limite seguro (> 8 bar)."""

    FILTRO_SATURADO = "FILTRO_SATURADO"
    """Pressão diferencial do filtro indica necessidade de manutenção (> 1,5 bar)."""

    PH_FORA_DA_FAIXA = "PH_FORA_DA_FAIXA"
    """pH fora da faixa operacional (< 6,5 ou > 8,5); saída para processo bloqueada."""

    TURBIDEZ_ALTA = "TURBIDEZ_ALTA"
    """Turbidez acima do limite aceitável (> 5 NTU); descarte aberto."""

    CONDUTIVIDADE_ALTA = "CONDUTIVIDADE_ALTA"
    """Condutividade acima do limite aceitável (> 1200 µS/cm); saída bloqueada."""

    FALHA_DOSADORA = "FALHA_DOSADORA"
    """Bomba dosadora em falha; operação automática bloqueada."""

    EMERGENCIA = "EMERGENCIA"
    """Emergência acionada manualmente; toda a planta é parada imediatamente."""


@dataclass(frozen=True)
class Alarme:
    """Registro imutável de um alarme ativo na planta."""

    tipo: TipoAlarme
    mensagem: str
    timestamp: datetime = field(default_factory=datetime.now)
