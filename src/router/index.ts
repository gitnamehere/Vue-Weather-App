import { createRouter, createWebHashHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import WeatherView from '@/views/WeatherView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView
    },
    {
      path: '/weather',
      name: 'weather',
      component: WeatherView
    },
  ]
})

export default router
