<script setup lang="ts">
interface ButtonProps {
  text: string;
  icon?: string;
  iconColor?: string;
  active?: boolean;
}

defineProps<ButtonProps>();
</script>

<template>
  <button
    :class="[
      'flex items-center justify-center md:justify-start gap-2 md:gap-4 px-3 md:px-4 py-2.5 md:py-3.5 rounded-xl transition-colors text-sm md:text-base font-medium focus:outline-none',
      active
        ? 'bg-white/10 text-white shadow-sm'
        : 'text-white/70 hover:text-white hover:bg-white/5',
    ]"
    v-bind="$attrs"
  >
    <div
      v-if="icon"
      class="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 transition-colors mask-icon"
      :class="iconColor ? iconColor : active ? 'bg-white' : 'bg-white/70'"
      :style="{
        maskImage: `url('${icon}')`,
        WebkitMaskImage: `url('${icon}')`
      }"
    ></div>

    <span class="hidden sm:block flex-1 text-left">{{ text }}</span>
    
    <span
      v-if="active"
      class="hidden md:block w-1 h-1 rounded flex-shrink-0 bg-blue-500 mr-0.5"
    ></span>
  </button>
</template>

<style scoped>
.mask-icon {
  mask-size: contain;
  -webkit-mask-size: contain;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-position: center;
}
</style>
