# Automação Industrial: Simulador Web de Tratamento de Água

## Visão geral do projeto

Este projeto é um simulador web acadêmico de uma planta industrial de
tratamento de água. Ele demonstra instrumentação, variáveis de processo,
atuadores, alarmes, intertravamentos e uma Matriz de Causa e Efeito em uma
interface supervisória simplificada.

O backend Python com FastAPI simula a dinâmica da planta, a lógica de controle
e os efeitos da matriz. O frontend React com TypeScript representa a camada de
supervisão, exibindo sinóptico, variáveis, atuadores, alarmes e cenários de
demonstração.

Em uma arquitetura industrial real, a lógica de controle estaria em um CLP e a
operação seria feita por IHM/SCADA. Neste projeto acadêmico, o backend Python
representa conceitualmente o CLP e a dinâmica simulada da planta, enquanto o
frontend React representa uma tela supervisória didática.

## Como executar localmente com `.venv`

Use a `.venv` existente na raiz do projeto. Não é necessário criar outro
ambiente virtual.

Instale o backend em modo desenvolvimento:

```bash
source .venv/bin/activate && pip install -e backend/[dev]
```

Execute o backend:

```bash
source .venv/bin/activate
PYTHONPATH=backend/src uvicorn \
  automacao_industrial.aplicacao.fabrica_aplicacao:criar_aplicacao \
  --factory --reload --host 127.0.0.1 --port 8000
```

Instale e execute o frontend:

```bash
cd frontend
npm install
npm run dev
```

Com os dois serviços ativos, acesse o frontend em `http://localhost:5173`.
A API do backend fica disponível em `http://localhost:8000/api`.

## Como executar via Docker Compose

Execute o sistema completo, com backend e frontend, a partir da raiz do
projeto:

```bash
docker compose up --build
```

O frontend de produção é servido pelo nginx na porta `80` e encaminha chamadas
`/api/*` para o serviço `backend` na porta `8000` dentro da rede Docker.

Para parar os serviços:

```bash
docker compose down
```

## Como depurar no VS Code

As configurações de debug ficam em `.vscode/`.

Para depurar o backend:

1. Abra o projeto no VS Code.
2. Selecione a configuração `Backend Python`.
3. Inicie o debug. O VS Code usa `${workspaceFolder}/.venv/bin/python`.
4. Defina breakpoints no backend, por exemplo na Matriz de Causa e Efeito.

Para depurar o frontend:

1. Selecione a configuração `Frontend React`.
2. O VS Code executa a tarefa `Rodar frontend (dev)`.
3. O navegador abre `http://localhost:5173` com sourcemaps habilitados.
4. Defina breakpoints nos componentes TypeScript/React.

Também existem tarefas para instalar dependências, rodar backend, rodar testes
do backend, subir Docker Compose e derrubar Docker Compose.

## Estrutura do projeto

```text
.
├── backend/                  # API FastAPI, domínio, controle e simulação
│   ├── src/automacao_industrial/
│   └── tests/
├── frontend/                 # Interface supervisória React + TypeScript
│   └── src/
├── docs/                     # Documentação técnica e acadêmica
├── .vscode/                  # Debug e tarefas do VS Code
├── .compozy/                 # Artefatos do workflow Compozy
├── .specs/                   # Especificação principal do projeto
├── docker-compose.yml        # Execução completa em produção
└── docker-compose.dev.yml    # Execução em desenvolvimento
```

Documentos técnicos principais:

- `docs/pid-conceitual.md`: P&ID conceitual da planta.
- `docs/lista-instrumentos.md`: lista completa dos instrumentos.
- `docs/folha-dados-fit101.md`: folha de dados do FIT-101.
- `docs/arquitetura-automacao.md`: arquitetura em níveis de automação.
