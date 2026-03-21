<script setup lang="ts">
import { computed } from "vue";
import DashboardCard from "../ui/DashboardCard.vue";
import AtendimentoTable from "../ui/AtendimentoTable.vue";
import FiltrosSecao from "../ui/FiltrosSecao.vue";
import { useAtendimentos } from "../../composables/useAtendimentos";
import { useFiltrosAtendimento } from "../../composables/useFiltrosAtendimento";

const { atendimentos } = useAtendimentos();
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
  <div class="h-full w-full p-8 flex flex-col">
    <h1 class="text-3xl font-bold text-slate-800">Dashboard</h1>
    <div class="flex w-full justify-between gap-6 mt-8">
      <DashboardCard
        class="flex-1"
        title="Atendimentos Hoje"
        :quantity="estatisticas.hoje"
        icon="/icons/support-svgrepo-com.svg"
      />
      <DashboardCard
        class="flex-1"
        title="Em Aberto"
        :quantity="estatisticas.abertos"
        icon="/icons/in-progress-svgrepo-com.svg"
      />
      <DashboardCard
        class="flex-1"
        title="Finalizados"
        :quantity="estatisticas.finalizados"
        icon="/icons/success-check-win-done-mark-good-svgrepo-com.svg"
      />
    </div>
    <div class="flex-1 min-h-0 flex flex-col w-full mt-8 p-8 bg-white rounded-xl shadow-sm border border-slate-200">
      
      <FiltrosSecao 
        v-model:search="searchQuery" 
        v-model:status="statusFilter" 
      />

      <div class="flex-1 min-h-0 overflow-y-auto">
        <AtendimentoTable :items="atendimentosFiltrados" hideActions />
      </div>
    </div>
  </div>
</template>
