import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useShareStore = defineStore('share', () => {
  const userInfo = reactive({
    name: 'Lenovo',
    age: 25,
    gender: 'Male',
    email: 'lenovo@163.com',
    phone: '13800138000',
    address: 'Beijing, China'
  })

  return { 
    userInfo
   }
})
