import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/page1',
      name: 'page1',
      component: () => import('../pages/page-1.vue'),
    },
    {
      path: '/page1/game-index',
      name: 'game-index',
      component: () => import('../pages/flash_game/index.vue'),
    },
    {
      path: '/page1/game1',
      name: 'game1',
      component: () => import('../pages/flash_game/game-1.vue'),
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../pages/setting-page.vue'),
    },
  ],
});

export default router;
