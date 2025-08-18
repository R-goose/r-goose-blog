import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0', // 允许局域网访问
    port: 6060,
    // strictPort: true, // 端口被占用时抛错（默认：自动切换）
    https: false, // 是否启用 HTTPS（需配置证书）
    open: '/', // 启动后自动打开指定路径
    // proxy: { // 接口代理（解决跨域）
    //   '/api': {
    //     target: 'http://localhost:8080', // 后端接口地址
    //     changeOrigin: true, // 跨域时修改 Origin
    //     rewrite: (path) => path.replace(/^\/api/, '') // 去掉路径中的 /api 前缀
    //   }
    // },
    cors: true, // 允许跨域请求
    hmr: true, // 热模块替换（默认开启，开发时实时更新）
  },
})
