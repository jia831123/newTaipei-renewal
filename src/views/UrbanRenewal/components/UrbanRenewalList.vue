<template>
  <div flex flex-col p-3 class="UrbanRenewalList">
    <div flex gap-2 p-2 class="search-input">
      <el-input size="large" class="el-input" placeholder="請輸入你要查詢的地址"></el-input>
      <el-button  size="large" :icon="Search" circle />
    </div>
    <div grow-1>
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Search
} from '@element-plus/icons-vue'
import { ref } from 'vue';

const count = ref(0)
const load = () => {
  count.value += 2
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
  justify-content: center;
  height: 50px;
  background: #FFFFFF;
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
