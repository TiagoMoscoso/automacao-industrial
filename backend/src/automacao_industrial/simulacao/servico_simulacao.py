"""
Serviço de simulação da planta de tratamento de água.

Gerencia o ciclo de vida da simulação (iniciar, pausar, reiniciar), mantendo
o estado atual e as ações de controle calculadas. Integra o SimuladorPlanta
e o ControladorTratamentoAgua em um loop temporal executado em thread de fundo.

Projetado para ser instanciado uma vez na aplicação (gerenciado pela fábrica
em aplicacao/fabrica_aplicacao.py). Referência: specs.md §10.7 e PRD §F1.
"""

import dataclasses
import threading

from automacao_industrial.controle.controlador_tratamento_agua import (
    ControladorTratamentoAgua,
)
from automacao_industrial.dominio.acoes_controle import AcoesControle
from automacao_industrial.dominio.estado_processo import EstadoProcesso
from automacao_industrial.simulacao.cenarios_simulacao import obter_cenario
from automacao_industrial.simulacao.simulador_planta import SimuladorPlanta

_INTERVALO_PADRAO_S = 1.0
"""Intervalo padrão entre ciclos do loop de simulação (segundos)."""


class ServicoSimulacao:
    """
    Mantém o estado atual da planta e o loop de atualização temporal.

    Thread-safe: usa um Lock para proteger o estado compartilhado entre
    o loop de fundo e as chamadas externas das rotas da API.
    """

    def __init__(self, intervalo_s: float = _INTERVALO_PADRAO_S) -> None:
        self._intervalo_s = intervalo_s
        self._simulador = SimuladorPlanta()
        self._controlador = ControladorTratamentoAgua()
        self._lock = threading.Lock()
        self._parar = threading.Event()
        self._thread: threading.Thread | None = None

        # Estado inicial: operação normal
        self._estado_atual = obter_cenario("operacao_normal")
        self._acoes_atuais = self._controlador.executar(self._estado_atual)

    @property
    def estado_atual(self) -> EstadoProcesso:
        """Cópia do estado atual da planta (thread-safe)."""
        with self._lock:
            return dataclasses.replace(self._estado_atual)

    @property
    def acoes_atuais(self) -> AcoesControle:
        """Ações de controle correspondentes ao estado atual (thread-safe)."""
        with self._lock:
            return self._acoes_atuais

    @property
    def em_execucao(self) -> bool:
        """Verdadeiro enquanto o loop de simulação estiver ativo."""
        return self._thread is not None and self._thread.is_alive()

    def iniciar(self) -> None:
        """Inicia o loop de simulação em uma thread de fundo (daemon)."""
        if self.em_execucao:
            return
        self._parar.clear()
        self._thread = threading.Thread(target=self._executar_loop, daemon=True)
        self._thread.start()

    def pausar(self) -> None:
        """Pausa o loop de simulação sem alterar o estado atual."""
        self._parar.set()

    def reiniciar(self) -> None:
        """Para o loop, restaura o estado de operação normal e recalcula ações."""
        self._parar.set()
        with self._lock:
            self._estado_atual = obter_cenario("operacao_normal")
            self._acoes_atuais = self._controlador.executar(self._estado_atual)

    def aplicar_cenario(self, nome: str) -> None:
        """
        Carrega um cenário de demonstração e recalcula as ações de controle.

        Raises:
            KeyError: se o nome do cenário não for reconhecido.
        """
        novo_estado = obter_cenario(nome)
        with self._lock:
            self._estado_atual = novo_estado
            self._acoes_atuais = self._controlador.executar(self._estado_atual)

    def alterar_variaveis(self, variaveis: dict[str, object]) -> None:
        """
        Atualiza campos específicos do estado e recalcula as ações de controle.

        As chaves do dicionário devem corresponder a campos de EstadoProcesso.
        Útil para forçar condições de falha durante a demonstração.
        """
        with self._lock:
            self._estado_atual = dataclasses.replace(
                self._estado_atual,
                **variaveis,  # type: ignore[arg-type]
            )
            self._acoes_atuais = self._controlador.executar(self._estado_atual)

    def _executar_loop(self) -> None:
        """Loop de atualização: simula dinâmica e aplica controlador a cada ciclo."""
        while not self._parar.wait(timeout=self._intervalo_s):
            with self._lock:
                self._estado_atual = self._simulador.atualizar(
                    self._estado_atual, self._intervalo_s
                )
                self._acoes_atuais = self._controlador.executar(self._estado_atual)
