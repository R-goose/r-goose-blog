<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const time = ref(new Date())
const clockTimer = ref(null)
const clockArray = ref([])
const hour = ref(0)
const minute = ref(0)
const second = ref(0)
const secondDegree = ref(0)
const minuteDegree = ref(0)
const hourDegree = ref(0)

const initClock = () => {
  clockTimer.value = setInterval(() => {
    time.value = new Date()
    hour.value = time.value.getHours()
    if (hour.value > 12) {
      hour.value -= 12
    }
    minute.value = time.value.getMinutes()
    second.value = time.value.getSeconds()
    secondDegree.value = second.value * 6 + 180
    minuteDegree.value = minute.value * 60 * 0.1 + 180
    hourDegree.value = hour.value * 30 + (minute.value / 60) * 30 + 180
  }, 1000)
}


onMounted(() => {
  initClock()
})

onUnmounted(() => {
  clearInterval(clockTimer.value)
})
</script>
<template>
  <div class="clock">
    <div class="left">
      <!-- <div class="date">{{ time.toLocaleDateString() }}</div>
      <div class="weekday">{{ time.toLocaleDateString('cn-CN', { weekday: 'long' }) }}</div>
      <div class="time">{{ time.toLocaleTimeString() }}</div> -->
      <div class="clock-shell">
        <div class="clock-center">
          <div class="clock-second-hand" :style="{ transform: `rotate(${secondDegree}deg)` }"></div>
          <div class="clock-minute-hand" :style="{ transform: `rotate(${minuteDegree}deg)` }"></div>
          <div class="clock-hour-hand" :style="{ transform: `rotate(${hourDegree}deg)` }"></div>
        </div>
        <div class="clock-scale">
          <div class="hour-scale" v-for="index in 12" :key="index"
            :style="{ transform: `rotate(${30 * index}deg) translateY(8vh)` }">
            <span class="inner-number"
              :style="{ transform: `translate(-50%, -100%) rotate(${180 - 30 * index}deg) ` }">{{
                index
              }}</span>
          </div>
          <div class="minute-scale" v-for="index in 60" :key="index"
            :style="{ transform: `rotate(${6 * index}deg) translateY(8.5vh)` }">
          </div>
        </div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>
<style scoped lang="scss">
.clock {
  position: relative;
  width: 100%;
  height: 100%;
  // background-color: #fff;
  display: flex;
  flex-direction: row;
  z-index: 3;

  .left {
    width: 50%;
    height: 100%;
    border-right: 0.1vw solid #ffffff;
    position: relative;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
  }

  .clock-shell {
    position: relative;
    margin-top: 5%;
    width: 18vh;
    height: 18vh;
    border: 0.5vw solid #424242;
    border-radius: 50%;
    background-color: #fff;
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
      }

      .clock-second-hand {
        width: 0.2vh;
        height: 7vh;
        background-color: #ff3b30;
        animation: scaleMove 60s linear infinite;
        z-index: 3;
      }

      .clock-minute-hand {
        width: 0.3vh;
        height: 6vh;
        left: 45%;
        background-color: #424242;
        animation: scaleMove 3600s linear infinite;
        z-index: 2;
      }

      .clock-hour-hand {
        width: 0.4vh;
        height: 4vh;
        left: 38%;
        background-color: #424242;
        animation: scaleMove 86400s linear infinite;
        z-index: 1;
      }

      @keyframes scaleMove {
        // 0% {
        //   transform: rotate(0deg);
        // }

        // 100% {
        //   transform: rotate(360deg);
        // }
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
        left: 50%;
        border-radius: 50vw;
        background-color: #929292;
        transform-origin: top;

        .inner-number {
          position: absolute;
          color: #424242;
          font-size: 1rem;
        }
      }

      .hour-scale {
        width: 0.38vh;
        height: 10vh;
        transform: translateX(10vh);
      }

      .minute-scale {
        width: 0.2vh;
        height: 10vh;
      }
    }
  }

  .right {
    flex: 1;
    // background-color: #fff;
  }
}
</style>
