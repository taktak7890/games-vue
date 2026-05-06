export const TEXT_PATH_MAP = {
  '/': {
    title: 'Home',
    isShowHome: false,
  },
  '/setting': {
    title: '設定',
    isShowHome: true,
  },
  '/page1': {
    title: 'ゲームリスト',
    isShowHome: true,
  },
  '/page1/game-index': {
    title: '問題一覧',
    isShowHome: false,
  },
  '/page1/game1': {
    title: 'フラッシュ歌詞(試作)',
    isShowHome: false,
  },
} as const;

export const getPathText = (path: string) => {
  return TEXT_PATH_MAP[path as keyof typeof TEXT_PATH_MAP]?.title || '';
};
