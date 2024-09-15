<template>
  <div class="container">
   <UrbanRenewalMap  @update:pointData="e=>list=e.result " class="w-full h-full"/> 
    <UrbanRenewalList :list="list" />
  </div>
</template>
<script lang="ts" setup>
import UrbanRenewalMap from './components/UrbanRenewalMap/index.vue'
import UrbanRenewalList from './components/UrbanRenewalList.vue'
import { ref } from 'vue';
import type { RenewalPoint } from '@/service/api/useUrbanRenewal';

const list = ref<RenewalPoint[]>([])



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
