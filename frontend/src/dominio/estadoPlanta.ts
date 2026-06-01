import type { AcoesControle } from './acoesControle'
import type { Alarme } from './alarme'

export interface EstadoPlanta extends AcoesControle {
  vazaoEntradaM3h: number
  vazaoSaidaM3h: number
  nivelTanquePercentual: number
  pressaoLinhaBar: number
  pressaoDiferencialFiltroBar: number
  temperaturaAguaC: number
  ph: number
  turbidezNtu: number
  condutividadeUsCm: number
  vazaoDosagemLH: number
  bombaPrincipalLigada: boolean
  bombaSaidaLigada: boolean
  bombaDosadoraLigada: boolean
  aberturaValvulaEntradaPercentual: number
  valvulaDescarteAberta: boolean
  emergenciaAcionada: boolean
  bombaDosadoraEmFalha: boolean
  alarmes: Alarme[]
}

export interface EstadoPlantaApi {
  vazao_entrada_m3h: number
  vazao_saida_m3h: number
  nivel_tanque_percentual: number
  pressao_linha_bar: number
  pressao_diferencial_filtro_bar: number
  temperatura_agua_c: number
  ph: number
  turbidez_ntu: number
  condutividade_us_cm: number
  vazao_dosagem_l_h: number
  bomba_principal_ligada: boolean
  bomba_saida_ligada: boolean
  bomba_dosadora_ligada: boolean
  abertura_valvula_entrada_percentual: number
  valvula_descarte_aberta: boolean
  emergencia_acionada: boolean
  bomba_dosadora_em_falha: boolean
  bomba_principal_ligar: boolean
  bomba_saida_ligar: boolean
  bomba_dosadora_ligar: boolean
  abertura_valvula_entrada_comandada_percentual: number
  valvula_descarte_abrir: boolean
  processo_liberado: boolean
  alarmes_ativos: Alarme[]
}
