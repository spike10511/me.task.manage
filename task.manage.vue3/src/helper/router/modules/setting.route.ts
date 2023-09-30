import {RouteRecordRaw} from "vue-router";
import {publishTaskRoute} from "./publishTask.route.ts";
import {taskListRoute} from "./taskList.route.ts";



export const settingRoute:RouteRecordRaw={
    path:"setting",
    name:"setting",
    redirect:"/setting/"+publishTaskRoute.path,
    component:()=>import("../../../views/setting/setting.vue"),
    children:[
        publishTaskRoute,
        taskListRoute,
    ],
    meta:{
        isCache:true
    }
}


export enum SettingEnum {
    setting
}