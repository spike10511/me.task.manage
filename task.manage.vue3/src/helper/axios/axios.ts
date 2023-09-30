
import Axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios"
import { elNotificationBox} from "../../logic/message.ts";
import {appStore} from "../../common/app.pinia.ts";
import {getLocalWithExpiry} from "../../logic/local.ts";
import {token_key} from "../../constant/key.ts";
const request=Axios.create({
    baseURL:"/api",
    timeout:3000
})



request.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    if(config.isAuth){
        const token=getLocalWithExpiry(token_key,"")
        if (token){
            config.headers["Authorization"]="Bearer "+token
        }
    }
    return config
},(error:AxiosError) => {
    if(error?.status===502){
        elNotificationBox("错误","服务器未开!","error",null)
    }
    return error
})

request.interceptors.response.use((response:AxiosResponse)=>{
    return response.data
},({response}) => {
    const status=response.status
    const data=response.data as AxiosResponseDataType<any>
    if (status===422){// 参数验证错误
        elNotificationBox("警告",data.message,"warning",null)
    }else if(status===401){// 无权限,token验证失败
        elNotificationBox("错误",data.message,"error",null)
        const appStore_=appStore()
        appStore_.removeToken()
    }else if(status===404){// 路径错误
        elNotificationBox("错误",data.message,"error",null)
    }else if(status===400){// 其他被捕捉的错误
        elNotificationBox("错误",data.message,"error",null)
    }else if(status===500||status===502){// 程序错误,被全局捕获
        if(data){
            elNotificationBox("错误",data.message,"error",null)
        }else {
            elNotificationBox("错误","服务器未开!","error",null)
        }
    }
    return Promise.reject(data)
})


export default request