<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getPathText, TEXT_PATH_MAP } from './constants/text'

const route = useRoute()

const clickBack = () => {
  history.back()
}
</script>

<template>
  <header class="flex relative h-10">
    <div v-if="route.path !== '/'" class="absolute top-0 left-0 h-full w-10">
      <button class="flex justify-center h-full w-full items-center bg-blue-300 font-bold text-xl" @click="clickBack">
        ←
      </button>
    </div>
    <div class="flex justify-center flex-1 bg-yellow-300 text-3xl items-center">
      {{ getPathText(route.path) }}
    </div>
  </header>
  <main>
    <nav v-if="route.path === '/'" class="flex flex-col gap-1">
      <span v-for="({ title, isShowHome }, path) in TEXT_PATH_MAP" :key="path"
        class="text-blue-300 text-center text-2xl underline underline-offset-8">
        <router-link :to="path" v-if="isShowHome">{{ title }}</router-link>
      </span>
    </nav>
    <router-view />
  </main>
</template>
