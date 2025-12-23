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
      return {
        one: '#FFECB3',
        two: '#FFD56Aa1',
        three: '#E6A800',
      }
    case 'alert-e':
      return {
        one: '#FFCCCC',
        two: '#FF9999',
        three: '#CC3333',
      }
    case 'alert-s':
      return {
        one: '#D1FFF4',
        two: '#A8FFD8',
        three: '#2A7F75',
      }
    default:
      return {
        one: '#8cffa5',
        two: '#67dac1',
        three: '#1a5d57',
      }
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

      firstIn.value = true
      if (props.tipsType !== 'confirm') {
        clearTimeout(autoCloseTimer.value)
        autoCloseTimer.value = setTimeout(() => {
          cancel()
        }, 1500)
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
        :class="{
          'first-in': firstIn,
          'first-out': firstOut,
          'alert-tips': tipsType !== 'confirm',
        }"
        :style="{
          '--theme-color-one': getThemeColor().one,
          '--theme-color-two': getThemeColor().two,
          '--theme-color-three': getThemeColor().three,
          width: tipsType === 'confirm' ? '20vw' : 'auto',
          borderRadius: tipsType === 'confirm' ? '0.8vw' : '0.4vw',
          top: tipsType === 'confirm' ? '-25vh' : '0',
          padding: tipsType === 'confirm' ? '0' : '0 2vw',
        }"
      >
        <div
          class="tips-header"
          :style="{
            height: tipsType === 'confirm' ? '5vh' : '4vh',
            lineHeight: tipsType === 'confirm' ? '5vh' : '4vh',
          }"
        >
          <h1
            :style="{
              fontSize: tipsType === 'confirm' ? '1.2rem' : '1rem',
              color: getThemeColor().three,
            }"
          >
            <svg
              t="1766460725297"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1714"
              id="mx_n_1766460725298"
              width="22"
              height="22"
              v-if="tipsType !== 'confirm'"
            >
              <path
                d="M511.998465 65.290005c-246.722194 0-446.708971 200.001103-446.708971 446.708971 0 246.708891 199.986777 446.709995 446.708971 446.709995 246.708891 0 446.711018-200.001103 446.711018-446.709995C958.709483 265.291109 758.707356 65.290005 511.998465 65.290005L511.998465 65.290005zM756.308727 405.884171 465.103412 697.081299c-6.804986 6.819313-17.856693 6.819313-24.662703 0L267.69025 524.33084c-6.804986-6.804986-6.804986-17.856693 0-24.668843l54.29765-54.290487c6.804986-6.812149 17.856693-6.812149 24.662703 0l106.122993 106.107643 224.574778-224.561475c6.804986-6.812149 17.857716-6.812149 24.663726 0l54.29765 54.290487C763.128039 388.020314 763.128039 399.072021 756.308727 405.884171L756.308727 405.884171 756.308727 405.884171zM756.308727 405.884171"
                fill="#2A7F75"
                p-id="1715"
                v-if="tipsType === 'alert-s'"
              ></path>
              <path
                d="M512 992C246.912 992 32 777.088 32 512 32 246.912 246.912 32 512 32c265.088 0 480 214.912 480 480 0 265.088-214.912 480-480 480zM480 256v352a32 32 0 0 0 64 0V256a32 32 0 0 0-64 0z m-16 528a48 48 0 1 0 96 0 48 48 0 0 0-96 0z"
                p-id="2974"
                data-spm-anchor-id="a313x.search_index.0.i11.58d83a81qQ4Rjj"
                fill="#E6A800"
                v-if="tipsType === 'alert-w'"
              ></path>
              <path
                d="M511.8 63.3c-246.7 0-448.5 201.8-448.5 448.5s201.8 448.5 448.5 448.5 448.5-201.8 448.5-448.5S758.5 63.3 511.8 63.3z m214.3 603c15 15 15 42.4 0 57.3-7.5 7.5-17.4 12.5-29.9 12.5-10 0-22.4-5-29.9-12.5L521.8 579.1 377.3 723.6c-15 15-42.4 15-57.3 0s-15-42.4 0-57.3l144.5-144.5L320 377.3c-7.5-7.5-12.5-17.4-12.5-29.9 0-10 5-22.4 12.5-29.9 15-15 42.4-15 57.3 0L521.8 462l144.5-144.5c7.5-7.5 17.4-12.5 29.9-12.5 10 0 22.4 5 29.9 12.5s12.5 17.4 12.5 29.9c0 10-5 22.4-12.5 29.9L581.6 521.8l144.5 144.5z"
                fill="#CC3333"
                p-id="4054"
                data-spm-anchor-id="a313x.search_index.0.i17.58d83a81qQ4Rjj"
                v-if="tipsType === 'alert-e'"
              ></path>
            </svg>
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

.alert-tips {
  border: var(--theme-color-three) 0.1vw solid !important;
  background: linear-gradient(
    -15deg,
    var(--theme-color-one) 0%,
    var(--theme-color-two) 100%
  ) !important;
  box-shadow: var(--theme-color-one) 0 0 0 0.1vw !important;
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
  // padding: 0 1vw;
  height: auto;
  background: linear-gradient(-15deg, var(--theme-color-one) 0%, #67dac1 100%);
  border-radius: 0.8vw;
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
    background: rgba(255, 255, 255, 0);

    h1 {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.4rem;
      font-weight: 700;
      color: #1a5d57;
      text-shadow: 0 0.1vw 0.2vw rgba(255, 255, 255, 0.734);
      gap: 0.5vw;
    }
  }

  .tips-body {
    padding: 1.5vh 2vw;
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
    background: rgba(255, 255, 255, 0.315);
    backdrop-filter: blur(4px);

    button {
      width: 5vw;
      position: relative;
      border: none;
      border-radius: 0.5vw;
      color: #1a5d57;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 2px 6px #67dac133;
      font-family: '钉钉进步体 Regular';

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

.shake {
  animation: shake 0.5s ease-in forwards;
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
