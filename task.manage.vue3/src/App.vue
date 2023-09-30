<template>
  <div>
    <el-config-provider :locale="zhCn">
    <!-- router page content -->
    <div class="flex min-h-screen overflow-auto">
      <router-view />
    </div>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {appStore} from "./common/app.pinia.ts";
import {storeToRefs} from "pinia";
import {isEmpty} from "./logic/mutils.ts";

// 刷新页面需要更新用户信息
const appStore_=appStore()
const {userInfo}=storeToRefs(appStore_)
if(isEmpty(userInfo.value)&&appStore_.TOKEN){
  appStore_.updateUserInfo()
}
</script>
