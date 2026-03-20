export interface Atendimento {
  id: string | number;
  cliente: string;
  assunto: string;
  status: 'Aberto' | 'Em andamento' | 'Finalizado';
  dataAtendimento: string;
  dataFinalizado?: string;
}

export interface NovoAtendimento {
  cliente: string;
  assunto: string;
  status: 'Aberto' | 'Em andamento' | 'Finalizado';
  dataAtendimento: string;
  dataFinalizado?: string;
}