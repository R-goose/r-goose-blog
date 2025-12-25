<script setup>
import { ref, onMounted,onUnmounted } from 'vue';

const imgUrl = ref('');
onMounted(() => {
  // imgUrl.value = require('@/assets/images/404.png');
});

onUnmounted(() =>{
  imgUrl.value = '';
});

</script>

<template>
  <div ref="mainRef" class="main">
    <img :src=imgUrl alt="404 Not Found" class="img404"/>
  </div>
</template>

<style lang="scss">
@use '@/assets/base' as base;
@use '@/assets/theme' as theme;
</style>

<style scoped lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
}

.img404{
  width: 100%;
  height: 100%;
}
</style>
