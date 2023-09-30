<template>
  <div class="login-page bg-[#3c8dbc] w-full">
    <div>
      <el-button-group>
        <el-button type="primary" @click="isLogin = true" :icon="ArrowLeft">
          登录
        </el-button
        >
        <el-button @click="isLogin = false" type="primary">
          注册
          <el-icon class="el-icon--right">
            <ArrowRight/>
          </el-icon>
        </el-button>
      </el-button-group>
      <div class="content-container">
        <!-- 登录 -->
        <div v-show="isLogin" class="login-container">
          <el-form ref="formRef" :rules="rules" :model="form">
            <el-form-item label="账号" prop="username">
              <el-input clearable v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input @keyup.enter="loginHandle(formRef)" type="password" show-password clearable
                        v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="savePass" label="记住密码?" size="large"/>
            </el-form-item>
            <el-form-item class="items-end">
              <el-button
                  @click="loginHandle(formRef)"
                  class="flex-auto"
                  type="primary"
                  :loading="button_loading"
              >
                LOGIN
              </el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <!-- 注册 -->
        <div v-show="!isLogin" class="register-container">
          <el-form ref="registerFormRef" :rules="registerRules" :model="registerForm">
            <el-form-item label="账号" prop="username">
              <el-input v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input v-model="registerForm.password2"></el-input>
            </el-form-item>
            <el-form-item class="justify-end">
              <el-button @click="registerHandle(registerFormRef)" :loading="button_loading" class="flex-auto"
                         type="primary">注册
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="user-tip text-[#a8abb2] text-[13px]">
        <div>超管账号:root 密码:123456</div>
        <div>游客账号:youke 密码:123456</div>
      </div>
     </div>
  </div>
</template>

<script setup lang="ts">
import {ArrowLeft, ArrowRight} from "@element-plus/icons-vue";
import {
  isLogin,
  rules,
  formRef,
  form,
  registerRules,
  registerFormRef,
  registerForm, button_loading, savePass, pageInit, loginHandle, registerHandle
} from "./login";

pageInit()


</script>

<style scoped>
.login-page {
  @apply flex justify-center items-center;
}


.content-container {
  @apply bg-[#e8e8e8] bg-opacity-90  w-[302px] h-[230px] flex items-center justify-center p-10 rounded ml-auto mr-auto;
}

:deep(.el-checkbox__input) {
  order: 3;
  margin-left: 13px;
}
</style>
