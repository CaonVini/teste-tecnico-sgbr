<script setup lang="ts">
import { computed } from "vue";
import DashboardCard from "../ui/DashboardCard.vue";
import AtendimentoTable from "../ui/AtendimentoTable.vue";
import FiltrosSecao from "../ui/FiltrosSecao.vue";
import Spinner from "../ui/Spinner.vue";
import { useAtendimentos } from "../../composables/useAtendimentos";
import { useFiltrosAtendimento } from "../../composables/useFiltrosAtendimento";

const { atendimentos, isLoading } = useAtendimentos();
const { searchQuery, statusFilter, atendimentosFiltrados } = useFiltrosAtendimento();

const estatisticas = computed(() => {
  const hojeIsoStr = new Date().toISOString().split("T")[0];

  return {
    hoje: atendimentos.value.filter((a) => a.dataAtendimento.startsWith(hojeIsoStr)).length,
    abertos: atendimentos.value.filter((a) => a.status === "Aberto").length,
    finalizados: atendimentos.value.filter((a) => a.status === "Finalizado").length,
  };
});
</script>

<template>
  <div class="w-full px-6 py-8 md:p-10 flex flex-col">
    <h1 class="text-3xl font-bold text-slate-800">Dashboard</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-6 md:mt-8 w-full">
      <DashboardCard
        title="Atendimentos Hoje"
        :quantity="estatisticas.hoje"
        icon="/icons/support-svgrepo-com.svg"
      />
      <DashboardCard
        title="Em Aberto"
        :quantity="estatisticas.abertos"
        icon="/icons/in-progress-svgrepo-com.svg"
      />
      <DashboardCard
        title="Finalizados"
        :quantity="estatisticas.finalizados"
        icon="/icons/success-check-win-done-mark-good-svgrepo-com.svg"
      />
    </div>
    <div class="w-full mt-6 md:mt-10 p-5 sm:p-6 md:p-8 bg-white rounded-xl shadow-sm border border-slate-200 min-w-0 overflow-hidden">
      
      <FiltrosSecao 
        v-model:search="searchQuery" 
        v-model:status="statusFilter" 
      />

      <div class="mt-4 min-h-[300px]">
        <Spinner v-if="isLoading" />
        <AtendimentoTable v-else :items="atendimentosFiltrados" hideActions />
      </div>
    </div>
  </div>
</template>
