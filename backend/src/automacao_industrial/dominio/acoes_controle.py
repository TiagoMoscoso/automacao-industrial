"""
Ações de controle calculadas pela Matriz de Causa e Efeito.

Dataclass que representa o resultado da avaliação das regras de intertravamento:
quais atuadores devem ser ligados/desligados, se o processo está liberado e
quais alarmes estão ativos neste ciclo de controle.
"""

from dataclasses import dataclass, field

from automacao_industrial.dominio.alarme import Alarme


@dataclass
class AcoesControle:
    """Resultado de um ciclo de avaliação da Matriz de Causa e Efeito."""

    bomba_principal_ligar: bool = False
    """Indica se P-101 deve ser mantida ligada neste ciclo."""

    bomba_saida_ligar: bool = False
    """Indica se P-102 deve ser mantida ligada neste ciclo."""

    bomba_dosadora_ligar: bool = False
    """Indica se P-201 deve ser mantida ligada neste ciclo."""

    abertura_valvula_entrada_percentual: float = 0.0
    """Posição comandada para FV-101 (0–100%)."""

    valvula_descarte_abrir: bool = False
    """Indica se XV-101 deve ser aberta neste ciclo."""

    processo_liberado: bool = True
    """Verdadeiro quando variáveis dentro dos limites e saída autorizada."""

    alarmes_ativos: list[Alarme] = field(default_factory=list)
    """Lista de alarmes gerados neste ciclo de avaliação."""
