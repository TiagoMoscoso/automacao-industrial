# Auditoria do Frontend — Refinamento Visual

**Gerado em:** task_14  
**Referência:** RF03 do PRD de refinamento (`.compozy/tasks/prd-refinamento-frontend.md/prd-refinamento-frontend.md`)  
**Escopo:** leitura somente; nenhum arquivo de código foi modificado.

---

## 1. Página Principal

**Arquivo:** `frontend/src/paginas/PaginaPrincipal.tsx`

### Estado gerenciado

| Estado | Tipo | Responsabilidade |
|--------|------|-----------------|
| `estado` | `EstadoPlanta` | Estado completo da planta, obtido via polling |
| `mensagemErro` | `string \| null` | Mensagem de falha de comunicação com o backend |

### Polling

Intervalo fixo de `1000 ms` via `window.setInterval`. Chama `clienteApiPlanta.obterEstado()`.

### Handlers de comando

| Handler | Chamada de API | Descrição |
|---------|---------------|-----------|
| `atualizarEstado()` | `obterEstado()` | Atualiza estado via GET |
| `executarComando(fn)` | qualquer `fn` | Wrapper genérico para comandos; atualiza estado após execução |
| `acionarCenario(nome)` | `aplicarCenario(nome)` | Aciona cenário por nome |
| `alterarVariavel(campo, valor)` | `alterarVariaveis({ [campo]: valor })` | Altera variável individual |

### Layout atual (CSS Grid)

Definido em `principal.css` — classe `.grade-supervisoria`:

```css
grid-template-columns: minmax(0, 1.7fr) minmax(320px, 0.9fr);
grid-template-areas:
  "sinotico controles"
  "variaveis lateral";
```

| Área | Classe | Conteúdo |
|------|--------|---------|
| `sinotico` | `.area-sinotico` | `SinoticoPlanta` |
| `controles` | `.area-controles` | `ControleSimulacao` + `PainelCenarios` |
| `variaveis` | `.painel-variaveis` | 10× `CartaoVariavel` em grade `auto-fit minmax(150px,1fr)` |
| `lateral` | `.area-lateral` | `PainelAlarmes` + `PainelAtuadores` + `PainelAjusteVariaveis` |

### Variáveis de processo mapeadas (10 variáveis)

| TAG | Nome | Campo do estado | Unidade |
|-----|------|----------------|---------|
| FIT-101 | Vazão de entrada | `vazaoEntradaM3h` | m³/h |
| FIT-102 | Vazão de saída | `vazaoSaidaM3h` | m³/h |
| LIT-101 | Nível do tanque | `nivelTanquePercentual` | % |
| PIT-101 | Pressão da linha | `pressaoLinhaBar` | bar |
| DPIT-101 | Diferencial do filtro | `pressaoDiferencialFiltroBar` | bar |
| TIT-101 | Temperatura da água | `temperaturaAguaC` | °C |
| AIT-101 | pH | `ph` | — |
| AIT-102 | Turbidez | `turbidezNtu` | NTU |
| AIT-103 | Condutividade | `condutividadeUsCm` | µS/cm |
| FIT-201 | Dosagem química | `vazaoDosagemLH` | L/h |

### Lógica de coloração dos cards

- Se emergência ativa → `'falha'`  
- Se alarme de falha associado à TAG → `'falha'`  
- Se valor ultrapassa limiar de alerta → `'alerta'`  
- Caso contrário → `'normal'`

---

## 2. Sinóptico

**Arquivo:** `frontend/src/componentes/SinoticoPlanta.tsx`

### Props

| Prop | Tipo |
|------|------|
| `estado` | `EstadoPlanta` |

### SVG

- `viewBox="0 0 900 420"`
- Marcador de seta (`<marker id="seta" ... />`) aplicado globalmente em todas as linhas de processo

### Equipamentos (14 nós)

| TAG | Nome | x | y | Largura | Altura | Lógica de estado |
|-----|------|---|---|---------|--------|-----------------|
| AGUA | Água Bruta | 20 | 80 | 90 | 44 | `processoAtivo` |
| FV-101 | FV-101 | 140 | 80 | 80 | 44 | `aberturaValvulaEntradaPercentual > 0`; alerta se nível alto-alto |
| FIT-101 | FIT-101 | 250 | 80 | 80 | 44 | `vazaoEntradaM3h > 0` |
| P-101 | P-101 | 360 | **72** | 58 | **58** | `bombaPrincipalLigada`; alerta se pressão alta |
| F-101 | Filtro F-101 | 448 | 80 | 90 | 44 | `pressaoDiferencialFiltroBar ≤ 1.5`; alerta se filtro saturado |
| T-101 | Tanque T-101 | 568 | **58** | 92 | **88** | `nivelTanquePercentual ∈ (10, 95)` |
| P-102 | P-102 | 690 | **72** | 58 | **58** | `bombaSaidaLigada` |
| PROCESSO | Processo | 778 | 80 | 90 | 44 | `processoAtivo ? ativo : alerta` |
| XV-101 | XV-101 | 568 | 205 | 92 | 44 | `valvulaDescarteAberta` |
| DESCARTE | Descarte | 690 | 205 | 90 | 44 | `valvulaDescarteAberta ? alerta : inativo` |
| TK-201 | TK-201 | 140 | 320 | 80 | 48 | `vazaoDosagemLH > 0` |
| P-201 | P-201 | 250 | 315 | 58 | 58 | `bombaDosadoraLigada`; alerta se falha dosadora |
| FIT-201 | FIT-201 | 338 | 320 | 80 | 48 | `vazaoDosagemLH > 0` |
| INJECAO | Injeção química | 448 | 320 | 112 | 48 | `vazaoDosagemLH > 0` |

### Linhas de processo (5 segmentos)

| Segmento | x1 | y1 | x2 | y2 | Estado |
|----------|----|----|----|----|--------|
| Fluxo principal | 110 | 102 | 778 | 102 | `processoAtivo` |
| Descarte — vertical | 614 | 146 | 614 | 205 | `valvulaDescarteAberta` |
| Descarte — horizontal | 660 | 227 | 690 | 227 | `valvulaDescarteAberta` |
| Dosagem — horizontal | 220 | 344 | 568 | 344 | `vazaoDosagemLH > 0` |
| Dosagem — vertical (ascendente) | 560 | 344 | 568 | 146 | `vazaoDosagemLH > 0` |

### Sub-componentes internos

- `Linha`: renderiza `<line>` com classe de estado (`linha-processo--ativa`, `--alerta`)
- `Equipamento`: renderiza `<g>` com `<rect>` + `<text>` (tag/valor)

---

## 3. Controle de Simulação

**Arquivo:** `frontend/src/componentes/ControleSimulacao.tsx`  
**Status:** a ser **removido** na task_15

### Props

| Prop | Tipo |
|------|------|
| `simulacaoAtiva` | `boolean` |
| `onIniciar` | `() => void` |
| `onPausar` | `() => void` |
| `onReiniciar` | `() => void` |

### Renderização

Seção com classe `.controle-simulacao` contendo três botões:

| Botão | Habilitado quando | Handler |
|-------|------------------|---------|
| Iniciar | `!simulacaoAtiva` | `onIniciar` |
| Pausar | `simulacaoAtiva` | `onPausar` |
| Reiniciar | sempre | `onReiniciar` |

### Acoplamento em PaginaPrincipal.tsx

```tsx
<ControleSimulacao
  onIniciar={() => void executarComando(clienteApiPlanta.iniciarSimulacao)}
  onPausar={() => void executarComando(clienteApiPlanta.pausarSimulacao)}
  onReiniciar={() => void executarComando(clienteApiPlanta.reiniciarSimulacao)}
  simulacaoAtiva={estado.bombaPrincipalLigada}
/>
```

Localizado na área `controles` da grade junto com `PainelCenarios`.

---

## 4. Cenários

**Arquivo:** `frontend/src/componentes/PainelCenarios.tsx`

### Props

| Prop | Tipo |
|------|------|
| `onAcionarCenario` | `(nome: string) => void` |

### 6 cenários disponíveis

| Nome exibido | Valor (API) | Destaque |
|-------------|-------------|---------|
| Operação Normal | `operacao_normal` | — |
| Nível Alto-Alto | `nivel_alto_alto` | — |
| Nível Baixo-Baixo | `nivel_baixo_baixo` | — |
| pH Fora da Faixa | `ph_fora_da_faixa` | — |
| Turbidez Alta | `turbidez_alta` | — |
| Emergência | `emergencia` | `.botao-cenario--emergencia` (fundo vermelho) |

---

## 5. Alarmes

**Arquivo:** `frontend/src/componentes/PainelAlarmes.tsx`

### Props

| Prop | Tipo |
|------|------|
| `alarmes` | `Alarme[]` |
| `processoLiberado` | `boolean` |

### 9 tipos de alarme (enum `TipoAlarme` em `alarme.ts`)

| Enum | Valor string |
|------|-------------|
| `NivelAltoAlto` | `NIVEL_ALTO_ALTO` |
| `NivelBaixoBaixo` | `NIVEL_BAIXO_BAIXO` |
| `PressaoAlta` | `PRESSAO_ALTA` |
| `FiltroSaturado` | `FILTRO_SATURADO` |
| `PhForaDaFaixa` | `PH_FORA_DA_FAIXA` |
| `TurbidezAlta` | `TURBIDEZ_ALTA` |
| `CondutividadeAlta` | `CONDUTIVIDADE_ALTA` |
| `FalhaDosadora` | `FALHA_DOSADORA` |
| `Emergencia` | `EMERGENCIA` |

### Comportamento visual

- Se `alarmes.length === 0`: exibe "Sem alarmes ativos" (`.sem-alarmes`)
- Cada alarme ativo renderiza um `<article className="alarme-item">` com `tipo` e `mensagem`
- Indicador de processo: `.estado-processo--liberado` (verde) ou `.estado-processo--bloqueado` (vermelho)

---

## 6. Atuadores

**Arquivo:** `frontend/src/componentes/PainelAtuadores.tsx`

### Props

| Prop | Tipo |
|------|------|
| `acoes` | `AcoesControle` |

### 5 atuadores

| TAG | Nome | Campo lido | Texto ativo | Texto inativo |
|-----|------|-----------|-------------|---------------|
| P-101 | Bomba principal | `bombaPrincipalLigar` | Ligada | Desligada |
| P-102 | Bomba de saída | `bombaSaidaLigar` | Ligada | Desligada |
| P-201 | Bomba dosadora | `bombaDosadoraLigar` | Ligada | Desligada |
| FV-101 | Válvula de entrada | `aberturaValvulaEntradaComandadaPercentual > 0` | Aberta (+ %) | Fechada |
| XV-101 | Válvula de descarte | `valvulaDescarteAbrir` | Aberta | Fechada |

Cada atuador renderiza um `<article className="atuador">` com TAG, nome e estado colorido.

---

## 7. Variáveis de Processo

**Arquivo do card:** `frontend/src/componentes/CartaoVariavel.tsx`

### Props

| Prop | Tipo |
|------|------|
| `tag` | `string` |
| `nome` | `string` |
| `valor` | `number \| string` |
| `unidade` | `string` |
| `estado` | `EstadoCartaoVariavel` |

### Estados possíveis (`EstadoCartaoVariavel`)

| Valor | Rótulo exibido | Classe CSS |
|-------|---------------|-----------|
| `normal` | Normal | `.cartao-variavel--normal` |
| `alerta` | Alerta | `.cartao-variavel--alerta` |
| `falha` | Falha | `.cartao-variavel--falha` |

### 10 variáveis mapeadas (em PaginaPrincipal.tsx)

Vide tabela na seção 1. Todas passam por `estadoVariavel()` para determinar o estado do card.

---

## 8. Estilos

### `frontend/src/estilos/principal.css` — estilos globais e grade principal

**Custom properties (CSS variables):**

| Variável | Valor | Uso |
|----------|-------|-----|
| `--cor-fundo` | `#111820` | Fundo da página |
| `--cor-painel` | `#182431` | Fundo dos painéis |
| `--cor-painel-claro` | `#223142` | Fundo de itens internos |
| `--cor-borda` | `#3a4a5c` | Bordas dos painéis |
| `--cor-texto` | `#f2f6fa` | Texto principal |
| `--cor-texto-secundario` | `#b7c4d2` | Texto secundário |
| `--cor-normal` | `#25a45a` | Estado normal (verde) |
| `--cor-alerta` | `#f5b942` | Estado de alerta (amarelo) |
| `--cor-falha` | `#d94b4b` | Estado de falha (vermelho) |
| `--cor-comando` | `#2f6f9f` | Botões de ação (azul) |

**Classes de layout CSS Grid:**

| Classe | Função |
|--------|--------|
| `.grade-supervisoria` | Grade principal `1.7fr / 0.9fr`, áreas `sinotico controles / variaveis lateral` |
| `.area-sinotico` | Área do sinóptico |
| `.area-controles` | Área de controles (grid interno, gap 16px) |
| `.area-lateral` | Área lateral (grid interno, gap 16px) |
| `.painel-variaveis` | Área de variáveis com background e border |
| `.grade-variaveis` | Grade de cards `auto-fit minmax(150px, 1fr)` |

**Classes de estado:**

| Classe | Uso |
|--------|-----|
| `.indicador-global--normal` | Cabeçalho: processo liberado |
| `.indicador-global--falha` | Cabeçalho: processo bloqueado |
| `.mensagem-erro` | Faixa de erro de comunicação |
| `.botao-cenario--emergencia` | Botão de emergência (vermelho) |
| `.botao-simulacao:disabled` | Botão desabilitado (cinza) |

---

### `frontend/src/componentes/componentes.css` — estilos dos componentes

**Tema base (light hardcoded, sobrescrito parcialmente pelo dark theme de principal.css):**

```css
background: #f8fafc;
color: #17202a;
border: 1px solid #c8d0d8;
```

**Classes de estado de cartão/atuador:**

| Classe | Cor |
|--------|-----|
| `.cartao-variavel--normal` | `background: #d8f3dc`, border `#2d8a45` |
| `.cartao-variavel--alerta` | `background: #fff3bf`, border `#f08c00` |
| `.cartao-variavel--falha` | `background: #ffd6d6`, border `#c92a2a` |
| `.estado-processo--liberado` | `background: #2d8a45` |
| `.estado-processo--bloqueado` | `background: #c92a2a` |
| `.atuador__estado--ativo` | `background: #2d8a45` |
| `.atuador__estado--inativo` | `background: #c92a2a` |

**Classes de linha SVG:**

| Classe | Cor |
|--------|-----|
| `.linha-processo` | stroke `#456` (cinza-azul, inativa) |
| `.linha-processo--ativa` | stroke `#2d8a45` (verde) |
| `.linha-processo--alerta` | stroke `#c92a2a` (vermelho) |

**Classes de equipamento SVG:**

| Classe | Preenchimento |
|--------|--------------|
| `.equipamento--inativo` | `#d0d5da` (cinza) |
| `.equipamento--ativo` | `#69db7c` (verde claro) |
| `.equipamento--alerta` | `#ff6b6b` (vermelho claro) |

---

## 9. API

**Arquivo:** `frontend/src/servicos/clienteApiPlanta.ts`

### URL base

`''` (vazio por padrão — relativo ao host atual, proxiado por nginx em produção via `/api/*`).

### Funções exportadas

| Função | Método HTTP | Endpoint | Retorno |
|--------|------------|---------|---------|
| `configurarUrlBaseApiPlanta(url)` | — | — | `void` (configura URL base) |
| `obterUrlBaseApiPlanta()` | — | — | `string` |
| `verificarSaude()` | GET | `/api/saude` | `Promise<boolean>` |
| `obterEstado()` | GET | `/api/planta/estado` | `Promise<EstadoPlanta>` |
| `iniciarSimulacao()` | POST | `/api/planta/iniciar` | `Promise<void>` |
| `pausarSimulacao()` | POST | `/api/planta/pausar` | `Promise<void>` |
| `reiniciarSimulacao()` | POST | `/api/planta/reiniciar` | `Promise<void>` |
| `alterarVariaveis(vars)` | POST | `/api/planta/variaveis` | `Promise<EstadoPlanta>` |
| `aplicarCenario(nome)` | POST | `/api/planta/cenarios/{nome}` | `Promise<EstadoPlanta>` |
| `mapearEstadoPlanta(api)` | — | — | `EstadoPlanta` (mapeamento interno) |

### Mapeamento camelCase ↔ snake_case

A função `mapearEstadoPlanta()` converte `EstadoPlantaApi` (snake_case) para `EstadoPlanta` (camelCase):

| API snake_case | Frontend camelCase |
|---------------|-------------------|
| `vazao_entrada_m3h` | `vazaoEntradaM3h` |
| `nivel_tanque_percentual` | `nivelTanquePercentual` |
| `pressao_diferencial_filtro_bar` | `pressaoDiferencialFiltroBar` |
| `bomba_principal_ligada` | `bombaPrincipalLigada` |
| `abertura_valvula_entrada_percentual` | `aberturaValvulaEntradaPercentual` |
| `abertura_valvula_entrada_comandada_percentual` | `aberturaValvulaEntradaComandadaPercentual` |
| `valvula_descarte_aberta` | `valvulaDescarteAberta` |
| `valvula_descarte_abrir` | `valvulaDescarteAbrir` |
| `emergencia_acionada` | `emergenciaAcionada` |
| `bomba_dosadora_em_falha` | `bombaDosadoraEmFalha` |
| `processo_liberado` | `processoLiberado` |
| `alarmes_ativos` | `alarmes` |

### Tratamento de erro

`requisitarApi()` extrai mensagem do campo `detail` (FastAPI) ou do corpo texto. Lança `Error` se `!resposta.ok`.

---

## 10. Problemas Visuais

### PV-01 — Conflito de tema CSS (severidade: alta)

`componentes.css` define um tema claro com cores hardcoded (`#f8fafc`, `#17202a`, `#c8d0d8`), enquanto `principal.css` define um tema escuro com custom properties. As regras do `principal.css` sobrescrevem parcialmente as de `componentes.css`, mas a base dos componentes permanece em light mode. Isso causa inconsistência visual entre o fundo da página (escuro) e os componentes (fundo claro originado de `componentes.css`).

**Impacto:** `ControleSimulacao`, `PainelAlarmes`, `PainelAtuadores`, `PainelCenarios`, `PainelAjusteVariaveis`, `CartaoVariavel` herdam o fundo `#f8fafc` de `componentes.css` a não ser que sejam sobrescritos por `principal.css`.

**Correção recomendada (task_16/18):** Migrar `componentes.css` para custom properties ou integrar os estilos dos componentes em `principal.css` com o tema escuro unificado.

---

### PV-02 — Painel `ControleSimulacao` ocupa espaço na área de controles (severidade: alta)

`ControleSimulacao` está na área `controles` junto com `PainelCenarios`. Os dois competem pelo mesmo espaço, e os botões Iniciar/Pausar/Reiniciar não agregam valor à demonstração. Per RF04, este componente deve ser removido completamente na task_15.

---

### PV-03 — Hierarquia visual inexistente na área lateral (severidade: média)

Os quatro elementos da área lateral (`PainelAlarmes`, `PainelAtuadores`, `PainelAjusteVariaveis`) têm peso visual idêntico. Não há distinção entre o que é informação primária (alarmes, atuadores) e o que é controle secundário (ajuste manual).

**Correção recomendada (task_16/18):** Dar menor destaque visual ao `PainelAjusteVariaveis`; tratar alarmes e atuadores como informação primária.

---

### PV-04 — Desalinhamento vertical dos equipamentos no sinóptico (severidade: média)

A linha de processo horizontal corre em `y=102`. Os elementos de 44px de altura estão em `y=80` (centro em `y=102` — correto). Porém as bombas P-101 e P-102 têm `y=72` e altura=58 (centro em `y=101`) e o tanque T-101 tem `y=58` e altura=88 (centro em `y=102` — correto). A diferença de 1px para as bombas é cosmética, mas a altura diferente (58 vs 44px) rompe o alinhamento visual da faixa superior.

---

### PV-05 — Seta aplicada em linhas verticais e ascendentes (severidade: média)

O marcador `url(#seta)` é aplicado como `markerEnd` em todas as 5 linhas, incluindo as verticais (descarte) e ascendentes (dosagem). Setas verticais descendentes são semanticamente corretas, mas a seta na linha ascendente de dosagem (`y=344` → `y=146`) fica orientada para cima no topo da linha, o que pode confundir.

---

### PV-06 — Fundo claro do SVG contrasta com o tema escuro da página (severidade: baixa)

O SVG tem `background: #d9e2ec` (definido em `principal.css`), que é um tom azul-cinza claro — em contraste com o fundo escuro da página. Em `componentes.css` não há `background` definido para `.sinotico-planta__svg`, reforçando que esta decisão foi tomada só em `principal.css`. O contraste pode ser intencional (mapa industrial), mas está desalinhado com o visual escuro geral.

---

### PV-07 — Excesso de bordas e blocos pesados (severidade: média)

Todos os painéis têm `border: 1px solid` visível. Os alarmes têm borda lateral grossa (`border-left: 8px solid`). Cada cartão de variável tem borda colorida. O resultado é uma tela com alta densidade de linhas divisórias, que dificulta identificar hierarquia e foco. Per RNF02, o visual desejado é limpo e técnico.

---

### PV-08 — Indicador de processo duplicado (severidade: baixa)

O status do processo aparece duas vezes: no cabeçalho (`.indicador-global`) e dentro do `PainelAlarmes` (`.estado-processo`). A redundância não é problemática funcionalmente, mas contribui para o ruído visual.

---

## Referência de arquivos auditados

| Arquivo | Caminho |
|---------|---------|
| PaginaPrincipal.tsx | `frontend/src/paginas/PaginaPrincipal.tsx` |
| SinoticoPlanta.tsx | `frontend/src/componentes/SinoticoPlanta.tsx` |
| ControleSimulacao.tsx | `frontend/src/componentes/ControleSimulacao.tsx` |
| PainelCenarios.tsx | `frontend/src/componentes/PainelCenarios.tsx` |
| PainelAlarmes.tsx | `frontend/src/componentes/PainelAlarmes.tsx` |
| PainelAtuadores.tsx | `frontend/src/componentes/PainelAtuadores.tsx` |
| CartaoVariavel.tsx | `frontend/src/componentes/CartaoVariavel.tsx` |
| PainelAjusteVariaveis.tsx | `frontend/src/componentes/PainelAjusteVariaveis.tsx` |
| principal.css | `frontend/src/estilos/principal.css` |
| componentes.css | `frontend/src/componentes/componentes.css` |
| clienteApiPlanta.ts | `frontend/src/servicos/clienteApiPlanta.ts` |
| estadoPlanta.ts | `frontend/src/dominio/estadoPlanta.ts` |
| alarme.ts | `frontend/src/dominio/alarme.ts` |
| acoesControle.ts | `frontend/src/dominio/acoesControle.ts` |
