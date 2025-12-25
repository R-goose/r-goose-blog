<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'

const firstIn = ref(false)
const firstOut = ref(false)
const toastContentRef = ref(null)

const props = defineProps({
  showToastFlag: {
    type: Boolean,
    default: false,
  },
  toastTitle: {
    type: String,
    default: '提示',
  },
})

const emit = defineEmits(['cancel', 'confirm'])

const cancel = () => {
  if (firstOut.value) return
  firstOut.value = true
  firstIn.value = false

  const onAnimationEnd = () => {
    toastContentRef.value?.removeEventListener('animationend', onAnimationEnd)
    emit('cancel')
    firstOut.value = false
  }

  toastContentRef.value?.addEventListener('animationend', onAnimationEnd)
}

const confirm = () => {
  if (firstOut.value) return
  firstOut.value = true
  firstIn.value = false
  const onAnimationEnd = () => {
    toastContentRef.value?.removeEventListener('animationend', onAnimationEnd)
    firstOut.value = false
    emit('confirm')
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
  <Teleport to="body">
    <div class="r-toast" v-if="showToastFlag" @click.self="cancel">
      <div
        ref="toastContentRef"
        class="toast-content"
        :class="{ 'first-in': firstIn, 'first-out': firstOut }"
      >
        <div class="toast-header">
          <h1>{{ toastTitle }}</h1>
        </div>
        <div class="toast-body">
          <slot></slot>
        </div>
        <div class="toast-footer">
          <button class="btn-confirm" @click="confirm">确定</button>
          <button class="btn-cancel" @click="cancel">取消</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.r-toast {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 9900;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: '钉钉进步体 Regular';
  user-select: none;

  .toast-content {
    position: relative;
    margin-bottom: 10vh;
    width: 30vw;
    height: auto;
    background: linear-gradient(-15deg, #8cffa5 0%, #67dac1 100%);
    border-radius: 1.4vw;
    box-shadow:
      0 10px 30px rgba(103, 218, 193, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.3),
      inset 0 0 12px rgba(255, 255, 255, 0.2);
    overflow: hidden;
    transform: translateY(100%) scale(0.9);
    opacity: 0;
    transition: none;

    &.first-in {
      animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    &.first-out {
      animation: popOut 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;
    }

    .toast-header {
      height: 6vh;
      line-height: 6vh;
      text-align: center;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-bottom: 0.1vw solid rgba(255, 255, 255, 0.3);

      h1 {
        font-size: 1.8rem;
        font-weight: 700;
        color: #1a5d57;
        text-shadow: 0 0.1vw 0.2vw rgba(255, 255, 255, 0.734);
      }
    }

    .toast-body {
      position: relative;
      color: #1c4b45;
      font-size: 1rem;
      line-height: 1.6;
      height: auto;
      width: 30vw;
      overflow-y: auto;
      background: rgba(255, 255, 255, 0.678);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .toast-footer {
      display: flex;
      height: 7vh;
      justify-content: center;
      gap: 1vw;
      background: rgba(255, 255, 255, 0.315);
      backdrop-filter: blur(4px);

      button {
        width: 6vw;
        height: 4vh;
        line-height: 4vh;
        position: relative;
        top: 1.5vh;
        border: none;
        border-radius: 0.5vw;
        color: #1a5d57;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.25s ease;
        box-shadow: 0 2px 6px rgba(103, 218, 193, 0.2);
        font-family: '钉钉进步体 Regular';

        &:hover {
          // background: rgba(255, 255, 255, 0.5);
          scale: 1.05;
          transform: translateY(-3px);
          box-shadow:
            0 4px 12px rgba(103, 218, 193, 0.4),
            0 0 8px rgba(139, 255, 165, 0.3);
        }

        &:active {
          transform: translateY(0);
          background: #ffffff66;
          box-shadow: 0 2px 6px rgba(103, 218, 193, 0.2);
        }
      }

      .btn-cancel {
        color: #2a6b63;
        background-color: #caffd7;
      }

      .btn-confirm {
        // border-color: #7bcc8c;
        color: #eafffd;
        background-color: #50ec9c;
      }
    }
  }
}

@keyframes popIn {
  0% {
    transform: translateY(100%) scale(0.85);
    opacity: 0;
  }
  70% {
    transform: translateY(-8%) scale(1.02);
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes popOut {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(100%) scale(0.9);
    opacity: 0;
  }
}
</style>
