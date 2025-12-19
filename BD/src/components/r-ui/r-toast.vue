<script setup>
console.log('【子组件创建】', Date.now())
import { ref, onMounted, nextTick, onUnmounted } from 'vue'

const firstIn = ref(false)
const firstOut = ref(false)
const toastContentRef = ref(null) // 新增 ref

const props = defineProps({
  showToastFlag: {
    type: Boolean,
    default: false,
  },
  toastText: {
    type: String,
    default: '这是弹窗',
  },
})

const emit = defineEmits(['closeToast'])

const closeToast = () => {
  if (firstOut.value) return
  firstOut.value = true
  firstIn.value = false

  const onAnimationEnd = () => {
    toastContentRef.value?.removeEventListener('animationend', onAnimationEnd)
    emit('closeToast')
    firstOut.value = false
  }

  toastContentRef.value?.addEventListener('animationend', onAnimationEnd)
}

onMounted(async () => {
  firstIn.value = false
  firstOut.value = false
  await nextTick()
  firstIn.value = true
  document.documentElement.style.overflow = 'hidden'
})

onUnmounted(() => {
  firstIn.value = false
  firstOut.value = false
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <div class="r-toast" v-if="showToastFlag" @click.self="closeToast">
    <div
      ref="toastContentRef"
      class="toast-content"
      :class="{ 'first-in': firstIn, 'first-out': firstOut }"
    >
      <div class="toast-header">
        <h1>{{ toastText }}</h1>
      </div>
      <div class="toast-body">
        <slot></slot>
      </div>
      <div class="toast-footer">
        <button class="close-btn" @click="closeToast">确定</button>
        <button class="close-btn" @click="closeToast">关闭</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.r-toast {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 9998;
  display: flex;
  justify-content: center;
  align-items: center;

  .toast-content {
    position: relative;
    margin-bottom: 15vh;
    width: 45vw;
    height: 45.5vh;
    background: linear-gradient(to bottom, #bbffe4, #a0f0d0);
    // background-color: #a0f0d0;
    border-radius: 1.4vw 1.4vw 0.4vw 0.4vw;
    box-shadow:
      0 10px 30px rgba(0, 200, 150, 0.3),
      0 0 0 1px #a0f0d0;
    overflow: hidden;
    transform: translateY(100%);
    opacity: 0;
    transition: none;

    &.first-in {
      animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    &.first-out {
      animation: popOut 0.5s cubic-bezier(0.55, 0.055, 0.175, 0.19) forwards;
    }

    .toast-header {
      background-color: #bbffe4;
      width: 100%;
      height: 5.5vh;
      text-align: center;
      line-height: 5.5vh;

      h1 {
        font-size: 1.8rem;
        font-weight: 700;
        color: #04c484;
        letter-spacing: 0.2vw;
      }
    }

    .toast-body {
      position: relative;
      color: #444;
      font-size: 1rem;
      width: 43vw;
      height: 36vh;
      left: 1vw;
      background-color: #ffffff;
      border-radius: 0 0 0.6vw 0.6vw;
    }

    .toast-footer {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 4vh;
      gap: 2vw;

      .close-btn {
        // background: linear-gradient(to right, #4caf99, #6eff75);
        background-color: #4caf99;
        color: white;
        border: none;
        border-radius: 1vw;
        font-size: 1rem;
        width: 8vw;
        margin-top: 0.5vh;
        height: 3vh;
        cursor: pointer;
        box-shadow: 0 4px 10px #61dfc3;
        transition: all 0.2s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(76, 175, 80, 0.4);
        }

        &:active {
          transform: translateY(0);
        }
      }
    }
  }
}

@keyframes popIn {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes popOut {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>
