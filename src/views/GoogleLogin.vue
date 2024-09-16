<template>
  <div flex h-full w-full justify-center items-center>
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>新北市都市更新地點的查詢網頁</span>
        </div>
      </template>
      <el-form flex h-full justify-center>
        <el-form-item>
          <el-button size="large" type="primary" @click="handleLogin">google Login</el-button>
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

const { setAndRegisterGooglePeople } = useUserStore()
const { getLoading } = useLoading()
const router = useRouter()
const route = useRoute()
const handleLogin = () => {
  window.location.href = useGoogleLoginRedirect()
}
if (route.fullPath.includes('access_token')) {
  handleCheckFullPath()
}
async function handleCheckFullPath() {
  const hash = window.location.hash
  const params = new URLSearchParams(hash.substring(1))
  const accessToken = params.get('access_token')
  if (!accessToken) return
  const loading = getLoading()
  const googlePeople = await useGooglePeople(accessToken)
  if (googlePeople.resourceName) {
    setAndRegisterGooglePeople(googlePeople)
    router.push({ name: RouterNames.BIND })
  } else {
    loading.close()
    ElNotification({
      title: 'Error',
      message: 'some error',
      type: 'error'
    })
  }
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
