<template>
  <el-button size="large" :class="$attrs.class">
    <div flex items-center gap-3>
      <img style="border-radius: 50%" :src="pictureUrl" width="20" height="20" />
      <span>{{ name }}</span>
    </div>
  </el-button>
</template>
<script setup lang="ts">
defineProps({
  name: {
    type: String
  },
  pictureUrl: {
    type: String
  }
})
</script>
<style scoped></style>
