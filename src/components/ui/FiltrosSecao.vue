<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  search: string;
  status: string;
}>();

const emit = defineEmits(['update:search', 'update:status']);

const isDropdownOpen = ref(false);
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center gap-4 mb-6 flex-shrink-0">
    <div class="relative flex-1 w-full">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input
        :value="search"
        @input="emit('update:search', ($event.target as HTMLInputElement).value)"
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
          status === "Todos" ? "Todos os Status" : status
        }}</span>
        <svg class="w-4 h-4 text-slate-400 transition-transform duration-200" :class="{ 'rotate-180': isDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <div v-if="isDropdownOpen" @click="isDropdownOpen = false" class="fixed inset-0 z-0"></div>

      <div v-if="isDropdownOpen" class="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden py-1.5">
        <button
          v-for="opt in ['Todos', 'Aberto', 'Em andamento', 'Finalizado']"
          :key="opt"
          @click="
            emit('update:status', opt);
            isDropdownOpen = false;
          "
          class="w-full text-left px-4 py-2.5 text-sm transition-colors"
          :class="status === opt ? 'bg-blue-50 text-[#003366] font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
        >
          {{ opt === "Todos" ? "Todos os Status" : opt }}
        </button>
      </div>
    </div>
  </div>
</template>
