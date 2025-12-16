<script setup>
import { ref } from 'vue'
// import avatarImg from '/src/image/avatar/1myAvatar.png'
const articleCount = ref(120)
const readCount = ref(3456)
const commentCount = ref(78)
const likeCount = ref(234)
const messageCount = ref(10)
const waitCount = ref(5)
const day = ref(365)
</script>

<template>
  <div class="myBlog1">
    <div class="leftContainer">
      <div>
        <img :src=avatarImg alt="" class="avatar">
      </div>
      <div class="introuduce-box">
        <span>烧鹅</span>
        <span>前端开发</span>
        <span>来到博客已经{{ day }}天</span>
      </div>
      <div class="static-box">
        数据统计
        <div>
          <span>文章<span>{{ articleCount }}</span></span>
          <span>阅读<span>{{ readCount }}</span></span>
          <span>评论<span>{{ commentCount }}</span></span>
          <span>点赞<span>{{ likeCount }}</span></span>
          <span>消息<span>{{ messageCount }}</span></span>
          <span>代办<span>{{ waitCount }}</span></span>
        </div>

      </div>
    </div>
    <div class="rightContainer">
      <div class="right-top">
        <div>便签</div>
        <div>时间</div>
      </div>
      <div class="right-bottom">
        <div>待办事项</div>
        <div>热门文章</div>
        <div>数据统计图表</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.myBlog1 {
  position: relative;
  left: 1vw;
  top: 6vh;
  height: 89vh;
  width: 98vw;
  display: flex;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #333;
}

@mixin flexible-box($width: auto, $height: auto) {
  border-radius: 12px;
  box-shadow: 0 0.1vw 0.3vw rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  position: relative;
  width: $width;
  height: $height;


  &::before {
    content: '';
    position: absolute;
    top: -0.2vw;
    left: -0.2vw;
    right: -0.2vw;
    bottom: -0.2vw;
    border-radius: inherit;
    border: 2px solid #e4ffc6;
    border-top: none;
    z-index: -2;
    filter: blur(5px);
  }

}

.leftContainer {
  width: 20vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1vh 0;

  .avatar {
    margin-top: 3vh;
    width: 12vw;
    height: 12vw;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #e0e0e0;
    /* 占位背景 */
  }

  .introuduce-box {
    margin-top: 2.5vh;
    width: 14vw;
    height: 12vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.6vh;
    padding: 1vh;
    @include flexible-box(14vw, 12vh);

    span:nth-child(1) {
      font-size: 1.4rem;
      font-weight: bold;
      color: #2c3e50;
    }

    span:nth-child(2) {
      font-size: 0.95rem;
      color: #7f8c8d;
    }

    span:nth-child(3) {
      font-size: 0.9rem;
      color: #95a5a6;
    }
  }

  .static-box {
    margin-top: 3vh;
    width: 18vw;
    height: 32vh;
    padding: 1.5vh;
    display: flex;
    flex-direction: column;
    @include flexible-box(18vw, 32vh);

    >div:first-child {
      font-weight: bold;
      margin-bottom: 1.5vh;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    >div:last-child {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.2vh;
      flex-grow: 1;

      span {
        display: flex;
        justify-content: space-between;
        padding: 0.6vh 0.8vw;
        background-color: #fafafa;
        border-radius: 6px;
        font-size: 0.95rem;

        &:nth-child(odd) {
          background-color: #f8f9fa;
        }

        span:last-child {
          font-weight: bold;
          color: #e74c3c;
        }
      }
    }
  }
}

.rightContainer {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 1.5vw;
  gap: 1vh;
}

.right-top,
.right-bottom {
  box-sizing: border-box;
  display: flex;
  gap: 1vw;
  flex: 1;
}

.right-top>div,
.right-bottom>div {
  flex: 1;
  padding: 1.5vh 1vw;
  @include flexible-box(auto, 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}
</style>
