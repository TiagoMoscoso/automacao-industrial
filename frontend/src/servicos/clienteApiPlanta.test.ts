import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { TipoAlarme } from '../dominio/alarme'
import type { EstadoPlantaApi } from '../dominio/estadoPlanta'
import {
  alterarVariaveis,
  aplicarCenario,
  configurarUrlBaseApiPlanta,
  iniciarSimulacao,
  obterEstado,
  obterUrlBaseApiPlanta,
  pausarSimulacao,
  reiniciarSimulacao,
  verificarSaude,
} from './clienteApiPlanta'

const estadoApiValido: EstadoPlantaApi = {
  vazao_entrada_m3h: 120,
  vazao_saida_m3h: 110,
  nivel_tanque_percentual: 72,
  pressao_linha_bar: 4.2,
  pressao_diferencial_filtro_bar: 0.4,
  temperatura_agua_c: 24,
  ph: 7.1,
  turbidez_ntu: 1.2,
  condutividade_us_cm: 840,
  vazao_dosagem_l_h: 18,
  bomba_principal_ligada: true,
  bomba_saida_ligada: true,
  bomba_dosadora_ligada: true,
  abertura_valvula_entrada_percentual: 65,
  valvula_descarte_aberta: false,
  emergencia_acionada: false,
  bomba_dosadora_em_falha: false,
  bomba_principal_ligar: true,
  bomba_saida_ligar: true,
  bomba_dosadora_ligar: true,
  abertura_valvula_entrada_comandada_percentual: 65,
  valvula_descarte_abrir: false,
  processo_liberado: true,
  alarmes_ativos: [
    {
      tipo: TipoAlarme.FiltroSaturado,
      mensagem: 'Filtro saturado: manutenção necessária',
      timestamp: '2026-05-30T20:00:00',
    },
  ],
}

describe('clienteApiPlanta', () => {
  beforeEach(() => {
    configurarUrlBaseApiPlanta('http://localhost:8000')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('retorna EstadoPlanta tipado ao obter estado', async () => {
    const fetchMock = mockFetchJson(estadoApiValido)

    const estado = await obterEstado()

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8000/api/planta/estado',
      expect.objectContaining({ headers: expect.any(Object) }),
    )
    expect(estado.nivelTanquePercentual).toBe(72)
    expect(estado.alarmes[0]?.tipo).toBe(TipoAlarme.FiltroSaturado)
    expect(estado.processoLiberado).toBe(true)
  })

  it('faz POST para aplicar cenário pelo nome', async () => {
    const fetchMock = mockFetchJson(estadoApiValido)

    await aplicarCenario('nivel_alto_alto')

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8000/api/planta/cenarios/nivel_alto_alto',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('faz POST para alterar variáveis com body JSON', async () => {
    const fetchMock = mockFetchJson(estadoApiValido)

    await alterarVariaveis({ ph: 9.1 })

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8000/api/planta/variaveis',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ ph: 9.1 }),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      }),
    )
  })

  it('permite trocar a URL base da API', async () => {
    configurarUrlBaseApiPlanta('http://api:8000/')
    const fetchMock = mockFetchJson({ status: 'ok' })

    await verificarSaude()

    expect(obterUrlBaseApiPlanta()).toBe('http://api:8000')
    expect(fetchMock).toHaveBeenCalledWith(
      'http://api:8000/api/saude',
      expect.any(Object),
    )
  })

  it('faz POST nos comandos de simulação', async () => {
    const fetchMock = mockFetchSemConteudo()

    await iniciarSimulacao()
    await pausarSimulacao()
    await reiniciarSimulacao()

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'http://localhost:8000/api/planta/iniciar',
      expect.objectContaining({ method: 'POST' }),
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'http://localhost:8000/api/planta/pausar',
      expect.objectContaining({ method: 'POST' }),
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      'http://localhost:8000/api/planta/reiniciar',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('lança erro em português para respostas HTTP inválidas', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        new Response(JSON.stringify({ detail: 'Cenário não encontrado' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    )

    await expect(aplicarCenario('inexistente')).rejects.toThrow(
      'Erro na API (404): Cenário não encontrado',
    )
  })

  it('lança erro em português com corpo textual', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('Falha inesperada', { status: 500 })),
    )

    await expect(verificarSaude()).rejects.toThrow(
      'Erro na API (500): Falha inesperada',
    )
  })
})

function mockFetchJson(corpo: unknown): ReturnType<typeof vi.fn> {
  const fetchMock = vi.fn(async () =>
    new Response(JSON.stringify(corpo), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  )
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

function mockFetchSemConteudo(): ReturnType<typeof vi.fn> {
  const fetchMock = vi.fn(async () => new Response(null, { status: 204 }))
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}
