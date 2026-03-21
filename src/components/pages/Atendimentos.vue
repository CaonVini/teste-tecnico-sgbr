<script setup lang="ts">
import { ref, computed } from "vue";
import AtendimentoTable from "../ui/AtendimentoTable.vue";
import CriarAtendimentoModal from "../ui/CriarAtendimentoModal.vue";
import { useAtendimentos } from "../../composables/useAtendimentos";

const { atendimentos } = useAtendimentos();

const searchQuery = ref("");
const statusFilter = ref("Todos");
const isDropdownOpen = ref(false);
const isModalOpen = ref(false);

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
</script>

<template>
  <div class="h-full w-full p-8 flex flex-col">
    <div class="mb-8 flex justify-between items-center flex-shrink-0">
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

    <div
      class="flex-1 min-h-0 flex flex-col w-full p-8 bg-white rounded-xl shadow-sm border border-slate-200"
    >
      <div
        class="flex flex-col sm:flex-row items-center gap-4 mb-6 flex-shrink-0"
      >
        <div class="relative flex-1 w-full">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Pesquisar por cliente ou assunto..."
            class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] transition-all text-sm text-slate-700 placeholder-slate-400"
          />
        </div>

        <div class="relative w-full sm:w-56">
          <button
            @click="isDropdownOpen = !isDropdownOpen"
            class="relative z-10 w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003366]/20 transition-all text-sm text-slate-700"
          >
            <span class="font-medium">{{
              statusFilter === "Todos" ? "Todos os Status" : statusFilter
            }}</span>
            <svg
              class="w-4 h-4 text-slate-400 transition-transform duration-200"
              :class="{ 'rotate-180': isDropdownOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <div
            v-if="isDropdownOpen"
            @click="isDropdownOpen = false"
            class="fixed inset-0 z-0"
          ></div>

          <div
            v-if="isDropdownOpen"
            class="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden py-1.5"
          >
            <button
              v-for="status in [
                'Todos',
                'Aberto',
                'Em andamento',
                'Finalizado',
              ]"
              :key="status"
              @click="
                statusFilter = status;
                isDropdownOpen = false;
              "
              class="w-full text-left px-4 py-2.5 text-sm transition-colors"
              :class="
                statusFilter === status
                  ? 'bg-blue-50 text-[#003366] font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              "
            >
              {{ status === "Todos" ? "Todos os Status" : status }}
            </button>
          </div>
        </div>
      </div>

      <div class="flex-1 min-h-0 overflow-y-auto">
        <AtendimentoTable :items="atendimentosFiltrados" />
      </div>
    </div>

    <CriarAtendimentoModal v-if="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>
