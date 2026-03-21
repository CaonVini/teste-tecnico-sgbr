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
            <div class="flex items-center justify-center gap-2">
              <button 
                class="w-8 h-8 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none bg-[url('/icons/edit.svg')] bg-center bg-no-repeat bg-[length:16px_16px]"
                title="Editar"
              ></button>
              <button 
                class="w-8 h-8 rounded-lg hover:bg-red-50 transition-colors focus:outline-none bg-[url('/icons/delete.svg')] bg-center bg-no-repeat bg-[length:16px_16px]"
                title="Excluir"
              ></button>
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
