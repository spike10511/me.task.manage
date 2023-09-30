<template>
  <div class=" taskList-page p-3">
    <div class=" cursor-pointer">
      <el-button @click="refreshPageData" link type="warning">刷新</el-button>
    </div>
    <el-table height="80vh" class="el-tables" border :row-class-name="tableRowClassName" :data="tableData" style="width: 100%">
      <el-table-column width="90px" prop="id" label="任务ID"/>
      <el-table-column :filters="userFilterList" :filter-method="userFilterHandler" prop="user.user_name" label="用户"/>
      <el-table-column prop="task_category.cate_name" :filters="taskCategoryFilterList" :filter-method="taskCategoryFilterHandle" label="任务类别"/>
      <el-table-column prop="content" label="任务内容">
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
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button @click="setHandle(scope.row)" link type="primary" size="small">
            修改
          </el-button>
          <el-button @click="delHandle(scope.row)" link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 抽屉 -->
    <el-drawer size="60%" :with-header="false" v-model="drawerSwitch" direction="btt">
      <template #default>
        <el-form ref="formRef" inline :model="form" :rules="formRule">
          <el-form-item prop="task_id" label="任务ID">
           <span class="text-[#606266]"> {{form.task_id}}</span>
          </el-form-item>
          <el-form-item prop="user_id" label="用户ID">
            <span class="text-[#606266]"> {{form.user_id}}</span>
          </el-form-item>
          <el-form-item prop="task_category_id" label="任务类别">
            <el-select v-model="form.task_category_id">
              <el-option v-for="item in taskCategoryList" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="is_complete" label="完成状态">
            <el-select v-model="form.is_com">
              <el-option v-for="item in isCompleteSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="content" label="任务内容">
            <el-input @keyup.enter="drawerConfirm(formRef)" type="textarea" v-model="form.content"></el-input>
          </el-form-item>
          <el-form-item prop="start_time" label="开始时间">
            <el-date-picker
                value-format="YYYY-MM-DD hh:mm:ss"
                v-model="form.start_time"
                type="datetime"
                placeholder="选择开始时间"
            />
          </el-form-item>
          <el-form-item prop="end_time" label="结束时间">
            <el-date-picker
                v-model="form.end_time"
                type="datetime"
                placeholder="选择结束时间"
                value-format="YYYY-MM-DD hh:mm:ss"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawerSwitch=false">取消</el-button>
          <el-button type="primary" @click="drawerConfirm(formRef)">确认</el-button>
        </div>
      </template>
    </el-drawer>
  <!-- 对话框 -->
    <el-dialog v-model="dialogSwitch" :modal="false" draggable width="80%" align-center>
       <pre class="max-h-[500px] text-white overflow-auto rounded bg-teal-700 z-10 shadow-lg p-3">
        {{activeRow.content}}
    </pre>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">

import {
  drawerConfirm,
  formRef,
  drawerSwitch,
  form,
  initPage,
  formRule,
  tableData,
  tableRowClassName,
  taskCategoryList,
  isCompleteSelect,
  setHandle,
  delHandle,
  dialogSwitch,
  activeRowHandle,
  activeRow,
  isComFilterList,
  userFilterList,
  isComFilterHandler,
  userFilterHandler,
  taskCategoryFilterHandle,
  taskCategoryFilterList,
  refreshPageData
} from "./taskList.ts";
import {Task} from "./taskList.type.ts";
import {checkIsNowDay} from "../../logic/mtime.ts";


initPage()
</script>

<style scoped>
:deep(.el-tables .table-row) {
  --el-table-tr-bg-color:rgba(28, 27, 43,1);
  --el-table-row-hover-bg-color: #292742;
}
</style>