// tag 普通
// 任务-form表单
export type TaskForm = {
    task_category_id?: number;  // 任务类别id
    is_complete: 0 | 1;   // 是否完成,值只能是0 1
    content: string;       // 任务内容
    start_time: string;      // 开始时间
    end_time: string;      // 结束时间
    user_id?: number;      // 用户id
}

// 用户id选择框
export type AllUserListSelect = {
    userId: number;
    userName: string;
}[]

// 任务分类列表
export type TaskCategory = {
    id: number;
    cate_name: string;
}

// tag 接口参数
// 添加一个任务分类参数
export type AddTaskCategoryApiParams = {
    name: string;   // 任务分类名称
};

// 添加一个任务参数
export type AddTaskApiParams = {
    user_id: number;      // 用户id
    task_category_id: number;  // 任务类别id
    is_complete: 0 | 1;   // 是否完成,值只能是0 1
    content: string;       // 任务内容
    start_time: string;      // 开始时间
    end_time: string;      // 结束时间
}

// tag 接口响应
// 添加一个任务分类响应
export type AddTaskCategoryApiResponse = number;

// 获取任务类别列表响应
export type GetTaskCategoryListApiResponse = TaskCategory[]

// 添加一个任务响应
export type AddTaskResponse = number;

