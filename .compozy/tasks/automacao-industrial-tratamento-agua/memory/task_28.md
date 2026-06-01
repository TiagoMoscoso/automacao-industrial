# Task Memory: task_28.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot

Adicionar prop `descricao?: string` em `CartaoVariavel` e passar `obterMetadados(tag)?.nomeAbreviado` de `PaginaPrincipal` para todos os 10 cards de variáveis de processo.

## Important Decisions

- A descrição é renderizada logo abaixo da `<div className="cartao-variavel__tag">` e antes do `<div className="cartao-variavel__nome">`, preservando a hierarquia visual esperada no spec.
- Classe CSS `.cartao-variavel__descricao` adicionada em `componentes.css` usando `var(--cor-texto-secundario, #8a9bb5)` — variável já definida no tema dark.

## Learnings

- `obterMetadados` já estava exportada de `equipamentos.ts` (task 27); basta importar e usar.
- A função `variaveisProcesso` retorna objetos com `tag`, então a chamada `obterMetadados(variavel.tag)` funciona diretamente no `.map()` do JSX.

## Files / Surfaces

- `frontend/src/componentes/CartaoVariavel.tsx` — prop `descricao` adicionada, span condicional inserido.
- `frontend/src/componentes/componentes.css` — `.cartao-variavel__descricao` adicionada.
- `frontend/src/paginas/PaginaPrincipal.tsx` — import de `obterMetadados`; prop `descricao` passada em cada `CartaoVariavel`.

## Errors / Corrections

Nenhum.

## Ready for Next Run

Task concluída. Diff pronto para revisão manual e commit. Build e 57 testes passando.
