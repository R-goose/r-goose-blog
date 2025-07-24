const mainRouter = [
  {
    path: '/',
    redirect: '/RGoose',
  },
  {
    path: '/RGoose',
    name: 'RGoose',
    component: () => import('@/views/blogView/blog/firstView.vue'),
    children: [
      {
        name: '/',
        path: '/',
        component: () => import('@/views/blogView/blog/mainPage.vue'),
      },
      {
        name: 'social',
        path: 'social',
        component: () => import('@/views/blogView/blog/socialPage.vue'),
      },
      {
        name: 'personal',
        path: 'personal',
        component: () => import('@/views/blogView/blog/personalPage.vue'),
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/blogView/login/loginPage.vue'),
  },
]

export default mainRouter
