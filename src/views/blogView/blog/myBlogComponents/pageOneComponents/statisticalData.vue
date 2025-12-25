<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {})
</script>

<template>
  <div class="statisticalData">
    <div class="left"></div>
    <div class="right"></div>
  </div>
</template>

<style scoped lang="scss">
.statisticalData {
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
    background: linear-gradient(-15deg, #8cffa5 0%, #ffffff 100%);
    letter-spacing: 0.2vw;
  }

  .time-text {
    text-align: start;
    margin-bottom: 1vh;
    line-height: 3vh;
    font-size: 1.4rem;
    color: #ffffff;
  }

  .right {
    flex: 1;
  }
}
</style>
