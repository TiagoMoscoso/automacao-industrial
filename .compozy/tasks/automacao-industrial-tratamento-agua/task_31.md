---
status: completed
title: Revisão visual e validação de responsividade
type: frontend
complexity: low
dependencies:
  - task_28
  - task_29
  - task_30
---

# Task 31: Revisão visual e validação de responsividade

## Overview

Validar o resultado visual completo das tasks 28–30 e corrigir quaisquer
problemas de tipografia, espaçamento, overflow ou legibilidade. O objetivo é
garantir que as descrições didáticas adicionadas melhorem a clareza sem poluir
a interface ou quebrar o layout.

<critical>
- ALWAYS READ `componentes.css` e `principal.css` antes de ajustar estilos
- ALWAYS READ os componentes alterados nas tasks 28, 29 e 30 antes de corrigir
- DO NOT alterar lógica de componente — somente CSS e ajustes de renderização menores
- DO NOT alterar backend, API ou Docker
- FOCUS ON qualidade final: a tela deve parecer uma interface profissional e didática
</critical>

<requirements>
- MUST executar `cd frontend && npm run build` e garantir exit code 0
- MUST executar `cd frontend && npm run test` e garantir exit code 0
- MUST inspecionar visualmente os 4 painéis: cards de variáveis, sinóptico, painel de ajuste, painel de atuadores
- MUST corrigir qualquer texto que transborde (`overflow: hidden` + `text-overflow: ellipsis` onde aplicável)
- MUST garantir que descrições estejam visíveis mas subordinadas à tag (hierarquia visual correta)
- MUST garantir que o grid de cards não quebre com o texto adicional
- MUST verificar que o sinóptico não ficou congestionado
- SHOULD ajustar `font-size`, `line-height`, `margin` e `opacity` das classes de descrição se necessário
- SHOULD verificar se o painel de atuadores precisa ou não de descrição (está fora do escopo — não adicionar)
</requirements>

## Subtasks

- [ ] 31.1 Ler `componentes.css` e `principal.css` completos
- [ ] 31.2 Executar `cd frontend && npm run build`
- [ ] 31.3 Executar `cd frontend && npm run test`
- [ ] 31.4 Abrir a aplicação no navegador (ou usar ferramenta de preview disponível)
- [ ] 31.5 Inspecionar cards de variáveis: legibilidade, hierarquia, overflow
- [ ] 31.6 Inspecionar sinóptico: labels secundários, tooltips, densidade visual
- [ ] 31.7 Inspecionar painel de ajuste de variáveis: layout acima dos sliders
- [ ] 31.8 Corrigir problemas encontrados (CSS ou JSX mínimo)
- [ ] 31.9 Executar build e testes novamente após correções
- [ ] 31.10 Documentar o que foi ajustado nesta task

## Implementation Details

### Checklist de inspeção visual

**Cards de variáveis (PaginaPrincipal)**
- [ ] Tag em negrito, legível
- [ ] Descrição curta abaixo da tag, fonte menor (~0.7rem), cor fraca
- [ ] Valor numérico com fonte maior, destaque máximo
- [ ] Badge de estado (NORMAL / ALERTA / FALHA) legível
- [ ] Cards não cresceram excessivamente com o texto adicional
- [ ] Grid de cards permanece alinhado

**Sinóptico (SinoticoPlanta)**
- [ ] Tags industriais legíveis nos blocos
- [ ] `nomeAbreviado` visível nos equipamentos maiores
- [ ] Equipamentos pequenos: tooltip presente, sem overflow
- [ ] Tooltips aparecem ao passar o cursor
- [ ] Linhas de processo, setas e conectores intactos
- [ ] Diagrama não parece congestionado

**Painel de ajuste de variáveis (PainelAjusteVariaveis)**
- [ ] Tag + descrição aparecem acima de cada slider
- [ ] Descrição tem hierarquia visual inferior à tag
- [ ] Sliders e valores funcionam normalmente
- [ ] Alarmes críticos destacados corretamente

### Ajustes comuns esperados

- Se a descrição no card empurra o valor para fora: reduzir `font-size` ou `margin-bottom`
- Se o label no sinóptico transborda: adicionar `clip-path` ou ajustar `textLength` SVG
- Se o grid de cards quebra para 1 coluna: verificar `min-width` do card vs largura da grid

### Relevant Files

- `frontend/src/componentes/componentes.css` — fonte principal de ajustes
- `frontend/src/estilos/principal.css` — variáveis globais de tema
- `frontend/src/componentes/CartaoVariavel.tsx` — se overflow no card
- `frontend/src/componentes/SinoticoPlanta.tsx` — se problema no sinóptico
- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — se problema no painel

## Deliverables

- Build passando sem warnings relevantes **(REQUIRED)**
- Testes passando **(REQUIRED)**
- Interface visualmente coerente com descrições didáticas em todos os painéis **(REQUIRED)**

## Tests

- Unit tests:
  - [ ] `cd frontend && npm run build` retorna exit code 0
  - [ ] `cd frontend && npm run test` retorna exit code 0
- Integration tests:
  - [ ] Cards de variáveis: tag + descrição + valor visíveis e hierárquicos
  - [ ] Sinóptico: tooltips funcionais, labels secundários onde couberem
  - [ ] Painel de ajuste: descrição acima de cada slider
  - [ ] Nenhum texto transborda ou quebra layout em 1920×1080
  - [ ] Nenhuma alteração em backend, API ou regras de negócio

## Success Criteria

- Interface mais didática: usuário acadêmico entende o papel de cada equipamento
- Nenhuma string de descrição fora do catálogo `equipamentos.ts`
- Layout responsivo preservado
- Build e testes passam
- A tela parece uma interface supervisória profissional, não um bloco textual pesado
