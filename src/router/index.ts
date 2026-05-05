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
      path: '/page1/game1',
      name: 'game1',
      component: () => import('../pages/game-1.vue'),
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../pages/setting-page.vue'),
    },
  ],
});

export default router;
