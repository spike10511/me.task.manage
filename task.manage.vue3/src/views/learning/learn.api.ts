

// 获取当天任务
import {
    CurrentDayTaskApiResponse,
    SetAvatarParams,
    SetAvatarResponse,
    SetPassParams,
    SetPassResponse
} from "./learn.type.ts";
import request from "../../helper/axios/axios.ts";

// 获取当天任务
export function currentDayTaskApi():Promise<AxiosResponseDataType<CurrentDayTaskApiResponse>>{
    return request({
        url:"/task/auth/getCurrentTask",
        method:"GET",
        isAuth:true
    })
}

// 获取所有历史任务
export function historyAllTaskApi():Promise<AxiosResponseDataType<CurrentDayTaskApiResponse>>{
    return request({
        url:"/task/auth/getUserAllTask",
        method:"GET",
        isAuth:true
    })
}

// 修改某一条任务完成状态
export function submitTaskApi(task_id:number):Promise<AxiosResponseDataType<number>>{
    return request({
        url:`/task/auth/putTaskStatus/${task_id}`,
        method:"PUT",
        isAuth:true
    })
}

// 修改密码
export function setPasswordApi(params:SetPassParams):Promise<AxiosResponseDataType<SetPassResponse>>{
    return request({
        url:"/user/auth/setPass",
        method:"PUT",
        isAuth:true,
        data:params
    })
}

// 修改头像
export function setAvatar(formData_:SetAvatarParams):Promise<AxiosResponseDataType<SetAvatarResponse>>{
    return request({
        url:"/user/auth/setAvatar",
        method:"PUT",
        isAuth:true,
        data:formData_,
        headers:{
            "Content-Type":"multipart/form-data;"
        }
    })
}