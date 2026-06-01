export interface EquipamentoCampo {
  tag: string
  descricao: string
  tipoSinal: string
  funcao: string
}

export interface EquipamentoControle {
  nome: string
  descricao: string
  especificacao: string
}

export interface EquipamentoSupervisao {
  nome: string
  descricao: string
}

export interface ElementoRede {
  nome: string
  protocolo: string
  descricao: string
}

export interface ParEquivalencia {
  sistemaReal: string
  sistemaSimulado: string
}

export interface ArquiteturaAutomacao {
  campo: EquipamentoCampo[]
  controle: EquipamentoControle[]
  supervisao: EquipamentoSupervisao[]
  rede: ElementoRede[]
  equivalenciaSimulado: ParEquivalencia[]
}

export const arquiteturaAutomacao: ArquiteturaAutomacao = {
  campo: [
    {
      tag: 'FIT-101',
      descricao: 'Transmissor de vazão da entrada de água bruta',
      tipoSinal: '4-20 mA / HART',
      funcao: 'Medição',
    },
    {
      tag: 'FIT-102',
      descricao: 'Transmissor de vazão da saída para o processo',
      tipoSinal: '4-20 mA / HART',
      funcao: 'Medição',
    },
    {
      tag: 'LIT-101',
      descricao: 'Transmissor de nível do tanque T-101',
      tipoSinal: '4-20 mA / HART',
      funcao: 'Medição',
    },
    {
      tag: 'PIT-101',
      descricao: 'Transmissor de pressão da linha principal',
      tipoSinal: '4-20 mA',
      funcao: 'Medição',
    },
    {
      tag: 'DPIT-101',
      descricao: 'Transmissor de pressão diferencial do filtro F-101',
      tipoSinal: '4-20 mA',
      funcao: 'Medição',
    },
    {
      tag: 'TIT-101',
      descricao: 'Transmissor de temperatura da água tratada',
      tipoSinal: '4-20 mA',
      funcao: 'Medição',
    },
    {
      tag: 'AIT-101',
      descricao: 'Analisador de pH da água tratada',
      tipoSinal: '4-20 mA / HART',
      funcao: 'Medição',
    },
    {
      tag: 'AIT-102',
      descricao: 'Analisador de turbidez da água',
      tipoSinal: '4-20 mA / HART',
      funcao: 'Medição',
    },
    {
      tag: 'AIT-103',
      descricao: 'Analisador de condutividade da água',
      tipoSinal: '4-20 mA / HART',
      funcao: 'Medição',
    },
    {
      tag: 'FIT-201',
      descricao: 'Transmissor de vazão de dosagem química',
      tipoSinal: '4-20 mA / HART',
      funcao: 'Medição',
    },
    {
      tag: 'FV-101',
      descricao: 'Válvula de controle da entrada de água bruta',
      tipoSinal: '4-20 mA',
      funcao: 'Atuação analógica',
    },
    {
      tag: 'XV-101',
      descricao: 'Válvula on/off da linha de descarte',
      tipoSinal: 'Digital 24 Vcc',
      funcao: 'Atuação discreta',
    },
    {
      tag: 'P-101',
      descricao: 'Bomba principal de recalque para o filtro',
      tipoSinal: 'Digital 24 Vcc',
      funcao: 'Atuação discreta',
    },
    {
      tag: 'P-102',
      descricao: 'Bomba de saída para processo ou caldeira',
      tipoSinal: 'Digital 24 Vcc',
      funcao: 'Atuação discreta',
    },
    {
      tag: 'P-201',
      descricao: 'Bomba dosadora de produto químico',
      tipoSinal: 'Digital 24 Vcc',
      funcao: 'Atuação discreta',
    },
    {
      tag: 'VFD-101',
      descricao: 'Inversor de frequência da bomba P-101',
      tipoSinal: '4-20 mA + RS-485 / Modbus RTU',
      funcao: 'Atuação analógica / comunicação',
    },
  ],
  controle: [
    {
      nome: 'CLP Principal',
      descricao: 'Controlador Lógico Programável central da planta',
      especificacao:
        'CPU industrial com Modbus TCP, Profinet e memória de programa de 512 kB',
    },
    {
      nome: 'Módulos de Entrada Analógica (AI)',
      descricao: 'Leitura dos transmissores e analisadores de campo',
      especificacao: '16 canais, resolução de 16 bits, faixa 4-20 mA',
    },
    {
      nome: 'Módulos de Saída Analógica (AO)',
      descricao: 'Comando da válvula de controle e referência do inversor',
      especificacao: '8 canais, resolução de 12 bits, faixa 4-20 mA',
    },
    {
      nome: 'Módulos de Entrada Digital (DI)',
      descricao: 'Leitura de chaves, botoeiras, estados e permissivos',
      especificacao: '32 canais isolados, 24 Vcc',
    },
    {
      nome: 'Módulos de Saída Digital (DO)',
      descricao: 'Comando de bombas, válvula on/off e sinalização de alarmes',
      especificacao: '16 canais, 24 Vcc, com relés de interface',
    },
    {
      nome: 'Fonte de alimentação 24 Vcc',
      descricao: 'Alimentação do rack de I/O, instrumentos e relés auxiliares',
      especificacao: '24 Vcc / 10 A com supervisão de tensão',
    },
    {
      nome: 'Relés de interface',
      descricao: 'Isolamento galvânico entre saídas do CLP e cargas de campo',
      especificacao: 'Relés slim 24 Vcc, contato NA+NF, montagem em trilho DIN',
    },
    {
      nome: 'Disjuntores e seccionadoras',
      descricao: 'Proteção e seccionamento dos circuitos do painel',
      especificacao: 'Montagem DIN 35 mm, curva C, faixas de 2 A a 32 A',
    },
    {
      nome: 'Bornes de passagem',
      descricao: 'Pontos de conexão identificados entre campo e painel',
      especificacao: 'Bornes 4 mm² com identificação rastreável por tag',
    },
    {
      nome: 'Painel elétrico de controle',
      descricao: 'Gabinete para CLP, módulos, proteções e bornes',
      especificacao: 'Grau IP54, 600x800x250 mm, com ventilação ou climatização',
    },
    {
      nome: 'Nobreak / UPS',
      descricao: 'Alimentação de contingência para controle e supervisão local',
      especificacao: '1 kVA, autonomia de 30 min para CLP, IHM e rede de controle',
    },
  ],
  supervisao: [
    {
      nome: 'IHM Local',
      descricao:
        'Interface Homem-Máquina instalada no painel para operação local da planta',
    },
    {
      nome: 'Estação SCADA',
      descricao:
        'Computador de supervisão para monitoramento em tempo real, comandos e tendências',
    },
    {
      nome: 'Estação de Engenharia',
      descricao:
        'Computador para programação do CLP, manutenção e configuração do SCADA',
    },
    {
      nome: 'Historiador de dados',
      descricao:
        'Serviço para armazenamento histórico de variáveis de processo e eventos',
    },
    {
      nome: 'Servidor de alarmes',
      descricao:
        'Serviço responsável por registrar, distribuir e manter eventos de alarme',
    },
    {
      nome: 'Painel de alarmes',
      descricao:
        'Tela operacional com alarmes ativos, prioridade e reconhecimento pelo operador',
    },
  ],
  rede: [
    {
      nome: 'Switch Industrial Ethernet',
      protocolo: 'IEEE 802.3 / Ethernet Industrial',
      descricao:
        'Conecta CLP, IHM, SCADA, historiador e estação de engenharia na rede de controle',
    },
    {
      nome: 'Comunicação CLP e SCADA',
      protocolo: 'Modbus TCP / EtherNet/IP / Profinet',
      descricao:
        'Troca variáveis de processo, estados de alarmes e comandos operacionais',
    },
    {
      nome: 'Sinais de instrumentação analógica',
      protocolo: '4-20 mA / HART',
      descricao:
        'Integra transmissores e analisadores aos módulos de entrada analógica do CLP',
    },
    {
      nome: 'Sinais discretos de campo',
      protocolo: 'Digital 24 Vcc (DI/DO)',
      descricao:
        'Integra comandos e estados de bombas, válvula on/off, botoeiras e alarmes',
    },
    {
      nome: 'Comunicação com inversor',
      protocolo: 'RS-485 / Modbus RTU',
      descricao:
        'Permite leitura de status e envio de referência de velocidade ao VFD-101',
    },
  ],
  equivalenciaSimulado: [
    {
      sistemaReal: 'Instrumentos de campo',
      sistemaSimulado: 'Estado de processo calculado pelo backend Python',
    },
    {
      sistemaReal: 'CLP',
      sistemaSimulado: 'Controlador em Python no backend',
    },
    {
      sistemaReal: 'Matriz de intertravamento',
      sistemaSimulado: 'Matriz de Causa e Efeito implementada em Python',
    },
    {
      sistemaReal: 'Bombas e válvulas',
      sistemaSimulado: 'Ações de controle aplicadas ao modelo da planta',
    },
    {
      sistemaReal: 'IHM local / Sistema SCADA',
      sistemaSimulado: 'Frontend React com sinóptico, cards e alarmes',
    },
    {
      sistemaReal: 'Rede industrial',
      sistemaSimulado: 'Comunicação HTTP entre frontend e backend via API REST',
    },
  ],
}
