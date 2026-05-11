<script setup lang="ts">
import { computed } from 'vue';
import { storageUtils } from '@/pages/flash_game/utils';

// プロパティの定義
const props = defineProps<{
  filterGenre: string;
  isLoading: boolean;
  isError: boolean;
}>();

const filteredData = computed(() => {
  // props.isLoadingを参照することで、データ取得完了時に再評価を走らせる
   
  props.isLoading;
  const questions = storageUtils.getQuestions();
  return questions.filter((item) => item.genre === props.filterGenre);
});
</script>

<template>
  <nav class="flex flex-col gap-1 p-4">
    <span v-for="(item, index) in filteredData" :key="index" class="text-center text-2xl">
      <router-link :to="{
        name: 'flash-game',
        params: { id: item.number },
        query: {
          indexNo: String(index + 1)
        }
      }" class="text-blue-300 underline underline-offset-8 visited:text-purple-400">
        問題{{ index + 1 }}
      </router-link>
    </span>
    <div v-if="isLoading" class="text-center text-gray-500 mt-4">
      読み込み中...
    </div>
    <div v-if="isError" class="text-center text-gray-500 mt-4">
      エラーが発生しました
    </div>
  </nav>
</template>
