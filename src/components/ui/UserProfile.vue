<script setup lang="ts">
import { computed } from "vue";

interface UserProfileProps {
  name: string;
  role: string;
  avatarUrl?: string;
}

const props = defineProps<UserProfileProps>();

const initials = computed(() => {
  const names = props.name.split(" ");

  if (names.length === 1) {
    return names[0].substring(0, 2).toUpperCase();
  }

  const firstLetter = names[0][0];
  const lastLetter = names[names.length - 1][0];

  return (firstLetter + lastLetter).toUpperCase();
});
</script>

<template>
  <div
    class="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
  >
    <div
      class="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-white font-bold text-sm overflow-hidden flex-shrink-0"
    >
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        :alt="name"
        class="w-full h-full object-cover"
      />
      <span v-else>{{ initials }}</span>
    </div>

    <div class="flex-1 min-w-0">
      <h3 class="text-white font-semibold text-sm truncate">{{ name }}</h3>
      <p class="text-white/60 text-xs truncate">{{ role }}</p>
    </div>
  </div>
</template>
