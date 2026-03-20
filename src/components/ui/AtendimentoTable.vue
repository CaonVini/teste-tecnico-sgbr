<script setup lang="ts">
import { ref } from "vue";
import type { Atendimento } from "../../types";

defineProps<{
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

const activeDropdown = ref<number | string | null>(null);

const toggleDropdown = (id: string | number) => {
  if (activeDropdown.value === id) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = id;
  }
};
</script>

<template>
  <div
    class="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200"
  >
    <table class="w-full text-left border-collapse min-w-[800px]">
      <thead>
        <tr class="bg-[#0b5ed7] text-white text-sm">
          <th class="py-3.5 px-6 font-semibold">Nome do cliente</th>
          <th class="py-3.5 px-6 font-semibold">Assunto</th>
          <th class="py-3.5 px-6 font-semibold">Status</th>
          <th class="py-3.5 px-6 font-semibold">Data/Hora Atend.</th>
          <th class="py-3.5 px-6 font-semibold">Data/Hora Fim</th>
          <th class="py-3.5 px-6 font-semibold w-20 text-center">Ações</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr
          v-for="(item, index) in items"
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

          <td class="py-4 px-6 text-center">
            <div class="relative inline-block text-left">
              <button
                @click="toggleDropdown(item.id)"
                class="p-2 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors focus:outline-none"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  ></path>
                </svg>
              </button>

              <div
                v-if="activeDropdown === item.id"
                @click="activeDropdown = null"
                class="fixed inset-0 z-10"
              ></div>

              <div
                v-if="activeDropdown === item.id"
                class="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-slate-200 z-20 overflow-hidden"
              >
                <div class="flex flex-col py-1">
                  <button
                    class="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                  >
                    Editar
                  </button>
                  <button
                    class="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>

        <tr v-if="items.length === 0">
          <td colspan="6" class="py-12 text-center text-slate-500">
            Nenhum atendimento encontrado.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
