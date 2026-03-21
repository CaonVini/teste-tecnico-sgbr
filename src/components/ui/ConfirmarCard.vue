<script setup lang="ts">
defineProps<{
  message: string;
}>();

const emit = defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-[2px]"
    @click.self="emit('cancel')"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-[420px] p-6 text-left">
      
      <h3 class="text-[1.1rem] font-semibold text-slate-800 mb-2">
        Confirmar exclusão
      </h3>
      
      <p class="text-sm text-slate-600 mb-6">
        {{ message }}
      </p>

      <div class="flex justify-end gap-3">
        <button
          @click="emit('cancel')"
          class="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors focus:outline-none"
        >
          Cancelar
        </button>
        <button
          @click="emit('confirm')"
          class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors focus:outline-none"
        >
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>
