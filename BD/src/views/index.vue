<script setup>
import { ref, onMounted, onUnmounted, reactive, markRaw, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import firstView from './blogView/blog/firstView.vue';
import myBlog from '@/views/blogView/blog/myBlog.vue'
import dataView from '@/views/oaView/indexPage.vue'
import dataScreen from '@/views/screenView/indexPage.vue'
import rToast from '@/components/r-ui/r-toast.vue'
import themeChanger from '@/components/themeChanger.vue'


const router = useRouter();
const route = useRoute();
const isFirstPage = ref(false)
const pageHeight = ref(0)
const viewportHeight = ref(0)
const mainPageRef = ref(null)
const pageTotalHeight = ref(0)

const updateHeights = () => {
  const mainPageEl = mainPageRef.value?.$el;
  if (!mainPageEl) return;

  // 子组件高度
  const mainPageHeight = {
    offset: mainPageEl.offsetHeight,
    scroll: mainPageEl.scrollHeight,
    client: mainPageEl.clientHeight
  };

  // 整个页面的高度
  pageHeight.value = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

  // 视口高度
  viewportHeight.value = window.innerHeight || document.documentElement.clientHeight;
  pageTotalHeight.value = pageHeight.value + mainPageHeight.offset;
  console.log('pageTotalHeight：', pageTotalHeight.value);
}

// toast相关
const toastRf = ref(null)
const showToastFlag = ref(false)
const toastText = ref('打开了弹窗')
defineEmits(['closeToast'])
const handleToastClose = () => {
  showToastFlag.value = false
  enableScroll()
}

// 页面顶部ref
const aTop = ref(null)

// 禁用全局滚动
const disableScroll = () => {
  const mainEl = document.querySelector('.main')
  if (mainEl) {
    mainEl.style.overflowY = 'hidden'
    mainEl.style.position = 'fixed'
    mainEl.style.top = `-${window.scrollY}px`
  }
}

// 恢复全局滚动
const enableScroll = () => {
  const mainEl = document.querySelector('.main')
  if (mainEl) {
    mainEl.style.overflowY = 'scroll'
  }
}

const curremComponentIndex = ref(0)
// 页面导航
const navList = reactive([
  {
    name: '首页',
    isActive: true,
    routeName: 'firstView',
    component: markRaw(firstView),// 使用markRaw防止组件被响应式处理
    meta: {
      public: true,
    }
  }, {
    name: '我的博客',
    isActive: false,
    routeName: 'myBlog',
    component: markRaw(myBlog),
    meta: {
      public: true,
    }
  }, {
    name: '数据后台',
    isActive: false,
    routeName: 'DataAdmin',
    component: markRaw(dataView),
    meta: {
      public: true,
    }
  }, {
    name: '数据大屏',
    isActive: false,
    routeName: 'DataScreen',
    component: markRaw(dataScreen),
    meta: {
      public: true,
    }
  },
])

const guideRef = ref(null)
// 页面切换
const changePage = (curremPageIndex) => {
  navList.forEach((item, index) => {
    item.isActive = index === curremPageIndex;
    if (item.name === '首页') {
      isFirstPage.value = true
    } else {
      isFirstPage.value = false
    }
  })
  curremComponentIndex.value = curremPageIndex;
  router.push({ name: navList[curremPageIndex].routeName })
  aTop.value.scrollIntoView({ behavior: 'auto', block: 'start' });
}

// 回到顶部
const toTop = () => {
  aTop.value.scrollIntoView({ behavior: 'auto', block: 'start' });
}

// 隐藏按钮
const hideToTopButton = ref(false)
const closeButton = (e) => {
  e.preventDefault();
  showToastFlag.value = true
  toastText.value = '是否要关闭该按钮？'
  console.log('guideRef.value', guideRef.value);
  guideRef.value.forEach(el => {
    if (el) {
      el.style.cursor = 'default';
      el.hover = 'default'
    }
  });

  disableScroll()
}
// 退出登录
const logout = () => {
  router.push({ name: 'login' })
}

watch(() => route.name, (newName) => {
  isFirstPage.value = newName === 'firstView'
})

onMounted(() => {
  updateHeights()
  window.addEventListener('resize', updateHeights);
  curremComponentIndex.value = 0
  router.push({ name: navList[curremComponentIndex.value].routeName })
  isFirstPage.value = router.currentRoute.value.name === 'firstView'
  console.log('isFirstPage.value', isFirstPage.value);

})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeights);
})

</script>

<template>
  <div class="main text-center" ref="aTop">
    <header class="flex flex-row">
      <span v-for="(item, index) in navList" :key="index" @click="changePage(index)"
        :class="{ active: item.isActive, show: !item.meta.public }" ref="guideRef">{{ item.name }}</span>
      <div class="other">
        <div>
          <img src="@/image/icons/avatar.png" alt="" class="icon" draggable="false">
        </div>
        <div @click="logout()">
          <img src="@/image/icons/logout.png" alt="" class="icon" draggable="false">
        </div>
      </div>
      <div class="title">
        R-Goose's Blog
      </div>
    </header>
    <main>
      <themeChanger></themeChanger>
      <!-- <component :is="navList[curremComponentIndex].component"></component> -->
      <router-view></router-view>
    </main>
    <!-- <aside class="left">
      <div>去到底部</div>
    </aside> -->
    <aside class="right" @click="toTop()" @contextmenu="closeButton($event)" v-if="isFirstPage">
      <img src="/src/image/icons/toTop.png" alt="" draggable="false">
    </aside>

    <rToast :showToastFlag="showToastFlag" :toastText="toastText" @closeToast="handleToastClose()" ref="toastRf">回到顶部
    </rToast>
  </div>
</template>
<style scoped lang="scss">
.main {
  width: 100vw;
  // min-height: 100vh;
  height: 100%;
  // background: linear-gradient(45deg,
  //     rgba(255, 240, 240, 0.6),
  //     rgba(255, 255, 220, 0.6),
  //     rgba(240, 255, 240, 0.6),
  //     rgba(240, 255, 255, 0.6),
  //     rgba(250, 240, 255, 0.6));
  background: linear-gradient(135deg, #f7fef9 0%, #eef6ff 100%);
  overflow: visible;
  // position: static;

  header {
    position: sticky;
    top: 0;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: 5vh;
    font-size: 1rem;
    color: #9e9e9e;
    font-weight: 300;
    gap: 0.3vw;
    border-bottom: #e4fff6 1px solid;
    z-index: 20;
    background: linear-gradient(45deg,
        rgba(255, 240, 240, 0.6),
        rgba(255, 255, 220, 0.6),
        rgba(240, 255, 240, 0.6),
        rgba(240, 255, 255, 0.6),
        rgba(250, 240, 255, 0.6));
    // -webkit-text-stroke: 1px #ffffff;

    span {
      position: relative;
      width: auto;
      cursor: pointer;
      padding: 0.3vh 0.4vw;
      transition: all 0.3s ease;
      z-index: 21;
      margin-left: 0.5vw;

      &:hover {
        border-color: #d5fffb;
        color: #89bb39;
        scale: 1.1;
      }

      &:active {
        scale: 0.9;
      }

      &.active {
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

    .title {
      position: absolute;
      text-align: center;
      width: 100vw;
      background: linear-gradient(to right, #89bb39, #7da2d1);
      background-clip: text;
      color: transparent;
      // -webkit-text-stroke: 0.5px #89bb39;
    }

    .other {
      position: absolute;
      right: 0;
      display: flex;
      flex-direction: row;
      gap: 0.3vw;



      &>:nth-child(1) {
        border-radius: 50%;
        width: 2vw;
        height: 2vw;
        color: #fff;
        font-size: 1.2rem;
        box-shadow: #dddddd 0px 0px 10px 0px;

        .icon {
          width: 1.5vw;
          margin-top: 0.5vh;
          transition: all 0.3s ease-in-out;
        }
      }

      &>:nth-child(2) {
        margin-right: 0.5vw;
        // box-shadow: #4a7702 0px 0px 10px 0px;
        width: 2vw;
        height: 2vw;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        .icon {
          width: 1vw;
          margin-top: 1vh;
          transition: all 0.3s ease-in-out;
        }

        &:hover {
          scale: 1.1;
        }
      }
    }
  }

  main {
    position: relative;
    // position: absolute;
    width: 100%;
    // top: 100vh;
  }

  aside.left {
    position: fixed;
    left: 0;
    top: 30vh;
    width: 10vw;
    height: 10vh;
    background-color: #2c2c2c;
  }

  aside.right {
    position: fixed;
    left: 97vw;
    top: 30vh;
    width: 1.2vw;
    border-radius: 10px;
    box-shadow: #c8ff70 0px 0px 2px;
    padding: 0.5vw;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    img {
      width: 100%;
    }

    &:hover {
      box-shadow: #86bd2f 0px 0px 2px;
      scale: 1.1;
    }

    &:active {
      box-shadow: #4a7702 0px 0px 2px;
      scale: 0.9;
    }
  }


}
</style>
