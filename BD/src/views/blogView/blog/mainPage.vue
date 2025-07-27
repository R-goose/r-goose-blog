<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import PersonalPage from './personalPage.vue';
const navList = {
  home: '首页',
  archive: '归档',
  PersonalPage: '分类',
}

onMounted(() => {
  // window.location.reload()
})
</script>

<template>
  <div class="main text-center">
    <!-- <h1>Welcome to R-Goose's blog</h1> -->
    <header>
      <div>
        12321
      </div>
    </header>
    <aside class="left"></aside>
    <main></main>
    <aside class="right"></aside>
    <footer>
      <div>
        <span>© 2025 R-Goose</span>
        <span>All rights reserved.</span>
        <span>Powered by Vue.js</span>
        <span>Designed by R-Goose</span>
        <span>Hosted by Github</span>
      </div>
      <div></div>
    </footer>
  </div>
</template>
<style scoped lang="scss">
.main {
  // position: absolute;
  width: 100%;
  height: 300vh;

  header {
    position: sticky;
    top: 0;
    width: 100%;
    height: 6vh;
    background-color: #2c2c2c;
  }

  aside.left {
    position: sticky;
    left: 0;
    top: 30vh;
    width: 10vw;
    height: 10vh;
    background-color: #2c2c2c;
  }

  aside.right {
    position: sticky;
    left: 90vw;
    top: 30vh;
    width: 10vw;
    height: 10vh;
    background-color: #c57e7e;
  }

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
  top: 0;
}
</style>
