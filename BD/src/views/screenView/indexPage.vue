<script setup>
import rToast from '@/components/r-ui/r-toast.vue'
import { ref } from 'vue'
const showToastFlag = ref(false)
const closeToast = () => {
  showToastFlag.value = false
}
</script>
<template>
  <div>
    <h1>Welcome to my blog!</h1>
    <button @click="showToastFlag = !showToastFlag">6666</button>
    <rToast v-if="showToastFlag" :showToastFlag="showToastFlag" @closeToast="closeToast"></rToast>
  </div>
</template>
<style scoped lang="scss"></style>
