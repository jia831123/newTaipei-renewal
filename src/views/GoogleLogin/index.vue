<template>
  <div flex h-full w-full justify-center items-center>
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <div class="text-center">
            <span>新北市都市更新地點的查詢網頁</span>
            <span>Login</span>
          </div>
        </div>
      </template>
      <el-form flex flex-col h-full justify-center items-center>
        <el-form-item v-for="user in userStore.googlePeoples">
          <LoginButton
            @click="handleUserLogin(user)"
            class="w-[150px]"
            :name="user.names[0].displayName"
            :pictureUrl="user.photos[0].url"
          ></LoginButton>
        </el-form-item>
        <el-form-item>
          <el-button class="w-[150px]" size="large" type="primary" @click="handleLogin">
            <div flex items-center gap-2>
              <img width="20" height="20" src="@/assets/google.ico" /> <span>google Login</span>
            </div>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useLoading } from '@/hook/useLoading'
import { RouterNames } from '@/router'
import useGoogleLoginRedirect from '@/service/api/useGoogleLoginRedirect'
import useGooglePeople from '@/service/api/useGooglePeople'
import { useUserStore } from '@/service/stores/user'
import { ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import LoginButton from './components/LoginButton.vue'
import type { People as GooglePeople } from '@/service/api/useGooglePeople'

const userStore = useUserStore()
const { setAndRegisterGooglePeople } = userStore
const { getLoading } = useLoading()

const router = useRouter()
const route = useRoute()
const handleLogin = () => {
  window.location.href = useGoogleLoginRedirect()
}

const handleUserLogin = (user: GooglePeople) => {
  userStore.setAndRegisterGooglePeople(user)
  router.push({
    name: RouterNames.BIND
  })
}
const handleCheckFullPath = async () => {
  const hash = window.location.hash
  const params = new URLSearchParams(hash.substring(1))
  const accessToken = params.get('access_token')
  if (!accessToken) return
  const loading = getLoading()
  const googlePeople = await useGooglePeople(accessToken)
  if (googlePeople.resourceName) {
    setAndRegisterGooglePeople(googlePeople)
    router.push({ name: RouterNames.BIND })
    loading.close()
  } else {
    loading.close()
    ElNotification({
      title: 'Error',
      message: 'some error',
      type: 'error'
    })
  }
}
if (route.fullPath.includes('access_token')) {
  handleCheckFullPath()
}
</script>
<style scoped lang="scss">
.card {
  width: 250px;
  background-color: #1d1e1f;
  color: aliceblue;
  border: 0px;
  :deep(.el-card__body) {
    height: 100%;
  }
}
</style>
