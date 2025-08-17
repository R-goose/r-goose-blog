<script setup>
import { ref, onMounted, defineProps } from 'vue'
const props = defineProps(['showToastFlag', 'toastText'])

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

</script>
<template>
  <div class="r-toast" v-if="showToastFlag">
    <div>
      <h1>{{ toastText }}</h1>
      <img src="/src/image/pictures/TOF.png" alt="">
    </div>

    <button @click="close">关闭</button>
  </div>
</template>
<style scoped lang="scss">
.r-toast {
  position: sticky;
  // background-color: #db9a9a54;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}
</style>
