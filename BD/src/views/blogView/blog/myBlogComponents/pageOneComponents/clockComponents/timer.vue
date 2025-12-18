<script setup>
import { ref, onMounted, watch } from 'vue'

const displayTime = ref({
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
})

const startTime = ref(0)
const elapsedBeforePause = ref(0) // 暂停前已走过的时间（毫秒）
let timerId = null

const pad = (num) => String(num).padStart(2, '0')
const padMs = (ms) => String(ms).padStart(3, '0')

const updateDisplay = (totalMs) => {
  const hours = Math.floor(totalMs / (1000 * 60 * 60))
  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((totalMs % (1000 * 60)) / 1000)
  const milliseconds = totalMs % 1000

  displayTime.value = {
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    milliseconds: padMs(milliseconds),
  }
}

const isPaused = ref(false)

const startTimer = () => {
  if (timerId) return
  isPaused.value = true
  startTime.value = Date.now() - elapsedBeforePause.value

  timerId = setInterval(() => {
    const now = Date.now()
    const totalElapsed = now - startTime.value
    updateDisplay(totalElapsed)
  }, 10)
}

const pauseTimer = () => {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
    const now = Date.now()
    elapsedBeforePause.value = now - startTime.value
    isPaused.value = false
  }
}

const stopTimer = () => {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
  isPaused.value = false
  elapsedBeforePause.value = 0
  updateDisplay(0)
}

const timeType = ref([
  { name: '打点计时器', nowUse: true },
  { name: '倒计时器', nowUse: false },
])

const nowUseTypeIndex = ref(0)
const nextUseTypeIndex = ref(1)

const timeTypeChange = () => {
  let swapper = 0
  swapper = nowUseTypeIndex.value
  nowUseTypeIndex.value = nextUseTypeIndex.value
  nextUseTypeIndex.value = swapper
}

const useRecord = ref([
  { usedTime: '2022-01-01 12:00:00', name: '打点计时器', value: '00:00:00:000' },
  { usedTime: '2022-01-01 12:00:00', name: '倒计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '打点计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '倒计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '打点计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '倒计时器', value: 0 },
])

onMounted(() => {
  nowUseTypeIndex.value = 0
  updateDisplay(0)
})
</script>

<template>
  <div class="timer">
    <div v-show="nowUseTypeIndex == 0">
      <div class="timer-text">
        <span class="num"> {{ displayTime.hours }} : </span>
        <span class="num"> {{ displayTime.minutes }} : </span>
        <span class="num"> {{ displayTime.seconds }} : </span>
        <span class="num">
          {{ displayTime.milliseconds }}
        </span>
      </div>
      <div class="button-area">
        <span class="button start" @click="startTimer" v-if="!isPaused">开始</span>
        <span class="button pause" @click="pauseTimer" v-else>暂停</span>
        <span class="button stop" @click="stopTimer">停止</span>
      </div>
    </div>

    <div v-show="nowUseTypeIndex == 1">
      <div class="timer-text">
        <span class="num"> {{ displayTime.hours }} : </span>
        <span class="num"> {{ displayTime.minutes }} : </span>
        <span class="num"> {{ displayTime.seconds }} : </span>
      </div>
      <div class="button-area">
        <span class="button start" @click="startTimer" v-if="!isPaused">开始</span>
        <span class="button pause" @click="pauseTimer" v-else>暂停</span>
        <span class="button stop" @click="stopTimer">停止</span>
      </div>
    </div>

    <div class="list">
      <div class="title">
        <span>使用记录</span>
      </div>
      <div class="list-container">
        <div class="list-item" v-for="(item, index) in useRecord" :key="index">
          <span>{{ index + 1 }}.</span>
          <span class="item-name">{{ item.name }}</span>
          <span class="item-value">{{ item.value }}</span>
          <span class="item-used-time">{{ item.usedTime }}</span>
          <span class="delete-btn">x</span>
        </div>
      </div>
    </div>
    <div class="now-use">正在使用{{ timeType[nowUseTypeIndex].name }}</div>
    <div class="change" @click="timeTypeChange(nowUseTypeIndex)">
      切换为{{ timeType[nextUseTypeIndex].name }}
    </div>
  </div>
</template>
<style scoped lang="scss">
.timer {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 0 0.3vw 0.3vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;

  .timer-text {
    position: relative;
    width: 100%;
    height: 14vh;
    line-height: 14vh;
    font-size: 2vw;
    font-size: 4rem;
    display: flex;
    // background-color: #bdbdbd;
    justify-content: center;

    .num {
      position: relative;
      font-size: smaller;
      height: 100%;
      width: 6vw;
      // background-color: #fff;
    }
  }

  .button-area {
    position: relative;
    // margin-top: 1vh;
    display: flex;
    justify-content: space-around;
    width: 100%;

    .button {
      width: 5vw;
      height: 3.5vh;
      line-height: 3.5vh;
      background-color: #fff;
      border-radius: 0.7vw;
      cursor: pointer;
    }

    .start {
      background-color: #8bffbb;
    }

    .pause {
      background-color: #8ae4ff;
    }

    .stop {
      background-color: #ff8a8a;
    }
  }

  .now-use {
    position: absolute;
    text-align: start;
    font-size: 0.8rem;
    top: 1vh;
    left: 1%;
    width: 8vw;
    height: 3vh;
    line-height: 3vh;
  }

  .change {
    position: absolute;
    text-align: end;
    font-size: 0.8rem;
    top: 1vh;
    right: 1%;
    width: auto;
    height: 3vh;
    line-height: 3vh;
    cursor: pointer;
    color: #12c8ff;
  }

  .list {
    position: relative;
    width: 98%;
    height: 20vh;
    // border: #e3ffe0 groove 0.2vw;
    border-radius: 0.3vw;
    margin-top: 1vh;

    .title {
      position: relative;
      font-size: 1.4rem;
      height: 3vh;
      line-height: 3vh;
      text-align: start;
      background: linear-gradient(-15deg, #8cffa5 0%, #67dac1 100%);
      color: transparent;
      background-clip: text;
    }

    .list-container {
      position: relative;
      width: 100%;
      height: 17vh;
      display: flex;
      flex-direction: column;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0.5vw;
        background-color: transparent;

        &-thumb {
          background: linear-gradient(-15deg, #8cffa5 0%, #67dac1 100%);
          border-radius: 10px;

          &:active {
            box-shadow: inset 0 0 6px rgb(104, 104, 104);
          }
        }
      }

      .list-item {
        position: relative;
        width: 97%;
        height: 235px;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        margin-bottom: 1vh;
        background-color: #fff;
        border-radius: 0.4vw;
        padding-left: 0.5vw;
        box-shadow: #dfdfdf 0.2vw 0.2vw 0.2vw;
      }
      .item-name {
        font-size: 1rem;
        height: 3vh;
        line-height: 3vh;
        width: 5vw;
        text-align: start;
        margin-left: 0.5vw;
      }
      .item-value {
        font-size: 1rem;
        text-align: end;
        width: 8vw;
        height: 3vh;
        line-height: 3vh;
        // background-color: #ffacac;
      }
      .item-used-time {
        position: absolute;
        right: 3vw;
        font-size: 0.7rem;
        height: 3vh;
        line-height: 3vh;
        // background-color: #ffacac;
      }
      .delete-btn {
        position: absolute;
        right: 1vw;
        font-size: 1rem;
        height: 4vh;
        line-height: 4vh;
        color: #ff8a8a;
        cursor: pointer;
      }
    }
  }
}
</style>
