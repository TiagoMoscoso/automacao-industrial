import '@testing-library/jest-dom/vitest'

import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { AcoesControle } from '../dominio/acoesControle'
import { TipoAlarme } from '../dominio/alarme'
import type { Alarme } from '../dominio/alarme'
import type { EstadoPlanta } from '../dominio/estadoPlanta'
import { ArquiteturaAutomacao } from './ArquiteturaAutomacao'
import { CartaoVariavel } from './CartaoVariavel'
import { ControleSimulacao } from './ControleSimulacao'
import { PainelAlarmes } from './PainelAlarmes'
import { PainelAtuadores } from './PainelAtuadores'
import { PainelAjusteVariaveis } from './PainelAjusteVariaveis'
import { PainelCenarios } from './PainelCenarios'
import { SecaoArquitetura } from './SecaoArquitetura'
import { SinoticoPlanta } from './SinoticoPlanta'

afterEach(() => {
  cleanup()
  vi.clearAllTimers()
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('CartaoVariavel', () => {
  it('renderiza estado normal com classe verde', () => {
    const { container } = render(
      <CartaoVariavel
        estado="normal"
        nome="Nível do tanque"
        tag="LIT-101"
        unidade="%"
        valor={70}
      />,
    )

    expect(screen.getByText('LIT-101')).toBeInTheDocument()
    expect(container.firstElementChild).toHaveClass('cartao-variavel--normal')
  })

  it('renderiza estado de falha com classe vermelha', () => {
    const { container } = render(
      <CartaoVariavel
        estado="falha"
        nome="pH"
        tag="AIT-101"
        unidade=""
        valor={9.1}
      />,
    )

    expect(screen.getByText('Falha')).toBeInTheDocument()
    expect(container.firstElementChild).toHaveClass('cartao-variavel--falha')
  })

  it('renderiza estado de alerta com classe correspondente', () => {
    const { container } = render(
      <CartaoVariavel
        estado="alerta"
        nome="Turbidez"
        tag="AIT-102"
        unidade="NTU"
        valor={4.8}
      />,
    )

    expect(screen.getByText('Alerta')).toBeInTheDocument()
    expect(container.firstElementChild).toHaveClass('cartao-variavel--alerta')
  })
})

describe('ArquiteturaAutomacao', () => {
  it('renderiza as três camadas principais empilhadas', () => {
    render(<ArquiteturaAutomacao />)

    expect(
      screen.getByRole('heading', { name: 'Arquitetura de Automação' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Nível de Supervisão')).toBeInTheDocument()
    expect(screen.getByLabelText('Nível de Controle')).toBeInTheDocument()
    expect(screen.getByLabelText('Nível de Campo')).toBeInTheDocument()
  })

  it('exibe conectores de rede, badges e equivalência didática', () => {
    render(<ArquiteturaAutomacao />)

    expect(
      screen.getByLabelText('Rede industrial entre supervisão e controle'),
    ).toHaveTextContent('Modbus TCP')
    expect(
      screen.getByLabelText('Rede / sinais industriais entre controle e campo'),
    ).toHaveTextContent('4-20 mA')
    expect(screen.getAllByText(/Simulado por:/)).toHaveLength(3)
    expect(screen.getByText('Sistema real x sistema simulado')).toBeVisible()
  })

  it('agrupa instrumentos de campo por função', () => {
    render(<ArquiteturaAutomacao />)

    expect(screen.getByRole('heading', { name: 'Medição' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Atuação discreta' })).toBeVisible()
    expect(screen.getByText('FIT-101')).toBeInTheDocument()
    expect(screen.getByText('P-201')).toBeInTheDocument()
  })
})

describe('SecaoArquitetura', () => {
  it('renderiza definição, diagrama e tabela com 6 pares de equivalência', () => {
    render(<SecaoArquitetura />)

    expect(
      screen.getAllByRole('heading', { name: 'Arquitetura de Automação' }),
    ).toHaveLength(2)
    expect(
      screen.getByText(/define como instrumentos, controladores/i),
    ).toBeVisible()
    expect(screen.getByLabelText('Nível de Supervisão')).toBeInTheDocument()

    const tabela = screen.getByRole('table')
    expect(within(tabela).getAllByRole('row')).toHaveLength(7)
    expect(within(tabela).getByText('Instrumentos de campo')).toBeVisible()
    expect(within(tabela).getByText('Rede industrial')).toBeVisible()
  })

  it('mantém o detalhamento recolhido e revela os 4 blocos ao clicar', () => {
    render(<SecaoArquitetura />)

    const detalhe = screen
      .getByText('Ver explicação detalhada por nível')
      .closest('details')

    expect(detalhe).not.toBeNull()
    expect(detalhe).not.toHaveAttribute('open')

    fireEvent.click(screen.getByText('Ver explicação detalhada por nível'))

    expect(detalhe).toHaveAttribute('open')
    expect(screen.getByRole('heading', { name: 'Nível de Campo' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Nível de Controle' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Nível de Supervisão' }))
      .toBeVisible()
    expect(screen.getByRole('heading', { name: 'Rede Industrial' })).toBeVisible()
  })
})

describe('PainelAlarmes', () => {
  it('exibe processo liberado e mensagem sem alarmes', () => {
    render(<PainelAlarmes alarmes={[]} processoLiberado={true} />)

    expect(screen.getByText('Processo LIBERADO')).toHaveClass(
      'estado-processo--liberado',
    )
    expect(screen.getByText('Sem alarmes ativos')).toBeInTheDocument()
  })

  it('exibe processo bloqueado em vermelho', () => {
    render(<PainelAlarmes alarmes={[]} processoLiberado={false} />)

    expect(screen.getByText('Processo BLOQUEADO')).toHaveClass(
      'estado-processo--bloqueado',
    )
  })

  it('exibe cada alarme ativo da lista', () => {
    const alarmes: Alarme[] = [
      criarAlarme(TipoAlarme.TurbidezAlta, 'Turbidez alta na saída'),
      criarAlarme(TipoAlarme.PhForaDaFaixa, 'pH fora da faixa operacional'),
    ]

    render(<PainelAlarmes alarmes={alarmes} processoLiberado={false} />)

    expect(screen.getByText('Turbidez alta na saída')).toBeInTheDocument()
    expect(screen.getByText('pH fora da faixa operacional')).toBeInTheDocument()
  })

  it('exibe alarme de emergência com destaque crítico', () => {
    const alarmes: Alarme[] = [
      criarAlarme(TipoAlarme.Emergencia, 'Emergência acionada'),
    ]
    render(<PainelAlarmes alarmes={alarmes} processoLiberado={false} />)

    const alarmeEl = screen.getByText('EMERGENCIA').closest('article')
    expect(alarmeEl).not.toBeNull()
    expect(alarmeEl).toHaveClass('alarme-item--critico')
  })
})

describe('PainelCenarios', () => {
  it('renderiza os 6 botões de cenários em português', () => {
    render(<PainelCenarios onAcionarCenario={vi.fn()} />)

    expect(screen.getAllByRole('button')).toHaveLength(6)
    expect(screen.getByRole('button', { name: 'Operação Normal' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Nível Alto-Alto' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Nível Baixo-Baixo' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'pH Fora da Faixa' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Turbidez Alta' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Emergência' })).toBeVisible()
  })

  it('aciona emergência com nome esperado pela API', () => {
    const onAcionarCenario = vi.fn()
    render(<PainelCenarios onAcionarCenario={onAcionarCenario} />)

    fireEvent.click(screen.getByRole('button', { name: 'Emergência' }))

    expect(onAcionarCenario).toHaveBeenCalledWith('emergencia')
  })

  it('botão de emergência tem classe CSS diferenciada', () => {
    render(<PainelCenarios onAcionarCenario={vi.fn()} />)

    expect(
      screen.getByRole('button', { name: 'Emergência' }),
    ).toHaveClass('botao-cenario--emergencia')
  })
})

describe('ControleSimulacao', () => {
  it('mantém Pausar habilitado quando a simulação está ativa', () => {
    render(
      <ControleSimulacao
        onIniciar={vi.fn()}
        onPausar={vi.fn()}
        onReiniciar={vi.fn()}
        simulacaoAtiva={true}
      />,
    )

    expect(screen.getByRole('button', { name: 'Pausar' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Iniciar' })).toBeDisabled()
  })

  it('emite callbacks dos controles principais', () => {
    const onIniciar = vi.fn()
    const onReiniciar = vi.fn()
    render(
      <ControleSimulacao
        onIniciar={onIniciar}
        onPausar={vi.fn()}
        onReiniciar={onReiniciar}
        simulacaoAtiva={false}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar' }))
    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar' }))

    expect(onIniciar).toHaveBeenCalledTimes(1)
    expect(onReiniciar).toHaveBeenCalledTimes(1)
  })
})

describe('PainelAtuadores', () => {
  it('exibe indicador de bomba P-101 ativa', () => {
    render(<PainelAtuadores acoes={acoesControleBase} />)

    const p101 = screen.getByText('P-101').closest('article')
    expect(p101).not.toBeNull()
    expect(within(p101 as HTMLElement).getByText('Ligada')).toHaveClass(
      'atuador__estado--ativo',
    )
  })

  it('exibe válvula de entrada fechada quando comando é zero', () => {
    render(
      <PainelAtuadores
        acoes={{
          ...acoesControleBase,
          aberturaValvulaEntradaComandadaPercentual: 0,
        }}
      />,
    )

    const fv101 = screen.getByText('FV-101').closest('article')
    expect(fv101).not.toBeNull()
    expect(within(fv101 as HTMLElement).getByText('Fechada')).toHaveClass(
      'atuador__estado--inativo',
    )
  })

  it('exibe percentual de abertura de FV-101 quando aberta', () => {
    render(<PainelAtuadores acoes={acoesControleBase} />)

    const fv101 = screen.getByText('FV-101').closest('article')
    expect(fv101).not.toBeNull()
    expect(within(fv101 as HTMLElement).getByText('65%')).toBeInTheDocument()
  })
})

describe('PainelAjusteVariaveis', () => {
  it('renderiza controles para as 10 variáveis de processo', () => {
    render(
      <PainelAjusteVariaveis
        estadoAtual={estadoPlantaBase}
        onAlterarVariavel={vi.fn()}
      />,
    )

    expect(screen.getAllByRole('slider')).toHaveLength(10)
    expect(screen.getAllByText('FIT-101').length).toBeGreaterThan(0)
    expect(screen.getByText('FIT-102')).toBeInTheDocument()
    expect(screen.getAllByText('LIT-101').length).toBeGreaterThan(0)
    expect(screen.getByText('PIT-101')).toBeInTheDocument()
    expect(screen.getAllByText('DPIT-101').length).toBeGreaterThan(0)
    expect(screen.getByText('TIT-101')).toBeInTheDocument()
    expect(screen.getAllByText('AIT-101').length).toBeGreaterThan(0)
    expect(screen.getAllByText('AIT-102').length).toBeGreaterThan(0)
    expect(screen.getByText('AIT-103')).toBeInTheDocument()
    expect(screen.getAllByText('FIT-201').length).toBeGreaterThan(0)
  })

  it('configura LIT-101 com limites de 0 a 100', () => {
    render(
      <PainelAjusteVariaveis
        estadoAtual={estadoPlantaBase}
        onAlterarVariavel={vi.fn()}
      />,
    )

    const slider = screen.getByLabelText('Ajustar LIT-101')
    expect(slider).toHaveAttribute('min', '0')
    expect(slider).toHaveAttribute('max', '100')
  })

  it('configura AIT-101 pH com limites de 0 a 14', () => {
    render(
      <PainelAjusteVariaveis
        estadoAtual={estadoPlantaBase}
        onAlterarVariavel={vi.fn()}
      />,
    )

    const slider = screen.getByLabelText('Ajustar AIT-101')
    expect(slider).toHaveAttribute('min', '0')
    expect(slider).toHaveAttribute('max', '14')
  })

  it('ao alterar LIT-101 para 96 chama o callback com o campo correto', async () => {
    vi.useFakeTimers()
    const onAlterarVariavel = vi.fn()
    render(
      <PainelAjusteVariaveis
        estadoAtual={estadoPlantaBase}
        onAlterarVariavel={onAlterarVariavel}
      />,
    )

    fireEvent.change(screen.getByLabelText('Ajustar LIT-101'), {
      target: { value: '96' },
    })
    await act(async () => {
      vi.advanceTimersByTime(300)
    })

    expect(onAlterarVariavel).toHaveBeenCalledWith(
      'nivel_tanque_percentual',
      96,
    )
  })

  it('exibe indicação visual quando a variável tem alarme ativo', () => {
    render(
      <PainelAjusteVariaveis
        estadoAtual={{
          ...estadoPlantaBase,
          alarmes: [criarAlarme(TipoAlarme.PhForaDaFaixa, 'pH fora da faixa')],
        }}
        onAlterarVariavel={vi.fn()}
      />,
    )

    const campo = screen.getByLabelText('Ajustar AIT-101').closest('div')
    expect(campo).toHaveClass('campo-ajuste--critico')
    expect(within(campo as HTMLElement).getByText('Alarme ativo'))
      .toBeInTheDocument()
  })

  it('toggle de emergência chama callback ao ativar', () => {
    const onAlterarVariavel = vi.fn()
    render(
      <PainelAjusteVariaveis
        estadoAtual={estadoPlantaBase}
        onAlterarVariavel={onAlterarVariavel}
      />,
    )

    fireEvent.click(screen.getByLabelText('Emergência acionada'))

    expect(onAlterarVariavel).toHaveBeenCalledWith(
      'emergencia_acionada',
      true,
    )
  })
})

describe('SinoticoPlanta', () => {
  it('renderiza o fluxo de processo em operação normal', () => {
    render(<SinoticoPlanta estado={estadoPlantaBase} />)

    expect(
      screen.getByRole('img', {
        name: 'Fluxo de processo da planta de tratamento de água',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Água Bruta')).toBeInTheDocument()
    expect(screen.getByText('Filtro F-101')).toBeInTheDocument()
    expect(screen.getByText('Injeção química')).toBeInTheDocument()
  })

  it('aplica falha e bloqueio visual em emergência', () => {
    render(
      <SinoticoPlanta
        estado={{
          ...estadoPlantaBase,
          emergenciaAcionada: true,
          processoLiberado: false,
          alarmes: [criarAlarme(TipoAlarme.Emergencia, 'Emergência acionada')],
        }}
      />,
    )

    const p101 = screen.getByTestId('equipamento-P-101').querySelector('rect')
    const processo = screen
      .getByTestId('equipamento-PROCESSO')
      .querySelector('rect')
    expect(p101).toHaveClass('equipamento--falha')
    expect(processo).toHaveClass('equipamento--bloqueado')
  })

  it('renderiza todos os 14 equipamentos no estado normal', () => {
    render(<SinoticoPlanta estado={estadoPlantaBase} />)

    const tags = [
      'AGUA',
      'FV-101',
      'FIT-101',
      'P-101',
      'F-101',
      'T-101',
      'P-102',
      'PROCESSO',
      'XV-101',
      'DESCARTE',
      'TK-201',
      'P-201',
      'FIT-201',
      'INJECAO',
    ]
    for (const tag of tags) {
      expect(screen.getByTestId(`equipamento-${tag}`)).toBeInTheDocument()
    }
  })

  it('equipamento em falha recebe classe CSS de falha', () => {
    render(
      <SinoticoPlanta
        estado={{ ...estadoPlantaBase, bombaDosadoraEmFalha: true }}
      />,
    )

    const p201 = screen.getByTestId('equipamento-P-201').querySelector('rect')
    expect(p201).toHaveClass('equipamento--falha')
  })

  it('equipamento em alerta operacional recebe classe CSS de alerta', () => {
    render(
      <SinoticoPlanta
        estado={{
          ...estadoPlantaBase,
          nivelTanquePercentual: 96,
          alarmes: [
            criarAlarme(TipoAlarme.NivelAltoAlto, 'Nível alto-alto'),
          ],
        }}
      />,
    )

    const tanque = screen.getByTestId('equipamento-T-101').querySelector('rect')
    expect(tanque).toHaveClass('equipamento--alerta')
  })

  it('equipamento inativo recebe classe CSS inativa', () => {
    render(
      <SinoticoPlanta
        estado={{ ...estadoPlantaBase, processoLiberado: false }}
      />,
    )

    const agua = screen.getByTestId('equipamento-AGUA').querySelector('rect')
    expect(agua).toHaveClass('equipamento--inativo')
  })

  it('SVG contém pelo menos um marcador de seta em defs', () => {
    const { container } = render(<SinoticoPlanta estado={estadoPlantaBase} />)

    expect(container.querySelector('defs marker')).toBeInTheDocument()
  })

  it('mantém marcador de seta discreto e compartilhado', () => {
    const { container } = render(<SinoticoPlanta estado={estadoPlantaBase} />)

    const marcador = container.querySelector('marker#seta')
    const ponta = marcador?.querySelector('path')
    expect(marcador).toHaveAttribute('markerWidth', '6')
    expect(marcador).toHaveAttribute('markerHeight', '6')
    expect(marcador).toHaveAttribute('refX', '5.5')
    expect(marcador).toHaveAttribute('refY', '3')
    expect(ponta).toHaveAttribute('d', 'M 0 0 L 6 3 L 0 6 z')
  })

  it('tags industriais estão presentes no render', () => {
    render(<SinoticoPlanta estado={estadoPlantaBase} />)

    expect(screen.getByText('FV-101')).toBeInTheDocument()
    expect(screen.getByText('P-101')).toBeInTheDocument()
    expect(screen.getByText('FIT-101')).toBeInTheDocument()
    expect(screen.getByText('XV-101')).toBeInTheDocument()
    expect(screen.getByText('P-102')).toBeInTheDocument()
  })

  it('mantém T-101 proporcional e centralizado na linha principal', () => {
    render(<SinoticoPlanta estado={estadoPlantaBase} />)

    const tanque = screen.getByTestId('equipamento-T-101').querySelector('rect')
    const p101 = screen.getByTestId('equipamento-P-101').querySelector('rect')
    expect(tanque).not.toBeNull()
    expect(p101).not.toBeNull()

    const yTanque = Number(tanque?.getAttribute('y'))
    const alturaTanque = Number(tanque?.getAttribute('height'))
    const yP101 = Number(p101?.getAttribute('y'))
    const alturaP101 = Number(p101?.getAttribute('height'))

    expect(alturaTanque).toBeLessThanOrEqual(alturaP101 * 1.5)
    expect(yTanque + alturaTanque / 2).toBe(yP101 + alturaP101 / 2)
  })

  it('alinha a injeção química ao conector antes de T-101', () => {
    const { container } = render(<SinoticoPlanta estado={estadoPlantaBase} />)

    const injecao = screen
      .getByTestId('equipamento-INJECAO')
      .querySelector('rect')
    const t101 = screen.getByTestId('equipamento-T-101').querySelector('rect')
    expect(injecao).not.toBeNull()
    expect(t101).not.toBeNull()

    const linhas = Array.from(container.querySelectorAll('line'))
    const conectorVertical = linhas.find(
      (linha) =>
        linha.getAttribute('x1') === '460' &&
        linha.getAttribute('x2') === '460' &&
        linha.getAttribute('y1') === '340' &&
        linha.getAttribute('y2') === '100',
    )
    const linhaDosagem = linhas.find(
      (linha) =>
        linha.getAttribute('x1') === '185' &&
        linha.getAttribute('x2') === '460' &&
        linha.getAttribute('y1') === '340' &&
        linha.getAttribute('y2') === '340',
    )
    expect(conectorVertical).toBeInTheDocument()
    expect(linhaDosagem).toBeInTheDocument()
    expect(conectorVertical).toHaveAttribute('marker-end', 'url(#seta)')
    expect(linhaDosagem).toHaveAttribute('marker-end', 'url(#seta)')

    const centroInjecao =
      Number(injecao?.getAttribute('x')) +
      Number(injecao?.getAttribute('width')) / 2
    const inicioTanque = Number(t101?.getAttribute('x'))

    expect(centroInjecao).toBe(460)
    expect(centroInjecao).toBeLessThan(inicioTanque)
    expect(Number(injecao?.getAttribute('width'))).toBeGreaterThanOrEqual(110)
  })

  it('mantém espaçamento equilibrado na linha de dosagem química', () => {
    render(<SinoticoPlanta estado={estadoPlantaBase} />)

    const tk201 = screen.getByTestId('equipamento-TK-201').querySelector('rect')
    const p201 = screen.getByTestId('equipamento-P-201').querySelector('rect')
    const fit201 = screen
      .getByTestId('equipamento-FIT-201')
      .querySelector('rect')
    const injecao = screen
      .getByTestId('equipamento-INJECAO')
      .querySelector('rect')
    expect(tk201).not.toBeNull()
    expect(p201).not.toBeNull()
    expect(fit201).not.toBeNull()
    expect(injecao).not.toBeNull()

    const fimTk201 =
      Number(tk201?.getAttribute('x')) + Number(tk201?.getAttribute('width'))
    const fimP201 =
      Number(p201?.getAttribute('x')) + Number(p201?.getAttribute('width'))
    const fimFit201 =
      Number(fit201?.getAttribute('x')) +
      Number(fit201?.getAttribute('width'))
    const espacamentos = [
      Number(p201?.getAttribute('x')) - fimTk201,
      Number(fit201?.getAttribute('x')) - fimP201,
      Number(injecao?.getAttribute('x')) - fimFit201,
    ]

    expect(espacamentos).toEqual([30, 30, 35])
  })

  it('limita o valor visual de LIT-101 a 100%', () => {
    render(
      <SinoticoPlanta
        estado={{ ...estadoPlantaBase, nivelTanquePercentual: 570 }}
      />,
    )

    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.queryByText('570%')).not.toBeInTheDocument()
  })
})

describe('integração dos componentes', () => {
  it('importa e renderiza todos os 6 componentes sem erros', () => {
    render(
      <>
        <SinoticoPlanta estado={estadoPlantaBase} />
        <CartaoVariavel
          estado="alerta"
          nome="Turbidez"
          tag="AIT-102"
          unidade="NTU"
          valor={4.8}
        />
        <PainelAlarmes alarmes={[]} processoLiberado={true} />
        <PainelAtuadores acoes={acoesControleBase} />
        <PainelAjusteVariaveis
          estadoAtual={estadoPlantaBase}
          onAlterarVariavel={vi.fn()}
        />
        <PainelCenarios onAcionarCenario={vi.fn()} />
        <ControleSimulacao
          onIniciar={vi.fn()}
          onPausar={vi.fn()}
          onReiniciar={vi.fn()}
          simulacaoAtiva={false}
        />
      </>,
    )

    expect(screen.getByText('Sinóptico da planta')).toBeInTheDocument()
    expect(screen.getAllByText('AIT-102').length).toBeGreaterThan(0)
    expect(screen.getByText('Atuadores')).toBeInTheDocument()
    expect(screen.getByText('Ajuste manual de variáveis')).toBeInTheDocument()
    expect(screen.getByText('Cenários')).toBeInTheDocument()
    expect(screen.getByText('Simulação')).toBeInTheDocument()
  })

  it('mantém componentes sem chamadas diretas à API', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const modulosComponentes = await Promise.all([
      import('./CartaoVariavel'),
      import('./ControleSimulacao'),
      import('./PainelAlarmes'),
      import('./PainelAtuadores'),
      import('./PainelAjusteVariaveis'),
      import('./PainelCenarios'),
      import('./SinoticoPlanta'),
    ])

    expect(modulosComponentes).toHaveLength(7)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})

const acoesControleBase: AcoesControle = {
  bombaPrincipalLigar: true,
  bombaSaidaLigar: true,
  bombaDosadoraLigar: true,
  aberturaValvulaEntradaComandadaPercentual: 65,
  valvulaDescarteAbrir: false,
  processoLiberado: true,
  alarmes: [],
}

const estadoPlantaBase: EstadoPlanta = {
  ...acoesControleBase,
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
}

function criarAlarme(tipo: TipoAlarme, mensagem: string): Alarme {
  return {
    tipo,
    mensagem,
    timestamp: '2026-05-30T20:00:00',
  }
}
