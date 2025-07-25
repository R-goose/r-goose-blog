<script setup>
import { onMounted } from 'vue'
import mainPage from './mainPage.vue'
import InteractiveDecorations from '@/components/InteractiveDecorations.vue'
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

onMounted(() => {
  // window.addEventListener('scroll', handleScroll)
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
    <mainPage></mainPage>
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
  background-image: linear-gradient(to left top, #3dff64 30%, #71b8ff 60%, #8d3cff);
  background-clip: text;
  color: transparent;
  text-shadow:
    0px 2px 10px rgba(86, 171, 255, 0.5),
    0px 5px 15px rgba(141, 60, 255, 0.327);
  z-index: 9999;

  span {
    position: relative;
    bottom: 1.5vh;
    background-image: none;
    color: navajowhite;
    text-shadow: #008b74 0px 5px 10px;
    z-index: 3;
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
