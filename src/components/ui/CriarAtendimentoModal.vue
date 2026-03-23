<script setup lang="ts">
import { ref } from "vue";
import type { NovoAtendimento } from "../../types";
import { useAtendimentos } from "../../composables/useAtendimentos";

const emit = defineEmits(["close"]);
const { addAtendimento } = useAtendimentos();

const form = ref<NovoAtendimento>({
  cliente: "",
  assunto: "",
  status: "Aberto",
  dataAtendimento: "",
  dataFinalizado: "",
});

const save = () => {
  addAtendimento(form.value);
  close();
};

const close = () => {
  emit("close");
  form.value = {
    cliente: "",
    assunto: "",
    status: "Aberto",
    dataAtendimento: "",
    dataFinalizado: "",
  };
};
</script>

<template>
  <div
    class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity"
  >
    <div
      class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
    >
      <div
        class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50"
      >
        <h2 class="text-xl font-bold text-slate-800">Novo Atendimento</h2>
        <button
          @click="close"
          class="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100"
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div class="p-6 overflow-y-auto flex-1 space-y-5">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5"
            >Nome do Cliente</label
          >
          <input
            v-model="form.cliente"
            placeholder="Ex: Empresa Alpha Ltda"
            class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] transition-all text-sm text-slate-700 placeholder-slate-400"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5"
            >Assunto</label
          >
          <input
            v-model="form.assunto"
            placeholder="Do que se trata este atendimento?"
            class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] transition-all text-sm text-slate-700 placeholder-slate-400"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5"
            >Status Inicial</label
          >
          <select
            v-model="form.status"
            class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] transition-all text-sm text-slate-700 cursor-pointer"
          >
            <option value="Aberto">Aberto</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Finalizado">Finalizado</option>
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5"
              >Data de Início</label
            >
            <div class="w-full flex items-center overflow-hidden bg-slate-50 border border-slate-200 rounded-lg focus-within:bg-white focus-within:ring-2 focus-within:ring-[#003366]/20 focus-within:border-[#003366] transition-all">
              <input
                v-model="form.dataAtendimento"
                type="datetime-local"
                class="w-full flex-1 min-w-0 bg-transparent outline-none border-none px-2 py-2.5 text-xs sm:text-sm text-slate-700 tracking-tighter sm:tracking-normal m-0 ring-0 focus:ring-0"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5"
              >Data de Fim (Opcional)</label
            >
            <div class="w-full flex items-center overflow-hidden bg-slate-50 border border-slate-200 rounded-lg focus-within:bg-white focus-within:ring-2 focus-within:ring-[#003366]/20 focus-within:border-[#003366] transition-all">
              <input
                v-model="form.dataFinalizado"
                type="datetime-local"
                class="w-full flex-1 min-w-0 bg-transparent outline-none border-none px-2 py-2.5 text-xs sm:text-sm text-slate-700 tracking-tighter sm:tracking-normal m-0 ring-0 focus:ring-0"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 flex-shrink-0"
      >
        <button
          @click="close"
          class="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
        >
          Cancelar
        </button>
        <button
          @click="save"
          class="px-5 py-2.5 text-sm font-medium text-white bg-[#003366] rounded-lg hover:bg-blue-900 transition-colors shadow-sm flex items-center gap-2"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          Salvar Atendimento
        </button>
      </div>
    </div>
  </div>
</template>
