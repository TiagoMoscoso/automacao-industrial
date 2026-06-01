"""Instância ASGI da API HTTP da planta."""

from automacao_industrial.aplicacao.fabrica_aplicacao import criar_aplicacao

app = criar_aplicacao()
