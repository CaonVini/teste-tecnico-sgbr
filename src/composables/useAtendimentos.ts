import { ref, watch } from 'vue';
import type { Atendimento } from '../types';

const STORAGE_KEY = '@sgbr:atendimentos';


const atendimentos = ref<Atendimento[]>([]);

export function useAtendimentos() {

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

  watch(atendimentos, (newVal) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
  }, { deep: true });

  const addAtendimento = (item: Omit<Atendimento, 'id'>) => {
    const id = Date.now().toString(); 
    atendimentos.value.unshift({ ...item, id });
  };

  const deleteAtendimento = (id: string | number) => {
    atendimentos.value = atendimentos.value.filter(a => a.id !== id);
  };

  loadFromStorage();

  return {
    atendimentos,
    addAtendimento,
    deleteAtendimento
  };
}
