<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import HomePage from '@/views/blogView/blog/homePage.vue'
import myBlog from '@/views/blogView/blog/myBlog.vue'
import dataView from '@/views/oaView/indexPage.vue'
import dataScreen from '@/views/screenView/indexPage.vue'
const router = useRouter();
const route = useRoute();

const curremComponentIndex = ref(0)
// 页面导航
const navList = reactive([
  {
    name: '首页',
    isActive: true,
    routeName: 'RGoose',
    component: HomePage,
    meta: {
      public: true,
    }
  }, {
    name: '我的博客',
    isActive: false,
    routeName: 'myBlog',
    component: myBlog,
    meta: {
      public: true,
    }
  }, {
    name: '数据后台',
    isActive: false,
    routeName: 'DataAdmin',
    component: dataView,
    meta: {
      public: true,
    }
  }, {
    name: '数据大屏',
    isActive: false,
    routeName: 'DataScreen',
    component: dataScreen,
    meta: {
      public: true,
    }
  },
])
// 页面切换
const changePage = (curremPageIndex) => {
  navList.forEach((item, index) => {
    item.isActive = index === curremPageIndex;
  })
  curremComponentIndex.value = curremPageIndex;
}

onMounted(() => {
  // 这里根据用户登录情况来判断是否展示数据后台的入口
})
</script>

<template>
  <div class="main text-center" id="main">
    <a href="#main"></a>
    <header class="flex flex-center flex-row gap3vw">
      <span v-for="(item, index) in navList" :key="index" @click="changePage(index)"
        :class="{ active: item.isActive, show: !item.meta.public }">{{ item.name }}</span>
    </header>
    <aside class="left">
      <div>去到底部</div>
    </aside>
    <main>
      <component :is="navList[curremComponentIndex].component"></component>
    </main>
    <aside class="right">
      <div>回到顶部</div>
    </aside>
    <footer>
      <div>
        <div class="flex flex-colums flex-center">
          <div class="text">© 2025 R-Goose</div>
          <div class="space"></div>
          <div class="text">设计师：R-Goose</div>
          <div class="space"></div>
          <div class="text">创建：vue3.x</div>
        </div>
        <div>最近更新时间：2022-03-15</div>
        <div>所有内容均为原创，转载请注明出处</div>
      </div>
      <div></div>
    </footer>
  </div>
</template>
<style scoped lang="scss">
.main {
  width: 100%;
  height: 300vh;
  background: linear-gradient(90deg,
      rgba(255, 240, 240, 0.5),
      rgba(255, 255, 220, 0.5),
      rgba(240, 255, 240, 0.5),
      rgba(240, 255, 255, 0.5),
      rgba(250, 240, 255, 0.5));

  header {
    position: sticky;
    top: 0;
    width: 100%;
    height: 6vh;
    background: linear-gradient(90deg,
        rgba(255, 254, 254, 0.8),
        rgba(253, 253, 248, 0.8),
        rgba(250, 255, 250, 0.8),
        rgba(248, 255, 255, 0.8),
        rgba(253, 250, 255, 0.8));
    font-size: 1.3rem;
    color: #9e9e9e;
    font-weight: 300;
    // text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 4px #fff, 0 0 5px #fff;

    span {
      position: relative;
      width: auto;
      cursor: pointer;
      padding: 0.5vh 0.8vw;
      transition: all 0.3s ease;

      &:hover {
        border-color: #d5fffb;
        color: #89bb39;
        // background-color: #d5fff2;
        scale: 1.1;
      }

      &:active {
        // background-color: #d5fff2;
        scale: 0.9;
      }

      &.active {
        // background-color: #d5fffb94;
        border-color: #85be2762;
        scale: 1.1;
        font-weight: 500;
        cursor: default;
        color: #4a7702;
      }

      &.show {
        display: none;
      }


      border: 2px solid;
      border-radius: 10px;
      border-color: #e4fff6;
    }
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
    height: 12vh;
    background-color: #2c2c2c;
    color: azure;
    line-height: 3vh;

    .space {
      width: 3vw;
    }

    .text {
      bottom: 0;
      margin-top: 2vh;
    }
  }
}

h1 {
  position: sticky;
  top: 0;
}
</style>
