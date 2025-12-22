<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue'
import { timeFormat } from '@/utils/functions'
import rToast from '@/components/r-ui/r-toast.vue'
import { rTips } from '@/utils/rTips'

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
    if (timerId) {
      rTips({
        type: 'alert-e',
        title: '请先停止计时器',
      })
      return
    }
    isRunning.value = true
    isPaused.value = true
    rTips({
      type: 'alert-s',
      title: '开始计时',
    })
    startTime.value = Date.now() - elapsedBeforePause.value

    timerId = setInterval(() => {
      const now = Date.now()
      const totalElapsed = now - startTime.value
      updateDisplay(totalElapsed)
    }, 10)
  } else if (index == 1) {
    if (countdownTimerId) {
      rTips({
        type: 'alert-e',
        title: '请先停止倒计时器',
      })
      return
    }
    isCountdownRunning.value = true
    isCountdownPaused.value = true
    rTips({
      type: 'alert-s',
      title: '开始倒计时',
    })
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
  rTips({
    type: 'alert-w',
    title: '已暂停',
  })
}

const stopTimer = (index) => {
  if (index == 0) {
    if (!isRunning.value) {
      rTips({
        type: 'alert-e',
        title: '当前没有进行中的计时器',
      })
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
    rTips({
      type: 'alert-s',
      title: '已结束',
    })
    updateDisplay(0)
  } else if (index == 1) {
    if (!isCountdownRunning.value) {
      rTips({
        type: 'alert-e',
        title: '当前没有进行中的倒计时器',
      })
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
    rTips({
      type: 'alert-s',
      title: '已结束',
    })
    formatCountdownTime(0)
  }
}

const timeType = ref([
  { name: '打点计时器', nowUse: true },
  { name: '倒计时器', nowUse: false },
])

//倒计时器
const presetTime = ref([
  { name: '10分', value: 600000 },
  { name: '1时', value: 3600000 },
])

//自定义
const customTimeFlag = ref(false)
// 自定义倒计时输入值
const customHours = ref(0)
const customMinutes = ref(0)
const customSeconds = ref(0)
//预设的值
const presetTimeSecond = ref(0)
const presetTimeMinute = ref(0)
const presetTimeHour = ref(0)
//选择自定义的时间
const isUseCustomTime = ref(false)
const selectPresetTimeItem = ref(0)
const toastTitle = '自定义倒计时'
const lastSelectCountdownTime = ref({})

const selectPresetTime = (value) => {
  if (value == 0) {
    showToastFlag.value = true
    customTimeFlag.value = true
    return
  } else {
    customTimeFlag.value = false
    isUseCustomTime.value = false
    selectCountdownTime.value = value
    selectCountdownTimeShow.value = value
    formatCountdownTime(selectCountdownTimeShow.value)
  }
}

const showToastFlag = ref(false)

const setCustomTime = (type, value) => {
  if (type == 'hours') {
    customHours.value += value
    limitInput(customHours.value, 'hours')
  }
  if (type == 'minutes') {
    customMinutes.value += value
    limitInput(customMinutes.value, 'minutes')
  }
  if (type == 'seconds') {
    customSeconds.value += value
    limitInput(customSeconds.value, 'seconds')
  }
}

const setSelectPresetTime = (item) => {
  presetTimeSecond.value = 0
  presetTimeMinute.value = 0
  presetTimeHour.value = 0

  selectPresetTimeItem.value = item.value
  presetTimeHour.value = Math.floor(selectPresetTimeItem.value / 60 / 60 / 1000)
  presetTimeMinute.value =
    Math.floor(selectPresetTimeItem.value / 60 / 1000) - presetTimeHour.value * 60
  presetTimeSecond.value =
    selectPresetTimeItem.value / 1000 - presetTimeMinute.value * 60 - presetTimeHour.value * 3600
  if (presetTimeHour.value < 1) {
    presetTimeHour.value = 0
    presetTimeMinute.value = Math.floor(selectPresetTimeItem.value / 60 / 1000)
    if (presetTimeMinute.value < 1) {
      presetTimeMinute.value = 0
      presetTimeSecond.value = Math.floor(selectPresetTimeItem.value / 1000)
    } else {
      presetTimeSecond.value = 0
    }
    // presetTimeSecond.value = Math.floor(selectPresetTimeItem.value / 1000)
  }
  formatCountdownTime(selectPresetTimeItem.value)
}

const useLastTime = () => {
  customHours.value = lastSelectCountdownTime.value.hours || 0
  customMinutes.value = lastSelectCountdownTime.value.minutes || 0
  customSeconds.value = lastSelectCountdownTime.value.seconds || 0
  if (customHours.value == 0 && customMinutes.value == 0 && customSeconds.value == 0) {
    rTips({
      type: 'alert-w',
      title: '请先设置倒计时时间',
    })
  } else {
    rTips({
      type: 'alert-s',
      title: '已恢复上一次选择',
    })
  }
}

const limitInput = (val, type) => {
  if (val < 0) {
    if (type === 'hours') customHours.value = 0
    if (type === 'minutes') customMinutes.value = 0
    if (type === 'seconds') customSeconds.value = 0
    rTips({
      type: 'alert-e',
      title: '时间不能小于0',
    })
  }
  if (type !== 'hours' && val > 59) {
    if (type === 'minutes') customMinutes.value = 59
    if (type === 'seconds') customSeconds.value = 59
    rTips({
      type: 'alert-e',
      title: '时间不能大于59',
    })
  }
  if (type == 'hours' && val > 23) {
    customHours.value = 23
    rTips({
      type: 'alert-e',
      title: '时间不能大于23',
    })
  }
}

const cancel = () => {
  showToastFlag.value = false
  customTimeFlag.value = false
  isUseCustomTime.value = false
  selectCountdownTime.value = 0
  customSeconds.value = 0
  customMinutes.value = 0
  customHours.value = 0
  selectPresetTimeItem.value = 0
  formatCountdownTime(0)
}

const confirm = async () => {
  const totalMs =
    (parseInt(customHours.value) || 0) * 3600000 +
    (parseInt(customMinutes.value) || 0) * 60000 +
    (parseInt(customSeconds.value) || 0) * 1000

  selectCountdownTime.value = totalMs
  formatCountdownTime(totalMs)
  lastSelectCountdownTime.value.seconds = customSeconds.value
  lastSelectCountdownTime.value.minutes = customMinutes.value
  lastSelectCountdownTime.value.hours = customHours.value

  if (
    lastSelectCountdownTime.value.seconds == 0 &&
    lastSelectCountdownTime.value.minutes == 0 &&
    lastSelectCountdownTime.value.hours == 0
  ) {
    isUseCustomTime.value = false
  } else {
    isUseCustomTime.value = true
  }

  await nextTick(() => {
    rTips({ type: 'alert-s', title: '已保存' })
    showToastFlag.value = false
  })

  customHours.value = 0
  customMinutes.value = 0

  presetTime.value.forEach((item) => {
    if (item.value == selectPresetTimeItem.value) {
      let newName = ''
      if (presetTimeHour.value != 0) {
        newName = presetTimeHour.value + '时'
      }
      if (presetTimeMinute.value != 0) {
        newName += presetTimeMinute.value + '分'
      }
      if (presetTimeSecond.value != 0) {
        newName += presetTimeSecond.value + '秒'
      }
      item.name = newName
      item.value =
        presetTimeSecond.value * 1000 +
        presetTimeMinute.value * 60000 +
        presetTimeHour.value * 3600000
      // formatCountdownTime(item.value)
      if (selectPresetTimeItem.value == 0) {
        customTimeFlag.value = false
      }
    }
  })

  customSeconds.value = 0
  selectPresetTimeItem.value = 0
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

const deleteRecord = async (index) => {
  if (index == -1) {
    const result = await rTips({
      type: 'confirm',
      title: '确认删除全部记录？',
      content: '删除后不可恢复，请确认！',
      confirmBtnText: '删了',
      cancelBtnText: '手滑,不删了',
    })
    if (result == 'confirm') {
      useRecord.value = []
      rTips({
        type: 'alert-s',
        title: '已删除全部记录',
      })
      return
    }
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

watch(presetTimeSecond, (newVal) => {
  if (newVal < 0) {
    presetTimeSecond.value = 0
  }
  if (newVal > 59) {
    presetTimeSecond.value = 59
  }
})
watch(presetTimeMinute, (newVal) => {
  if (newVal < 0) {
    presetTimeMinute.value = 0
  }
  if (newVal > 59) {
    presetTimeMinute.value = 59
  }
})
watch(presetTimeHour, (newVal) => {
  if (newVal < 0) {
    presetTimeHour.value = 0
  }
  if (newVal > 23) {
    presetTimeHour.value = 23
  }
})

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
          v-if="isRunning"
          >停止</span
        >
      </div>
    </div>

    <div v-show="nowUseTypeIndex == 1" style="width: 100%">
      <div class="timer-text">
        <span class="num">{{ selectCountdownTimeShow.hours }} :</span>
        <span class="num">{{ selectCountdownTimeShow.minutes }} :</span>
        <span class="num">{{ selectCountdownTimeShow.seconds }} </span>
      </div>
      <div class="button-area">
        <span v-if="!isCountdownPaused" class="countdown-time">
          <span
            class="button"
            @click="selectPresetTime(item.value)"
            :class="{ isActive: selectCountdownTime == item.value && customTimeFlag == false }"
            v-for="(item, index) in presetTime"
            :key="index"
          >
            {{ item.name }}
          </span>
          <span
            class="button"
            @click="selectPresetTime(0)"
            :class="{ isActive: isUseCustomTime == true }"
            >自定义</span
          >
        </span>
        <span class="button start" @click="startTimer(1)" v-if="!isCountdownPaused">开始</span>
        <span class="button pause" @click="pauseTimer(1)" v-else>暂停</span>
        <span
          class="button stop"
          @click="stopTimer(1)"
          :style="{ cursor: !isCountdownRunning ? 'not-allowed' : 'pointer' }"
          v-if="isCountdownRunning"
          >停止</span
        >
      </div>
    </div>

    <div class="list">
      <div class="title">
        <span>使用记录</span>
        <span class="sort-btn" @click="sortRecord(0)">功能排序</span>
        <span class="sort-btn" @click="sortRecord(1)">使用时间排序</span>
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
    <div class="now-use">{{ timeType[nowUseTypeIndex].name }}</div>
    <div class="change" @click="timeTypeChange(nowUseTypeIndex)">
      切换为{{ timeType[nextUseTypeIndex].name }}
    </div>
    <r-toast
      v-if="showToastFlag"
      @cancel="cancel"
      @confirm="confirm"
      :showToastFlag="showToastFlag"
      :toastTitle="toastTitle"
    >
      <template #default>
        <div class="toast-content">
          <div class="time-input-group">
            <div class="input-item">
              <div></div>
              <span class="input-change" @click="setCustomTime('hours', 1)">+</span>
              <input
                type="number"
                min="0"
                max="23"
                v-model.number="customHours"
                @input="limitInput(customHours, 'hours')"
                placeholder="设置时间"
              />
              <span class="input-change" @click="setCustomTime('hours', -1)">-</span>
              <span>时</span>
            </div>
            <div class="input-item">
              <span class="input-change" @click="setCustomTime('minutes', 1)">+</span>
              <input
                type="number"
                min="0"
                max="59"
                v-model.number="customMinutes"
                @input="limitInput(customMinutes, 'minutes')"
                placeholder="设置时间"
              />
              <span class="input-change" @click="setCustomTime('minutes', -1)">-</span>
              <span>分</span>
            </div>
            <div class="input-item">
              <span class="input-change" @click="setCustomTime('seconds', 1)">+</span>
              <input
                type="number"
                min="0"
                max="59"
                v-model.number="customSeconds"
                @input="limitInput(customSeconds, 'seconds')"
                placeholder="设置时间"
              />
              <span class="input-change" @click="setCustomTime('seconds', -1)">-</span>
              <span>秒</span>
            </div>
          </div>
          <div class="lastTime">
            上次自定义的倒计时:
            {{ lastSelectCountdownTime.hours || 0 }}时 {{ lastSelectCountdownTime.minutes || 0 }}分
            {{ lastSelectCountdownTime.seconds || 0 }}秒
            <span class="use-lasttime-btn" @click="useLastTime()">使用</span>
          </div>
          <div class="preset-section">
            <span class="section-title">设置预设时间：</span>
            <div class="preset-buttons">
              <span
                class="preset-button"
                @click="setSelectPresetTime(item)"
                :class="{ isActive: selectPresetTimeItem == item.value }"
                v-for="(item, index) in presetTime"
                :key="index"
              >
                {{ item.name }}
              </span>
            </div>
          </div>
          <div class="time-input-group" v-if="selectPresetTimeItem !== 0">
            <div class="input-item">
              <div></div>
              <span class="input-change" @click="presetTimeHour++">+</span>
              <input
                type="number"
                min="0"
                max="23"
                v-model.number="presetTimeHour"
                @input="limitInput(presetTimeHour, 'hours')"
                placeholder="设置时间"
              />
              <span class="input-change" @click="presetTimeHour--">-</span>
              <span>时</span>
            </div>
            <div class="input-item">
              <span class="input-change" @click="presetTimeMinute++">+</span>
              <input
                type="number"
                min="0"
                max="59"
                v-model.number="presetTimeMinute"
                @input="limitInput(presetTimeMinute, 'minutes')"
                placeholder="设置时间"
              />
              <span class="input-change" @click="presetTimeMinute--">-</span>
              <span>分</span>
            </div>
            <div class="input-item">
              <span class="input-change" @click="presetTimeSecond++">+</span>
              <input
                type="number"
                min="0"
                max="59"
                v-model.number="presetTimeSecond"
                @input="limitInput(presetTimeSecond, 'seconds')"
                placeholder="设置时间"
              />
              <span class="input-change" @click="presetTimeSecond--">-</span>
              <span>秒</span>
            </div>
          </div>
        </div>
      </template>
    </r-toast>
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
  color: #69dcc0;

  .timer-text {
    position: relative;
    width: 100%;
    height: 13vh;
    line-height: 13vh;
    font-size: 2vw;
    font-size: 4rem;
    display: flex;
    justify-content: center;

    .num {
      position: relative;
      font-size: smaller;
      height: 100%;
      width: 6vw;
      margin-top: 1vh;
      text-shadow: 0 0.1vw 0.2vw rgba(255, 255, 255, 0.5);
    }
  }

  .button-area {
    position: relative;
    // background-color: #fff;
    bottom: 1vh;
    display: flex;
    justify-content: space-around;
    width: 100%;
    font-weight: 100;

    .button {
      position: relative;
      min-width: 3.5vw;
      width: auto;
      padding: 0 0.2vw;
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
    }
  }

  .now-use {
    position: absolute;
    text-align: start;
    font-size: 1rem;
    top: 1vh;
    left: 3%;
    width: 8vw;
    height: 3vh;
    line-height: 3vh;
    font-weight: 100;
    text-shadow: 0 0.1vw 0.2vw #ffffff80;
  }

  .change {
    position: absolute;
    text-align: end;
    font-size: 0.8rem;
    top: 1vh;
    right: 3%;
    width: auto;
    height: 3vh;
    line-height: 3vh;
    cursor: pointer;
    background: linear-gradient(15deg, #0e7e74 0%, #67dac1 100%);
    color: transparent;
    font-weight: 100;
    background-clip: text;
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
        position: relative;
        // top: 0.5vh;
        height: 2vh;
        line-height: 2vh;
        font-size: 0.75rem;
        font-weight: 100;
        margin-left: 1vw;
        cursor: pointer;
        background: linear-gradient(15deg, #0e7e74 0%, #67dac1 100%);
        color: transparent;
        background-clip: text;
        // padding: 0 0.3vw;
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
        padding-left: 0.3vw;
        text-align: start;
        font-weight: 100;

        &:first-child {
          width: 2.5vw;
        }

        &:nth-child(2) {
          width: 4.5vw;
        }
        &:nth-child(3) {
          width: 8.6vw;
        }
        &:nth-child(4) {
          width: 5.6vw;
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
        background-color: #f7feffb0;
        border-radius: 0.4vw;
        box-shadow: #74e687b7 1px 1px 0.1vw;
        // border: #74e6b8 solid 0.1vw;
        padding: 0.4vw 0;
        padding-left: 0.5vw;
        font-weight: 100;

        span {
          &:first-child {
            font-size: 0.8rem;
            width: 1.5vw;
            text-align: start;
          }
        }
      }
      .item-name {
        font-size: 0.8rem;
        height: 100%;
        width: 5vw;
        text-align: start;
        margin-left: 1vw;
      }
      .item-value {
        font-size: 0.8rem;
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

.isActive {
  background-color: #ffe396 !important;
  scale: 1.05 !important;
  font-size: 0.9rem !important;
  color: #ffffff !important;
  cursor: default !important;
  border: #ffffff solid 0.1vh !important;

  &:hover {
    scale: 1.05;
  }
}

.toast-content {
  display: flex;
  flex-direction: column;
  gap: 1.2vw;
  padding: 1.5vw 1vw;

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  .lastTime {
    font-size: 1rem;
    color: #7bcfc8;
    margin-bottom: 0.5vw;
    letter-spacing: 0.1rem;
    display: flex;
    align-items: center;
    // justify-content: space-between;

    .use-lasttime-btn {
      font-weight: 100;
      width: 3vw;
      margin-left: 1vw;
      text-align: center;
      border: 1px solid #8fe5cf;
      border-radius: 0.4vw;
      color: #ffffff;
      cursor: pointer;
      background-color: #8fe5cf;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: #73eecb;
        transition: all 0.2s ease-in-out;
        transform: translateY(-0.2vh);
      }
    }
  }

  .time-input-group {
    display: flex;
    justify-content: center;
    gap: 1vw;

    .input-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #7bcfc8;
      gap: 0.3vw;

      input {
        width: 2.5vw;
        height: 2.2vh;
        font-size: 1.3rem;
        text-align: center;
        border: 1px solid #67dac184;
        border-radius: 0.4vw;
        background: #ffffff00;
        outline: none;
        padding: 0.2vw;

        &::placeholder {
          color: #a3dfd0;
          font-size: 0.9rem;
        }

        &:focus {
          border-color: #8cffa5;
          box-shadow: 0 0 0.3vw rgba(103, 218, 193, 0.6);
        }
      }

      span {
        font-size: 1.3rem;
        font-weight: 500;
      }

      .input-change {
        user-select: none;
        font-size: 1.5rem;
        font-weight: 100;
        cursor: pointer;
        transition: all 0.2s ease;
        width: 1vw;
        height: 1vw;
        line-height: 1vw;
        text-align: center;
        border-radius: 0.2vw;
        color: #ffffff;
        background-color: #8fe5cf;

        &:hover {
          scale: 1.1;
          transition: all 0.2s ease-in-out;
        }

        &:active {
          scale: 0.95;
          transition: all 0.2s ease-in-out;
        }
      }
    }
  }

  .preset-section {
    display: flex;
    flex-direction: row;
    // align-items: center;
    gap: 0.6vw;

    .section-title {
      font-size: 1.3rem;
      margin-bottom: 0.5vw;
      letter-spacing: 0.3rem;
      color: #7bcfc8;
    }

    .preset-buttons {
      display: flex;
      flex-direction: row;
      // align-items: center;
      // justify-content: center;
      gap: 0.8vw;

      .preset-button {
        width: 5vw;
        height: 3vh;
        text-align: center;
        line-height: 3vh;
        font-size: 0.8rem;
        border: 1px solid #67dac1;
        border-radius: 0.4vw;
        color: #67dac1;
        background: transparent;
        cursor: pointer;
        transition: all 0.2s ease;
      }
    }
  }
}
</style>
