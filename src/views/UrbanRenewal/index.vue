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
    size="40%"
    :title="`你/妳好 ${userStore.googlePeople?.names[0].displayName}`"
  >
    <div class="flex flex-col gap-2">
      <router-link class="w-full" :to="{ name: RouterNames.LOGIN }">
        <el-button class="w-full" type="info" :icon="Switch">切換使用者</el-button>
      </router-link>
      <div><el-button type="danger" class="w-full"  :icon="CircleCloseFilled">登出並解除綁定</el-button></div>
      <div><el-button type="danger" class="w-full"  :icon="Remove">重置設定</el-button></div>
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
import UrbanRenewalMap from './components/UrbanRenewalMap/index.vue'
import UrbanRenewalList from './components/UrbanRenewalList.vue'
import { ref } from 'vue'
import type { RenewalPoint } from '@/service/api/useUrbanRenewal'
import { Tools, Switch, CircleCloseFilled,Remove } from '@element-plus/icons-vue'
import { RouterNames } from '@/router'
import { useUserStore } from '@/service/stores/user'

const userStore = useUserStore()
const isShowDrawer = ref(false)
const list = ref<RenewalPoint[]>([])
const mapRef = ref<InstanceType<typeof UrbanRenewalMap>>()
const handleSetView = (e: { latitude: number; longitude: number }) => {
  const center = [e.latitude, e.longitude] as [number, number]
  mapRef.value?.setView(center, 18)
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
</style>
