<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import mainPage from './pageContainer.vue'
import InteractiveDecorations from '@/components/InteractiveDecorations.vue'
import scrollBar from '@/components/scrollBar.vue';
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

const pageHeight = ref(0)
const viewportHeight = ref(0)
const mainPageRef = ref(null)
const pageTotalHeight = ref(0)

onMounted(() => {
  const mainPageEl = mainPageRef.value.$el
  // 子组件高度
  const mainPageHeight = {
    offset: mainPageEl.offsetHeight, // 包含padding、边框
    scroll: mainPageEl.scrollHeight, // 包含滚动内容
    client: mainPageEl.clientHeight  // 仅包含可见区域（不含滚动条）
  }
  console.log('mainPage子组件高度：', mainPageHeight)
  // 获取整个页面的高度
  pageHeight.value = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  )

  // 获取视口高度
  viewportHeight.value = window.innerHeight || document.documentElement.clientHeight
  pageTotalHeight.value = pageHeight.value + mainPageHeight.offset
})

onUnmounted(() => {
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
  </div>
  <div class="pos-a mt100 full-w">
    <a href="" id="top"></a>
    <mainPage ref="mainPageRef"></mainPage>
    <!-- <scrollBar :pageTotalHeight="pageTotalHeight" :currentPageHeight="viewportHeight"></scrollBar> -->
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
</style>
