<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <el-container>
    <el-main class="el-main">
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>
.el-main{
  display: flex;
  justify-content: center;
}

@media (min-width: 1024px) {
  
}
</style>
