<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Atendimento } from "../../types";

const props = defineProps<{
  items: Atendimento[];
}>();

const statusColors = {
  Aberto: "bg-red-100 text-red-700",
  "Em andamento": "bg-yellow-100 text-yellow-700",
  Finalizado: "bg-green-100 text-green-700",
};

const formatarData = (dataISO?: string) => {
  if (!dataISO) return "-";
  if (!dataISO.includes("T")) return dataISO;
  const [data, hora] = dataISO.split("T");
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano} às ${hora}`;
};

const itemsPerPage = 8;
const currentPage = ref(1);

watch(() => props.items, () => {
  currentPage.value = 1;
});

const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage) || 1);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return props.items.slice(start, start + itemsPerPage);
});

const proximaPagina = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const paginaAnterior = () => {
  if (currentPage.value > 1) currentPage.value--;
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[800px]">
      <thead>
        <tr class="bg-[#0b5ed7] text-white text-sm">
          <th class="py-3.5 px-6 font-semibold">Nome do cliente</th>
          <th class="py-3.5 px-6 font-semibold">Assunto</th>
          <th class="py-3.5 px-6 font-semibold">Status</th>
          <th class="py-3.5 px-6 font-semibold">Data/Hora Atend.</th>
          <th class="py-3.5 px-6 font-semibold">Data/Hora Fim</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr
          v-for="(item, index) in paginatedItems"
          :key="item.id"
          class="border-b border-slate-100 last:border-0 hover:bg-slate-200/50 transition-colors"
          :class="index % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'"
        >
          <td class="py-4 px-6 font-medium text-slate-900">
            {{ item.cliente }}
          </td>
          <td class="py-4 px-6 text-slate-600">{{ item.assunto }}</td>
          <td class="py-4 px-6">
            <span
              class="px-2.5 py-1 rounded-full text-xs font-semibold"
              :class="statusColors[item.status]"
            >
              {{ item.status }}
            </span>
          </td>
          <td class="py-4 px-6 text-slate-500 font-medium">
            {{ formatarData(item.dataAtendimento) }}
          </td>
          <td class="py-4 px-6 text-slate-500 font-medium">
            {{ formatarData(item.dataFinalizado) }}
          </td>
        </tr>

        <tr v-if="items.length === 0">
          <td colspan="5" class="py-12 text-center text-slate-500">
            Nenhum atendimento encontrado.
          </td>
        </tr>
      </tbody>
    </table>
    </div>

    <div v-if="totalPages > 1" class="px-6 py-4 flex items-center justify-between border-t border-slate-200 bg-slate-50 rounded-b-xl">
      <span class="text-sm text-slate-600">
        Página <span class="font-medium text-slate-900">{{ currentPage }}</span> de <span class="font-medium text-slate-900">{{ totalPages }}</span>
      </span>
      <div class="flex items-center gap-2">
        <button 
          @click="paginaAnterior"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
          :class="currentPage === 1 ? 'text-slate-400 bg-slate-100 cursor-not-allowed' : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-100'"
        >
          Anterior
        </button>
        <button 
          @click="proximaPagina"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
          :class="currentPage === totalPages ? 'text-slate-400 bg-slate-100 cursor-not-allowed' : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-100'"
        >
          Próxima
        </button>
      </div>
    </div>
  </div>
</template>
