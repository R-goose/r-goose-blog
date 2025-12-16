<script setup>
import { ref, computed } from 'vue'
import pageOne from './myBlogComponents/pageOne.vue'
import pageTwo from './myBlogComponents/pageTwo.vue'

const currentPage = ref(0)
const pageNumber = 2
const translateX = computed(() => {
  return -currentPage.value * 100
})
const changePage = (index) => {
  currentPage.value = index
  translateX.value = index * 10
}

</script>

<template>
  <div class="myBlog" :style="{ transform: `translateX(${translateX}vw)` }">
    <pageOne />
    <pageTwo />
  </div>

  <footer>
    <span @click="changePage(0)" :style="{ 'cursor': currentPage == 0 ? 'default' : 'pointer' }">
      <svg fill="#85be2792" width="1vw" height="1vw" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M236.77344,211.97656a23.75471,23.75471,0,0,1-20.79688,12.01563H40.02344a23.9925,23.9925,0,0,1-20.76563-36.02344L107.23437,35.97656h-.00781a24.00413,24.00413,0,0,1,41.54688,0l87.96875,151.99219A23.744,23.744,0,0,1,236.77344,211.97656Z" />
      </svg>
    </span>

    <span @click="changePage(index - 1)" v-for="index in pageNumber" :key="index" class="pagePoints"
      :style="{ 'backgroundColor': currentPage === index - 1 ? '#4a7702' : '#dfdfdf', 'cursor': currentPage == index - 1 ? 'default' : 'pointer' }"></span>
    <span @click="changePage(1)" :style="{ 'cursor': currentPage == 1 ? 'default' : 'pointer' }">
      <svg fill="#85be2792" width="1vw" height="1vw" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M236.77344,211.97656a23.75471,23.75471,0,0,1-20.79688,12.01563H40.02344a23.9925,23.9925,0,0,1-20.76563-36.02344L107.23437,35.97656h-.00781a24.00413,24.00413,0,0,1,41.54688,0l87.96875,151.99219A23.744,23.744,0,0,1,236.77344,211.97656Z" />
      </svg>
    </span>
  </footer>
</template>

<style scoped lang="scss">
.myBlog {
  position: relative;
  height: 100vh;
  width: 200vw;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  transition: transform 0.5s cubic-bezier(0.33, 1, 0.68, 1);
}

.pagePoints {
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  // background-color: #c25f5f;
  cursor: pointer;
}

footer {
  position: absolute;
  bottom: 1vh;
  left: 50%;
  transform: translateX(-50%);
  height: 2.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.15vw 0.5vw;
  border-radius: 0.65vw;
  box-shadow: #b8d97c77 0px 0.3vh 1vh 1px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transition: all 0.3s ease-in-out;
    transform: translateX(-50%) scale(1.05);
    box-shadow: #85be2762 0px 0.3vh 1vh 2px;
    padding: 0.15vw 1vw;
  }

  &>span:first-child {
    rotate: -90deg;
    cursor: pointer;
  }

  &>span:last-child {
    rotate: 90deg;
    cursor: pointer;
  }
}
</style>
