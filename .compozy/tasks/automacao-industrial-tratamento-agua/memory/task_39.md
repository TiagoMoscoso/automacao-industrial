# Task Memory: task_39.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Atualizar o `README.md` com uma seção "Arquitetura de Automação" que
  atenda ao requisito acadêmico #4, usando
  `frontend/src/dados/arquiteturaAutomacao.ts` como fonte de verdade para
  equipamentos e equivalências.

## Important Decisions
- `AGENTS.md` e `CLAUDE.md` não existem neste repositório; prosseguir com
  `_prd.md`, `.specs/specs.md`, ADR, task 36 e arquivos de documentação.
- Manter `docs/arquitetura-automacao.md` intacto nesta task; o requisito
  obrigatório é adicionar a seção ao `README.md` sem reescrever documentos.

## Learnings
- O `README.md` não possuía seção dedicada "Arquitetura de Automação" antes
  desta task, embora já listasse `docs/arquitetura-automacao.md` como
  documento técnico.
- `arquiteturaAutomacao.ts` possui 16 itens de campo, 11 de controle, 6 de
  supervisão, 5 de rede e exatamente 6 equivalências real x simulado.
- O Mermaid CLI (`mmdc`) retornou exit code 1 sem stderr útil no wrapper `npx`,
  mas gerou `/tmp/arquitetura-readme.svg` com SVG `flowchart`; usar também
  validações estruturais do README para evidência de conteúdo.
- A validação final do Mermaid usou o pacote `mermaid` em cache do `npx` com
  `jsdom` do frontend; `mermaid.parse` retornou `Mermaid parse result: valid`.

## Files / Surfaces
- `README.md`
- `.compozy/tasks/automacao-industrial-tratamento-agua/task_39.md`
- `.compozy/tasks/automacao-industrial-tratamento-agua/_tasks.md`

## Errors / Corrections
- `rg` não está instalado no ambiente; usar `find` para buscas de arquivos.
- `.compozy/tasks/automacao-industrial-tratamento-agua/specs.md` não existe;
  a especificação técnica fica em `.specs/specs.md`, conforme memória
  compartilhada e ADR.

## Ready for Next Run
- Task 39 implementada e validada: o `README.md` tem seção "Arquitetura de
  Automação" com Mermaid `graph TD`, lista por camada, comunicação,
  equivalência real x simulado com 6 linhas e diferenciação entre P&ID,
  sinóptico e arquitetura.
