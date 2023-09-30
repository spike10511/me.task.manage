import { defineStore } from "pinia";
import {savePass_key} from "../../constant/key.ts";
import {loginApi, registerApi} from "./login.api.ts";
import {setLocalWithExpiry} from "../../logic/local.ts";
import {SaveUserAndPassStore, LoginDto, RegisterFormStore, LoginApiResponse} from "./login.type.ts";
import {appThrowError} from "../../logic/app.ts";

export const loginStore = defineStore("loginStore", {
  state: () => {
    return {};
  },
  actions: {
    // 登录
    async login(data: LoginDto):Promise<LoginApiResponse> {
      const result = await loginApi({
        username: data.username,
        password: data.password,
      });
      return result.data
    },
    // 注册
    async register(data:RegisterFormStore){
      if (data.password!==data.passwordConfirm){
        appThrowError("2次密码不一致!")
      }
      await registerApi({
        username:data.username,
        password:data.password
      })
    },
    // 记住密码
    savePassFn(data:SaveUserAndPassStore){
      setLocalWithExpiry(savePass_key,data,0)
    }
  },
});
