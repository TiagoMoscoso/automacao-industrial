# PRD — Refinamento Visual do Frontend Supervisório

## 1. Visão geral

Este PRD define uma nova etapa de refinamento visual para o frontend do projeto
**Automação Industrial: Simulador Web de Tratamento de Água**.

O projeto já possui backend Python, frontend React, integração frontend-backend,
Docker Compose, documentação técnica e roteiro de apresentação concluídos. A
fila anterior de implementação foi concluída até a task 13.

Esta nova etapa não deve recriar o projeto, não deve refazer a arquitetura e não
deve implementar código imediatamente. O objetivo deste PRD é orientar Codex,
Claude Code ou outro agente de desenvolvimento a criar uma nova fila de tasks
pequenas, sequenciais e verificáveis para melhorar a interface atual.

A motivação principal é que o frontend atual está funcional, mas visualmente
confuso, pesado e pouco elegante para uma apresentação acadêmica. A interface
precisa ser mais limpa, minimalista, didática e convincente como tela
supervisória simplificada.

O foco desta etapa é transformar a interface em uma maquete industrial clara:
o usuário deve entender rapidamente o fluxo da planta, o estado do processo, os
alarmes ativos, os atuadores e os efeitos da Matriz de Causa e Efeito.

---

## 2. Contexto atual do projeto

### 2.1. Estado atual

As seguintes entregas já foram concluídas:

- Estrutura do monorepo.
- Camada de domínio do backend.
- Matriz de Causa e Efeito.
- Simulador da planta.
- API HTTP do backend.
- Domínio e serviços do frontend.
- Componentes React.
- Página principal e integração frontend-backend.
- Painel de ajuste manual de variáveis.
- Docker Compose.
- Configuração de debug no VS Code.
- Documentação técnica.
- Roteiro de apresentação e verificação final.

Portanto, esta etapa deve partir do estado atual do repositório, sem recriar
tasks anteriores.

### 2.2. Decisões já existentes

Os agentes devem respeitar as decisões registradas no workflow memory:

- A `.venv` existente na raiz deve ser usada para qualquer comando Python.
- Não criar outro ambiente virtual.
- Não existe TechSpec separado; as seções técnicas de `specs.md` são a fonte de
  verdade técnica.
- Todo código, texto autoral, comentários, mensagens, variáveis e nomes de
  domínio devem estar em português do Brasil.
- Os endpoints de backend já existem e devem ser preservados.
- O frontend consome os contratos camelCase mapeados a partir da API em
  snake_case.
- Docker BuildKit/Bake pode falhar por causa do caminho com acento. Caso isso
  ocorra, usar:

```bash
COMPOSE_BAKE=false DOCKER_BUILDKIT=0 docker compose up --build
```

---

## 3. Problema

A tela atual cumpre o papel funcional, mas apresenta problemas de apresentação:

1. O visual está confuso e pouco refinado.
2. A interface possui excesso de áreas concorrendo pela atenção.
3. O painel de simulação com os botões `Iniciar`, `Pausar` e `Reiniciar` ocupa
   espaço e não agrega valor à narrativa da apresentação.
4. O sinóptico da planta está visualmente bruto.
5. Algumas setas e conexões do sinóptico estão mal alinhadas ou mal formatadas.
6. A hierarquia visual entre sinóptico, variáveis, alarmes, atuadores e cenários
   ainda não está clara.
7. As cores de estado parecem mais decorativas do que semânticas.
8. A interface passa sensação de protótipo, não de demonstração acadêmica
   elegante.

---

## 4. Objetivo do produto nesta etapa

Criar uma nova fila de tasks para refinar o frontend, com os seguintes objetivos:

1. Tornar a tela principal mais limpa, moderna e minimalista.
2. Dar protagonismo visual ao sinóptico da planta.
3. Remover da interface o painel de controle da simulação com os botões
   `Iniciar`, `Pausar` e `Reiniciar`.
4. Manter os cenários de demonstração.
5. Manter o ajuste manual de variáveis.
6. Manter alarmes, atuadores e variáveis de processo.
7. Corrigir o alinhamento de setas, linhas e conexões do sinóptico.
8. Melhorar legibilidade, espaçamento, densidade visual e consistência dos
   cards.
9. Preservar a integração com o backend.
10. Preservar Docker Compose, VS Code debug e estrutura atual do projeto.

---

## 5. Não objetivos

Esta etapa não deve:

- Reescrever o backend.
- Remover endpoints do backend.
- Refazer a Matriz de Causa e Efeito.
- Alterar contratos da API sem necessidade.
- Criar autenticação.
- Criar banco de dados.
- Criar histórico de dados.
- Criar gráficos complexos.
- Transformar o simulador em SCADA real.
- Adicionar bibliotecas visuais pesadas sem justificativa.
- Implementar código antes da criação e validação das tasks.
- Recriar tasks anteriores.
- Recriar o PRD original do produto inteiro.
- Criar um TechSpec completo separado, salvo se o agente identificar uma
  necessidade incontornável e registrar a justificativa.

---

## 6. Usuários

### 6.1. Usuário principal: estudante apresentador

O estudante precisa apresentar a planta em até 15 minutos. Ele precisa de uma
interface que explique a automação com clareza, sem exigir esforço cognitivo do
professor ou da banca.

Durante a apresentação, o estudante deve conseguir:

- Mostrar a linha de processo.
- Acionar cenários prontos.
- Demonstrar alarmes.
- Mostrar atuadores mudando de estado.
- Mostrar variáveis relevantes.
- Alterar variáveis manualmente.
- Explicar a Matriz de Causa e Efeito sem se perder na interface.

### 6.2. Usuário secundário: professor avaliador

O professor precisa avaliar se o projeto demonstra corretamente:

- Instrumentação.
- Variáveis de processo.
- Atuadores.
- Intertravamentos.
- Alarmes.
- Matriz de Causa e Efeito.
- Arquitetura de supervisão simulada.

A interface deve ser didática o bastante para que o professor entenda o sistema
sem precisar conhecer previamente o código.

---

## 7. Requisitos funcionais

### RF01 — Criar nova fila de tasks

O agente deve criar uma nova fila de tasks para o refinamento visual do
frontend.

As tasks devem ser salvas em `.tasks/`.

Também deve ser atualizado o arquivo `tasks.md`, caso ele exista.

As novas tasks devem continuar depois da última task já executada. Se a task 13
foi a última concluída, a nova fila deve começar na task 14.

### RF02 — Não implementar código nesta fase

O agente que receber este PRD deve apenas criar tasks. Ele não deve implementar
o refinamento visual ainda.

A implementação deve acontecer depois, task por task.

### RF03 — Auditar frontend atual

A nova fila deve conter uma task inicial para auditar a estrutura atual do
frontend.

Essa task deve identificar:

- Página principal.
- Componente do sinóptico.
- Componente de controle da simulação, se existir.
- Painel de cenários.
- Painel de alarmes.
- Painel de atuadores.
- Cards de variáveis.
- Arquivos CSS ou equivalentes.
- Pontos de acoplamento com a API.

### RF04 — Remover controles de simulação da interface

A nova fila deve conter uma task para remover da interface o painel ou seção que
contém os botões:

- `Iniciar`
- `Pausar`
- `Reiniciar`

Essa remoção deve ser apenas visual/frontend.

Os endpoints do backend não devem ser removidos nesta etapa.

### RF05 — Manter cenários de demonstração

Os botões de cenários devem permanecer na interface.

A demonstração deve continuar permitindo acionar:

- Operação normal.
- Nível alto-alto.
- Nível baixo-baixo.
- pH fora da faixa.
- Turbidez alta.
- Emergência.

### RF06 — Manter ajuste manual de variáveis

O painel de ajuste manual de variáveis deve permanecer disponível, mas pode ser
reposicionado ou receber menor destaque visual.

Ele deve continuar permitindo que o usuário provoque condições de falha.

### RF07 — Redesenhar layout principal

A nova fila deve conter uma task para redesenhar o layout principal da tela.

Direção visual desejada:

```text
┌─────────────────────────────────────────────────────────────┐
│ Planta de Tratamento de Água             Status do Processo │
├───────────────────────────────────────┬─────────────────────┤
│                                       │ Alarmes             │
│           Sinóptico da Planta         │ Atuadores           │
│                                       │ Cenários            │
├───────────────────────────────────────┴─────────────────────┤
│ Variáveis de Processo                                       │
├─────────────────────────────────────────────────────────────┤
│ Ajuste Manual de Variáveis                                  │
└─────────────────────────────────────────────────────────────┘
```

O layout não precisa seguir exatamente esse desenho, mas deve respeitar a ideia:

- Sinóptico como elemento principal.
- Status geral em local óbvio.
- Painéis laterais compactos.
- Variáveis organizadas em grade ou faixa inferior.
- Ajuste manual menos dominante.
- Menos ruído visual.

### RF08 — Melhorar o sinóptico da planta

A nova fila deve conter uma task dedicada ao sinóptico.

O agente deve avaliar se o componente deve ser refeito com SVG ou outra
estrutura visual mais precisa.

Direção recomendada: usar SVG para linhas, setas e equipamentos, pois isso
permite melhor controle geométrico.

O sinóptico deve representar:

```text
Água Bruta -> FV-101 -> FIT-101 -> P-101 -> Filtro F-101 -> Tanque T-101 -> P-102 -> Processo

Tanque T-101 -> XV-101 -> Descarte

TK-201 -> P-201 -> FIT-201 -> Injeção química antes do tanque
```

Critérios visuais:

- Linhas alinhadas.
- Setas consistentes.
- Equipamentos com espaçamento regular.
- Tags industriais legíveis.
- Linha de descarte clara.
- Linha de dosagem química clara.
- Cores usadas apenas para estado operacional.
- Evitar estética carnavalesca.

### RF09 — Polir painéis operacionais

A nova fila deve conter uma task para melhorar:

- Painel de variáveis.
- Painel de alarmes.
- Painel de atuadores.
- Painel de cenários.
- Indicador de processo liberado/bloqueado.

Os painéis devem ficar visualmente coesos.

Estados devem ser claros:

- Normal.
- Alerta.
- Crítico.
- Ligado/desligado.
- Aberto/fechado.
- Processo liberado/bloqueado.

### RF10 — Validar build e execução

A nova fila deve conter uma task final de validação técnica e visual.

Validações mínimas:

```bash
cd frontend
npm run build
```

E validação com Docker:

```bash
docker compose up --build
```

Caso ocorra erro de BuildKit/Bake por caminho com acento:

```bash
COMPOSE_BAKE=false DOCKER_BUILDKIT=0 docker compose up --build
```

A validação também deve incluir inspeção visual manual no navegador.

---

## 8. Requisitos não funcionais

### RNF01 — Clareza visual

A tela deve comunicar em poucos segundos:

- Fluxo da planta.
- Estado do processo.
- Alarmes.
- Atuadores.
- Causa e efeito dos cenários.

### RNF02 — Minimalismo

A interface deve abandonar excesso de bordas, blocos pesados, cores competindo
entre si e áreas vazias sem propósito.

O visual desejado é limpo, técnico e didático.

### RNF03 — Consistência

Componentes semelhantes devem ter aparência semelhante.

Estados semelhantes devem usar linguagem visual semelhante.

### RNF04 — Sem lógica industrial no frontend

O frontend não deve implementar regra de controle.

Toda decisão sobre bombas, válvulas, alarmes e bloqueio de processo deve vir do
backend.

### RNF05 — Baixo risco

As tasks devem evitar mudanças arriscadas em backend, Docker, API e estrutura
global.

O refinamento deve ser incremental e verificável.

---

## 9. Restrições técnicas

Os agentes devem respeitar:

- Frontend em TypeScript + React.
- Backend em Python já existente.
- API atual já existente.
- Docker Compose já existente.
- `.venv` existente para qualquer execução Python.
- Código e textos autorais em português do Brasil.
- Clean Code, SOLID e separação de responsabilidades.
- Tasks pequenas, objetivas e verificáveis.
- Nada de implementar tudo em uma única task.
- Nada de mexer no backend sem necessidade explícita.
- Nada de criar dependência visual pesada sem justificativa.

---

## 10. Entregáveis esperados deste PRD

A execução deste PRD deve gerar apenas planejamento.

Entregáveis obrigatórios:

1. Novos arquivos de task em `.tasks/`.
2. Atualização do `tasks.md`, se existir.
3. Registro na memória do workflow, se existir.
4. Nenhuma implementação de código.
5. Nenhuma alteração destrutiva em frontend/backend.

---

## 11. Estrutura mínima das novas tasks

Cada task criada deve conter:

- Título.
- Objetivo.
- Contexto.
- Entradas.
- Saídas esperadas.
- Restrições.
- Critérios de aceite.
- Status.
- Dependências.
- Validações necessárias.

---

## 12. Sugestão de fila de tasks

A fila sugerida é:

| # | Título | Dependência | Complexidade |
|---|---|---|---|
| 14 | Auditar frontend atual | task_13 | baixa |
| 15 | Remover controles de simulação da interface | task_14 | baixa |
| 16 | Redesenhar layout principal | task_15 | média |
| 17 | Refatorar sinóptico da planta | task_16 | alta |
| 18 | Polir painéis operacionais | task_17 | média |
| 19 | Validar build, Docker e inspeção visual | task_18 | média |
| 20 | Revisão final do refinamento frontend | task_19 | baixa |

O agente pode ajustar nomes e granularidade, desde que mantenha tasks pequenas,
sequenciais e verificáveis.

---

## 13. Critérios de aceite da criação de tasks

A criação das tasks será considerada concluída quando:

1. As tasks novas existirem em `.tasks/`.
2. A fila não recriar tasks antigas.
3. A numeração continuar depois da última task concluída.
4. Cada task tiver objetivo claro.
5. Cada task tiver critérios de aceite verificáveis.
6. As tasks não mandarem implementar tudo de uma vez.
7. A remoção dos controles de simulação estiver isolada em uma task própria.
8. O redesenho do layout estiver isolado em uma task própria.
9. O sinóptico tiver uma task própria.
10. A validação final estiver prevista.
11. `tasks.md` estiver atualizado, se existir.
12. A memória do workflow estiver atualizada, se existir.

---

## 14. Critérios de aceite futuros do refinamento visual

Embora este PRD peça apenas a criação das tasks, as tasks geradas devem mirar os
seguintes critérios finais:

1. O painel `Simulação` não aparece mais na interface.
2. Os botões `Iniciar`, `Pausar` e `Reiniciar` não aparecem mais na interface.
3. Os cenários de demonstração continuam funcionando.
4. O ajuste manual de variáveis continua funcionando.
5. O sinóptico está mais alinhado, limpo e legível.
6. As setas e conexões do sinóptico estão visualmente consistentes.
7. Os cards têm espaçamento e hierarquia melhores.
8. Alarmes e estados críticos são evidentes sem poluição visual.
9. A tela parece adequada para uma apresentação acadêmica.
10. `npm run build` passa.
11. `docker compose up --build` funciona.
12. A interface continua se comunicando com o backend.

---

## 15. Prompt operacional para o agente

Após ler este PRD, o agente deve:

1. Ler `specs.md`.
2. Ler o PRD original, se existir.
3. Ler o `MEMORY.md`, se existir.
4. Ler `tasks.md`, se existir.
5. Inspecionar `.tasks/`, se existir.
6. Consultar as skills locais em `.agents/skills/` e `.claude/skills/`.
7. Usar a skill adequada de criação de tasks.
8. Criar a nova fila de tasks para refinamento visual do frontend.
9. Atualizar `tasks.md`.
10. Atualizar a memória do workflow.
11. Parar.

O agente não deve implementar código nesta execução.
