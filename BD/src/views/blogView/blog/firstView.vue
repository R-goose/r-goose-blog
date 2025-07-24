<script setup>
import mainPage from './mainPage.vue'
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
</script>
<template>
  <div class="pos-a full-w first flex flex-ac flex-row">
    <img src="@/image/pictures/喝水.png" alt="" class="br-circle w500px h500px ml10" draggable="false" />
    <div class="ml2">
      <h1 class="fs7rem name">R-Goose<span>🦖</span></h1>
      <div class="app-icon flex flex-row mt3" draggable="false">
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
      <div class="purple"></div>
    </div>
  </div>
  <div class="pos-a mt100 full-w">
    <mainPage></mainPage>
  </div>
</template>
<style scoped lang="scss">
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
    z-index: 2;
  }
}

.next-step {

  .red {
    position: absolute;
    bottom: 60vh;
    right: 20vw;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background-color: #f42e2e;
    box-shadow: #f42e2e 0px 0px 100px 80px;
    filter: blur(10px);
    z-index: 1;
  }

  .green {
    position: absolute;
    bottom: 10vh;
    right: 50vw;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background-color: #3dff64;
    box-shadow: #3dff64 0px 0px 100px 80px;
    filter: blur(10px);
    z-index: 1;
  }

  .purple {
    position: absolute;
    bottom: 10vh;
    right: 50vw;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background-color: #b53dff;
    box-shadow: #b53dff 0px 0px 100px 80px;
    filter: blur(10px);
    z-index: 1;
  }

  .blue {
    position: absolute;
    bottom: 10vh;
    right: 50vw;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background-color: #3daeff;
    box-shadow: #3daeff 0px 0px 100px 80px;
    filter: blur(10px);
    z-index: 1;
  }

  .yellow {
    position: absolute;
    bottom: 30vh;
    right: 30vw;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background-color: #ffef3d;
    box-shadow: #ffef3d 0px 0px 100px 80px;
    filter: blur(1s0px);
    z-index: 1;
  }


}
</style>
