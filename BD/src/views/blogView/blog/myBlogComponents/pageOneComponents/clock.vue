<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { timeFormat } from '@/utils/functions'
import timer from './clockComponents/timer.vue'
import countdownDay from './clockComponents/countdownDay.vue'

const time = ref(new Date())
const rafId = ref(null)

const secondDegree = ref(0)
const minuteDegree = ref(0)
const hourDegree = ref(0)

const updateClock = () => {
  const now = new Date()
  time.value = now

  const hours = now.getHours() % 12
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  const ms = now.getMilliseconds()

  const totalSeconds = seconds + ms / 1000
  const totalMinutes = minutes + totalSeconds / 60
  const totalHours = hours + totalMinutes / 60

  secondDegree.value = totalSeconds * 6 + 180 // 360° / 60s = 6°/s
  minuteDegree.value = totalMinutes * 6 + 180 // 360° / 60m = 6°/min
  hourDegree.value = totalHours * 30 + 180 // 360° / 12h = 30°/h

  rafId.value = requestAnimationFrame(updateClock)
}

const functions = [
  { name: '计时器', component: timer },
  { name: '倒数日', component: countdownDay },
]
const currentFunction = ref(0)

const changeFunction = (index) => {
  currentFunction.value = index
  console.log('currentFunction', currentFunction.value)
}

onMounted(() => {
  rafId.value = requestAnimationFrame(updateClock)
})

onUnmounted(() => {
  if (rafId.value) {
    cancelAnimationFrame(rafId.value)
  }
})
</script>
<template>
  <div class="clock">
    <div class="left">
      <div class="time-text">
        <div>{{ timeFormat(time) }}</div>
        <div>{{ time.toLocaleDateString('cn-CN', { weekday: 'long' }) }}</div>
        <div>{{ time.toLocaleTimeString() }}</div>
      </div>
      <div class="clock-shell">
        <div class="clock-center">
          <div class="clock-second-hand" :style="{ transform: `rotate(${secondDegree}deg)` }"></div>
          <div class="clock-minute-hand" :style="{ transform: `rotate(${minuteDegree}deg)` }"></div>
          <div class="clock-hour-hand" :style="{ transform: `rotate(${hourDegree}deg)` }"></div>
        </div>
        <div class="clock-scale">
          <div
            class="hour-scale"
            v-for="index in 12"
            :key="index"
            :style="{ transform: `rotate(${30 * index}deg) translateY(6.5vh)` }"
          >
            <span
              class="inner-number"
              :style="{
                transform: `translate(-50%, -100%) rotate(${180 - 30 * index}deg)translateX(0.3vh) `,
              }"
              >{{ index }}</span
            >
          </div>
          <div
            class="minute-scale"
            v-for="index in 60"
            :key="index"
            :style="{
              transform: `rotate(${6 * index}deg) translateY(7.1vh)`,
              display: index % 5 !== 0 ? 'block' : 'none',
            }"
          ></div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="function-changer">
        <div
          class="function-item"
          v-for="(item, index) in functions"
          :key="index"
          @click="changeFunction(index)"
        >
          {{ item.name }}
          <span :class="{ isActived: currentFunction === index }"> </span>
        </div>
      </div>
      <div class="function-content">
        <keep-alive>
          <component :is="functions[currentFunction].component"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.clock {
  position: relative;
  width: 100%;
  height: 100%;
  // background-color: #fff;
  border-radius: 0.3vw;
  display: flex;
  flex-direction: row;
  z-index: 3;
  overflow: hidden;

  .left {
    width: 32%;
    height: 100%;
    // border-right: 0.1vw solid #ffffff;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // background-color: #8aff53;
    background: linear-gradient(-15deg, #8cffa5 0%, #67dac1 100%);
    letter-spacing: 0.2vw;
  }

  .time-text {
    text-align: start;
    margin-bottom: 1vh;
    line-height: 3vh;
    font-size: 1.2rem;
    color: #ffffff;
  }

  .clock-shell {
    position: relative;
    // margin-top: 5%;
    width: 15vh;
    height: 15vh;
    border: 0.3vw solid #ffffff81;
    border-radius: 50%;
    background-color: #ffffff44;
    box-shadow: inset 0 0 0.25vw #424242;

    .clock-center {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1vh;
      height: 1vh;
      background-color: #2c2c2c;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;

      .clock-second-hand,
      .clock-minute-hand,
      .clock-hour-hand {
        position: absolute;
        top: 50%;
        left: 50%;
        transform-origin: top center;
        border-radius: 50vw;
        // transition: all 1s ease;
      }

      .clock-second-hand {
        width: 0.17vh;
        height: 4.7vh;
        background-color: #ff3b30;
        z-index: 3;
      }

      .clock-minute-hand {
        width: 0.27vh;
        height: 3.8vh;
        left: 45%;
        background-color: #424242;
        z-index: 2;
      }

      .clock-hour-hand {
        width: 0.35vh;
        height: 2.3vh;
        left: 38%;
        background-color: #424242;
        z-index: 1;
      }
    }

    .clock-scale {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      z-index: 5;
      overflow: hidden;
      transform: rotate(180deg);

      .hour-scale,
      .minute-scale {
        position: absolute;
        top: 50%;
        left: 49%;
        border-radius: 50vw;
        background-color: #35b48a;
        transform-origin: top center;

        .inner-number {
          position: absolute;
          color: #288f00;
          font-size: 1rem;
        }
      }

      .hour-scale {
        width: 0.38vh;
        height: 10vh;
      }

      .minute-scale {
        width: 0.2vh;
        height: 10vh;
      }
    }
  }

  .right {
    flex: 1;

    .function-changer {
      width: 100%;
      height: 3vh;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5vw;
      box-shadow: #96bb95 0 0 0.2vw;

      .function-item {
        position: relative;
        width: 5vw;
        height: 3vh;
        line-height: 3vh;
        font-size: 1rem;
        cursor: pointer;
        background: linear-gradient(15deg, #0e7e74 0%, #67dac1 100%);
        color: transparent;
        font-weight: 100;
        background-clip: text;
      }
    }

    .function-content {
      position: relative;
      height: 100%;
    }
  }
}

.isActived {
  width: 3vw;
  height: 0.5vh;
  // background-color: #69dcc0;
  background: linear-gradient(15deg, #29bbaf 0%, #67dac1 100%);
  border-radius: 0.2vw;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-in-out;
  z-index: 999;
}
</style>
