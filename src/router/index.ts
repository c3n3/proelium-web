import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:  () => import('../views/Rules.vue')
    },
    {
      path: '/card-gen',
      name: 'card-gen',
      component:  () => import('../views/Cardgen.vue')
    },
    {
      path: '/map-gen',
      name: 'map-gen',
      component:  () => import('../views/Mapgen.vue')
    },
  ]
})

export default router
