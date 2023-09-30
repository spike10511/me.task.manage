<template>
  <div class="setting-page w-full bg-[#2f4050]">
      <!--  header  -->
    <div class="header-container bg-[#3c8dbc] h-[50px] flex justify-start gap-3 content-center pl-3">
      <div @click="goto(routePaths.learning.path)" class="tag-item text-[#ffffff]">首页</div>
      <div @click="goto(routePaths.publishTask.path)" class="tag-item text-[#ffffff]">发布任务</div>
      <div @click="goto(routePaths.taskList.path)" class="tag-item text-[#ffffff]">任务管理</div>
    </div>
    <!--  content  -->
  <div class="content-container">
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
  </div>
  </div>
</template>

<script setup lang="ts">

import router from "../../helper/router/router.ts";
import {routeCacheList, routePaths} from "../../helper/router/path.ts";

function goto(path:string){
  router.push(path)
}

</script>

<style scoped>
.header-container .tag-item{
  @apply hover:bg-[#367fa9] p-1 select-none flex items-center justify-center transition duration-150
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