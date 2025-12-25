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
  }
  a.target = '_blank'
  a.click()
}
</script>

<template>
  <div class="pos-a full-w first flex flex-ac flex-row">
    <img src="@/image/pictures/喝水.png" alt="" class="br-circle w500px h500px ml10" draggable="false" />
    <div class="ml2">
      <h1 class="fs7rem name">R-Goose</h1>
      <div class="app-icon flex flex-row" draggable="false">
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
      </div>
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
    color: rgb(80, 80, 80);
    text-align: center;
  }
}

.name {
  background-image: linear-gradient(to bottom right, #3dff64, #56abff, #8d3cff);
  background-clip: text;
  color: transparent;
  text-shadow:
    0 0 10px rgba(61, 255, 100, 0.7),
    0 0 20px rgba(86, 171, 255, 0.5),
    0 0 30px rgba(141, 60, 255, 0.3);
  transition: text-shadow 0.3s ease;

  &:hover {
    text-shadow:
      0 0 15px rgba(61, 255, 100, 0.9),
      0 0 30px rgba(86, 171, 255, 0.7),
      0 0 45px rgba(141, 60, 255, 0.5);
  }
}
</style>
