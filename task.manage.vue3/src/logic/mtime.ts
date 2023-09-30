// 获取当前时间
export function getCurrentTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


// 一个睡眠器
export function sleep(time: number) {
    return  new Promise((r) => {
        setTimeout(r, time)
    })
}


// 延迟执行器 直到isExist存在
export function waitForExecute(isExist:any,callback:()=>void,interval=1000){
    const timer=setInterval(()=>{
        if(isExist){
            callback()
            clearInterval(timer)
        }
    },interval)
}

// 校验时间是否为今天
export function checkIsNowDay(time:string):boolean{
    if(!time)return false;
    const nowDay=getCurrentTime().split(" ")[0]
    const dataDay=time.split(" ")[0]
    return nowDay===dataDay
}