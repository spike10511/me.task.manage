import {
    AddTaskApiParams,
    AddTaskCategoryApiParams,
    AddTaskCategoryApiResponse, AddTaskResponse,
    GetTaskCategoryListApiResponse
} from "./publishTask.type.ts";
import request from "../../helper/axios/axios.ts";


// 添加一个任务分类
export function addTaskCategoryApi(data:AddTaskCategoryApiParams):Promise<AxiosResponseDataType<AddTaskCategoryApiResponse>>{
    return request({
        url:"/task/root/addTaskCategory",
        method:"POST",
        isAuth:true,
        data
    })
}

// 获取任务类别
export function getTaskCategoryListApi():Promise<AxiosResponseDataType<GetTaskCategoryListApiResponse>>{
    return request({
        url:"/task/root/findTaskCategory",
        method:"GET",
        isAuth:true
    })
}

// 添加一条任务
export function addTaskApi(data:AddTaskApiParams):Promise<AxiosResponseDataType<AddTaskResponse>>{
    return request({
        url:"/task/root/addTask",
        method:"POST",
        isAuth:true,
        data
    })
}