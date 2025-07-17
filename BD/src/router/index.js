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
          component:()=>import('@/views/blogView/index/blogPage.vue')
        },
        {
          name:'social',
          path:'social',
          component:()=>import('@/views/blogView/index/socialPage.vue')
        },
        {
          name:'personal',
          path:'personal',
          component:()=>import('@/views/blogView/index/personalPage.vue')
        }
      ]
    },
    {
      name:'login',
      path:'/login',
      component:()=>import('@/views/blogView/login/loginPage.vue')

    }

  ],
})

export default router
