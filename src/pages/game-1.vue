<script setup lang="ts">
import { ref } from 'vue';

const str = '月の欠片を集めて夢を飾り眠る時の砂散りばめてもあの頃へ還れない';
const count = ref<number>(-1);
const readyCount = ref<number>(0);
const isReadyTime = ref<boolean>(false);
const isRunning = ref<boolean>(false);

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
      if (count.value >= str.length) {
        clearInterval(timerId);
        resolve();
      }
    }, 30);
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
  <div class="flex flex-col w-full h-full text-2xl gap-2 justify-center items-center">
    <div class="bg-amber-100 rounded-xl shadow-inner p-4 mt-10">
      <div class="w-48 h-48 flex justify-center items-center text-9xl font-bold text-amber-800">
        <span v-if="isReadyTime" class="">{{ readyCount }}</span>
        <span v-else-if="count >= 0">{{ str.slice(count, count + 1) }}</span>
      </div>
    </div>

    <div class="flex gap-4 mt-8">
      <button :disabled="!!isRunning"
        class="bg-blue-500 disabled:bg-gray-400 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-600 active:scale-95 disabled:active:scale-100 transition-all"
        @click="start">
        START
      </button>
    </div>
    <div class="absolute bottom-20 w-full flex justify-center">
      <button @click="reload">RELOAD</button>
    </div>
  </div>
  <!-- <div>{{ debug }}</div> -->
</template>
