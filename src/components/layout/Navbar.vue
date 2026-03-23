<script setup lang="ts">
import Button from "../ui/Button.vue";
import UserProfile from "../ui/UserProfile.vue";

defineProps<{
  activePage: string;
}>();

const emit = defineEmits<{
  (e: "navigate", page: string): void;
}>();
</script>

<template>
  <div class="w-full md:h-screen md:w-[260px] bg-[#003366] flex flex-row md:flex-col items-center md:items-stretch justify-between md:justify-start shadow-md z-20 relative">
    <div class="w-auto md:w-full flex justify-center items-center py-4 px-6 md:py-10">
      <img
        src="/logo-sgbr.png"
        alt="Logo SGBR"
        class="h-8 sm:h-10 md:h-14 w-auto object-contain"
      />
    </div>

    <div class="hidden md:block px-6 mb-8">
      <div class="h-px bg-white/20 w-full"></div>
    </div>

    <div class="flex flex-row md:flex-col gap-4 md:gap-2 px-4 md:px-3 md:flex-1 items-center md:items-stretch overflow-x-auto overflow-y-hidden md:overflow-visible w-full min-w-0">
      <Button
        text="Dashboard"
        icon="/public/icons/dashboard-svgrepo-com.svg"
        :active="activePage === 'dashboard'"
        @click="emit('navigate', 'dashboard')"
        class="!w-auto md:!w-full whitespace-nowrap"
      />
      <Button 
        text="Atendimentos" 
        icon="/public/icons/list-svgrepo-com.svg" 
        :active="activePage === 'atendimentos'"
        @click="emit('navigate', 'atendimentos')" 
        class="!w-auto md:!w-full whitespace-nowrap"
      />
    </div>

    <div class="hidden md:block p-4 mt-auto">
      <div class="h-px bg-white/20 w-full mb-4"></div>
      <UserProfile name="Vinicius Caon" role="Analista de Suporte" />
    </div>
  </div>
</template>
