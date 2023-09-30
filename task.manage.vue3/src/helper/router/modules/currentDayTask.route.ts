import {RouteRecordRaw} from "vue-router";


export const currentDayTaskRoute:RouteRecordRaw={
    path:"currentDayTaskRoute",
    name:"currentDayTaskRoute",
    component:()=>import("../../../views/learning/currentDay/currentDay.vue"),
    meta:{
        isCache:false
    }
}


export enum CurrentDayTaskEnum{
    currentDayTaskRoute
}