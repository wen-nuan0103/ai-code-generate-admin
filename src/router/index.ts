import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
    },
    {
      path: '/',
      name: 'admin',
      component: () => import('@/layouts/BasicLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/pages/Dashboard.vue')
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/pages/user/UserManage.vue')
        }
      ]
    }
  ],
})

export default router
