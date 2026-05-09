import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Home.vue'),
    },
    {
      path: '/flash-game-index',
      name: 'flash-game-index',
      component: () => import('../pages/flash_game/Index.vue'),
    },
    {
      path: '/flash-game/:id',
      name: 'flash-game',
      component: () => import('../pages/flash_game/FlashGame.vue'),
    },
  ],
});

export default router;
