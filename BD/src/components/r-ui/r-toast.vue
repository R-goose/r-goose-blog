<script setup>
import { ref, onMounted, nextTick } from 'vue'
const props = defineProps(['showToastFlag', 'toastText'])

const emit = defineEmits(['closeToast'])

const closeToast = () => {
  emit('closeToast')
}

onMounted(async () => {
  await nextTick()
  document.documentElement.style.overflow = 'hidden'
})

</script>
<template>
  <div class="r-toast" v-if="showToastFlag">
    <div class="toast-content">
      <h1>{{ toastText }}</h1>
      <img src="/src/image/pictures/TOF.png" alt="">
    </div>

    <button @click="closeToast()">关闭</button>
  </div>
</template>
<style scoped lang="scss">
.r-toast {
  position: sticky;
  background-color: #f8c3c354;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;

  .toast-content {
    img {
      width: 50vw;
    }
  }
}
</style>
