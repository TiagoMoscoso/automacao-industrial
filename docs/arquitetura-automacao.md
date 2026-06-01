# Arquitetura de Automação

A arquitetura da planta é organizada em três níveis: campo, controle e
supervisão. Essa separação ajuda a explicar a função de cada camada em uma
planta industrial real e sua equivalência no simulador web acadêmico.

## Nível de campo

O nível de campo contém sensores, transmissores, atuadores, bombas, válvulas e
inversores instalados fisicamente na planta.

### Equipamentos

| Grupo | Equipamentos |
|---|---|
| Transmissores e analisadores | FIT-101, FIT-102, LIT-101, PIT-101, DPIT-101, TIT-101, AIT-101, AIT-102, AIT-103, FIT-201 |
| Atuadores | FV-101, XV-101 |
| Bombas e acionamentos | P-101, P-102, P-201, VFD-101 |

### Sinais esperados

| Tipo de sinal | Aplicação típica |
|---|---|
| 4–20 mA | Transmissores analógicos de vazão, nível, pressão e análise |
| HART | Diagnóstico e parametrização de instrumentos inteligentes |
| Sinais digitais | Estados e comandos discretos de bombas e válvulas on/off |
| Modbus RTU ou Modbus TCP | Comunicação com instrumentos ou inversores, se necessário |

## Nível de controle

O nível de controle contém o CLP, módulos de entrada e saída e equipamentos do
painel elétrico responsáveis por executar a lógica de automação.

### Equipamentos mínimos

| Equipamento | Função |
|---|---|
| CLP principal | Executar lógica de controle e Matriz de Causa e Efeito |
| Módulo de entrada analógica | Ler transmissores 4–20 mA |
| Módulo de saída analógica | Enviar comandos analógicos para atuadores compatíveis |
| Módulo de entrada digital | Ler estados discretos e falhas |
| Módulo de saída digital | Comandar bombas, válvulas e relés |
| Fonte 24 Vcc | Alimentar instrumentos e circuitos de controle |
| Relés de interface | Isolar e acionar cargas discretas |
| Disjuntores | Proteger circuitos elétricos |
| Bornes | Organizar interligações de campo e painel |
| Painel elétrico | Abrigar CLP, módulos e proteções |
| Nobreak ou UPS | Manter controle energizado em eventos curtos de falta |

### Funções

- Executar lógica de controle.
- Executar a Matriz de Causa e Efeito.
- Gerar alarmes.
- Comandar bombas e válvulas.
- Proteger a planta em condições críticas.

## Nível de supervisão

O nível de supervisão contém os recursos usados para operação, monitoramento,
registro e manutenção da planta.

### Equipamentos mínimos

| Equipamento | Função |
|---|---|
| IHM local | Operação próxima ao painel ou à planta |
| Estação SCADA | Supervisão centralizada da planta |
| Switch industrial | Comunicação entre CLP, IHM e estações |
| Servidor de alarmes | Registro e tratamento de alarmes |
| Historiador de dados | Armazenamento de variáveis ao longo do tempo |
| Estação de engenharia | Manutenção, ajustes e diagnóstico |

### Funções

- Visualizar variáveis.
- Reconhecer alarmes.
- Alterar modo de operação.
- Acompanhar tendências.
- Registrar histórico.
- Apoiar manutenção e operação.

## Equivalência entre sistema real e sistema simulado

Na arquitetura industrial real, o CLP executaria a lógica de controle e a
IHM/SCADA permitiria visualização e operação. Neste projeto acadêmico, o
Backend Python simula o CLP e parte da dinâmica da planta, enquanto o frontend
React simula uma tela supervisória simplificada.

| Sistema real | Sistema simulado |
|---|---|
| Instrumentos de campo | Estado de processo no backend |
| CLP | Backend Python |
| Matriz de intertravamento | Matriz de Causa e Efeito em Python |
| Bombas e válvulas | Ações de controle simuladas |
| IHM/SCADA | Frontend React |
| Histórico | Logs e estados temporais da simulação |
| Rede industrial | Comunicação HTTP entre frontend e backend |
