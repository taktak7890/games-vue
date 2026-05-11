<script setup lang="ts">
import { onActivated } from 'vue';
import { useHeaderTitleStore } from '@/stores/headerTitle';

const headerTitleStore = useHeaderTitleStore();

onActivated(async () => {
  headerTitleStore.setTitle('HOME');
})
</script>

<template>
  <nav class="flex flex-col gap-1 p-4">
    <router-link :to="{ name: `flash-game-index` }"
      class="text-blue-300 text-center text-2xl underline underline-offset-8 visited:text-purple-400">フラッシュ歌詞</router-link>
  </nav>
  <router-view />
</template>
