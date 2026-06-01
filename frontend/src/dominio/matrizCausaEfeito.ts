export interface Causa {
  id: string;
  label: string;
  alarmeBackend: string;
}

export interface Efeito {
  id: string;
  label: string;
  tagEquipamento: string;
}

export const CAUSAS: Causa[] = [
  { id: 'nivel_baixo',    label: 'Nível baixo no tanque de entrada', alarmeBackend: 'NIVEL_BAIXO_BAIXO' },
  { id: 'nivel_alto',     label: 'Nível alto no tanque de entrada',  alarmeBackend: 'NIVEL_ALTO_ALTO' },
  { id: 'vazao_baixa',    label: 'Vazão abaixo do mínimo',           alarmeBackend: 'regras_causa_efeito.py' },
  { id: 'pressao_alta',   label: 'Pressão alta na linha',            alarmeBackend: 'PRESSAO_ALTA' },
  { id: 'falha_bomba',    label: 'Falha da bomba principal',          alarmeBackend: 'emergencia_acionada' },
  { id: 'turbidez_alta',  label: 'Turbidez acima do limite',          alarmeBackend: 'TURBIDEZ_ALTA' },
  { id: 'ph_fora',        label: 'pH fora da faixa',                  alarmeBackend: 'PH_FORA_DA_FAIXA' },
  { id: 'emergencia',     label: 'Emergência geral',                  alarmeBackend: 'EMERGENCIA' },
];

export const EFEITOS: Efeito[] = [
  { id: 'ligar_p101',    label: 'Ligar bomba principal',           tagEquipamento: 'P-101' },
  { id: 'desligar_p101', label: 'Desligar bomba principal',        tagEquipamento: 'P-101' },
  { id: 'abrir_fv101',   label: 'Abrir válvula de entrada',        tagEquipamento: 'FV-101' },
  { id: 'fechar_fv101',  label: 'Fechar válvula de entrada',       tagEquipamento: 'FV-101' },
  { id: 'alarme',        label: 'Acionar alarme',                  tagEquipamento: '—' },
  { id: 'bloquear',      label: 'Bloquear processo',               tagEquipamento: 'emergencia_acionada' },
  { id: 'acionar_p102',  label: 'Acionar bomba reserva',           tagEquipamento: 'P-102' },
  { id: 'registrar',     label: 'Registrar evento no supervisório', tagEquipamento: '—' },
];

// RELACOES[causa_index][efeito_index]
// Ordem colunas: ligar_p101 | desligar_p101 | abrir_fv101 | fechar_fv101 | alarme | bloquear | acionar_p102 | registrar
export const RELACOES: boolean[][] = [
  // nivel_baixo
  [false, false, true,  false, true,  false, true,  true],
  // nivel_alto
  [false, true,  false, true,  true,  false, false, true],
  // vazao_baixa
  [true,  false, true,  false, true,  false, false, true],
  // pressao_alta
  [false, true,  false, true,  true,  false, false, true],
  // falha_bomba
  [false, true,  false, false, true,  false, true,  true],
  // turbidez_alta
  [false, false, false, false, true,  false, false, true],
  // ph_fora
  [false, false, false, false, true,  false, false, true],
  // emergencia
  [false, true,  false, true,  true,  true,  false, true],
];
