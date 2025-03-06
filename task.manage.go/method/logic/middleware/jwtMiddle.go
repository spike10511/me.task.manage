package middleware

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	appConst "learning_path/constant/app"
	tipConst "learning_path/constant/tip"
	gormHelper "learning_path/helper/gorm"
	jwtHelper "learning_path/helper/jwt"
	httpLogic "learning_path/logic/http"
	redisLogic "learning_path/logic/redis"
	dbModel "learning_path/model/db"
	userModel "learning_path/model/user"
	userService "learning_path/service/user"
	"net/http"
	"strings"
)

func RootAccountMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		userId, _ := c.Get("userId")
		userName, _ := c.Get("userName")
		if userName != appConst.RootName {
			var roleListItem dbModel.SQLSysRoleList
			result := gormHelper.NewDBClient(c.Request.Context()).Where(&dbModel.SQLSysRoleList{UserID: userId.(uint), RoleID: appConst.RootId}).Take(&roleListItem)
			if result.Error != nil {
				httpLogic.NoAuthResponse(c, http.StatusUnauthorized, tipConst.NoAuth)
				c.Abort()
				return
			}
		}
		c.Next()
	}
}

func SSSAccountMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		userName, _ := c.Get("userName")
		if userName != appConst.RootName {
			httpLogic.NoAuthResponse(c, http.StatusUnauthorized, tipConst.NoAuth)
			c.Abort()
			return
		}
		c.Next()
	}
}

func JWTAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenStr := c.Request.Header.Get("Authorization")
		if tokenStr == "" {
			httpLogic.NoAuthResponse(c, http.StatusUnauthorized, tipConst.NoAuth)
			c.Abort()
			return
		}
		tokenStrArray := strings.Split(tokenStr, "Bearer ")
		if len(tokenStrArray) < 2 {
			httpLogic.ExeErrorResponse(c, errors.New("token格式不正确").Error())
			c.Abort()
			return
		}
		tokenStr = tokenStrArray[1]
		tokenObj, err := jwtHelper.ParseJwt(tokenStr)
		if err != nil {
			httpLogic.NoAuthResponse(c, http.StatusUnauthorized, tipConst.NoAuth)
			c.Abort()
			return
		}
		redisPassVersion, err := redisLogic.GetUserVersion(tokenObj.UserId, false)
		if err != nil || redisPassVersion != tokenObj.TokenStruct.PassVersion {
			httpLogic.NoAuthResponse(c, http.StatusUnauthorized, tipConst.NoAuth)
			c.Abort()
			return
		}
		users, err := userService.IsExist(userModel.IsExist{
			ID: tokenObj.UserId,
		}, c.Request.Context())
		if err != nil {
			httpLogic.NoAuthResponse(c, http.StatusUnauthorized, tipConst.NoAuth)
			c.Abort()
			return
		}
		if users[0].IsDel >= 1 {
			httpLogic.NoAuthResponse(c, http.StatusUnauthorized, tipConst.AccountDel)
			c.Abort()
			return
		}
		c.Set("userId", tokenObj.TokenStruct.UserId)
		c.Set("userName", users[0].UserName)
		c.Set("nikeName", users[0].NikeName)
		c.Set("avatar", users[0].Avatar)
		c.Set("passVersion", tokenObj.TokenStruct.PassVersion)
		c.Next()
	}
}

func GlobalErrorMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if r := recover(); r != nil {
				fmt.Println("程序错误:", r)
				if err, ok := r.(error); ok {
					httpLogic.ExeErrorResponse(c, err.Error())
				} else {
					httpLogic.ExeErrorResponse(c, "")
				}
			}
		}()
		c.Next()
	}
}
