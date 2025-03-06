package main

import (
	"github.com/gin-gonic/gin"
	"io"
	fileConst "learning_path/constant/file"
	"learning_path/controller"
	gormHelper "learning_path/helper/gorm"
	redisHelper "learning_path/helper/redis"
	validatorHelper "learning_path/helper/validator"
	viperHelper "learning_path/helper/viper"
	"learning_path/logic/middleware"
	mosLogic "learning_path/logic/mos"
	"os"
)

func main() {
	// 初始化翻译环境
	validatorHelper.InitTrans("zh")
	// 初始化项目配置文件数据
	viperHelper.InitConfigData()
	// 初始化静态目录
	mosLogic.InitAppStaticFinder()
	// 初始数据库
	gormHelper.InitSqlConnect()
	// 初始redis
	redisHelper.InitRedisClient()
	// 日志
	logfile, _ := os.Create("app.log")
	gin.DefaultWriter = io.MultiWriter(logfile, os.Stdout)
	// 路由
	router := gin.Default()
	router.Use(middleware.GlobalErrorMiddleware())
	router.Static(fileConst.AvatarFinderAccess, fileConst.AvatarFinder) // 头像静态资源
	controller.UseAppRouter(router)
	controller.UseUserRouter(router)
	controller.UseRoleRouter(router)
	controller.UserMenuRouter(router)
	controller.UseTaskRouter(router)
	// 服务
	err := router.Run(":9093")
	if err != nil {
		return
	}
}
