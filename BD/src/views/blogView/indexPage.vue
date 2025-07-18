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

const showAvaterToast = ref(false)
const overTheItem = ref(false)
const hideToast = () => {
  setTimeout(() => {
    if (!overTheItem.value) {
      showAvaterToast.value = false
    }
  }, 300)
}
const avatarHandlerTitleList = ['设置', '切换账号', '退出登录']

const handleClickAvatar = (index) => {
  switch (index) {
    case 0:
      setting()
      break
    case 1:
      switchAccount()
      break
    case 2:
      logout()
      break
  }
}
const setting = () => {}
const switchAccount = () => {}
const logout = () => {
  router.push('/login')
}
</script>
<template>
  <div class="fs25 bg-color text-color hidden flex">
    <header>
      <nav class="w100 h7 text-center flex flex-row index-nav flex-center pos-a">
        <div
          class="cursor-p fs30 h7 nav-item"
          v-for="(item, index) in navList"
          :key="index"
          @click="() => router.push(`/${item.name}`)"
        >
          {{ item.title }}
        </div>
        <img
          src="../../image/avatar/个人头像.png"
          alt=""
          class="br-circle w30px h30px avatar"
          @mouseover="showAvaterToast = true"
          @mouseout="hideToast"
        />
      </nav>
      <div
        class="w140px text-center index-nav avatar-toast"
        v-if="showAvaterToast"
        @mouseover="((showAvaterToast = true), (overTheItem = true))"
        @mousemove="((showAvaterToast = true), (overTheItem = true))"
        @mouseout="((showAvaterToast = false), (overTheItem = false))"
      >
        <div
          v-for="(item, index) in avatarHandlerTitleList"
          :key="index"
          class="w140px index-nav-item"
          @click="handleClickAvatar(index)"
        >
          {{ item }}
        </div>
      </div>
    </header>
    <div class="pos-a mt7">
      <RouterView />
    </div>
  </div>
</template>
<style scoped lang="scss">
* {
  z-index: 2;
}
</style>
