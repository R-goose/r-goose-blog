<script setup>
import { onMounted, ref } from 'vue'
import { useShareStore } from '@/stores/share'

const shareStore = useShareStore()
const theme = ref(shareStore.getTheme())

const changeTheme = () => {
  if (theme.value === 'dark') {
    shareStore.setTheme('light')
    theme.value = shareStore.getTheme()
    document.documentElement.classList.add('light-theme')
    document.documentElement.classList.remove('dark-theme')
  } else {
    shareStore.setTheme('dark')
    theme.value = shareStore.getTheme()
    document.documentElement.classList.add('dark-theme')
    document.documentElement.classList.remove('light-theme')
  }
}

const isDragging = ref(false)
const x = ref(1830)
const y = ref(50)
const offsetX = ref(0)
const offsetY = ref(0)

const startDrag = (e) => {
  isDragging.value = true

  // 计算鼠标相对元素的偏移量
  offsetX.value = e.clientX - x.value
  offsetY.value = e.clientY - y.value
}

const handleDrag = (e) => {
  if (!isDragging.value) return

  // 更新位置
  x.value = e.clientX - offsetX.value
  y.value = e.clientY - offsetY.value
}

const stopDrag = () => {
  isDragging.value = false
}

onMounted(() => {
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark-theme')
    document.documentElement.classList.remove('light-theme')
  } else {
    document.documentElement.classList.add('light-theme')
    document.documentElement.classList.remove('dark-theme')
  }
})
</script>

<template>
  <div
    class="theme-button theme-bg-color r40 pos-a cursor-move"
    @mousedown="startDrag"
    @mouseup="stopDrag"
    @mousemove="handleDrag"
    :style="{ left: `${x}px`, top: `${y}px` }"
  >
    <div class="flex flex-row flex-center h3 gap1vw">
      <div
        class="br-circle theme-circle-color pos-a"
        @click="changeTheme"
        :class="{ 'circle-l': theme === 'dark', 'circle-r': theme === 'light' }"
      ></div>
      <div class="pos-a fw-bold" :class="{ ml1: theme === 'dark', mr1: theme === 'light' }">
        {{ theme === 'dark' ? '暗' : '亮' }}
      </div>
    </div>
  </div>
</template>

<style>
.theme-button {
  height: 3vh;
  width: 4vw;
}
.circle-l {
  left: 0;
}
.circle-r {
  right: 0;
}
</style>
