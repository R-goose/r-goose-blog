import './assets/base.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLazyLoad from 'vue3-lazy'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueLazyLoad, {
  // loading: '/src/image/placeholder.png', // 加载中占位图（可选）
  // error: '/src/image/error.png' // 加载失败占位图（可选）
})
app.mount('#app')
