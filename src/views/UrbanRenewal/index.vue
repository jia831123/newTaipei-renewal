<template>
  <div class="w-full h-full relative">
    <el-icon @click="() => (isShowDrawer = true)" class="user-icon"><Tools /></el-icon>
    <div class="container">
      <UrbanRenewalMap
        ref="mapRef"
        @update:pointData="(e) => (list = e.result)"
        class="w-full h-full"
      />
      <UrbanRenewalList @setView="handleSetView" :list="list" />
    </div>
  </div>
  <el-drawer
    v-model="isShowDrawer"
    size="400px"
  >
  <template #header>
    <div><el-icon class="mr-2"><Tools /></el-icon><span>{{ `你/妳好 ${userStore.googlePeople?.names[0].displayName}` }}</span></div>
  </template>
    <div class="flex flex-col gap-2 justify-between h-full">
      <div class="flex flex-row justify-center items-center gap-2">
        <el-card>
          <div class="flex gap-1 items-center">
            <div class="relative">
              <el-avatar :src="userStore.googlePeople?.photos[0].url"></el-avatar>
              <img class="absolute bottom-0 right-0" width="20" height="20" src="@/assets/google.ico"/>

            </div>
            <div>{{ userStore.googlePeople?.names[0].displayName }}</div>
          </div>
        </el-card>
        <el-avatar :icon="Link"></el-avatar>
        <el-card>
          <div class="flex gap-1 items-center">
            <div class="relative">
              <el-avatar :src="userStore.facebookPeople?.picture.data.url"></el-avatar>
              <img class="absolute bottom-0 right-0" width="20" height="20" src="@/assets/facebook.ico"/>
            </div>
            <div>{{ userStore.facebookPeople?.name }}</div>
          </div>
        </el-card>
      </div>
      <div class="flex flex-col gap-2">
        <router-link class="w-full" :to="{ name: RouterNames.LOGIN }">
          <el-button class="w-full" type="info" :icon="Switch">切換使用者</el-button>
        </router-link>
        <div>
          <el-button @click="handleLogoutAndUnbind" type="danger" class="w-full" :icon="CircleCloseFilled"
            >登出並解除綁定</el-button
          >
        </div>
        <div>
          <el-button @click="handleResetAll" type="danger" class="w-full" :icon="Remove"
            >重置所有登入與綁定設定</el-button
          >
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
import UrbanRenewalMap from './components/UrbanRenewalMap/index.vue'
import UrbanRenewalList from './components/UrbanRenewalList.vue'
import { ref } from 'vue'
import type { RenewalPoint } from '@/service/api/useUrbanRenewal'
import { Tools, Switch, CircleCloseFilled, Remove, Link } from '@element-plus/icons-vue'
import { RouterNames } from '@/router'
import { useUserStore } from '@/service/stores/user'
import { useRouter } from 'vue-router'
import useConfirm from '@/hook/useConfirm'

const router = useRouter()
const confirm = useConfirm()
const userStore = useUserStore()
const isShowDrawer = ref(false)
const list = ref<RenewalPoint[]>([])
const mapRef = ref<InstanceType<typeof UrbanRenewalMap>>()
const handleSetView = (e: { latitude: number; longitude: number }) => {
  const center = [e.latitude, e.longitude] as [number, number]
  mapRef.value?.setView(center, 18)
}
const handleLogoutAndUnbind = async () => {
  const isConfirm = await confirm('登出並解除綁定', '警告', {
    type: 'error'
  })
    .then((_) => true)
    .catch((_) => false)
  if (!isConfirm) {
    return
  }
  userStore.resetGooglePeopleAndUnbind()
  router.push({ name: RouterNames.LOGIN })
}
const handleResetAll = async () => {
  const isConfirm = await confirm('重置所有登入與綁定設定', '警告', {
    type: 'error'
  })
    .then((_) => true)
    .catch((_) => false)
  if (!isConfirm) {
    return
  }
  userStore.resetAll()
  router.push({ name: RouterNames.LOGIN })
}
</script>
<style scoped lang="scss">
.container {
  height: 100vh;
  background-color: rgb(246, 246, 246);
  display: flex;
  flex-direction: column;
}
#map {
  height: 400px;
}
#list {
  flex-grow: 1;
}
.user-icon {
  position: absolute;
  font-size: 20px;
  height: 30px;
  width: 30px;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background-color: rgb(204, 203, 203);
  border-radius: 50%;
  cursor: pointer;
}
.user-icon:hover {
  background-color: rgb(165, 164, 164);
}
.link-icon {
  font-size: 25px;
  color: #419eff;
}
</style>
