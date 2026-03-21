<script setup lang="ts">
import { useToast } from '../../composables/useToast';

const { toasts, removeToast } = useToast();
</script>

<template>
  <div class="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
    <TransitionGroup name="toast" tag="div" class="flex flex-col items-end gap-3">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="pointer-events-auto min-w-[320px] max-w-sm p-5 rounded-lg shadow-xl border-l-[6px] flex items-center justify-between gap-4"
        :class="{
          'border-l-green-500 bg-green-50 text-green-900': t.type === 'success',
          'border-l-red-500 bg-red-50 text-red-900': t.type === 'error',
          'border-l-blue-500 bg-blue-50 text-blue-900': t.type === 'info'
        }"
      >
        <span class="text-base font-semibold">
          {{ t.message }}
        </span>
        
        <button 
          @click="removeToast(t.id)" 
          class="opacity-60 hover:opacity-100 focus:outline-none text-2xl leading-none"
        >
          &times;
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
