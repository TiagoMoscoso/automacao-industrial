# Roteiro de Apresentação

Roteiro sugerido para uma apresentação acadêmica de 15 minutos sobre o
simulador web de tratamento de água industrial.

## Sequência de 15 minutos

| Tempo | Bloco | O que mostrar | Pontos-chave |
|---|---:|---|---|
| 00:00-02:00 | Planta, P&ID e documentos acadêmicos | Mostrar `docs/pid-conceitual.md`, `docs/lista-instrumentos.md`, `docs/folha-dados-fit101.md` e `docs/arquitetura-automacao.md` | Apresentar a planta de tratamento de água, destacar T-101, F-101, P-101, P-102, FV-101, XV-101 e explicar que o P&ID conceitual está coerente com a lista de instrumentos. |
| 02:00-03:30 | Operação normal | Abrir o frontend e mostrar o sinóptico com operação normal | Acionar **Operação Normal** e apontar nível em 70%, pressão em 5 bar, pH em 7,2, turbidez em 2 NTU, processo liberado, bombas ligadas e ausência de alarmes. |
| 03:30-05:00 | Matriz de Causa e Efeito | Mostrar o painel de alarmes/atuadores e abrir rapidamente `backend/src/automacao_industrial/controle/matriz_causa_efeito.py` | Explicar que a Matriz de Causa e Efeito avalia causas, condições e efeitos para proteger bombas, válvulas e liberação do processo. |
| 05:00-09:00 | Seis cenários de demonstração | Usar os botões do painel de cenários no frontend | Acionar, nesta ordem: **Operação Normal**, **Nível Alto-Alto**, **Nível Baixo-Baixo**, **pH Fora da Faixa**, **Turbidez Alta** e **Emergência**. Em cada cenário, mostrar alarmes, bloqueios e mudança dos atuadores. |
| 09:00-11:00 | Ajuste manual e intertravamento automático | Mostrar o painel de ajuste manual de variáveis | Alterar o pH para 9,1 e explicar que a Matriz de Causa e Efeito bloqueia o processo automaticamente, sem depender de um cenário pronto. Em seguida, retornar para operação normal. |
| 11:00-14:00 | Tour pelo código no VS Code | Abrir o VS Code com breakpoint em `matriz_causa_efeito.py` | Iniciar debug do backend, manter o frontend aberto, acionar um cenário e mostrar o breakpoint parando na avaliação da matriz. Explicar que o backend Python representa a lógica de controle simulada e o frontend React representa a supervisão. |
| 14:00-15:00 | Encerramento | Voltar ao sinóptico em operação normal | Reforçar os cinco requisitos acadêmicos atendidos: variáveis identificadas, P&ID e lista, folha de dados, arquitetura de automação e Matriz de Causa e Efeito implementada. |

## Ordem de preparo antes da fala

1. Executar `docker compose up --build` antes da apresentação.
2. Abrir o frontend no navegador e deixar o painel em operação normal.
3. Abrir o VS Code no arquivo
   `backend/src/automacao_industrial/controle/matriz_causa_efeito.py`.
4. Colocar um breakpoint na função `avaliar_matriz_causa_efeito`.
5. Deixar os documentos de P&ID, lista de instrumentos, folha de dados e
   arquitetura acessíveis em abas.

## Pontos que não devem faltar

- A planta tem variáveis de processo e manipuladas com tags industriais.
- O P&ID conceitual se conecta à lista de instrumentos e à arquitetura.
- A Matriz de Causa e Efeito é demonstrada em cenários prontos e em ajuste
  manual de variável.
- O Docker Compose, a `.venv` e o VS Code fazem parte da demonstração técnica.
- A apresentação termina em operação normal, com processo liberado e sem
  alarmes ativos.
