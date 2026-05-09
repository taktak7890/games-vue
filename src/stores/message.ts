
import { defineStore } from 'pinia';


export const useGlobalMessageStore = defineStore('globalMessage', {
  state: () => ({
    message: ''
  }),
  getters: {
    getMessage(state) {
      return state.message;
    },
  },
  actions: {
    setMessage(message: string) {
      this.message = message;
    }
  }
});