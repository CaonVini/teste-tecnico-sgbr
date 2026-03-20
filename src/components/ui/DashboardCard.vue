<script setup lang="ts">
interface AtendimentoCardProps {
  title: string;
  quantity: number;
  icon: string;
}

const props = defineProps<AtendimentoCardProps>();
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-sm font-medium text-slate-500 tracking-wide uppercase">
          {{ title }}
        </h3>
        <p class="text-3xl font-bold text-[#003366] mt-2">{{ quantity }}</p>
      </div>
      <div class="w-12 h-12 rounded-full flex items-center justify-center">
        <div
          class="w-12 h-12 bg-blue-500 mask-icon"
          :style="{
            maskImage: `url('${icon}')`,
            WebkitMaskImage: `url('${icon}')`,
          }"
        ></div>
      </div>
    </div>
  </div>
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
