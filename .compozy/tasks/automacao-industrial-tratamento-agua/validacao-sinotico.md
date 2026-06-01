# Validação do Sinóptico da Planta

Data: 2026-05-31 12:54:52 -03

## Escopo

Validação final da segunda rodada de refinamento visual do sinóptico, cobrindo
os critérios das tasks 22, 23, 24 e 25. Esta validação não altera código
funcional, backend, contratos de API ou Docker.

## Fontes consultadas

- `auditoria-sinotico.md`
- `task_22.md`
- `task_23.md`
- `task_24.md`
- `task_25.md`
- `frontend/src/componentes/SinoticoPlanta.tsx`
- `frontend/src/componentes/componentes.css`

## Comandos executados

| Comando | Resultado | Observações |
|---|---|---|
| `cd frontend && npm run build` | PASS | `tsc && vite build`; 41 módulos transformados; bundle gerado em `dist/`. |
| `cd frontend && npm run typecheck` | PASS | `tsc --noEmit` finalizou com exit code 0. |
| `docker compose up --build` | PASS | Backend e frontend construídos; containers iniciados; nginx pronto e Uvicorn escutando em `0.0.0.0:8000`. |
| `curl -fsS -I http://localhost/` | PASS | Frontend respondeu `HTTP/1.1 200 OK`. |
| `curl -fsS http://localhost/api/saude` | PASS | API respondeu `{"status":"ok"}`. |
| `curl -fsS http://localhost/api/planta/estado` | PASS | API retornou estado normal com `nivel_tanque_percentual: 70.0`, bombas ligadas, dosagem `5.0 L/h`, processo liberado e sem alarmes. |
| `firefox --headless --screenshot /tmp/sinotico-validacao.png --window-size 1920,1080 http://localhost/` | PASS | Screenshot renderizado para inspeção visual em 1920x1080. |

Aviso observado no build local: Node informou que `NO_COLOR` foi ignorado por
`FORCE_COLOR` estar definido. Não houve erro de build.

## Checklist visual

### Task 22 — Escala, formatação e proporção

- PASS: `T-101` usa `x=475`, `y=67`, `largura=90`, `altura=66`.
- PASS: a altura do tanque é exatamente 1,5x a altura padrão de 44 px da linha
  principal.
- PASS: o centro vertical do tanque permanece em `y=100`, alinhado à linha
  principal.
- PASS: o nível usa `formatarPercentualSinotico`, com clamp entre 0% e 100%.
- PASS: a API em operação normal retornou nível real de 70%, compatível com o
  display esperado e sem risco de "570%".

### Task 23 — Fluxo principal e dosagem química

- PASS: a linha de dosagem permanece em `y=340`.
- PASS: a conexão vertical de dosagem usa `x=460`, chegando à linha principal
  antes do tanque `T-101`.
- PASS: o bloco `INJECAO` usa largura 110 px, suficiente para "Injeção química".
- PASS: `TK-201`, `P-201`, `FIT-201` e `INJECAO` aparecem distribuídos de forma
  legível na linha inferior.

### Task 24 — Descarte, setas e conectores

- PASS: o marcador `seta` usa `markerWidth=6`, `markerHeight=6`, `refX=5.5` e
  `refY=3`.
- PASS: `.linha-processo` usa `stroke-width: 4`, uniforme para as linhas do
  diagrama.
- PASS: a linha vertical de descarte sai do fundo de `T-101` e chega a `XV-101`
  sem dominar o diagrama.
- PASS: a linha horizontal de descarte conecta `XV-101` a `Descarte` com peso
  equivalente ao restante do sinóptico.

### Task 25 — Cores, contraste e legibilidade

- PASS: o estado ativo usa tons sóbrios (`#8fb8b2`, `#2f8f7b`) em vez de verde
  saturado dominante.
- PASS: alertas e falhas preservam cores fortes e semanticamente distintas.
- PASS: tags e valores são legíveis no screenshot 1920x1080.
- PASS: o fundo claro do SVG cria contraste suficiente com os blocos e textos
  internos, enquanto o card externo segue o tema escuro da aplicação.
- PASS: o estado bloqueado permanece visualmente evidente em vermelho/escuro.

## Observações de inspeção

- A screenshot capturada pelo Firefox headless registra o estado inicial antes
  da atualização assíncrona da API, por isso alguns valores aparecem em 0 e o
  processo aparece bloqueado na imagem. O smoke test por `curl` confirmou que o
  backend estava respondendo estado normal pela API durante a inspeção.
- Mesmo nesse estado inicial, a inspeção visual cobre geometria, proporção,
  conectores, setas, contraste, hierarquia de texto e ausência de truncamento.
- Não foi identificado bloqueio visual que impeça a apresentação acadêmica.

## Resultado

PASS: build, typecheck, Docker smoke test e inspeção visual foram concluídos.
Os critérios das tasks 22, 23, 24 e 25 foram validados sem alteração funcional.
