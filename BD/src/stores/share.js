import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useShareStore = defineStore('share', () => {
  const theme = ref(localStorage.getItem('theme') || 'light')

  const getTheme = () => {
    return theme.value
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  return {
    theme,
    getTheme,
    setTheme
  }
})
