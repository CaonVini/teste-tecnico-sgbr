import { ref, computed } from "vue";
import { useAtendimentos } from "./useAtendimentos";

export function useFiltrosAtendimento() {
  const { atendimentos } = useAtendimentos();
  const searchQuery = ref("");
  const statusFilter = ref("Todos");

  const atendimentosFiltrados = computed(() => {
    return atendimentos.value.filter((at) => {
      const termo = searchQuery.value.toLowerCase();

      const matchBusca =
        at.cliente.toLowerCase().includes(termo) ||
        at.assunto.toLowerCase().includes(termo);

      const matchStatus =
        statusFilter.value === "Todos" || at.status === statusFilter.value;

      return matchBusca && matchStatus;
    });
  });

  return {
    searchQuery,
    statusFilter,
    atendimentosFiltrados,
  };
}
