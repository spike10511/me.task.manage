
// tag 普通
export type UserInfo={
    id:number;
    user_name:string;
    nike_name:string;
    avatar:string;
    qq:string;
    wechat:string;
    email:string;
    github:string;
    is_del:0|1;
    update_time:string;
    is_root?:boolean;
}


// tag 接口参数
// 修改用户信息
export type SetUserInfoParams={
    nike_name:string;
    avatar:string;
    qq:string;
    wechat:string;
    email:string;
    github:string;
}

// tag 接口响应

// 获取用户信息
export type GetUserInfoResponse=UserInfo

// 获取所有用户的信息
export type GetAllUserInfoResponse=UserInfo[]

// 修改用户信息
export type SetUserInfoResponse=number;