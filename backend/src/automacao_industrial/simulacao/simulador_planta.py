"""
Simulador da dinâmica temporal simplificada da planta de tratamento de água.

Atualiza as variáveis de processo a cada ciclo com base no estado dos atuadores,
representando comportamentos plausíveis e didáticos descritos em specs.md §10.7.
Não simula física com precisão científica — o objetivo é demonstrar automação.
"""

import dataclasses

from automacao_industrial.dominio.estado_processo import EstadoProcesso

_TAXA_ENTRADA_NIVEL_PCT_S = 2.5
"""
Taxa máxima de subida do nível com P-101 ligada e FV-101 100% aberta (%/s).
Escolhida para que em operação normal (abertura 80%) o balanço de nível
fique próximo de zero: 2,5 × 0,8 = 2,0 = taxa de saída da P-102.
"""

_TAXA_SAIDA_NIVEL_PCT_S = 2.0
"""Taxa de queda do nível com P-102 ligada (%/s)."""

_TAXA_FOULING_FILTRO_BAR_S = 0.001
"""
Taxa de aumento da pressão diferencial do filtro F-101 com P-101 ligada (bar/s).
Representa o acúmulo gradual de sólidos no meio filtrante ao longo do tempo.
"""

_TAXA_DERIVA_PH_POR_S = 0.002
"""
Taxa de deriva do pH quando a bomba dosadora P-201 está desligada (pH/s).
Representa a tendência natural da água tratada de alterar o pH sem correção.
"""

_PH_SEM_DOSAGEM = 8.8
"""
Ponto de equilíbrio natural do pH sem dosagem química.
A água bruta desta planta tem tendência alcalina, ultrapassando o limite de 8,5.
"""

_VAZAO_ENTRADA_NOMINAL_M3H = 10.0
"""Vazão de entrada nominal com P-101 ligada e FV-101 100% aberta (m³/h)."""

_VAZAO_SAIDA_NOMINAL_M3H = 12.0
"""Vazão de saída nominal com P-102 ligada (m³/h)."""

_DOSAGEM_NOMINAL_L_H = 5.0
"""Vazão de dosagem química nominal com P-201 ligada (L/h)."""

_NIVEL_MINIMO_PCT = 0.0
_NIVEL_MAXIMO_PCT = 100.0
_PH_MINIMO = 0.0
_PH_MAXIMO = 14.0


class SimuladorPlanta:
    """
    Atualiza o estado da planta ao longo do tempo.

    Cada chamada a atualizar() avança a simulação dt segundos, aplicando
    as dinâmicas simplificadas definidas em specs.md seção 10.7.
    """

    def atualizar(self, estado: EstadoProcesso, dt: float) -> EstadoProcesso:
        """
        Retorna novo estado com variáveis atualizadas após dt segundos.

        Comportamentos implementados:
        1. P-101 ligada → FIT-101 sobe e nível tende a subir.
        2. P-102 ligada → FIT-102 sobe e nível tende a cair.
        3. Filtro em operação → DPIT-101 sobe gradualmente (fouling).
        4. P-201 desligada → dosagem cai e pH deriva para fora da faixa.
        """
        novo = dataclasses.replace(estado)

        # Comportamentos 1 e 2: balanço de nível pelas bombas e válvula
        delta_nivel = 0.0
        if novo.bomba_principal_ligada:
            fator_valvula = novo.abertura_valvula_entrada_percentual / 100.0
            delta_nivel += _TAXA_ENTRADA_NIVEL_PCT_S * fator_valvula * dt
            novo.vazao_entrada_m3h = _VAZAO_ENTRADA_NOMINAL_M3H * fator_valvula
        else:
            novo.vazao_entrada_m3h = 0.0

        if novo.bomba_saida_ligada:
            delta_nivel -= _TAXA_SAIDA_NIVEL_PCT_S * dt
            novo.vazao_saida_m3h = _VAZAO_SAIDA_NOMINAL_M3H
        else:
            novo.vazao_saida_m3h = 0.0

        novo.nivel_tanque_percentual = max(
            _NIVEL_MINIMO_PCT,
            min(_NIVEL_MAXIMO_PCT, novo.nivel_tanque_percentual + delta_nivel),
        )

        # Comportamento 3: filtro satura gradualmente enquanto P-101 bombeia
        if novo.bomba_principal_ligada:
            novo.pressao_diferencial_filtro_bar = min(
                5.0,
                novo.pressao_diferencial_filtro_bar + _TAXA_FOULING_FILTRO_BAR_S * dt,
            )

        # Comportamento 4: pH deriva quando dosadora desligada
        if not novo.bomba_dosadora_ligada:
            direcao = 1.0 if _PH_SEM_DOSAGEM > novo.ph else -1.0
            novo.ph = max(
                _PH_MINIMO,
                min(_PH_MAXIMO, novo.ph + direcao * _TAXA_DERIVA_PH_POR_S * dt),
            )
            novo.vazao_dosagem_l_h = 0.0
        else:
            novo.vazao_dosagem_l_h = _DOSAGEM_NOMINAL_L_H

        return novo
