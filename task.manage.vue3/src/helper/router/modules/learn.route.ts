import {RouteRecordRaw} from "vue-router";
import {currentDayTaskRoute} from "./currentDayTask.route.ts";
import {taskProgressRoute} from "./taskProgress.route.ts";


export const learnRoute: RouteRecordRaw = {
    path: "learning",
    name: "learning",
    redirect:"/learning/"+currentDayTaskRoute.path,
    component: () => import("../../../views/learning/learn.vue"),
    meta:{
        isCache:true
    },
    children:[
        currentDayTaskRoute,
        taskProgressRoute
    ]
}


export enum LearnEnum {
    learning
}