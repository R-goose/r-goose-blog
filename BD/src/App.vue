<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import { RouterView } from 'vue-router'

const mainRef = ref(null);

// 处理滚轮事件（整屏滚动）
const handleWheel = (e) => {
  // e.preventDefault();
  const delta = Math.sign(e.deltaY); // 1=向下，-1=向上
  const scrollStep = window.innerHeight; // 每次滚动一个视口高度
  const currentScroll = mainRef.value.scrollTop;
  // 对齐到最近的整屏位置
  const targetScroll = Math.round(currentScroll / scrollStep) * scrollStep + delta * scrollStep;

  mainRef.value.scrollTo({
    top: targetScroll,
    behavior: 'smooth'
  });
};

onMounted(() => {
  const container = mainRef.value;
  if (container) {
    container.addEventListener('wheel', handleWheel, { passive: true });
  }
});

onUnmounted(() => {
  const container = mainRef.value;
  if (container) {
    container.removeEventListener('wheel', handleWheel, { passive: true });
  }
});
</script>

<template>
  <div ref="mainRef" class="main pos-a bg-color text-color">
    <div class="full-w">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/base' as base;
@use '@/assets/theme' as theme;
</style>

<style scoped lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  height: 100%;
}

.main {
  width: 100vw;
  height: 100%;
  user-select: none;
  -ms-overflow-style: none;
  scroll-snap-type: y mandatory;
  overflow-x: hidden;
  scroll-behavior: smooth;
  font-family: "钉钉进步体 Regular";
  font-variation-settings: normal;

  &::-webkit-scrollbar {
    width: 0.5vw;
    background-color: transparent;
    // display: none;

    &-thumb {
      background: linear-gradient(180deg,
          rgb(255, 212, 212),
          rgb(255, 255, 178),
          rgb(205, 255, 205),
          rgb(198, 253, 253),
          rgb(239, 206, 255));
      border-radius: 10px;

      &:active {
        box-shadow: inset 0 0 6px rgb(104, 104, 104);
      }
    }
  }

  // 字体定义
  @font-face {
    font-family: "钉钉进步体 Regular";
    font-weight: 400;
    src: url("/src/assets/FimWw6NxrqZv/DingTalk-JinBuTi.woff2") format("woff2"),
      url("/src/assets/FimWw6NxrqZv/DingTalk-JinBuTi.woff") format("woff");
    font-variation-settings: normal;
    font-display: swap;
  }
}
</style>
