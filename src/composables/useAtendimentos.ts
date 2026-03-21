import { ref, watch } from 'vue';
import type { Atendimento } from '../types';

const STORAGE_KEY = '@sgbr:atendimentos';

const atendimentos = ref<Atendimento[]>([]);

const loadFromStorage = () => {
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
};

loadFromStorage();

watch(atendimentos, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
}, { deep: true });

export function useAtendimentos() {
  const addAtendimento = (item: Omit<Atendimento, 'id'>) => {
    const id = Date.now().toString(); 
    atendimentos.value.unshift({ ...item, id });
  };

  const deleteAtendimento = (id: string | number) => {
    atendimentos.value = atendimentos.value.filter(a => a.id !== id);
  };

  const updateAtendimento = (item: Atendimento) => {
    const index = atendimentos.value.findIndex(a => a.id === item.id);
    if (index !== -1) {
      atendimentos.value[index] = { ...item };
    }
  };

  return {
    atendimentos,
    addAtendimento,
    deleteAtendimento,
    updateAtendimento
  };
}
