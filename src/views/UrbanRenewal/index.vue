<template>
  <div class="container">
   <UrbanRenewalMap class="w-full h-full"/> 
    <UrbanRenewalList />
  </div>
</template>
<script lang="ts" setup>
import UrbanRenewalMap from './components/UrbanRenewalMap.vue'
import UrbanRenewalList from './components/UrbanRenewalList.vue'
</script>
<style scoped lang="scss">
.container{
  width: 100%;
  height: 100vh;
  max-width: 430px;
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
