<script setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router'
import themeChanger from '@/components/themeChanger.vue'

const mainRef = ref(null);

onMounted(() => {
  const container = mainRef.value;
  if (container) {
    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);// 获取滚动方向（1=向下，-1=向上）
      const scrollStep = window.innerHeight; // 每次滚动一个视口高度
      const currentScroll = container.scrollTop;
      const targetScroll = Math.round(currentScroll / scrollStep) * scrollStep + delta * scrollStep;// 对齐到最近的整屏位置

      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    });
  }
});
</script>

<template>
  <div ref="mainRef" class="main pos-a bg-color text-color">
    <div class="pos-a full-w">
      <RouterView />
    </div>
    <themeChanger></themeChanger>
  </div>
</template>

<style lang="scss">
@use '@/assets/base' as base;
@use '@/assets/theme' as theme;
</style>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100vh;
  overflow: auto;
  user-select: none;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
