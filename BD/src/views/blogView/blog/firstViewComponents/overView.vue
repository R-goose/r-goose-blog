<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import cocImg from '@/image/pictures/coc.png';
import brawlStarsImg from '@/image/pictures/荒野乱斗.png';
import genshinImg from '@/image/pictures/原神.png';
import palworldImg from '@/image/pictures/Palworld.png';
import kingdomRushImg from '@/image/pictures/KingdomRush.png';
import partyAnimalsImg from '@/image/pictures/PartyAnimals.png';

const ROW_COUNT = 6;

const details = ref({
  gameList: [
    { title: '我的常玩', isTitle: true },
    { name: '部落冲突 Clash of Clans', img: cocImg, introduction: '塔防策略游戏，玩了很长时间', isHover: false, isHover: false },
    { name: '荒野乱斗 Brawl Stars', img: brawlStarsImg, introduction: '类moba游戏，手机端游戏', isHover: false },
    { name: '原神 Genshin Impact', img: genshinImg, introduction: '开放大世界类游戏，我当养成游戏玩了', isHover: false },
    { name: '幻兽帕鲁 Palworld', img: palworldImg, introduction: '开放大世界类游戏，可养成，可战斗，也是在Steam上玩的', isHover: false },
    { name: '王国保卫战 Kingdom Rush', img: kingdomRushImg, introduction: '塔防类游戏，主要是在Steam上玩', isHover: false },
    { name: '猛兽派对 Party Animals', img: partyAnimalsImg, introduction: '小动物打架游戏，联机才好玩', isHover: false }
  ],
  technicalStack: [
    { title: '我的常用技术栈', isTitle: true },
    { name: 'HTML', color: '#FFCCCC', introduction: '语义化标签构建页面骨架', isHover: false },
    { name: 'CSS', color: '#CCEEFF', introduction: 'Flex/Grid布局，响应式设计', isHover: false },
    { name: 'JavaScript', color: '#FFF2CC', introduction: 'ES6+，DOM操作，异步编程', isHover: false },
    { name: 'Vue', color: '#41bf83', introduction: 'Vue3+Composition API，Pinia', isHover: false },
    { name: 'C', color: '#E6CCFF', introduction: '算法数据结构基础实现', isHover: false },
    { name: 'Java', color: '#CCFFFA', introduction: 'Spring Boot，基础API开发', isHover: false }
  ],
  introduction: [
    { title: '我的介绍', isTitle: true },
    { name: 'infp', color: '#f07455', introduction: '内向好奇，富有同理心', isHover: false },
    { name: '辣椒狂', color: '#CCFFFA', introduction: '无辣不欢，研究辣椒料理', isHover: false },
    { name: '羽毛球', color: '#41bf83', introduction: '每周固定运动，享受挥拍', isHover: false },
    { name: '音乐', color: '#E6CCFF', introduction: '独立音乐与电影配乐爱好者', isHover: false },
  ]
});

const makeRepeated = (items) => Array(6).fill(items).flat();

const repeatedGameItems = computed(() => {
  const items = details.value.gameList.filter(item => !item.isTitle);
  return makeRepeated(items);
});

const repeatedTechItems = computed(() => {
  const items = details.value.technicalStack.filter(item => !item.isTitle);
  return makeRepeated(items);
});

const repeatedIntroItems = computed(() => {
  const items = details.value.introduction.filter(item => !item.isTitle);
  return makeRepeated(items);
});

// 底部详情逻辑
const chooseedArray = ref(null);
const detailRef = ref(null);
const childWidth = ref('auto');
const focusChildWidth = ref('auto');

const checkChooseed = (index) => {
  if (index === 0) {
    chooseedArray.value = details.value.gameList.filter(item => !item.isTitle);
  } else if (index === 1) {
    chooseedArray.value = details.value.technicalStack.filter(item => !item.isTitle);
  } else if (index === 2) {
    chooseedArray.value = details.value.introduction.filter(item => !item.isTitle);
  }
  updateChildWidth();
};

const updateChildWidth = () => {
  if (detailRef.value && chooseedArray.value?.length > 0) {
    const containerWidth = detailRef.value.clientWidth;
    focusChildWidth.value = `${containerWidth / 2}px`;
    childWidth.value = `${containerWidth / chooseedArray.value.length}px`;
  }
};

const focusChild = (index) => {
  chooseedArray.value.forEach((item, idx) => {
    item.isHover = idx === index;
  });
}

const focusChildOut = () => {
  updateChildWidth();
  chooseedArray.value.forEach(item => {
    item.isHover = false;
  });
}

onMounted(() => {
  chooseedArray.value = details.value.gameList.filter(item => !item.isTitle);
  updateChildWidth();
  window.addEventListener('resize', updateChildWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateChildWidth);
});
</script>

<template>
  <div class="overview-container">
    <div class="top-container">
      <!-- 游戏 -->
      <div class="item-group">
        <div class="container-box game-box">
          <div class="rotated-wrapper">
            <div v-for="rowIndex in ROW_COUNT" :key="`game-row-${rowIndex}`" class="scrolling-row"
              :style="{ animationDelay: `-${rowIndex * 5}s` }">
              <img v-for="(item, index) in repeatedGameItems" :key="`game-${rowIndex}-${index}`" :src="item.img"
                :alt="item.name" class="scroll-item" />
            </div>
          </div>
        </div>
        <div class="detail-box" @click="checkChooseed(0)">
          <span>查看详情</span>
        </div>
      </div>

      <!-- 技术栈 -->
      <div class="item-group">
        <div class="container-box technical-box">
          <div class="rotated-wrapper">
            <div v-for="rowIndex in ROW_COUNT" :key="`tech-row-${rowIndex}`" class="scrolling-row"
              :style="{ animationDelay: `-${rowIndex * 5}s` }">
              <span v-for="(item, index) in repeatedTechItems" :key="`tech-${rowIndex}-${index}`" class="scroll-item"
                :style="{ backgroundColor: item.color }">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="detail-box" @click="checkChooseed(1)">
          <span>查看详情</span>
        </div>
      </div>

      <!-- 个人介绍 -->
      <div class="item-group">
        <div class="container-box introduction-box">
          <div class="rotated-wrapper">
            <div v-for="rowIndex in ROW_COUNT" :key="`intro-row-${rowIndex}`" class="scrolling-row"
              :style="{ animationDelay: `-${rowIndex * 5}s` }">
              <span v-for="(item, index) in repeatedIntroItems" :key="`intro-${rowIndex}-${index}`" class="scroll-item"
                :style="{ backgroundColor: item.color }">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="detail-box" @click="checkChooseed(2)">
          <span>查看详情</span>
        </div>
      </div>
    </div>

    <!-- 底部详情卡片 -->
    <div class="bottom-container">
      <div class="center-box" ref="detailRef">
        <div v-for="(item, index) in chooseedArray" :key="index" class="card"
          :style="{ width: item.isHover ? focusChildWidth : childWidth }" :class="{ mask: !item.isHover }"
          @mouseover="focusChild(index)" @mouseout="focusChildOut(index)">
          <img :src=item.img alt="" class="detail-img">
          <div class="title">{{ item.name }}</div>
          <div class="description">{{ item.introduction }}</div>
        </div>
      </div>
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
    height: 25vh;
    gap: 2vw;
    justify-content: center;
    align-items: flex-start;
    margin-top: 1vh;

    .item-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1vh;
      width: 30vw;
    }

    .detail-box {
      width: 30vw;
      height: 20vh;
      top: -17vh;
      padding: 0.5vw;
      font-size: 2.5vw;
      font-weight: 100;
      color: #be991f;
      border-radius: 1vw;
      background: linear-gradient(to top, #fffeef 50%, #d9eaff);
      border-bottom: #ffe58f solid 0.2vw;
      // box-shadow: inset 0 0 2vh #ffffff;
      position: relative;
      box-sizing: border-box;
      z-index: 1;
      cursor: pointer;

      span {
        position: absolute;
        height: 2vh;
        line-height: 2vh;
        bottom: 0.5vh;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.1rem;
      }
    }

    .container-box {
      width: 30vw;
      height: 20vh;
      border-radius: 0.5vw;
      box-shadow: 0 0 1vh #d3d3d3;
      background: linear-gradient(-150deg,
          rgba(255, 240, 240),
          rgba(255, 255, 220),
          rgba(240, 255, 240),
          rgba(240, 255, 255),
          rgb(240, 255, 241));
      position: relative;
      overflow: hidden;
      z-index: 2;
      border: #f1f1f1 solid 1px;
      // border-bottom: #242424 solid 0.3vw;
    }

    .rotated-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-25deg);
      width: 200%;
      height: 200%;
      transform-origin: center;
      pointer-events: none;
      // background-image: linear-gradient(to bottom, #ffffff, #a1ffee);
    }

    .scrolling-row {
      display: flex;
      white-space: nowrap;
      width: max-content;
      margin-top: 7vh;
      animation: scrollLeftMulti 300s linear infinite;
    }

    .scroll-item {
      flex-shrink: 0;
      border-radius: 0.8vh;
      transition: all 0.2s ease-in-out;
      cursor: default;
      pointer-events: auto;

      &:hover {
        transform: scale(1.2);
      }
    }

    .game-box .scroll-item {
      width: 2.5vw;
      margin-right: 5vw;
      box-shadow: #cfcfcf 0 1vw 3vh;
    }

    .technical-box .scroll-item,
    .introduction-box .scroll-item {
      padding: 0.3vw 1vw;
      margin-right: 2vw;
      color: #242424;
      box-shadow: #cfcfcf -0.5vw 1vw 4vh;
    }
  }

  .bottom-container {
    display: flex;
    flex: 1;
    align-items: center;
    width: 94vw;
    position: relative;
    bottom: 1vh;
    justify-content: center;

    .center-box {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      border-right: #888888 solid 0.15vw;

      .card {
        border-left: #888888 solid 0.15vw;
        border-top: #888888 solid 0.15vw;
        border-bottom: #888888 solid 0.15vw;
        background-color: #ffffff;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;

        // &::after {
        //   content: "";
        //   position: absolute;
        //   top: 0;
        //   left: 0;
        //   width: 100%;
        //   height: 100%;
        //   background-color: rgba(0, 0, 0, 0.226);
        //   z-index: 1;
        //   transition: all 0.2s ease-in-out;
        //   // opacity: 0;
        // }

        .detail-img {
          width: 100%;
          object-fit: contain;
          position: relative;
          top: 0;
        }

        .title {
          position: relative;
          z-index: 2;
          font-size: 1.5rem;
          font-weight: 500;
          color: #333333;
          margin-top: 1rem;
        }


      }
    }
  }
}

.mask {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.15);
  z-index: 500;
}

@keyframes scrollLeftMulti {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(50%);
  }
}
</style>
