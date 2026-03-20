<script setup lang="ts">
import DashboardCard from "../ui/DashboardCard.vue";
import Table from "../ui/Table.vue";
</script>

<template>
  <div class="h-full w-full p-8">
    <h1 class="text-3xl font-bold text-slate-800">Dashboard</h1>
    <div class="flex w-full justify-between gap-6 mt-8">
      <DashboardCard
        class="flex-1"
        title="Atendimentos Hoje"
        :quantity="20"
        icon="/icons/support-svgrepo-com.svg"
      />
      <DashboardCard
        class="flex-1"
        title="Em Aberto"
        :quantity="14"
        icon="/icons/in-progress-svgrepo-com.svg"
      />
      <DashboardCard
        class="flex-1"
        title="Finalizados"
        :quantity="143"
        icon="/icons/success-check-win-done-mark-good-svgrepo-com.svg"
      />
    </div>
  </div>
</template>
