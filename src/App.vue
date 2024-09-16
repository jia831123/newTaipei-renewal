<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <el-container class="el-container">
    <el-main class="el-main">
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>
.el-main {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 430px;
  background-color: grey;
}
.el-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #1d1e1f;
}

@media (min-width: 1024px) {
}
</style>
