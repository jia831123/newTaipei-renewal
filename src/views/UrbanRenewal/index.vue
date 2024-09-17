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
  <UserDrawer v-model="isShowDrawer" />
</template>
<script lang="ts" setup>
import UrbanRenewalMap from './components/UrbanRenewalMap/index.vue'
import UrbanRenewalList from './components/UrbanRenewalList.vue'
import { ref } from 'vue'
import type { RenewalPoint } from '@/service/api/useUrbanRenewal'
import { Tools } from '@element-plus/icons-vue'
import UserDrawer from './components/UserDrawer.vue'

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
.link-icon {
  font-size: 25px;
  color: #419eff;
}
</style>
