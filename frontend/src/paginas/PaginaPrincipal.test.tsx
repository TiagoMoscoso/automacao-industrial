import '@testing-library/jest-dom/vitest'

import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { App } from '../App'
import { TipoAlarme } from '../dominio/alarme'
import type { Alarme } from '../dominio/alarme'
import type { EstadoPlanta } from '../dominio/estadoPlanta'
import * as clienteApiPlanta from '../servicos/clienteApiPlanta'
import { PaginaPrincipal } from './PaginaPrincipal'

vi.mock('../servicos/clienteApiPlanta', () => ({
  obterEstado: vi.fn(),
  iniciarSimulacao: vi.fn(),
  pausarSimulacao: vi.fn(),
  reiniciarSimulacao: vi.fn(),
  alterarVariaveis: vi.fn(),
  aplicarCenario: vi.fn(),
}))

const clienteApiMock = vi.mocked(clienteApiPlanta)

beforeEach(() => {
  vi.clearAllMocks()
  clienteApiMock.obterEstado.mockResolvedValue(estadoPlantaBase)
  clienteApiMock.iniciarSimulacao.mockResolvedValue()
  clienteApiMock.pausarSimulacao.mockResolvedValue()
  clienteApiMock.reiniciarSimulacao.mockResolvedValue()
  clienteApiMock.alterarVariaveis.mockResolvedValue(estadoPlantaBase)
  clienteApiMock.aplicarCenario.mockResolvedValue(estadoPlantaBase)
})

afterEach(() => {
  cleanup()
  vi.clearAllTimers()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('PaginaPrincipal', () => {
  it('renderiza sem erros com estado inicial', async () => {
    render(<PaginaPrincipal />)

    expect(
      screen.getByRole('heading', {
        name: 'Automação Industrial: Tratamento de Água',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Sinóptico da planta')).toBeInTheDocument()
    expect(screen.getByText('Ajuste manual de variáveis')).toBeInTheDocument()
    await waitFor(() => {
      expect(clienteApiMock.obterEstado).toHaveBeenCalledTimes(1)
    })
  })

  it('exibe CartaoVariavel para cada uma das 10 variáveis de processo', () => {
    const { container } = render(<PaginaPrincipal />)
    const painelVariaveis = screen
      .getByRole('heading', { name: 'Variáveis de processo' })
      .closest('section')

    expect(container.querySelectorAll('.cartao-variavel')).toHaveLength(10)
    expect(painelVariaveis).not.toBeNull()
    expect(within(painelVariaveis as HTMLElement).getByText('FIT-101'))
      .toBeInTheDocument()
    expect(within(painelVariaveis as HTMLElement).getByText('FIT-102'))
      .toBeInTheDocument()
    expect(within(painelVariaveis as HTMLElement).getByText('LIT-101'))
      .toBeInTheDocument()
    expect(within(painelVariaveis as HTMLElement).getByText('PIT-101'))
      .toBeInTheDocument()
    expect(within(painelVariaveis as HTMLElement).getByText('DPIT-101'))
      .toBeInTheDocument()
    expect(within(painelVariaveis as HTMLElement).getByText('TIT-101'))
      .toBeInTheDocument()
    expect(within(painelVariaveis as HTMLElement).getByText('AIT-101'))
      .toBeInTheDocument()
    expect(within(painelVariaveis as HTMLElement).getByText('AIT-102'))
      .toBeInTheDocument()
    expect(within(painelVariaveis as HTMLElement).getByText('AIT-103'))
      .toBeInTheDocument()
    expect(within(painelVariaveis as HTMLElement).getByText('FIT-201'))
      .toBeInTheDocument()
  })

  it('layout: area-sinotico é o elemento de maior destaque', () => {
    const { container } = render(<PaginaPrincipal />)
    expect(container.querySelector('.area-sinotico')).toBeInTheDocument()
    expect(container.querySelector('.area-lateral')).toBeInTheDocument()
    expect(container.querySelector('.painel-variaveis')).toBeInTheDocument()
    expect(container.querySelector('.area-ajuste')).toBeInTheDocument()
  })

  it('todos os componentes filhos estão presentes no render', () => {
    render(<PaginaPrincipal />)
    expect(screen.getByText('Sinóptico da planta')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Alarmes' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Atuadores' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Cenários' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Variáveis de processo' })).toBeInTheDocument()
    expect(screen.getByText('Ajuste manual de variáveis')).toBeInTheDocument()
  })

  it('exibe seção de arquitetura na aba de documentação técnica', () => {
    render(<PaginaPrincipal />)

    fireEvent.click(screen.getByRole('tab', { name: 'Documentação Técnica' }))

    expect(
      screen.getAllByRole('heading', { name: 'Arquitetura de Automação' }),
    ).toHaveLength(2)
    expect(screen.getByText('Sistema industrial real')).toBeVisible()
    expect(screen.getByText('Sistema web simulado')).toBeVisible()
  })

  it('cabeçalho contém o nome da planta e o indicador de status do processo', () => {
    render(<PaginaPrincipal />)
    const cabecalho = screen.getByRole('banner')
    expect(within(cabecalho).getByRole('heading', {
      name: 'Automação Industrial: Tratamento de Água',
    })).toBeInTheDocument()
    expect(within(cabecalho).getByText(/Processo (liberado|bloqueado)/i))
      .toBeInTheDocument()
  })

  it('loop de polling chama obterEstado após montagem', async () => {
    vi.useFakeTimers()
    render(<PaginaPrincipal />)

    await act(async () => {
      await Promise.resolve()
    })
    expect(clienteApiMock.obterEstado).toHaveBeenCalledTimes(1)

    await act(async () => {
      vi.advanceTimersByTime(1000)
      await Promise.resolve()
    })

    expect(clienteApiMock.obterEstado).toHaveBeenCalledTimes(2)
  })

  it('limpa o intervalo ao desmontar o componente', async () => {
    vi.useFakeTimers()
    const clearIntervalEspiao = vi.spyOn(window, 'clearInterval')
    const { unmount } = render(<PaginaPrincipal />)

    await act(async () => {
      await Promise.resolve()
    })
    expect(clienteApiMock.obterEstado).toHaveBeenCalledTimes(1)
    unmount()

    expect(clearIntervalEspiao).toHaveBeenCalledTimes(1)
  })

  it('callback de emergência chama aplicarCenario e atualiza estado local', async () => {
    clienteApiMock.aplicarCenario.mockResolvedValue(estadoEmergencia)
    render(<PaginaPrincipal />)

    fireEvent.click(screen.getByRole('button', { name: 'Emergência' }))

    await waitFor(() => {
      expect(clienteApiMock.aplicarCenario).toHaveBeenCalledWith('emergencia')
    })
    expect(screen.getAllByText('Emergência acionada').length).toBeGreaterThan(0)
    expect(screen.getByText('Processo bloqueado')).toBeInTheDocument()
  })

  it('ajuste manual de pH chama API e atualiza estado local', async () => {
    vi.useFakeTimers()
    clienteApiMock.alterarVariaveis.mockResolvedValue({
      ...estadoPlantaBase,
      ph: 9.1,
      processoLiberado: false,
      alarmes: [criarAlarme(TipoAlarme.PhForaDaFaixa, 'pH fora da faixa')],
    })
    render(<PaginaPrincipal />)
    await act(async () => {
      await Promise.resolve()
    })

    fireEvent.change(screen.getByLabelText('Ajustar AIT-101'), {
      target: { value: '9.1' },
    })
    await act(async () => {
      vi.advanceTimersByTime(300)
      await Promise.resolve()
    })

    expect(clienteApiMock.alterarVariaveis).toHaveBeenCalledWith({ ph: 9.1 })
    expect(screen.getByText('Processo bloqueado')).toBeInTheDocument()
    expect(screen.getByText('Valor atual: 9,1 pH')).toBeInTheDocument()
  })

  it('erro de fetch exibe mensagem sem quebrar a interface', async () => {
    clienteApiMock.obterEstado.mockRejectedValue(new Error('backend offline'))

    render(<PaginaPrincipal />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Falha de comunicação com o backend: backend offline',
    )
    expect(screen.getByText('Sinóptico da planta')).toBeInTheDocument()
  })
})

describe('integração da aplicação', () => {
  it('App monta PaginaPrincipal sem erros', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: 'Automação Industrial: Tratamento de Água',
      }),
    ).toBeInTheDocument()
  })

  it('após polling com emergência, PainelAlarmes exibe o alarme', async () => {
    vi.useFakeTimers()
    clienteApiMock.obterEstado
      .mockResolvedValueOnce(estadoPlantaBase)
      .mockResolvedValueOnce(estadoEmergencia)

    render(<PaginaPrincipal />)

    await act(async () => {
      await Promise.resolve()
    })
    await act(async () => {
      vi.advanceTimersByTime(1000)
      await Promise.resolve()
    })

    expect(screen.getAllByText('Emergência acionada').length).toBeGreaterThan(0)
  })
})

const estadoPlantaBase: EstadoPlanta = {
  vazaoEntradaM3h: 120,
  vazaoSaidaM3h: 110,
  nivelTanquePercentual: 70,
  pressaoLinhaBar: 5,
  pressaoDiferencialFiltroBar: 0.5,
  temperaturaAguaC: 24,
  ph: 7.2,
  turbidezNtu: 2,
  condutividadeUsCm: 850,
  vazaoDosagemLH: 18,
  bombaPrincipalLigada: true,
  bombaSaidaLigada: true,
  bombaDosadoraLigada: true,
  aberturaValvulaEntradaPercentual: 65,
  valvulaDescarteAberta: false,
  emergenciaAcionada: false,
  bombaDosadoraEmFalha: false,
  bombaPrincipalLigar: true,
  bombaSaidaLigar: true,
  bombaDosadoraLigar: true,
  aberturaValvulaEntradaComandadaPercentual: 65,
  valvulaDescarteAbrir: false,
  processoLiberado: true,
  alarmes: [],
}

const estadoEmergencia: EstadoPlanta = {
  ...estadoPlantaBase,
  vazaoEntradaM3h: 0,
  vazaoSaidaM3h: 0,
  bombaPrincipalLigada: false,
  bombaSaidaLigada: false,
  bombaDosadoraLigada: false,
  aberturaValvulaEntradaPercentual: 0,
  emergenciaAcionada: true,
  bombaPrincipalLigar: false,
  bombaSaidaLigar: false,
  bombaDosadoraLigar: false,
  aberturaValvulaEntradaComandadaPercentual: 0,
  processoLiberado: false,
  alarmes: [criarAlarme(TipoAlarme.Emergencia, 'Emergência acionada')],
}

function criarAlarme(tipo: TipoAlarme, mensagem: string): Alarme {
  return {
    tipo,
    mensagem,
    timestamp: '2026-05-30T20:00:00',
  }
}
