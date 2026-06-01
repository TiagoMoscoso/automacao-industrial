# PRD — Automação Industrial: Simulador Web de Tratamento de Água

## Visão Geral

Este produto é um simulador web didático de uma planta de tratamento de água industrial, desenvolvido para apoiar uma apresentação acadêmica de até 15 minutos sobre automação industrial.

O simulador é composto por:

- Um **backend em Python** que simula o comportamento simplificado da planta industrial, aplica a Matriz de Causa e Efeito, gerencia alarmes e expõe uma API para o frontend.
- Um **frontend em TypeScript + React** que exibe uma interface visual da planta ao estilo supervisório/SCADA, permitindo ao usuário observar variáveis em tempo real, acionar cenários e alterar estados da planta.

O produto é destinado a **estudantes de engenharia** que precisam demonstrar conceitos de automação industrial — instrumentação, intertravamentos, Matriz de Causa e Efeito — de forma visual e interativa, sem depender de hardware industrial real.

O valor do produto está em tornar conceitos abstratos de automação industrial tangíveis e demonstráveis ao vivo, dentro de um ambiente acadêmico.

---

## Objetivos

### Requisitos Acadêmicos

Os seguintes itens são exigidos pela disciplina e devem ser atendidos pelo projeto:

1. Identificar no mínimo 10 variáveis de processo e/ou variáveis manipuladas da planta.
2. Elaborar um P&ID conceitual com identificação dos instrumentos e lista de instrumentos.
3. Elaborar 1 folha de dados de 1 instrumento com no mínimo 10 especificações técnicas.
4. Elaborar uma arquitetura de automação com especificação mínima dos equipamentos necessários.
5. Elaborar um exemplo de algoritmo de controle implementando uma Matriz de Causa e Efeito.

### Requisitos de Produto

O produto deve permitir que o estudante:

- Realize uma apresentação de até 15 minutos com demonstração ao vivo do simulador.
- Mostre a planta em operação normal e em pelo menos 5 condições de falha ou alerta.
- Demonstre claramente a Matriz de Causa e Efeito em ação, com causas, condições e efeitos visíveis.
- Execute o sistema em qualquer máquina via Docker Compose, sem configuração manual.

### Requisitos de Demonstração Computacional

A demonstração computacional deve incluir:

1. Backend em Python simulando a planta industrial, executável localmente com a `.venv` existente ou via Docker.
2. Frontend em TypeScript + React permitindo visualizar e interagir com a simulação.
3. Execução completa via `docker compose up --build`.
4. Configuração do VS Code para depurar backend e frontend separadamente, com breakpoints funcionando.

---

## Histórias de Usuário

### Persona primária: Estudante / Apresentador

> Estudante de engenharia que precisa apresentar os conceitos de automação industrial de forma didática, usando o simulador durante a apresentação como recurso de demonstração ao vivo.

- Como estudante, quero visualizar o sinóptico da planta em tempo real para explicar o fluxo de processo durante a apresentação.
- Como estudante, quero acionar cenários prontos com um clique para demonstrar a Matriz de Causa e Efeito sem precisar digitar valores manualmente durante a apresentação.
- Como estudante, quero alterar variáveis manualmente para mostrar ao professor como os intertravamentos funcionam em diferentes condições.
- Como estudante, quero visualizar alarmes ativos para demonstrar o sistema de alertas da automação industrial.
- Como estudante, quero pausar e reiniciar a simulação para controlar o ritmo da apresentação.
- Como estudante, quero executar o sistema inteiro com um único comando Docker para não perder tempo com configuração em sala.
- Como estudante, quero depurar o backend e o frontend no VS Code para entender e explicar o código durante a demonstração.

### Persona secundária: Professor / Avaliador

> Professor da disciplina de automação industrial que avalia se os requisitos da disciplina foram atendidos.

- Como professor, quero ver a planta com no mínimo 10 variáveis identificadas por tag industrial para confirmar que o requisito foi atendido.
- Como professor, quero ver a Matriz de Causa e Efeito em funcionamento para verificar se o algoritmo de controle foi implementado corretamente.
- Como professor, quero ver a separação entre campo, controle e supervisão representada no sistema para avaliar a arquitetura de automação.
- Como professor, quero que a apresentação caiba em 15 minutos para respeitar o tempo da disciplina.

---

## Funcionalidades Principais

### F1 — Simulação da planta de tratamento de água (backend Python)

**O que faz:** O backend simula o comportamento temporal simplificado de uma planta de tratamento de água industrial, mantendo o estado de todas as variáveis de processo e manipuladas.

**Por que é importante:** É o núcleo do produto. Sem a simulação, não há dados para demonstrar os conceitos de automação.

**Comportamento de alto nível:**
- O backend mantém um estado de processo com todas as variáveis da planta (nível, pressão, pH, turbidez, condutividade, vazão, temperatura).
- O estado é atualizado continuamente ao longo do tempo, simulando a dinâmica simplificada da planta (ex: bomba ligada → nível sobe; filtro operando muito → pressão diferencial aumenta).
- O usuário pode iniciar, pausar e reiniciar a simulação.
- O usuário pode alterar valores de variáveis manualmente para forçar condições de falha.
- O usuário pode acionar cenários prontos que configuram o estado da planta para demonstração.

**Variáveis de processo (mínimo 10):**

| Tag | Variável | Unidade |
|---|---|---|
| FIT-101 | Vazão de entrada de água bruta | m³/h |
| FIT-102 | Vazão de saída para processo | m³/h |
| LIT-101 | Nível do tanque de água tratada | % |
| PIT-101 | Pressão da linha principal | bar |
| DPIT-101 | Pressão diferencial do filtro | bar |
| TIT-101 | Temperatura da água | °C |
| AIT-101 | pH da água tratada | pH |
| AIT-102 | Turbidez da água | NTU |
| AIT-103 | Condutividade da água | µS/cm |
| FIT-201 | Vazão de dosagem química | L/h |

**Variáveis manipuladas:**

| Tag | Variável | Tipo |
|---|---|---|
| P-101 | Bomba principal | Discreta (liga/desliga) |
| P-102 | Bomba de saída | Discreta (liga/desliga) |
| P-201 | Bomba dosadora | Discreta (liga/desliga) |
| FV-101 | Válvula de entrada | Analógica (abertura %) |
| XV-101 | Válvula de descarte | Discreta (abre/fecha) |

---

### F2 — Matriz de Causa e Efeito (backend Python)

**O que faz:** Implementa as regras de intertravamento e proteção da planta. Quando uma condição de causa é detectada, o sistema aplica automaticamente os efeitos correspondentes sobre bombas, válvulas, alarmes e liberação do processo.

**Por que é importante:** É o requisito acadêmico central da disciplina. Demonstra o conceito de automação de segurança em plantas industriais.

**Regras implementadas:**

| Causa | Condição | Efeito |
|---|---|---|
| Emergência acionada | emergencia_acionada = verdadeiro | Desliga todas as bombas, fecha válvulas, bloqueia processo |
| Nível alto-alto | LIT-101 ≥ 95% | Para P-101 e fecha FV-101 |
| Nível baixo-baixo | LIT-101 ≤ 10% | Para P-102 para evitar cavitação |
| Pressão alta | PIT-101 > 8 bar | Para P-101 e gera alarme |
| Filtro saturado | DPIT-101 > 1,5 bar | Gera alarme de manutenção |
| pH fora da faixa | AIT-101 < 6,5 ou > 8,5 | Bloqueia envio ao processo |
| Turbidez alta | AIT-102 > 5 NTU | Bloqueia processo e abre descarte XV-101 |
| Condutividade alta | AIT-103 > 1.200 µS/cm | Bloqueia envio ao processo |
| Falha na dosadora | P-201 em falha = verdadeiro | Bloqueia operação automática |
| Operação normal | Todas as variáveis dentro dos limites | Libera bombas, válvulas e saída para processo |

---

### F3 — Interface supervisória/SCADA simplificada (frontend React)

**O que faz:** Exibe uma tela principal com o sinóptico visual da planta, painéis de variáveis, atuadores e alarmes, e controles de interação.

**Por que é importante:** Representa a camada de supervisão (IHM/SCADA) da arquitetura de automação. Sem a interface, não há demonstração visual.

**Componentes da tela principal:**

1. **Sinóptico da planta** — Representação visual do fluxo de processo:
   ```
   [Água Bruta] → [FV-101] → [FIT-101] → [P-101] → [F-101] → [T-101] → [P-102] → [Processo]
                                                                    |
                                                                    → [XV-101 Descarte]

   [TK-201] → [P-201] → [FIT-201] → injeção química
   ```
   Cada elemento do sinóptico deve refletir o estado atual (bomba ligada/desligada, válvula aberta/fechada, nível do tanque, alarmes ativos).

2. **Painel de variáveis** — Exibe o valor atual de cada variável de processo com indicação visual de estado normal, alerta ou falha.

3. **Painel de atuadores** — Exibe o estado atual de cada variável manipulada (bombas e válvulas).

4. **Painel de alarmes** — Lista alarmes ativos com identificação da causa. Deve indicar claramente quando o processo está liberado ou bloqueado.

5. **Controles de simulação** — Botões para iniciar, pausar e reiniciar a simulação.

6. **Painel de cenários** — Botões para acionar cada um dos 6 cenários de demonstração prontos.

7. **Painel de ajuste de variáveis** — Formulário ou sliders para alterar manualmente qualquer variável de processo e observar os efeitos da Matriz de Causa e Efeito.

---

### F4 — Cenários de demonstração (backend + frontend)

**O que faz:** Permite acionar, com um clique, estados predefinidos da planta para demonstração durante a apresentação.

**Por que é importante:** Elimina a necessidade de digitar valores manualmente durante a apresentação, tornando a demonstração fluída e controlada.

**Cenários disponíveis:**

| Cenário | Condição principal | Resultado esperado |
|---|---|---|
| Operação Normal | Nível 70%, pH 7,2, turbidez 2 NTU, pressão 5 bar | P-101 e P-102 ligadas, processo liberado, sem alarmes |
| Nível Alto-Alto | Nível 96% | P-101 desligada, FV-101 fechada, alarme de nível alto-alto |
| Nível Baixo-Baixo | Nível 8% | P-102 desligada, processo bloqueado, alarme de nível baixo-baixo |
| pH Fora da Faixa | pH 9,1 | P-102 desligada, processo bloqueado, alarme de pH |
| Turbidez Alta | Turbidez 7 NTU | Processo bloqueado, XV-101 aberta, alarme de turbidez |
| Emergência | Emergência acionada | Todas as bombas desligadas, válvulas fechadas, processo bloqueado |

---

### F5 — Execução via Docker Compose

**O que faz:** Permite executar o sistema completo (backend + frontend) com um único comando, sem instalar dependências manualmente.

**Por que é importante:** Garante que a demonstração funcione em qualquer máquina em sala, sem risco de problemas de ambiente.

**Comportamento esperado:**
- `docker compose up --build` sobe backend e frontend.
- O frontend é acessível no navegador.
- O frontend se comunica com o backend.
- O sistema está pronto para demonstração.

---

### F6 — Configuração de debug no VS Code

**O que faz:** Permite depurar o backend Python e o frontend React separadamente no VS Code, com breakpoints funcionando em ambos.

**Por que é importante:** Permite ao estudante navegar pelo código durante a apresentação para explicar a implementação ao professor.

**Comportamento esperado:**
- É possível iniciar o backend no VS Code com breakpoints ativos no Python.
- É possível iniciar o frontend no VS Code com breakpoints ativos no TypeScript/React.
- O backend usa obrigatoriamente a `.venv` já existente no projeto.

---

## Experiência do Usuário

### Jornada principal: demonstração ao vivo durante a apresentação

1. O estudante executa `docker compose up --build` antes da apresentação. O sistema sobe sem erros.
2. O estudante abre o frontend no navegador e mostra o sinóptico da planta ao professor.
3. O estudante clica em "Operação Normal" para iniciar a simulação em condição base. O professor vê as variáveis sendo atualizadas em tempo real.
4. O estudante explica a Matriz de Causa e Efeito e, em seguida, clica em "Nível Alto-Alto". O professor vê imediatamente: P-101 desligando, FV-101 fechando, alarme aparecendo no painel.
5. O estudante repete o processo para os demais cenários (pH fora da faixa, turbidez alta, emergência).
6. O estudante ajusta um valor manualmente via slider (ex: aumenta o pH para 9) e mostra que a Matriz de Causa e Efeito age automaticamente, sem precisar de um cenário pronto.
7. O estudante encerra a apresentação com o sistema em operação normal, processo liberado, sem alarmes.

### Jornada secundária: depuração no VS Code durante a apresentação

1. O estudante abre o VS Code e inicia o backend em modo debug.
2. O estudante coloca um breakpoint na Matriz de Causa e Efeito.
3. O estudante aciona um cenário no frontend e o VS Code para no breakpoint.
4. O estudante explica o código ao professor enquanto inspeciona variáveis no depurador.

### Princípios de interface

- A tela deve lembrar uma interface supervisória industrial simples e moderna, sem excesso de elementos decorativos.
- Estados críticos (alarmes, bloqueio de processo, emergência) devem ser visualmente evidentes — cores distintas, indicadores claros.
- A navegação deve ser óbvia: o estudante não deve perder tempo procurando onde clicar durante a apresentação.
- Todos os textos da interface devem estar em português do Brasil.

---

## Restrições Técnicas de Alto Nível

Estas restrições são impostas pelo contexto do projeto e não devem ser alteradas:

- O backend deve ser desenvolvido em Python, usando obrigatoriamente a `.venv` já criada pelo usuário para execução local. O agente não deve criar outro ambiente virtual nem usar Python do sistema diretamente.
- O frontend deve ser desenvolvido em TypeScript com React.
- O sistema deve ser executável via Docker Compose sem configuração manual adicional.
- O VS Code deve ser configurado para depurar backend e frontend separadamente.
- Todo o código autoral (nomes de classes, funções, variáveis, comentários, mensagens, documentação) deve estar em português do Brasil, com exceção de palavras reservadas das linguagens, APIs de bibliotecas externas e nomes padronizados de arquivos.
- O código deve seguir Clean Code, SOLID e separação clara de responsabilidades por camadas.
- Tasks de implementação devem ser criadas em `.tasks/` e executadas uma por vez.

---

## Fora do Escopo

Os itens abaixo estão explicitamente fora do escopo desta versão do produto:

- Comunicação real com CLP, PLC ou hardware industrial.
- Protocolos industriais reais (MQTT, OPC UA, Modbus).
- Simulação física precisa com equações diferenciais.
- Controle PID complexo.
- Banco de dados persistente ou histórico de dados.
- Autenticação de usuário.
- Múltiplas plantas ou configurações dinâmicas da planta.
- Editor gráfico de P&ID.
- Gráficos históricos complexos.
- Integração com sensores reais.
- SCADA real.

Esses itens podem ser mencionados como possíveis evoluções futuras durante a apresentação.

---

## Plano de Entrega em Fases

### Fase 1 — MVP funcional

**Inclui:**
- Backend Python com simulação da planta, Matriz de Causa e Efeito, cenários de demonstração e API HTTP.
- Frontend React com sinóptico, painéis de variáveis, atuadores, alarmes, controles de simulação e painel de cenários.
- Execução via Docker Compose.
- Testes unitários principais do backend (especialmente a Matriz de Causa e Efeito).

**Critério para avançar:** O usuário consegue visualizar a planta, acionar todos os 6 cenários e ver os efeitos da Matriz de Causa e Efeito no frontend. O sistema sobe via Docker Compose sem erros.

### Fase 2 — Qualidade e debug

**Inclui:**
- Configuração do VS Code para depurar backend e frontend separadamente.
- Testes básicos de API.
- Ajustes de polish na interface (indicadores visuais de estado crítico, cores, legibilidade).
- Painel de ajuste manual de variáveis (formulário ou sliders).

**Critério para avançar:** O estudante consegue depurar backend e frontend no VS Code com breakpoints. A interface está legível e clara para uma apresentação ao vivo.

### Fase 3 — Preparação da apresentação

**Inclui:**
- README completo explicando como executar localmente (com `.venv`), via Docker e via VS Code.
- Roteiro de apresentação com os pontos principais a cobrir nos 15 minutos.
- Documentação técnica: P&ID conceitual, lista de instrumentos, folha de dados do FIT-101, arquitetura de automação.
- Verificação final completa de todos os critérios de aceite.

**Critério de conclusão:** A apresentação completa cabe em 15 minutos, todos os requisitos acadêmicos foram atendidos, o sistema funciona em Docker Compose e no VS Code, e o README está completo.

---

## Métricas de Sucesso

### Requisitos acadêmicos

- A planta tem no mínimo 10 variáveis identificadas com tags industriais.
- O P&ID conceitual é coerente com a lista de instrumentos.
- A folha de dados do FIT-101 contém no mínimo 10 especificações técnicas.
- A arquitetura de automação diferencia claramente campo, controle e supervisão.
- A Matriz de Causa e Efeito tem causas, condições e efeitos claros implementados e testados.

### Produto

- O usuário consegue visualizar a planta em operação normal e em pelo menos 5 cenários de falha ou alerta.
- O usuário consegue alterar variáveis manualmente e ver os efeitos da Matriz de Causa e Efeito.
- A apresentação completa cabe em até 15 minutos.

### Técnico

- Todos os testes unitários principais passam.
- O sistema sobe completamente via `docker compose up --build`.
- O backend roda localmente usando a `.venv` existente.
- O VS Code permite depurar backend e frontend separadamente com breakpoints.
- O código está 100% em português do Brasil (exceto exceções previstas no specs.md).

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Prazo acadêmico insuficiente para o escopo completo | Alta | Alto | Seguir rigorosamente o fluxo Compozy com tasks pequenas e sequenciais. Priorizar a Fase 1 e garantir MVP funcional antes de polish. |
| Complexidade do sinóptico visual no frontend consumir mais tempo do que o esperado | Média | Médio | Usar SVG ou CSS simples sem bibliotecas gráficas complexas. O sinóptico pode ser esquemático — não precisa ser fotorrealista. |
| Incompatibilidade da `.venv` existente com as dependências do backend | Baixa | Alto | Verificar a versão do Python na `.venv` antes de instalar dependências. Documentar os passos de instalação no README. |
| Sistema não subir corretamente via Docker durante a apresentação | Baixa | Alto | Testar o Docker Compose completo antes da apresentação. Manter a opção de rodar localmente sem Docker como fallback. |
| Dificuldade de explicar o código em 15 minutos | Média | Médio | Preparar roteiro de apresentação com pontos específicos a mostrar. Usar o VS Code para navegar pelo código durante a explicação. |

---

## Registros de Decisão de Arquitetura

- [ADR-001: Abordagem de produto — Simulador web acadêmico com backend Python e frontend React](adrs/adr-001.md) — Decisão de usar backend Python + FastAPI e frontend TypeScript + React em vez de script de terminal ou dashboard pronto, por atender melhor os requisitos acadêmicos e de demonstração.

---

## Perguntas em Aberto

Nenhuma pergunta crítica em aberto. O documento `.specs/specs.md` define com clareza todos os requisitos, variáveis, regras, cenários, arquitetura, restrições de ambiente e critérios de aceite.

Decisões técnicas detalhadas (contratos de API, estrutura de pastas, estratégia de atualização em tempo real, frameworks de teste, configuração Docker e VS Code) serão definidas no TechSpec.
