<script setup lang="ts">
import type { Question } from './types';

// プロパティの定義
defineProps<{
  list: Question[];
  speed: number;
  isArrowShowAnswer: boolean;
}>();
</script>

<template>
  <nav class="flex flex-col gap-1 p-4">
    <span v-for="(item, index) in list" :key="index"
      class="text-blue-300 text-center text-2xl underline underline-offset-8">
      <router-link :to="{
        name: 'game1',
        state: {
          speed: speed,
          title: '問題' + (index + 1),
          isArrowShowAnswer: isArrowShowAnswer,
          lyrics: item.lyrics,
          answer: item.answer,
          genre: item.genre,
        }
      }">
        問題{{ index + 1 }}
      </router-link>
    </span>
    <!-- リストが空の場合の表示 -->
    <div v-if="list.length === 0" class="text-center text-gray-500 mt-4">
      問題がありません
    </div>
  </nav>
</template>
