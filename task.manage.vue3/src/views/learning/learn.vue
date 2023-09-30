<template>
  <div class="learning-page max-h-screen w-full overflow-hidden">
    <!--  头部    -->
    <div class="header-container">
      <div class="header-left">
        <div class="lt">
          <!--时间-->
          <div class="left-time qahiri">{{currentData}} {{currentTime}}</div>
          <div @click="loginOut" class="left-loginOut">
            {{appStore_.isLogin?'退出登录':'请登录'}}
          </div>
        </div>
        <!--用户名-->
        <div class="lb ">
          <span class="left-userName">{{ appStore_.userInfo.nike_name }}</span>
          <span @click="openDrawer" class="edit-icon cursor-pointer iconfont icon-bianji"></span>
        </div>
      </div>
      <div class="header-right">
        <!--tab-->
        <div class="tab-container">
          <div @click="goTo(routePaths.currentDayTaskRoute.path)" class="tab-item">
            <span class="icon-box iconfont icon-jindu1 mr-2"></span>
            <span>当天任务</span>
          </div>
          <div @click="goTo(routePaths.taskProgressRoute.path)" class="tab-item">
            <span class="icon-box iconfont icon-jindu mr-2"></span>
            <span>任务进度</span>
          </div>
        </div>
        <!--头像-->
        <div class="avatar-container">
          <div class="managePane-box" @click="goTo(routePaths.setting.path)">管理面板</div>
          <el-tooltip
              class="box-item"
              effect="dark"
              content="点击修改头像"
              placement="bottom"
          >
          <div class="avatar-box relative">
            <el-avatar class="w-full h-full" shape="square" :size="70" :src="'/api'+(appStore_.userInfo.avatar||'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png')" />
            <div @click="setAvatarHandle(avatarInput)" class="mask-avatar absolute opacity-0 h-[70px] rounded bg-white w-full  active:bg-opacity-70 content-end bg-opacity-20 top-0 left-0"></div>
          </div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <input type="file" @change="avatarInputChange" v-show="false" ref="avatarInput"/>
    <!-- 展示区 -->
    <router-view v-slot="{ Component, route }">
      <transition name="scale" mode="out-in">
        <KeepAlive :include="routeCacheList">
          <component
              class="w-full"
              :is="Component"
              :key="route.path"
          />
        </KeepAlive>
      </transition>
    </router-view>
    <!--抽屉-->
    <el-drawer size="50%"  :with-header="false" v-model="drawerSwitch" direction="btt">
      <div>
        <div  class="border p-2">
          <el-form :model="form" inline>
          <el-form-item prop="nike_name" label="网名">
            <el-input v-model="form.nike_name"></el-input>
          </el-form-item>
          <el-form-item prop="avatar" label="头像">
            <span class="text-[#606266]">{{form.avatar}}</span>
          </el-form-item>
          <el-form-item prop="qq" label="企鹅号">
            <el-input v-model="form.qq"></el-input>
          </el-form-item>
          <el-form-item prop="wechat" label="微信号">
            <el-input v-model="form.wechat"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item prop="github" label="Github">
            <el-input v-model="form.github"></el-input>
          </el-form-item>
        </el-form>
        </div>
        <!--修改密码-->
        <div class="border relative p-2 mt-2">
          <div class="absolute text-[#69a859] text-[10px] bottom-1 right-1">Tip:我只是为了让你能修改密码而出现在这里~</div>
          <el-form ref="passFormRef" inline :model="passForm" :rules="passFormRules">
            <el-form-item prop="username" label="用户名:">
              <el-input disabled v-model="passForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="old_pass" label="旧密码:">
              <el-input v-model="passForm.old_pass"></el-input>
            </el-form-item>
            <el-form-item prop="new_pass" label="新密码:">
              <el-input v-model="passForm.new_pass"></el-input>
            </el-form-item>
            <el-form-item prop="confirm_new_pass" label="新确认密码:">
              <el-input v-model="passForm.confirm_new_pass"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submitPass(passFormRef)" color="#5965F3" class="!text-[9px]  !text-[#AEB1B8]" :dark="true">提交密码</el-button>
            </el-form-item>
          </el-form>
        </div>
        </div>
      <template #footer>
        <el-button @click="drawerConfirmSetUserInfo" color="#5965F3" class="!text-[16px] w-[150px] !text-[#AEB1B8]" auto-insert-space :dark="true">确认修改</el-button>
      </template>
    </el-drawer>

  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount,} from "vue";
import {
  appStore_, avatarInput, avatarInputChange,
  clearTimer, currentData, currentTime, goTo,
  initPage, loginOut, openDrawer, passForm, passFormRef, passFormRules, setAvatarHandle, submitPass,
} from "./learn.ts";
import {routeCacheList, routePaths} from "../../helper/router/path.ts";
import {drawerConfirmSetUserInfo, drawerSwitch, form} from "./learn.ts";

initPage()


onBeforeUnmount(() => {
  clearTimer()
})

// 当前完成量

</script>

<style scoped>
.avatar-box:hover .mask-avatar{
  opacity: 1;
}
.learning-page{
  @apply flex flex-col justify-start items-center content-center h-screen min-w-[560px]
}

.header-container{
  @apply  text-[#AEB1B8] select-none h-[130px] w-full bg-[#292742] flex justify-start items-center content-center
}

.header-right{
  @apply h-full flex-1 flex justify-end items-center content-center
}
.header-right .tab-container{
  @apply  h-full flex-1 flex justify-center items-center content-center flex-wrap
}
.tab-container .tab-item{
  @apply text-[15px] hover:shadow-lg active:text-white p-2  md:text-[25px]
}
.header-right .avatar-container{
  @apply w-[200px] h-full flex justify-around items-center
}
.avatar-container .managePane-box{
  @apply self-end pb-5 hover:text-gray-300 active:text-white
}

.header-left{
  @apply h-full w-[250px] pr-2 pl-2 pb-2
}
.header-left .lt{
  @apply flex justify-between items-center content-center
}
.header-left .lt .left-time{
  @apply text-[26px] mr-2
}
.header-left .lt .left-loginOut{
  @apply text-[13px] mr-2 text-[#ff6f74]
}
.header-left .lb{
  @apply   flex justify-center items-center content-center
}
.header-left .lb .left-userName{
  @apply flex-1 overflow-hidden text-[#FFFFFF] text-[25px]  font-[600] text-center mt-2
}
.header-left .lb .edit-icon{
  @apply font-[400] w-[16px] self-end ml-3 hover:text-gray-400 active:text-white
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.1s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>