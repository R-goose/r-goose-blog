import index from '@/views/index.vue'

const mainRouter = [
  {
    path: '/',
    redirect: '/RGoose/index',
  },
  {
    path: '/RGoose/index',
    name: 'RGoose',
    component: index,
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/blogView/login/loginPage.vue'),
  },
]

export default mainRouter
