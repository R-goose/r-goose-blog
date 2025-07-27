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
    <footer></footer>
  </div>
</template>
<style scoped lang="scss">
.main {
  height: 300vh;

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30vh;
    background-color: #2c2c2c;
  }
}

h1 {
  position: sticky;
}
</style>
