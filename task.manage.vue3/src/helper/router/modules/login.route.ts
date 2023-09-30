import {RouteRecordRaw} from "vue-router";


export const loginRoute:RouteRecordRaw={
    path: "login",
    name: "login",
    component: () => import("../../../views/login/login.vue"),
    meta:{
        isCache:true
    }
}


export enum LoginEnum{
    login
}