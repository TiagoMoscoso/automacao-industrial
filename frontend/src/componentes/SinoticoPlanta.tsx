import { TipoAlarme } from '../dominio/alarme'
import type { EstadoPlanta } from '../dominio/estadoPlanta'
import { obterMetadados } from '../dominio/equipamentos'
import './componentes.css'

interface PropriedadesSinoticoPlanta {
  estado: EstadoPlanta
}

type EstadoEquipamento = 'ativo' | 'inativo' | 'alerta' | 'falha' | 'bloqueado'

interface EquipamentoSinotico {
  tag: string
  nome: string
  x: number
  y: number
  largura: number
  altura: number
  estado: EstadoEquipamento
  valor?: string
}

export function SinoticoPlanta({
  estado,
}: PropriedadesSinoticoPlanta): JSX.Element {
  const emergencia =
    estado.emergenciaAcionada || temAlarme(estado, TipoAlarme.Emergencia)
  const processoAtivo = estado.processoLiberado && !emergencia

  // Layout: três linhas horizontais, espaçamento de 20 px entre bordas de equipamentos.
  // Linha principal y=100 | Descarte y=230 | Dosagem y=340
  const equipamentos: EquipamentoSinotico[] = [
    // --- Linha principal (y=78, h=44, centre y=100) ---
    {
      tag: 'AGUA',
      nome: 'Água Bruta',
      x: 15,
      y: 78,
      largura: 80,
      altura: 44,
      estado: processoAtivo ? 'ativo' : 'inativo',
    },
    {
      tag: 'FV-101',
      nome: 'FV-101',
      x: 115,
      y: 78,
      largura: 70,
      altura: 44,
      estado: estadoEquipamento(
        estado.aberturaValvulaEntradaPercentual > 0,
        emergencia || temAlarme(estado, TipoAlarme.NivelAltoAlto),
        emergencia ? 'falha' : 'alerta',
      ),
      valor: `${estado.aberturaValvulaEntradaPercentual}%`,
    },
    {
      tag: 'FIT-101',
      nome: 'FIT-101',
      x: 205,
      y: 78,
      largura: 70,
      altura: 44,
      estado: estadoEquipamento(
        estado.vazaoEntradaM3h > 0,
        emergencia,
        'falha',
      ),
      valor: `${estado.vazaoEntradaM3h} m3/h`,
    },
    {
      tag: 'P-101',
      nome: 'P-101',
      x: 295,
      y: 78,
      largura: 50,
      altura: 44,
      estado: estadoEquipamento(
        estado.bombaPrincipalLigada,
        emergencia || temAlarme(estado, TipoAlarme.PressaoAlta),
        'falha',
      ),
    },
    {
      tag: 'F-101',
      nome: 'Filtro F-101',
      x: 365,
      y: 78,
      largura: 80,
      altura: 44,
      estado: estadoEquipamento(
        estado.pressaoDiferencialFiltroBar <= 1.5,
        emergencia || temAlarme(estado, TipoAlarme.FiltroSaturado),
        emergencia ? 'falha' : 'alerta',
      ),
      valor: `${estado.pressaoDiferencialFiltroBar} bar`,
    },
    {
      // Tanque: altura limitada a 1,5x a linha principal, centro y=100
      tag: 'T-101',
      nome: 'Tanque T-101',
      x: 475,
      y: 67,
      largura: 90,
      altura: 66,
      estado: estadoEquipamento(
        estado.nivelTanquePercentual > 10 &&
          estado.nivelTanquePercentual < 95,
        emergencia ||
          temAlarme(estado, TipoAlarme.NivelAltoAlto) ||
          temAlarme(estado, TipoAlarme.NivelBaixoBaixo),
        emergencia ? 'falha' : 'alerta',
      ),
      valor: formatarPercentualSinotico(estado.nivelTanquePercentual),
    },
    {
      tag: 'P-102',
      nome: 'P-102',
      x: 585,
      y: 78,
      largura: 50,
      altura: 44,
      estado: estadoEquipamento(
        estado.bombaSaidaLigada,
        emergencia ||
          temAlarme(estado, TipoAlarme.PhForaDaFaixa) ||
          temAlarme(estado, TipoAlarme.TurbidezAlta),
        'falha',
      ),
    },
    {
      tag: 'PROCESSO',
      nome: 'Processo',
      x: 655,
      y: 78,
      largura: 80,
      altura: 44,
      estado: processoAtivo ? 'ativo' : 'bloqueado',
    },
    // --- Linha de descarte (y=208, h=44, centre y=230) ---
    {
      tag: 'XV-101',
      nome: 'XV-101',
      x: 475,
      y: 208,
      largura: 90,
      altura: 44,
      estado: estadoEquipamento(
        estado.valvulaDescarteAberta,
        emergencia,
        'falha',
      ),
    },
    {
      tag: 'DESCARTE',
      nome: 'Descarte',
      x: 585,
      y: 208,
      largura: 80,
      altura: 44,
      estado: estado.valvulaDescarteAberta ? 'alerta' : 'inativo',
    },
    // --- Linha de dosagem química (y=318, h=44, centre y=340) ---
    {
      tag: 'TK-201',
      nome: 'TK-201',
      x: 115,
      y: 318,
      largura: 70,
      altura: 44,
      estado: estadoEquipamento(
        estado.vazaoDosagemLH > 0,
        emergencia,
        'falha',
      ),
    },
    {
      tag: 'P-201',
      nome: 'P-201',
      x: 215,
      y: 318,
      largura: 50,
      altura: 44,
      estado: estadoEquipamento(
        estado.bombaDosadoraLigada,
        emergencia ||
          estado.bombaDosadoraEmFalha ||
          temAlarme(estado, TipoAlarme.FalhaDosadora),
        'falha',
      ),
    },
    {
      tag: 'FIT-201',
      nome: 'FIT-201',
      x: 295,
      y: 318,
      largura: 75,
      altura: 44,
      estado: estadoEquipamento(
        estado.vazaoDosagemLH > 0,
        emergencia,
        'falha',
      ),
      valor: `${estado.vazaoDosagemLH} L/h`,
    },
    {
      tag: 'INJECAO',
      nome: 'Injeção química',
      x: 405,
      y: 318,
      largura: 110,
      altura: 44,
      estado: estadoEquipamento(
        estado.vazaoDosagemLH > 0,
        emergencia,
        'falha',
      ),
    },
  ]

  return (
    <section className="sinotico-planta" aria-labelledby="titulo-sinotico">
      <h2 id="titulo-sinotico">Sinóptico da planta</h2>
      <svg
        className="sinotico-planta__svg"
        role="img"
        aria-label="Fluxo de processo da planta de tratamento de água"
        viewBox="0 0 900 420"
      >
        <defs>
          <marker
            id="seta"
            markerHeight="6"
            markerWidth="6"
            orient="auto"
            refX="5.5"
            refY="3"
          >
            {/* context-stroke herda a cor do traço da linha pai */}
            <path d="M 0 0 L 6 3 L 0 6 z" fill="context-stroke" />
          </marker>
        </defs>

        {/* Linha principal: Água Bruta → FV-101 → FIT-101 → P-101 → F-101 → T-101 → P-102 → Processo */}
        <Linha x1={95} y1={100} x2={655} y2={100} ativa={processoAtivo} />

        {/* Linha de descarte: T-101 (fundo, x=520) → XV-101 → Descarte */}
        <Linha
          x1={520}
          y1={133}
          x2={520}
          y2={208}
          alerta={estado.valvulaDescarteAberta}
        />
        <Linha
          x1={565}
          y1={230}
          x2={585}
          y2={230}
          alerta={estado.valvulaDescarteAberta}
        />

        {/* Linha de dosagem: TK-201 → P-201 → FIT-201 → Injeção (x=460) → linha principal */}
        <Linha
          x1={185}
          y1={340}
          x2={460}
          y2={340}
          ativa={estado.vazaoDosagemLH > 0}
        />
        <Linha
          x1={460}
          y1={340}
          x2={460}
          y2={100}
          ativa={estado.vazaoDosagemLH > 0}
        />

        {equipamentos.map((equipamento) => (
          <Equipamento equipamento={equipamento} key={equipamento.tag} />
        ))}
      </svg>
    </section>
  )
}

function Linha({
  x1,
  y1,
  x2,
  y2,
  ativa = false,
  alerta = false,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  ativa?: boolean
  alerta?: boolean
}): JSX.Element {
  const modificador = alerta
    ? 'linha-processo--alerta'
    : ativa
      ? 'linha-processo--ativa'
      : ''

  return (
    <line
      className={`linha-processo ${modificador}`}
      markerEnd="url(#seta)"
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
    />
  )
}

function Equipamento({
  equipamento,
}: {
  equipamento: EquipamentoSinotico
}): JSX.Element {
  const centroX = equipamento.x + equipamento.largura / 2
  const centroY = equipamento.y + equipamento.altura / 2
  const classe = `equipamento equipamento--${equipamento.estado}`
  const meta = obterMetadados(equipamento.tag)
  const temDescricao = meta?.nomeAbreviado !== undefined
  const temValor = equipamento.valor !== undefined

  const yNome = temDescricao ? (temValor ? centroY - 10 : centroY - 5) : centroY - 2
  const yDescricao = temValor ? centroY + 2 : centroY + 8
  const yValor = temDescricao ? centroY + 14 : centroY + 15

  return (
    <g data-testid={`equipamento-${equipamento.tag}`}>
      {meta && (
        <title>{`${meta.instrumento} — ${meta.funcao}`}</title>
      )}
      <rect
        className={classe}
        height={equipamento.altura}
        rx="4"
        width={equipamento.largura}
        x={equipamento.x}
        y={equipamento.y}
      />
      <text className="rotulo-sinotico" x={centroX} y={yNome}>
        {equipamento.nome}
      </text>
      {temDescricao && (
        <text
          className="equipamento__descricao"
          lengthAdjust="spacingAndGlyphs"
          textLength={equipamento.largura - 6}
          x={centroX}
          y={yDescricao}
        >
          {meta!.nomeAbreviado}
        </text>
      )}
      {temValor ? (
        <text className="valor-sinotico" x={centroX} y={yValor}>
          {equipamento.valor}
        </text>
      ) : null}
    </g>
  )
}

function estadoEquipamento(
  ativo: boolean,
  alerta: boolean,
  estadoAlerta: EstadoEquipamento = 'alerta',
): EstadoEquipamento {
  if (alerta) {
    return estadoAlerta
  }

  return ativo ? 'ativo' : 'inativo'
}

function temAlarme(estado: EstadoPlanta, tipo: TipoAlarme): boolean {
  return estado.alarmes.some((alarme) => alarme.tipo === tipo)
}

function formatarPercentualSinotico(valor: number): string {
  const valorLimitado = Math.min(100, Math.max(0, valor))
  const valorFormatado = Number.isInteger(valorLimitado)
    ? String(valorLimitado)
    : valorLimitado.toFixed(1)

  return `${valorFormatado}%`
}
