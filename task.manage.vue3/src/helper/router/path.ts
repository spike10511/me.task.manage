import {LoginEnum, loginRoute} from "./modules/login.route.ts";
import {RouteRecordRaw} from "vue-router";
import {LearnEnum, learnRoute} from "./modules/learn.route.ts";
import {SettingEnum, settingRoute} from "./modules/setting.route.ts";
import {PublishTaskEnum} from "./modules/publishTask.route.ts";
import {TaskListEnum} from "./modules/taskList.route.ts";
import {CurrentDayTaskEnum} from "./modules/currentDayTask.route.ts";
import {TaskProgressEnum} from "./modules/taskProgress.route.ts";

// 类型
const allEnum={
    ...LoginEnum,
    ...LearnEnum,
    ...SettingEnum,
    ...PublishTaskEnum,
    ...TaskListEnum,
    ...CurrentDayTaskEnum,
    ...TaskProgressEnum
}

type RouterPathItem ={
    path:string;
    name:string;
}

type RouterPath={
    [key in keyof typeof allEnum]:RouterPathItem
}

// 处理
const allRoutes:RouteRecordRaw[]=[
    loginRoute,
    learnRoute,
    settingRoute
]

const routePaths={} as RouterPath
const routeCacheList:string[]=[]

// 递归获取路由信息
function getRouteInfo(routes_:RouteRecordRaw[],paths:RouterPath,prefix:string){
    for (let i = 0; i <routes_.length; i++) {
        const item=routes_[i]
        const currentPath=prefix+item.path
        paths[item.name as any]={
            path:currentPath,
            name:item.name
        } as RouterPathItem
        if(item.meta?.isCache){// 如果设置了缓存进入缓存列表
            routeCacheList.push(item.name as string)
        }
        if(item.children&&item.children.length>=1){// 有子路由继续添加
            getRouteInfo(item.children,paths,currentPath+"/")// 当前路径就是这些子路由的父路径也就是前缀了,为了拼接需要手动添加一个/
        }
    }
}

getRouteInfo(allRoutes,routePaths,"/")

export {routePaths,allRoutes,routeCacheList}