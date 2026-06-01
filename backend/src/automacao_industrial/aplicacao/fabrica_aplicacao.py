"""
Fábrica da aplicação FastAPI.

Instancia as dependências da aplicação e registra as rotas HTTP da planta.
"""

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from automacao_industrial.api.rotas_planta import criar_rotas_planta
from automacao_industrial.aplicacao.configuracao import INTERVALO_SIMULACAO_S
from automacao_industrial.simulacao.servico_simulacao import ServicoSimulacao


def criar_aplicacao() -> FastAPI:
    """Monta a aplicação HTTP com serviço de simulação compartilhado."""
    servico = ServicoSimulacao(intervalo_s=INTERVALO_SIMULACAO_S)

    @asynccontextmanager
    async def ciclo_de_vida(_: FastAPI) -> AsyncIterator[None]:
        try:
            yield
        finally:
            servico.pausar()

    aplicacao = FastAPI(
        title="Automação Industrial - Tratamento de Água",
        lifespan=ciclo_de_vida,
    )

    aplicacao.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    aplicacao.include_router(criar_rotas_planta(servico))

    return aplicacao
