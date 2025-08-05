<script setup>
import { onMounted, ref, watch, onUnmounted } from 'vue'
import { useShareStore } from '@/stores/share'

const shareStore = useShareStore()
const theme = ref(shareStore.getTheme())
const isMoving = ref(false)
const changeCount = ref(0)
const firstChange = ref(true)
const changerRef = ref(null)

const changeTheme = () => {
  if (changeCount.value == 0) {
    firstChange.value = false
    changeCount.value = 1
    if (isMoving.value) {
      return
    }
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
  else if (isMoving.value === false) {
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

}

const isDragging = ref(false)
const x = ref(0)
const y = ref(100)
const offsetX = ref(0)
const offsetY = ref(0)
// 获取视口尺寸
const viewportWidth = ref(window.innerWidth)
const viewportHeight = ref(window.innerHeight)

const handleResize = () => {
  viewportWidth.value = window.innerWidth
  viewportHeight.value = window.innerHeight
}

const startDrag = (e) => {
  isDragging.value = true


  // 计算鼠标相对元素的偏移量
  offsetX.value = e.clientX - x.value
  offsetY.value = e.clientY - y.value

  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
}

const handleDrag = (e) => {
  if (!isDragging.value) return
  isMoving.value = true
  // 更新位置
  x.value = e.clientX - offsetX.value
  y.value = e.clientY - offsetY.value

  // 计算新位置（限制在视口内）
  const newX = Math.max(0, Math.min(e.clientX - offsetX.value, viewportWidth.value - 55))
  // const newY = Math.max(0, Math.min(e.clientY - offsetY.value, viewportHeight.value - 50))

  x.value = newX
  // y.value = newY
}

const stopDrag = () => {
  isDragging.value = false

  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
  setTimeout(() => {
    isMoving.value = false
  }, 100)
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  x.value = viewportWidth.value - 120
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark-theme')
    document.documentElement.classList.remove('light-theme')
  } else {
    document.documentElement.classList.add('light-theme')
    document.documentElement.classList.remove('dark-theme')
  }
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

watch(viewportWidth, (newVal, oldVal) => {
  viewportWidth.value = window.innerWidth
  x.value = viewportWidth.value - 120
  if (newVal !== oldVal) {
    viewportWidth.value = window.innerWidth
  }
})
</script>

<template>
  <div class="theme-bg-color pos-a" @mousedown="startDrag" @mouseup="stopDrag" @mousemove="handleDrag"
    :style="{ left: `${x}px`, top: `${y}px` }" ref="changerRef" @click="changeTheme">
    <div :class="{ dragging: isDragging }">
      <span v-if="theme === 'light'">
        🔆
      </span>
      <span v-else>
        🌙
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.circle-l {
  left: 0;
}

.circle-r {
  right: 0;
}

.dragging {
  cursor: grabbing !important;
  opacity: 0.6;
  transition: all 0.2s ease-in-out;
  font-weight: 100;
}

span {
  text-align: center;
  font-size: 2.5rem;
  background-clip: text;
  text-shadow: #f6ff78 1px 1px 10px;
  cursor: pointer;
}
</style>
