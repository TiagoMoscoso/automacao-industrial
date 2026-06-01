import type { MetadadosEquipamento } from './equipamentos'

export type StatusOperacional =
  | 'normal'
  | 'baixo'
  | 'alto'
  | 'atencao'
  | 'critico'
  | 'desconhecido'

export function obterStatusOperacional(
  valor: number,
  metadados: MetadadosEquipamento,
): StatusOperacional {
  if (!metadados.faixaNormal) return 'desconhecido'

  const { faixaCritica, faixaAtencao, faixaNormal } = metadados

  if (faixaCritica) {
    if (faixaCritica.min !== undefined && valor < faixaCritica.min) return 'critico'
    if (faixaCritica.max !== undefined && valor > faixaCritica.max) return 'critico'
  }

  if (faixaAtencao) {
    if (faixaAtencao.min !== undefined && valor < faixaAtencao.min) return 'atencao'
    if (faixaAtencao.max !== undefined && valor > faixaAtencao.max) return 'atencao'
  }

  if (valor < faixaNormal.min) return 'baixo'
  if (valor > faixaNormal.max) return 'alto'
  return 'normal'
}

export function formatarValorEngenharia(valor: number, unidade: string): string {
  if (unidade === 'pH') {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
  }
  if (Number.isInteger(valor)) {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  }
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}

export function obterLabelStatus(status: StatusOperacional): string {
  const labels: Record<StatusOperacional, string> = {
    normal: 'Normal',
    baixo: 'Baixo',
    alto: 'Alto',
    atencao: 'Atenção',
    critico: 'Crítico',
    desconhecido: '—',
  }
  return labels[status]
}

export function obterDescricaoStatus(status: StatusOperacional): string {
  const descricoes: Record<StatusOperacional, string> = {
    normal: 'Dentro da faixa operacional',
    baixo: 'Abaixo da faixa normal',
    alto: 'Acima da faixa normal',
    atencao: 'Fora da faixa, requer atenção',
    critico: 'Fora do limite crítico — alarme',
    desconhecido: 'Sem faixa definida',
  }
  return descricoes[status]
}

export function obterClasseCssStatus(status: StatusOperacional): string {
  const classes: Record<StatusOperacional, string> = {
    normal: 'status--normal',
    baixo: 'status--baixo',
    alto: 'status--alto',
    atencao: 'status--atencao',
    critico: 'status--critico',
    desconhecido: 'status--desconhecido',
  }
  return classes[status]
}
