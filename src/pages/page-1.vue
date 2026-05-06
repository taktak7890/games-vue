<script setup lang="ts"></script>

<template>
  <div class="w-full h-full">
    <nav class="flex flex-col gap-1">
      <span class="text-blue-300 text-center text-2xl underline underline-offset-8">
        <router-link :to="{ name: `game-index` }">フラッシュ歌詞</router-link>
      </span>
    </nav>
  </div>
</template>
