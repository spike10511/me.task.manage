package controller

import (
	"github.com/gin-gonic/gin"
	taskDto "learning_path/dto/task"
	httpLogic "learning_path/logic/http"
	"learning_path/logic/middleware"
	utilsLogic "learning_path/logic/utils"
	taskService "learning_path/service/task"
	"net/http"
)

// 添加一条任务分类
func _addTaskCategory(c *gin.Context) {
	var dto taskDto.AddTaskCategoryDto
	err := c.ShouldBindJSON(&dto)
	if err != nil {
		httpLogic.BadErrorResponse(c, httpLogic.GetBindErrorTranslate(err))
		return
	}
	rowsAffected, err := taskService.AddTaskCategory(dto, c.Request.Context())
	if err != nil {
		httpLogic.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	httpLogic.OKResponse(c, rowsAffected, nil)
}

// 删除一条任务分类
func _delTaskcategory(c *gin.Context) {
	var dto taskDto.DelTaskCategoryDto
	err := c.ShouldBindUri(&dto)
	if err != nil {
		httpLogic.BadErrorResponse(c, httpLogic.GetBindErrorTranslate(err))
		return
	}
	rowsAffected, err := taskService.DelTaskCategory(dto, c.Request.Context())
	if err != nil {
		httpLogic.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	httpLogic.OKResponse(c, rowsAffected, nil)
}

// 修改一条任务分类
func _putTaskCategory(c *gin.Context) {
	var dto taskDto.PutTaskCategoryDto
	err := c.ShouldBindJSON(&dto)
	if err != nil {
		httpLogic.BadErrorResponse(c, httpLogic.GetBindErrorTranslate(err))
		return
	}
	rowsAffected, err := taskService.PutTaskCategory(dto, c.Request.Context())
	if err != nil {
		httpLogic.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	httpLogic.OKResponse(c, rowsAffected, nil)
}

// 查找一条任务分类
func _takeTaskCategory(c *gin.Context) {
	var dto taskDto.TakeTaskCategoryDto
	err := c.ShouldBindUri(&dto)
	if err != nil {
		httpLogic.BadErrorResponse(c, httpLogic.GetBindErrorTranslate(err))
		return
	}
	taskCategory, err := taskService.TakeTaskcategory(dto, c.Request.Context())
	if err != nil {
		httpLogic.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	httpLogic.OKResponse(c, taskCategory, nil)
}

// 查找所有任务分类
func _findTaskCategory(c *gin.Context) {
	taskCategoryList, err := taskService.FindTaskCategory(c.Request.Context())
	if err != nil {
		httpLogic.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	httpLogic.OKResponse(c, taskCategoryList, nil)
}

// 添加一条任务
func _addTask(c *gin.Context) {
	var dto taskDto.AddTaskDto
	err := c.ShouldBindJSON(&dto)
	if err != nil {
		httpLogic.BadErrorResponse(c, httpLogic.GetBindErrorTranslate(err))
		return
	}
	rowsAffected, err := taskService.AddTask(dto, c.Request.Context())
	if err != nil {
		httpLogic.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	httpLogic.OKResponse(c, rowsAffected, nil)
}

// 修改一条任务
func _putTask(c *gin.Context) {
	var dto taskDto.PutTaskDto
	err := c.ShouldBindJSON(&dto)
	if err != nil {
		httpLogic.BadErrorResponse(c, httpLogic.GetBindErrorTranslate(err))
		return
	}
	rowsAffected, err := taskService.PutTask(dto, c.Request.Context())
	if err != nil {
		httpLogic.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	httpLogic.OKResponse(c, rowsAffected, nil)
}

// 删除一个任务
func _delTask(c *gin.Context) {
	var dto taskDto.DelTaskDto
	err := c.ShouldBindUri(&dto)
	if err != nil {
		httpLogic.BadErrorResponse(c, httpLogic.GetBindErrorTranslate(err))
		return
	}
	rowsAffected, err := taskService.DelTask(dto, c.Request.Context())
	if err != nil {
		httpLogic.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	httpLogic.OKResponse(c, rowsAffected, "删除成功!")
}

// 多任务查找
func _findTasks(c *gin.Context) {
	var dto taskDto.FindTaskDto
	err := c.ShouldBindJSON(&dto)
	if err != nil {
		httpLogic.BadErrorResponse(c, httpLogic.GetBindErrorTranslate(err))
		return
	}
	tasks, err := taskService.FindTask(dto, c.Request.Context())
	if err != nil {
		httpLogic.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	httpLogic.OKResponse(c, tasks, nil)
}

// 获取当天任务
func _getCurrentTask(c *gin.Context) {
	currentTime, _ := utilsLogic.GetCurrentDayTime()
	userId, _ := c.Get("userId")
	tasks, err := taskService.FindTask(taskDto.FindTaskDto{
		UserId:    userId.(uint),
		StartTime: currentTime.StartTime,
		EndTime:   currentTime.EndTime,
	}, c.Request.Context())
	if err != nil {
		httpLogic.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	httpLogic.OKResponse(c, tasks, nil)
}

// 修改某一条任务完成状态
func _submitTask(c *gin.Context) {
	var dto taskDto.PutSubmitTaskDto
	err := c.ShouldBindUri(&dto)
	if err != nil {
		httpLogic.BadErrorResponse(c, httpLogic.GetBindErrorTranslate(err))
		return
	}
	userId, _ := c.Get("userId")
	rowsAffected, err := taskService.UpdateTaskIsCom(dto, userId.(uint), c.Request.Context())
	if err != nil {
		httpLogic.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	httpLogic.OKResponse(c, rowsAffected, "提交成功!")
}

// 查找所有任务
func _findAllTasks(c *gin.Context) {
	tasks, err := taskService.GetAllTasks(c.Request.Context())
	if err != nil {
		httpLogic.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	httpLogic.OKResponse(c, tasks, nil)
}

// 获取某个用户的所有任务
func _getAllUserTask(c *gin.Context) {
	userId, _ := c.Get("userId")
	tasks, err := taskService.GetUserTasks(userId.(uint), c.Request.Context())
	if err != nil {
		httpLogic.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	httpLogic.OKResponse(c, tasks, nil)
}

func UseTaskRouter(router *gin.Engine) {
	taskRouter := router.Group("task")
	taskRouter.Use(middleware.JWTAuthMiddleware())
	taskAuthRouter := taskRouter.Group("auth")
	{
		taskAuthRouter.GET("getCurrentTask", _getCurrentTask)     // 获取当天任务
		taskAuthRouter.PUT("putTaskStatus/:task_id", _submitTask) // 提交某条任务
		taskAuthRouter.GET("getUserAllTask", _getAllUserTask)     // 获取某个用户的所有任务
	}
	taskRootRouter := taskRouter.Group("root").Use(middleware.RootAccountMiddleware())
	{
		taskRootRouter.POST("addTaskCategory", _addTaskCategory)            // 添加一条任务分类
		taskRootRouter.DELETE("delTaskCategory/:cate_id", _delTaskcategory) // 删除一条任务分类
		taskRootRouter.PUT("putTaskCategory", _putTaskCategory)             // 修改一条任务分类
		taskRootRouter.GET("takeTaskCategory/:cate_id", _takeTaskCategory)  // 查找一条任务分类
		taskRootRouter.GET("findTaskCategory", _findTaskCategory)           // 查找所有任务分类
		taskRootRouter.POST("addTask", _addTask)                            // 添加一条任务
		taskRootRouter.PUT("putTask", _putTask)                             // 修改一条任务
		taskRootRouter.DELETE("delTask/:task_id", _delTask)                 // 删除一条任务
		taskRootRouter.POST("findTasks", _findTasks)                        // 多任务查找
		taskRootRouter.GET("findAllTask", _findAllTasks)                    // 查找所有任务
	}
}
