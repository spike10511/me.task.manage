package menuListService

import (
	"context"
	"errors"
	menuDto "learning_path/dto/menu"
	gormHelper "learning_path/helper/gorm"
	dbModel "learning_path/model/db"
	menuModel "learning_path/model/menu"
	"sync"
)

// FindCurrentUserMenu 查找当前用户的所有菜单
func FindCurrentUserMenu(userId uint, ctx context.Context) ([][]menuModel.FindRoleMenusRes, error) {
	// 获取该用户拥有的角色
	var roleList []dbModel.SQLSysRoleList
	var roleIds []uint
	err := gormHelper.NewDBClient(ctx).Where(&dbModel.SQLSysRoleList{
		UserID: userId,
	}).Find(&roleList).Error
	if err != nil {
		return nil, err
	}
	for _, role := range roleList {
		roleIds = append(roleIds, role.RoleID)
	}
	// 查找这些角色拥有的菜单
	var roleMenus [][]menuModel.FindRoleMenusRes
	var wg sync.WaitGroup
	for _, id := range roleIds {
		wg.Add(1)
		go func(id uint) {
			defer wg.Done()
			menus, err := FindRoleMenus(menuDto.FindRoleMenusDto{RoleId: id}, context.Background())
			if err != nil {
				return
			}
			if len(menus) > 0 {
				roleMenus = append(roleMenus, menus)
			}
		}(id)
	}
	wg.Wait()
	return roleMenus, nil
}

// AddRoleMenu 为某角色添加某菜单
func AddRoleMenu(dto menuDto.AddRoleMenuDto, ctx context.Context) (int64, error) {
	err := gormHelper.NewDBClient(ctx).Take(&dbModel.SQLSysRole{ID: dto.RoleId}).Error
	if err != nil {
		return 0, errors.New("角色查找失败!")
	}
	err = gormHelper.NewDBClient(ctx).Take(&dbModel.SQLSysMenu{ID: dto.MenuId}).Error
	if err != nil {
		return 0, errors.New("菜单查找失败!")
	}
	err = gormHelper.NewDBClient(ctx).Where(&dbModel.SQLSysMenuList{
		RoleID: dto.RoleId,
		MenuID: dto.MenuId,
	}).Take(&dbModel.SQLSysMenuList{}).Error
	if err == nil {
		return 0, errors.New("该角色已有此菜单!")
	}
	err = gormHelper.NewDBClient(ctx).Create(&dbModel.SQLSysMenuList{
		RoleID: dto.RoleId,
		MenuID: dto.MenuId,
	}).Error
	if err != nil {
		return 0, err
	}
	return 1, nil
}

// DelRoleMenu 为某角色删除某菜单
func DelRoleMenu(dto menuDto.DelRoleMenuDto, ctx context.Context) (int64, error) {
	err := gormHelper.NewDBClient(ctx).Where(&dbModel.SQLSysMenuList{
		RoleID: dto.RoleId,
		MenuID: dto.MenuId,
	}).Delete(&dbModel.SQLSysMenuList{}).Error
	if err != nil {
		return 0, err
	}
	return 1, nil
}

// FindRoleMenus 查找某角色拥有的菜单
func FindRoleMenus(dto menuDto.FindRoleMenusDto, ctx context.Context) ([]menuModel.FindRoleMenusRes, error) {
	var menus []menuModel.FindRoleMenusRes
	err := gormHelper.NewDBClient(ctx).Where(&dbModel.SQLSysMenuList{
		RoleID: dto.RoleId,
	}).Preload("Menu").Find(&menus).Error
	if err != nil {
		return nil, err
	}
	return menus, nil
}
