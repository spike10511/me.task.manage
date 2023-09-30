import {appStore} from "../../common/app.pinia.ts";
import {reactive, ref} from "vue";
import {getCurrentTime} from "../../logic/mtime.ts";
import router from "../../helper/router/router.ts";
import {routePaths} from "../../helper/router/path.ts";
import {appThrowError, catchCallback} from "../../logic/app.ts";
import {elConfirm, elNotificationBox} from "../../logic/message.ts";
import {setUserInfoApi} from "../../common/app.api.ts";
import {UserInfo} from "../../common/app.type.ts";
import {SetPassParams} from "./learn.type.ts";
import {FormInstance, FormRules} from "element-plus";
import {setAvatar, setPasswordApi} from "./learn.api.ts";

export const appStore_ = appStore()
export const currentData = ref("")
export const currentTime = ref("")
export const drawerSwitch = ref(false)
export const avatarInput = ref<HTMLInputElement>()
export const form = reactive<UserInfo>({} as UserInfo)

export const passForm = reactive<SetPassParams>({} as SetPassParams) // 修改密码
export const passFormRules: FormRules<SetPassParams> = {
    username: [{required: true, message: "缺少用户名", trigger: "blur"}],
    confirm_new_pass: [{required: true, message: "新密码需要输入确认密码", trigger: "blur"}],
    old_pass: [{required: true, message: "请输入旧密码", trigger: "blur"}],
    new_pass: [{required: true, message: "请输入新密码", trigger: "blur"}],
}

export const passFormRef = ref()


let timer: any = null

export function initPage() {
    updateTime()
    timer = setInterval(() => {
        updateTime()
    })
}

// 点击头像触发事件
export function setAvatarHandle(inputFile: HTMLInputElement | undefined) {
    inputFile?.click()
}

// 头像文件获取事件
export async function avatarInputChange(event:Event) {
    try {
        const fileInput=event.target as HTMLInputElement
        if (!fileInput.files || fileInput.files.length === 0) {
            elNotificationBox("注意","请重新选择文件","warning",null)
            return; // 没有选择的文件
        }
        const file=fileInput.files[0];
        const formData=new FormData()
        formData.append("avatar",file)
        await setAvatar(formData)
        appStore_.updateUserInfo()
        elNotificationBox("恭喜","修改成功","success",null)
    }catch (e) {
        catchCallback((e as any).toString(),(msg)=>{
            elNotificationBox("警告",msg,"error",null)
        })
    }
}

// 打开抽屉
export function openDrawer() {
    drawerSwitch.value = true
    asyncUserInfo()
    passForm.username = form.user_name
}

// 提交密码
export function submitPass(FormEl: FormInstance | undefined) {
    if (!FormEl) return;
    if (form.user_name) {
        passForm.username = form.user_name
    }
    FormEl.validate(async (valid) => {
        if (valid) {
            try {
                const result = await setPasswordApi({
                    username: passForm.username,
                    old_pass: passForm.old_pass,
                    new_pass: passForm.new_pass,
                    confirm_new_pass: passForm.confirm_new_pass
                })
                if (result.data < 1) {
                    appThrowError("修改失败,受影响行数为0")
                } else {
                    elNotificationBox("惊讶", "密码修改成功了!", "success", null)
                }

            } catch (e) {
                catchCallback((e as any).toString(), (msg) => {
                    elNotificationBox("警告", msg, "warning", null)
                })
            }
        }
    })
}

// 同步用户信息到本页面
export function asyncUserInfo() {
    Object.assign(form, appStore_.userInfo)
}

// 抽屉中确认修改用户信息
export async function drawerConfirmSetUserInfo() {
    try {
        const result = await setUserInfoApi({
            qq: form.qq || "",
            github: form.github || "",
            wechat: form.wechat || "",
            avatar: form.avatar || "",
            email: form.email || "",
            nike_name: form.nike_name || "",
        })
        if (result.data < 1) {
            appThrowError("修改失败,0行受影响")
        }
        elNotificationBox("提示", "修改成功", "success", null)
        drawerSwitch.value = false
        appStore_.updateUserInfo()
    } catch (e) {
        catchCallback((e as any).toString(), (msg) => {
            elNotificationBox("警告", msg, "error", null)
        })
    }
}

// 前往设置模块
export function goTo(path: string) {
    if (path === routePaths.setting.path) {
        if (!appStore_.userInfo.is_root) {
            elConfirm("非超管禁止入内,请联系管理赋予权限或者登录超管账号!", () => {
            }, "警告", false)
            return
        }
    }
    router.push(path)
}

// 清楚定时器
export function clearTimer() {
    clearInterval(timer)
}


// 退出登录
export function loginOut() {
    elConfirm("想好了再退出?", () => {
        appStore_.removeToken()
        router.push(routePaths.login.path)
    }, "")
}

// 更新时间
const updateTime = () => {
    currentData.value = getCurrentTime().split(" ")[0]
    currentTime.value = getCurrentTime().split(" ")[1]
}



