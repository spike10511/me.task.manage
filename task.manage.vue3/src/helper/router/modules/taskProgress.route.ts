import {RouteRecordRaw} from "vue-router";


export const taskProgressRoute:RouteRecordRaw={
    path:"taskProgressRoute",
    name:"taskProgressRoute",
    component:()=>import("../../../views/learning/taskProgress/taskProgress.vue"),
    meta:{
        isCache:false
    }
}



export enum TaskProgressEnum{
    taskProgressRoute
}