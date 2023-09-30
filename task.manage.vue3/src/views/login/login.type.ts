
// 登录-api dto
export type LoginDto = {
    username: string;
    password: string;
};
export type LoginApiResponse={
    token:string;
}
// 注册
export type RegisterDto=LoginDto
// 登录
export type LoginFormStore ={
    username: string;
    password: string;
}
// 注册
export type RegisterFormStore={
    username: string;
    password: string;
    passwordConfirm:string;
}
// 记住密码
export type SaveUserAndPassStore =LoginFormStore & {
    isSave:boolean;
}