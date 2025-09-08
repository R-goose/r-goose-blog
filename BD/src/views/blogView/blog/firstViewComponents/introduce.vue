<script setup>
// 成长经历时间轴数据
const timelineData = [
  { year: "2021", content: "接触前端开发，用Vue写第一个个人博客" },
  { year: "2022", content: "学习Unity，开发第一个小游戏《Flappy Bird 重制版》" },
  { year: "2023", content: "GitHub开源项目获首个星标，开始在CSDN分享技术文章" },
  { year: "至今", content: "深耕前端+游戏开发，探索“技术+创作”的更多可能" }
];

// 兴趣爱好标签数据
const hobbyTags = [
  { type: "技术相关", tags: ["源码阅读", "前端性能优化", "Unity Shader研究"] },
  { type: "生活相关", tags: ["独立游戏", "原神", "摄影", "手账记录"] }
];
</script>

<template>
  <div class="introduce-container">
    <!-- 1. 个人形象区 -->
    <div class="intro-profile">
      <div class="profile-avatar">
        <img src="/src/image/avatar/1myAvatar.png" alt="R-Goose头像" draggable="false" />
      </div>
      <div class="profile-info">
        <h2 class="profile-name">R-Goose <span>🦖</span></h2>
        <p class="profile-title">前端开发工程师 | Unity游戏爱好者</p>
        <p class="profile-location">坐标：某城市 | 某学校/公司</p>
        <p class="profile-motto">“代码不止于功能，更是表达自我的语言”</p>
      </div>
    </div>

    <!-- 2. 成长故事（时间轴） -->
    <div class="intro-timeline">
      <h3 class="section-title">成长故事</h3>
      <div class="timeline-list">
        <div v-for="(item, index) in timelineData" :key="index" class="timeline-item">
          <div class="timeline-year">{{ item.year }}</div>
          <div class="timeline-line"></div>
          <div class="timeline-content">{{ item.content }}</div>
        </div>
      </div>
    </div>

    <!-- 3. 兴趣爱好（标签云） -->
    <div class="intro-hobby">
      <h3 class="section-title">兴趣爱好</h3>
      <div class="hobby-wrap">
        <div v-for="(group, idx) in hobbyTags" :key="idx" class="hobby-group">
          <h4 class="hobby-type">{{ group.type }}</h4>
          <div class="hobby-tags">
            <span v-for="(tag, tIdx) in group.tags" :key="tIdx" class="hobby-tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. 小互动 -->
    <div class="intro-interact">
      <p>你也喜欢<span class="highlight">前端/游戏</span>吗？欢迎在<span class="link" @click="$emit('goToSocial')">社交圈</span>找我交流～
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.introduce-container {
  width: 100%;
  height: 100%;
  padding: 4vw 2vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 3vw;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 2vw;
}

/* 1. 个人形象区 */
.intro-profile {
  display: flex;
  align-items: center;
  gap: 3vw;
  flex-wrap: wrap;
  justify-content: center;
}

.profile-avatar {
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(62, 167, 114, 0.3);
  transition: all 0.5s ease;

  &:hover {
    transform: rotate(5deg) scale(1.05);
    box-shadow: 0 0 40px rgba(62, 167, 114, 0.5);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.profile-info {
  text-align: left;
  min-width: 300px;
}

.profile-name {
  font-size: 2.5vw;
  color: #fff;
  margin-bottom: 1vw;
  font-weight: bold;
}

.profile-title,
.profile-location {
  font-size: 1.2vw;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.8vw;
}

.profile-motto {
  font-size: 1.1vw;
  background: linear-gradient(to left, #3ea772, #50b39a, #7ebed8);
  background-clip: text;
  color: transparent;
  font-style: italic;
}

/* 2. 成长故事（时间轴） */
.section-title {
  font-size: 1.8vw;
  color: #fff;
  text-align: center;
  margin-bottom: 2vw;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 5vw;
    height: 0.3vw;
    background: linear-gradient(to left, #3ea772, #50b39a);
    margin: 0.8vw auto 0;
    border-radius: 0.15vw;
  }
}

.timeline-list {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0.2vw;
    height: 100%;
    background: linear-gradient(to bottom, #3ea772, #50b39a, #7ebed8);
  }
}

.timeline-item {
  display: flex;
  align-items: center;
  margin-bottom: 2.5vw;
  position: relative;
}

.timeline-year {
  width: 10vw;
  text-align: right;
  font-size: 1.2vw;
  font-weight: bold;
  color: #50b39a;
  padding-right: 2vw;
}

.timeline-line {
  width: 1.5vw;
  height: 1.5vw;
  border-radius: 50%;
  background: linear-gradient(to left, #3ea772, #50b39a);
  z-index: 2;
}

.timeline-content {
  width: 10vw;
  text-align: left;
  font-size: 1.1vw;
  color: rgba(255, 255, 255, 0.9);
  padding-left: 2vw;
}

/* 3. 兴趣爱好（标签云） */
.intro-hobby {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.hobby-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
  justify-content: center;
}

.hobby-group {
  min-width: 250px;
  width: 45%;
}

.hobby-type {
  font-size: 1.2vw;
  color: #50b39a;
  margin-bottom: 1vw;
  text-align: center;
}

.hobby-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1vw;
  justify-content: center;
}

.hobby-tag {
  padding: 0.8vw 1.5vw;
  background-color: rgba(62, 167, 114, 0.1);
  border-radius: 2vw;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1vw;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(to left, #3ea772, #50b39a);
    color: #fff;
    transform: translateY(-3px);
  }
}

/* 4. 小互动 */
.intro-interact {
  text-align: center;
  margin-top: 2vw;
}

.intro-interact p {
  font-size: 1.1vw;
  color: rgba(255, 255, 255, 0.8);
}

.highlight {
  background: linear-gradient(to left, #3ea772, #50b39a);
  background-clip: text;
  color: transparent;
  font-weight: 500;
}

.link {
  color: #7ebed8;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #50b39a;
  }
}

/* 响应式适配 */
@media (max-width: 768px) {
  .profile-avatar {
    width: 40vw;
    height: 40vw;
  }

  .profile-name {
    font-size: 5vw;
  }

  .profile-title,
  .profile-location {
    font-size: 3vw;
  }

  .profile-motto {
    font-size: 2.5vw;
  }

  .section-title {
    font-size: 4vw;
  }

  .section-title::after {
    width: 15vw;
    height: 0.5vw;
  }

  .timeline-list::before {
    left: 10%;
  }

  .timeline-year {
    width: 20%;
    font-size: 2.5vw;
    padding-right: 1vw;
  }

  .timeline-line {
    width: 3vw;
    height: 3vw;
  }

  .timeline-content {
    width: 60%;
    font-size: 2.2vw;
    padding-left: 1vw;
  }

  .hobby-type {
    font-size: 2.5vw;
  }

  .hobby-tag {
    font-size: 2vw;
    padding: 1vw 2vw;
  }

  .intro-interact p {
    font-size: 2.2vw;
  }
}
</style>
