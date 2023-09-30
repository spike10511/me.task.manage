import {RouteRecordRaw} from "vue-router";


export const publishTaskRoute:RouteRecordRaw={
    path:'publishtask',
    name:"publishTask",
    component:()=>import("../../../views/publishTask/publishTask.vue"),
    meta:{
        isCache:true
    }
}


export enum PublishTaskEnum{
    publishTask
}