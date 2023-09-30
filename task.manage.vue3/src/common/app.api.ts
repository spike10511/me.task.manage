import request from "../helper/axios/axios.ts";
import {GetAllUserInfoResponse, GetUserInfoResponse, SetUserInfoParams, SetUserInfoResponse} from "./app.type.ts";


// 获取用户信息
export function userInfoApi():Promise<AxiosResponseDataType<GetUserInfoResponse>>{
    return request({
        url:"/user/auth/getUserInfo",
        method:"GET",
        isAuth:true
    })
}

// 获取所有的用户信息
export function getAllUserInfoApi():Promise<AxiosResponseDataType<GetAllUserInfoResponse>>{
    return request({
        url:"/user/root/findAllUser",
        method:"GET",
        isAuth:true
    })
}

// 修改用户信息
export function setUserInfoApi(params:SetUserInfoParams):Promise<AxiosResponseDataType<SetUserInfoResponse>>{
    return request({
        url:"/user/auth/setUserInfo",
        method:"PUT",
        isAuth:true,
        data:params
    })
}