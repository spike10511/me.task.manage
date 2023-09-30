package userModel

import dbModel "learning_path/model/db"

// RegisterRes 注册接口响应结构
type RegisterRes struct {
	ID         uint   `json:"id"`
	UserName   string `json:"userName"`
	NikeName   string `json:"nikeName"`
	Avatar     string `json:"avatar"`
	QQ         string `json:"qq"`
	Wechat     string `json:"wechat"`
	Email      string `json:"email"`
	Github     string `json:"github"`
	IsDel      int    `json:"isDel"`
	UpdateTime string `json:"updateTime"`
}

// IsExist 账号是否存在
type IsExist struct {
	ID       uint   `json:"id"`
	UserName string `json:"userName"`
}

// LoginRes 登录接口响应结构
type LoginRes struct {
	Token string `json:"token"`
}

// 获取用户信息响应
type GetUserInfoRes struct {
	dbModel.SQLSysUser
	IsRoot bool `json:"is_root"`
}
