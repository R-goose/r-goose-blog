import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name:'index',
      component:()=>import('@/views/blogView/indexPage.vue'),
      children:[
        {
          name:'blog',
          path:'blog',
          component:()=>import('@/views/blogView/blogPage.vue')
        }
      ]
    }
    
  ],
})

export default router
