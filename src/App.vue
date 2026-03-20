<script setup lang="ts">
import { ref, computed } from "vue";
import Navbar from "./components/layout/Navbar.vue";
import Dashboard from "./components/pages/Dashboard.vue";
import Atendimentos from "./components/pages/Atendimentos.vue";

const currentPage = ref("dashboard");

const currentComponent = computed(() => {
  return currentPage.value === "dashboard" ? Dashboard : Atendimentos;
});
</script>

<template>
  <div class="flex h-screen w-full bg-slate-50 overflow-hidden">
    <Navbar 
      class="flex-shrink-0" 
      :activePage="currentPage" 
      @navigate="(page) => currentPage = page" 
    />
    
    <main class="flex-1 overflow-y-auto bg-slate-100">
      <component :is="currentComponent" />
    </main>
  </div>
</template>
