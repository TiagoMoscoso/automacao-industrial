import type { Alarme } from './alarme'

export interface AcoesControle {
  bombaPrincipalLigar: boolean
  bombaSaidaLigar: boolean
  bombaDosadoraLigar: boolean
  aberturaValvulaEntradaComandadaPercentual: number
  valvulaDescarteAbrir: boolean
  processoLiberado: boolean
  alarmes: Alarme[]
}
