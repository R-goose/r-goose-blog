<script setup>
import { onMounted, ref, watch, onUnmounted } from 'vue'
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

  // 更新位置
  x.value = e.clientX - offsetX.value
  y.value = e.clientY - offsetY.value

  // 计算新位置（限制在视口内）
  const newX = Math.max(0, Math.min(e.clientX - offsetX.value, viewportWidth.value - 100))
  const newY = Math.max(0, Math.min(e.clientY - offsetY.value, viewportHeight.value - 50))

  x.value = newX
  y.value = newY
}

const stopDrag = () => {
  isDragging.value = false

  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  x.value = viewportWidth.value - 200
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
  x.value = viewportWidth.value - 200
  if (newVal !== oldVal) {
    viewportWidth.value = window.innerWidth
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
    <div class="flex flex-row flex-center h28px gap1vw" :class="{ dragging: isDragging }">
      <div
        class="br-circle theme-circle-color pos-a"
        @click="changeTheme"
        :class="{ 'circle-l': theme === 'dark', 'circle-r': theme === 'light' }"
        draggable="false"
      ></div>
      <div class="pos-a fw-bold fs15" :class="{ ml1: theme === 'dark', mr1: theme === 'light' }">
        {{ theme === 'dark' ? '暗' : '亮' }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.theme-button {
  height: 28px;
  width: 80px;
  user-select: none;

  &:hover {
    cursor: move;
  }
}
.circle-l {
  left: 0;
}
.circle-r {
  right: 0;
}
.dragging {
  cursor: grabbing;
  opacity: 0.6;
  transition: all 0.2s ease-in-out;
  font-weight: 100;
}
</style>
