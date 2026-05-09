
import { defineStore } from 'pinia';


export const useHeaderTitleStore = defineStore('headerTitle', {
  state: () => ({
    title: ''
  }),
  getters: {
    getTitle(state) {
      return state.title;
    },
  },
  actions: {
    setTitle(title: string) {
      this.title = title;
    }
  }
});