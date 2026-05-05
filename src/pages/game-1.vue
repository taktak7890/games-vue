<script setup lang="ts">
import { onMounted, ref } from 'vue';

const str = ref<string>('');
const speed = ref<number>(30);
const count = ref<number>(-1);
const readyCount = ref<number>(0);
const isReadyTime = ref<boolean>(false);
const isRunning = ref<boolean>(false);

onMounted(async () => {
  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzVp2mPajx2IMr1XAiQpPcg2tSia6ndADBG3uyTPZQpDQT6SEr7XqC4sBHIZvxYfOnLRA/exec'
    );
    const data = await response.json();

    // スプレッドシートの値で上書き
    str.value = data.text;
    speed.value = Number(data.speed);
  } catch (e) {
    console.error(e);
  }
});

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
      if (count.value >= str.value.length) {
        clearInterval(timerId);
        resolve();
      }
    }, speed.value);
  });

  isReadyTime.value = false;
  isRunning.value = false;
  count.value = -1;
};

const reload = () => {
  window.location.reload();
};
</script>

<template>
  <div class="flex flex-col w-full h-full text-2xl gap-2 items-center">
    <div>speed: {{ speed }}</div>
    <div class="bg-amber-100 rounded-xl shadow-inner p-4">
      <div class="w-48 h-48 flex justify-center items-center text-9xl font-bold text-amber-800">
        <span v-if="isReadyTime" class="">{{ readyCount }}</span>
        <span v-else-if="count >= 0">{{ str.slice(count, count + 1) }}</span>
      </div>
    </div>

    <div class="flex gap-4 mt-8">
      <button :disabled="!!isRunning || str === ''"
        class="bg-blue-500 disabled:bg-gray-400 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-600 active:scale-95 disabled:active:scale-100 transition-all"
        @click="start">
        {{ str === "" ? "読み込み中" : "START" }}
      </button>
    </div>
    <div class="absolute bottom-20 w-full flex justify-center">
      <button @click="reload">RELOAD</button>
    </div>
  </div>
</template>
