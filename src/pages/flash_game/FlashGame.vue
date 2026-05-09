<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import type { Question, Settings, SpeedList } from './types';
import { useHeaderTitleStore } from '@/stores/headerTitle';
import { useRoute } from 'vue-router';

import { storageUtils } from '@/pages/flash_game/utils';

const route = useRoute();
const gameId: string = route.params.id as string;
const headerTitleStore = useHeaderTitleStore();

const isLoading = ref<boolean>(false);

// データの取得と計算をリアクティブにする
const settings = ref<Settings | null>(storageUtils.getSettings());
const questions = ref<Question[]>(storageUtils.getQuestions());

const speedList = computed((): SpeedList => {
  const defaultList: SpeedList = [{ label: 'ふつう', speed: 100 }];
  return settings.value?.speedList || defaultList;
});
const isArrowShowAnswer = computed((): boolean => settings.value?.isArrowShowAnswer || false);

const targetGame = computed(() => questions.value.find((item) => item.number == gameId));
const lyrics = computed(() => targetGame.value?.lyrics || '');
const answer = computed(() => targetGame.value?.answer || '');
const genre = computed(() => targetGame.value?.genre || '');

const selectedSpeed = ref<SpeedList[0]>(speedList.value[0]!);
const count = ref<number>(-1);
const readyCount = ref<number>(0);
const isReadyTime = ref<boolean>(false);
const isRunning = ref<boolean>(false);
const isShowAnswer = ref<boolean>(false);

onMounted(async () => {
  if (!storageUtils.hasFlashGameData()) {
    try {
      isLoading.value = true;
      await storageUtils.fetchFlashGameData();
      // 取得後に値を更新
      settings.value = storageUtils.getSettings();
      questions.value = storageUtils.getQuestions();
    } catch (e) {
      alert('データの取得に失敗しました');
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  // 取得したデータがある場合、改めて最初のスピードを選択
  if (settings.value?.speedList && settings.value.speedList.length > 0) {
    selectedSpeed.value = settings.value.speedList[0]!;
  }

  headerTitleStore.setTitle(`${genre.value}-問題：${gameId}`);
});

const clickShowAnswer = async () => {
  if (!window.confirm('本当に答えを表示しますか？')) {
    return;
  }
  isShowAnswer.value = true;
}

const start = async () => {
  if (isRunning.value) return;

  isRunning.value = true;
  readyCount.value = 3;
  isReadyTime.value = true;

  // 開始前カウントダウン
  await new Promise<void>((resolve) => {
    readyCount.value = 3;
    const readyTimer = setInterval(() => {
      readyCount.value--;
      if (readyCount.value <= 0) {
        clearInterval(readyTimer);
        resolve();
      }
    }, 1000);
  });
  isReadyTime.value = false;

  // 文字を1文字ずつ表示する
  await new Promise<void>((resolve) => {
    const timerId = setInterval(() => {
      count.value++;
      if (count.value >= lyrics.value.length) {
        clearInterval(timerId);
        resolve();
      }
    }, selectedSpeed.value.speed);
  });

  isReadyTime.value = false;
  isRunning.value = false;
  count.value = -1;
};
</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center h-full">
    <div class="text-2xl font-bold text-gray-500">データを読み込み中...</div>
  </div>
  <div v-else class="flex flex-col w-full h-full text-2xl gap-2 items-center">
    <div>
      スピード:
      <select v-model="selectedSpeed" class="text-black">
        <option v-for="(item, index) in speedList" :value="item" :key="index">
          {{ item.label }}
        </option>
      </select>
    </div>
    <div class="bg-amber-100 rounded-xl shadow-inner p-4">
      <div class="w-48 h-48 flex justify-center items-center text-9xl font-bold text-amber-800">
        <span v-if="isReadyTime" class="">{{ readyCount }}</span>
        <span v-else-if="count >= 0">{{ lyrics.slice(count, count + 1) }}</span>
      </div>
    </div>

    <div class="flex gap-4 mt-8">
      <button :disabled="isRunning"
        class="bg-blue-500 disabled:bg-gray-400 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-600 active:scale-95 disabled:active:scale-100 transition-all"
        @click="start">
        START
      </button>
    </div>
    <div class="p-2 flex flex-col">
      <span class="text-14px underline underline-offset-4">遊び方</span>
      <div class="text-16px">
        <span>STARTを押すと歌詞が一文字ずつ高速で出るぞ！何の歌か当てよう！</span>
      </div>
    </div>
    <div v-if="isArrowShowAnswer">
      <div class="flex justify-center">
        <button class="bg-green-500 text-[16px] p-1 text-white font-bold" @click="clickShowAnswer">
          答えを見る
        </button>
      </div>
      <div v-if="isShowAnswer">{{ answer }}</div>
    </div>
  </div>
</template>
