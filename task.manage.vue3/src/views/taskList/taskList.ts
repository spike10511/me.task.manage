import {reactive, ref} from "vue";
import {DelTaskParams, Form, SetTaskParams, TableDataItem, Task} from "./taskList.type.ts";
import {appThrowError, catchCallback} from "../../logic/app.ts";
import {elConfirm, elNotificationBox} from "../../logic/message.ts";
import {delTaskApi, getTaskListApi, setTaskApi} from "./taskList.api.ts";
import {FormInstance, FormRules} from "element-plus";
import {getTaskCategoryListApi} from "../publishTask/publishTask.api.ts";
import {TaskCategory} from "../publishTask/publishTask.type.ts";
import {formInitData} from "./formInitData.ts";


export const tableData = ref<TableDataItem[]>()
export const drawerSwitch = ref(false)
export const dialogSwitch = ref(false)
export const activeRow = reactive<Form>({} as Form) // 选中的行
type FilterListType = { text: any, value: any }
export const userFilterList = ref<FilterListType[]>([]) // 用户筛选列表
export const taskCategoryFilterList = ref<FilterListType[]>([]) // 任务列表筛选列表
export const isComFilterList: FilterListType[] = [
    {
        text: "已完成",
        value: 1
    }, {
        text: "未完成",
        value: 0
    }
] // 是否完成筛选列表
export const formRef = ref()
export const taskCategoryList = ref<TaskCategory[]>([])
export const isCompleteSelect = [
    {
        label: '已完成',
        value: 1
    },
    {
        label: '未完成',
        value: 0
    }
]
export const form = reactive<Form>({...formInitData})

export const formRule: FormRules<Task> = {
    content: [{required: true, message: "请填写任务内容!", trigger: 'submit'}],
    task_category_id: [{required: true, message: "请选择任务类别!", trigger: 'blur'}],
    end_time: [{required: true, message: "请选择结束时间!", trigger: 'blur'}],
    start_time: [{required: true, message: "请选择开始时间!", trigger: 'blur'}],
    task_id: [{required: true, message: "缺少任务ID!", trigger: 'blur'}],
    user_id: [{required: true, message: "缺少用户ID!", trigger: 'blur'}],
    is_com: [{required: true, message: "请选择任务状态!", trigger: 'blur'}],
}

// 选中了table中某一行
export function activeRowHandle(row: Form) {
    Object.assign(activeRow, row)
    dialogSwitch.value = true
}

// 初始化数据
export function initPage() {
    getTaskList()
    getTaskCategoryList()
}

// 修改按钮
export function setHandle(row: TableDataItem) {
    form.task_id = row.id
    Object.assign(form, row)
    drawerSwitch.value = true
}

// 删除按钮
export function delHandle(row: TableDataItem) {
    try {
        elConfirm("确认好再删除?", async () => {
            await delTask(row.id)
            refreshPageData()
            elNotificationBox("提示", "删除成功", "success", null)
        })
    } catch (e) {
        catchCallback((e as any).toString(), (msg) => {
            elNotificationBox("警告", msg, "error", null)
        })
    }
}

// 刷新过滤表列表
export function updateTaskFilterList(tableData:TableDataItem[]){
    let userFileterSet=new Set()
    let taskCategorySet=new Set()
    for (const row of tableData) {
        userFileterSet.add(row.user?.user_name)
        taskCategorySet.add(row.task_category.cate_name)
    }

    userFilterList.value=Array.from(userFileterSet).map(v=>({
        text:v,
        value:v
    }))
    taskCategoryFilterList.value=Array.from(taskCategorySet).map(v=>({
        text:v,
        value:v
    }))
}

// 抽屉确认按钮事件
export function drawerConfirm(formEl: FormInstance | undefined) {
    if (!formEl) return;
    formEl.validate(async (valid) => {
        try {
            if (valid) {
                await setTask({
                    user_id: form.user_id,
                    content: form.content,
                    is_complete: form.is_com,
                    task_category_id: form.task_category_id as number,
                    start_time: form.start_time,
                    task_id: form.task_id,
                    end_time: form.end_time
                })
                refreshPageData()
                elNotificationBox("提示", "修改成功!", "success", null)
                drawerSwitch.value = false
                resetData()
            } else {
            }
        } catch (e) {
            catchCallback((e as any).toString(), (msg) => {
                elNotificationBox("警告", msg, "warning", null)
            })
        }
    })
}

// 修改任务
async function setTask(params: SetTaskParams) {
    const result = await setTaskApi(params)
    if (result.data < 1) {
        appThrowError("修改失败,受影响行数为0")
    }
}

// 删除任务
async function delTask(params: DelTaskParams) {
    const result = await delTaskApi(params)
    if (result.data < 1) {
        appThrowError("删除失败,受影响行数为0")
    }
}

// 斑马纹样式
export const tableRowClassName = () => 'table-row';

// 获取任务列表
async function getTaskList(isRefresh=false) {
    try {
        const result = await getTaskListApi()
        tableData.value = result.data
        updateTaskFilterList(result.data)
        if(isRefresh){
            elNotificationBox("恭喜", "刷新好嘞", "success", null)
        }
    } catch (e) {
        catchCallback((e as any).toString(), (msg) => {
            elNotificationBox("警告", msg, "warning", null)
        })
    }
}

// 获取任务类别列表
async function getTaskCategoryList() {
    try {
        const result = await getTaskCategoryListApi()
        taskCategoryList.value = result.data
    } catch (e) {
        catchCallback((e as any).toString(), (msg) => {
            elNotificationBox("警告", msg, "warning", null)
        })
    }
}

// 刷新数据
export function refreshPageData() {
    getTaskList(true)
}

// 重置数据
function resetData() {
    Object.assign(form, formInitData)
}


// 过滤方法
export const isComFilterHandler = (
    value: number,
    row: TableDataItem
) => {
    return row.is_com === value
}

// 用户过滤方法
export const userFilterHandler = (
    value: string,
    row: TableDataItem
) => {
    return row.user?.user_name === value
}

// 任务列表过滤方法
export const taskCategoryFilterHandle = (
    value: string,
    row: TableDataItem
) => {
    return row.task_category.cate_name === value
}
