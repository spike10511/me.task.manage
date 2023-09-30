import {RouteRecordRaw} from "vue-router";


export const taskListRoute:RouteRecordRaw={
    path:"taskList",
    name:"taskList",
    component:()=>import("../../../views/taskList/taskList.vue"),
    meta:{
        isCache:false
    }
}

export enum TaskListEnum {
    taskList
}