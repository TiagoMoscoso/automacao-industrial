# Roteiro de Apresentação — Simulador de Tratamento de Água

**Tempo total: 15 minutos**

Este roteiro organiza a apresentação oral para cobrir explicitamente os cinco
requisitos acadêmicos da disciplina. O sistema deve ser apresentado como uma
simulação didática: o Python simula o CLP e a lógica de controle, enquanto o
React simula a IHM/SCADA. Não é um sistema industrial real, não se comunica com
hardware real e não substitui CLP, SCADA ou protocolos industriais reais.

---

## Checklist pré-apresentação

- [ ] Executar o simulador com `docker compose up --build`.
- [ ] Abrir o navegador na página principal do simulador.
- [ ] Deixar o sinóptico da planta visível em operação normal.
- [ ] Abrir `docs/pid-conceitual.md` em uma aba.
- [ ] Abrir `docs/lista-instrumentos.md` em uma aba.
- [ ] Abrir `docs/folha-dados-fit101.md` em uma aba.
- [ ] Abrir `README.md` na seção "Arquitetura de Automação".
- [ ] Abrir `backend/src/automacao_industrial/controle/matriz_causa_efeito.py`.

---

## Bloco 1 — Planta escolhida, variáveis e justificativa (2 min)

**Requisito atendido: #1 — Planta com mínimo 10 variáveis.**

**Mostrar:** tela inicial do simulador com o sinóptico da planta.

- Apresentar a planta escolhida: tratamento de água industrial para processo
  produtivo ou alimentação de caldeira.
- Explicar o fluxo: água bruta, válvula de entrada, medição de vazão, bomba
  principal, filtro, tanque de água tratada, dosagem química, bomba de saída e
  linha de descarte.
- Citar as 10 variáveis de processo: `FIT-101`, `FIT-102`, `LIT-101`,
  `PIT-101`, `DPIT-101`, `TIT-101`, `AIT-101`, `AIT-102`, `AIT-103` e
  `FIT-201`.
- Citar as variáveis manipuladas: `P-101`, `P-102`, `P-201`, `FV-101` e
  `XV-101`.
- Justificar a escolha: a planta permite demonstrar instrumentação, controle,
  alarmes, intertravamentos e qualidade da água em um caso industrial simples.
- Transição: ao terminar o fluxo no sinóptico, abrir o P&ID para mostrar como
  os mesmos elementos aparecem na documentação técnica.

---

## Bloco 2 — P&ID e lista de instrumentos (3 min)

**Requisito atendido: #2 — P&ID com identificação e lista de instrumentos.**

**Abrir:** `docs/pid-conceitual.md` e, em seguida, `docs/lista-instrumentos.md`.

- Mostrar o P&ID conceitual e percorrer rapidamente a linha principal:
  `FV-101`, `FIT-101`, `P-101`, `PIT-101`, `F-101`, `DPIT-101`, `T-101`,
  `P-102` e `FIT-102`.
- Mostrar a instrumentação do tanque: `LIT-101`, `TIT-101`, `AIT-101`,
  `AIT-102` e `AIT-103`.
- Mostrar a dosagem química: `TK-201`, `P-201` e `FIT-201`.
- Mostrar a linha de descarte com `XV-101`.
- Citar que a lista de instrumentos tem mais de 10 itens identificados por
  tag, função e papel no processo: transmissores, analisadores, válvulas,
  bombas e inversor.
- Destacar que o P&ID mostra o fluxo e a instrumentação, enquanto o sinóptico
  mostra o estado operacional durante a simulação.
- Transição: ao fechar a lista de instrumentos, abrir a folha de dados do
  `FIT-101` para detalhar um instrumento específico.

---

## Bloco 3 — Folha de dados do FIT-101 (2 min)

**Requisito atendido: #3 — Folha de dados com mínimo 10 especificações.**

**Abrir:** `docs/folha-dados-fit101.md`.

- Apresentar o `FIT-101` como transmissor de vazão eletromagnético da entrada
  de água bruta.
- Mostrar as 10+ especificações técnicas: tag, serviço, tipo, fluido, faixa de
  medição, sinal de saída, comunicação, alimentação, precisão, diâmetro nominal,
  material dos eletrodos, material do corpo, grau de proteção, temperatura de
  operação, pressão máxima e instalação.
- Explicar que a vazão de entrada é crítica porque ajuda a entender a
  alimentação da planta e apoia a operação segura da bomba principal `P-101`.
- Transição: depois da folha de dados, voltar ao simulador e abrir a seção de
  arquitetura para conectar os instrumentos ao CLP e à supervisão.

---

## Bloco 4 — Arquitetura de automação (3 min)

**Requisito atendido: #4 — Arquitetura com especificação mínima dos
equipamentos necessários.**

**Mostrar:** seção "Arquitetura de Automação" na interface React e o diagrama
Mermaid no `README.md`.

- Na interface, abrir a seção "Arquitetura de Automação" e mostrar as camadas:
  campo, controle, supervisão e rede industrial.
- Explicar o campo: instrumentos `FIT`, `LIT`, `PIT`, `DPIT`, `TIT`, `AIT` e
  atuadores `FV-101`, `XV-101`, `P-101`, `P-102`, `P-201` e `VFD-101`.
- Explicar o controle: CLP, módulos de entrada e saída, painel elétrico, fonte
  24 Vcc, relés, bornes e UPS.
- Explicar a supervisão: IHM local, SCADA, estação de engenharia, historiador,
  servidor de alarmes e painel de alarmes.
- Mostrar no `README.md` o diagrama Mermaid e a tabela de equipamentos por
  camada.
- Mostrar a equivalência didática na interface: Python simula o CLP e React
  simula a IHM/SCADA. O sistema é uma simulação didática,
  não um sistema industrial real.
- Transição: com a arquitetura explicada, abrir o backend Python para mostrar a
  lógica de controle que representa a Matriz de Causa e Efeito.

---

## Bloco 5 — Matriz de Causa e Efeito e demonstração ao vivo (4 min)

**Requisito atendido: #5 — Algoritmo de controle com Matriz de Causa e
Efeito.**

**Abrir:** `backend/src/automacao_industrial/controle/matriz_causa_efeito.py`.

**Demonstrar:** painel de cenários e painel de ajuste manual no simulador.

- Explicar a ideia da matriz: causas são condições de processo; efeitos são
  ações automáticas sobre bombas, válvulas, alarmes e liberação do processo.
- Citar exemplos implementados: emergência, nível alto-alto, nível
  baixo-baixo, pressão alta, filtro saturado, pH fora da faixa, turbidez alta,
  condutividade alta e falha da dosadora.
- Mostrar no código que a matriz consolida ações de controle e alarmes.
- Voltar ao simulador e demonstrar um cenário pronto, preferencialmente
  "Nível Alto-Alto": observar `P-101` desligando, `FV-101` fechando e alarme
  ativo.
- Demonstrar um segundo caso pelo ajuste manual, por exemplo alterar pH para
  fora da faixa e observar bloqueio do processo.
- Reforçar que a resposta automática vem da lógica no backend Python, que neste
  projeto simula o CLP; o frontend React apenas exibe o resultado e envia
  comandos, simulando a IHM/SCADA.
- Transição: retornar para operação normal antes do fechamento.

---

## Bloco 6 — Fechamento e perguntas (1 min)

**Mostrar:** sinóptico do simulador em operação normal.

- Resumir os cinco requisitos acadêmicos atendidos: #1 variáveis da planta,
  #2 P&ID e lista de instrumentos, #3 folha de dados do `FIT-101`, #4
  arquitetura de automação e #5 Matriz de Causa e Efeito.
- Reforçar a natureza do projeto: simulação didática de automação industrial
  para apresentação acadêmica, sem comunicação com hardware industrial real.
- Encerrar com o processo em operação normal, sem alarmes ativos, e abrir para
  perguntas.

---

**Tempo total: 2 + 3 + 2 + 3 + 4 + 1 = 15 minutos.**
