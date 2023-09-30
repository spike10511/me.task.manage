import {reactive, ref} from "vue";
import {FormInstance, FormRules} from "element-plus";
import {getLocalWithExpiry} from "../../logic/local.ts";
import {savePass_key} from "../../constant/key.ts";
import {LoginFormStore, SaveUserAndPassStore} from "./login.type.ts";
import {loginStore} from "./login.pinia.ts";
import {elMessage_, elNotificationBox} from "../../logic/message.ts";
import {catchCallback} from "../../logic/app.ts";
import {appStore} from "../../common/app.pinia.ts";
import {routePaths} from "../../helper/router/path.ts";
import router from "../../helper/router/router.ts";

export const isLogin = ref(true);
export const formRef = ref<FormInstance>();
export const registerFormRef = ref<FormInstance>();
export const savePass = ref(false);// 是否保存密码
const loginStore_ = loginStore();
const appStore_=appStore()

export const form = reactive<LoginFormStore>({
    username: "",
    password: "",
});
export const registerForm = reactive({
    username: "",
    password: "",
    password2: "",
});
export const rules = reactive<FormRules>({
    username: [{required: true, message: "账号必填!", trigger: "blur"}],
    password: [{required: true, message: "密码必填!", trigger: "blur"}],
});
export const registerRules = reactive<FormRules>({
    username: [{required: true, message: "账号必填!", trigger: "blur"}],
    password: [{required: true, message: "密码必填!", trigger: "blur"}],
    password2: [{required: true, message: "密码必填!", trigger: "blur"}],
});




export const button_loading = ref(false);


export function pageInit() {
    const userAndPass = getLocalWithExpiry(savePass_key, {}) as SaveUserAndPassStore
    form.password = userAndPass.password
    form.username = userAndPass.username
    savePass.value = userAndPass.isSave
}

function formElValidate(formEl: FormInstance | undefined, callback: any) {
    formEl?.validate(async (valid) => {
        if (valid) {
            await callback()
        } else {
            console.log("error submit!");
            return false;
        }
    });
}

// 登录操作
export function loginHandle(formEl: FormInstance | undefined) {
    formElValidate(formEl, async () => {
        try {
            button_loading.value = true
            const result=await loginStore_.login({
                username: form.username,
                password: form.password,
            });
            // 记住密码
            loginStore_.savePassFn({
                username: form.username,
                password: form.password,
                isSave: savePass.value
            })
            // 保存token
            appStore_.updateToken(result.token)

            // 进入页面
            await  router.push(routePaths.learning.path)
            // 更新个人信息
            appStore_.updateUserInfo()
        } catch (e:any) {
            catchCallback(e.toString(),()=>{})
        }finally {
            button_loading.value = false
        }
    })
}

// 注册操作
export function registerHandle(formEl: FormInstance | undefined) {
    formElValidate(formEl, async () => {
        try {
            button_loading.value = true
            await loginStore_.register({
                username: registerForm.username,
                password: registerForm.password,
                passwordConfirm: registerForm.password2
            });
            elMessage_("注册成功,请登录!","success")
            isLogin.value=true
        } catch (e:any) {
          catchCallback(e.toString(),(msg:string)=>{
              elNotificationBox("错误",msg,"error",null)
          })
        } finally {
            button_loading.value = false
        }
    })
}