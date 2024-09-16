<template>
  <div flex h-full w-full justify-center items-center>
    <el-card class="card">
      <template #header>
      <div class="card-header">
        <span>新北市都市更新地點的查詢網頁</span>
      </div>
    </template>
      <el-form  flex h-full justify-center>
        <el-form-item >
          <el-button size="large" type="primary" @click="handleBind">Facebook bind</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useLoading } from '@/hook/useLoading';
import { RouterNames } from '@/router';
import useFacebookLoginRedirect from '@/service/api/useFacebookLoginRedirec';
import useFacebookPeople from '@/service/api/useFacebookPeople';
import { useUserStore } from '@/service/stores/user';
import { ElNotification } from 'element-plus';
import { useRoute,useRouter } from 'vue-router';

const userStore = useUserStore()
const {getLoading}=useLoading()
const {setAndRegisterFacebookPeople,bindingUser} = userStore
const route = useRoute()
const router = useRouter()
const handleBind = ()=>{
  const facebookAuthUrl = useFacebookLoginRedirect()
  window.location.href = facebookAuthUrl;
}
if(route.fullPath.includes('access_token')){
  handleCheckFullPath()
}
async function handleCheckFullPath(){
  const hash = window.location.hash
  const params = new URLSearchParams(hash.substring(1)); 
  const accessToken = params.get('access_token')
  if(!accessToken) return
  const facebookPeople = await useFacebookPeople(accessToken)
  setAndRegisterFacebookPeople(facebookPeople)
  const loading = getLoading()
  if(userStore.googlePeople?.resourceName && facebookPeople.id){
    bindingUser(userStore.googlePeople.resourceName,facebookPeople.id)
    router.push({name:RouterNames.URBAN_RENEWAL})
  }else{
    loading.close()
    ElNotification({
      title: 'Error',
      message: '綁定失敗',
      type: 'error'
    })
    router.push({name:RouterNames.LOGIN}) 
  }

}
</script>
<style scoped lang="scss">
.card {
  width: 250px;
  background-color: #1D1E1F;
  color: aliceblue;
  border: 0px;
  :deep(.el-card__body) {
    height: 100%;
  }
}
</style>
