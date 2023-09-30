<template>
  <div class="publishTask-page p-9 text-[#a7b1c2]">
    <div class="pt-2 pb-2 border flex gap-5 justify-center items-center content-center">
      <div>
        添加一个任务分类:
      </div>
      <div>
        <el-input @keyup.enter="submit" v-model.trim="localInputV"></el-input>
      </div>
      <el-button class="w-[100px]" :loading="loading" type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">

import {ref} from "vue";

const props=defineProps({
  inputV:String,
  loading:Boolean
})
const emit=defineEmits()
const localInputV=ref(props.inputV)

const submit=()=>{
  emit("submit",localInputV.value)
}

</script>