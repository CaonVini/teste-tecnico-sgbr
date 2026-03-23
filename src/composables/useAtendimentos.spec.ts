import { nextTick } from 'vue';

const STORAGE_KEY = '@sgbr:atendimentos';

const mockAtendimento = {
  cliente: 'Vinicius Teste',
  assunto: 'Erro no sistema',
  status: 'Aberto' as const,
  dataAtendimento: '2024-03-01T10:00',
  dataFinalizado: '',
};

beforeEach(() => {
  localStorage.clear();
  jest.resetModules();
});

async function getComposable() {
  const { useAtendimentos } = await import('./useAtendimentos');
  return useAtendimentos();
}

describe('useAtendimentos', () => {
  it('inicia com lista vazia quando não há dados no localStorage', async () => {
    const { atendimentos } = await getComposable();
    expect(atendimentos.value).toEqual([]);
  });

  it('carrega atendimentos existentes do localStorage', async () => {
    const dados = [{ id: '1', ...mockAtendimento }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));

    const { atendimentos } = await getComposable();
    expect(atendimentos.value).toHaveLength(1);
    expect(atendimentos.value[0].cliente).toBe('Vinicius Teste');
  });

  it('adiciona um novo atendimento ao topo da lista', async () => {
    const { atendimentos, addAtendimento } = await getComposable();
    addAtendimento(mockAtendimento);

    expect(atendimentos.value).toHaveLength(1);
    expect(atendimentos.value[0].cliente).toBe('Vinicius Teste');
    expect(atendimentos.value[0].id).toBeDefined();
  });

  it('remove um atendimento pelo id', async () => {
    const { atendimentos, addAtendimento, deleteAtendimento } = await getComposable();
    addAtendimento(mockAtendimento);

    const id = atendimentos.value[0].id;
    deleteAtendimento(id);

    expect(atendimentos.value).toHaveLength(0);
  });

  it('atualiza os dados de um atendimento existente', async () => {
    const { atendimentos, addAtendimento, updateAtendimento } = await getComposable();
    addAtendimento(mockAtendimento);

    const atendimentoSalvo = atendimentos.value[0];
    updateAtendimento({ ...atendimentoSalvo, assunto: 'Assunto atualizado' });

    expect(atendimentos.value[0].assunto).toBe('Assunto atualizado');
  });

  it('persiste os dados no localStorage ao adicionar', async () => {
    const { addAtendimento } = await getComposable();
    addAtendimento(mockAtendimento);

    await nextTick();

    const salvo = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    expect(salvo).toHaveLength(1);
    expect(salvo[0].cliente).toBe('Vinicius Teste');
  });

  it('não altera outros atendimentos ao atualizar um específico', async () => {
    const { atendimentos, addAtendimento, updateAtendimento } = await getComposable();
    addAtendimento(mockAtendimento);
    addAtendimento({ ...mockAtendimento, cliente: 'Suporte TI' });

    const alvo = atendimentos.value[0];
    updateAtendimento({ ...alvo, status: 'Finalizado' });

    expect(atendimentos.value[1].cliente).toBe('Vinicius Teste');
  });
});
