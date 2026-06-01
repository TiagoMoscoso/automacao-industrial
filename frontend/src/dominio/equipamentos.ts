/** Decomposição didática da nomenclatura de uma tag industrial. */
export interface ExplicacaoTag {
  /** Ex: "FIT" */
  prefixo: string
  /** Ex: "Flow Indicator Transmitter" */
  significadoPrefixo: string
  /** Ex: "Transmissor indicador de vazão" */
  significadoPortugues: string
  /** Ex: "Malha da linha principal de tratamento" */
  significadoNumero: string
}

/** Metadados didáticos de um equipamento industrial da planta. */
export interface MetadadosEquipamento {
  tag: string
  nomeAbreviado: string
  instrumento: string
  funcao: string
  categoria: string
  papelNoProcesso: string
  unidade?: string
  /** Faixa de operação normal na simulação */
  faixaNormal?: { min: number; max: number }
  /** Faixa de atenção (valores acima/abaixo do normal mas antes do crítico) */
  faixaAtencao?: { min?: number; max?: number }
  /** Faixa crítica (aciona alarme na simulação) */
  faixaCritica?: { min?: number; max?: number }
  /** Ex: "4–20 mA" */
  tipoSinal?: string
  /** Camada da arquitetura ISA-95: Campo, Controle, Supervisão */
  nivelArquitetura?: string
  /** Ex: "Linha principal de tratamento" */
  areaProcesso?: string
  /** Decomposição didática da nomenclatura da tag */
  explicacaoTag?: ExplicacaoTag
  /** Papel operacional resumido desta variável no processo */
  impactoOperacional?: string
  /** O que acontece quando o operador aumenta este valor na simulação */
  efeitoAumento?: string
  /** O que acontece quando o operador diminui este valor na simulação */
  efeitoDiminuicao?: string
  /** Contexto para o operador/aluno sobre uso em planta real */
  dicaOperador?: string
}

export const CATALOGO_EQUIPAMENTOS: Record<string, MetadadosEquipamento> = {
  'FIT-101': {
    tag: 'FIT-101',
    nomeAbreviado: 'Sensor de vazão de entrada',
    instrumento: 'Transmissor indicador de vazão',
    funcao: 'Mede a vazão de entrada de água bruta',
    categoria: 'Transmissor / sensor analógico',
    papelNoProcesso: 'Controla e monitora o fluxo de entrada da planta',
    unidade: 'm³/h',
    faixaNormal: { min: 6, max: 14 },
    tipoSinal: '4–20 mA',
    nivelArquitetura: 'Campo',
    areaProcesso: 'Linha principal de tratamento',
    explicacaoTag: {
      prefixo: 'FIT',
      significadoPrefixo: 'Flow Indicator Transmitter',
      significadoPortugues: 'Transmissor indicador de vazão',
      significadoNumero: 'Malha da linha principal de entrada da planta',
    },
    impactoOperacional: 'Define a quantidade de água bruta entrando na planta.',
    efeitoAumento: 'Aumenta a alimentação da planta e pode elevar o nível do tanque.',
    efeitoDiminuicao: 'Reduz a produção de água tratada.',
    dicaOperador: 'Em uma planta real, usada para balancear alimentação e demanda.',
  },
  'FIT-102': {
    tag: 'FIT-102',
    nomeAbreviado: 'Sensor de vazão de saída',
    instrumento: 'Transmissor indicador de vazão',
    funcao: 'Mede a vazão de saída para o processo',
    categoria: 'Transmissor / sensor analógico',
    papelNoProcesso: 'Monitora o fluxo de água tratada enviado ao processo',
    unidade: 'm³/h',
    faixaNormal: { min: 5, max: 13 },
    tipoSinal: '4–20 mA',
    nivelArquitetura: 'Campo',
    areaProcesso: 'Linha principal de tratamento',
    explicacaoTag: {
      prefixo: 'FIT',
      significadoPrefixo: 'Flow Indicator Transmitter',
      significadoPortugues: 'Transmissor indicador de vazão',
      significadoNumero: 'Malha da linha principal de saída da planta',
    },
    impactoOperacional: 'Indica quanto de água tratada está sendo enviada ao processo.',
    efeitoAumento: 'Representa maior demanda ou maior retirada do tanque.',
    efeitoDiminuicao: 'Representa menor envio ao processo.',
  },
  'LIT-101': {
    tag: 'LIT-101',
    nomeAbreviado: 'Sensor de nível do tanque',
    instrumento: 'Transmissor indicador de nível',
    funcao: 'Mede o nível do tanque T-101',
    categoria: 'Transmissor / sensor analógico',
    papelNoProcesso: 'Garante o controle de enchimento e esvaziamento do tanque',
    unidade: '%',
    faixaNormal: { min: 40, max: 80 },
    faixaAtencao: { min: 20, max: 90 },
    faixaCritica: { min: 10, max: 95 },
    tipoSinal: '4–20 mA',
    nivelArquitetura: 'Campo',
    areaProcesso: 'Linha principal de tratamento',
    explicacaoTag: {
      prefixo: 'LIT',
      significadoPrefixo: 'Level Indicator Transmitter',
      significadoPortugues: 'Transmissor indicador de nível',
      significadoNumero: 'Tanque principal da planta (T-101)',
    },
    impactoOperacional: 'Mostra o volume relativo de água tratada armazenado.',
    efeitoAumento: 'Aproxima o tanque de condição de nível alto.',
    efeitoDiminuicao: 'Aproxima o tanque de condição de nível baixo.',
    dicaOperador:
      'Valores muito altos ativam alarme de nível alto; muito baixos ativam alarme de nível baixo.',
  },
  'PIT-101': {
    tag: 'PIT-101',
    nomeAbreviado: 'Sensor de pressão da linha',
    instrumento: 'Transmissor indicador de pressão',
    funcao: 'Mede a pressão da linha principal',
    categoria: 'Transmissor / sensor analógico',
    papelNoProcesso: 'Detecta variações de pressão que podem indicar anomalias na linha',
    unidade: 'bar',
    faixaNormal: { min: 3, max: 7 },
    faixaAtencao: { min: 2, max: 8 },
    faixaCritica: { max: 10 },
    tipoSinal: '4–20 mA',
    nivelArquitetura: 'Campo',
    areaProcesso: 'Linha principal de tratamento',
    explicacaoTag: {
      prefixo: 'PIT',
      significadoPrefixo: 'Pressure Indicator Transmitter',
      significadoPortugues: 'Transmissor indicador de pressão',
      significadoNumero: 'Linha principal de tratamento',
    },
    impactoOperacional: 'Indica a condição hidráulica da linha principal.',
    efeitoAumento: 'Pode indicar restrição, maior carga ou esforço da bomba.',
    efeitoDiminuicao: 'Pode indicar baixa vazão, falha de bomba ou perda de pressão.',
  },
  'DPIT-101': {
    tag: 'DPIT-101',
    nomeAbreviado: 'Sensor de saturação do filtro',
    instrumento: 'Transmissor indicador de pressão diferencial',
    funcao: 'Mede a pressão diferencial do filtro F-101, indicando possível saturação',
    categoria: 'Transmissor / sensor analógico',
    papelNoProcesso: 'Sinaliza quando o filtro precisa de manutenção ou substituição',
    unidade: 'bar',
    faixaNormal: { min: 0, max: 0.8 },
    faixaAtencao: { min: 0.8, max: 1.2 },
    faixaCritica: { min: 1.2 },
    tipoSinal: '4–20 mA',
    nivelArquitetura: 'Campo',
    areaProcesso: 'Linha principal de tratamento',
    explicacaoTag: {
      prefixo: 'DPIT',
      significadoPrefixo: 'Differential Pressure Indicator Transmitter',
      significadoPortugues: 'Transmissor indicador de pressão diferencial',
      significadoNumero: 'Filtro da linha principal (F-101)',
    },
    impactoOperacional: 'Indica possível saturação do filtro F-101.',
    efeitoAumento: 'Simula filtro ficando obstruído/saturado.',
    efeitoDiminuicao: 'Simula filtro limpo ou baixa perda de carga.',
    dicaOperador:
      'Em uma planta real, valores críticos indicam necessidade de retrolavagem ou troca de elemento filtrante.',
  },
  'TIT-101': {
    tag: 'TIT-101',
    nomeAbreviado: 'Sensor de temperatura da água',
    instrumento: 'Transmissor indicador de temperatura',
    funcao: 'Mede a temperatura da água',
    categoria: 'Transmissor / sensor analógico',
    papelNoProcesso: 'Monitora a temperatura para garantir qualidade do processo',
    unidade: '°C',
    faixaNormal: { min: 15, max: 35 },
    tipoSinal: '4–20 mA',
    nivelArquitetura: 'Campo',
    areaProcesso: 'Linha principal de tratamento',
    explicacaoTag: {
      prefixo: 'TIT',
      significadoPrefixo: 'Temperature Indicator Transmitter',
      significadoPortugues: 'Transmissor indicador de temperatura',
      significadoNumero: 'Linha principal de tratamento',
    },
    impactoOperacional: 'Monitora a condição térmica da água tratada.',
    efeitoAumento: 'Pode indicar aquecimento ou condição anormal no processo.',
    efeitoDiminuicao: 'Pode indicar água mais fria ou variação de processo.',
  },
  'AIT-101': {
    tag: 'AIT-101',
    nomeAbreviado: 'Analisador de pH',
    instrumento: 'Analisador indicador de pH',
    funcao: 'Mede o pH da água tratada',
    categoria: 'Analisador de qualidade',
    papelNoProcesso: 'Avalia se o pH está dentro da faixa aceitável para o processo',
    unidade: 'pH',
    faixaNormal: { min: 6.5, max: 8.5 },
    faixaAtencao: { min: 6.0, max: 9.0 },
    faixaCritica: { min: 5.5, max: 9.5 },
    tipoSinal: '4–20 mA ou comunicação digital',
    nivelArquitetura: 'Campo',
    areaProcesso: 'Linha principal de tratamento',
    explicacaoTag: {
      prefixo: 'AIT',
      significadoPrefixo: 'Analyzer Indicator Transmitter',
      significadoPortugues: 'Analisador indicador de pH',
      significadoNumero: 'Ponto de análise da linha principal (pH)',
    },
    impactoOperacional: 'Indica se a água está ácida, neutra ou alcalina.',
    efeitoAumento: 'Simula água mais alcalina.',
    efeitoDiminuicao:
      'Simula água mais ácida. Valores fora da faixa podem levar ao descarte.',
  },
  'AIT-102': {
    tag: 'AIT-102',
    nomeAbreviado: 'Analisador de turbidez',
    instrumento: 'Analisador indicador de turbidez',
    funcao: 'Mede a turbidez da água',
    categoria: 'Analisador de qualidade',
    papelNoProcesso: 'Indica a presença de partículas suspensas na água tratada',
    unidade: 'NTU',
    faixaNormal: { min: 0, max: 5 },
    faixaAtencao: { min: 5, max: 10 },
    faixaCritica: { min: 10 },
    tipoSinal: '4–20 mA ou comunicação digital',
    nivelArquitetura: 'Campo',
    areaProcesso: 'Linha principal de tratamento',
    explicacaoTag: {
      prefixo: 'AIT',
      significadoPrefixo: 'Analyzer Indicator Transmitter',
      significadoPortugues: 'Analisador indicador de turbidez',
      significadoNumero: 'Ponto de análise da linha principal (turbidez)',
    },
    impactoOperacional: 'Indica a presença de partículas em suspensão na água.',
    efeitoAumento: 'Simula piora da qualidade da água (maior turbidez).',
    efeitoDiminuicao: 'Simula água mais clarificada.',
  },
  'AIT-103': {
    tag: 'AIT-103',
    nomeAbreviado: 'Analisador de condutividade',
    instrumento: 'Analisador indicador de condutividade',
    funcao: 'Mede a condutividade da água',
    categoria: 'Analisador de qualidade',
    papelNoProcesso: 'Avalia a pureza iônica da água, importante para caldeiras',
    unidade: 'uS/cm',
    faixaNormal: { min: 100, max: 1200 },
    tipoSinal: '4–20 mA ou comunicação digital',
    nivelArquitetura: 'Campo',
    areaProcesso: 'Linha principal de tratamento',
    explicacaoTag: {
      prefixo: 'AIT',
      significadoPrefixo: 'Analyzer Indicator Transmitter',
      significadoPortugues: 'Analisador indicador de condutividade',
      significadoNumero: 'Ponto de análise da linha principal (condutividade)',
    },
    impactoOperacional: 'Indica a concentração de sais e íons dissolvidos na água.',
    efeitoAumento: 'Simula aumento de sólidos dissolvidos.',
    efeitoDiminuicao: 'Simula água com menor concentração iônica.',
  },
  'FIT-201': {
    tag: 'FIT-201',
    nomeAbreviado: 'Sensor de vazão química',
    instrumento: 'Transmissor indicador de vazão química',
    funcao: 'Mede a vazão de dosagem química',
    categoria: 'Transmissor / sensor analógico',
    papelNoProcesso: 'Garante que a quantidade correta de produto químico seja injetada',
    unidade: 'L/h',
    faixaNormal: { min: 2, max: 8 },
    tipoSinal: '4–20 mA',
    nivelArquitetura: 'Campo',
    areaProcesso: 'Sistema de dosagem química',
    explicacaoTag: {
      prefixo: 'FIT',
      significadoPrefixo: 'Flow Indicator Transmitter',
      significadoPortugues: 'Transmissor indicador de vazão química',
      significadoNumero: 'Sistema auxiliar de dosagem química (área 201)',
    },
    impactoOperacional: 'Indica quanto produto químico está sendo dosado.',
    efeitoAumento: 'Simula maior dosagem química no processo.',
    efeitoDiminuicao: 'Simula menor correção química.',
    dicaOperador:
      'A dosagem correta depende do pH e da vazão de entrada de água bruta.',
  },
  'FV-101': {
    tag: 'FV-101',
    nomeAbreviado: 'Válvula de controle de entrada',
    instrumento: 'Válvula de controle',
    funcao: 'Controla a entrada de água bruta',
    categoria: 'Atuador',
    papelNoProcesso: 'Regula o volume de água bruta que entra na planta',
    unidade: '%',
  },
  'XV-101': {
    tag: 'XV-101',
    nomeAbreviado: 'Válvula on/off de descarte',
    instrumento: 'Válvula discreta',
    funcao: 'Desvia água fora de especificação para descarte',
    categoria: 'Atuador discreto',
    papelNoProcesso: 'Protege o processo redirecionando água não conforme',
    unidade: '—',
  },
  'P-101': {
    tag: 'P-101',
    nomeAbreviado: 'Bomba principal',
    instrumento: 'Bomba',
    funcao: 'Bombeia água bruta para o filtro',
    categoria: 'Bomba / acionamento',
    papelNoProcesso: 'Motor primário do fluxo de água bruta na planta',
    unidade: '—',
  },
  'P-102': {
    tag: 'P-102',
    nomeAbreviado: 'Bomba de saída',
    instrumento: 'Bomba',
    funcao: 'Envia água tratada para o processo ou caldeira',
    categoria: 'Bomba / acionamento',
    papelNoProcesso: 'Distribui a água tratada ao destino final',
    unidade: '—',
  },
  'P-201': {
    tag: 'P-201',
    nomeAbreviado: 'Bomba dosadora química',
    instrumento: 'Bomba dosadora',
    funcao: 'Injeta produto químico no processo',
    categoria: 'Bomba / dosagem química',
    papelNoProcesso: 'Controla a adição de reagente para tratamento da água',
    unidade: '—',
  },
  'VFD-101': {
    tag: 'VFD-101',
    nomeAbreviado: 'Inversor da bomba principal',
    instrumento: 'Inversor de frequência',
    funcao: 'Controla a velocidade da bomba P-101',
    categoria: 'Acionamento elétrico',
    papelNoProcesso:
      'Permite variação de velocidade para economia de energia e controle de vazão',
    unidade: '%',
  },
  'F-101': {
    tag: 'F-101',
    nomeAbreviado: 'Filtro industrial',
    instrumento: 'Filtro',
    funcao: 'Remove impurezas da água antes do tanque',
    categoria: 'Equipamento de processo',
    papelNoProcesso: 'Etapa de separação sólido-líquido no pré-tratamento da água',
    unidade: '—',
  },
  'T-101': {
    tag: 'T-101',
    nomeAbreviado: 'Tanque de água tratada',
    instrumento: 'Tanque',
    funcao: 'Armazena água tratada',
    categoria: 'Equipamento de processo',
    papelNoProcesso: 'Pulmão de armazenamento que garante continuidade do fornecimento',
    unidade: '—',
  },
  'TK-201': {
    tag: 'TK-201',
    nomeAbreviado: 'Tanque químico',
    instrumento: 'Tanque de produto químico',
    funcao: 'Armazena produto químico usado na dosagem',
    categoria: 'Equipamento auxiliar',
    papelNoProcesso: 'Reservatório de reagente para o sistema de dosagem química',
    unidade: '—',
  },
  PROCESSO: {
    tag: 'PROCESSO',
    nomeAbreviado: 'Saída para processo',
    instrumento: '—',
    funcao: 'Representa o destino final da água tratada',
    categoria: 'Destino de processo',
    papelNoProcesso: 'Ponto de entrega da água tratada ao processo industrial ou caldeira',
  },
  DESCARTE: {
    tag: 'DESCARTE',
    nomeAbreviado: 'Descarte',
    instrumento: '—',
    funcao: 'Recebe água fora de especificação',
    categoria: 'Destino de processo',
    papelNoProcesso: 'Destino de água não conforme, evitando contaminação do processo',
  },
}

export function obterMetadados(tag: string): MetadadosEquipamento | undefined {
  return CATALOGO_EQUIPAMENTOS[tag]
}
