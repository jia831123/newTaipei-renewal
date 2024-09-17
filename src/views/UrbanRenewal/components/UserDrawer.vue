<template>
  <el-drawer
    :modelValue="modelValue"
    @update:modelValue="(e: boolean) => emit('update:modelValue', e)"
    size="400px"
  >
    <template #header>
      <div class="flex items-center">
        <el-icon class="mr-2"><Tools /></el-icon
        ><span>{{ `你/妳好 ${userStore.googlePeople?.names[0].displayName}` }}</span>
      </div>
    </template>
    <div class="flex flex-col gap-2 justify-between h-full">
      <div class="flex flex-row justify-center items-center gap-2">
        <el-card>
          <div class="flex gap-1 items-center">
            <div class="relative">
              <el-avatar :src="userStore.googlePeople?.photos[0].url"></el-avatar>
              <img
                class="absolute bottom-0 right-0"
                width="20"
                height="20"
                src="@/assets/google.ico"
              />
            </div>
            <div>{{ userStore.googlePeople?.names[0].displayName }}</div>
          </div>
        </el-card>
        <el-avatar :icon="Link"></el-avatar>
        <el-card>
          <div class="flex gap-1 items-center">
            <div class="relative">
              <el-avatar :src="userStore.facebookPeople?.picture.data.url"></el-avatar>
              <img
                class="absolute bottom-0 right-0"
                width="20"
                height="20"
                src="@/assets/facebook.ico"
              />
            </div>
            <div>{{ userStore.facebookPeople?.name }}</div>
          </div>
        </el-card>
      </div>
      <div class="flex flex-col gap-2">
        <router-link class="w-full" :to="{ name: RouterNames.LOGIN }">
          <el-button class="w-full" type="info" :icon="Switch">切換使用者</el-button>
        </router-link>
        <div>
          <el-button
            @click="handleLogoutAndUnbind"
            type="danger"
            class="w-full"
            :icon="CircleCloseFilled"
            >登出並解除綁定</el-button
          >
        </div>
        <div>
          <el-button @click="handleResetAll" type="danger" class="w-full" :icon="Remove"
            >重置所有登入與綁定設定</el-button
          >
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import { useUserStore } from '@/service/stores/user'
import { Link,Switch,CircleCloseFilled ,Remove,Tools} from '@element-plus/icons-vue'
import { RouterNames } from '@/router'
import useConfirm from '@/hook/useConfirm';
import { useRouter } from 'vue-router';

defineProps({
  modelValue: {
    type: Boolean
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()
const router = useRouter()
const confirm = useConfirm()
const handleLogoutAndUnbind = async () => {
  const isConfirm = await confirm('登出並解除綁定', '警告', {
    type: 'error'
  })
    .then((_) => true)
    .catch((_) => false)
  if (!isConfirm) {
    return
  }
  userStore.resetGooglePeopleAndUnbind()
  router.push({ name: RouterNames.LOGIN })
}
const handleResetAll = async () => {
  const isConfirm = await confirm('重置所有登入與綁定設定', '警告', {
    type: 'error'
  })
    .then((_) => true)
    .catch((_) => false)
  if (!isConfirm) {
    return
  }
  userStore.resetAll()
  router.push({ name: RouterNames.LOGIN })
}
const userStore = useUserStore()

</script>
