

// axios 数据返回的数据结构
interface AxiosResponseDataType<T>{
    code:number;
    message:string;
    data:T;
}