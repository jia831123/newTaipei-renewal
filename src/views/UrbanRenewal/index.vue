<template>
  <div class="container">
    <UrbanRenewalMap ref="mapRef" @update:pointData="e=>list=e.result " class="w-full h-full"/> 
    <UrbanRenewalList @setView="handleSetView" :list="list" />
  </div>
</template>
<script lang="ts" setup>
import UrbanRenewalMap from './components/UrbanRenewalMap/index.vue'
import UrbanRenewalList from './components/UrbanRenewalList.vue'
import { ref } from 'vue';
import type { RenewalPoint } from '@/service/api/useUrbanRenewal';

const list = ref<RenewalPoint[]>([])
const mapRef = ref<InstanceType<typeof UrbanRenewalMap>>()
const handleSetView = (e:{latitude:number,longitude:number})=>{
  const center = [e.latitude,e.longitude] as [number,number]
  mapRef.value?.setView(center,18)
}


</script>
<style scoped lang="scss">
.container{
  height: 100vh;
  background-color: rgb(246,246,246);
  display: flex;
  flex-direction:column;
}
#map{
  height: 400px;
}
#list{
  flex-grow: 1;
}
</style>
