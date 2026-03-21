import { ref, watch } from 'vue';
import type { Atendimento } from '../types';
import { useToast } from './useToast';

const STORAGE_KEY = '@sgbr:atendimentos';

const atendimentos = ref<Atendimento[]>([]);
const isLoading = ref<boolean>(true);

const loadFromStorage = () => {
  isLoading.value = true;
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      atendimentos.value = JSON.parse(data);
    } catch (e) {
      console.error('Erro ao fazer parse do localStorage', e);
      atendimentos.value = [];
    }
  } else {
    atendimentos.value = [];
  }
  isLoading.value = false;
};

loadFromStorage();

watch(atendimentos, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
}, { deep: true });

export function useAtendimentos() {
  const { addToast } = useToast();

  const addAtendimento = (item: Omit<Atendimento, 'id'>) => {
    const id = Date.now().toString(); 
    atendimentos.value.unshift({ ...item, id });
    addToast('Atendimento salvo!', 'success');
  };

  const deleteAtendimento = (id: string | number) => {
    atendimentos.value = atendimentos.value.filter(a => a.id !== id);
    addToast('Atendimento excluído.', 'success');
  };

  const updateAtendimento = (item: Atendimento) => {
    const index = atendimentos.value.findIndex(a => a.id === item.id);
    if (index !== -1) {
      atendimentos.value[index] = { ...item };
      addToast('Atendimento atualizado.', 'success');
    }
  };

  return {
    atendimentos,
    isLoading,
    addAtendimento,
    deleteAtendimento,
    updateAtendimento
  };
}
