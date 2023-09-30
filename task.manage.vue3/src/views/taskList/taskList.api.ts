import {DelTaskParams, DelTaskResponse, GetTaskListResponse, SetTaskParams, SetTaskResponse} from "./taskList.type.ts";
import request from "../../helper/axios/axios.ts";


// 获取所有任务列表
export function getTaskListApi():Promise<AxiosResponseDataType<GetTaskListResponse>>{
    return request({
        url:"/task/root/findAllTask",
        method:"GET",
        isAuth:true
    })
}

// 修改任务
export function setTaskApi(params:SetTaskParams):Promise<AxiosResponseDataType<SetTaskResponse>>{
    return request({
        url:"/task/root/putTask",
        method:"PUT",
        isAuth:true,
        data:params
    })
}

// 删除任务
export function delTaskApi(params:DelTaskParams):Promise<AxiosResponseDataType<DelTaskResponse>>{
    return request({
        url:`/task/root/delTask/${params}`,
        method:"DELETE",
        isAuth:true
    })
}