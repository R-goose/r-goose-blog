<script setup>
import { RouterView } from 'vue-router'
import themeChanger from '@/components/themeChanger.vue'
</script>

<template>
  <div class="main pos-a bg-color text-color">
    <RouterView />
    <themeChanger></themeChanger>
  </div>
</template>

<style lang="scss">
@use '@/assets/base' as base;
@use '@/assets/theme' as theme;
</style>

<style scoped lang="scss">
.main {
  width: 100vw;
  height: 100vh;
}
</style>
