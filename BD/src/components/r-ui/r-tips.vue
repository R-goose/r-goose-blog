<script setup>
import { ref, onMounted, nextTick, onUnmounted, watch } from 'vue'

const firstIn = ref(false)
const firstOut = ref(false)
const tipsContentRef = ref(null)
const autoCloseTimer = ref(null)
const tipsRef = ref(null)

const props = defineProps({
  alertVisible: {
    type: Boolean,
    default: false,
  },
  tipsType: {
    type: String,
    default: 'alert-s', // 'alert-s' | 'alert-w' | 'alert-e' | 'confirm'
  },
  tipsTitle: {
    type: String,
    default: '提示',
  },
  tipsContent: {
    type: String,
    default: '无',
  },
  confirmsBtnText: {
    type: Object,
    default: () => ({
      confirm: '确定',
      cancel: '取消',
    }),
  },
})

const emit = defineEmits(['cancel', 'confirm'])

const getThemeColor = () => {
  switch (props.tipsType) {
    case 'alert-w':
      return '#ffcc33' // 警告黄
    case 'alert-e':
      return '#ff6b6b' // 错误红
    default:
      return '#8cffa5' // 成功绿
  }
}

const handleClose = (type) => {
  if (firstOut.value || !props.alertVisible) return
  firstOut.value = true
  firstIn.value = false

  const onAnimationEnd = () => {
    tipsContentRef.value?.removeEventListener('animationend', onAnimationEnd)
    firstOut.value = false
    if (type === 'cancel') emit('cancel')
    else if (type === 'confirm') emit('confirm')
  }

  tipsContentRef.value?.addEventListener('animationend', onAnimationEnd)
}

const shake = () => {
  tipsRef.value?.classList.add('shake')
  setTimeout(() => {
    tipsRef.value?.classList.remove('shake')
  }, 1000)
}

const cancel = () => handleClose('cancel')
const confirm = () => handleClose('confirm')

watch(
  [() => props.alertVisible, () => props.tipsTitle, () => props.tipsType],
  async ([newAlertVisible, newTitle, newType], [oldAlertVisible, oldTitle, oldType]) => {
    if (newAlertVisible || newTitle || newType) {
      // 重置动画状态
      firstIn.value = false
      firstOut.value = false

      await nextTick()
      if (tipsContentRef.value) {
        void tipsContentRef.value.offsetHeight // 强制重排
      }
      console.log(2)

      firstIn.value = true
      if (!['confirm'].includes(newType)) {
        clearTimeout(autoCloseTimer.value)
        autoCloseTimer.value = setTimeout(() => {
          cancel()
        }, 2000)
      }
    }
  },
  { immediate: true },
)

onMounted(() => {})

onUnmounted(() => {
  document.documentElement.style.overflow = ''
  clearTimeout(autoCloseTimer.value)
})
</script>

<template>
  <Teleport to="body">
    <div
      class="r-tips"
      v-if="alertVisible"
      ref="tipsRef"
      :class="[tipsType, { 'confirm-tips': tipsType === 'confirm' }]"
      @click.self="shake"
    >
      <div
        ref="tipsContentRef"
        class="tips-content"
        :class="{ 'first-in': firstIn, 'first-out': firstOut }"
        :style="{
          '--theme-color': getThemeColor(),
          width: tipsType === 'confirm' ? '20vw' : '15vw',
          borderRadius: tipsType === 'confirm' ? '1.4vw' : '0.8vw',
          top: tipsType === 'confirm' ? '-25vh' : '0',
        }"
      >
        <div
          class="tips-header"
          :style="{
            height: tipsType === 'confirm' ? '6vh' : '4vh',
            lineHeight: tipsType === 'confirm' ? '6vh' : '4vh',
          }"
        >
          <h1 :style="{ fontSize: tipsType === 'confirm' ? '1.6rem' : '1.2rem' }">
            {{ tipsTitle }}
          </h1>
        </div>

        <div class="tips-body" v-if="tipsType == 'confirm'">
          {{ tipsContent }}
        </div>

        <div class="tips-footer" v-if="tipsType === 'confirm'">
          <button class="btn-confirm" @click="confirm">{{ confirmsBtnText.confirm }}</button>
          <button class="btn-cancel" @click="cancel">{{ confirmsBtnText.cancel }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.r-tips {
  position: fixed;
  top: 5vh;
  left: 50%;
  transform: translateX(-50%);
  width: 15vw;
  height: 10vh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: '钉钉进步体 Regular', sans-serif;
  user-select: none;
}

.confirm-tips {
  width: 120vw;
  height: 150vh;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  top: -20vh;
}

.tips-content {
  position: relative;
  width: 20vw;
  height: auto;
  background: linear-gradient(-15deg, var(--theme-color) 0%, #67dac1 100%);
  border-radius: 1.4vw;
  box-shadow:
    0 10px 30px rgba(103, 218, 193, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 0 12px rgba(255, 255, 255, 0.2);
  overflow: hidden;
  transform: translateY(-100%) scale(0.9);
  opacity: 0;
  transition: none;

  &.first-in {
    animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  &.first-out {
    animation: popOut 0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;
  }

  .tips-header {
    height: 6vh;
    line-height: 6vh;
    text-align: center;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-bottom: 0.1vw solid rgba(255, 255, 255, 0.3);

    h1 {
      margin: 0;
      font-size: 1.6rem;
      font-weight: 700;
      color: #1a5d57;
      text-shadow: 0 0.1vw 0.2vw rgba(255, 255, 255, 0.734);
    }
  }

  .tips-body {
    padding: 1.2vh 2vw;
    color: #1c4b45;
    font-size: 1rem;
    line-height: 1.6;
    text-align: center;
    background: rgba(255, 255, 255, 0.678);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }

  .tips-footer {
    display: flex;
    height: 4vh;
    justify-content: center;
    gap: 1vw;
    padding: 1vh 0;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);

    button {
      width: 6.5vw;
      height: 4vh;
      line-height: 1;
      border: 2px solid rgba(255, 255, 255, 0.7);
      border-radius: 14px;
      color: #1a5d57;
      font-size: 1.05rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 2px 6px rgba(103, 218, 193, 0.2);
      font-family: inherit;
      background: transparent;

      &:hover {
        transform: translateY(-3px);
        box-shadow:
          0 4px 12px rgba(103, 218, 193, 0.4),
          0 0 8px rgba(139, 255, 165, 0.3);
      }

      &:active {
        transform: translateY(0);
        background: #ffffff66;
      }
    }

    .btn-confirm {
      background-color: #caffd7;
    }

    .btn-cancel {
      background-color: #b5ffc8;
    }
  }
}

.shake {
  animation: shake 0.7s ease-in-out;
}

@keyframes shake {
  0% {
    transform: translateX(-50%) translateY(0);
  }
  20% {
    transform: translateX(-50%) translateY(-1vh);
  }
  40% {
    transform: translateX(-50%) translateY(1vh);
  }
  60% {
    transform: translateX(-50%) translateY(-1vh);
  }
  80% {
    transform: translateX(-50%) translateY(1vh);
  }
  100% {
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes popIn {
  0% {
    transform: translateY(-100%) scale(0.85);
    opacity: 0;
  }
  70% {
    transform: translateY(8%) scale(1.02);
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
    transform: translateY(-100%) scale(0.9);
    opacity: 0;
  }
}
</style>
