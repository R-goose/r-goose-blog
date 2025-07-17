<script setup>
import { ref } from 'vue'
import { useShareStore } from '@/stores/share'

const shareStore = useShareStore()
</script>
<template>
  <div>
    <!-- <h1>Login Page</h1> -->
    <img
      src="/src/image/pictures/BD.png"
      alt=""
      draggable="false"
      class="logo-picture"
      v-if="shareStore.theme === 'light'"
    />
    <img
      src="/src/image/pictures/BD-dark.png"
      alt=""
      draggable="false"
      class="logo-picture"
      v-else
    />
  </div>
</template>
<style scoped lang="scss"></style>
