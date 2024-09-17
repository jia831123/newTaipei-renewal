<template>
  <div flex h-full w-full justify-center items-center>
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <div class="text-center">
            <span>新北市都市更新地點的查詢網頁</span>
            <span>綁定 facebook</span>
          </div>
        </div>
      </template>
      <el-form class="el-form">
        <el-form-item>
          <el-button class="w-[150px]" size="large" type="primary" @click="handleBind">
            <div flex items-center gap-2>
              <img width="20" height="20" src="@/assets/facebook.ico" /> <span>Facebook bind</span>
            </div>
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleTestBind" :icon="SetUp" class="w-[150px]"
            >測試帳號綁定</el-button
          >
        </el-form-item>
        <el-form-item>
          <router-link class="w-[150px]" :to="{ name: RouterNames.LOGIN }">
            <el-button class="w-full" type="info">返回登入</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useLoading } from '@/hook/useLoading'
import { RouterNames } from '@/router'
import useFacebookLoginRedirect from '@/service/api/useFacebookLoginRedirec'
import useFacebookPeople from '@/service/api/useFacebookPeople'
import { useUserStore } from '@/service/stores/user'
import { ElNotification } from 'element-plus'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SetUp } from '@element-plus/icons-vue'
import { createFacebookPeopleForTestBind } from '@/utils'

const userStore = useUserStore()
const { getLoading } = useLoading()
const { setAndRegisterFacebookPeople, bindingUser } = userStore
const route = useRoute()
const router = useRouter()

const handleBind = () => {
  const facebookAuthUrl = useFacebookLoginRedirect()
  window.location.href = facebookAuthUrl
}
const handleTestBind = () => {
  const facebookForTest = createFacebookPeopleForTestBind()
  setAndRegisterFacebookPeople(facebookForTest)
  if (userStore.googlePeople?.resourceName) {
    bindingUser(userStore.googlePeople.resourceName, facebookForTest.id)
    router.push({ name: RouterNames.URBAN_RENEWAL })
  }
}
const handleCheckFullPath = async () => {
  const loading = getLoading()
  const hash = window.location.hash
  const params = new URLSearchParams(hash.substring(1))
  const accessToken = params.get('access_token')
  if (!accessToken) {
    return
  }
  const facebookPeople = await useFacebookPeople(accessToken)
  setAndRegisterFacebookPeople(facebookPeople)
  if (userStore.googlePeople?.resourceName && facebookPeople.id) {
    bindingUser(userStore.googlePeople.resourceName, facebookPeople.id)
    router.push({ name: RouterNames.URBAN_RENEWAL })
  } else {
    loading.close()
    ElNotification({
      title: 'Error',
      message: '綁定失敗',
      type: 'error'
    })
    router.push({ name: RouterNames.LOGIN })
  }
}
onMounted(() => {
  if (route.fullPath.includes('access_token')) {
    handleCheckFullPath()
    return
  }
})
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
.el-form :deep(.el-form-item__content) {
  justify-content: center;
}
</style>
