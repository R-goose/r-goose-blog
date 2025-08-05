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
        <div class="flex flex-colums flex-center mt25">
          <div>© 2025 R-Goose</div>
          <div class="space"></div>
          <div>设计师：R-Goose</div>
          <div class="space"></div>
          <div>创建：vue3.x</div>
        </div>
        <div>所有内容均为原创，转载请注明出处</div>
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

    .space {
      width: 3vw;
    }
  }
}

h1 {
  position: sticky;
  top: 0;
}
</style>
