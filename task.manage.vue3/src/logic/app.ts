
const AppThrowErrorKey="AppThrowErrorKey-"
// 抛出一个自定义错误
export function appThrowError(message:string){
    throw new Error(AppThrowErrorKey+message)
}

// catch 错误回调
export function catchCallback(e:string,callback:(msg:string)=>void){
    const check=e.indexOf(AppThrowErrorKey)
    if(check>=0){
        const message=e.split(AppThrowErrorKey)[1]
        callback(message)
    }
}