---
status: completed
title: Refinar linha de descarte, setas e conectores
type: frontend
complexity: medium
dependencies:
  - task_23
---

# Task 24: Refinar linha de descarte, setas e conectores

## Overview
Reduzir o peso visual da seta verde vertical (que conecta a linha principal à linha de descarte), aliviar a espessura e comprimento da linha de descarte do tanque T-101 até XV-101 e Descarte, e uniformizar o tamanho e estilo de todas as setas e conectores do diagrama para que tenham aparência discreta e consistente, como em um diagrama técnico industrial.

<critical>
- ALWAYS READ `auditoria-sinotico.md` (task_21) e `SinoticoPlanta.tsx` atual (após task_23) antes de começar
- ALWAYS READ `componentes.css` para entender as classes de linha (`.linha-processo`, `.linha-processo--ativa`)
- REFERENCE o marcador `<marker id="seta">` definido no `<defs>` do SVG — ajustar suas dimensões afeta todas as setas do diagrama
- FOCUS ON "WHAT" — ajustar geometria e estilos de conectores; não alterar lógica de estado
- TESTS REQUIRED — `npm run build` e `npm run typecheck` devem passar ao final
</critical>

<requirements>
- MUST reduzir as dimensões do marcador `seta` (`markerWidth`, `markerHeight`) para que as setas sejam menores e mais discretas
- MUST ajustar a espessura (`stroke-width`) da linha de descarte para que seja equivalente à espessura da linha principal (sem destaque excessivo)
- MUST verificar se a seta vertical dominante é causada pelo tamanho do marcador ou por uma linha separada com stroke-width excessivo, e corrigir conforme o caso
- MUST NÃO alterar a semântica de cores: verde = fluxo ativo, vermelho = alerta/falha, cinza = inativo
- MUST NÃO alterar a lógica de estado (funções `estadoEquipamento`, `temAlarme`, classes CSS de estado)
- MUST NÃO alterar contratos da API nem tipos de domínio
- MUST NÃO adicionar dependências externas
- SHOULD garantir que todas as linhas do diagrama (principal, descarte, dosagem, verticais de conexão) usem o mesmo marcador de seta e tenham stroke-width consistente
- SHOULD verificar que a linha de descarte termina corretamente em DESCARTE sem parecer pesada ou abrupta
</requirements>

## Subtasks
- [x] 24.1 Ler `auditoria-sinotico.md` e identificar as dimensões atuais do marcador `seta` e dos `stroke-width` de cada linha
- [x] 24.2 Ajustar `<marker id="seta">` no `<defs>` para reduzir tamanho da seta (ex: `markerWidth="6" markerHeight="6"` em vez do atual)
- [x] 24.3 Verificar e uniformizar `stroke-width` de todas as linhas (`<line>` e `<path>`) no SVG
- [x] 24.4 Reduzir espessura da linha de descarte se ela usar `stroke-width` maior que a linha principal
- [x] 24.5 Verificar e ajustar a linha vertical de conexão entre linha principal e linha de descarte
- [x] 24.6 Executar `cd frontend && npm run build` e `npm run typecheck` e confirmar sucesso
- [x] 24.7 Inspecionar visualmente no navegador que as setas são discretas e consistentes

## Implementation Details
O marcador `<marker id="seta">` atual provavelmente tem dimensões em torno de `markerWidth="10" markerHeight="10"` ou superior. Para setas discretas num diagrama técnico, recomenda-se `markerWidth="6" markerHeight="6"` com `refX` e `refY` ajustados proporcionalmente.

O `stroke-width` das linhas em `.linha-processo` no CSS atual é `5`. Para um visual mais técnico e menos pesado, considerar reduzir para `3` ou `4`.

A seta verde vertical dominante pode ser uma linha com classe `.linha-processo--ativa` cujo comprimento (diferença entre y=100 e y=230 = 130px) a torna visualmente grande com o marcador atual. Reduzir o marcador resolve o problema sem alterar a geometria.

Ao ajustar `stroke-width` em CSS (`.linha-processo`), a alteração afeta todas as linhas — verificar que isso não prejudica a legibilidade das linhas horizontais curtas.

### Relevant Files
- `frontend/src/componentes/SinoticoPlanta.tsx` — marcador `seta`, linhas verticais e de descarte
- `frontend/src/componentes/componentes.css` — classe `.linha-processo` com `stroke-width`

### Dependent Files
- `frontend/src/componentes/SinoticoPlanta.tsx` — modificado por esta task
- `frontend/src/componentes/componentes.css` — possivelmente modificado por esta task

## Deliverables
- `SinoticoPlanta.tsx` com setas menores e discretas **(REQUIRED)**
- Linhas do diagrama com `stroke-width` uniforme **(REQUIRED)**
- `npm run build` passando **(REQUIRED)**

## Tests
- Unit tests:
  - [x] `npm run typecheck` retorna exit code 0 sem erros TypeScript
  - [x] `npm run build` retorna exit code 0
- Integration tests:
  - [x] No navegador, a seta vertical entre linha principal e descarte não domina visualmente o diagrama
  - [x] Todas as setas do diagrama têm tamanho visualmente consistente
  - [x] A linha de descarte tem peso visual equivalente à linha principal
  - [x] A linha de dosagem química usa o mesmo estilo de seta que as demais linhas
  - [x] Estados de alarme (linha vermelha) continuam visíveis e evidentes
- Test coverage target: N/A (ajuste visual)
- All tests must pass

## Success Criteria
- Seta vertical não domina o diagrama — proporcional às demais setas
- Todas as linhas com `stroke-width` uniforme
- Linha de descarte com peso visual equilibrado
- Aspecto geral de diagrama técnico limpo, não cartum
- `npm run build` e `npm run typecheck` passando sem erros
- Semântica de cores preservada (verde ativo, vermelho alerta, cinza inativo)
