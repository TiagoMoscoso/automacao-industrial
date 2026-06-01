"""
Matriz de Causa e Efeito — orquestração das regras de intertravamento.

Avalia as 10 regras em ordem de prioridade e consolida os efeitos:
- emergência tem prioridade absoluta e retorna imediatamente;
- as demais regras são avaliadas em paralelo e seus efeitos são combinados
  usando AND para bombas e processo_liberado, OR para valvula_descarte_abrir
  e min() para abertura_valvula_entrada_percentual.

Referência: specs.md seção 23 e seção 10.6.
"""

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
from automacao_industrial.dominio.acoes_controle import AcoesControle
from automacao_industrial.dominio.alarme import Alarme
from automacao_industrial.dominio.estado_processo import EstadoProcesso

_REGRAS_PRIORIZADAS = [
    regra_nivel_alto_alto,
    regra_nivel_baixo_baixo,
    regra_pressao_alta,
    regra_turbidez_alta,
    regra_ph_fora_da_faixa,
    regra_condutividade_alta,
    regra_falha_dosadora,
    regra_filtro_saturado,
    regra_operacao_normal,
]


def avaliar(estado: EstadoProcesso) -> AcoesControle:
    """Avalia as regras em ordem de prioridade e retorna as ações consolidadas."""
    resultado_emergencia = regra_emergencia(estado)
    if resultado_emergencia is not None:
        return resultado_emergencia

    bomba_principal = True
    bomba_saida = True
    bomba_dosadora = True
    abertura_valvula = 100.0
    valvula_descarte = False
    processo_liberado = True
    alarmes: list[Alarme] = []

    for regra in _REGRAS_PRIORIZADAS:
        resultado = regra(estado)
        if resultado is not None:
            bomba_principal = bomba_principal and resultado.bomba_principal_ligar
            bomba_saida = bomba_saida and resultado.bomba_saida_ligar
            bomba_dosadora = bomba_dosadora and resultado.bomba_dosadora_ligar
            abertura_valvula = min(
                abertura_valvula, resultado.abertura_valvula_entrada_percentual
            )
            valvula_descarte = valvula_descarte or resultado.valvula_descarte_abrir
            processo_liberado = processo_liberado and resultado.processo_liberado
            alarmes.extend(resultado.alarmes_ativos)

    return AcoesControle(
        bomba_principal_ligar=bomba_principal,
        bomba_saida_ligar=bomba_saida,
        bomba_dosadora_ligar=bomba_dosadora,
        abertura_valvula_entrada_percentual=abertura_valvula,
        valvula_descarte_abrir=valvula_descarte,
        processo_liberado=processo_liberado,
        alarmes_ativos=alarmes,
    )
