<script setup>
import { ref } from 'vue';
import cocImg from '@/image/pictures/coc.png';
import brawlStarsImg from '@/image/pictures/荒野乱斗.png';
import genshinImg from '@/image/pictures/原神.png';
import palworldImg from '@/image/pictures/Palworld.png';
import kingdomRushImg from '@/image/pictures/KingdomRush.png';
import partyAnimalsImg from '@/image/pictures/PartyAnimals.png';

const details = ref({
  gameList: [
    { title: '我的常玩', isTitle: true },
    { name: '部落冲突 Clash of Clans', img: cocImg, introduction: '塔防策略游戏，玩了很长时间' },
    { name: '荒野乱斗 Brawl Stars', img: brawlStarsImg, introduction: '类moba游戏，手机端游戏' },
    { name: '原神 Genshin Impact', img: genshinImg, introduction: '开放大世界类游戏，我当养成游戏玩了' },
    { name: '幻兽帕鲁 Palworld', img: palworldImg, introduction: '开放大世界类游戏，可养成，可战斗，也是在Steam上玩的' },
    { name: '王国保卫战 Kingdom Rush', img: kingdomRushImg, introduction: '塔防类游戏，主要是在Steam上玩' },
    { name: '猛兽派对 Party Animals', img: partyAnimalsImg, introduction: '小动物打架游戏，联机才好玩' }
  ],
  technicalStack: [
    { title: '我的常用技术栈', isTitle: true },
    { name: 'HTML', color: '#FFCCCC', introduction: '语义化标签构建页面骨架' },
    { name: 'CSS', color: '#CCEEFF', introduction: 'Flex/Grid布局，响应式设计' },
    { name: 'JavaScript', color: '#FFF2CC', introduction: 'ES6+，DOM操作，异步编程' },
    { name: 'Vue', color: '#41bf83', introduction: 'Vue3+Composition API，Pinia' },
    { name: 'C', color: '#E6CCFF', introduction: '算法数据结构基础实现' },
    { name: 'Java', color: '#CCFFFA', introduction: 'Spring Boot，基础API开发' }
  ],
  introduction: [
    { title: '我的介绍', isTitle: true },
    { name: 'infp', color: '#f07455', introduction: '内向好奇，富有同理心' },
    { name: '辣椒狂', color: '#CCFFFA', introduction: '无辣不欢，研究辣椒料理' },
    { name: '羽毛球', color: '#41bf83', introduction: '每周固定运动，享受挥拍' },
    { name: '音乐', color: '#E6CCFF', introduction: '独立音乐与电影配乐爱好者' },
  ]
});
const gameListItem = ref(1);
const technicalStackItem = ref(1);
const introductionItem = ref(1);

</script>

<template>
  <div class="overview-container">
    <div class="top-container">
      <div class="container-box game-box">
        <div class="text-box">游 戏 库</div>
        <div v-for="value in 10" :key="value">
          <div class="icons" v-for="value in 10" :key="value">
            <span v-for="(item, value) in details.gameList" :key="value">
              <img v-if="!item.isTitle" :src="item.img" :alt="item.name">
            </span>
          </div>
        </div>
      </div>
      <div class="detail-box box1">
        <div class="content">
          <div class="inner-details">
            <div :style="{ visibility: gameListItem > 1 ? 'visible' : 'hidden' }" @click="gameListItem--" class="larr">
              &larr;</div>
            <img :src="details.gameList[gameListItem].img" alt="">
            <div class="details-text">
              <div>名称：{{ details.gameList[gameListItem].name }}</div>
              <div>简介：{{ details.gameList[gameListItem].introduction }}</div>
            </div>
            <div :style="{ visibility: gameListItem < details.gameList.length - 1 ? 'visible' : 'hidden' }"
              @click="gameListItem++" class="rarr">&rarr;</div>
          </div>
        </div>
        <span>{{ details.gameList[0].title }}</span>
      </div>
      <div class="container-box technical-box">
        <div class="text-box">技 术 栈</div>
        <div v-for="value in 10" :key="value">
          <div class="icons" v-for="value in 10" :key="value">
            <span v-for="(item, value) in details.technicalStack" :key="value">
              <span v-if="!item.isTitle" :style="{ backgroundColor: item.color }" style="color: #ffffff;">{{ item.name
              }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="detail-box box2">
        <div class="content">
          <div class="inner-details">
            <div :style="{ visibility: technicalStackItem > 1 ? 'visible' : 'hidden' }" @click="technicalStackItem--"
              class="larr">
              &larr;</div>
            <div class="details-text">
              <div>名称：{{ details.technicalStack[technicalStackItem].name }}</div>
              <div>简介：{{ details.technicalStack[technicalStackItem].introduction }}</div>
            </div>
            <div :style="{ visibility: technicalStackItem < details.technicalStack.length - 1 ? 'visible' : 'hidden' }"
              @click="technicalStackItem++" class="rarr">&rarr;</div>
          </div>
        </div>
        <span>{{ details.technicalStack[0].title }}</span>
      </div>
      <div class="container-box introduction-box">
        <div class="text-box">介 绍</div>
        <div v-for="value in 10" :key="value">
          <div class="icons" v-for="value in 10" :key="value">
            <span v-for="(item, value) in details.introduction" :key="value">
              <span v-if="!item.isTitle" :style="{ backgroundColor: item.color }" style="color: #ffffff;">{{ item.name
                }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="detail-box box3">
        <div class="content">
          <div class="inner-details">
            <div :style="{ visibility: introductionItem > 1 ? 'visible' : 'hidden' }" @click="introductionItem--"
              class="larr">
              &larr;</div>
            <div class="details-text">
              <div>名称：{{ details.introduction[introductionItem].name }}</div>
              <div>简介：{{ details.introduction[introductionItem].introduction }}</div>
            </div>
            <div :style="{ visibility: introductionItem < details.introduction.length - 1 ? 'visible' : 'hidden' }"
              @click="introductionItem++" class="rarr">&rarr;</div>
          </div>
        </div>
        <span>{{ details.introduction[0].title }}</span>
      </div>
    </div>
    <div class="bottom-container">
      <div class="center-box"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overview-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5vh;

  .top-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 30vh;
    gap: 1vw;
    justify-content: center;
    align-items: center;

    .detail-box {
      position: absolute;
      top: -13%;
      left: 11.5vw;
      transform: translate(0%, 100%);
      width: 25vw;
      height: 20vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2.5vw;
      font-weight: 800;
      color: #ffffff;
      z-index: 2;
      border-radius: 1vw;

      .content {
        position: absolute;
        bottom: 19%;
        border: #ffffff solid 0.2vh;
        border-radius: 1vw;
        width: 92%;
        height: 40%;


        .inner-details {
          width: 100%;
          height: 100%;
          font-size: 1rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;

          .larr {
            width: 1vw;
            height: 1vw;
            line-height: 1vw;
            position: absolute;
            left: 0.5vw;
            border-radius: 0.4vw;
            border: #ffffff solid 0.2vh;
            border-left: none;
            border-right: none;
          }

          .rarr {
            width: 1vw;
            height: 1vw;
            line-height: 1vw;
            position: absolute;
            right: 0.5vw;
            border-radius: 0.4vw;
            border: #ffffff solid 0.2vh;
            border-left: none;
            border-right: none;
          }

          .details-text {
            position: relative;
            width: 60%;
            left: -5%;
          }

          img {
            width: 2.3vw;
            border-radius: 0.8vh;
            margin-left: 1.5vw;
            transition: all 0.2s ease-in-out;
            cursor: pointer;

            &:hover {
              scale: 1.1;
            }
          }
        }
      }

      span {
        position: absolute;
        height: 2vh;
        line-height: 2vh;
        bottom: 0;
        font-size: 1rem;
      }
    }

    .box1 {
      background-color: #f07455;
      border-bottom: #f07455 solid 0.2vw;
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: translate(0%, 150%);
      }
    }

    .box2 {
      margin-left: 1vw;
      transform: translate(100%, 100%);
      background-color: #83f062;
      border-bottom: #83f062 solid 0.2vw;
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: translate(100%, 150%);
      }
    }

    .box3 {
      margin-left: 27vw;
      transform: translate(100%, 100%);
      background-color: #5ccbf7;
      border-bottom: #5ccbf7 solid 0.2vw;
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: translate(100%, 150%);
      }
    }

    .container-box {
      position: relative;
      width: 25vw;
      height: 20vh;
      border-radius: 1vw;
      box-shadow: inset 0 0 1vh #dddddd;
      background-image: linear-gradient(to left bottom, #ffffff, #effffc);
      z-index: 3;

      .text-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5vw;
        font-weight: 800;
        z-index: 4;
        background-color: #ffffff49;
        // color: #d4d4d4cb;
      }
    }

    .game-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      color: #f07455;
      border-top: #f07455 solid 0.2vh;

      .icons {
        position: relative;
        width: 150%;
        transform: rotateZ(-25deg);
        display: flex;
        margin-right: -4vw;
        animation: iconsMoving 200s linear infinite;
        top: 9vh;
        margin-top: 5vh;
        filter: blur(0.3vh);

        img {
          width: 2.3vw;
          border-radius: 0.8vh;
          margin-right: 5vw;
          box-shadow: #d4d4d4cb -1.5vw 1vw 3vh;
          transition: all 0.2s ease-in-out;
          cursor: pointer;

          &:hover {
            scale: 1.2;
          }
        }
      }
    }

    .technical-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      border-top: #83f062 solid 0.2vh;
      color: #83f062;
      overflow: hidden;

      .icons {
        position: relative;
        transform: rotateZ(-25deg);
        display: flex;
        margin-right: -10vw;
        animation: iconsMoving 100s linear infinite;
        top: 9vh;
        margin-top: 5vh;

        span {
          width: auto;
          border-radius: 0.8vh;
          padding: 0vw 1vw;
          margin-right: 2vw;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
          filter: blur(0.1vh);

          &:hover {
            scale: 1.2;
          }
        }
      }
    }

    .introduction-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      border-top: #5ccbf7 solid 0.2vh;
      color: #5ccbf7;
      overflow: hidden;

      .icons {
        position: relative;
        width: 150%;
        transform: rotateZ(-25deg);
        display: flex;
        margin-right: -9vw;
        animation: iconsMoving 100s linear infinite;
        top: 9vh;
        margin-top: 5vh;

        span {
          width: 2.3vw;
          border-radius: 0.8vh;
          padding: 0vw 1vw;
          margin-right: 5vw;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
          filter: blur(0.1vh);

          &:hover {
            scale: 1.2;
          }
        }
      }
    }
  }

  .bottom-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 60vh;
    gap: 1vw;
    justify-content: center;
    // background-color: #4b2f2f;

    .center-box {
      width: 50vh;
      height: 50vh;
      border-radius: 50%;
      box-shadow: 0 0 0.2vh #5c5a5f;
    }
  }
}

@keyframes iconsMoving {
  0% {
    transform: rotateZ(-25deg) translate(-0%, 100%);
  }

  100% {
    transform: rotateZ(-25deg) translate(100%, -50%);
  }
}
</style>
