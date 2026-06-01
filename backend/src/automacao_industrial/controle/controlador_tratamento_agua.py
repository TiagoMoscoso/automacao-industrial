"""
Controlador principal da planta de tratamento de água.

Recebe o estado atual da planta e delega à Matriz de Causa e Efeito
o cálculo das ações de controle correspondentes.

Referência: specs.md seção 10.6.
"""

from automacao_industrial.controle.matriz_causa_efeito import avaliar
from automacao_industrial.dominio.acoes_controle import AcoesControle
from automacao_industrial.dominio.estado_processo import EstadoProcesso


class ControladorTratamentoAgua:
    """Controlador principal que aplica as regras da Matriz de Causa e Efeito."""

    def executar(self, estado: EstadoProcesso) -> AcoesControle:
        """Avalia o estado atual e retorna as ações de controle correspondentes."""
        return avaliar(estado)
