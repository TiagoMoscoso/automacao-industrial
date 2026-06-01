import type { EstadoPlanta, EstadoPlantaApi } from '../dominio/estadoPlanta'

const URL_BASE_PADRAO = ''

let urlBaseApiPlanta = URL_BASE_PADRAO

interface RespostaSaude {
  status: string
}

interface DetalheErroApi {
  detail?: string
}

export function configurarUrlBaseApiPlanta(urlBase: string): void {
  urlBaseApiPlanta = urlBase.replace(/\/+$/, '')
}

export function obterUrlBaseApiPlanta(): string {
  return urlBaseApiPlanta
}

export async function verificarSaude(): Promise<boolean> {
  const resposta = await requisitarApi<RespostaSaude>('/api/saude')
  return resposta.status === 'ok'
}

export async function obterEstado(): Promise<EstadoPlanta> {
  const estado = await requisitarApi<EstadoPlantaApi>('/api/planta/estado')
  return mapearEstadoPlanta(estado)
}

export async function iniciarSimulacao(): Promise<void> {
  await requisitarApi<void>('/api/planta/iniciar', { method: 'POST' })
}

export async function pausarSimulacao(): Promise<void> {
  await requisitarApi<void>('/api/planta/pausar', { method: 'POST' })
}

export async function reiniciarSimulacao(): Promise<void> {
  await requisitarApi<void>('/api/planta/reiniciar', { method: 'POST' })
}

export async function alterarVariaveis(
  variaveis: Record<string, number | boolean>,
): Promise<EstadoPlanta> {
  const estado = await requisitarApi<EstadoPlantaApi>('/api/planta/variaveis', {
    method: 'POST',
    body: JSON.stringify(variaveis),
  })
  return mapearEstadoPlanta(estado)
}

export async function aplicarCenario(nome: string): Promise<EstadoPlanta> {
  const estado = await requisitarApi<EstadoPlantaApi>(
    `/api/planta/cenarios/${encodeURIComponent(nome)}`,
    { method: 'POST' },
  )
  return mapearEstadoPlanta(estado)
}

export function mapearEstadoPlanta(estado: EstadoPlantaApi): EstadoPlanta {
  return {
    vazaoEntradaM3h: estado.vazao_entrada_m3h,
    vazaoSaidaM3h: estado.vazao_saida_m3h,
    nivelTanquePercentual: estado.nivel_tanque_percentual,
    pressaoLinhaBar: estado.pressao_linha_bar,
    pressaoDiferencialFiltroBar: estado.pressao_diferencial_filtro_bar,
    temperaturaAguaC: estado.temperatura_agua_c,
    ph: estado.ph,
    turbidezNtu: estado.turbidez_ntu,
    condutividadeUsCm: estado.condutividade_us_cm,
    vazaoDosagemLH: estado.vazao_dosagem_l_h,
    bombaPrincipalLigada: estado.bomba_principal_ligada,
    bombaSaidaLigada: estado.bomba_saida_ligada,
    bombaDosadoraLigada: estado.bomba_dosadora_ligada,
    aberturaValvulaEntradaPercentual:
      estado.abertura_valvula_entrada_percentual,
    valvulaDescarteAberta: estado.valvula_descarte_aberta,
    emergenciaAcionada: estado.emergencia_acionada,
    bombaDosadoraEmFalha: estado.bomba_dosadora_em_falha,
    bombaPrincipalLigar: estado.bomba_principal_ligar,
    bombaSaidaLigar: estado.bomba_saida_ligar,
    bombaDosadoraLigar: estado.bomba_dosadora_ligar,
    aberturaValvulaEntradaComandadaPercentual:
      estado.abertura_valvula_entrada_comandada_percentual,
    valvulaDescarteAbrir: estado.valvula_descarte_abrir,
    processoLiberado: estado.processo_liberado,
    alarmes: estado.alarmes_ativos,
  }
}

async function requisitarApi<T>(
  caminho: string,
  opcoes: RequestInit = {},
): Promise<T> {
  const resposta = await fetch(`${urlBaseApiPlanta}${caminho}`, {
    ...opcoes,
    headers: {
      Accept: 'application/json',
      ...(opcoes.body ? { 'Content-Type': 'application/json' } : {}),
      ...opcoes.headers,
    },
  })

  if (!resposta.ok) {
    const mensagem = await obterMensagemErro(resposta)
    throw new Error(mensagem)
  }

  if (resposta.status === 204) {
    return undefined as T
  }

  return (await resposta.json()) as T
}

async function obterMensagemErro(resposta: Response): Promise<string> {
  try {
    const corpo = (await resposta.clone().json()) as DetalheErroApi
    if (typeof corpo.detail === 'string') {
      return `Erro na API (${resposta.status}): ${corpo.detail}`
    }
  } catch {
    const texto = await resposta.text()
    if (texto) {
      return `Erro na API (${resposta.status}): ${texto}`
    }
  }

  return `Erro na API (${resposta.status}): requisição não concluída`
}
