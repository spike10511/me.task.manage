package taskService

import (
	"context"
	"errors"
	taskDto "learning_path/dto/task"
	gormHelper "learning_path/helper/gorm"
	utilsLogic "learning_path/logic/utils"
	dbModel "learning_path/model/db"
)

// AddTaskCategory 添加一条任务分类
func AddTaskCategory(dto taskDto.AddTaskCategoryDto, ctx context.Context) (int64, error) {
	err := gormHelper.NewDBClient(ctx).Where(&dbModel.SQLTaskCategory{CateName: dto.Name}).Take(&dbModel.SQLTaskCategory{}).Error
	if err == nil {
		return 0, errors.New("此项已经存在!")
	}
	err = gormHelper.NewDBClient(ctx).Create(&dbModel.SQLTaskCategory{
		CateName: dto.Name,
	}).Error
	if err != nil {
		return 0, err
	}
	return 1, nil
}

// DelTaskCategory 删除一条任务分类
func DelTaskCategory(dto taskDto.DelTaskCategoryDto, ctx context.Context) (int64, error) {
	result := gormHelper.NewDBClient(ctx).Delete(&dbModel.SQLTaskCategory{ID: dto.CateId})
	if result.Error != nil {
		return 0, result.Error
	}
	if result.RowsAffected < 1 {
		return 0, errors.New("此项不存在/删除失败!")
	}
	return result.RowsAffected, nil
}

// PutTaskCategory 修改一条任务分类
func PutTaskCategory(dto taskDto.PutTaskCategoryDto, ctx context.Context) (int64, error) {
	result := gormHelper.NewDBClient(ctx).Where(&dbModel.SQLTaskCategory{ID: dto.CateId}).Updates(&dbModel.SQLTaskCategory{
		CateName: dto.CateName,
	})
	if result.Error != nil {
		return 0, result.Error
	}
	if result.RowsAffected < 1 {
		return 0, errors.New("当前任务不存在修改失败!")
	}
	return result.RowsAffected, nil
}

// TakeTaskcategory 查看一条任务分类
func TakeTaskcategory(dto taskDto.TakeTaskCategoryDto, ctx context.Context) (dbModel.SQLTaskCategory, error) {
	var taskCategory dbModel.SQLTaskCategory
	taskCategory.ID = dto.CateId
	result := gormHelper.NewDBClient(ctx).Take(&taskCategory)
	if result.Error != nil {
		return taskCategory, result.Error
	}
	return taskCategory, nil
}

// FindTaskCategory 查找所有任务分类
func FindTaskCategory(ctx context.Context) ([]dbModel.SQLTaskCategory, error) {
	var taskCategoryList []dbModel.SQLTaskCategory
	err := gormHelper.NewDBClient(ctx).Find(&taskCategoryList).Error
	if err != nil {
		return nil, err
	}
	return taskCategoryList, nil
}

// AddTask 添加一个任务
func AddTask(dto taskDto.AddTaskDto, ctx context.Context) (int64, error) {
	// 时间格式处理
	startTime, err := utilsLogic.FormatShangHaiTime(dto.StartTime)
	if err != nil {
		return 0, errors.New("时间格式解析失败!")
	}
	endTime, err := utilsLogic.FormatShangHaiTime(dto.EndTime)
	if err != nil {
		return 0, errors.New("时间格式解析失败!")
	}
	// 用户是否存在
	err = gormHelper.NewDBClient(ctx).Take(&dbModel.SQLSysUser{ID: dto.UserId}).Error
	if err != nil {
		return 0, errors.New("该用户id校验失败!")
	}
	// 分类是否存在
	err = gormHelper.NewDBClient(ctx).Take(&dbModel.SQLTaskCategory{ID: dto.TaskCategoryId}).Error
	if err != nil {
		return 0, errors.New("没有此类任务!")
	}
	err = gormHelper.NewDBClient(ctx).Create(&dbModel.SQLTask{
		UserId:         dto.UserId,
		TaskCategoryId: dto.TaskCategoryId,
		IsComplete:     dto.IsComplete,
		Content:        dto.Content,
		StartTime:      startTime,
		EndTime:        endTime,
	}).Error
	if err != nil {
		return 0, err
	}
	return 1, nil
}

// PutTask 修改一个任务
func PutTask(dto taskDto.PutTaskDto, ctx context.Context) (int64, error) {
	// 时间格式处理
	startTime, err := utilsLogic.FormatShangHaiTime(dto.StartTime)
	if err != nil {
		return 0, errors.New("时间格式解析失败!")
	}
	endTime, err := utilsLogic.FormatShangHaiTime(dto.EndTime)
	if err != nil {
		return 0, errors.New("时间格式解析失败!")
	}
	// 用户是否存在
	err = gormHelper.NewDBClient(ctx).Take(&dbModel.SQLSysUser{ID: dto.UserId}).Error
	if err != nil {
		return 0, errors.New("该用户id校验失败!")
	}
	// 分类是否存在
	err = gormHelper.NewDBClient(ctx).Take(&dbModel.SQLTaskCategory{ID: dto.TaskCategoryId}).Error
	if err != nil {
		return 0, errors.New("没有此类任务!")
	}
	// 当前任务是否存在
	err = gormHelper.NewDBClient(ctx).Take(&dbModel.SQLTask{ID: dto.TaskId}).Error
	if err != nil {
		return 0, errors.New("当前任务不存在!")
	}
	// 修改
	result := gormHelper.NewDBClient(ctx).Where(&dbModel.SQLTask{ID: dto.TaskId}).Updates(&dbModel.SQLTask{
		UserId:         dto.UserId,
		TaskCategoryId: dto.TaskCategoryId,
		IsComplete:     dto.IsComplete,
		Content:        dto.Content,
		StartTime:      startTime,
		EndTime:        endTime,
	})
	if result.Error != nil {
		return 0, result.Error
	}
	if result.RowsAffected < 1 {
		return 0, errors.New("修改失败!0生效!")
	}
	return result.RowsAffected, nil
}

// DelTask 删除一个任务
func DelTask(dto taskDto.DelTaskDto, ctx context.Context) (int64, error) {
	// 是否存在
	var task dbModel.SQLTask
	task.ID = dto.TaskId
	result := gormHelper.NewDBClient(ctx).Take(&task)
	if result.RowsAffected < 1 {
		return 0, errors.New("没有此任务!")
	}
	if result.Error != nil {
		return 0, result.Error
	}
	// 删除
	err := gormHelper.NewDBClient(ctx).Delete(&task).Error
	if err != nil {
		return 0, err
	}
	return 1, err
}

// FindTask 多任务查找
func FindTask(dto taskDto.FindTaskDto, ctx context.Context) ([]dbModel.SQLTask, error) {
	var tasks []dbModel.SQLTask
	var taskWhere dbModel.SQLTask
	if dto.UserId != 0 {
		taskWhere.UserId = dto.UserId
	}
	if dto.TaskCategoryId != 0 {
		taskWhere.TaskCategoryId = dto.TaskCategoryId
	}
	if dto.IsComplete == 1 {
		taskWhere.IsComplete = 1
	} else if dto.IsComplete == 0 {
		taskWhere.IsComplete = 0
	}
	// 时间格式处理
	startTime, err := utilsLogic.FormatShangHaiTime(dto.StartTime)
	if err != nil {
		return tasks, errors.New("时间格式解析失败!")
	}
	endTime, err := utilsLogic.FormatShangHaiTime(dto.EndTime)
	if err != nil {
		return tasks, errors.New("时间格式解析失败!")
	}
	// 结束时间在今天以后,开始时间在今天晚上之前
	result := gormHelper.NewDBClient(ctx).Where(taskWhere).Where("content LIKE ?", "%"+dto.Content+"%").
		Where("end_time >= ? AND start_time<= ?", startTime, endTime).Preload("TaskCategory").Find(&tasks)
	if result.Error != nil {
		return tasks, result.Error
	}

	return tasks, nil
}

// UpdateTaskIsCom 修改某一条任务完成状态
func UpdateTaskIsCom(dto taskDto.PutSubmitTaskDto, userId uint, ctx context.Context) (int64, error) {
	var task dbModel.SQLTask
	task.ID = dto.TaskId
	task.UserId = userId
	result := gormHelper.NewDBClient(ctx).Where(&task).Take(&task)
	if result.Error != nil {
		return 0, errors.New("当前任务未找到!")
	}
	if task.IsComplete == 1 {
		task.IsComplete = 0
	} else {
		task.IsComplete = 1
	}
	result2 := gormHelper.NewDBClient(ctx).Select("is_com").Where(&dbModel.SQLTask{ID: dto.TaskId, UserId: userId}).Updates(task)
	if result2.Error != nil {
		return 0, result2.Error
	}
	return result2.RowsAffected, nil
}

// GetUserTasks 获取某个用户的所有任务
func GetUserTasks(userId uint, ctx context.Context) ([]dbModel.SQLTask, error) {
	var tasks []dbModel.SQLTask
	err := gormHelper.NewDBClient(ctx).Where(&dbModel.SQLTask{UserId: userId}).Preload("TaskCategory").Preload("User").Order("end_time ASC").Find(&tasks).Error
	if err != nil {
		return nil, err
	}
	return tasks, nil
}

// GetAllTasks 查找所有任务
func GetAllTasks(ctx context.Context) ([]dbModel.SQLTask, error) {
	var tasks []dbModel.SQLTask
	err := gormHelper.NewDBClient(ctx).Preload("TaskCategory").Preload("User").Order("end_time ASC").Find(&tasks).Error
	if err != nil {
		return nil, err
	}
	return tasks, nil
}
