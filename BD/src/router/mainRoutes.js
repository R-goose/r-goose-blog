import RGoose from '@/views/blogView/blog/firstView.vue'
import HomePage from '@/views/blogView/blog/homePage.vue'
import index from '@/views/blogView/blog/pageContainer.vue'
import myBlog from '@/views/blogView/blog/myBlog.vue'
const mainRouter = [
  {
    path: '/',
    redirect: '/RGoose/index',
  },
  {
    path: '/RGoose/index',
    name: 'RGoose',
    component: RGoose,
  },
  {
    name: 'index',
    path: '/RGoose/index',
    component: index,
  },

  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/blogView/login/loginPage.vue'),
  },
]

export default mainRouter
