import {reactive, ref} from "vue";
import {appThrowError, catchCallback} from "../../logic/app.ts";
import {addTaskApi, addTaskCategoryApi, getTaskCategoryListApi} from "./publishTask.api.ts";
import {elNotificationBox} from "../../logic/message.ts";
import {AllUserListSelect, TaskCategory, TaskForm} from "./publishTask.type.ts";
import {getCurrentTime} from "../../logic/mtime.ts";
import {FormInstance, FormRules} from "element-plus";
import {getAllUserInfoApi} from "../../common/app.api.ts";


export const taskCategory = ref("")// input 分类
export const taskRef = ref()
export const taskCategoryList = ref<TaskCategory[]>([])
export const button_loading=ref(false)
export const isCompleteSelect = [{
    label: "已完成",
    value: 1,
},{
    label: "未完成",
    value: 0,
}]
export const allUserSelect=ref<AllUserListSelect>([]) // 用户id选择框
export const form = reactive<TaskForm>({
    task_category_id: undefined,
    is_complete: 0,
    content: "",
    start_time: getCurrentTime(),
    end_time: getCurrentTime(),
    user_id:undefined,
})

export const formRules:FormRules<TaskForm>=({
    task_category_id:[{required:true,message:"请选择任务类别!",trigger:'blur'}],
    is_complete:[{required:true,message:"请选择是否完成!",trigger:'blur'}],
    content:[{required:true,message:"请填写任务内容!",trigger:'blur'}],
    start_time:[{required:true,message:"请选择开始时间!",trigger:'blur'}],
    end_time:[{required:true,message:"请选择结束时间!",trigger:'blur'}],
    user_id:[{required:true,message:"请选择用户!",trigger:'blur'}],
})

// 页面初始化
export function initPage() {
    getTaskCategoryList()
    getAllUserInfo()
}

// 提交任务
export async function submitTask(formEl: FormInstance | undefined){
    if(!formEl)return;
    await formEl.validate(async (valid)=>{
        if(valid){
            try {
                button_loading.value=true
                const result=await addTaskApi({
                    user_id:form.user_id as number,
                    task_category_id:form.task_category_id as number,
                    start_time:form.start_time,
                    end_time:form.end_time,
                    content:form.content,
                    is_complete:form.is_complete
                })
                if(result.data>=1){
                    elNotificationBox("提示","任务添加成功!","success", null)
                }else{
                    appThrowError("任务添加失败,0行记录受影响")
                }
            }catch (e:any) {
                catchCallback(e.toString(),(msg)=>{
                    elNotificationBox("警告", msg, "warning",null)
                })
            }finally {
                button_loading.value=false
            }
        }
    })
}

// 添加一个任务分类
export async function addTaskCategory(inputV: string) {
    try {
        if (!inputV) {
            appThrowError("请填写内容!")
        }
        button_loading.value=true
        await addTaskCategoryApi({
            name: inputV,
        })
        elNotificationBox("提示", "提交成功!", "success", "bottom-right")
        refreshPageData()
    } catch (e: any) {
        catchCallback(e.toString(), (msg) => {
            elNotificationBox("警告", msg, "warning",null)
        })
    }finally {
        button_loading.value=false
    }
}



// 获取任务类别
export async function getTaskCategoryList() {
    try {
        const result = await getTaskCategoryListApi()
        taskCategoryList.value = result.data
    } catch (e: any) {
        catchCallback(e.toString(), (msg) => {
            elNotificationBox("警告", msg, "warning",null)
        })
    }
}



// 刷新数据
export function refreshPageData(){
    getTaskCategoryList()
}

// 获取所有用户信息
async function getAllUserInfo(){
    try {
        const result=await getAllUserInfoApi()
        allUserSelect.value=[]
        for (const user of result.data) {
            allUserSelect.value.push({
                userId:user.id,
                userName:user.user_name
            })
        }
    }catch (e) {
        catchCallback((e as any).toString(),(msg)=>{
            elNotificationBox("警告",msg,"error",null)
        })
    }
}
