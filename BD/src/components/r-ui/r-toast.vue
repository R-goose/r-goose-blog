<script setup>
import { ref, onMounted, nextTick } from 'vue'

const toastRef = ref(null)

const props = defineProps({
  showToastFlag: {
    type: Boolean,
    default: false
  },
  toastText: {
    type: String,
    default: ''
  },
  controls: {
    type: Object,
    default: () => ({
      width: '50vw',
      height: '50vh',
      top: '20vh',
      left: '25vw',
      backgroundColor: '#f8c3c354',
      boxShadow: '0px 0px 10px #888888',
    })
  }
})

const emit = defineEmits(['closeToast'])

const closeToast = () => {
  emit('closeToast')
}

onMounted(async () => {
  await nextTick()
  if (!toastRef.value) {
    console.log('toastRef 元素未找到');
    return;
  }
  document.documentElement.style.overflow = 'hidden'
  toastRef.value.style = `
    top: ${props.controls.top};
    left: ${props.controls.left};
    width: ${props.controls.width};
    height: ${props.controls.height};
    background-color: ${props.controls.backgroundColor};
    box-shadow: ${props.controls.boxShadow};`
})

</script>
<template>
  <div class="r-toast" v-if="showToastFlag" ref="toastRef">
    <div class="toast-content">
      <h1>{{ toastText }}</h1>
      <!-- <img src="/src/image/pictures/TOF.png" alt=""> -->
      <button @click="closeToast()">关闭</button>
    </div>



  </div>
</template>
<style scoped lang="scss">
.r-toast {
  position: fixed;
  background-color: #f8c3c354;
  top: 0vh;
  // left: 25vw;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  // border-radius: 12% 11% 14% 6% / 28% 41% 16% 12%;
  border: 1px solid #800000;

  .toast-content {
    top: 0vh;
    // left: 25vw;
    width: 100vw;
    height: 100vh;

    img {
      width: 50vw;
    }
  }
}
</style>
