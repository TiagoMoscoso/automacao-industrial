# Auditoria do Sinóptico da Planta

Esta auditoria registra a geometria e os dados do sinóptico implementado em
`frontend/src/componentes/SinoticoPlanta.tsx`, com apoio dos estilos em
`frontend/src/componentes/componentes.css` e
`frontend/src/estilos/principal.css`. A lista de 11 problemas do refinamento do
sinóptico foi usada como ponto de partida para orientar as tasks 22-25.

## 1. Dimensões atuais do SVG (viewBox, largura, altura)

- Arquivo principal: `frontend/src/componentes/SinoticoPlanta.tsx`.
- Elemento SVG: `<svg className="sinotico-planta__svg" viewBox="0 0 900 420">`.
- `viewBox`: origem `(0, 0)`, largura lógica `900`, altura lógica `420`.
- Largura HTML explícita: não definida no elemento SVG.
- Altura HTML explícita: não definida no elemento SVG.
- Escala de renderização: controlada por CSS em `.sinotico-planta__svg` com
  `max-width: 100%` e `height: auto`.
- Fundo do desenho: definido em `principal.css` como `background: #d9e2ec` e
  `border-radius: 4px`.
- Área útil ocupada pela geometria atual:
  - eixo X dos equipamentos: `15` a `735`;
  - eixo X das linhas: `95` a `655`;
  - eixo Y dos equipamentos: `67` a `362`;
  - eixo Y das linhas: `100`, `230`, `340` e conexão vertical `100` a `340`.
- Sobra visual relevante:
  - direita: de `735` até `900`, cerca de `165 px`;
  - base: de `362` até `420`, cerca de `58 px`;
  - topo: há espaço para titulo externo ao SVG, mas dentro do SVG a primeira
    forma inicia em `y=67`.

## 2. Tabela de equipamentos com posição, dimensões e estado visual atual

| Tag | Nome exibido | x | y | w | h | Centro | Estado visual atual |
|---|---|---:|---:|---:|---:|---|---|
| AGUA | Água Bruta | 15 | 78 | 80 | 44 | (55, 100) | `ativo` quando `processoAtivo`; senão `inativo` |
| FV-101 | FV-101 | 115 | 78 | 70 | 44 | (150, 100) | `ativo` se abertura > 0; `alerta` em nível alto-alto; `falha` em emergência; senão `inativo` |
| FIT-101 | FIT-101 | 205 | 78 | 70 | 44 | (240, 100) | `ativo` se vazão de entrada > 0; `falha` em emergência; senão `inativo` |
| P-101 | P-101 | 295 | 78 | 50 | 44 | (320, 100) | `ativo` se bomba principal ligada; `falha` em emergência ou pressão alta; senão `inativo` |
| F-101 | Filtro F-101 | 365 | 78 | 80 | 44 | (405, 100) | `ativo` se DP <= 1,5 bar; `alerta` em filtro saturado; `falha` em emergência |
| T-101 | Tanque T-101 | 475 | 67 | 90 | 66 | (520, 100) | `ativo` se nível entre 10% e 95%; `alerta` em nível alto-alto ou baixo-baixo; `falha` em emergência |
| P-102 | P-102 | 585 | 78 | 50 | 44 | (610, 100) | `ativo` se bomba de saída ligada; `falha` em emergência, pH fora da faixa ou turbidez alta; senão `inativo` |
| PROCESSO | Processo | 655 | 78 | 80 | 44 | (695, 100) | `ativo` quando `processoAtivo`; senão `bloqueado` |
| XV-101 | XV-101 | 475 | 208 | 90 | 44 | (520, 230) | `ativo` se válvula de descarte aberta; `falha` em emergência; senão `inativo` |
| DESCARTE | Descarte | 585 | 208 | 80 | 44 | (625, 230) | `alerta` se válvula de descarte aberta; senão `inativo` |
| TK-201 | TK-201 | 115 | 318 | 70 | 44 | (150, 340) | `ativo` se vazão de dosagem > 0; `falha` em emergência; senão `inativo` |
| P-201 | P-201 | 215 | 318 | 50 | 44 | (240, 340) | `ativo` se bomba dosadora ligada; `falha` em emergência, falha da dosadora ou alarme de dosadora; senão `inativo` |
| FIT-201 | FIT-201 | 295 | 318 | 75 | 44 | (332,5, 340) | `ativo` se vazão de dosagem > 0; `falha` em emergência; senão `inativo` |
| INJECAO | Injeção química | 405 | 318 | 110 | 44 | (460, 340) | `ativo` se vazão de dosagem > 0; `falha` em emergência; senão `inativo` |

Observações de dados:

- O sinóptico usa 14 elementos visuais: 8 na linha principal, 2 na linha de
  descarte e 4 na linha de dosagem química.
- `processoAtivo` combina `estado.processoLiberado && !emergencia`.
- `emergencia` combina `estado.emergenciaAcionada` ou alarme do tipo
  `TipoAlarme.Emergencia`.
- Valores exibidos no SVG:
  - FV-101: `${estado.aberturaValvulaEntradaPercentual}%`;
  - FIT-101: `${estado.vazaoEntradaM3h} m3/h`;
  - F-101: `${estado.pressaoDiferencialFiltroBar} bar`;
  - T-101: `formatarPercentualSinotico(estado.nivelTanquePercentual)`;
  - FIT-201: `${estado.vazaoDosagemLH} L/h`.
- O valor do tanque é tratado no frontend por clamp visual entre `0` e `100`.
  Portanto, o problema observado de `570%` é principalmente de formatação e
  proteção de display no sinóptico, não de escala visual do retângulo. A
  auditoria não conclui erro de contrato do backend sem amostra de resposta
  mostrando nível fora de 0-100.

## 3. Descrição das três linhas lógicas com coordenadas

### Linha principal

- Função lógica: fluxo de água bruta até processo.
- Sequência: `AGUA -> FV-101 -> FIT-101 -> P-101 -> F-101 -> T-101 -> P-102 -> PROCESSO`.
- Linha SVG: `Linha x1=95 y1=100 x2=655 y2=100`.
- Estado visual: recebe `ativa={processoAtivo}`.
- Geometria: passa pelo centro vertical da linha principal (`y=100`) e cruza os
  equipamentos porque as linhas são desenhadas antes dos retângulos.
- Ponto crítico: o trecho termina em `x=655`, na borda esquerda do bloco
  `PROCESSO`; a seta fica parcialmente coberta pelo equipamento por causa da
  ordem de renderização.

### Linha de descarte

- Função lógica: saída do tanque para descarte via válvula XV-101.
- Sequência: `T-101 -> XV-101 -> DESCARTE`.
- Conector vertical: `Linha x1=520 y1=133 x2=520 y2=208`.
- Conector horizontal: `Linha x1=565 y1=230 x2=585 y2=230`.
- Estado visual: usa `alerta={estado.valvulaDescarteAberta}`.
- Geometria: o conector vertical sai do centro inferior do tanque (`x=520`) e
  chega ao topo de `XV-101`; o conector horizontal sai da borda direita de
  `XV-101` e chega à borda esquerda de `DESCARTE`.
- Ponto crítico: como cada segmento usa `markerEnd`, há seta também no fim do
  trecho vertical, encostando no topo de `XV-101`; isso pode parecer pesado.

### Linha de dosagem química

- Função lógica: dosagem química antes do tanque.
- Sequência: `TK-201 -> P-201 -> FIT-201 -> INJECAO -> linha principal`.
- Linha horizontal: `Linha x1=185 y1=340 x2=460 y2=340`.
- Linha vertical: `Linha x1=460 y1=340 x2=460 y2=100`.
- Estado visual: recebe `ativa={estado.vazaoDosagemLH > 0}`.
- Geometria: o ponto de injeção está no centro de `INJECAO` (`x=460`, `y=340`);
  a conexão vertical sobe até a linha principal em `x=460`, imediatamente antes
  do tanque `T-101` que inicia em `x=475`.
- Ponto crítico: o segmento vertical é longo (`240 px`) e cruza visualmente a
  área entre a linha principal e a linha inferior; por isso precisa de proporção
  discreta para não dominar a composição.

## 4. Problemas identificados numerados de 1 a 11

1. Layout visualmente desequilibrado
   - Sintoma observado: concentração dos elementos até `x=735`, enquanto o
     `viewBox` vai até `x=900`; a linha de dosagem fica muito abaixo da linha
     principal e aumenta a percepção de vazio à direita.
   - Causa provável: SVG/TSX, por coordenadas fixas e `viewBox` largo; CSS
     contribui por escalar o SVG inteiro sem ajustar área útil.
   - Arquivos a modificar: `SinoticoPlanta.tsx`; eventualmente
     `componentes.css` se a solução exigir ajustes de escala/traço.
   - Task responsável: task 22 para proporções e task 23 para redistribuição
     das linhas.

2. Linha de dosagem química mal conectada à linha principal
   - Sintoma observado: a conexão depende de um segmento vertical longo em
     `x=460`, que se liga à linha principal antes do tanque, sem junção técnica
     dedicada.
   - Causa provável: SVG/TSX, pois a qualidade da conexão depende das
     coordenadas dos segmentos e do ponto de injeção.
   - Arquivos a modificar: `SinoticoPlanta.tsx`.
   - Task responsável: task 23.

3. Bloco "Injeção química" apertado e visualmente estranho
   - Sintoma observado: texto com 15 caracteres dentro de um retângulo de
     `110 x 44`; cabe, mas fica no limite quando o SVG é reduzido no layout.
   - Causa provável: combinação de SVG/TSX e CSS. O TSX fixa largura e o CSS
     usa `font-size: 12px` e `font-weight: 800` para todos os rótulos.
   - Arquivos a modificar: `SinoticoPlanta.tsx` para largura/posição e
     `componentes.css` para tipografia específica se necessário.
   - Task responsável: task 23.

4. Conexão vertical da dosagem química com a linha principal grosseira
   - Sintoma observado: segmento vertical de `y=340` até `y=100`, com seta no
     fim, cria um elemento dominante e pouco parecido com derivação técnica.
   - Causa provável: SVG/TSX para geometria e `componentes.css` para
     `stroke-width: 4` aplicado igualmente a todos os conectores.
   - Arquivos a modificar: `SinoticoPlanta.tsx` e `componentes.css`.
   - Task responsável: task 23 para geometria; task 24 para conectores e setas.

5. Seta verde vertical grande e dominante demais
   - Sintoma observado: o marcador `seta` é aplicado a toda `Linha`, inclusive
     ao segmento vertical da dosagem. Quando ativo, a cor `#2f8f7b` enfatiza a
     seta vertical.
   - Causa provável: CSS e SVG/TSX. O TSX não diferencia tipo de conector; o
     CSS aplica a mesma espessura e cor a qualquer linha ativa.
   - Arquivos a modificar: `SinoticoPlanta.tsx` para permitir variação de
     marcador/tipo; `componentes.css` para tamanho, cor e espessura.
   - Task responsável: task 24.

6. Linha de descarte do tanque até XV-101 e Descarte pesada demais
   - Sintoma observado: descarte usa dois segmentos com `stroke-width: 4` e
     marcadores nos finais; quando `alerta`, recebe `var(--cor-falha)`, ficando
     tão dominante quanto uma falha crítica.
   - Causa provável: `componentes.css` por espessura/cor compartilhadas e
     SVG/TSX por não distinguir linha secundária.
   - Arquivos a modificar: `SinoticoPlanta.tsx` e `componentes.css`.
   - Task responsável: task 24.

7. Tanque T-101 grande demais em relação aos demais equipamentos
   - Sintoma observado: T-101 mede `90 x 66`, 1,5 vez a altura dos demais
     blocos da linha principal (`44`). Ele se destaca por tamanho e por ocupar
     de `y=67` a `y=133`.
   - Causa provável: SVG/TSX, tamanho fixo do equipamento.
   - Arquivos a modificar: `SinoticoPlanta.tsx`.
   - Task responsável: task 22.

8. Valor do tanque exibindo "570%" (erro de formatação ou escala visual)
   - Sintoma observado: valor percentual fora da faixa esperada de 0-100
     prejudica credibilidade visual da apresentação.
   - Causa provável: lógica de formatação/defesa de display no SVG/TSX. No
     código atual existe `formatarPercentualSinotico`, que limita o display
     entre `0` e `100`; portanto, a correção pertence ao frontend de exibição,
     sem alterar escala do retângulo nem contrato da API nesta task.
   - Arquivos a modificar: `SinoticoPlanta.tsx`.
   - Task responsável: task 22.

9. Muito espaço vazio à direita e abaixo do sinóptico
   - Sintoma observado: último equipamento termina em `x=735`, mas o canvas
     lógico vai até `x=900`; a última linha termina em `x=655`; abaixo dos
     equipamentos de dosagem sobram cerca de `58 px`.
   - Causa provável: SVG/TSX pelo `viewBox` e distribuição de coordenadas; CSS
     apenas preserva a proporção ao renderizar responsivamente.
   - Arquivos a modificar: `SinoticoPlanta.tsx`; avaliar `principal.css` só se
     o problema for de encaixe no grid.
   - Task responsável: task 22 para escala geral; task 23 para distribuição.

10. Setas e linhas sem aparência de diagrama técnico limpo
    - Sintoma observado: todas as linhas usam o mesmo componente, mesma largura
      e mesmo marcador; não há hierarquia visual clara entre linha principal,
      descarte e dosagem.
    - Causa provável: `componentes.css` por estilos uniformes de linha e
      `SinoticoPlanta.tsx` por não expor variantes semânticas de conector.
    - Arquivos a modificar: `SinoticoPlanta.tsx` e `componentes.css`.
    - Task responsável: task 24.

11. Sinóptico precisa parecer maquete industrial elegante, não caixas conectadas
    - Sintoma observado: equipamentos são retângulos simples com mesmo raio,
      mesma tipografia e pouca diferenciação formal entre bomba, tanque,
      filtro, válvula e medidor.
    - Causa provável: SVG/TSX por representar todos os equipamentos com
      `<rect>` genérico; CSS por usar preenchimentos planos e bordas similares.
    - Arquivos a modificar: `SinoticoPlanta.tsx` e `componentes.css`.
    - Task responsável: task 25 para polimento visual; task 22-24 para base
      geométrica antes do acabamento.

## 5. Problemas adicionais encontrados na auditoria

- O marcador `seta` é obrigatório em toda chamada de `Linha`. Isso dificulta
  diferenciar trechos de conexão, derivações verticais e linhas secundárias.
- A ordem de renderização desenha linhas antes dos equipamentos. Isso protege a
  leitura dos blocos, mas pode esconder pontas de setas quando a linha termina
  exatamente na borda do equipamento.
- Os rótulos e valores usam coordenadas fixas (`centroY - 2` e `centroY + 15`).
  Em equipamentos com altura `44`, o texto ocupa boa parte do espaço interno.
- `FIT-101` usa unidade textual `m3/h`, enquanto a documentação do PRD usa
  `m³/h`. Isso não quebra a UI, mas reduz polimento visual.
- Estados de falha e bloqueio usam preenchimentos fortes nos retângulos, mas as
  linhas só distinguem `ativa` e `alerta`. Isso pode deixar a linha principal
  semanticamente menos clara quando o processo está bloqueado.
- `principal.css` redefine `.sinotico-planta__svg` com fundo claro; essa regra
  fica separada dos demais estilos do sinóptico em `componentes.css`, o que
  aumenta a chance de ajustes visuais ficarem espalhados entre arquivos.
- Não foi gerada screenshot nesta task. A auditoria usa descrição textual
  baseada nas coordenadas e estilos lidos diretamente dos arquivos.

## 6. Referências de arquivos a modificar nas tasks seguintes

- `frontend/src/componentes/SinoticoPlanta.tsx`
  - Responsável por `viewBox`, coordenadas, dimensões, lista dos 14
    equipamentos, conectores, marcador de seta e lógica de estados visuais.
  - Principal alvo das tasks 22, 23 e 24.
- `frontend/src/componentes/componentes.css`
  - Responsável por `.sinotico-planta__svg`, `.linha-processo`,
    `.linha-processo--ativa`, `.linha-processo--alerta`, `.equipamento`,
    modificadores de estado, `.rotulo-sinotico` e `.valor-sinotico`.
  - Principal alvo das tasks 24 e 25.
- `frontend/src/estilos/principal.css`
  - Responsável pelo grid `.grade-supervisoria`, pela área `.area-sinotico`,
    por variáveis globais de tema e pela regra de fundo do SVG em
    `.sinotico-planta__svg`.
  - Deve ser alterado apenas se o ajuste visual exigir encaixe responsivo ou
    correção de tema global.
- Não modificar backend nas tasks 22-25 salvo evidência objetiva de contrato de
  dados incorreto. Para o caso do `570%`, a primeira correção deve permanecer no
  display do sinóptico.
