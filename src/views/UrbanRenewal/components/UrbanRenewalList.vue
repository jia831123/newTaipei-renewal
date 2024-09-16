<template>
  <div flex flex-col p-3 class="UrbanRenewalList">
    <div flex gap-2 p-2 class="search-input">
      <el-input
        v-model.trim="keyWord"
        size="large"
        class="el-input"
        placeholder="請輸入你要查詢的地址"
      ></el-input>
      <el-button @click="handleSearch" size="large" :icon="Search" circle />
    </div>
    <div grow-1>
      <ul
        infinite-scroll-immediate
        v-infinite-scroll="load"
        class="infinite-list"
        infinite-scroll-delay="300"
        style="overflow: auto"
      >
        <li class="cursor-pointer infinite-list-item" @click="e=>handleItemClick(i)" v-for="i in list" :key="i.id" >
          <span text-black>{{ i.stop_name }}</span>
          <span class="distanceText">{{ i.distance }} km</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { RenewalPoint } from '@/service/api/useUrbanRenewal'
import { Search } from '@element-plus/icons-vue'
import type { PropType } from 'vue'
import { watch } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  list: {
    type: Array as PropType<RenewalPoint[]>,
    default: () => []
  }
})
const emit = defineEmits<{
  (e:'setView',v:{longitude:number,latitude:number}):void
}>()
const list = ref<RenewalPoint[]>([])
const keyWord = ref()
const isKeyWordFilter = ref(false)
const handleSearch = () => {
  page.value = 1
  if(keyWord.value){
    isKeyWordFilter.value=true
    list.value = props.list
    .filter((e) => e.stop_name.includes(keyWord.value))
    .filter((e, i) => i < 6 * page.value)
  }else{
    isKeyWordFilter.value=false
    list.value = props.list.filter((e, i) => i < 6 * page.value) 
  }
}
const handleItemClick = (i:RenewalPoint)=>{
  const {latitude,longitude}=i
  emit('setView',{longitude,latitude})
}
const page = ref(1)
watch(
  () => props.list,
  (n, o) => {
    isKeyWordFilter.value = false
    list.value = [...n.filter((e, i) => i < 6)]
  }
)
const load = () => {
  page.value++
  list.value = props.list.filter(e=>isKeyWordFilter.value?e.stop_name.includes(keyWord.value):true).filter((e, i) => i < 6 * page.value)
}
</script>
<style lang="scss" scoped>
.search-input > .el-input {
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
  background: #ffffff;
  margin: 10px;
  padding: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.distance-text {
  color: #5e7fc3;
}
</style>
