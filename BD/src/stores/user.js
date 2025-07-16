import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({
    name: 'Lenovo',
    age: 25,
    gender: 'Male',
    email: 'lenovo@163.com',
    phone: '13800138000',
    address: 'Beijing, China',
    avatar: 'https://cdn.jsdelivr.net/gh/LenovoUser/CDN@latest/avatar.jpg'
  })

  return { 
    userInfo
   }
})
