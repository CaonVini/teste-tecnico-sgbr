<script setup lang="ts">
import { ref } from "vue";
import AtendimentoTable from "../ui/AtendimentoTable.vue";
import CriarAtendimentoModal from "../ui/CriarAtendimentoModal.vue";
import FiltrosSecao from "../ui/FiltrosSecao.vue";
import { useFiltrosAtendimento } from "../../composables/useFiltrosAtendimento";

const { searchQuery, statusFilter, atendimentosFiltrados } = useFiltrosAtendimento();

const isModalOpen = ref(false);
</script>

<template>
  <div class="w-full p-8 flex flex-col">
    <div class="mb-8 flex justify-between items-center sm:flex-row flex-col gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-800">Atendimentos Gerais</h1>
        <p class="text-slate-500 mt-1">
          Gerencie, edite ou exclua o histórico de suportes.
        </p>
      </div>

      <button
        @click="isModalOpen = true"
        class="px-5 py-2.5 bg-[#003366] text-white font-medium text-sm rounded-lg hover:bg-blue-900 transition-colors shadow-sm"
      >
        + Novo Atendimento
      </button>
    </div>

    <div class="w-full p-8 bg-white rounded-xl shadow-sm border border-slate-200">
      <FiltrosSecao 
        v-model:search="searchQuery" 
        v-model:status="statusFilter" 
      />

      <div class="mt-4">
        <AtendimentoTable :items="atendimentosFiltrados" />
      </div>
    </div>

    <CriarAtendimentoModal v-if="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>
