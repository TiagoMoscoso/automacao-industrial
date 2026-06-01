---
status: completed
title: Exibir descrição didática no painel de ajuste de variáveis
type: frontend
complexity: low
dependencies:
    - task_27
---

# Task 29: Exibir descrição didática no painel de ajuste de variáveis

## Overview

Atualizar `PainelAjusteVariaveis` para exibir o `nomeAbreviado` do catálogo
de equipamentos abaixo da tag de cada variável, acima do slider. O painel já
possui um campo `nome` no array `VARIAVEIS_PROCESSO`, mas ele pode conter
strings duplicadas que devem ser substituídas ou complementadas pela fonte
centralizada da task 27.

O resultado visual esperado acima de cada slider:

```
FIT-101
Sensor de vazão de entrada
[====●==========] 10,0 m³/h
```

<critical>
- ALWAYS READ `PainelAjusteVariaveis.tsx` completo antes de editar
- ALWAYS READ `frontend/src/dominio/equipamentos.ts` (task 27) antes de começar
- ALWAYS READ `componentes.css` para entender classes existentes
- DO NOT alterar a lógica de debounce nem o mecanismo de envio de comandos
- DO NOT alterar a lógica de destaque de alarmes críticos (`campo-ajuste--critico`)
- DO NOT remover o campo `nome` do array VARIAVEIS_PROCESSO sem análise — ele pode ser usado em outros lugares
- DO NOT alterar backend, API ou Docker
</critical>

<requirements>
- MUST usar `obterMetadados(variavel.tag)?.nomeAbreviado` para obter a descrição de cada variável
- MUST exibir a descrição abaixo da tag no cabeçalho de cada campo de ajuste
- MUST importar `obterMetadados` de `../dominio/equipamentos`
- MUST NÃO duplicar strings de descrição dentro do array `VARIAVEIS_PROCESSO` ou do JSX
- MUST NÃO alterar a lógica de slider, debounce ou envio de comando
- MUST NÃO alterar o destaque visual de alarmes críticos
- SHOULD usar classe CSS reutilizável para a descrição (verificar se `.cartao-variavel__descricao` é adequada ou criar `.campo-ajuste__descricao` separada)
- SHOULD manter a hierarquia visual: tag em destaque, descrição menor, slider abaixo
</requirements>

## Subtasks

- [ ] 29.1 Ler `PainelAjusteVariaveis.tsx` completo e `equipamentos.ts`
- [ ] 29.2 Verificar se a classe `.cartao-variavel__descricao` (task 28) pode ser reutilizada ou se é necessária classe própria
- [ ] 29.3 Importar `obterMetadados` no início de `PainelAjusteVariaveis.tsx`
- [ ] 29.4 Adicionar renderização do `nomeAbreviado` no JSX de cada campo de ajuste
- [ ] 29.5 Adicionar classe CSS se necessário em `componentes.css`
- [ ] 29.6 Executar `cd frontend && npm run build`
- [ ] 29.7 Executar `cd frontend && npm run test`
- [ ] 29.8 Verificar visualmente o painel de ajuste no navegador

## Implementation Details

### PainelAjusteVariaveis.tsx

No trecho que renderiza o cabeçalho de cada campo, adicionar logo abaixo da tag:

```tsx
import { obterMetadados } from '../dominio/equipamentos';

// Dentro do map/render de cada variável:
<label className="campo-ajuste__label">
  <span className="campo-ajuste__tag">{variavel.tag}</span>
  {obterMetadados(variavel.tag)?.nomeAbreviado && (
    <span className="campo-ajuste__descricao">
      {obterMetadados(variavel.tag)?.nomeAbreviado}
    </span>
  )}
</label>
```

### CSS — verificar reuso vs nova classe

Se `.cartao-variavel__descricao` já tiver os estilos adequados (0.7rem, cor fraca),
criar um alias ou reutilizar diretamente. Caso o contexto de painel exija ajuste
diferente (ex: fundo de outro tom), criar `.campo-ajuste__descricao` com estilos próprios.

### Relevant Files

- `frontend/src/componentes/PainelAjusteVariaveis.tsx` — componente a ser atualizado
- `frontend/src/componentes/componentes.css` — adicionar classe se necessário
- `frontend/src/dominio/equipamentos.ts` — fonte das descrições (task 27)

## Deliverables

- `PainelAjusteVariaveis.tsx` exibindo `nomeAbreviado` acima de cada slider **(REQUIRED)**
- Build passando **(REQUIRED)**
- Testes existentes passando **(REQUIRED)**

## Tests

- Unit tests:
  - [ ] `cd frontend && npm run build` retorna exit code 0
  - [ ] `cd frontend && npm run test` retorna exit code 0
- Integration tests:
  - [ ] Cada slider exibe tag + descrição curta acima
  - [ ] Lógica de debounce e envio de comando não foi afetada
  - [ ] Destaque de alarme crítico (`campo-ajuste--critico`) continua funcional
  - [ ] Layout do painel não quebra

## Success Criteria

- Painel de ajuste exibe descrição didática para todas as 10 variáveis de processo
- Nenhuma string duplicada: apenas o catálogo é a fonte
- Build e testes passam
