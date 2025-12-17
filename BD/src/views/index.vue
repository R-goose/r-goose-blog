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

const isShowAll = ref(false)
const mouseLeaveTimer = ref(null)
const mouseLeaveHandler = () => {
  clearTimeout(mouseLeaveTimer.value)
  mouseLeaveTimer.value = setTimeout(() => {
    isShowAll.value = false
  }, 1000)
}

const guideRef = ref(null)
const lastPageIndex = ref(0)
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
  lastPageIndex.value = curremPageIndex
  localStorage.setItem('lastPageIndex', lastPageIndex.value)
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
  curremComponentIndex.value = localStorage.getItem('lastPageIndex') ? parseInt(localStorage.getItem('lastPageIndex')) : 0
  navList.forEach((item, index) => {
    item.isActive = index === curremComponentIndex.value;
  })
  router.push({ name: navList[curremComponentIndex.value].routeName })
  isFirstPage.value = router.currentRoute.value.name === 'firstView'
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeights);
})

</script>

<template>
  <div class="main text-center" ref="aTop">
    <header class="header-container" @mouseover="isShowAll = true" @mouseleave="mouseLeaveHandler()"
      :style="{ width: isShowAll ? '100vw' : '12vw', borderRadius: isShowAll ? '0px' : '10vw' }">
      <div class="title">
        <span v-show="!isShowAll">&lsaquo;&nbsp;..</span>
        R-Goose's Blog
        <span v-show="!isShowAll">..&nbsp;&rsaquo;</span>
      </div>
      <div class="expandable-content" :class="{ expanded: isShowAll }">
        <nav class="nav-left">
          <span v-for="(item, index) in navList" :key="index" @click="changePage(index)"
            :class="{ active: item.isActive, hidden: !item.meta.public }">
            {{ item.name }}
          </span>
        </nav>

        <div class="other-right">
          <div class="avatar">
            <img src="@/image/icons/avatar.png" alt="Avatar" draggable="false" />
          </div>
          <div @click="logout()" class="logout">
            <img src="@/image/icons/logout.png" alt="Logout" draggable="false" />
          </div>
        </div>
      </div>
    </header>
    <main>
      <!-- <themeChanger></themeChanger> -->
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
  height: 100%;
  background: linear-gradient(135deg, #f7fef9 0%, #eef6ff 100%);
  overflow: visible;

  header {
    position: fixed;
    top: 0vh;
    height: 4.5vh;
    width: 20vw;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.1vw solid #caf0ca;
    border-top: none;
    z-index: 20;
    background: rgba(255, 255, 255, 0.377);
    backdrop-filter: blur(8px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    .title {
      font-size: 1.1rem;
      font-weight: 100;
      background: linear-gradient(to right, #89bb39, #7da2d1);
      background-clip: text;
      color: transparent;
      white-space: nowrap;
      letter-spacing: 0.5px;
      z-index: 51;
    }

    .expandable-content {
      position: fixed;
      inset: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.5rem;
      opacity: 0;
      transform: scaleX(0);
      transform-origin: center;
      transition:
        transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1),
        opacity 0.35s ease;
      pointer-events: none;
      border-radius: inherit;
      background: rgba(255, 255, 255, 0.158);

      &.expanded {
        opacity: 1;
        transform: scaleX(1);
        pointer-events: auto;
      }

      .nav-left {
        display: flex;
        gap: 1rem;
        margin-left: 0.5vw;


        span {
          padding: 0.4vh 0.8vw;
          border: 2px solid #bef06e62;
          border-radius: 0.5vw;
          cursor: pointer;
          color: #7a7a7a;
          font-weight: 100;
          font-size: 0.95rem;
          white-space: nowrap;
          transition: all 0.25s ease-in-out;

          &:hover:not(.active) {
            border-color: #c3ebc5;
            color: #a0eb96;
            transform: translateY(-1px) scale(1.03);
          }

          &.active {
            border-color: #bfffc2;
            color: #86ec79;
            // font-weight: 600;
            transform: translateY(-1px) scale(1.1);
            cursor: default;
          }

          &.hidden {
            display: none;
          }
        }
      }

      .other-right {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-right: 1vw;

        .avatar,
        .logout {
          width: 24px;
          height: 24px;
          cursor: pointer;
          transition: transform 0.25s ease;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          &:hover {
            transform: scale(1.15);
          }
        }

        .avatar {
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 0 6px rgba(200, 255, 200, 0.6);
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
