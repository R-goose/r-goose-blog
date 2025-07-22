import { createRouter, createWebHistory } from 'vue-router'
import mainRouter from './mainRoutes'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: mainRouter
})

export default router
