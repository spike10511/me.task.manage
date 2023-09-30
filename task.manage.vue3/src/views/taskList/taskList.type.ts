

import {TaskCategory} from "../publishTask/publishTask.type.ts";
import {UserInfo} from "../../common/app.type.ts";
// tag 普通类型

// 任务对象
export type Task={
    start_time:string;
    end_time:string;
    task_id:number;
    user_id:number;
    task_category_id?:number;
    is_com:0|1;
    content:string;
}

// form 表单
export type Form=Task & {
    id:number;
    user?:UserInfo
}

// 任务列表
export type TableDataItem ={
    start_time:string;
    end_time:string;
    id:number;
    user_id:number;
    task_category_id?:number;
    is_com:0|1;
    content:string;
    task_category:TaskCategory;
    user?:UserInfo;
}

// tag 接口响应

// 获取任务列表
export type GetTaskListResponse=TableDataItem[]

// 修改任务
export type SetTaskResponse=number;

// 删除任务
export type DelTaskResponse=number;

// tag 接口参数

// 修改任务
export type SetTaskParams={
    user_id:number;
    task_category_id:number;
    is_complete:0|1;
    content:string;
    start_time:string;
    end_time:string;
    task_id:number;
}

// 删除任务
export type DelTaskParams=number;