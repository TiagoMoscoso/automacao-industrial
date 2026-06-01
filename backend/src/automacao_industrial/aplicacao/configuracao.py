"""
Constantes de configuração do servidor da aplicação.

Centraliza os parâmetros de inicialização do servidor ASGI e do loop de
simulação, facilitando ajustes entre ambientes local, Docker e testes.
"""

HOST: str = "0.0.0.0"
"""Endereço de escuta do servidor (todas as interfaces de rede)."""

PORTA: int = 8000
"""Porta HTTP do servidor ASGI."""

INTERVALO_SIMULACAO_S: float = 1.0
"""Intervalo em segundos entre cada ciclo do loop de simulação."""
