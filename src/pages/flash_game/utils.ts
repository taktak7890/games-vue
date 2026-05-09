import type { Question, Settings } from "@/pages/flash_game/types";

const FLASH_GAME_SETTINGS_KEY = 'flash-game-settings';
const FLASH_GAME_QUESTIONS_KEY = 'flash-game-questions';

export const storageUtils = {
  getSettings: (): Settings | null => {
    const data = sessionStorage.getItem(FLASH_GAME_SETTINGS_KEY);
    return data ? JSON.parse(data) : null;
  },
  setSettings: (settings: Settings) => {
    sessionStorage.setItem(FLASH_GAME_SETTINGS_KEY, JSON.stringify(settings));
  },
  removeSettings: () => {
    sessionStorage.removeItem(FLASH_GAME_SETTINGS_KEY);
  },

  getQuestions: (): Question[] => {
    const data = sessionStorage.getItem(FLASH_GAME_QUESTIONS_KEY);
    return data ? JSON.parse(data) : [];
  },
  setQuestions: (questions: Question[]) => {
    sessionStorage.setItem(FLASH_GAME_QUESTIONS_KEY, JSON.stringify(questions));
  },
  removeQuestions: () => {
    sessionStorage.removeItem(FLASH_GAME_QUESTIONS_KEY);
  },

  hasFlashGameData: (): boolean => {
    return !!sessionStorage.getItem(FLASH_GAME_SETTINGS_KEY) && !!sessionStorage.getItem(FLASH_GAME_QUESTIONS_KEY);
  },

  fetchFlashGameData: async (): Promise<void> => {
    const params = new URLSearchParams({});
    const response = await fetch(`${import.meta.env.VITE_FLASH_GAS_URL}?${params}`);
    const data = await response.json();

    const settings: Settings = {
      isArrowShowAnswer: data.settings.isArrowShowAnswer,
      speedList: JSON.parse(data.settings.speedList),
    };
    storageUtils.setSettings(settings);
    storageUtils.setQuestions(data.questions);
  }
};
