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
import { RouterNames } from '@/router';
import useGoogleLoginRedirect from '@/service/api/useGoogleLoginRedirect';
import useGooglePeople from '@/service/api/useGooglePeople';
import { useUserStore } from '@/service/stores/user';
import { useRoute, useRouter } from 'vue-router';


const {setGooglePeople}= useUserStore()
const router = useRouter()
const route = useRoute()
const handleLogin = ()=>{
  window.location.href = useGoogleLoginRedirect();
}
console.log('123')
if(route.fullPath.includes('access_token')){
  handleCheckFullPath()
}
async function handleCheckFullPath(){
  const hash = window.location.hash
  const params = new URLSearchParams(hash.substring(1)); 
  const accessToken = params.get('access_token')
  if(!accessToken) return
  const googlePeople = await useGooglePeople(accessToken)
  setGooglePeople(googlePeople) 
  router.push({name:RouterNames.BIND})
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
