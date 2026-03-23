import { ref } from 'vue';
import { useFiltrosAtendimento } from './useFiltrosAtendimento';
import * as atendimentosModule from './useAtendimentos';
import type { Atendimento } from '../types';

const atendimentosMock: Atendimento[] = [
  {
    id: '1',
    cliente: 'Vinicius Teste',
    assunto: 'Falha no login',
    status: 'Aberto',
    dataAtendimento: '2024-03-01T10:00',
    dataFinalizado: '',
  },
  {
    id: '2',
    cliente: 'Suporte TI',
    assunto: 'Sistema lento',
    status: 'Em andamento',
    dataAtendimento: '2024-03-05T14:00',
    dataFinalizado: '',
  },
  {
    id: '3',
    cliente: 'NF Sys',
    assunto: 'Erro ao emitir nota',
    status: 'Finalizado',
    dataAtendimento: '2024-03-10T09:00',
    dataFinalizado: '2024-03-10T11:00',
  },
];

jest.mock('./useAtendimentos', () => ({
  useAtendimentos: jest.fn(),
}));

beforeEach(() => {
  (atendimentosModule.useAtendimentos as jest.Mock).mockReturnValue({
    atendimentos: ref([...atendimentosMock]),
  });
});

describe('useFiltrosAtendimento', () => {
  it('retorna todos os atendimentos quando os filtros estão vazios', () => {
    const { atendimentosFiltrados } = useFiltrosAtendimento();
    expect(atendimentosFiltrados.value).toHaveLength(3);
  });

  it('filtra por nome do cliente', () => {
    const { searchQuery, atendimentosFiltrados } = useFiltrosAtendimento();
    searchQuery.value = 'vinicius';
    expect(atendimentosFiltrados.value).toHaveLength(1);
    expect(atendimentosFiltrados.value[0].cliente).toBe('Vinicius Teste');
  });

  it('filtra por assunto', () => {
    const { searchQuery, atendimentosFiltrados } = useFiltrosAtendimento();
    searchQuery.value = 'emitir';
    expect(atendimentosFiltrados.value).toHaveLength(1);
    expect(atendimentosFiltrados.value[0].assunto).toBe('Erro ao emitir nota');
  });

  it('a busca é case insensitive', () => {
    const { searchQuery, atendimentosFiltrados } = useFiltrosAtendimento();
    searchQuery.value = 'SUPORTE';
    expect(atendimentosFiltrados.value).toHaveLength(1);
    expect(atendimentosFiltrados.value[0].cliente).toBe('Suporte TI');
  });

  it('filtra por status Aberto', () => {
    const { statusFilter, atendimentosFiltrados } = useFiltrosAtendimento();
    statusFilter.value = 'Aberto';
    expect(atendimentosFiltrados.value).toHaveLength(1);
    expect(atendimentosFiltrados.value[0].status).toBe('Aberto');
  });

  it('filtra por status Finalizado', () => {
    const { statusFilter, atendimentosFiltrados } = useFiltrosAtendimento();
    statusFilter.value = 'Finalizado';
    expect(atendimentosFiltrados.value).toHaveLength(1);
    expect(atendimentosFiltrados.value[0].cliente).toBe('NF Sys');
  });

  it('combina filtro de busca e status ao mesmo tempo', () => {
    const { searchQuery, statusFilter, atendimentosFiltrados } = useFiltrosAtendimento();
    searchQuery.value = 'suporte';
    statusFilter.value = 'Em andamento';
    expect(atendimentosFiltrados.value).toHaveLength(1);
    expect(atendimentosFiltrados.value[0].cliente).toBe('Suporte TI');
  });

  it('retorna lista vazia quando nenhum resultado bate com os filtros', () => {
    const { searchQuery, atendimentosFiltrados } = useFiltrosAtendimento();
    searchQuery.value = 'xyzabc123';
    expect(atendimentosFiltrados.value).toHaveLength(0);
  });

  it('retorna todos quando status é "Todos"', () => {
    const { statusFilter, atendimentosFiltrados } = useFiltrosAtendimento();
    statusFilter.value = 'Todos';
    expect(atendimentosFiltrados.value).toHaveLength(3);
  });
});
