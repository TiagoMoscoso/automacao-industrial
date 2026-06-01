# P&ID Conceitual

Este P&ID conceitual representa a planta simplificada de tratamento de água
industrial usada no simulador acadêmico. O foco é identificar os equipamentos,
instrumentos e atuadores por tag industrial.

## Diagrama conceitual

```mermaid
flowchart TD
    AB[Água bruta] --> FV101[FV-101<br/>Válvula de controle de entrada]
    FV101 --> FIT101[FIT-101<br/>Vazão de entrada]
    FIT101 --> P101[P-101<br/>Bomba principal]
    P101 -. controle de velocidade .- VFD101[VFD-101<br/>Inversor de frequência]
    P101 --> PIT101[PIT-101<br/>Pressão da linha principal]
    PIT101 --> F101[F-101<br/>Filtro industrial]
    F101 --> DPIT101[DPIT-101<br/>Pressão diferencial do filtro]
    DPIT101 --> T101[T-101<br/>Tanque de água tratada]

    T101 --- LIT101[LIT-101<br/>Nível do tanque]
    T101 --- TIT101[TIT-101<br/>Temperatura da água]
    T101 --- AIT101[AIT-101<br/>pH da água tratada]
    T101 --- AIT102[AIT-102<br/>Turbidez da água]
    T101 --- AIT103[AIT-103<br/>Condutividade da água]

    T101 --> P102[P-102<br/>Bomba de saída]
    P102 --> FIT102[FIT-102<br/>Vazão de saída]
    FIT102 --> PROCESSO[Saída para processo ou caldeira]

    TK201[TK-201<br/>Tanque químico] --> P201[P-201<br/>Bomba dosadora]
    P201 --> FIT201[FIT-201<br/>Vazão de dosagem química]
    FIT201 --> T101

    T101 --> XV101[XV-101<br/>Válvula on/off de descarte]
    XV101 --> DESCARTE[Descarte]
```

## Sequência de processo

| Etapa | Elemento | Descrição |
|---|---|---|
| 1 | Água bruta | Entrada de água na planta |
| 2 | FV-101 | Controle da entrada de água bruta |
| 3 | FIT-101 | Medição da vazão de entrada |
| 4 | P-101 / VFD-101 | Bombeamento principal com controle de velocidade |
| 5 | PIT-101 | Medição da pressão da linha principal |
| 6 | F-101 / DPIT-101 | Filtração e medição de saturação do filtro |
| 7 | T-101 | Armazenamento de água tratada |
| 8 | LIT-101 | Medição de nível do tanque |
| 9 | TIT-101 | Medição de temperatura |
| 10 | AIT-101 | Análise de pH |
| 11 | AIT-102 | Análise de turbidez |
| 12 | AIT-103 | Análise de condutividade |
| 13 | TK-201 / P-201 / FIT-201 | Dosagem química antes do tanque |
| 14 | P-102 / FIT-102 | Envio de água tratada ao processo |
| 15 | XV-101 | Descarte de água fora de especificação |

## Tags identificadas

`FIT-101`, `FIT-102`, `LIT-101`, `PIT-101`, `DPIT-101`, `TIT-101`,
`AIT-101`, `AIT-102`, `AIT-103`, `FIT-201`, `FV-101`, `XV-101`, `P-101`,
`P-102`, `P-201` e `VFD-101`.
