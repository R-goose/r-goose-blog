<script setup>
import { ref, onMounted, nextTick } from 'vue'
const props = defineProps({
  pageTotalHeight: {
    type: Number,
    default: 0
  },
  currentPageHeight: {
    type: Number,
    default: () => {
      return window.innerHeight || document.documentElement.clientHeight
    }
  }
})
const scrollBarRef = ref(null)
const thumbRef = ref(null)
const scrollBarHeight = ref(0)
onMounted(async () => {
  await nextTick()
  scrollBarHeight.value = props.pageTotalHeight
  console.log(scrollBarHeight.value, props.pageTotalHeight);

  if (scrollBarRef.value) {
    scrollBarRef.value.style.height = `${scrollBarHeight.value}px`
    thumbRef.value.style.height = `${props.currentPageHeight * props.currentPageHeight / props.pageTotalHeight}px`
  }

  // window.addEventListener('scroll', () => {

  // });

})
</script>
<template>
  <div ref="scrollBarRef" class="scroll-bar">
    <div class="thumb" ref="thumbRef"></div>
  </div>
</template>
<style scoped lang="scss">
.scroll-bar {
  position: fixed;
  width: 0.5vw;
  right: 0;
  top: 0;
  background-color: #ffc0c0;
  z-index: 5000;

  .thumb {
    position: fixed;
    top: 0;
    right: 0;
    width: 0.5vw;
    background: linear-gradient(180deg,
        rgb(255, 212, 212),
        rgb(255, 255, 178),
        rgb(205, 255, 205),
        rgb(198, 253, 253),
        rgb(239, 206, 255));
    border-radius: 10px;
    z-index: 5001;
  }
}
</style>
