---
status: completed
title: Refatorar cards de ajuste com status badge, faixa operacional e painel expansível
type: frontend
complexity: high
dependencies:
    - task_33
---

# Task 34: Refatorar cards de ajuste com status badge, faixa operacional e painel expansível

## Overview

Refatorar `PainelAjusteVariaveis.tsx` para tornar cada card de variável mais didático.
Cada card deve exibir: valor atual + unidade, faixa operacional normal, badge de status
calculado, descrição do impacto e — em accordion nativo `<details>/<summary>` — a
explicação completa da tag industrial.

A lógica de slider (debounce, envio de comando, destaque de alarme crítico) não é alterada.
Novos estilos são adicionados a `componentes.css` sem quebrar estilos existentes.

<critical>
- ALWAYS READ `PainelAjusteVariaveis.tsx` completo antes de editar
- ALWAYS READ `componentes.css` completo antes de editar
- ALWAYS READ `equipamentos.ts` e `statusVariavel.ts` antes de editar
- DO NOT alterar a lógica de debounce (`agendarAlteracao`, `confirmarAlteracao`)
- DO NOT alterar a lógica de destaque crítico (`campo-ajuste--critico`, `variavelEstaCritica`)
- DO NOT alterar o botão de emergência (`ajuste-emergencia`)
- DO NOT remover o array `VARIAVEIS_PROCESSO` — ele pode ser referenciado em testes
- DO NOT alterar backend, API ou Docker
- DO NOT adicionar dependências externas (usar apenas `<details>/<summary>` HTML nativo)
</critical>

<requirements>
- MUST exibir em cada card:
  - Tag em destaque (já existe)
  - Nome abreviado (já existe via `obterMetadados`)
  - Valor atual formatado com `formatarValorEngenharia` + unidade
  - Faixa normal simulada (ex: "Faixa normal: 6–14 m³/h") — omitir se `faixaNormal` não definida
  - Badge de status com label e classe CSS (`obterLabelStatus`, `obterClasseCssStatus`)
  - Texto de impacto operacional (`impactoOperacional`) em fonte secundária — omitir se não definido
  - Accordion `<details>/<summary>` com texto "Entenda esta tag ▾" — omitir se `explicacaoTag` não definida
- MUST conteúdo do accordion incluir:
  - Prefixo e significado em inglês
  - Significado em português
  - Significado do número
  - Tipo de sinal (se disponível)
  - Camada (nivelArquitetura, se disponível)
  - Efeito de aumentar o slider
  - Efeito de diminuir o slider
  - Dica do operador (se disponível)
- MUST importar de `../dominio/statusVariavel` as funções necessárias
- MUST importar `obterMetadados` de `../dominio/equipamentos` (já importado)
- MUST NÃO duplicar strings — usar sempre o catálogo como fonte
- SHOULD extrair a renderização de cada card para uma função interna `renderizarCardVariavel`
  para manter o JSX do componente principal legível
</requirements>

## Subtasks

- [ ] 34.1 Ler `PainelAjusteVariaveis.tsx`, `componentes.css`, `equipamentos.ts`, `statusVariavel.ts`
- [ ] 34.2 Adicionar importações de `statusVariavel.ts` no componente
- [ ] 34.3 Extrair função interna `renderizarCardVariavel` (ou sub-componente) para cada card
- [ ] 34.4 Implementar exibição de faixa operacional, badge de status e impacto
- [ ] 34.5 Implementar accordion `<details>/<summary>` com explicação da tag
- [ ] 34.6 Adicionar estilos em `componentes.css` (badge de status, faixa, accordion, impacto)
- [ ] 34.7 Executar `cd frontend && npm run build`
- [ ] 34.8 Executar `cd frontend && npm run test`
- [ ] 34.9 Verificar visualmente no navegador

## Implementation Details

### Estrutura visual do card (referência)

```
┌─────────────────────────────────────┐
│ FIT-101          [badge: Normal]    │
│ Sensor de vazão de entrada          │
│ Valor atual: 10 m³/h               │
│ Faixa normal: 6–14 m³/h            │
│ ─────────────────────────────────── │
│ Controla a quantidade de água bruta │
│ entrando na planta.                 │
│ ─────────────────────────────────── │
│ [===●=============]                 │
│ ▸ Entenda esta tag                  │
└─────────────────────────────────────┘
```

Accordion expandido:
```
▾ Entenda esta tag
  FIT = Flow Indicator Transmitter
  Português: Transmissor indicador de vazão
  101 = Malha da linha principal de entrada
  Sinal: 4–20 mA  |  Camada: Campo
  ↑ Aumentar: Aumenta alimentação...
  ↓ Diminuir: Reduz produção...
```

### Novas classes CSS a adicionar em `componentes.css`

```css
/* Badge de status */
.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.status--normal    { background-color: var(--cor-normal);  color: #000; }
.status--baixo     { background-color: var(--cor-alerta);  color: #000; }
.status--alto      { background-color: var(--cor-alerta);  color: #000; }
.status--atencao   { background-color: var(--cor-alerta);  color: #000; }
.status--critico   { background-color: var(--cor-falha);   color: #fff; }
.status--desconhecido { background-color: transparent; color: var(--cor-texto-secundario); border: 1px solid var(--cor-borda); }

/* Faixa operacional */
.campo-ajuste__faixa {
  font-size: 0.72rem;
  color: var(--cor-texto-secundario);
  margin: 2px 0;
}

/* Impacto operacional */
.campo-ajuste__impacto {
  font-size: 0.72rem;
  color: var(--cor-texto-secundario);
  line-height: 1.4;
  margin: 4px 0;
}

/* Accordion de explicação da tag */
.campo-ajuste__details {
  margin-top: 6px;
  border-top: 1px solid var(--cor-borda);
  padding-top: 4px;
}
.campo-ajuste__details summary {
  font-size: 0.72rem;
  color: var(--cor-texto-secundario);
  cursor: pointer;
  user-select: none;
  list-style: none;
}
.campo-ajuste__details summary::-webkit-details-marker { display: none; }
.campo-ajuste__details[open] summary { color: var(--cor-texto); }
.campo-ajuste__explicacao {
  margin-top: 6px;
  font-size: 0.7rem;
  color: var(--cor-texto-secundario);
  line-height: 1.5;
  display: grid;
  gap: 2px;
}
.campo-ajuste__explicacao strong { color: var(--cor-texto); }
```

### Cabeçalho do card — estrutura JSX sugerida

```tsx
<div className="campo-ajuste__cabecalho">
  <span className="campo-ajuste__tag">{config.tag}</span>
  <span className={`status-badge ${obterClasseCssStatus(status)}`}>
    {obterLabelStatus(status)}
  </span>
</div>
{metadados?.nomeAbreviado && (
  <span className="campo-ajuste__descricao">{metadados.nomeAbreviado}</span>
)}
<span className="campo-ajuste__valor">
  {formatarValorEngenharia(valor, config.unidade)} {config.unidade}
</span>
{metadados?.faixaNormal && (
  <span className="campo-ajuste__faixa">
    Faixa normal: {metadados.faixaNormal.min}–{metadados.faixaNormal.max} {config.unidade}
  </span>
)}
{metadados?.impactoOperacional && (
  <p className="campo-ajuste__impacto">{metadados.impactoOperacional}</p>
)}
{/* slider permanece aqui — inalterado */}
{metadados?.explicacaoTag && (
  <details className="campo-ajuste__details">
    <summary>Entenda esta tag ▾</summary>
    <div className="campo-ajuste__explicacao">
      <span><strong>{metadados.explicacaoTag.prefixo}</strong> = {metadados.explicacaoTag.significadoPrefixo}</span>
      <span>Português: {metadados.explicacaoTag.significadoPortugues}</span>
      <span>{metadados.explicacaoTag.prefixo.slice(-3)} = {metadados.explicacaoTag.significadoNumero}</span>
      {metadados.tipoSinal && <span>Sinal: {metadados.tipoSinal}</span>}
      {metadados.nivelArquitetura && <span>Camada: {metadados.nivelArquitetura}</span>}
      {metadados.efeitoAumento && <span>↑ Aumentar: {metadados.efeitoAumento}</span>}
      {metadados.efeitoDiminuicao && <span>↓ Diminuir: {metadados.efeitoDiminuicao}</span>}
      {metadados.dicaOperador && <span>💡 {metadados.dicaOperador}</span>}
    </div>
  </details>
)}
```

### Relevant Files

- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — refatorar
- `frontend/src/componentes/componentes.css` — adicionar estilos
- `frontend/src/dominio/equipamentos.ts` — metadados (task 32)
- `frontend/src/dominio/statusVariavel.ts` — utilitários (task 33)

### Dependent Files

- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — também alterado na task 35

## Deliverables

- Cards exibindo faixa operacional, status badge e impacto **(REQUIRED)**
- Accordion "Entenda esta tag" funcional **(REQUIRED)**
- Lógica de slider, debounce e alarmes inalterada **(REQUIRED)**
- Estilos adicionados sem quebrar layout existente **(REQUIRED)**
- Build e testes passando **(REQUIRED)**

## Tests

- Unit tests:
  - [ ] `cd frontend && npm run build` retorna exit code 0
  - [ ] `cd frontend && npm run test` retorna exit code 0
- Integration / visual:
  - [ ] Cada card exibe badge de status colorido
  - [ ] Cards com faixaNormal exibem faixa corretamente (todos os 10)
  - [ ] Accordion "Entenda esta tag" expande e recolhe corretamente
  - [ ] Slider ainda funciona e envia valores ao backend
  - [ ] Destaque vermelho de alarme crítico ainda funciona
  - [ ] Layout responsivo — não quebra em telas menores
  - [ ] Cards sem `explicacaoTag` nos metadados não mostram accordion

## Success Criteria

- Seção de ajuste manual claramente mais didática que antes
- Nenhuma string de conteúdo hard-coded no JSX — tudo vem de `equipamentos.ts`
- Lógica funcional (debounce, alarmes, emergência) intacta
- Build e testes passando
