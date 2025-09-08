<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const navItems = ref([
  { name: '烧鹅工作室', key: 'pageOne' },
  { name: '总览', key: 'pageTwo', isCurrent: true },
  { name: '个人介绍', key: 'pageThree' },
  { name: '社交圈', key: 'pageFour' },
  { name: '技能', key: 'pageFive' },
  { name: '游戏', key: 'pageSix' }
]);

const scrollToPage = (key) => {
  navItems.value.forEach(item => {
    item.isCurrent = item.key === key;
  });
  const targetPage = document.querySelector(`[ref="${key}"]`);
  if (targetPage) {
    targetPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<template>
  <div class="overview-container">
    <div class="overview-cards">
      <div class="overview-card hover:card-hover transition-all duration-300">
        <div class="card-icon">
          <i class="fa fa-file-text-o"></i>
        </div>
        <div class="card-content">
          <h3 class="card-title">内容统计</h3>
          <p class="card-number">12+</p>
          <p class="card-desc">原创文章 & 项目</p>
        </div>
      </div>

      <div class="overview-card hover:card-hover transition-all duration-300">
        <div class="card-icon">
          <i class="fa fa-cogs"></i>
        </div>
        <div class="card-content">
          <h3 class="card-title">技能覆盖</h3>
          <p class="card-number">8+</p>
          <p class="card-desc">前端/游戏/设计</p>
        </div>
      </div>

      <div class="overview-card hover:card-hover transition-all duration-300">
        <div class="card-icon">
          <i class="fa fa-comments-o"></i>
        </div>
        <div class="card-content">
          <h3 class="card-title">互动数据</h3>
          <p class="card-number">200+</p>
          <p class="card-desc">星标/评论/关注</p>
        </div>
      </div>
    </div>

    <div class="overview-nav">
      <h3 class="nav-title">页面导航</h3>
      <div class="nav-timeline">
        <div v-for="(item, index) in navItems" :key="item.key" class="nav-node" @click="scrollToPage(item.key)">
          <div class="node-dot" :class="{ 'node-dot-active': item.isCurrent }"></div>
          <span class="node-text" :class="{ 'node-text-active': item.isCurrent }">{{ item.name }}</span>
          <div class="node-line" v-if="index < navItems.length - 1"></div>
        </div>
      </div>
    </div>

    <div class="overview-intro">
      <p class="intro-text">
        <!-- R-Goose | 前端开发×游戏爱好者×内容创作者，用代码记录成长，用作品连接同好 -->
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overview-container {
  width: 100%;
  height: 100%;
  padding: 4vw 2vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 2vw;
}

.overview-cards {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2vw;
  margin-bottom: 3vw;
}

.overview-card {
  background: linear-gradient(135deg, rgba(62, 167, 114, 0.1), rgba(126, 190, 216, 0.1));
  border-radius: 1.5vw;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(62, 167, 114, 0.15);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 30px rgba(62, 167, 114, 0.25);
  }
}

.card-icon {
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  background: linear-gradient(to left, #3ea772, #50b39a, #7ebed8);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5vw;

  i {
    font-size: 1.8vw;
    color: #2c2c2c;
  }
}

.card-title {
  font-size: 1.2vw;
  color: #2c2c2c;
  margin-bottom: 0.5vw;
  font-weight: 500;
}

.card-number {
  font-size: 2.5vw;
  font-weight: bold;
  background: linear-gradient(to left, #3ea772, #50b39a, #7ebed8);
  background-clip: text;
  color: transparent;
  margin-bottom: 0.5vw;
}

.card-desc {
  font-size: 0.9vw;
  color: rgba(255, 255, 255, 0.7);
}

.overview-nav {
  width: 100%;
  max-width: 1000px;
  margin-bottom: 3vw;
}

.nav-title {
  font-size: 1.5vw;
  color: #2c2c2c;
  text-align: center;
  margin-bottom: 1.5vw;
  font-weight: 600;
}

.nav-timeline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.nav-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.node-dot {
  width: 1.2vw;
  height: 1.2vw;
  border-radius: 50%;
  background-color: #50b39a2a;
  margin-bottom: 0.8vw;
  transition: all 0.3s ease;
}

.node-dot-active {
  background: linear-gradient(to left, #3ea772, #50b39a, #7ebed8);
  box-shadow: 0 0 15px rgba(62, 167, 114, 0.6);
  transform: scale(1.2);
}

.node-text {
  font-size: 1vw;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
}

.node-text-active {
  color: #2c2c2c;
  font-weight: 500;
}

.node-line {
  position: absolute;
  top: 0.6vw;
  left: 1.2vw;
  width: calc(100% - 2.4vw);
  height: 0.2vw;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(62, 167, 114, 0.5), rgba(255, 255, 255, 0.3));
  z-index: 1;
}

.overview-intro {
  width: 100%;
  max-width: 800px;
  text-align: center;
}

.intro-text {
  font-size: 1.1vw;
  background: linear-gradient(to left, #3ea772, #50b39a, #7ebed8);
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 10px rgba(126, 190, 216, 0.3);
  line-height: 1.8;
}
</style>
