<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Question } from './types';
import QuestionList from './QuestionList.vue';

const tab = ref('one')

const speed = ref<number>(10);
const list = ref<Question[]>([]);
const isLoading = ref<boolean>(true);
const isError = ref<boolean>(false);
const isArrowShowAnswer = ref<boolean>(false);

const STORAGE_KEY_SETTINGS = 'flash_game_settings';
const STORAGE_KEY_QUESTIONS = 'flash_game_questions';

onMounted(async () => {
  // 1. sessionStorage からデータの復元を試みる
  const cachedSettings = sessionStorage.getItem(STORAGE_KEY_SETTINGS);
  const cachedQuestions = sessionStorage.getItem(STORAGE_KEY_QUESTIONS);
  if (cachedSettings && cachedQuestions) {
    try {
      const parsedQuestions: Question[] = JSON.parse(cachedQuestions);
      const parsedSettings: { speed: number, isArrowShowAnswer: boolean } = JSON.parse(cachedSettings);
      list.value = parsedQuestions;
      speed.value = parsedSettings.speed;
      isArrowShowAnswer.value = !!parsedSettings.isArrowShowAnswer;
      isLoading.value = false;
      return; // キャッシュがあればここで終了
    } catch (e) {
      console.error('キャッシュの解析に失敗しました', e);
    }
  }

  // 2. キャッシュがない場合のみ fetch を実行
  try {
    isLoading.value = true;
    const params = new URLSearchParams({});
    const response = await fetch(`${import.meta.env.VITE_FLASH_GAS_URL}?${params}`);
    const data = await response.json();

    console.log(data)
    speed.value = data.settings.speed;
    list.value = data.questions;
    isArrowShowAnswer.value = !!data.settings.isArrowShowAnswer;
    isLoading.value = false;

    // 3. 取得したデータを sessionStorage に保存
    sessionStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(data.settings));
    sessionStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(data.questions));

  } catch (e) {
    alert('読み込みに失敗しました');
    isError.value = true;
    console.error(e);
  } finally {
    isLoading.value = false;
  }
});

// リロード（キャッシュを消して再取得したい場合など）
const reload = () => {
  sessionStorage.removeItem(STORAGE_KEY_SETTINGS); // キャッシュを削除
  sessionStorage.removeItem(STORAGE_KEY_QUESTIONS); // キャッシュを削除
  window.location.reload();
};
</script>

<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div class="w-full h-full flex flex-col overflow-hidden">
      <div class="flex-none bg-white">
        <v-tabs v-model="tab" color="primary">
          <v-tab value="one">J-POP</v-tab>
          <v-tab value="two">アニソン</v-tab>
          <v-tab value="three">VOCALOID</v-tab>
        </v-tabs>
        <v-divider />
      </div>
      <div class="flex-1 min-h-0">
        <v-tabs-window v-model="tab" class="h-full overflow-y-auto">
          <v-tabs-window-item value="one">
            <question-list v-if="!isLoading && !isError" :list="list.filter(item => item.genre === 'J-POP')"
              :speed="speed" :is-arrow-show-answer="isArrowShowAnswer" />
            <span v-else-if="isError" class="text-red-300 text-center text-2xl">エラーが発生しました</span>
            <span v-else class="text-center text-2xl">読み込み中...</span>
          </v-tabs-window-item>
          <v-tabs-window-item value="two">
            <question-list v-if="!isLoading && !isError" :list="list.filter(item => item.genre === 'アニソン')"
              :speed="speed" :is-arrow-show-answer="isArrowShowAnswer" />
            <span v-else-if="isError" class="text-red-300 text-center text-2xl">エラーが発生しました</span>
            <span v-else class="text-center text-2xl">読み込み中...</span>
          </v-tabs-window-item>
          <v-tabs-window-item value="three">
            <question-list v-if="!isLoading && !isError" :list="list.filter(item => item.genre === 'VOCALOID')"
              :speed="speed" :is-arrow-show-answer="isArrowShowAnswer" />
            <span v-else-if="isError" class="text-red-300 text-center text-2xl">エラーが発生しました</span>
            <span v-else class="text-center text-2xl">読み込み中...</span>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </div>
    <div class="h-20 w-full flex items-center justify-center bg-blue-200 flex-none border-t">
      <button class="bg-white hover:bg-gray-100 px-8 py-2 rounded-full font-bold shadow-sm" @click="reload">
        再読み込み
      </button>
    </div>
  </div>
</template>
