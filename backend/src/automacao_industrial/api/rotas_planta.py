"""
Rotas HTTP da planta de tratamento de água.

As rotas apenas traduzem HTTP para chamadas do ServicoSimulacao. A lógica de
simulação e intertravamento permanece nas camadas de simulação e controle.
"""

from fastapi import APIRouter, HTTPException

from automacao_industrial.api.esquemas import (
    AlterarVariaveisRequest,
    EstadoPlantaResponse,
    StatusSimulacaoResponse,
    estado_para_resposta,
)
from automacao_industrial.simulacao.servico_simulacao import ServicoSimulacao


def criar_rotas_planta(servico: ServicoSimulacao) -> APIRouter:
    """Cria o roteador da planta usando a instância compartilhada do serviço."""
    roteador = APIRouter()

    def _estado_atual() -> EstadoPlantaResponse:
        return estado_para_resposta(servico.estado_atual, servico.acoes_atuais)

    @roteador.get("/api/saude")
    def consultar_saude() -> dict[str, str]:
        return {"status": "ok"}

    @roteador.get("/api/planta/estado", response_model=EstadoPlantaResponse)
    def consultar_estado() -> EstadoPlantaResponse:
        return _estado_atual()

    @roteador.post("/api/planta/iniciar", response_model=StatusSimulacaoResponse)
    def iniciar_simulacao() -> StatusSimulacaoResponse:
        servico.iniciar()
        return StatusSimulacaoResponse(em_execucao=servico.em_execucao)

    @roteador.post("/api/planta/pausar", response_model=StatusSimulacaoResponse)
    def pausar_simulacao() -> StatusSimulacaoResponse:
        servico.pausar()
        return StatusSimulacaoResponse(em_execucao=servico.em_execucao)

    @roteador.post("/api/planta/reiniciar", response_model=EstadoPlantaResponse)
    def reiniciar_simulacao() -> EstadoPlantaResponse:
        servico.reiniciar()
        return _estado_atual()

    @roteador.post("/api/planta/variaveis", response_model=EstadoPlantaResponse)
    def alterar_variaveis(
        requisicao: AlterarVariaveisRequest,
    ) -> EstadoPlantaResponse:
        servico.alterar_variaveis(requisicao.root)
        return _estado_atual()

    @roteador.post(
        "/api/planta/cenarios/{nome_cenario}",
        response_model=EstadoPlantaResponse,
    )
    def aplicar_cenario(nome_cenario: str) -> EstadoPlantaResponse:
        try:
            servico.aplicar_cenario(nome_cenario)
        except KeyError as erro:
            raise HTTPException(
                status_code=404,
                detail="Cenário não encontrado",
            ) from erro
        return _estado_atual()

    return roteador
