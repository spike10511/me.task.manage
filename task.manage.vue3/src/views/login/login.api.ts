

import request from "../../helper/axios/axios.ts";
import {LoginApiResponse, LoginDto, RegisterDto} from "./login.type.ts";

export function loginApi(data: LoginDto):Promise<AxiosResponseDataType<LoginApiResponse>> {
  return request({
    url: "/user/login",
    method: "POST",
    data,
  });
}

export function registerApi(data:RegisterDto){
  return request({
    url:"/user/register",
    method:"POST",
    data,
  })
}