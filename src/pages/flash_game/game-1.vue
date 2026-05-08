<script setup lang="ts">
import { ref } from 'vue';
import type { GameState } from './types';

const state = window.history.state as GameState;
const lyrics: string = state.lyrics;
const answer: string = state.answer;
const isArrowShowAnswer: boolean = state.isArrowShowAnswer;
const title: string = state.title;
const genre: string = state.genre;

const speedList = [{ label: 'はやい', speed: 10 }, { label: 'ふつう', speed: 25 }, { label: 'ゆっくり', speed: 40 }] as const;
const speed = ref<number>(speedList[0].speed);
const count = ref<number>(-1);
const readyCount = ref<number>(0);
const isReadyTime = ref<boolean>(false);
const isRunning = ref<boolean>(false);
const isShowAnswer = ref<boolean>(false);

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
      if (count.value >= lyrics.length) {
        clearInterval(timerId);
        resolve();
      }
    }, speed.value);
  });

  isReadyTime.value = false;
  isRunning.value = false;
  count.value = -1;
};
</script>

<template>
  <div class="flex flex-col w-full h-full text-2xl gap-2 items-center">
    <div class="text-2xl font-bold">{{ genre }} - {{ title }}</div>
    <div>
      スピード:
      <select v-model="speed" class="text-black">
        <option v-for="(item, index) in speedList" :value="item.speed" :key="index">
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
