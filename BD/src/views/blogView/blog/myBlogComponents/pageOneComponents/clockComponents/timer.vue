<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { timeFormat } from '@/utils/functions'

const displayTime = ref({
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
})

const startTime = ref(0)
const elapsedBeforePause = ref(0) // 暂停前已走过的时间（毫秒）
let timerId = null
let countdownTimerId = null
const selectCountdownTime = ref(0)
const countdownTimeSpent = ref(0)
const selectCountdownPausedTime = ref(0)
const selectCountdownTimeShow = ref({
  hours: 0,
  minutes: 0,
  seconds: 0,
})

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

const formatCountdownTime = (ms) => {
  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((ms % (1000 * 60)) / 1000)

  selectCountdownTimeShow.value = {
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  }
}

//打点计时器
const isPaused = ref(false)
const isRunning = ref(false)
//倒计时器
const isCountdownPaused = ref(false)
const isCountdownRunning = ref(false)

const startTimer = (index) => {
  if (index == 0) {
    if (timerId) return
    isRunning.value = true
    isPaused.value = true
    startTime.value = Date.now() - elapsedBeforePause.value

    timerId = setInterval(() => {
      const now = Date.now()
      const totalElapsed = now - startTime.value
      updateDisplay(totalElapsed)
    }, 10)
  } else if (index == 1) {
    if (countdownTimerId) return
    isCountdownRunning.value = true
    isCountdownPaused.value = true
    selectCountdownPausedTime.value = selectCountdownTime.value

    countdownTimerId = setInterval(() => {
      selectCountdownTime.value -= 1000
      countdownTimeSpent.value += 1000
      if (selectCountdownTime.value < 0) {
        stopTimer(1)
      }
      formatCountdownTime(selectCountdownTime.value)
    }, 1000)
  }
}

const pauseTimer = (index) => {
  if (index == 0) {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
      const now = Date.now()
      elapsedBeforePause.value = now - startTime.value
      isPaused.value = false
    }
  } else if (index == 1) {
    if (countdownTimerId) {
      clearInterval(countdownTimerId)
      countdownTimerId = null
      isCountdownPaused.value = false
    }
  }
}

const stopTimer = (index) => {
  if (index == 0) {
    if (!isRunning.value) {
      return
    }
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    }
    isPaused.value = false
    isRunning.value = false
    elapsedBeforePause.value = 0
    useRecord.value.push({
      name: '打点计时器',
      value:
        '累计' +
        displayTime.value.hours +
        ':' +
        displayTime.value.minutes +
        ':' +
        displayTime.value.seconds +
        ':' +
        displayTime.value.milliseconds,
      usedTime: timeFormat(new Date()) + ' ' + new Date().toLocaleTimeString(),
    })
    updateDisplay(0)
  } else if (index == 1) {
    if (!isCountdownRunning.value) {
      return
    }
    if (countdownTimerId) {
      clearInterval(countdownTimerId)
      countdownTimerId = null
    }
    isCountdownPaused.value = false
    isCountdownRunning.value = false
    formatCountdownTime(countdownTimeSpent.value)
    useRecord.value.push({
      name: '倒计时器',
      value:
        '耗时' +
        selectCountdownTimeShow.value.hours +
        ':' +
        selectCountdownTimeShow.value.minutes +
        ':' +
        selectCountdownTimeShow.value.seconds,
      usedTime: timeFormat(new Date()) + ' ' + new Date().toLocaleTimeString(),
    })
    selectCountdownTime.value = 0
    countdownTimeSpent.value = 0
    formatCountdownTime(0)
  }
}

const timeType = ref([
  { name: '打点计时器', nowUse: true },
  { name: '倒计时器', nowUse: false },
])

//倒计时器
const presetTime = ref([
  { name: '10分钟', value: 600000 },
  { name: '1小时', value: 3600000 },
  { name: '自定义', value: 1 },
])

const selectPresetTime = (value) => {
  selectCountdownTime.value = value
  selectCountdownTimeShow.value = value
  formatCountdownTime(selectCountdownTimeShow.value)
}

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
  { usedTime: '2022-01-01 12:00:00', name: '打点计时器', value: '00:00:00:000' },
  { usedTime: '2022-01-01 12:00:00', name: '倒计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '打点计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '倒计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '打点计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '倒计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '打点计时器', value: '00:00:00:000' },
  { usedTime: '2022-01-01 12:00:00', name: '倒计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '打点计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '倒计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '打点计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '倒计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '打点计时器', value: '00:00:00:000' },
  { usedTime: '2022-01-01 12:00:00', name: '倒计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '打点计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '倒计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '打点计时器', value: 0 },
  { usedTime: '2022-01-01 12:00:00', name: '倒计时器', value: 0 },
])

const deleteRecord = (index) => {
  if (index == -1) {
    useRecord.value = []
  }
  useRecord.value.splice(index, 1)
}

const reverseFlag = ref({
  functionSort: false,
  timeSort: false,
})
const sortRecord = (type) => {
  if (type == 0) {
    if (reverseFlag.value.functionSort) {
      useRecord.value.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        } else {
          return 1
        }
      })
      reverseFlag.value.functionSort = false
    } else {
      useRecord.value.sort((a, b) => {
        if (a.name > b.name) {
          return -1
        } else {
          return 1
        }
      })
      reverseFlag.value.functionSort = true
    }
  } else if (type == 1) {
    if (reverseFlag.value.timeSort) {
      useRecord.value.sort((a, b) => {
        if (a.usedTime < b.usedTime) {
          return -1
        } else {
          return 1
        }
      })
      reverseFlag.value.timeSort = false
    } else {
      useRecord.value.sort((a, b) => {
        if (a.usedTime > b.usedTime) {
          return -1
        } else {
          return 1
        }
      })
      reverseFlag.value.timeSort = true
    }
  }
}

onMounted(() => {
  nowUseTypeIndex.value = 0
  updateDisplay(0)
  formatCountdownTime(0)
  reverseFlag.value.functionSort = false
  reverseFlag.value.timeSort = false
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
        <span class="button start" @click="startTimer(0)" v-if="!isPaused">开始</span>
        <span class="button pause" @click="pauseTimer(0)" v-else>暂停</span>
        <span
          class="button stop"
          @click="stopTimer(0)"
          :style="{ cursor: !isRunning ? 'not-allowed' : 'pointer' }"
          >停止</span
        >
      </div>
    </div>

    <div v-show="nowUseTypeIndex == 1">
      <div class="timer-text">
        <span class="num">{{ selectCountdownTimeShow.hours }} :</span>
        <span class="num">{{ selectCountdownTimeShow.minutes }} :</span>
        <span class="num">{{ selectCountdownTimeShow.seconds }} </span>
      </div>
      <div class="button-area">
        <span v-if="!isPaused" class="countdown-time">
          <span
            class="button"
            @click="selectPresetTime(item.value)"
            :class="{ isActive: selectCountdownTime == item.value }"
            v-for="(item, index) in presetTime"
            :key="index"
          >
            {{ item.name }}
          </span>
        </span>
        <span class="button start" @click="startTimer(1)" v-if="!isPaused">开始</span>
        <span class="button pause" @click="pauseTimer(1)" v-else>暂停</span>
        <span
          class="button stop"
          @click="stopTimer(1)"
          :style="{ cursor: !isCountdownRunning ? 'not-allowed' : 'pointer' }"
          >停止</span
        >
      </div>
    </div>

    <div class="list">
      <div class="title">
        <span>使用记录</span>
        <span class="sort-btn" @click="sortRecord(0)">按功能排序</span>
        <span class="sort-btn" @click="sortRecord(1)">按使用时间排序</span>
      </div>
      <div class="operation-row">
        <span>序号</span>
        <span>功能</span>
        <span>值</span>
        <span>使用时间</span>
        <span @click="deleteRecord(-1)">删除</span>
      </div>
      <div class="list-container">
        <div class="list-item" v-for="(item, index) in useRecord" :key="index">
          <span>{{ index + 1 }}.</span>
          <span class="item-name">{{ item.name }}</span>
          <span class="item-value">{{ item.value }}</span>
          <span class="item-used-time">{{ item.usedTime }}</span>
          <span class="delete-btn" @click="deleteRecord(index)">x</span>
        </div>
        <div v-if="useRecord.length == 0" class="empty">暂无数据</div>
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
    height: 13vh;
    line-height: 13vh;
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
      margin-top: 1vh;
      // background-color: #fff;
    }
  }

  .button-area {
    position: relative;
    bottom: 1vh;
    display: flex;
    justify-content: space-around;
    width: 100%;
    font-weight: 100;

    .button {
      width: 3.5vw;
      height: 3vh;
      line-height: 3vh;
      border: #ffffff solid 0.1vh;
      border-radius: 0.5vw;
      cursor: pointer;
      color: #ffffff;
      transition: all 0.2s ease-in-out;

      &:hover {
        scale: 1.05;
        transition: all 0.2s ease-in-out;
      }

      &:active {
        scale: 0.95;
        transition: all 0.2s ease-in-out;
      }
    }

    .start {
      background-color: #73eecb;
    }

    .pause {
      background-color: #8ae4ff;
    }

    .stop {
      background-color: #ff8a8a;
    }

    .countdown-time {
      display: flex;
      justify-content: space-around;
      width: 58%;
      font-size: 0.8rem;

      .button {
        width: 3vw;
        height: 3vh;
        line-height: 3vh;
        border: #ffffff solid 0.1vh;
        border-radius: 0.5vw;
        cursor: pointer;
        color: #71e4b9;
        transition: all 0.2s ease-in-out;

        &:hover {
          scale: 1.1;
          transition: all 0.2s ease-in-out;
        }
      }

      .isActive {
        background-color: #ffe396;
        scale: 1.05;
        font-size: 0.9rem;
        color: #ffffff;
        cursor: default;

        &:hover {
          scale: 1.05;
        }
      }
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
    border-radius: 0.3vw;

    .title {
      position: relative;
      font-size: 1.2rem;
      height: 3vh;
      line-height: 3vh;
      text-align: start;
      background: linear-gradient(-15deg, #8cffa5 0%, #67dac1 100%);
      color: transparent;
      background-clip: text;

      .sort-btn {
        position: absolute;
        right: 3%;
        height: 2vh;
        top: 0.5vh;
        line-height: 2vh;
        font-size: 0.7rem;
        font-weight: 100;
        margin-left: 1vw;
        cursor: pointer;
        background: linear-gradient(15deg, #0e7e74 0%, #67dac1 100%);
        color: transparent;
        background-clip: text;
        border: #67dac1 solid 0.1vw;
        border-radius: 0.3vw;
        padding: 0 0.4vw;
        transition: all 0.2s ease-in-out;

        &:hover {
          scale: 1.05;
          transition: all 0.2s ease-in-out;
        }

        &:active {
          scale: 0.95;
          transition: all 0.2s ease-in-out;
        }

        &:last-child {
          cursor: pointer;
          margin-right: 20%;
          background: linear-gradient(15deg, #0e7e74 0%, #67dac1 100%);
          color: transparent;
          background-clip: text;
        }
      }
    }

    .operation-row {
      position: relative;
      width: 97%;
      height: 2vh;
      display: flex;
      align-items: center;
      padding: 0.1vw 0;
      margin-bottom: 0.5vh;
      border-radius: 0.2vw;
      background: linear-gradient(-15deg, #8cffa5 0%, #67dac1 100%);
      color: #ffffff;

      span {
        font-size: 0.8rem;
        height: 100%;
        white-space: nowrap;
        line-height: 2vh;
        text-align: center;
        padding-left: 0.3vw;
        text-align: start;
        font-weight: 100;

        &:first-child {
          width: 1.5vw;
        }

        &:nth-child(2) {
          width: 4.7vw;
          margin-left: 1vw;
        }
        &:nth-child(3) {
          margin-right: 6.5vw;
        }
        &:nth-child(4) {
          margin-right: 3.7vw;
        }
        &:last-child {
          color: #ff6d6d;
          cursor: pointer;
        }
      }
    }

    .list-container {
      position: relative;
      width: 100%;
      max-height: 17vh;
      // height: auto;
      display: flex;
      flex-direction: column;
      overflow: scroll;
      // border-bottom: #74e6b8 solid 0.1vw;
      // border-top: #74e6b8 solid 0.1vw;
      border-radius: 0.3vw;

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
        max-width: 97%;
        // height: 10vh;
        display: flex;
        // justify-content: center;
        align-items: center;
        margin-bottom: 1vh;
        background-color: #f7feff;
        border-radius: 0.4vw;
        box-shadow: #dfdfdf 0.2vw 0.2vw 0.2vw;
        padding: 0.4vw 0;
        padding-left: 0.5vw;
        font-weight: 100;

        span {
          &:first-child {
            width: 1.5vw;
            text-align: start;
          }
        }
      }
      .item-name {
        font-size: 1rem;
        height: 100%;
        width: 5vw;
        text-align: start;
        margin-left: 1vw;
      }
      .item-value {
        font-size: 1rem;
        text-align: start;
        width: 6vw;
        white-space: nowrap;
        height: 100%;
      }
      .item-used-time {
        position: absolute;
        right: 3vw;
        font-size: 0.7rem;
        height: 2vh;
        line-height: 2vh;
        // background-color: #ffacac;
      }
      .delete-btn {
        position: absolute;
        right: 1vw;
        font-size: 1rem;
        height: 2vh;
        line-height: 2vh;
        color: #ff8a8a;
        cursor: pointer;

        &:active {
          scale: 0.95;
          transition: all 0.2s ease-in-out;
        }
      }

      .empty {
        position: relative;
        width: 100%;
        height: 17vh;
        // background-color: #ffc9c9;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
