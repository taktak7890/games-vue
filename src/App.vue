<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useHeaderTitleStore } from './stores/headerTitle';
import { ref } from 'vue'

const dialog = ref(false)
const route = useRoute();
const router = useRouter();
const headerTitleStore = useHeaderTitleStore();

const ver = import.meta.env.VERSION
const clickBack = () => {
  if (route.name === 'flash-game') {
    router.push({ name: 'flash-game-index' });
  } else if (route.name === 'flash-game-index') {
    router.push({ name: 'home' });
  } else {
    history.back();
  }
};

</script>

<template>
  <div class="flex flex-col h-screen">
    <v-toolbar color="secondary" density="compact" location="top end" rounded>
      <v-btn :disabled="route.name === 'home'" icon="mdi-arrow-left" @click="clickBack" />
      <div class="flex justify-center flex-1 text-3xl items-center">
        {{ headerTitleStore.getTitle }}
      </div>
      <v-btn @click="dialog = true" icon="mdi-information" />
    </v-toolbar>
    <main class="relative flex-1 overflow-hidden">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
    <v-dialog v-model="dialog" width="90vw">
      <v-card max-width="100vw">
        <template v-slot:text>
          <div class="text-2xl flex justify-center w-full">ver {{ ver }}</div>
        </template>
        <template v-slot:actions>
          <v-btn class="ms-auto" text="閉じる" @click="dialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
