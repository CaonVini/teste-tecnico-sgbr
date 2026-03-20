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
  <div class="h-screen w-[18%] bg-[#003366] flex flex-col">
    <div class="w-full flex justify-center items-center pt-8 pb-6 px-4">
      <img
        src="/logo-sgbr.png"
        alt="Logo SGBR"
        class="h-16 w-auto object-contain"
      />
    </div>

    <div class="px-6 mb-6">
      <div class="h-px bg-white/20 w-full"></div>
    </div>

    <div class="flex flex-col gap-2 px-3 flex-1">
      <Button
        text="Dashboard"
        icon="/public/icons/dashboard-svgrepo-com.svg"
        :active="activePage === 'dashboard'"
        @click="emit('navigate', 'dashboard')"
      />
      <Button 
        text="Atendimentos" 
        icon="/public/icons/list-svgrepo-com.svg" 
        :active="activePage === 'atendimentos'"
        @click="emit('navigate', 'atendimentos')" 
      />
    </div>

    <div class="p-4 mt-auto">
      <div class="h-px bg-white/20 w-full mb-3"></div>
      <UserProfile name="Vinicius Caon" role="Analista de Suporte" />
    </div>
  </div>
</template>
