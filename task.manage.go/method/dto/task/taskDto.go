package taskDto

// AddTaskCategoryDto 添加一个任务分类
type AddTaskCategoryDto struct {
	Name string `json:"name" binding:"required"` // 任务分类名称
}

// DelTaskCategoryDto 删除一个任务分类
type DelTaskCategoryDto struct {
	CateId uint `json:"cate_id" binding:"required" uri:"cate_id"` // 任务id
}

// PutTaskCategoryDto 修改一个任务分类
type PutTaskCategoryDto struct {
	CateId   uint   `json:"cate_id" binding:"required"`   // 任务id
	CateName string `json:"cate_name" binding:"required"` // 任务分类名称
}

// TakeTaskCategoryDto 查找一个任务分类
type TakeTaskCategoryDto struct {
	CateId uint `json:"cate_id" binding:"required" uri:"cate_id"` // 任务id
}

// AddTaskDto 添加任务
type AddTaskDto struct {
	UserId         uint   `json:"user_id" binding:"required"`                        //用户id
	TaskCategoryId uint   `json:"task_category_id" binding:"required"`               // 任务分类id
	IsComplete     int    `json:"is_complete" binding:"oneof=0 1"`                   // 是否完成
	Content        string `json:"content" binding:"required"`                        // 任务详情
	StartTime      string `json:"start_time" binding:"datetime=2006-01-02 15:04:06"` // 开始时间
	EndTime        string `json:"end_time" binding:"datetime=2006-01-02 15:04:06"`   // 结束时间
}

// PutTaskDto 修改任务
type PutTaskDto struct {
	AddTaskDto
	TaskId uint `json:"task_id" binding:"required"` // 任务id
}

// DelTaskDto 删除任务
type DelTaskDto struct {
	TaskId uint `json:"task_id" binding:"required" uri:"task_id"` // 任务id
}

// FindTaskDto 模糊查找任务
type FindTaskDto struct {
	UserId         uint   `json:"user_id"`                                           //用户id
	TaskCategoryId uint   `json:"task_category_id"`                                  // 任务分类id
	IsComplete     int    `json:"is_complete" binding:"oneof=0 1 2"`                 // 是否完成
	Content        string `json:"content"`                                           // 任务详情
	StartTime      string `json:"start_time" binding:"datetime=2006-01-02 15:04:06"` // 开始时间
	EndTime        string `json:"end_time" binding:"datetime=2006-01-02 15:04:06"`   // 结束时间
}

// PutSubmitTaskDto 提交某一个条任务
type PutSubmitTaskDto struct {
	TaskId uint `json:"task_id" binding:"required" uri:"task_id"` // 任务id
}
