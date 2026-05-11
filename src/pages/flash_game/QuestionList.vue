<script setup lang="ts">
import { onActivated, onMounted, ref } from 'vue';
import { storageUtils } from '@/pages/flash_game/utils';
import { useHeaderTitleStore } from '@/stores/headerTitle';
import QuestionLinks from './QuestionLinks.vue';

const headerTitleStore = useHeaderTitleStore();

const tab = ref('one')

const isLoading = ref<boolean>(true);
const isError = ref<boolean>(false);

const fetchGameData = async () => {
  try {
    isLoading.value = true;
    await storageUtils.fetchFlashGameData();
    isLoading.value = false;
  } catch (e) {
    alert('読み込みに失敗しました');
    isError.value = true;
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}

onActivated(async () => {
  headerTitleStore.setTitle('歌詞一覧');
})

onMounted(async () => {
  if (storageUtils.hasFlashGameData()) {
    isLoading.value = false;
    return;
  }
  await fetchGameData();
});

// リロード（キャッシュを消して再取得したい場合など）
const reload = async () => {
  storageUtils.removeSettings();
  storageUtils.removeQuestions();
  await fetchGameData();
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
            <QuestionLinks filter-genre="J-POP" :is-loading="isLoading" :is-error="isError" />
          </v-tabs-window-item>
          <v-tabs-window-item value="two">
            <QuestionLinks filter-genre="アニソン" :is-loading="isLoading" :is-error="isError" />
          </v-tabs-window-item>
          <v-tabs-window-item value="three">
            <QuestionLinks filter-genre="VOCALOID" :is-loading="isLoading" :is-error="isError" />
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
