---
status: completed
title: Adicionar seção explicativa e guia de nomenclatura de tags industriais
type: frontend
complexity: low
dependencies:
    - task_34
---

# Task 35: Adicionar seção explicativa e guia de nomenclatura de tags industriais

## Overview

Adicionar dois blocos informativos à seção "Ajuste manual de variáveis" para
contextualizar o usuário antes de interagir com os sliders:

1. **Cabeçalho explicativo** — texto breve acima dos cards sobre o propósito da seção.
2. **"Como ler as tags industriais?"** — painel colapsável (`<details>`) com tabela de
   prefixos, exemplos das tags do simulador e nota de simplificação didática.

Ambos os blocos usam apenas HTML nativo e CSS existente/estendido — sem dependências novas.

<critical>
- ALWAYS READ `PainelAjusteVariaveis.tsx` completo antes de editar (já alterado na task 34)
- ALWAYS READ `componentes.css` antes de editar
- DO NOT alterar os cards de variável nem a lógica de slider (já finalizados na task 34)
- DO NOT alterar o botão de emergência
- DO NOT alterar backend, API ou Docker
- DO NOT adicionar dependências externas
</critical>

<requirements>
- MUST adicionar cabeçalho explicativo logo após o `<h2>` da seção com o texto especificado abaixo
- MUST adicionar painel colapsável "Como ler as tags industriais?" — recolhido por padrão
- MUST incluir no painel: tabela de prefixos, exemplos comentados das tags do simulador e nota de simplificação didática
- MUST NÃO repetir informações que já aparecem individualmente nos cards
- SHOULD usar `<details>/<summary>` para o painel de nomenclatura (consistente com accordion dos cards)
- SHOULD usar estilos já existentes ou adicionar mínimo de CSS novo
</requirements>

## Subtasks

- [ ] 35.1 Ler `PainelAjusteVariaveis.tsx` e `componentes.css` completos (pós task 34)
- [ ] 35.2 Adicionar cabeçalho explicativo no JSX, após o `<h2>`
- [ ] 35.3 Adicionar painel `<details>` "Como ler as tags industriais?" após o cabeçalho
- [ ] 35.4 Adicionar/ajustar estilos em `componentes.css` para os blocos informativos
- [ ] 35.5 Executar `cd frontend && npm run build`
- [ ] 35.6 Executar `cd frontend && npm run test`
- [ ] 35.7 Verificar visualmente no navegador

## Implementation Details

### Posicionamento na seção

```
<section class="painel-ajuste-variaveis">
  <h2>Ajuste manual de variáveis</h2>

  [BLOCO 1 — cabeçalho explicativo]  ← NOVO

  [BLOCO 2 — "Como ler as tags industriais?"]  ← NOVO

  <div class="ajuste-variaveis__grade">
    {cards de variáveis — inalterados}
  </div>

  <label class="ajuste-emergencia">...</label>
</section>
```

### BLOCO 1 — Cabeçalho explicativo

```tsx
<div className="ajuste-variaveis__introducao">
  <p>
    Esta área permite alterar manualmente variáveis simuladas da planta. Em uma
    planta real, esses valores seriam lidos de sensores e transmissores no nível
    de campo. Aqui, os sliders permitem simular diferentes condições operacionais
    para observar impactos no processo, alarmes e intertravamentos.
  </p>
  <p className="ajuste-variaveis__nota-didatica">
    Os valores e faixas são didáticos e servem para demonstração acadêmica.
  </p>
</div>
```

### BLOCO 2 — "Como ler as tags industriais?"

```tsx
<details className="ajuste-variaveis__guia-tags">
  <summary>Como ler as tags industriais? ▾</summary>
  <div className="ajuste-variaveis__guia-conteudo">
    <p>
      A primeira parte da tag indica o tipo de variável ou equipamento.
      A parte numérica identifica a malha, área ou sequência do equipamento.
    </p>

    <table className="ajuste-variaveis__tabela-prefixos">
      <thead>
        <tr>
          <th>Prefixo</th>
          <th>Significado (EN)</th>
          <th>Português</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>F</td><td>Flow</td><td>Vazão</td></tr>
        <tr><td>L</td><td>Level</td><td>Nível</td></tr>
        <tr><td>P</td><td>Pressure</td><td>Pressão</td></tr>
        <tr><td>T</td><td>Temperature</td><td>Temperatura</td></tr>
        <tr><td>A</td><td>Analyzer</td><td>Analisador</td></tr>
        <tr><td>DP</td><td>Differential Pressure</td><td>Pressão diferencial</td></tr>
        <tr><td>I</td><td>Indicating</td><td>Indicador</td></tr>
        <tr><td>T (sufixo)</td><td>Transmitter</td><td>Transmissor</td></tr>
      </tbody>
    </table>

    <p>No simulador, os números identificam a área:</p>
    <ul>
      <li><strong>101</strong> — equipamentos da linha principal de tratamento</li>
      <li><strong>201</strong> — equipamentos do sistema de dosagem química</li>
    </ul>

    <p><strong>Exemplos:</strong></p>
    <ul>
      <li><strong>FIT-101</strong>: F=Vazão, I=Indicador, T=Transmissor, 101=linha principal</li>
      <li><strong>LIT-101</strong>: L=Nível, I=Indicador, T=Transmissor, 101=tanque principal</li>
      <li><strong>DPIT-101</strong>: DP=Pressão diferencial, I=Indicador, T=Transmissor, 101=filtro da linha principal</li>
      <li><strong>AIT-101</strong>: A=Analisador, I=Indicador, T=Transmissor, 101=ponto de análise (pH)</li>
      <li><strong>FIT-201</strong>: F=Vazão, I=Indicador, T=Transmissor, 201=sistema de dosagem química</li>
    </ul>

    <p className="ajuste-variaveis__nota-didatica">
      A numeração acima é uma simplificação didática inspirada em convenções industriais
      (como a ISA-5.1), não uma norma completa de engenharia de planta.
    </p>
  </div>
</details>
```

### Estilos CSS a adicionar em `componentes.css`

```css
/* Cabeçalho explicativo */
.ajuste-variaveis__introducao {
  margin-bottom: 12px;
  font-size: 0.8rem;
  color: var(--cor-texto-secundario);
  line-height: 1.5;
}
.ajuste-variaveis__introducao p + p {
  margin-top: 4px;
}
.ajuste-variaveis__nota-didatica {
  font-style: italic;
  font-size: 0.72rem;
  opacity: 0.8;
}

/* Guia de tags industriais */
.ajuste-variaveis__guia-tags {
  margin-bottom: 16px;
  border: 1px solid var(--cor-borda);
  border-radius: 6px;
  padding: 8px 12px;
  background-color: var(--cor-painel-claro);
}
.ajuste-variaveis__guia-tags > summary {
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  list-style: none;
  color: var(--cor-texto-secundario);
}
.ajuste-variaveis__guia-tags > summary::-webkit-details-marker { display: none; }
.ajuste-variaveis__guia-tags[open] > summary { color: var(--cor-texto); }
.ajuste-variaveis__guia-conteudo {
  margin-top: 10px;
  font-size: 0.75rem;
  color: var(--cor-texto-secundario);
  line-height: 1.5;
}
.ajuste-variaveis__guia-conteudo p { margin: 6px 0; }
.ajuste-variaveis__guia-conteudo ul { padding-left: 16px; margin: 4px 0; }
.ajuste-variaveis__guia-conteudo li { margin: 2px 0; }

/* Tabela de prefixos */
.ajuste-variaveis__tabela-prefixos {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0;
  font-size: 0.72rem;
}
.ajuste-variaveis__tabela-prefixos th,
.ajuste-variaveis__tabela-prefixos td {
  text-align: left;
  padding: 4px 8px;
  border-bottom: 1px solid var(--cor-borda);
}
.ajuste-variaveis__tabela-prefixos th {
  color: var(--cor-texto);
  font-weight: 600;
}
```

### Relevant Files

- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — adicionar dois blocos informativos
- `frontend/src/componentes/componentes.css` — adicionar estilos dos blocos

## Deliverables

- Cabeçalho explicativo visível acima dos cards **(REQUIRED)**
- Painel "Como ler as tags industriais?" colapsável e funcional **(REQUIRED)**
- Cards e lógica da task 34 inalterados **(REQUIRED)**
- Build e testes passando **(REQUIRED)**

## Tests

- Unit tests:
  - [ ] `cd frontend && npm run build` retorna exit code 0
  - [ ] `cd frontend && npm run test` retorna exit code 0
- Visual / integration:
  - [ ] Cabeçalho explicativo aparece acima dos cards com texto didático
  - [ ] Painel de nomenclatura começa recolhido
  - [ ] Painel expande ao clicar em "Como ler as tags industriais?"
  - [ ] Tabela de prefixos renderiza corretamente
  - [ ] Nota de simplificação didática é visível quando expandido
  - [ ] Sliders e lógica da seção continuam funcionais após as adições

## Success Criteria

- Seção "Ajuste manual de variáveis" completa: introdução + guia de tags + cards didáticos
- Todo o conteúdo informativo usa apenas HTML nativo e CSS sem dependências externas
- Build e testes passam sem erros ou warnings novos
