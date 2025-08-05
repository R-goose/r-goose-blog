import RGoose from '@/views/blogView/blog/firstView.vue'
import mainPage from '@/views/blogView/blog/mainPage.vue'
const mainRouter = [
  {
    path: '/',
    redirect: '/RGoose',
  },
  {
    path: '/RGoose',
    name: 'RGoose',
    component: RGoose,
  },
  {
    name: 'mainPage',
    path: '/mainPage',
    component: mainPage,
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/blogView/login/loginPage.vue'),
  },
]

export default mainRouter
