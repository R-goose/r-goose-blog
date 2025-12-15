<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
// 图片资源
import cocImg from '@/image/pictures/coc.png';
import brawlStarsImg from '@/image/pictures/荒野乱斗.png';
import genshinImg from '@/image/pictures/原神.png';
import palworldImg from '@/image/pictures/Palworld.png';
import kingdomRushImg from '@/image/pictures/KingdomRush.png';
import partyAnimalsImg from '@/image/pictures/PartyAnimals.png';

const ROW_COUNT = 6;

const details = ref({
  gameList: [
    { title: '常玩', isTitle: true },
    { name: '部落冲突 Clash of Clans', img: cocImg, introduction: '塔防策略游戏，玩了很长时间' },
    { name: '荒野乱斗 Brawl Stars', img: brawlStarsImg, introduction: '类MOBA游戏，手机端' },
    { name: '原神 Genshin Impact', img: genshinImg, introduction: '开放大世界，当养成游戏玩' },
    { name: '幻兽帕鲁 Palworld', img: palworldImg, introduction: '开放世界+宠物养成，Steam上玩' },
    { name: '王国保卫战 Kingdom Rush', img: kingdomRushImg, introduction: '经典塔防，Steam平台' },
    { name: '猛兽派对 Party Animals', img: partyAnimalsImg, introduction: '联机物理搞笑对战' }
  ],
  technicalStack: [
    { title: '常用技术栈', isTitle: true },
    { name: 'HTML', color: '#ff6b6b', introduction: '语义化标签构建页面骨架' },
    { name: 'CSS', color: '#4ecdc4', introduction: 'Flex/Grid布局，响应式设计' },
    { name: 'JavaScript', color: '#ffe66d', introduction: 'ES6+，DOM操作，异步编程' },
    { name: 'Vue', color: '#4361ee', introduction: 'Vue3 + Composition API + Pinia' },
    { name: 'C', color: '#9b5de5', introduction: '算法与数据结构基础实现' },
    { name: 'Java', color: '#00bbf9', introduction: 'Spring Boot，基础API开发' }
  ],
  introduction: [
    { title: '介绍', isTitle: true },
    { name: 'INFP', color: '#f07455', introduction: '内向好奇，富有同理心', emoji: '🧠' },
    { name: '辣椒狂', color: '#CCFFFA', introduction: '无辣不欢，研究辣椒料理', emoji: '🌶️' },
    { name: '羽毛球', color: '#41bf83', introduction: '每周固定运动，享受挥拍', emoji: '🏸' },
    { name: '音乐', color: '#E6CCFF', introduction: '独立音乐与电影配乐爱好者', emoji: '🎵' }
  ]
});

// 重复填充函数
const makeRepeated = (items) => Array(6).fill(items).flat();

const repeatedGameItems = computed(() =>
  makeRepeated(details.value.gameList.filter(item => !item.isTitle))
);
const repeatedTechItems = computed(() =>
  makeRepeated(details.value.technicalStack.filter(item => !item.isTitle))
);
const repeatedIntroItems = computed(() =>
  makeRepeated(details.value.introduction.filter(item => !item.isTitle))
);

// 底部详情
const currentTab = ref(0);
const tabs = ['gameList', 'technicalStack', 'introduction'];
const tabNames = ['常玩', '技术', '兴趣'];

const chooseedArray = computed(() => {
  return details.value[tabs[currentTab.value]].filter(item => !item.isTitle);
});

const switchTab = (index) => {
  currentTab.value = index;
};

</script>

<template>
  <div class="overview-container">
    <!-- 个性签名 -->
    <div class="motto">代码🆑🆑🆑 人生🤪🤪🤪</div>

    <div class="top-container">
      <!-- 游戏 -->
      <div class="item-group">
        <h3 class="section-title">🎮 {{ details.gameList[0].title }}</h3>
        <div class="container-box game-box">
          <div class="rotated-wrapper">
            <div v-for="rowIndex in ROW_COUNT" :key="`game-row-${rowIndex}`" class="scrolling-row"
              :style="{ animationDelay: `-${rowIndex * 5}s` }">
              <img v-for="(item, index) in repeatedGameItems" :key="`game-${rowIndex}-${index}`" :src="item.img"
                :alt="item.name" class="scroll-item" :title="item.introduction" />
            </div>
          </div>
        </div>
      </div>

      <!-- 技术栈 -->
      <div class="item-group">
        <h3 class="section-title">🛠️ {{ details.technicalStack[0].title }}</h3>
        <div class="container-box technical-box">
          <div class="rotated-wrapper">
            <div v-for="rowIndex in ROW_COUNT" :key="`tech-row-${rowIndex}`" class="scrolling-row"
              :style="{ animationDelay: `-${rowIndex * 5}s` }">
              <span v-for="(item, index) in repeatedTechItems" :key="`tech-${rowIndex}-${index}`" class="scroll-item"
                :style="{ backgroundColor: item.color }" :title="item.introduction">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 个人介绍 -->
      <div class="item-group">
        <h3 class="section-title">🌟 {{ details.introduction[0].title }}</h3>
        <div class="container-box introduction-box">
          <div class="rotated-wrapper">
            <div v-for="rowIndex in ROW_COUNT" :key="`intro-row-${rowIndex}`" class="scrolling-row"
              :style="{ animationDelay: `-${rowIndex * 5}s` }">
              <span v-for="(item, index) in repeatedIntroItems" :key="`intro-${rowIndex}-${index}`" class="scroll-item"
                :style="{ backgroundColor: item.color }" :title="item.introduction">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 标签切换器 -->
    <div class="tab-switcher">
      <button v-for="(name, idx) in tabNames" :key="idx" @click="switchTab(idx)"
        :class="{ active: currentTab === idx }">
        {{ name }}
      </button>
    </div>

    <!-- 底部详情卡片 -->
    <div class="bottom-container">
      <div class="center-box">
        <div v-for="(item, index) in chooseedArray" :key="index" class="card">
          <img v-if="item.img" :src="item.img" alt="" class="detail-img" />
          <div v-else class="emoji">{{ item.emoji }}</div>
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5vh;
  padding: 2vh 0;
  background: linear-gradient(135deg, #f7fef9 0%, #eef6ff 100%);
  color: #2d3748;

  .motto {
    font-size: 1.5rem;
    font-weight: 300;
    color: #4a7702;
    margin-bottom: 1vh;
    text-align: center;
    letter-spacing: 0.5px;
  }

  .top-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 95%;
    gap: 2vw;
    margin-top: 1vh;

    .item-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1vh;
      width: 28vw;
      min-width: 260px;
    }

    .section-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: #4a5568;
      margin: 0;
      text-align: center;
      opacity: 0.9;
    }

    .container-box {
      width: 100%;
      height: 24vh;
      border-radius: 16px;
      background: linear-gradient(-150deg, rgba(255, 255, 255, 0.85), rgba(245, 249, 255, 0.9));
      position: relative;
      overflow: hidden;
      z-index: 2;
      box-shadow: 0 6px 16px rgba(100, 120, 160, 0.1);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(200, 210, 230, 0.4);

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        width: 8vw;
        height: 100%;
        z-index: 3;
        pointer-events: none;
      }

      .rotated-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-25deg);
        width: 200%;
        height: 200%;
        pointer-events: none;
      }

      .scrolling-row {
        display: flex;
        white-space: nowrap;
        width: max-content;
        margin-top: 6vh;
        animation: scrollLeftMulti 220s linear infinite;
      }

      .scroll-item {
        flex-shrink: 0;
        border-radius: 12px;
        transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
        cursor: default;
        pointer-events: auto;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
        will-change: transform;

        &:hover {
          transform: scale(1.3) translateY(-10px);
          z-index: 10;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.22);
        }
      }

      &.game-box .scroll-item {
        width: 3.2vw;
        height: auto;
        object-fit: contain;
        margin-right: 4.8vw;
      }

      &.technical-box,
      &.introduction-box {
        .scroll-item {
          padding: 0.45vw 1.3vw;
          margin-right: 2.4vw;
          color: #2c3e50;
          font-weight: 600;
          font-size: 1.12rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: fit-content;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }
      }
    }
  }

  .tab-switcher {
    display: flex;
    gap: 1.2vw;
    margin: 1vh 0;

    button {
      padding: 0.45rem 1.2rem;
      background: #d6ffe9;
      border: 1px solid #9ddb3762;
      border-radius: 24px;
      cursor: pointer;
      font-size: 1.05rem;
      font-weight: 600;
      color: #4a5568;
      transition: all 0.25s ease;

      &.active,
      &:hover {
        background: #adf041;
        color: white;
        border-color: #4361ee;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
      }
    }
  }

  .bottom-container {
    width: 94vw;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2vh;

    .center-box {
      display: flex;
      width: 100%;
      height: 22vh;
      border-radius: 16px;
      overflow: hidden;
      background: #ffffff;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.09);
      padding: 0.5rem;

      .card {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.9rem 0.6rem;
        text-align: center;
        border-radius: 12px;
        transition: all 0.3s ease;
        cursor: default;
        position: relative;
        overflow: hidden;

        &:not(:last-child) {
          margin-right: 0.8rem;
        }

        .detail-img {
          width: 60%;
          max-height: 45%;
          object-fit: contain;
          margin-bottom: 0.5rem;
          opacity: 0.95;
          transition: transform 0.3s;
        }

        .emoji {
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
        }

        .title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #2d3748;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          margin-bottom: 0.3rem;
        }

        .description {
          font-size: 0.92rem;
          color: #718096;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &:hover {
          background-color: #f8fafc;
          transform: translateY(-4px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
          z-index: 2;
        }
      }
    }
  }
}

@keyframes scrollLeftMulti {
  0% {
    transform: translateX(-60%);
  }

  100% {
    transform: translateX(60%);
  }
}

/* 响应式 */
@media (max-width: 900px) {
  .overview-container .top-container .item-group {
    width: 44vw;
  }

  .overview-container .top-container .container-box .scroll-item {
    margin-right: 3.5vw !important;
  }
}

@media (max-width: 700px) {
  .overview-container .top-container .item-group {
    width: 90vw;
  }

  .tab-switcher button {
    padding: 0.4rem 1rem;
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .overview-container .bottom-container .center-box {
    height: auto;
    flex-wrap: wrap;
    padding: 0.8rem;
  }

  .overview-container .bottom-container .center-box .card {
    width: calc(50% - 8px);
    height: 14vh;
    margin-right: 8px !important;
    margin-bottom: 8px;
  }
}
</style>
