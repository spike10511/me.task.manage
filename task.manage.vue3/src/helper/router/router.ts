import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import {allRoutes, routePaths} from "./path.ts";
import {getLocalWithExpiry} from "../../logic/local.ts";
import {token_key} from "../../constant/key.ts";
import {elNotificationBox} from "../../logic/message.ts";
import {noAuthTip} from "../../constant/tip.ts";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/login",
        children:[
            ...allRoutes
        ]
    },
];



const router = createRouter({
    routes,
    history: createWebHashHistory()
})

router.beforeEach((to) => {
    const token = getLocalWithExpiry(token_key,"") || null;
    if (to.path === routePaths.login.path) {
       //正常通行
    } else {
        if (!token) {
            console.log("阻止通行,先登录");
            elNotificationBox("警告",noAuthTip, "warning",null);
            return {
                path: routePaths.login.path,
            };
        }
        //正常通行
    }
});

export default router