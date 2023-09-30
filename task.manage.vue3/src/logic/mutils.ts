

// 是否为空
export function isEmpty(value:any, nullIncludeZero = false) {
    if (!nullIncludeZero) {// 空不包含0
        if (value === 0) {
            return false;
        }
    }
    return !value ||
        JSON.stringify(value) === "{}" ||
        JSON.stringify(value) === "[]";
}