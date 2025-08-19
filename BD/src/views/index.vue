<script setup>
import { ref, onMounted, onUnmounted, reactive, markRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import InteractiveDecorations from '@/components/InteractiveDecorations.vue'
import scrollBar from '@/components/scrollBar.vue'
import HomePage from '@/views/blogView/blog/homePage.vue'
import myBlog from '@/views/blogView/blog/myBlog.vue'
import dataView from '@/views/oaView/indexPage.vue'
import dataScreen from '@/views/screenView/indexPage.vue'
import rToast from '@/components/r-ui/r-toast.vue'

const router = useRouter();
const route = useRoute();
const pageHeight = ref(0)
const viewportHeight = ref(0)
const mainPageRef = ref(null)
const pageTotalHeight = ref(0)
const handleCilck = (name) => {
  const a = document.createElement('a')
  switch (name) {
    case 'GitHub':
      a.href = 'https://github.com/R-Goose'
      break
    case 'CSDN':
      a.href = 'https://blog.csdn.net/Kunrichi'
      break
    case 'Gitee':
      a.href = 'https://gitee.com/kokomi123'
      break
    case 'wx':
      // a.href = 'weixin://dl/chat_redirect?params=43531945%2F19Yq90000019Yq'
      break
    case 'qq':
      // a.href = 'http://wpa.qq.com/msgrd?v=3&uin=123456&site=qq&menu=yes'
      break
    case 'Bilibili':
      a.href = 'https://space.bilibili.com/651770458'
      break
    case '小红书':
      a.href = 'https://www.xiaohongshu.com/user/profile/5f1d9d9d0000000001005a0a'
      break
  }
  a.target = '_blank'
  a.click()
}

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

onMounted(() => {
  updateHeights()
  window.addEventListener('resize', updateHeights);
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeights);
})

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
    routeName: 'RGoose',
    component: markRaw(HomePage),
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
  })
  curremComponentIndex.value = curremPageIndex;
  aTop.value.scrollIntoView({ behavior: 'auto', block: 'start' });
}

// 回到顶部
const toTop = () => {
  aTop.value.scrollIntoView({ behavior: 'auto', block: 'start' });
}

// 隐藏按钮
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

onMounted(() => {
  // 这里根据用户登录情况来判断是否展示数据后台的入口
})
</script>

<template>
  <div class="pos-a full-w first flex flex-ac flex-row">
    <img src="@/image/pictures/喝水.png" alt="" class="mainImg br-circle w500px h500px ml10" draggable="false" />
    <div class="ml2">
      <h1 class="fs7rem name ml6">R-Goose<span>🦖</span></h1>
      <div class="app-icon flex flex-row mt3 ml6" draggable="false">
        <div class="flex flex-column">
          <img src="@/image/pictures/github.png" alt="" draggable="false" title="我的GitHub"
            @click="handleCilck('GitHub')" />
          <span>GitHub</span>
        </div>
        <div class="flex flex-column">
          <img src="@/image/pictures/csdn.png" alt="" draggable="false" title="我的CSDN" @click="handleCilck('CSDN')" />
          <span>CSDN</span>
        </div>
        <div class="flex flex-column">
          <img src="@/image/pictures/gitee.png" alt="" draggable="false" title="我的Gitee"
            @click="handleCilck('Gitee')" />
          <span>Gitee</span>
        </div>
        <div class="flex flex-column">
          <img src="@/image/pictures/wx.png" alt="" draggable="false" title="我的微信" @click="handleCilck('wx')" />
          <span>微信</span>
        </div>
        <div class="flex flex-column">
          <img src="@/image/pictures/qq.png" alt="" draggable="false" title="我的QQ" @click="handleCilck('qq')" />
          <span>QQ</span>
        </div>
        <div class="flex flex-column">
          <img src="@/image/pictures/bilibili.png" alt="" draggable="false" title="我的Bilibili"
            @click="handleCilck('Bilibili')" />
          <span>Bilibili</span>
        </div>
        <div class="flex flex-column">
          <img src="@/image/pictures/小红书.png" alt="" draggable="false" title="我的小红书" @click="handleCilck('小红书')" />
          <span>小红书</span>
        </div>
      </div>
    </div>
    <div class="next-step">
      <div class="red"></div>
      <div class="green"></div>
      <div class="yellow"></div>
      <div class="blue"></div>
      <InteractiveDecorations></InteractiveDecorations>
      <div class="pos-a flex flex-center full-w full-h mt46 flex-column">
        <h2 class="fs1rem">往下看</h2>
        <a class="fs2rem down" href="#top">☝🏻</a>
      </div>
    </div>
    <scrollBar :pageTotalHeight="pageTotalHeight" :currentPageHeight="viewportHeight"></scrollBar>
  </div>
  <div class="main text-center" ref="aTop">
    <header class="flex flex-row gap1vw">
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
    <main class="mainContent">
      <component :is="navList[curremComponentIndex].component"></component>
    </main>
    <aside class="left">
      <div>去到底部</div>
    </aside>
    <aside class=" right" @click="toTop()" @contextmenu="closeButton($event)">
      <img src="/src/image/icons/toTop.png" alt="" draggable="false">
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
    <rToast :showToastFlag="showToastFlag" :toastText="toastText" @closeToast="handleToastClose()" ref="toastRf">回到顶部
    </rToast>
  </div>
</template>
<style scoped lang="scss">
.mainImg {
  z-index: 5;
  box-shadow: #ebebeb 0px 0px 40px 10px;
}

.first {
  height: 100vh;
}

.app-icon {
  position: relative;
  left: 7px;
  z-index: 2;

  img {
    width: 40px;
    height: 40px;
    border-radius: 20%;
    margin-right: 10px;
  }

  span {
    font: {
      size: 0.6rem;
      font-weight: 500;
    }

    width: 40px;
    // background-image: linear-gradient(to right, #ff8a00, #e52e71);
    background-clip: text;
    // color: transparent;
    text-align: center;
  }
}

.name {
  position: relative;
  background: linear-gradient(to left top, #3dff64 30%, #71b8ff 60%, #8d3cff);
  background-clip: text;
  background-size: 200% auto;
  color: transparent;
  text-shadow:
    0px 2px 10px rgba(86, 171, 255, 0.5),
    0px 5px 15px rgba(141, 60, 255, 0.327);
  z-index: 9999;
  animation: nameAnimate 5s linear infinite;

  span {
    position: absolute;
    bottom: 1.5vh;
    z-index: 3;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: rgb(150, 105, 38);
      text-shadow: #008b74 0px 5px 10px;
      font-size: 8rem !important;
    }
  }
}

@keyframes nameAnimate {
  0% {
    background-position: 200% center;
  }

  100% {
    background-position: 0% center;
  }
}

.next-step {
  position: absolute;
  width: 100%;
  height: 100%;

  .red {
    position: absolute;
    top: 18%;
    left: 24%;
    width: 14vw;
    height: 14vw;
    border-radius: 50%;
    background-color: rgba(244, 46, 46, 0.7);
    filter: blur(60px);
    z-index: 2;
  }

  .green {
    position: absolute;
    top: 50%;
    left: 6%;
    width: 18vw;
    height: 18vw;
    border-radius: 50%;
    background-color: rgba(61, 255, 100, 0.6);
    filter: blur(60px);
    z-index: 2;
  }

  .blue {
    position: absolute;
    top: 12%;
    left: 5%;
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
    background-color: rgba(61, 174, 255, 0.6);
    filter: blur(60px);
    z-index: 2;
  }

  .yellow {
    position: absolute;
    top: 50%;
    left: 20%;
    width: 13vw;
    height: 13vw;
    border-radius: 50%;
    background-color: rgba(255, 239, 61, 0.7);
    filter: blur(60px);
    z-index: 2;
  }
}

.down {
  rotate: 180deg;
  text-shadow: #ffd7c2 0px 0px 10px;
  animation: float 1s linear infinite;
  text-decoration: none;
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(0, -5px);
  }

  100% {
    transform: translate(0, 0);
  }
}

.main {
  width: 100%;
  height: 300vh;
  background: linear-gradient(45deg,
      rgba(255, 240, 240, 0.6),
      rgba(255, 255, 220, 0.6),
      rgba(240, 255, 240, 0.6),
      rgba(240, 255, 255, 0.6),
      rgba(250, 240, 255, 0.6));

  header {
    position: sticky;
    top: 0;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: 6vh;
    font-size: 1.3rem;
    color: #9e9e9e;
    font-weight: 300;
    // border-bottom: #e2ffb59d 1px solid;
    z-index: 6000;

    span {
      position: relative;
      width: auto;
      cursor: pointer;
      padding: 0.5vh 0.8vw;
      transition: all 0.3s ease;

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
      left: 1vw;
      background: linear-gradient(to right, #89bb39, #7da2d1);
      background-clip: text;
      color: transparent;
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
    position: absolute;
    width: 100%;
    top: 100vh;
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
</style>
