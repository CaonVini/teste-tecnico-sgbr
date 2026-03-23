<script setup lang="ts">
import { ref } from "vue";
import AtendimentoTable from "../ui/AtendimentoTable.vue";
import CriarAtendimentoModal from "../ui/CriarAtendimentoModal.vue";
import FiltrosSecao from "../ui/FiltrosSecao.vue";
import Spinner from "../ui/Spinner.vue";
import { useAtendimentos } from "../../composables/useAtendimentos";
import { useFiltrosAtendimento } from "../../composables/useFiltrosAtendimento";

const { isLoading } = useAtendimentos();
const { searchQuery, statusFilter, atendimentosFiltrados } = useFiltrosAtendimento();

const isModalOpen = ref(false);
</script>

<template>
  <div class="w-full px-6 py-8 md:p-10 flex flex-col overflow-x-hidden">
    <div class="mb-6 md:mb-8 flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-800">Atendimentos Gerais</h1>
        <p class="text-sm md:text-base text-slate-500 mt-2">
          Gerencie, edite ou exclua o histórico de suportes.
        </p>
      </div>

      <button
        @click="isModalOpen = true"
        class="w-full sm:w-auto px-6 py-3 bg-[#003366] text-white font-medium text-sm rounded-lg hover:bg-blue-900 transition-colors shadow-sm"
      >
        + Novo Atendimento
      </button>
    </div>

    <div class="w-full p-5 sm:p-6 md:p-8 bg-white rounded-xl shadow-sm border border-slate-200 min-w-0 overflow-hidden">
      <FiltrosSecao 
        v-model:search="searchQuery" 
        v-model:status="statusFilter" 
      />

      <div class="mt-4 min-h-[300px]">
        <Spinner v-if="isLoading" />
        <AtendimentoTable v-else :items="atendimentosFiltrados" />
      </div>
    </div>

    <CriarAtendimentoModal v-if="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>
