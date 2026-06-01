---
status: completed
title: Criar modelo conceitual da arquitetura de automação
type: frontend
complexity: medium
dependencies:
  - task_27
---

# Task 36: Criar modelo conceitual da arquitetura de automação

## Overview

Criar uma fonte de dados centralizada em TypeScript representando a arquitetura de automação completa da planta de tratamento de água. O modelo organiza os equipamentos e sistemas em quatro camadas (campo, controle, supervisão e rede), com uma quinta seção de equivalência entre o sistema industrial real e o sistema web simulado. Este modelo será importado pelos componentes React das tasks 37 e 38, garantindo que a apresentação didática seja sempre coerente com uma única fonte de verdade.

<critical>
- ALWAYS READ o `_prd.md`, o `specs.md` e a `task_27.md` antes de começar
- REFERENCE specs.md seção de domínio do frontend e a lista de instrumentos do P&ID
- FOCUS ON "WHAT" — criar apenas os dados, sem nenhum componente React ou lógica de controle
- MINIMIZE CODE — um único arquivo TypeScript exportando objetos/arrays tipados
- TESTS REQUIRED — verificar que o arquivo compila (`npm run build`) sem erros e que todos os campos estão preenchidos
</critical>

<requirements>
- MUST criar o arquivo `frontend/src/dados/arquiteturaAutomacao.ts`
- MUST organizar os dados em quatro camadas: `campo`, `controle`, `supervisao` e `rede`
- MUST incluir todos os instrumentos de campo listados abaixo com tag, descrição e tipo de sinal
- MUST incluir todos os equipamentos de controle (CLP, módulos, fonte, painel, UPS) com especificação mínima
- MUST incluir todos os equipamentos de supervisão (IHM, SCADA, historiador, servidor, painel de alarmes) com descrição
- MUST incluir a rede de comunicação (switch, protocolos, sinais)
- MUST incluir a seção `equivalenciaSimulado` mapeando sistema real → sistema simulado (6 pares mínimos)
- MUST exportar um único objeto `arquiteturaAutomacao` como `export const` e também exportar as interfaces TypeScript
- MUST todos os textos em português do Brasil
- SHOULD reutilizar tipos/interfaces já existentes em `frontend/src/tipos/` se houver compatibilidade
- SHOULD manter o mesmo estilo de nomenclatura camelCase já utilizado no projeto
</requirements>

## Subtasks

- [x] 36.1 Ler `task_27.md`, `_prd.md` e o catálogo de equipamentos gerado por task_27 (se existir)
- [x] 36.2 Criar as interfaces TypeScript: `EquipamentoCampo`, `EquipamentoControle`, `EquipamentoSupervisao`, `ElementoRede`, `ParEquivalencia`
- [x] 36.3 Preencher a camada de campo com os 14 instrumentos/atuadores listados nos requisitos
- [x] 36.4 Preencher a camada de controle com CLP, módulos I/O, fonte, relés, disjuntores, bornes, painel e UPS
- [x] 36.5 Preencher a camada de supervisão com IHM, SCADA, estação de engenharia, historiador e painel de alarmes
- [x] 36.6 Preencher a camada de rede com switch, protocolos e tipos de sinal
- [x] 36.7 Preencher `equivalenciaSimulado` com os 6 pares mínimos de equivalência
- [x] 36.8 Executar `cd frontend && npm run build` e corrigir erros de tipo se houver

## Implementation Details

Criar o arquivo `frontend/src/dados/arquiteturaAutomacao.ts` com a seguinte estrutura de dados:

```ts
export interface EquipamentoCampo {
  tag: string;
  descricao: string;
  tipoSinal: string; // ex: "4-20 mA", "Digital", "4-20 mA / HART"
  funcao: string;
}

export interface EquipamentoControle {
  nome: string;
  descricao: string;
  especificacao: string;
}

export interface EquipamentoSupervisao {
  nome: string;
  descricao: string;
}

export interface ElementoRede {
  nome: string;
  protocolo: string;
  descricao: string;
}

export interface ParEquivalencia {
  sistemaReal: string;
  sistemaSimulado: string;
}

export interface ArquiteturaAutomacao {
  campo: EquipamentoCampo[];
  controle: EquipamentoControle[];
  supervisao: EquipamentoSupervisao[];
  rede: ElementoRede[];
  equivalenciaSimulado: ParEquivalencia[];
}

export const arquiteturaAutomacao: ArquiteturaAutomacao = {
  campo: [
    { tag: "FIT-101", descricao: "Transmissor de vazão — entrada da planta", tipoSinal: "4-20 mA / HART", funcao: "Medição" },
    { tag: "FIT-102", descricao: "Transmissor de vazão — saída do filtro", tipoSinal: "4-20 mA / HART", funcao: "Medição" },
    { tag: "FIT-201", descricao: "Transmissor de vazão — água tratada", tipoSinal: "4-20 mA / HART", funcao: "Medição" },
    { tag: "LIT-101", descricao: "Transmissor de nível — tanque de equalização", tipoSinal: "4-20 mA / HART", funcao: "Medição" },
    { tag: "PIT-101", descricao: "Transmissor de pressão — linha principal", tipoSinal: "4-20 mA", funcao: "Medição" },
    { tag: "DPIT-101", descricao: "Transmissor de pressão diferencial — filtro", tipoSinal: "4-20 mA", funcao: "Medição" },
    { tag: "TIT-101", descricao: "Transmissor de temperatura — efluente", tipoSinal: "4-20 mA", funcao: "Medição" },
    { tag: "AIT-101", descricao: "Analisador de pH", tipoSinal: "4-20 mA / HART", funcao: "Medição" },
    { tag: "AIT-102", descricao: "Analisador de cloro residual", tipoSinal: "4-20 mA / HART", funcao: "Medição" },
    { tag: "AIT-103", descricao: "Analisador de turbidez", tipoSinal: "4-20 mA / HART", funcao: "Medição" },
    { tag: "FV-101", descricao: "Válvula de controle de vazão", tipoSinal: "4-20 mA", funcao: "Atuação analógica" },
    { tag: "XV-101", descricao: "Válvula solenóide de bloqueio", tipoSinal: "Digital (24 Vcc)", funcao: "Atuação discreta" },
    { tag: "P-101 / P-102", descricao: "Bombas de recalque — principal e reserva", tipoSinal: "Digital (24 Vcc)", funcao: "Atuação discreta" },
    { tag: "P-201", descricao: "Bomba dosadora de cloro", tipoSinal: "Digital (24 Vcc)", funcao: "Atuação discreta" },
    { tag: "VFD-101", descricao: "Inversor de frequência — bomba P-101", tipoSinal: "4-20 mA + RS-485", funcao: "Atuação analógica / comunicação" },
  ],
  controle: [
    { nome: "CLP Principal", descricao: "Controlador Lógico Programável central", especificacao: "CPU com suporte a Modbus TCP e Profinet, 512 kB de memória de programa" },
    { nome: "Módulos de Entrada Analógica (AI)", descricao: "Leitura dos transmissores de campo", especificacao: "16 canais, resolução 16 bits, faixa 4-20 mA" },
    { nome: "Módulos de Saída Analógica (AO)", descricao: "Comando de válvulas e inversores", especificacao: "8 canais, resolução 12 bits, faixa 4-20 mA" },
    { nome: "Módulos de Entrada Digital (DI)", descricao: "Leitura de chaves, botoeiras e fins de curso", especificacao: "32 canais, 24 Vcc" },
    { nome: "Módulos de Saída Digital (DO)", descricao: "Comando de bombas, válvulas e alarmes", especificacao: "16 canais, 24 Vcc, com relé de interface" },
    { nome: "Fonte de alimentação 24 Vcc", descricao: "Alimentação do rack de I/O e instrumentos", especificacao: "24 Vcc / 10 A com supervisão de tensão" },
    { nome: "Relés de interface", descricao: "Isolamento galvânico entre CLP e campo", especificacao: "Relés slim 24 Vcc, 1 contato NA+NF" },
    { nome: "Disjuntores e seccionadoras", descricao: "Proteção individual dos circuitos", especificacao: "DIN 35 mm, curva C, 2 A a 32 A" },
    { nome: "Bornes de passagem", descricao: "Ponto de conexão entre campo e painel", especificacao: "Bornes 4 mm² com identificação rastreável" },
    { nome: "Painel elétrico de controle", descricao: "Gabinete que abriga CLP, módulos e proteções", especificacao: "IP54, 600x800x250 mm, com climatização" },
    { nome: "Nobreak / UPS", descricao: "Proteção contra queda de energia", especificacao: "1 kVA, autonomia 30 min para CLP e supervisão" },
  ],
  supervisao: [
    { nome: "IHM Local", descricao: "Interface Homem-Máquina instalada no painel, operação local da planta" },
    { nome: "Estação SCADA", descricao: "Computador de supervisão com software SCADA para monitoramento em tempo real, tendências e alarmes" },
    { nome: "Estação de Engenharia", descricao: "Computador para programação e manutenção do CLP e configuração do SCADA" },
    { nome: "Servidor / Historiador de dados", descricao: "Armazenamento histórico de variáveis de processo para análise e relatórios" },
    { nome: "Painel de alarmes", descricao: "Lista de eventos e alarmes ativos com reconhecimento pelo operador" },
  ],
  rede: [
    { nome: "Switch Industrial Ethernet", protocolo: "IEEE 802.3 / Ethernet Industrial", descricao: "Conecta CLP, SCADA, historiador e estação de engenharia na rede de controle" },
    { nome: "Comunicação CLP ↔ SCADA", protocolo: "Modbus TCP / EtherNet/IP / Profinet", descricao: "Troca de variáveis de processo e comandos entre CLP e sistema supervisório" },
    { nome: "Sinais de instrumentação", protocolo: "4-20 mA / HART", descricao: "Transmissores de campo para módulos de entrada analógica do CLP" },
    { nome: "Sinais discretos de campo", protocolo: "Digital 24 Vcc (DI/DO)", descricao: "Comandos de bombas, válvulas solenóide e botoeiras" },
    { nome: "Comunicação com inversor", protocolo: "RS-485 / Modbus RTU", descricao: "Parâmetros de velocidade e status do VFD-101" },
  ],
  equivalenciaSimulado: [
    { sistemaReal: "Instrumentos de campo (transmissores, sensores)", sistemaSimulado: "Estado de processo calculado pelo backend Python" },
    { sistemaReal: "CLP (Controlador Lógico Programável)", sistemaSimulado: "Módulo controlador em Python (`backend/controle/`)" },
    { sistemaReal: "Matriz de intertravamento (Cause & Effect)", sistemaSimulado: "Matriz de Causa e Efeito implementada em Python" },
    { sistemaReal: "Bombas e válvulas (atuadores de campo)", sistemaSimulado: "Ações de controle simuladas no modelo da planta" },
    { sistemaReal: "IHM local / Sistema SCADA", sistemaSimulado: "Frontend React (sinóptico, cards, ajuste manual)" },
    { sistemaReal: "Rede industrial (Modbus TCP, Profinet)", sistemaSimulado: "Comunicação HTTP entre frontend e backend (API REST)" },
  ],
};
```

### Relevant Files

- `frontend/src/dados/arquiteturaAutomacao.ts` — arquivo a criar
- `frontend/src/tipos/` — verificar interfaces reutilizáveis antes de criar novas
- `.compozy/tasks/automacao-industrial-tratamento-agua/task_27.md` — catálogo de equipamentos (base de referência)

### Dependent Files

- `frontend/src/componentes/ArquiteturaAutomacao.tsx` — task_37 importará este arquivo
- `frontend/src/componentes/SecaoArquitetura.tsx` — task_38 importará este arquivo

### Related ADRs

- specs.md — seção de domínio e lista de instrumentos

## Deliverables

- Arquivo `frontend/src/dados/arquiteturaAutomacao.ts` criado com todos os dados **(REQUIRED)**
- Interfaces TypeScript exportadas corretamente **(REQUIRED)**
- Todos os textos em português do Brasil **(REQUIRED)**
- Build do frontend passando sem erros de tipo **(REQUIRED)**

## Tests

- Build:
  - [x] `cd frontend && npm run build` retorna exit code 0 sem erros de tipo
- Cobertura de dados:
  - [x] `arquiteturaAutomacao.campo` tem pelo menos 14 entradas
  - [x] `arquiteturaAutomacao.controle` tem pelo menos 10 entradas
  - [x] `arquiteturaAutomacao.supervisao` tem pelo menos 5 entradas
  - [x] `arquiteturaAutomacao.rede` tem pelo menos 4 entradas
  - [x] `arquiteturaAutomacao.equivalenciaSimulado` tem exatamente 6 entradas

## Success Criteria

- Existe uma única fonte de dados centralizada para toda a arquitetura de automação
- Os dados estão completamente em português do Brasil
- A estrutura é totalmente tipada e importável por qualquer componente React
- Nenhuma lógica de controle industrial ou renderização está dentro deste arquivo
- Build e lint passam sem erros
