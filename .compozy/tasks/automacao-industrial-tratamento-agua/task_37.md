---
status: completed
title: Criar componente visual "Arquitetura de Automação"
type: frontend
complexity: medium
dependencies:
  - task_36
---

# Task 37: Criar componente visual "Arquitetura de Automação"

## Overview

Criar um componente React didático `ArquiteturaAutomacao.tsx` que exibe a arquitetura de automação da planta em camadas visuais hierárquicas. O componente deve deixar claro para um professor ou examinador quais são os três níveis principais (campo, controle, supervisão) e como eles se comunicam. O layout usa os dados centralizados criados na task_36 e respeita o tema visual da aplicação. O componente pode ser embutido na página principal ou em seção própria, sem quebrar o sinóptico existente.

<critical>
- ALWAYS READ `task_36.md`, o componente sinóptico existente e `componentes.css` antes de começar
- REFERENCE o padrão visual dos cards e painéis já existentes no projeto (cores, fontes, bordas)
- FOCUS ON "WHAT" — renderização didática da arquitetura; não duplicar dados, não reescrever task_36
- MINIMIZE CODE — usar apenas HTML semântico, CSS existente ou mínimo CSS novo; sem dependências externas de diagramas
- TESTS REQUIRED — build passando, responsividade verificada, nenhum componente existente quebrado
</critical>

<requirements>
- MUST importar `arquiteturaAutomacao` de `../dados/arquiteturaAutomacao`
- MUST exibir três camadas empilhadas verticalmente: Campo (baixo) → Controle (centro) → Supervisão (topo)
- MUST exibir a camada de Rede como conector entre Campo e Controle
- MUST usar setas ou separadores visuais indicando direção do fluxo de dados e comandos
- MUST incluir um cabeçalho "Arquitetura de Automação" no componente
- MUST incluir nota didática diferenciando o sistema real do sistema simulado (ex: badge ou legenda)
- MUST ser responsivo — funcionar em telas de 768px a 1440px
- MUST NÃO modificar componentes existentes (sinóptico, cards, painéis)
- SHOULD listar os instrumentos de campo agrupados por tipo (medição / atuação)
- SHOULD listar os equipamentos de controle de forma compacta (nome + especificação resumida)
- SHOULD usar cores e estilos CSS coerentes com o tema escuro/claro da aplicação
- SHOULD adicionar classes CSS com prefixo `arquitetura__` para não colidir com estilos existentes
</requirements>

## Subtasks

- [x] 37.1 Ler `ArquiteturaAutomacao.tsx` se já existir; ler sinóptico e `componentes.css` para entender o tema visual
- [x] 37.2 Criar `frontend/src/componentes/ArquiteturaAutomacao.tsx` com estrutura de camadas
- [x] 37.3 Renderizar camada de Supervisão com dados de `arquiteturaAutomacao.supervisao`
- [x] 37.4 Renderizar camada de Controle com dados de `arquiteturaAutomacao.controle`
- [x] 37.5 Renderizar camada de Campo com dados de `arquiteturaAutomacao.campo`, agrupado por `funcao`
- [x] 37.6 Adicionar indicadores visuais de Rede/Comunicação entre as camadas
- [x] 37.7 Adicionar legenda de equivalência (sistema real × simulado) — resumida
- [x] 37.8 Adicionar estilos em `componentes.css` com prefixo `arquitetura__`
- [x] 37.9 Executar `cd frontend && npm run build` e `npm run test`; verificar responsividade

## Implementation Details

Estrutura JSX esperada (esqueleto):

```tsx
import React from 'react';
import { arquiteturaAutomacao } from '../dados/arquiteturaAutomacao';

export function ArquiteturaAutomacao() {
  return (
    <section className="arquitetura__container">
      <h2 className="arquitetura__titulo">Arquitetura de Automação</h2>

      {/* Nível 3 — Supervisão (topo) */}
      <div className="arquitetura__camada arquitetura__camada--supervisao">
        <span className="arquitetura__camada-label">Nível de Supervisão</span>
        <ul className="arquitetura__lista">
          {arquiteturaAutomacao.supervisao.map((eq) => (
            <li key={eq.nome} className="arquitetura__item">
              <strong>{eq.nome}</strong>
              <span>{eq.descricao}</span>
            </li>
          ))}
        </ul>
        <div className="arquitetura__badge-simulado">
          Simulado por: <strong>Frontend React</strong>
        </div>
      </div>

      {/* Seta descendente + Rede */}
      <div className="arquitetura__conector">
        <span className="arquitetura__seta">↕</span>
        <span className="arquitetura__rede-label">
          Rede industrial (Modbus TCP / Profinet) — simulado via HTTP/REST
        </span>
      </div>

      {/* Nível 2 — Controle (centro) */}
      <div className="arquitetura__camada arquitetura__camada--controle">
        <span className="arquitetura__camada-label">Nível de Controle</span>
        {/* lista de equipamentos de controle */}
        <div className="arquitetura__badge-simulado">
          Simulado por: <strong>Backend Python + Matriz Causa e Efeito</strong>
        </div>
      </div>

      {/* Seta descendente + sinais de campo */}
      <div className="arquitetura__conector">
        <span className="arquitetura__seta">↕</span>
        <span className="arquitetura__rede-label">
          Sinais 4-20 mA / HART e sinais digitais 24 Vcc
        </span>
      </div>

      {/* Nível 1 — Campo (base) */}
      <div className="arquitetura__camada arquitetura__camada--campo">
        <span className="arquitetura__camada-label">Nível de Campo</span>
        {/* lista de instrumentos agrupada por funcao */}
        <div className="arquitetura__badge-simulado">
          Simulado por: <strong>modelo de planta no backend Python</strong>
        </div>
      </div>
    </section>
  );
}
```

Sugestão de estilos (`componentes.css`):

```css
.arquitetura__container {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.arquitetura__camada {
  border: 2px solid var(--cor-borda, #444);
  border-radius: 8px;
  padding: 1rem 1.25rem;
}

.arquitetura__camada--supervisao { background: var(--cor-supervisao, #1e3a5f); }
.arquitetura__camada--controle   { background: var(--cor-controle,   #1a3a1e); }
.arquitetura__camada--campo      { background: var(--cor-campo,      #3a1e1e); }

.arquitetura__conector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
  color: var(--cor-texto-secundario, #aaa);
  font-size: 0.85rem;
}

.arquitetura__badge-simulado {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.75;
  font-style: italic;
}
```

### Relevant Files

- `frontend/src/componentes/ArquiteturaAutomacao.tsx` — arquivo a criar
- `frontend/src/componentes/componentes.css` — adicionar estilos `arquitetura__*`
- `frontend/src/dados/arquiteturaAutomacao.ts` — fonte de dados (task_36)
- Componente sinóptico existente — referência de tema visual (não modificar)

### Dependent Files

- `frontend/src/App.tsx` ou página principal — pode incluir `<ArquiteturaAutomacao />` na task_38

### Related ADRs

- specs.md — padrões de componentes React
- task_36 — fonte de dados

## Deliverables

- Componente `ArquiteturaAutomacao.tsx` criado e funcional **(REQUIRED)**
- Estilos `arquitetura__*` adicionados em `componentes.css` **(REQUIRED)**
- Três camadas visíveis com conteúdo real dos dados **(REQUIRED)**
- Badges indicando equivalência com o sistema simulado **(REQUIRED)**
- Build e testes passando sem erros **(REQUIRED)**
- Componentes e sinóptico existentes sem regressões **(REQUIRED)**

## Tests

- Build:
  - [x] `cd frontend && npm run build` retorna exit code 0
  - [x] `cd frontend && npm run test` retorna exit code 0
- Visual:
  - [x] Três camadas (Campo, Controle, Supervisão) aparecem empilhadas
  - [x] Conectores com descrição da rede/sinal aparecem entre as camadas
  - [x] Badges "Simulado por" aparecem em cada camada
  - [x] Layout é legível em telas de 768px e 1440px
- Regressão:
  - [x] Sinóptico da planta continua renderizando corretamente
  - [x] Cards de variáveis de processo continuam funcionando

## Success Criteria

- Um professor consegue entender os níveis de campo, controle e supervisão olhando o componente
- O componente diferencia visualmente o sistema industrial real do sistema simulado
- Nenhuma dependência externa de biblioteca de diagramas foi adicionada
- Build, lint e testes passam sem erros ou warnings novos
