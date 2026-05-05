import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/page1',
      name: 'page1',
      component: () => import('../pages/page1.vue'),
    },
    {
      path: '/page1/game1',
      name: 'game1',
      component: () => import('../pages/game1.vue'),
    }
  ],
})

export default router
