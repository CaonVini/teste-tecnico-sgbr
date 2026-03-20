<script setup lang="ts">
import type { Atendimento } from '../../types';

defineProps<{
  items: Atendimento[];
}>();

const statusColors = {
  Aberto: "bg-red-100 text-red-700",
  "Em andamento": "bg-yellow-100 text-yellow-700",
  Finalizado: "bg-green-100 text-green-700",
};
</script>

<template>
  <div
    class="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200"
  >
    <table class="w-full text-left border-collapse min-w-[800px]">
      <thead>
        <tr
          class="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider"
        >
          <th class="py-4 px-6 font-medium">Nome do cliente</th>
          <th class="py-4 px-6 font-medium">Assunto</th>
          <th class="py-4 px-6 font-medium">Status</th>
          <th class="py-4 px-6 font-medium">Data/Hora Atend.</th>
          <th class="py-4 px-6 font-medium">Data/Hora Fim</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr
          v-for="item in items"
          :key="item.id"
          class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
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
          <td class="py-4 px-6 text-slate-500">{{ item.dataAtendimento }}</td>
          <td class="py-4 px-6 text-slate-500">
            {{ item.dataFinalizado || "-" }}
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
</template>
