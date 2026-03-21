<script setup lang="ts">
import { ref, watch } from "vue";
import type { Atendimento } from "../../types";

const props = defineProps<{
  atendimento: Atendimento;
}>();

const emit = defineEmits(['save', 'cancel']);

const form = ref<Atendimento>({ ...props.atendimento });

watch(
  () => props.atendimento,
  (newVal) => {
    form.value = { ...newVal };
  },
  { deep: true },
);

const handleSave = () => {
  emit("save", form.value);
};
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-[2px]"
    @click.self="emit('cancel')"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-[420px] p-6 text-left flex flex-col gap-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-[1.1rem] font-semibold text-slate-800">
          Editar atendimento
        </h3>
        <button
          @click="emit('cancel')"
          class="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1">Nome do Cliente</label>
          <input
            v-model="form.cliente"
            type="text"
            class="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1">Assunto / Descrição</label>
          <input
            v-model="form.assunto"
            type="text"
            class="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Status</label>
            <select
              v-model="form.status"
              class="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="Aberto">Aberto</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Data Atendimento</label>
            <input
              v-model="form.dataAtendimento"
              type="datetime-local"
              class="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        <div v-if="form.status === 'Finalizado'">
          <label class="block text-sm font-semibold text-slate-700 mb-1">Data de Término</label>
          <input
            v-model="form.dataFinalizado"
            type="datetime-local"
            class="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
        <button
          @click="emit('cancel')"
          class="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors focus:outline-none"
        >
          Cancelar
        </button>
        <button
          @click="handleSave"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>
