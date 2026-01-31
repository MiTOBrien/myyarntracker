import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/stash',
      name: 'stash',
      component: () => import('../views/StashView.vue'),
    },
    {
      path: '/patterns',
      name: 'patterns',
      component: () => import('../views/PatternsView.vue'),
    },
    {
      path: '/tos',
      name: 'tos',
      component: () => import('../views/TermsOfServiceView.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/PrivacyPolicyView.vue'),
    },
  ],
})

export default router
