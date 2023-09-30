
import {defineStore} from "pinia";
import {getLocalWithExpiry, removeLocal, setLocalWithExpiry} from "../logic/local.ts";
import {token_key} from "../constant/key.ts";
import {getCurrentTime} from "../logic/mtime.ts";
import {UserInfo} from "./app.type.ts";
import {userInfoApi} from "./app.api.ts";


export const appStore=defineStore("appStore",{
    state:()=>{
        return {
            TOKEN :getLocalWithExpiry(token_key,""),
            tipList:["sdf",'sdfsdfsdf'] as string[],
            userInfo:{} as UserInfo,
            isLogin:false,
        }
    },
    actions:{
        // 更新用户信息
        async updateUserInfo(){
            const result=await userInfoApi()
            this.userInfo=result.data
            this.isLogin=true
        },
        // 更新token
        updateToken(newToken:string){
            this.TOKEN=newToken
            this.isLogin=true
            setLocalWithExpiry(token_key,newToken,0)
        },
        // 删除token
        removeToken(){
            this.TOKEN=""
            this.isLogin=false
            removeLocal(token_key)
        },
        // 添加提示
        addTip(tip:string){
            const time=getCurrentTime().split(" ")[1]
            if(this.tipList.length>=9){
                this.tipList.shift()
            }
            this.tipList.push(tip+'-----'+time)
        },
        // 清空提示
        clearTip(){
            this.tipList=[]
        }
    }
})


