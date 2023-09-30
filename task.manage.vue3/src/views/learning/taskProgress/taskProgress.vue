<template>
  <div class="taskProgress-page flex flex-col justify-center items-center content-center relative content-container">
    <!-- 表格 -->
    <el-table height="50vh" class="el-tables" border :row-class-name="tableRowClassName" :data="allTask" style="width: 100%">
      <el-table-column width="69px"  prop="id" label="任务ID"/>
      <el-table-column  prop="user.user_name" label="用户"/>
      <el-table-column prop="task_category.cate_name" :filters="taskCategoryFilterList" :filter-method="taskCategoryFilterHandle" label="任务类别"/>
      <el-table-column prop="content" label="任务内容(可点击查看)">
        <template #default="scope">
          <div @click="activeRowHandle(scope.row)" class="max-h-[100px]">
            {{scope.row.content}}
          </div>
        </template>
      </el-table-column>
      <el-table-column :filters="isComFilterList" :filter-method="isComFilterHandler" prop="is_com" label="是否完成">
        <template #default="scope">
          <span class="text-[#6ad959]" v-if="(scope.row as Task).is_com">已完成</span>
          <span class="text-[#ff7774]" v-else>未完成</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" prop="start_time" label="开始时间"></el-table-column>
      <el-table-column width="180px" prop="end_time" label="结束时间">
        <template #default="scope">
          <span v-if="checkIsNowDay(scope.row.end_time)" class="text-[#008080] font-bold">{{scope.row.end_time}}</span>
          <span v-else>{{scope.row.end_time}}</span>
        </template>
      </el-table-column>
    </el-table>
      <div id="barChart" class="charts-container overflow-hidden flex-1 bg-[#1c1b2b]">
      </div>
    <div class="absolute top-[3px] left-[5px] cursor-pointer">
      <el-button @click="refreshPageData" link type="warning">刷新</el-button>
    </div>
    <!-- 对话框 -->
    <el-dialog v-model="dialogSwitch" :modal="false" draggable width="80%" align-center>
       <pre class="max-h-[500px] text-white overflow-auto rounded bg-teal-700 z-10 shadow-lg p-3">
        {{activeRow.content}}
    </pre>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted,onBeforeUnmount} from "vue";
import {
  activeRow, activeRowHandle,
  allTask, dialogSwitch,
  initChart,
  initPageData, isComFilterHandler, isComFilterList,
  loadChart,
  refreshPageData,
  tableRowClassName, taskCategoryFilterHandle,
  taskCategoryFilterList
} from "./taskProgress.ts";
import {handleResize} from "./taskProgress.ts";
import {Task} from "../../taskList/taskList.type.ts";
import {checkIsNowDay} from "../../../logic/mtime.ts";


initPageData()

onMounted(()=>{

  initChart("barChart")

  loadChart()

  // 监听窗口大小变化，更新图表大小
  window.addEventListener('resize', handleResize);
})

onBeforeUnmount(()=>{
  // 在组件销毁前移除窗口大小变化事件监听器
  window.removeEventListener('resize', handleResize);
})
</script>

<style scoped>
.content-container{
  @apply overflow-hidden h-full bg-[#5965F3] p-8 gap-9 flex-1 w-full flex justify-start items-center content-center
}
.charts-container{
  @apply w-full h-full rounded overflow-hidden
}
:deep(.el-tables .table-row) {
  --el-table-tr-bg-color:rgba(28, 27, 43,1);
  --el-table-row-hover-bg-color: #292742;
}
</style>