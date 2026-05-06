<script setup lang="ts">
import { onMounted, ref } from 'vue';

const speed = ref<number>(10);
const list = ref<{ lyrics: string, answer: string, genre: string }[]>([]);
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
      const parsedQuestions: { lyrics: string, answer: string, genre: string }[] = JSON.parse(cachedQuestions);
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
  <div class="w-full h-full flex flex-col">
    <nav class="flex flex-1 flex-col gap-1 overflow-y-auto">
      <span v-if="isLoading" class="text-center text-2xl">読み込み中...</span>
      <span v-else-if="isError" class="text-red-300 text-center text-2xl">エラーが発生しました</span>
      <span v-else v-for="(item, index) in list" :key="index"
        class="text-blue-300 text-center text-2xl underline underline-offset-8">
        <router-link :to="{
          name: `game1`, state: {
            speed: speed,
            title: '問題' + (index + 1),
            isArrowShowAnswer: isArrowShowAnswer,
            lyrics: item.lyrics,
            answer: item.answer,
            genre: item.genre,
          }
        }">
          問題{{ index + 1 }} ({{ item.genre }})
        </router-link>
      </span>
    </nav>
    <div class="h-20 w-full flex justify-center">
      <button @click="reload">再読み込み</button>
    </div>
  </div>
</template>
