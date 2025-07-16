<script setup>
import { RouterView } from 'vue-router'
import { themeChanger } from '@/components/themeChanger.vue'
</script>

<template>
  <RouterView />
  <themeChanger />
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as base;
</style>
