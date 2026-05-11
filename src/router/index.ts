import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'top-page',
      component: () => import('../pages/TopPage.vue'),
    },
    {
      path: '/flash-game-index',
      name: 'flash-game-index',
      component: () => import('../pages/flash_game/QuestionList.vue'),
    },
    {
      path: '/flash-game/:id',
      name: 'flash-game',
      component: () => import('../pages/flash_game/FlashGame.vue'),
    },
  ],
});

export default router;
