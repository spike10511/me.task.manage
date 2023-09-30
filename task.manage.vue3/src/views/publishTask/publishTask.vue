<template>
  <div class="publishTask-page p-9 text-[#a7b1c2]">
    <row-input :loading="button_loading" :input-v="taskCategory" @submit="addTaskCategory"></row-input>
    <!--  提交一个大任务  -->
    <div class="submit-task-box border p-3 w-2/3 ml-auto mr-auto">
      <el-form ref="taskRef" :model="form" :rules="formRules">
        <el-form-item label="选择用户" prop="user_id">
          <el-select v-model="form.user_id">
            <el-option v-for="item in allUserSelect" :key="item.userId" :label="item.userName"
                       :value="item.userId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务类别" prop="task_category_id">
          <el-select v-model="form.task_category_id">
            <el-option v-for="item in taskCategoryList" :key="item.id" :label="item.cate_name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否完成" prop="is_complete">
          <el-select v-model="form.is_complete">
            <el-option v-for="item in isCompleteSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务内容" prop="content">
          <el-input @keyup.enter="submitTask(taskRef)" type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="start_time">
              <el-date-picker
                  value-format="YYYY-MM-DD hh:mm:ss"
                  v-model="form.start_time"
                  type="datetime"
                  placeholder="Select date and time"
              />
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker
              v-model="form.end_time"
              type="datetime"
              value-format="YYYY-MM-DD hh:mm:ss"
          />
        </el-form-item>
        <el-form-item class="btn-form-item">
          <el-button :loading="button_loading" @click="submitTask(taskRef)" class="w-[200px]" type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  addTaskCategory, allUserSelect, button_loading,
  form, formRules,
  initPage,
  isCompleteSelect,
  submitTask,
  taskCategory,
  taskCategoryList, taskRef
} from "./publishTask.ts";
import RowInput from "../../components/rowInput/rowInput.vue";

initPage()
</script>

<style scoped>
:deep(.el-form-item__label) {
  @apply !text-[#a7b1c2] select-none
}

.btn-form-item :deep(.el-form-item__content) {
  justify-content: center;
}



</style>