export enum TipoAlarme {
  NivelAltoAlto = 'NIVEL_ALTO_ALTO',
  NivelBaixoBaixo = 'NIVEL_BAIXO_BAIXO',
  PressaoAlta = 'PRESSAO_ALTA',
  FiltroSaturado = 'FILTRO_SATURADO',
  PhForaDaFaixa = 'PH_FORA_DA_FAIXA',
  TurbidezAlta = 'TURBIDEZ_ALTA',
  CondutividadeAlta = 'CONDUTIVIDADE_ALTA',
  FalhaDosadora = 'FALHA_DOSADORA',
  Emergencia = 'EMERGENCIA',
}

export interface Alarme {
  tipo: TipoAlarme
  mensagem: string
  timestamp: string
}
