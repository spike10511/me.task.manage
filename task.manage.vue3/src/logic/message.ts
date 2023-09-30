export const elNotificationBox = (
    title = "注意",
    message = "",
    type: "success" | "warning" | "info" | "error",
    position:"top-left" | "top-right" | "bottom-right" | "bottom-left"|null
) => {
    if(!position){
        if(type==="success"){
            position="bottom-right"
        }else{
            position="top-right"
        }
    }
    ElNotification({
        title: title,
        message: message,
        type,
        duration: 2000,
        position: position||"top-right"
    });
};

export const elConfirm = (
    msg = "You have unsaved changes, save and proceed?",
    callback: () => void,
    title?:string,
    showCancel=false
) => {
    ElMessageBox.confirm(msg, "Confirm", {
        title:title||"提示",
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        showCancelButton:showCancel,
        draggable:true
    })
        .then(() => {
            callback();
        })
        .catch(() => {
        });
};

export const elMessage_ = (
    msg = "You have unsaved changes, save and proceed?",
    type: "success" | "warning" | "info" | "error"
) => {
    ElMessage({
        message: msg,
        type,
    });
};
