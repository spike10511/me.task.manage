<template>
  <div class="currentDay-page content-container">
      <!--菜单-->
      <div class="menu-container">
        <template v-if="todoList.length>=1">
          <div v-for="item in todoList" @click="activeTaskChange(item)" :key="item.id">
          <el-tooltip
              class="box-item"
              effect="dark"
              :content="item.task_category.cate_name"
              placement="right"
          >
          <div  :class="activeTask.id===item.id?'menu-active':''" class="menu-item">
            {{item.task_category.cate_name}}
            <div class="status-dot" :class="item.is_com?'success-color':'error-color'"></div>
          </div>
          </el-tooltip>
          </div>
        </template>
        <template v-else>
          <div class="h-full w-full flex justify-center items-center content-center">
            今天休息吧!
          </div>
        </template>
      </div>
      <!--任务内容-->
      <div class="taskContent-container">
         <pre class="bd-text overflow-auto">
            {{activeTask.content}}
         </pre>
        <!--提交按钮-->
        <div class="bd-button">
          <el-button v-if="!activeTask.is_com" @click="submitTask(activeTask)"  color="#5965F3" class="!text-[16px] w-[150px] !text-[#AEB1B8]" auto-insert-space :dark="true">提交</el-button>
          <el-button v-else @click="submitTask(activeTask)" link class="!text-[16px] w-[150px] !text-[#ff7774]" auto-insert-space :dark="true">撤回</el-button>
        </div>
        <!--小文字-->
        <div class="tip-box text-[9px]">
          <span class="text-[#6ad959] mr-9">已完成:{{currentNum}}</span>
          <span class="text-[#ff7774]">未完成:{{todoList.length-currentNum}}</span>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {
  activeTask,
  activeTaskChange,
  initPage,
  submitTask,
  todoList
} from "./currentDay.ts";

initPage()

const currentNum=computed(()=>todoList.value.filter(v=>v.is_com).length) // 当前的完成进度
</script>

<style scoped>

.content-container{
  @apply overflow-hidden h-full bg-[#5965F3] p-8 gap-9 flex-1 w-full flex justify-start items-center content-center
}
 .menu-container{
  @apply h-full  overflow-auto transition
}
.taskContent-container{
  @apply rounded flex-1 overflow-y-auto
}
.taskContent-container .bd-button{
  @apply h-[50px]
}

.taskContent-container .bd-text{
  @apply flex-1 w-full text-[#AEB1B8] p-2
}

.menu-container{
  @apply overflow-y-auto text-[15px] select-none h-full w-[180px] bg-[#1C1B2B] rounded text-[#7E8088] flex flex-col justify-start items-center content-center p-2
}

.menu-container .menu-item{
  @apply overflow-hidden relative w-[130px] active:text-white hover:bg-[#292742] whitespace-nowrap min-h-[50px] m-1 flex justify-center items-center content-center rounded
}
.menu-container .menu-item.menu-active{
  @apply bg-[#292742] text-white
}


.menu-item .status-dot{
  @apply absolute top-0 right-0 w-[10px] h-[10px] rounded-full
}

.menu-item .success-color{
  @apply bg-[#6AD959]
}
.menu-item .error-color{
  @apply bg-[#FF7774]
}

.content-container .taskContent-container{
  @apply flex-1 h-full bg-[#1C1B2B] flex  flex-col justify-end items-center content-center
}

</style>