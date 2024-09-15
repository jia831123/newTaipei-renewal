<template>
  <div flex flex-col p-3 class="UrbanRenewalList">
    <div flex gap-2 p-2 class="search-input">
      <el-input size="large" class="el-input" placeholder="請輸入你要查詢的地址"></el-input>
      <el-button  size="large" :icon="Search" circle />
    </div>
    <div grow-1>
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li v-for="i in list" :key="i.id" class="infinite-list-item">
          <span text-black>{{ i.stop_name }}</span>
          <span class="distanceText">{{ i.distance }} km</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { RenewalPoint } from '@/service/api/useUrbanRenewal';
import {
  Search
} from '@element-plus/icons-vue'
import type { PropType } from 'vue';
import { watch } from 'vue';
import { ref } from 'vue';


const props = defineProps({
  list:{
    type:Array as PropType<RenewalPoint[]>,
    default:()=>[]
  }
})
const list = ref<RenewalPoint[]>([])
const page = ref(0)
watch(()=>props.list,(n,o)=>{
  console.log('watch')
  list.value = [...n.filter((e,i)=>i<6)]
},)
const load = () => {
  page.value++
  list.value = props.list.filter((e,i)=>i<6*page.value)
}
</script>
<style lang="scss" scoped>

.search-input>.el-input{
  width: 200px;
}
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background: #FFFFFF;
  margin: 10px;
  padding: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.distance-text{
  color:#5E7FC3;
}
</style>
