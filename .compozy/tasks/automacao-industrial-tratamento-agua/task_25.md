---
status: completed
title: Polir estados visuais, cores e legibilidade
type: frontend
complexity: medium
dependencies:
  - task_24
---

# Task 25: Polir estados visuais, cores e legibilidade

## Overview

Polir a linguagem visual do sinóptico da planta, reduzindo excesso de verde,
melhorando contraste, legibilidade das tags industriais e clareza dos estados.
O objetivo é transformar o sinóptico em uma maquete industrial didática,
geométrica e elegante, onde cores indiquem estado operacional em vez de servirem
como decoração dominante.

<critical>
- ALWAYS READ `auditoria-sinotico.md` antes de começar
- ALWAYS READ `SinoticoPlanta.tsx` e `componentes.css` completos antes de alterar estilos
- REFERENCE o resultado das tasks 22, 23 e 24 para preservar a geometria já ajustada
- FOCUS ON "WHAT" — polir aparência e legibilidade; não alterar regra de controle
- TESTS REQUIRED — `npm run build` e inspeção visual devem passar ao final
</critical>

<requirements>
- MUST reduzir o excesso de verde no sinóptico
- MUST manter cores com semântica operacional clara
- MUST melhorar legibilidade das tags industriais
- MUST melhorar legibilidade dos valores exibidos nos equipamentos
- MUST garantir que estado normal, alerta, falha e bloqueio sejam visualmente distinguíveis
- MUST preservar contraste suficiente em tema escuro
- MUST NÃO alterar backend
- MUST NÃO alterar contratos da API
- MUST NÃO alterar Docker
- MUST NÃO mexer no painel de cenários
- MUST NÃO mexer no ajuste manual de variáveis
- MUST NÃO implementar lógica industrial no frontend
- MUST NÃO adicionar dependências externas
- SHOULD usar tons mais sóbrios para estado normal
- SHOULD reservar cores fortes para alerta, falha, bloqueio e emergência
- SHOULD evitar que todos os blocos ativos pareçam alarmes visuais
- SHOULD aproveitar melhor o espaço interno do card do sinóptico
</requirements>

## Subtasks

- [x] 25.1 Ler `auditoria-sinotico.md` e identificar problemas de cor, contraste e legibilidade
- [x] 25.2 Auditar classes CSS usadas por equipamentos, linhas, setas, textos e estados
- [x] 25.3 Ajustar paleta do estado normal para tons mais sóbrios e industriais
- [x] 25.4 Preservar cores fortes apenas para estados críticos, alertas e bloqueios
- [x] 25.5 Melhorar hierarquia visual entre tag, valor e descrição dos equipamentos
- [x] 25.6 Ajustar tamanhos de fonte, peso e espaçamento interno dos blocos, se necessário
- [x] 25.7 Verificar contraste em tema escuro
- [x] 25.8 Executar `cd frontend && npm run build`
- [x] 25.9 Executar `cd frontend && npm run typecheck`, se o script existir
- [x] 25.10 Inspecionar visualmente o sinóptico no navegador

## Implementation Details

A task deve atuar preferencialmente em:

- `frontend/src/componentes/componentes.css`
- `frontend/src/componentes/SinoticoPlanta.tsx`

O estado normal não deve usar um verde gritante em todos os blocos. Isso cria
ruído visual e enfraquece a leitura dos alarmes. A interface deve parecer uma
tela supervisória didática e sóbria.

Direção visual recomendada:

- estado normal: tom discreto, técnico e pouco saturado;
- estado ativo: destaque moderado;
- alerta: amarelo/âmbar controlado;
- falha/crítico: vermelho evidente;
- bloqueado: vermelho ou cinza escuro com semântica clara;
- linhas principais: cor limpa e consistente;
- textos: contraste alto e peso tipográfico coerente.

O foco não é criar uma estética decorativa. O foco é tornar o fluxo mais legível
e os estados mais fáceis de explicar durante uma apresentação acadêmica.

### Relevant Files

- `frontend/src/componentes/SinoticoPlanta.tsx` — estrutura do sinóptico
- `frontend/src/componentes/componentes.css` — estilos visuais dos componentes
- `frontend/src/estilos/principal.css` — variáveis globais de tema, se necessário
- `.compozy/tasks/automacao-industrial-tratamento-agua/auditoria-sinotico.md` — auditoria criada na task 21

### Dependent Files

- `frontend/src/componentes/SinoticoPlanta.tsx` — será validado na task 26
- `frontend/src/componentes/componentes.css` — será validado na task 26

## Deliverables

- Sinóptico com paleta visual mais sóbria **(REQUIRED)**
- Tags e valores legíveis **(REQUIRED)**
- Estados visuais coerentes e semanticamente claros **(REQUIRED)**
- `npm run build` passando **(REQUIRED)**

## Tests

- Unit tests:
  - [x] `cd frontend && npm run build` retorna exit code 0
  - [x] `cd frontend && npm run typecheck` retorna exit code 0, se o script existir
- Integration tests:
  - [x] No navegador, tags industriais são legíveis em 1920x1080
  - [x] Valores de processo são legíveis dentro dos blocos
  - [x] Estado normal não domina a tela com verde excessivo
  - [x] Alertas e falhas continuam visualmente evidentes
  - [x] Linhas e equipamentos mantêm coerência visual
- Test coverage target: N/A
- All tests must pass

## Success Criteria

- Paleta do sinóptico mais limpa, técnica e menos saturada
- Cores usadas como semântica operacional, não como ornamento
- Tags e valores fáceis de ler durante apresentação
- Estados críticos evidentes sem poluir o diagrama
- Nenhuma alteração em backend, API, Docker ou lógica industrial
- Build do frontend passando
