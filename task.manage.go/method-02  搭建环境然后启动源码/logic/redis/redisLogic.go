package redisLogic

import (
	"errors"
	redisConst "learning_path/constant/redis"
	redisHelper "learning_path/helper/redis"
	appModel "learning_path/model/app"
	"strconv"
)

// UpdateUserVersion 更新用户密码版本
func UpdateUserVersion(id uint) (uint, error) {
	userId := strconv.Itoa(int(id))
	var userVersionData = make(appModel.UserVersionStruct)
	exist, err := redisHelper.RedisExist(redisConst.PassVersionKEY)
	if err != nil {
		return 0, err
	}
	if !exist {
		err := redisHelper.RedisSetJson(redisConst.PassVersionKEY, userVersionData, 0)
		if err != nil {
			return 0, err
		}
	}
	err = redisHelper.RedisGetJson(redisConst.PassVersionKEY, &userVersionData)
	if err != nil {
		return 0, err
	}
	currentVersion, ok := userVersionData[userId]
	if ok {
		userVersionData[userId] = currentVersion + 1
	} else {
		userVersionData[userId] = 1
	}
	err = redisHelper.RedisSetJson(redisConst.PassVersionKEY, userVersionData, 0)
	if err != nil {
		return 0, err
	}
	return userVersionData[userId], err
}

// GetUserVersion 获取当前密码版本
func GetUserVersion(id uint, isGnerate bool) (uint, error) {
	userId := strconv.Itoa(int(id))
	var userVersionData = make(appModel.UserVersionStruct)
	exist, err := redisHelper.RedisExist(redisConst.PassVersionKEY)
	if err != nil {
		return 0, err
	}
	if !exist {
		err := redisHelper.RedisSetJson(redisConst.PassVersionKEY, userVersionData, 0)
		if err != nil {
			return 0, err
		}
	}
	err = redisHelper.RedisGetJson(redisConst.PassVersionKEY, &userVersionData)
	if err != nil {
		return 0, err
	}
	_, ok := userVersionData[userId]
	if !ok {
		if isGnerate {
			userVersionData[userId] = 1
			err = redisHelper.RedisSetJson(redisConst.PassVersionKEY, userVersionData, 0)
			if err != nil {
				return 0, err
			}
		} else {
			return 0, errors.New("没有该账号的版本记录")
		}
	}
	return userVersionData[userId], err
}
