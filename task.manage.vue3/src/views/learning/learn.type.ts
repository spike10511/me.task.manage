
// tag 普通

import {UserInfo} from "../../common/app.type.ts";

export interface Task {
    start_time: string;
    end_time: string;
    id: number;
    user_id: number;
    task_category_id: number;
    is_com: number;
    content: string;
    task_category: {
        id: number;
        cate_name: string;
    };
    user?:UserInfo
}

// 左侧列表
export type TodoListType=Task[]


// tag 接口响应
// api 获取当天任务
export type CurrentDayTaskApiResponse = Task[]

// 修改密码
export type SetPassResponse=number;

// 修改头像
export type SetAvatarResponse=string;

// tag 接口参数

// 修改密码
export type SetPassParams={
    username:string; //用户名
    old_pass:string;// 旧密码
    new_pass:string;// 新密码
    confirm_new_pass:string;// 新确认密码
}

// 修改头像
export type SetAvatarParams=FormData