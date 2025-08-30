<script setup>
import { ref, onMounted, onUnmounted, reactive, markRaw, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import InteractiveDecorations from '@/components/InteractiveDecorations.vue'

const router = useRouter();
const route = useRoute();
const pageHeight = ref(0)
const viewportHeight = ref(0)
const mainPageRef = ref(null)
const pageTotalHeight = ref(0)
const scrollTop = ref(0)
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

const updateHeights = async () => {
  await nextTick()
  const mainPageEl = mainPageRef.value;
  if (!mainPageEl) return;

  scrollTop.value = mainPageEl.scrollTop;
  console.log('元素滚动高度：', scrollTop.value); // 此时应正确打印高度

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

const pageRef = reactive({
  pageOne: {
    title: '烧鹅工作室',
    pageHeightFromTop: 0,
  },
  pageTwo: {
    title: '总览',
    pageHeightFromTop: 0,
  },
  pageThree: {
    title: '个人介绍',
    pageHeightFromTop: 0,
  },
  pageFour: {
    title: '社交圈',
    pageHeightFromTop: 0,
  },
  pageFive: {
    title: '技能',
    pageHeightFromTop: 0,
  },
  pageSix: {
    title: '游戏',
    pageHeightFromTop: 0,
  },
})

// 副标题打字动画
const title2 = ref('欢迎来到烧鹅工作室,这里是R-Goose的个人博客')
const title2Array = ref([])
const title2ArrayCopy = ref('')
const title2ArrayIndex = ref(0)
const isInputFinish = ref(false)
const showCursor = ref(true)
let reInputArrayInterval
let reInputArrayTimeout

const title2Animate = () => {
  isInputFinish.value = false
  title2ArrayCopy.value = ''
  title2ArrayIndex.value = 0
  title2Array.value = title2.value.split('')
  if (isInputFinish.value === false) {
    reInputArrayInterval = setInterval(() => {
      if (title2ArrayIndex.value < title2Array.value.length) {
        title2ArrayCopy.value += title2Array.value[title2ArrayIndex.value]
        title2ArrayIndex.value++
      } else {
        isInputFinish.value = true
        clearInterval(reInputArrayInterval)
      }
    }, 150)
  }
}

watch(isInputFinish, (newVal) => {
  if (newVal) {
    reInputArrayTimeout = setTimeout(() => {
      title2Animate()
    }, 5100)
  }
})
onMounted(async () => {
  updateHeights()
  window.addEventListener('resize', updateHeights);
  // mainPageRef.value.addEventListener('scroll', updateHeights);
  title2Animate()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeights);
  // mainPageRef.value.removeEventListener('scroll', updateHeights);
  clearTimeout(reInputArrayTimeout)

})
</script>

<template>
  <div class="firstView" ref="mainPageRef">
    <div class="pos-a full-w first flex flex-ac flex-row" ref="pageRef.pageOne">
      <img src="/src/image/avatar/1myAvatar.png" alt="" class="mainImg br-circle ml10" draggable="false" />
      <div class="ml2">
        <h1 class="fs7rem name ml6">R-Goose<span>🦖</span></h1>
        <div class="title2-container">
          <h2 class="title2" :class="{ 'title2Fade': isInputFinish }">{{ title2ArrayCopy }}</h2>
          <span class="cursor" v-if="showCursor && !isInputFinish"></span>
        </div>
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
        <div class="pos-a flex flex-center full-w mt87 flex-column">
          <h2 class="fs1rem">往下看</h2>
          <a class="fs2rem down" href="#top">☝🏻</a>
        </div>
      </div>
    </div>
    <div ref="pageRef.pageTwo">
      {{ pageRef.pageTwo.title }}
    </div>
    <div ref="pageRef.pageThree">
      {{ pageRef.pageThree.title }}
    </div>
    <div ref="pageRef.pageFour">
      {{ pageRef.pageFour.title }}
    </div>
    <div ref="pageRef.pageFive">
      {{ pageRef.pageFive.title }}
    </div>
    <div ref="pageRef.pageSix">
      {{ pageRef.pageSix.title }}
      <div></div>
    </div>
  </div>

</template>
<style scoped lang="scss">
.firstView {
  height: auto;
  overflow: hidden;

  >div:not(:first-child) {
    position: relative;
    margin-top: 5vh;
    height: 95vh;
  }

  &>div:last-child {
    height: 83vh;
  }
}

.mainImg {
  z-index: 5;
  width: 30vw;
  height: 30vw;
  // border-radius: 5vw;
  box-shadow: #ffffff 0px 0px 40px 10px;

}

.first {
  height: 95vh;
  position: relative;
  // overflow: hidden;
}

.app-icon {
  // margin-top: 10vh;
  position: relative;
  left: 7px;
  z-index: 2;
  cursor: pointer;

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
  background: linear-gradient(to left, #3ea772, #50b39a, #7ebed8);
  background-clip: text;
  background-size: 200% auto;
  color: transparent;
  -webkit-text-stroke: 0.1rem #ffffff;
  text-shadow:
    0px 2px 10px #7ff7bb7e,
    0px 5px 15px #6cd8bd38;
  z-index: 10;
  animation: nameAnimate 3s linear infinite;

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

.title2-container {
  margin-top: 2vh;
  position: absolute;
  width: 100%;
  height: 3vh;
  line-height: 3vh;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10vh;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .title2 {
    position: relative;
    font-weight: 400;
    font-size: 1.5rem;
    -webkit-text-stroke: 1px #2c2c2c;
  }

  .cursor {
    position: relative;
    width: 0.1vw;
    height: 3vh;
    background-color: #333;
    margin-left: 0.3vw;
    animation: blink 0.15s step-end infinite;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 300%;
      height: 1%;
      background-color: #333;
      animation: blink 0.15s step-end infinite;
    }

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 300%;
      height: 1%;
      background-color: #333;
      animation: blink 0.15s step-end infinite;
    }
  }
}

@keyframes blink {

  from,
  to {
    background-color: transparent;
  }

  50% {
    background-color: #333;
  }
}

.title2Fade {
  animation: titleFade 5.1s ease-in-out infinite;
}

@keyframes titleFade {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
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
  top: 0;
  left: 0;

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
</style>
