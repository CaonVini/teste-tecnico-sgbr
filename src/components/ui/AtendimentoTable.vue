<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Atendimento } from "../../types";
import ConfirmarCard from "./ConfirmarCard.vue";
import EditarModal from "./EditarModal.vue";
import { useAtendimentos } from "../../composables/useAtendimentos";

const { deleteAtendimento, updateAtendimento } = useAtendimentos();

const props = defineProps<{
  items: Atendimento[];
  hideActions?: boolean;
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

const idParaExcluir = ref<number | string | null>(null);
const atendimentoParaEditar = ref<Atendimento | null>(null);

const confirmarExclusao = () => {
  if (idParaExcluir.value) {
    deleteAtendimento(idParaExcluir.value);
    idParaExcluir.value = null;
  }
};

const salvarEdicao = (atendimentoAtualizado: Atendimento) => {
  updateAtendimento(atendimentoAtualizado);
  atendimentoParaEditar.value = null;
};

const itemsPerPage = 8;
const currentPage = ref(1);

watch(
  () => props.items,
  () => {
    currentPage.value = 1;
  },
);

const totalPages = computed(
  () => Math.ceil(props.items.length / itemsPerPage) || 1,
);

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
          <th
            v-if="!hideActions"
            class="py-3.5 px-6 font-semibold w-20 text-center"
          >
            Ações
          </th>
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
          <td class="py-4 px-6 text-slate-500 font-medium whitespace-nowrap">
            {{ formatarData(item.dataAtendimento) }}
          </td>
          <td class="py-4 px-6 text-slate-500 font-medium whitespace-nowrap">
            {{ formatarData(item.dataFinalizado) }}
          </td>

          <td v-if="!hideActions" class="py-4 px-6 text-center">
            <div class="flex items-center justify-center gap-2">
              <button
                @click="atendimentoParaEditar = item"
                class="w-8 h-8 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none bg-[url('/icons/edit.svg')] bg-center bg-no-repeat bg-[length:16px_16px]"
                title="Editar"
              ></button>
              <button
                @click="idParaExcluir = item.id"
                class="w-8 h-8 rounded-lg hover:bg-red-50 transition-colors focus:outline-none bg-[url('/icons/delete.svg')] bg-center bg-no-repeat bg-[length:16px_16px]"
                title="Excluir"
              ></button>
            </div>
          </td>
        </tr>

        <tr v-if="items.length === 0">
          <td
            :colspan="hideActions ? 5 : 6"
            class="py-12 text-center text-slate-500"
          >
            Nenhum atendimento encontrado.
          </td>
        </tr>
      </tbody>
    </table>
    </div>

    <div
      v-if="totalPages > 1"
      class="px-6 py-4 flex items-center justify-between border-t border-slate-200 bg-slate-50 rounded-b-xl"
    >
      <span class="text-sm text-slate-600">
        Página
        <span class="font-medium text-slate-900">{{ currentPage }}</span> de
        <span class="font-medium text-slate-900">{{ totalPages }}</span>
      </span>
      <div class="flex items-center gap-2">
        <button
          @click="paginaAnterior"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
          :class="
            currentPage === 1
              ? 'text-slate-400 bg-slate-100 cursor-not-allowed'
              : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-100'
          "
        >
          Anterior
        </button>
        <button
          @click="proximaPagina"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
          :class="
            currentPage === totalPages
              ? 'text-slate-400 bg-slate-100 cursor-not-allowed'
              : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-100'
          "
        >
          Próxima
        </button>
      </div>
    </div>
  </div>

  <ConfirmarCard
    v-if="idParaExcluir"
    message="Tem certeza que deseja excluir permanentemente este atendimento?"
    @confirm="confirmarExclusao"
    @cancel="idParaExcluir = null"
  />

  <EditarModal
    v-if="atendimentoParaEditar"
    :atendimento="atendimentoParaEditar"
    @save="salvarEdicao"
    @cancel="atendimentoParaEditar = null"
  />
</template>
