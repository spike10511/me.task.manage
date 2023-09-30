import {reactive, ref} from "vue";
import {Task, TodoListType} from "../learn.type.ts";
import {elConfirm, elNotificationBox} from "../../../logic/message.ts";
import {currentDayTaskApi, submitTaskApi} from "../learn.api.ts";
import {catchCallback} from "../../../logic/app.ts";



export const activeTask=reactive<Task>({} as Task) // 选中的任务

export const todoList = ref<TodoListType>([])


export function initPage() {
    getCurrentDayTask()
}




// 选中某条任务
export function activeTaskChange(task:Task){
    Object.assign(activeTask,task)
}


// 提交单个任务
export function submitTask(task: Task) {
    try {
        if(!task.id){
            elNotificationBox("警告","请选择任务!","warning",null)
            return
        }
        let titleStr="交付任务!"
        if(task.is_com){
            titleStr="出了点状况,任务需要撤回提交!"
        }
        elConfirm(titleStr,async ()=>{
            await submitTaskApi(task.id)
            elNotificationBox("恭喜","操作成功","success",null)
            activeTask.is_com=activeTask.is_com===0?1:0;
            getCurrentDayTask()
        },"别耍小聪明")
    } catch (e) {
        catchCallback((e as any).toString(),(msg)=>{
            elNotificationBox("警告",msg,"warning",null)
        })
    }
}


// 获取当天任务
async function getCurrentDayTask() {
    try {
        const result = await currentDayTaskApi()
        todoList.value=result.data
    } catch (e) {
        catchCallback((e as any).toString(),(msg)=>{
            elNotificationBox("警告",msg,"warning",null)
        })
    }
}