# specs.md — Automação Industrial: Simulador Web de Tratamento de Água

## 1. Visão geral

Este projeto tem como objetivo apoiar uma apresentação acadêmica de até 15 minutos sobre automação de uma planta industrial. A proposta será uma planta simplificada de tratamento de água industrial, com documentação técnica, arquitetura de automação, backend em Python para simular o processo e frontend em TypeScript + React para visualizar e interagir com a planta.

O sistema deve permitir que o usuário visualize a linha de processo industrial, acompanhe variáveis em tempo real, altere valores de entrada, acione cenários de falha e veja os efeitos da matriz de Causa e Efeito sobre bombas, válvulas, alarmes e liberação do processo.

O projeto deve ser conduzido de forma incremental, seguindo boas práticas de uso do Compozy: primeiro documentação e especificação, depois PRD, depois TechSpec, depois tasks pequenas, depois execução task por task, depois revisão e validação final.

Nenhum agente deve tentar implementar o projeto inteiro de uma vez. O trabalho deve ser quebrado em tasks pequenas, sequenciais, verificáveis e armazenadas em `.tasks/`.

---

## 2. Objetivo acadêmico

A apresentação deve atender aos seguintes requisitos da disciplina:

1. Selecionar uma planta industrial e identificar no mínimo 10 variáveis, incluindo variáveis de processo e/ou variáveis manipuladas.
2. Elaborar um P&ID com identificação dos instrumentos e lista de instrumentos.
3. Elaborar 1 folha de dados de 1 instrumento com no mínimo 10 especificações técnicas.
4. Elaborar uma arquitetura de automação com especificação mínima dos equipamentos necessários.
5. Elaborar um exemplo de algoritmo de controle para implementar uma matriz de Causa e Efeito.

Além disso, o projeto terá uma demonstração computacional:

1. Backend em Python simulando a planta industrial.
2. Frontend em TypeScript + React permitindo visualizar e manipular a simulação.
3. Execução completa via Docker Compose.
4. Configuração do VS Code para depurar backend e frontend separadamente.

---

## 3. Planta industrial escolhida

A planta escolhida é uma planta de tratamento de água industrial para uso em processo produtivo ou alimentação de caldeira.

Fluxo conceitual da planta:

```text
Água bruta
  -> válvula de entrada
  -> medidor de vazão
  -> bomba principal
  -> filtro industrial
  -> tanque de água tratada
  -> dosagem química
  -> bomba de saída
  -> processo industrial ou caldeira
```

A planta também deve prever uma linha de descarte para água fora de especificação.

A simulação deve tratar essa planta como uma pequena linha de processo industrial. O foco não é simular física com precisão científica, mas demonstrar automação, controle, instrumentação, intertravamentos e lógica de segurança.

---

## 4. Papel do Python no projeto

Python será usado como backend e simulador didático da lógica de controle e do comportamento simplificado da planta.

Python não deve ser apresentado como substituto direto de um CLP industrial. Na apresentação, a explicação correta é:

> O Python representa uma simulação da lógica de controle e intertravamento da planta. Em uma aplicação industrial real, essa lógica seria implementada em um CLP, edge controller industrial ou sistema supervisório integrado à automação.

O backend Python deve demonstrar:

- variáveis de processo;
- variáveis manipuladas;
- comportamento simplificado do tanque;
- comportamento simplificado do filtro;
- controle de bombas e válvulas;
- alarmes;
- intertravamentos;
- matriz de Causa e Efeito;
- API para leitura do estado da planta;
- API para alteração de variáveis e acionamento de cenários;
- atualização contínua da simulação.

---

## 5. Papel do frontend TypeScript + React

O frontend será uma interface visual para o usuário observar e interagir com a planta industrial simulada.

O frontend deve permitir:

- visualizar um sinóptico simplificado da planta, inspirado em uma tela de supervisório/SCADA;
- ver estado de bombas, válvulas, tanque, filtro, linha de descarte e saída para processo;
- acompanhar variáveis como nível, pressão, pH, turbidez, condutividade e vazão;
- alterar valores de variáveis manualmente para provocar condições de falha;
- executar cenários prontos, como operação normal, nível alto, pH fora da faixa, turbidez alta e emergência;
- iniciar, pausar e reiniciar a simulação;
- visualizar alarmes ativos;
- visualizar se o processo está liberado ou bloqueado;
- demonstrar claramente a matriz de Causa e Efeito em ação.

O frontend não deve conter regra de controle industrial. Ele deve apenas exibir dados e enviar comandos para o backend.

---

## 6. Regras obrigatórias para execução com Compozy

### 6.1. Execução em fases

O fluxo obrigatório do projeto deve seguir esta ordem:

1. `specs.md`
2. PRD
3. TechSpec
4. Criação das tasks
5. Execução das tasks, uma por vez
6. Revisão intermediária
7. Verificação final
8. Preparação da apresentação

Não pular fases.
Não executar código antes da fase de tasks.
Não criar implementação antes de validar PRD, TechSpec e tasks.

### 6.2. Consulta obrigatória das skills

Antes de executar qualquer fase do Compozy, o agente deve consultar as skills disponíveis no repositório.

Pastas obrigatórias a consultar:

```text
.agents/skills/
.claude/skills/
```

Skills esperadas no projeto:

```text
cy-create-prd
cy-create-techspec
cy-create-tasks
cy-execute-task
cy-fix-reviews
cy-review-round
cy-workflow-memory
```

Antes de criar PRD, TechSpec, tasks ou executar uma task, o agente deve:

1. localizar a skill correspondente;
2. ler o arquivo de instruções da skill, normalmente `SKILL.md` ou equivalente;
3. verificar se existe diferença entre a skill em `.agents/skills` e `.claude/skills`;
4. seguir a versão mais adequada ao runtime usado;
5. registrar qualquer divergência relevante no documento de memória do workflow.

Se uma skill local contradisser este `specs.md`, o agente não deve decidir silenciosamente. Ele deve registrar o conflito e pedir confirmação.

### 6.3. Diretórios de artefatos do Compozy

O Compozy trabalha com artefatos markdown versionáveis para PRD, TechSpec, tasks, revisão e memória.

Diretório recomendado para artefatos do workflow Compozy:

```text
.compozy/tasks/automacao-industrial-tratamento-agua/
```

Esse diretório deve ser usado para artefatos próprios do fluxo Compozy, como PRD, TechSpec, ADRs, memória e arquivos gerados automaticamente pelas skills, salvo se as skills locais indicarem outro caminho.

Se as skills locais recomendarem outro caminho para PRDs, TechSpecs ou memória, o agente deve seguir a recomendação da skill e registrar a decisão em memória. O PRD deve citar explicitamente onde cada artefato será salvo.

### 6.4. Diretório obrigatório das tasks do projeto

Além dos artefatos internos do Compozy, este projeto deve manter uma fila legível de tasks em:

```text
.tasks/
```

Todas as tasks planejadas para execução sequencial devem estar em `.tasks/`.

Formato recomendado:

```text
.tasks/
  000-criar-prd.md
  001-criar-techspec.md
  002-definir-variaveis-processo.md
  003-criar-pid-conceitual.md
  004-criar-lista-instrumentos.md
  005-criar-folha-dados-fit-101.md
  006-definir-arquitetura-automacao.md
  007-definir-matriz-causa-efeito.md
  008-especificar-backend-python.md
  009-especificar-frontend-react.md
  010-especificar-docker.md
  011-especificar-vscode-debug.md
  012-criar-estrutura-monorepo.md
  013-implementar-dominio-backend.md
  014-implementar-matriz-causa-efeito.md
  015-implementar-simulador-planta.md
  016-implementar-api-backend.md
  017-implementar-front-sinotico.md
  018-implementar-controles-front.md
  019-integrar-front-back.md
  020-configurar-docker-compose.md
  021-configurar-vscode-debug.md
  022-criar-testes-backend.md
  023-criar-testes-frontend.md
  024-criar-readme.md
  025-criar-roteiro-apresentacao.md
  026-revisao-final.md
```

Cada task deve ser pequena, objetiva e verificável.

Cada arquivo de task deve conter:

- título;
- objetivo;
- contexto;
- entradas;
- saídas esperadas;
- restrições;
- critérios de aceite;
- status;
- dependências;
- validações necessárias.

---

## 7. Requisitos obrigatórios para o PRD

O PRD deve ser criado somente depois da leitura deste `specs.md` e das skills locais relacionadas a PRD.

O PRD deve especificar obrigatoriamente:

1. O produto será composto por backend Python e frontend TypeScript + React.
2. O backend Python será responsável por simular a linha de processo industrial de tratamento de água.
3. O frontend React será responsável por visualizar o processo industrial, alterar variáveis, acionar cenários e exibir alarmes.
4. O sistema deve poder rodar inteiro via Docker Compose.
5. O VS Code deve ser configurado para permitir depuração separada do backend e do frontend.
6. O backend local deve usar obrigatoriamente a `.venv` já criada pelo usuário.
7. O código, comentários, mensagens, nomes de domínio, documentação e textos de interface devem estar 100% em português do Brasil, respeitando exceções técnicas inevitáveis.
8. O projeto deve seguir Clean Code, SOLID, separação por camadas, testes e responsabilidades bem definidas.
9. As tasks devem ser criadas em `.tasks/` e executadas uma por vez.
10. O PRD deve separar claramente o que é requisito acadêmico, requisito de produto, requisito técnico e requisito de demonstração.

O PRD não deve implementar código. Ele deve definir o produto, os usuários, os objetivos, os fluxos principais, os critérios de aceite e os limites do escopo.

---

## 8. Requisitos obrigatórios para o TechSpec

O TechSpec deve ser criado somente depois da aprovação do PRD.

O TechSpec deve especificar obrigatoriamente:

1. Arquitetura do monorepo.
2. Arquitetura interna do backend Python.
3. Arquitetura interna do frontend React.
4. Contratos da API entre frontend e backend.
5. Estratégia de atualização da simulação em tempo real.
6. Estratégia de Docker Compose.
7. Estratégia de depuração no VS Code.
8. Estratégia de testes.
9. Limites operacionais da planta.
10. Matriz de Causa e Efeito.
11. Estrutura de pastas.
12. Decisões técnicas e justificativas.

O TechSpec deve ser detalhado o suficiente para permitir criação de tasks sem ambiguidade.

---

## 9. Arquitetura geral do produto

O produto deve ser organizado como um monorepo:

```text
automacao-industrial/
  backend/
  frontend/
  docs/
  .tasks/
  .vscode/
  .compozy/
  docker-compose.yml
  docker-compose.dev.yml
  README.md
```

Arquitetura conceitual:

```text
Usuário
  ↓
Frontend React + TypeScript
  ↓ HTTP/WebSocket ou SSE
Backend Python
  ↓
Motor de simulação da planta
  ↓
Matriz de Causa e Efeito
  ↓
Estado da planta, alarmes e ações de controle
```

O frontend não deve acessar regras internas de controle. Toda decisão da planta deve vir do backend.

---

## 10. Arquitetura do backend Python

### 10.1. Responsabilidade do backend

O backend deve ser responsável por:

- manter o estado atual da planta;
- executar o loop de simulação;
- aplicar a matriz de Causa e Efeito;
- calcular ações de controle;
- expor endpoints para consulta do estado;
- expor endpoints para alteração manual de variáveis;
- expor endpoints para execução de cenários prontos;
- expor endpoints para iniciar, pausar e reiniciar a simulação;
- disponibilizar atualizações para o frontend.

### 10.2. Framework sugerido

O backend deve usar Python com uma API HTTP simples.

Framework sugerido:

```text
FastAPI
```

Justificativa:

- simples para APIs didáticas;
- bom suporte a tipagem;
- documentação automática;
- integração fácil com frontend;
- adequado para depuração local;
- adequado para Docker.

### 10.3. Comunicação em tempo real

A atualização do frontend pode usar uma das opções abaixo:

1. polling HTTP simples a cada intervalo curto;
2. Server-Sent Events;
3. WebSocket.

Para o escopo inicial, preferir a solução mais simples e robusta. A decisão final deve ser tomada no TechSpec.

Se a escolha for polling, o frontend pode consultar `GET /api/planta/estado` a cada 500 ms ou 1000 ms.

### 10.4. Estrutura recomendada do backend

```text
backend/
  src/
    automacao_industrial/
      dominio/
        estado_processo.py
        acoes_controle.py
        alarme.py
        limites_operacionais.py
        tags_instrumentos.py
      controle/
        matriz_causa_efeito.py
        regras_causa_efeito.py
        controlador_tratamento_agua.py
      simulacao/
        simulador_planta.py
        cenarios_simulacao.py
        servico_simulacao.py
      api/
        app.py
        rotas_planta.py
        esquemas.py
      aplicacao/
        configuracao.py
        fabrica_aplicacao.py
  tests/
    test_matriz_causa_efeito.py
    test_controlador_tratamento_agua.py
    test_simulador_planta.py
    test_api_planta.py
  pyproject.toml
  Dockerfile
  README.md
```

### 10.5. Camada de domínio

Responsável por representar conceitos centrais:

- estado atual da planta;
- ações de controle;
- alarmes;
- limites operacionais;
- tags de instrumentos.

Essa camada não deve saber como API, terminal, frontend ou Docker funcionam.

### 10.6. Camada de controle

Responsável por decidir o que fazer com base no estado da planta.

Deve conter:

- matriz de Causa e Efeito;
- regras de intertravamento;
- controlador principal.

Essa camada recebe um estado de processo e retorna ações de controle.

### 10.7. Camada de simulação

Responsável por atualizar a planta ao longo do tempo.

Exemplos:

- se a bomba de entrada está ligada, o nível tende a subir;
- se a bomba de saída está ligada, o nível tende a cair;
- se o filtro opera por muito tempo, a pressão diferencial tende a aumentar;
- se a dosagem química falha, o pH pode sair da faixa;
- se a água fica fora de especificação, a lógica deve bloquear a saída.

### 10.8. Camada de API

Responsável por expor o backend para o frontend.

Endpoints mínimos sugeridos:

```text
GET  /api/saude
GET  /api/planta/estado
POST /api/planta/iniciar
POST /api/planta/pausar
POST /api/planta/reiniciar
POST /api/planta/variaveis
POST /api/planta/cenarios/{nome_cenario}
```

O TechSpec deve definir os payloads exatos.

---

## 11. Arquitetura do frontend TypeScript + React

### 11.1. Responsabilidade do frontend

O frontend deve ser responsável por:

- apresentar uma tela visual da planta;
- exibir variáveis de processo;
- exibir estados dos atuadores;
- exibir alarmes;
- permitir alteração manual de variáveis;
- permitir execução de cenários prontos;
- permitir iniciar, pausar e reiniciar a simulação;
- representar visualmente a linha de processo.

O frontend não deve conter lógica de intertravamento. Ele apenas envia comandos e exibe o estado calculado pelo backend.

### 11.2. Stack sugerida

```text
TypeScript
React
Vite
```

Bibliotecas opcionais:

```text
React Router, apenas se houver mais de uma tela.
Biblioteca de ícones, apenas se simplificar a interface.
Biblioteca de gráficos, apenas se realmente necessária.
```

Evitar complexidade desnecessária. A apresentação precisa ser clara, não pirotécnica.

### 11.3. Estrutura recomendada do frontend

```text
frontend/
  src/
    dominio/
      estadoPlanta.ts
      alarme.ts
      acoesControle.ts
    servicos/
      clienteApiPlanta.ts
    componentes/
      SinoticoPlanta.tsx
      CartaoVariavel.tsx
      PainelAlarmes.tsx
      PainelAtuadores.tsx
      PainelCenarios.tsx
      ControleSimulacao.tsx
    paginas/
      PaginaPrincipal.tsx
    estilos/
      principal.css
    App.tsx
    main.tsx
  package.json
  tsconfig.json
  vite.config.ts
  Dockerfile
  README.md
```

### 11.4. Tela principal esperada

A tela principal deve conter:

1. Sinóptico da planta.
2. Painel de variáveis.
3. Painel de atuadores.
4. Painel de alarmes.
5. Botões de controle da simulação.
6. Botões de cenários.
7. Formulário ou sliders para alterar variáveis.

Representação visual mínima:

```text
[Água Bruta] -> [FV-101] -> [FIT-101] -> [P-101] -> [Filtro F-101] -> [Tanque T-101] -> [P-102] -> [Processo]
                                                                  |
                                                                  -> [XV-101 Descarte]

[TK-201] -> [P-201] -> [FIT-201] -> injeção química
```

O estilo deve lembrar uma tela supervisória simples, moderna e didática.

---

## 12. Regras obrigatórias de ambiente Python

### 12.1. Uso obrigatório da `.venv`

O backend Python deve usar obrigatoriamente a `.venv` já criada pelo usuário para execução local e depuração no VS Code.

O agente não deve criar outro ambiente virtual.
O agente não deve instalar dependências globalmente.
O agente não deve usar Python do sistema diretamente para executar o backend local.

Antes de rodar qualquer comando Python local, o agente deve verificar a existência da `.venv`.

Comandos esperados no Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
python --version
python -m pip --version
```

Comandos esperados em Linux/macOS:

```bash
source .venv/bin/activate
python --version
python -m pip --version
```

Se a `.venv` não existir, o agente deve parar e pedir confirmação antes de criar qualquer ambiente.

### 12.2. Dependências Python

Dependências sugeridas para o backend:

- `fastapi` para API;
- `uvicorn` para servidor ASGI;
- `pydantic` quando necessário para modelos de entrada e saída;
- `pytest` para testes;
- `ruff` para lint e formatação;
- `httpx` para testes de API, se necessário.

Evitar dependências pesadas, dashboards complexos ou bibliotecas científicas desnecessárias.

### 12.3. Arquivos de configuração Python

Arquivos esperados no backend:

```text
backend/pyproject.toml
backend/README.md
backend/.gitignore ou .gitignore na raiz
```

O `pyproject.toml` deve configurar:

- versão mínima do Python;
- dependências de produção;
- dependências de desenvolvimento;
- regras do Ruff;
- estilo de formatação;
- configuração básica de testes.

---

## 13. Regras obrigatórias de ambiente frontend

O frontend deve usar Node.js e npm ou pnpm. A escolha deve ser definida no TechSpec.

Arquivos esperados:

```text
frontend/package.json
frontend/tsconfig.json
frontend/vite.config.ts
frontend/README.md
```

Scripts mínimos esperados:

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint ."
}
```

Se for usado ESLint/Prettier, as regras devem preservar legibilidade e consistência, sem excesso cerimonial.

---

## 14. Regras obrigatórias de Docker

O projeto deve poder rodar por Docker Compose.

Arquivos esperados:

```text
docker-compose.yml
docker-compose.dev.yml
backend/Dockerfile
frontend/Dockerfile
.dockerignore
```

Serviços mínimos:

```text
backend
frontend
```

Portas sugeridas:

```text
backend: 8000
frontend: 5173 em desenvolvimento ou 80 em build final
```

O Docker Compose deve permitir:

- subir backend e frontend juntos;
- acessar o frontend no navegador;
- o frontend se comunicar com o backend;
- facilitar demonstração em sala;
- manter configuração simples o bastante para não roubar tempo da apresentação.

Comandos esperados:

```bash
docker compose up --build
```

Para desenvolvimento, o `docker-compose.dev.yml` pode montar volumes e usar hot reload, desde que isso não complique o projeto.

---

## 15. Regras obrigatórias de VS Code e debug

O projeto deve incluir configuração do VS Code para depurar cada parte separadamente.

Diretório esperado:

```text
.vscode/
  launch.json
  tasks.json
  settings.json
  extensions.json
```

### 15.1. Debug do backend

O VS Code deve permitir executar e depurar o backend Python localmente usando a `.venv`.

Configuração esperada:

- apontar o interpretador Python para `.venv`;
- executar o servidor FastAPI/Uvicorn;
- permitir breakpoints no backend;
- usar variáveis de ambiente de desenvolvimento;
- não depender de Python global.

### 15.2. Debug do frontend

O VS Code deve permitir executar e depurar o frontend React.

Configuração esperada:

- iniciar o servidor Vite;
- abrir Chrome ou Edge em modo debug;
- permitir breakpoints no TypeScript/React;
- usar sourcemaps;
- consumir o backend local ou Docker conforme configuração.

### 15.3. Tasks do VS Code

Tasks úteis esperadas:

- instalar dependências do backend usando `.venv`;
- rodar backend;
- rodar testes do backend;
- instalar dependências do frontend;
- rodar frontend;
- rodar Docker Compose;
- derrubar Docker Compose.

---

## 16. Regras obrigatórias de linguagem do código

Todo o código autoral do projeto deve estar em português do Brasil.

Isso inclui:

- nomes de módulos;
- nomes de pacotes;
- nomes de classes;
- nomes de métodos;
- nomes de funções;
- nomes de variáveis;
- nomes de constantes;
- mensagens exibidas na API ou interface;
- mensagens de erro;
- mensagens de alarme;
- comentários;
- docstrings;
- documentação técnica do projeto;
- textos visíveis no frontend.

Exceções permitidas:

- palavras reservadas das linguagens;
- APIs de bibliotecas externas, como `useState`, `useEffect`, `FastAPI`, `BaseModel`, `pytest`, `describe`, `it`;
- nomes de arquivos padronizados, como `README.md`, `package.json`, `pyproject.toml`, `Dockerfile`;
- nomes de tags industriais, como `FIT-101`, `PIT-101`, `LIT-101`;
- nomes técnicos inevitáveis, como `React`, `TypeScript`, `Vite`, `Docker`, `FastAPI`.

Comentários e docstrings devem ser 100% em português do Brasil, com explicações claras, didáticas e úteis.

Evitar comentários óbvios. Comentários devem explicar regra de negócio, decisão de projeto ou comportamento da simulação.

Exemplo de estilo desejado:

```python
# A bomba de saída só pode operar quando houver nível mínimo no tanque.
# Essa regra evita cavitação e representa um intertravamento básico de proteção.
```

Exemplo de estilo proibido:

```python
# incrementa x
```

---

## 17. Boas práticas obrigatórias de código

O projeto deve seguir Clean Code, SOLID e separação clara de responsabilidades.

### 17.1. Regras gerais

- Não criar script monolítico.
- Não misturar simulação, controle, API, interface e modelos no mesmo arquivo.
- Usar type hints em todo o backend Python.
- Usar tipagem explícita no frontend TypeScript.
- Usar `dataclasses` ou modelos Pydantic no backend conforme a responsabilidade.
- Preferir funções pequenas e classes coesas.
- Evitar funções com muitos parâmetros.
- Evitar acoplamento desnecessário.
- Evitar estado global mutável sem encapsulamento.
- Evitar números mágicos espalhados pelo código.
- Centralizar limites operacionais em uma configuração ou classe própria.
- Escrever testes para a matriz de Causa e Efeito.
- Escrever testes básicos para API e frontend quando viável.

### 17.2. Princípios SOLID aplicados

#### Responsabilidade única

Cada módulo deve ter uma responsabilidade clara:

- domínio representa estado e entidades;
- controle decide ações;
- matriz de Causa e Efeito aplica regras;
- simulação atualiza a planta ao longo do tempo;
- API expõe comandos e consultas;
- frontend apresenta dados e captura interações do usuário.

#### Aberto/fechado

Deve ser fácil adicionar novas regras de causa e efeito sem reescrever o controlador inteiro.

#### Substituição de Liskov

Caso sejam usadas abstrações, implementações alternativas devem poder substituir as originais sem quebrar o comportamento esperado.

#### Segregação de interface

Evitar interfaces grandes. Se houver contratos, eles devem ser pequenos e específicos.

#### Inversão de dependência

O controlador não deve depender diretamente da API ou do frontend. A API deve depender do controlador, não o contrário. O frontend deve depender de contratos HTTP, não de detalhes internos do backend.

---

## 18. Variáveis de processo e manipuladas

### 18.1. Variáveis de processo mínimas

| Tag | Variável | Unidade | Tipo |
|---|---|---:|---|
| FIT-101 | Vazão de entrada de água bruta | m³/h | Processo |
| FIT-102 | Vazão de saída para processo | m³/h | Processo |
| LIT-101 | Nível do tanque de água tratada | % | Processo |
| PIT-101 | Pressão da linha principal | bar | Processo |
| DPIT-101 | Pressão diferencial do filtro | bar | Processo |
| TIT-101 | Temperatura da água | °C | Processo |
| AIT-101 | pH da água tratada | pH | Processo |
| AIT-102 | Turbidez da água | NTU | Processo |
| AIT-103 | Condutividade da água | µS/cm | Processo |
| FIT-201 | Vazão de dosagem química | L/h | Processo |

### 18.2. Variáveis manipuladas mínimas

| Tag | Variável | Tipo |
|---|---|---|
| P-101 | Estado da bomba principal | Manipulada discreta |
| P-102 | Estado da bomba de saída | Manipulada discreta |
| P-201 | Estado da bomba dosadora | Manipulada discreta |
| FV-101 | Abertura da válvula de entrada | Manipulada analógica |
| XV-101 | Estado da válvula de descarte | Manipulada discreta |

---

## 19. P&ID conceitual

O P&ID deve representar o seguinte arranjo:

```text
Água Bruta
   |
 FV-101
   |
 FIT-101
   |
 P-101 ---- VFD-101
   |
 PIT-101
   |
 Filtro F-101
   |
 DPIT-101
   |
 Tanque T-101
   |------------- LIT-101
   |------------- TIT-101
   |------------- AIT-101 pH
   |------------- AIT-102 Turbidez
   |------------- AIT-103 Condutividade
   |
 P-102
   |
 FIT-102
   |
 Saída para Processo/Caldeira

Tanque Químico TK-201
   |
 P-201
   |
 FIT-201
   |
 Injeção química antes do tanque

Linha de descarte:
Tanque T-101 -> XV-101 -> Descarte
```

O P&ID final pode ser feito em draw.io, PowerPoint, Lucidchart, Mermaid ou outra ferramenta visual, desde que os instrumentos estejam identificados por tag.

---

## 20. Lista de instrumentos

| Tag | Instrumento | Função |
|---|---|---|
| FIT-101 | Transmissor indicador de vazão | Mede a vazão de entrada de água bruta |
| FIT-102 | Transmissor indicador de vazão | Mede a vazão de saída para o processo |
| LIT-101 | Transmissor indicador de nível | Mede o nível do tanque T-101 |
| PIT-101 | Transmissor indicador de pressão | Mede a pressão da linha principal |
| DPIT-101 | Transmissor indicador de pressão diferencial | Mede a saturação do filtro F-101 |
| TIT-101 | Transmissor indicador de temperatura | Mede a temperatura da água |
| AIT-101 | Analisador indicador de pH | Mede o pH da água tratada |
| AIT-102 | Analisador indicador de turbidez | Mede a turbidez da água |
| AIT-103 | Analisador indicador de condutividade | Mede a condutividade da água |
| FIT-201 | Transmissor indicador de vazão química | Mede a vazão de dosagem química |
| FV-101 | Válvula de controle | Controla a entrada de água bruta |
| XV-101 | Válvula on/off de descarte | Desvia água fora de especificação |
| P-101 | Bomba principal | Bombeia água para o filtro |
| P-102 | Bomba de saída | Envia água tratada ao processo |
| P-201 | Bomba dosadora | Injeta produto químico |
| VFD-101 | Inversor de frequência | Controla a velocidade da bomba P-101 |

---

## 21. Folha de dados escolhida

Instrumento escolhido:

```text
FIT-101 — Transmissor de Vazão Eletromagnético
```

Motivo:

O transmissor de vazão eletromagnético é adequado para líquidos condutivos, como água industrial. Ele é comum em plantas de tratamento de água e pode se integrar a sistemas de automação por sinais industriais.

Especificações mínimas:

| Item | Especificação |
|---|---|
| Tag | FIT-101 |
| Serviço | Medição da vazão de água bruta |
| Tipo | Medidor de vazão eletromagnético |
| Fluido | Água industrial |
| Faixa de medição | 0 a 50 m³/h |
| Sinal de saída | 4–20 mA |
| Comunicação | HART ou Modbus RTU |
| Alimentação | 24 Vcc |
| Precisão | ±0,5% da leitura |
| Diâmetro nominal | DN50 |
| Material dos eletrodos | Aço inox 316L |
| Material do corpo | Aço carbono revestido |
| Grau de proteção | IP67 |
| Temperatura de operação | 0 a 80 °C |
| Pressão máxima | 10 bar |
| Instalação | Tubulação horizontal com trecho reto antes e depois do sensor |

---

## 22. Arquitetura de automação industrial

A arquitetura real deve ser apresentada em camadas.

### 22.1. Nível de campo

Contém sensores, transmissores, atuadores, bombas, válvulas e inversores.

Equipamentos:

- FIT-101;
- FIT-102;
- LIT-101;
- PIT-101;
- DPIT-101;
- TIT-101;
- AIT-101;
- AIT-102;
- AIT-103;
- FIT-201;
- FV-101;
- XV-101;
- P-101;
- P-102;
- P-201;
- VFD-101.

Sinais esperados:

- 4–20 mA;
- HART;
- sinais digitais;
- Modbus RTU ou Modbus TCP, se necessário.

### 22.2. Nível de controle

Contém o CLP e os módulos de entrada e saída.

Equipamentos mínimos:

- CLP principal;
- módulo de entrada analógica;
- módulo de saída analógica;
- módulo de entrada digital;
- módulo de saída digital;
- fonte 24 Vcc;
- relés de interface;
- disjuntores;
- bornes;
- painel elétrico;
- nobreak ou UPS para controle.

Funções:

- executar lógica de controle;
- executar matriz de Causa e Efeito;
- gerar alarmes;
- comandar bombas e válvulas;
- proteger a planta em condições críticas.

### 22.3. Nível de supervisão

Contém a operação e monitoramento da planta.

Equipamentos mínimos:

- IHM local;
- estação SCADA;
- switch industrial;
- servidor de alarmes;
- historiador de dados;
- estação de engenharia.

Funções:

- visualizar variáveis;
- reconhecer alarmes;
- alterar modo de operação;
- acompanhar tendências;
- registrar histórico;
- apoiar manutenção e operação.

### 22.4. Relação entre arquitetura real e sistema web simulado

Na arquitetura industrial real, o CLP executaria a lógica de controle e a IHM/SCADA permitiria visualização e operação.

Neste projeto acadêmico, o backend Python simula o CLP e parte da dinâmica da planta, enquanto o frontend React simula uma tela supervisória simplificada.

Equivalência conceitual:

| Sistema real | Sistema simulado |
|---|---|
| Instrumentos de campo | Estado de processo no backend |
| CLP | Controlador Python |
| Matriz de intertravamento | Matriz de Causa e Efeito em Python |
| Bombas e válvulas | Ações de controle simuladas |
| IHM/SCADA | Frontend React |
| Histórico | Logs e estados temporais da simulação |
| Rede industrial | Comunicação HTTP entre frontend e backend |

---

## 23. Matriz de Causa e Efeito

| Causa | Condição | Efeito |
|---|---|---|
| Emergência acionada | `emergencia_acionada == True` | Desliga bombas, fecha válvulas e bloqueia processo |
| Nível alto-alto | `nivel_tanque_percentual >= 95` | Para P-101 e fecha FV-101 |
| Nível baixo-baixo | `nivel_tanque_percentual <= 10` | Para P-102 para evitar cavitação |
| Pressão alta | `pressao_linha_bar > 8` | Para P-101 e gera alarme |
| Filtro saturado | `pressao_diferencial_filtro_bar > 1.5` | Gera alarme de manutenção |
| pH fora da faixa | `ph < 6.5` ou `ph > 8.5` | Bloqueia envio ao processo |
| Turbidez alta | `turbidez_ntu > 5` | Bloqueia processo e abre descarte |
| Condutividade alta | `condutividade_us_cm > 1200` | Bloqueia envio ao processo |
| Falha na dosadora | `bomba_dosadora_em_falha == True` | Bloqueia operação automática |
| Operação normal | Variáveis dentro dos limites | Libera bombas, válvulas e saída para processo |

---

## 24. Escopo do backend Python

### 24.1. Deve implementar

- estado da planta;
- limites operacionais;
- ações de controle;
- alarmes;
- matriz de Causa e Efeito;
- controlador da planta;
- simulação temporal simplificada;
- cenários de demonstração;
- API HTTP para frontend;
- testes unitários principais;
- testes básicos de API.

### 24.2. Não deve implementar inicialmente

- comunicação real com CLP;
- MQTT;
- OPC UA;
- SCADA real;
- integração com sensores reais;
- controle PID complexo;
- simulação física precisa;
- banco de dados persistente;
- autenticação de usuário.

Esses itens podem ser mencionados como possíveis evoluções, mas não fazem parte do escopo inicial.

---

## 25. Escopo do frontend React

### 25.1. Deve implementar

- tela principal da planta;
- sinóptico visual simplificado;
- painel de variáveis;
- painel de atuadores;
- painel de alarmes;
- botões de cenários;
- controles para iniciar, pausar e reiniciar;
- formulário ou sliders para alterar variáveis;
- integração com API do backend;
- tratamento visual de estados críticos.

### 25.2. Não deve implementar inicialmente

- autenticação;
- múltiplas páginas complexas;
- banco de dados;
- editor gráfico de P&ID;
- controle industrial real;
- gráficos históricos complexos;
- gerenciamento global sofisticado se estado local for suficiente.

---

## 26. Cenários de demonstração

### 26.1. Operação normal

Condições:

- nível: 70%;
- pressão: 5 bar;
- pH: 7,2;
- turbidez: 2 NTU;
- condutividade: 850 µS/cm;
- emergência: falso.

Resultado esperado:

- P-101 ligada;
- P-102 ligada;
- FV-101 aberta;
- processo liberado;
- sem alarmes.

### 26.2. Nível alto-alto

Condição:

- nível: 96%.

Resultado esperado:

- P-101 desligada;
- FV-101 fechada;
- alarme de nível alto-alto.

### 26.3. Nível baixo-baixo

Condição:

- nível: 8%.

Resultado esperado:

- P-102 desligada;
- processo bloqueado;
- alarme de nível baixo-baixo.

### 26.4. pH fora da faixa

Condição:

- pH: 9,1.

Resultado esperado:

- P-102 desligada;
- processo bloqueado;
- alarme de pH fora da faixa.

### 26.5. Turbidez alta

Condição:

- turbidez: 7 NTU.

Resultado esperado:

- processo bloqueado;
- válvula de descarte aberta;
- alarme de turbidez alta.

### 26.6. Emergência

Condição:

- emergência acionada.

Resultado esperado:

- todas as bombas desligadas;
- válvulas fechadas;
- processo bloqueado;
- alarme crítico ativo.

---

## 27. Critérios gerais de aceite do projeto

O projeto só deve ser considerado pronto quando:

1. a apresentação couber em até 15 minutos;
2. a planta tiver no mínimo 10 variáveis identificadas;
3. o P&ID conceitual estiver coerente com a lista de instrumentos;
4. a folha de dados tiver no mínimo 10 especificações técnicas;
5. a arquitetura de automação diferenciar campo, controle e supervisão;
6. a matriz de Causa e Efeito tiver causas, condições e efeitos claros;
7. o backend Python estiver modular, testável e em português do Brasil;
8. o frontend React estiver funcional, legível e em português do Brasil;
9. o usuário conseguir visualizar a planta, alterar variáveis e acionar cenários;
10. os testes principais passarem;
11. o backend local rodar usando obrigatoriamente a `.venv` existente;
12. o projeto inteiro rodar via Docker Compose;
13. o VS Code permitir depurar backend e frontend separadamente;
14. as tasks estiverem em `.tasks/`;
15. os artefatos Compozy estiverem no diretório definido ou justificados conforme as skills locais;
16. o README explicar como executar localmente, via Docker e via VS Code;
17. a simulação conseguir demonstrar pelo menos operação normal, nível alto, pH fora da faixa, turbidez alta e emergência.

---

## 28. Ordem recomendada das próximas ações

A sequência recomendada é:

1. Validar este `specs.md`.
2. Criar o PRD usando a skill `cy-create-prd`.
3. Garantir que o PRD inclua backend Python, frontend React, Docker e VS Code debug.
4. Criar o TechSpec usando a skill `cy-create-techspec`.
5. Criar as tasks usando a skill `cy-create-tasks`.
6. Garantir que as tasks foram colocadas ou espelhadas em `.tasks/`.
7. Executar uma task por vez usando `cy-execute-task`.
8. Rodar testes e validações depois de cada bloco relevante.
9. Fazer revisão final usando as skills de review.

Nenhum agente deve iniciar implementação antes da aprovação do PRD, TechSpec e tasks.

---

## 29. Princípio de condução

Este projeto deve ser tratado como engenharia, não como geração impulsiva de código.

A ordem correta é:

```text
entender -> especificar -> planejar -> quebrar em tasks -> executar -> testar -> revisar -> apresentar
```

A qualidade do projeto depende mais da disciplina da execução do que da quantidade de código gerado.