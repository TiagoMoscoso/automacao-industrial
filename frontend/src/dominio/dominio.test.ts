import { describe, expect, expectTypeOf, it } from 'vitest'

import type { Alarme } from './alarme'
import { TipoAlarme } from './alarme'
import type { EstadoPlanta } from './estadoPlanta'

describe('domínio da planta', () => {
  it('mantém os 9 tipos de alarme do backend Python', () => {
    expect(Object.values(TipoAlarme)).toEqual([
      'NIVEL_ALTO_ALTO',
      'NIVEL_BAIXO_BAIXO',
      'PRESSAO_ALTA',
      'FILTRO_SATURADO',
      'PH_FORA_DA_FAIXA',
      'TURBIDEZ_ALTA',
      'CONDUTIVIDADE_ALTA',
      'FALHA_DOSADORA',
      'EMERGENCIA',
    ])
  })

  it('tipa os campos principais de EstadoPlanta', () => {
    expectTypeOf<EstadoPlanta['nivelTanquePercentual']>().toEqualTypeOf<number>()
    expectTypeOf<EstadoPlanta['alarmes']>().toEqualTypeOf<Alarme[]>()
  })
})
