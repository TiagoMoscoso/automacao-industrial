"""
Cenários de demonstração da planta de tratamento de água.

Define os 6 cenários prontos para uso na apresentação, com valores exatos
conforme especificado em specs.md seção 26. Cada cenário configura o estado
inicial da planta para ilustrar um comportamento específico da Matriz de
Causa e Efeito ao ser passado pelo ControladorTratamentoAgua.
"""

import dataclasses
from collections.abc import Callable

from automacao_industrial.dominio.estado_processo import EstadoProcesso


def _estado_base_operacao_normal() -> EstadoProcesso:
    """Estado de operação normal: todas as variáveis dentro dos limites operacionais."""
    return EstadoProcesso(
        vazao_entrada_m3h=10.0,
        vazao_saida_m3h=8.0,
        nivel_tanque_percentual=70.0,
        pressao_linha_bar=5.0,
        pressao_diferencial_filtro_bar=0.5,
        temperatura_agua_c=22.0,
        ph=7.2,
        turbidez_ntu=2.0,
        condutividade_us_cm=850.0,
        vazao_dosagem_l_h=5.0,
        bomba_principal_ligada=True,
        bomba_saida_ligada=True,
        bomba_dosadora_ligada=True,
        abertura_valvula_entrada_percentual=80.0,
        valvula_descarte_aberta=False,
        emergencia_acionada=False,
        bomba_dosadora_em_falha=False,
    )


def _cenario_operacao_normal() -> EstadoProcesso:
    """Operação normal: nível 70%, pH 7,2, turbidez 2 NTU, pressão 5 bar. (§26.1)"""
    return _estado_base_operacao_normal()


def _cenario_nivel_alto_alto() -> EstadoProcesso:
    """Nível 96%: espera-se P-101 parada e FV-101 fechada. (§26.2)"""
    return dataclasses.replace(
        _estado_base_operacao_normal(), nivel_tanque_percentual=96.0
    )


def _cenario_nivel_baixo_baixo() -> EstadoProcesso:
    """Nível 8%: espera-se P-102 parada para evitar cavitação. (§26.3)"""
    return dataclasses.replace(
        _estado_base_operacao_normal(), nivel_tanque_percentual=8.0
    )


def _cenario_ph_fora_da_faixa() -> EstadoProcesso:
    """pH 9,1: espera-se processo bloqueado por pH alcalino. (§26.4)"""
    return dataclasses.replace(_estado_base_operacao_normal(), ph=9.1)


def _cenario_turbidez_alta() -> EstadoProcesso:
    """Turbidez 7 NTU: espera-se processo bloqueado e XV-101 aberta. (§26.5)"""
    return dataclasses.replace(_estado_base_operacao_normal(), turbidez_ntu=7.0)


def _cenario_emergencia() -> EstadoProcesso:
    """Emergência: espera-se parada imediata de toda a planta. (§26.6)"""
    return dataclasses.replace(_estado_base_operacao_normal(), emergencia_acionada=True)


_FABRICA_CENARIOS: dict[str, Callable[[], EstadoProcesso]] = {
    "operacao_normal": _cenario_operacao_normal,
    "nivel_alto_alto": _cenario_nivel_alto_alto,
    "nivel_baixo_baixo": _cenario_nivel_baixo_baixo,
    "ph_fora_da_faixa": _cenario_ph_fora_da_faixa,
    "turbidez_alta": _cenario_turbidez_alta,
    "emergencia": _cenario_emergencia,
}


def obter_cenario(nome: str) -> EstadoProcesso:
    """
    Retorna o estado inicial do cenário de demonstração solicitado.

    Os valores correspondem exatamente ao definido em specs.md seção 26.
    Cada chamada retorna uma nova instância independente do estado.

    Raises:
        KeyError: se o nome do cenário não for reconhecido.
    """
    if nome not in _FABRICA_CENARIOS:
        nomes_validos = ", ".join(_FABRICA_CENARIOS)
        raise KeyError(f"Cenário desconhecido: '{nome}'. Disponíveis: {nomes_validos}")
    return _FABRICA_CENARIOS[nome]()
