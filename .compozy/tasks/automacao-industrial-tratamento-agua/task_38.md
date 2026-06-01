---
status: completed
title: Adicionar seção explicativa da arquitetura de automação na interface
type: frontend
complexity: low
dependencies:
  - task_37
---

# Task 38: Adicionar seção explicativa da arquitetura de automação na interface

## Overview

Adicionar uma seção didática na interface da aplicação que explica, em texto claro e direto, o que é arquitetura de automação e como ela se aplica à planta simulada. A seção inclui uma definição curta de cada nível, uma explicação da rede industrial e uma tabela de equivalência entre o sistema industrial real e o sistema web simulado. O objetivo é que o requisito acadêmico #4 da disciplina possa ser demonstrado diretamente na interface durante a apresentação, sem que o professor precise consultar documentação externa.

<critical>
- ALWAYS READ `task_37.md`, `task_36.md` e o componente `ArquiteturaAutomacao.tsx` (task_37) antes de começar
- REFERENCE o texto de equivalência definido nos dados `arquiteturaAutomacao.equivalenciaSimulado` (task_36); não duplicar strings
- FOCUS ON "WHAT" — criar a seção com texto e tabela; não reescrever o componente visual da task_37
- MINIMIZE CODE — um único componente funcional, sem estado, sem lógica; apenas JSX e estilos mínimos
- TESTS REQUIRED — build passando, seção visível na página, tabela renderizando todos os 6 pares
</critical>

<requirements>
- MUST criar o componente `frontend/src/componentes/SecaoArquitetura.tsx`
- MUST incluir uma definição curta de "arquitetura de automação" (1-2 frases)
- MUST incluir explicação do nível de campo (1-2 frases)
- MUST incluir explicação do nível de controle (1-2 frases)
- MUST incluir explicação do nível de supervisão (1-2 frases)
- MUST incluir explicação da rede industrial (1-2 frases)
- MUST incluir a tabela de equivalência usando `arquiteturaAutomacao.equivalenciaSimulado`
- MUST integrar o componente `<ArquiteturaAutomacao />` (task_37) dentro ou logo acima desta seção, em uma única área da página
- MUST NÃO repetir informações que já aparecem nos cards de processo ou no sinóptico
- SHOULD usar `<details>/<summary>` para ocultar o detalhamento por padrão, revelando ao clicar (mantém a interface limpa)
- SHOULD o texto ser direto e adequado para apresentação oral em sala
- SHOULD os estilos usarem o prefixo `secao-arquitetura__` para não colidir com outros componentes
</requirements>

## Subtasks

- [x] 38.1 Ler `ArquiteturaAutomacao.tsx` e `arquiteturaAutomacao.ts` para entender o que já está exibido
- [x] 38.2 Criar `frontend/src/componentes/SecaoArquitetura.tsx`
- [x] 38.3 Adicionar bloco de definição e texto explicativo por nível
- [x] 38.4 Adicionar tabela de equivalência mapeada de `equivalenciaSimulado`
- [x] 38.5 Integrar `<ArquiteturaAutomacao />` dentro de `<SecaoArquitetura />`
- [x] 38.6 Adicionar estilos `secao-arquitetura__*` em `componentes.css`
- [x] 38.7 Incluir `<SecaoArquitetura />` na página principal (App.tsx ou rota correspondente)
- [x] 38.8 Executar `cd frontend && npm run build` e verificar visualmente

## Implementation Details

Estrutura JSX esperada para `SecaoArquitetura.tsx`:

```tsx
import React from 'react';
import { arquiteturaAutomacao } from '../dados/arquiteturaAutomacao';
import { ArquiteturaAutomacao } from './ArquiteturaAutomacao';

export function SecaoArquitetura() {
  return (
    <section className="secao-arquitetura__container">
      <h2 className="secao-arquitetura__titulo">Arquitetura de Automação</h2>

      <p className="secao-arquitetura__definicao">
        A arquitetura de automação define a estrutura hierárquica de equipamentos, redes e sistemas
        responsáveis pela medição, controle e supervisão de um processo industrial.
        Ela é organizada em camadas com funções bem definidas, conectadas por redes de comunicação industrial.
      </p>

      <details className="secao-arquitetura__detalhe">
        <summary>Ver explicação detalhada por nível ▾</summary>
        <div className="secao-arquitetura__niveis">
          <div className="secao-arquitetura__nivel">
            <h3>Nível de Campo</h3>
            <p>
              Composto por instrumentos de medição (transmissores de vazão, pressão, nível, temperatura e qualidade)
              e atuadores (bombas, válvulas e inversores de frequência). Esses equipamentos interagem diretamente
              com o processo físico, enviando sinais analógicos (4-20 mA) e digitais ao CLP.
            </p>
          </div>
          <div className="secao-arquitetura__nivel">
            <h3>Nível de Controle</h3>
            <p>
              Composto pelo CLP (Controlador Lógico Programável) e seus módulos de I/O, que recebem os sinais
              de campo, executam a lógica de controle e intertravamento (incluindo a Matriz de Causa e Efeito)
              e emitem comandos de retorno aos atuadores.
            </p>
          </div>
          <div className="secao-arquitetura__nivel">
            <h3>Nível de Supervisão</h3>
            <p>
              Composto pela IHM local e pelo sistema SCADA, que permitem ao operador monitorar variáveis em
              tempo real, visualizar alarmes, ajustar setpoints e acessar o histórico de dados do processo.
            </p>
          </div>
          <div className="secao-arquitetura__nivel">
            <h3>Rede Industrial</h3>
            <p>
              Integra os níveis por meio de protocolos como Modbus TCP, Profinet ou EtherNet/IP entre CLP e SCADA,
              e sinais 4-20 mA / HART entre instrumentos e CLP. Garante comunicação confiável, determinística
              e com baixa latência.
            </p>
          </div>
        </div>
      </details>

      {/* Diagrama visual em camadas */}
      <ArquiteturaAutomacao />

      {/* Tabela de equivalência */}
      <div className="secao-arquitetura__equivalencia">
        <h3>Sistema Real × Sistema Simulado</h3>
        <table className="secao-arquitetura__tabela">
          <thead>
            <tr>
              <th>Sistema industrial real</th>
              <th>Sistema web simulado</th>
            </tr>
          </thead>
          <tbody>
            {arquiteturaAutomacao.equivalenciaSimulado.map((par, i) => (
              <tr key={i}>
                <td>{par.sistemaReal}</td>
                <td>{par.sistemaSimulado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
```

### Relevant Files

- `frontend/src/componentes/SecaoArquitetura.tsx` — arquivo a criar
- `frontend/src/componentes/ArquiteturaAutomacao.tsx` — componente visual (task_37), a importar
- `frontend/src/dados/arquiteturaAutomacao.ts` — fonte de dados (task_36)
- `frontend/src/componentes/componentes.css` — adicionar estilos `secao-arquitetura__*`
- `frontend/src/App.tsx` — incluir `<SecaoArquitetura />`

### Dependent Files

- `frontend/src/App.tsx` — recebe `<SecaoArquitetura />`

### Related ADRs

- task_36 — fonte de dados
- task_37 — componente visual embutido

## Deliverables

- Componente `SecaoArquitetura.tsx` criado e funcional **(REQUIRED)**
- Texto explicativo dos 4 níveis presente **(REQUIRED)**
- Tabela de equivalência renderizando todos os 6 pares **(REQUIRED)**
- Componente `<ArquiteturaAutomacao />` integrado **(REQUIRED)**
- Seção visível na página principal da aplicação **(REQUIRED)**
- Build e testes passando sem regressões **(REQUIRED)**

## Tests

- Build:
  - [x] `cd frontend && npm run build` retorna exit code 0
  - [x] `cd frontend && npm run test` retorna exit code 0
- Visual:
  - [x] Seção "Arquitetura de Automação" aparece na página
  - [x] `<details>` começa recolhido; ao clicar, exibe os 4 blocos de texto
  - [x] Tabela de equivalência exibe exatamente 6 linhas de dados
  - [x] Diagrama em camadas (task_37) está visível dentro da seção
- Regressão:
  - [x] Sinóptico e cards de processo continuam funcionando normalmente

## Success Criteria

- Um professor consegue entender o requisito #4 da disciplina apenas olhando esta seção na tela
- A seção não é excessivamente longa — o `<details>` garante que a interface permanece limpa
- Tabela de equivalência é coerente com `arquiteturaAutomacao.equivalenciaSimulado` (sem strings duplicadas)
- Build, lint e testes passam sem erros ou warnings novos
