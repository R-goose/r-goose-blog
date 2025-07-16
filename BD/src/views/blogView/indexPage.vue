<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()

const navList = ref([
  {
    name: 'blog',
    title: '博客',
  },
  {
    name: 'social',
    title: '社区',
  },
  {
    name: 'personal',
    title: '个人中心',
  },
])
</script>
<template>
  <div class="fs25">
    <header>
      <nav class="w100 text-center flex flex-row">
        <div v-for="(item, index) in navList" :key="index">{{ item.title }}</div>
      </nav>
    </header>
    <RouterView />
  </div>
</template>
<style scoped lang="scss"></style>
