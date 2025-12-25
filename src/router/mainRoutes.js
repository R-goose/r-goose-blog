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
    children: [
      {
        // 子路由默认路径（空路径），自动匹配 firstView
        path: '',
        name: 'firstView',
        component: () => import('@/views/blogView/blog/firstView.vue'),
        meta: { isDefault: true },
      },
      {
        path: 'myBlog',
        name: 'myBlog',
        component: () => import('@/views/blogView/blog/myBlog.vue'),
      },
      {
        path: 'DataAdmin',
        name: 'DataAdmin',
        component: () => import('@/views/oaView/indexPage.vue'),
      },
      {
        path: 'DataScreen',
        name: 'DataScreen',
        component: () => import('@/views/screenView/indexPage.vue'),
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
