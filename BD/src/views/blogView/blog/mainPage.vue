<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

onMounted(() => {
  window.location.reload
})
</script>

<template>
  <div class="main text-center">
    <h1>Welcome to my blog</h1>
    <header></header>
  </div>
</template>
<style scoped lang="scss">
.main {
  height: 100vh;
}

h1 {
  position: sticky;
}
</style>
