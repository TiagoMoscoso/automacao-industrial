"""
Esquemas Pydantic para request e response da API da planta.

Define os contratos HTTP de entrada e saída, separando os modelos de domínio
interno dos modelos de serialização. Referência: specs.md §10.8.
"""

import dataclasses
from typing import Any, Self

from pydantic import BaseModel, RootModel, model_validator

from automacao_industrial.dominio.acoes_controle import AcoesControle
from automacao_industrial.dominio.estado_processo import EstadoProcesso

_CAMPOS_ESTADO = frozenset(f.name for f in dataclasses.fields(EstadoProcesso))
"""Campos válidos de EstadoProcesso para AlterarVariaveisRequest."""


class AlarmeResponse(BaseModel):
    """Representação serializável de um alarme ativo."""

    tipo: str
    mensagem: str
    timestamp: str


class EstadoPlantaResponse(BaseModel):
    """
    Estado completo da planta: variáveis de processo, ações de controle e alarmes.

    Espelho achatado de EstadoProcesso + AcoesControle para consumo pelo frontend
    via polling em GET /api/planta/estado.
    """

    # Variáveis de processo (EstadoProcesso)
    vazao_entrada_m3h: float
    vazao_saida_m3h: float
    nivel_tanque_percentual: float
    pressao_linha_bar: float
    pressao_diferencial_filtro_bar: float
    temperatura_agua_c: float
    ph: float
    turbidez_ntu: float
    condutividade_us_cm: float
    vazao_dosagem_l_h: float
    bomba_principal_ligada: bool
    bomba_saida_ligada: bool
    bomba_dosadora_ligada: bool
    abertura_valvula_entrada_percentual: float
    valvula_descarte_aberta: bool
    emergencia_acionada: bool
    bomba_dosadora_em_falha: bool

    # Ações de controle calculadas (AcoesControle)
    bomba_principal_ligar: bool
    bomba_saida_ligar: bool
    bomba_dosadora_ligar: bool
    abertura_valvula_entrada_comandada_percentual: float
    valvula_descarte_abrir: bool
    processo_liberado: bool
    alarmes_ativos: list[AlarmeResponse]


class AlterarVariaveisRequest(RootModel[dict[str, Any]]):
    """
    Dicionário de variáveis do estado da planta e seus novos valores.

    As chaves devem corresponder a campos de EstadoProcesso. Campos
    desconhecidos são rejeitados com erro 422.
    """

    @model_validator(mode="after")
    def _validar_campos(self) -> Self:
        invalidos = set(self.root) - _CAMPOS_ESTADO
        if invalidos:
            raise ValueError(f"Campos inválidos: {invalidos}")
        return self


class AplicarCenarioRequest(BaseModel):
    """Identificador de um cenário de demonstração a ser aplicado."""

    nome: str


class StatusSimulacaoResponse(BaseModel):
    """Estado atual do loop de simulação."""

    em_execucao: bool


def estado_para_resposta(
    estado: EstadoProcesso, acoes: AcoesControle
) -> EstadoPlantaResponse:
    """Converte os objetos de domínio no schema de resposta da API."""
    alarmes = [
        AlarmeResponse(
            tipo=a.tipo.value,
            mensagem=a.mensagem,
            timestamp=a.timestamp.isoformat(),
        )
        for a in acoes.alarmes_ativos
    ]
    return EstadoPlantaResponse(
        vazao_entrada_m3h=estado.vazao_entrada_m3h,
        vazao_saida_m3h=estado.vazao_saida_m3h,
        nivel_tanque_percentual=estado.nivel_tanque_percentual,
        pressao_linha_bar=estado.pressao_linha_bar,
        pressao_diferencial_filtro_bar=estado.pressao_diferencial_filtro_bar,
        temperatura_agua_c=estado.temperatura_agua_c,
        ph=estado.ph,
        turbidez_ntu=estado.turbidez_ntu,
        condutividade_us_cm=estado.condutividade_us_cm,
        vazao_dosagem_l_h=estado.vazao_dosagem_l_h,
        bomba_principal_ligada=estado.bomba_principal_ligada,
        bomba_saida_ligada=estado.bomba_saida_ligada,
        bomba_dosadora_ligada=estado.bomba_dosadora_ligada,
        abertura_valvula_entrada_percentual=(
            estado.abertura_valvula_entrada_percentual
        ),
        valvula_descarte_aberta=estado.valvula_descarte_aberta,
        emergencia_acionada=estado.emergencia_acionada,
        bomba_dosadora_em_falha=estado.bomba_dosadora_em_falha,
        bomba_principal_ligar=acoes.bomba_principal_ligar,
        bomba_saida_ligar=acoes.bomba_saida_ligar,
        bomba_dosadora_ligar=acoes.bomba_dosadora_ligar,
        abertura_valvula_entrada_comandada_percentual=(
            acoes.abertura_valvula_entrada_percentual
        ),
        valvula_descarte_abrir=acoes.valvula_descarte_abrir,
        processo_liberado=acoes.processo_liberado,
        alarmes_ativos=alarmes,
    )
