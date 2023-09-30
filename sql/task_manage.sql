/*
 Navicat Premium Data Transfer

 Source Server         : learning_path
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : 1.13.246.113:3306
 Source Schema         : learning_path

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 01/10/2023 01:18:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单id',
  `menu_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '菜单名称',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `menu_menu_name_key`(`menu_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统菜单分类' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------

-- ----------------------------
-- Table structure for sys_menu_list
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu_list`;
CREATE TABLE `sys_menu_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `menu_id` int(11) NOT NULL COMMENT '菜单id',
  `role_id` int(11) NOT NULL COMMENT '角色id',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `menu_list_menu_id_role_id_key`(`menu_id`, `role_id`) USING BTREE,
  INDEX `menu_list_role_id_fkey`(`role_id`) USING BTREE,
  CONSTRAINT `menu_list_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `menu_list_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统菜单列表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu_list
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `role_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名称',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `role_role_name_key`(`role_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统角色分类' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (2, '超级管理员');

-- ----------------------------
-- Table structure for sys_role_list
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_list`;
CREATE TABLE `sys_role_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '列表id',
  `role_id` int(11) NOT NULL COMMENT '角色id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `role_list_role_id_user_id_key`(`role_id`, `user_id`) USING BTREE,
  INDEX `role_list_user_id_fkey`(`user_id`) USING BTREE,
  CONSTRAINT `role_list_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_list_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统角色列表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_list
-- ----------------------------

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `nike_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '别名',
  `avatar` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '头像',
  `qq` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'qq账号',
  `wechat` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信号',
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '邮箱号',
  `github` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'github账号',
  `is_del` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除',
  `update_time` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_user_name_key`(`user_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '系统用户信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (3, 'root', '$2a$12$C6ITvu1d0O5FMX7Mly9ftu1U7P8x7Da.FtblWFAY1u/X.vWMs/iCS', '网管', '/avatars/1696080087_v2-cbbf661eb6ca923ea71c87574fcbe497_1440w.webp', 'sdfsdf', '111111111111111111', 'asd', 'sdfsdf', 0, '2023-09-30 22:03:44.7349553 +0800 CST m=+3054.452476701');
INSERT INTO `sys_user` VALUES (14, 'youke', '$2a$12$Zq0ko6bY3Ke.5LA9RlZqH.ELBZHxXD46aeoJCXA5TXLIBsFNrbkcC', '摆烂的游客', '/avatars/1696089732_e737c1c76700b4628d6e5055e0b3aa5b.jpg', NULL, NULL, NULL, NULL, 0, '2023-10-01 00:02:12.4130713 +0800 CST m=+24.183755201');

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '任务id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `task_category_id` int(11) NOT NULL COMMENT '任务分类id',
  `is_com` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否完成',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '任务内容',
  `start_time` datetime(0) NOT NULL COMMENT '开始时间',
  `end_time` datetime(0) NOT NULL COMMENT '结束时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `task_user_id_key`(`user_id`) USING BTREE,
  INDEX `task_category_id_key`(`task_category_id`) USING BTREE,
  CONSTRAINT `task_category_id_key` FOREIGN KEY (`task_category_id`) REFERENCES `task_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `task_user_id_key` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 209 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES (201, 14, 44, 0, '跑个马拉松!', '2023-09-30 22:08:15', '2023-10-01 10:08:15');
INSERT INTO `task` VALUES (204, 14, 47, 0, '给门外大松树浇水', '2023-09-30 22:08:15', '2023-10-03 10:08:15');
INSERT INTO `task` VALUES (205, 14, 48, 0, '打扫一下自己的房间', '2023-09-30 22:08:15', '2023-10-03 10:08:15');
INSERT INTO `task` VALUES (206, 14, 49, 1, '这个月第99次面试,希望成功', '2023-09-30 22:08:15', '2023-10-03 10:08:15');
INSERT INTO `task` VALUES (207, 14, 50, 1, '打个游戏应该没事\n', '2023-09-30 22:08:15', '2023-10-03 10:08:15');
INSERT INTO `task` VALUES (208, 14, 51, 0, '刷会~\n\n', '2023-09-30 22:08:15', '2023-10-03 10:08:15');

-- ----------------------------
-- Table structure for task_category
-- ----------------------------
DROP TABLE IF EXISTS `task_category`;
CREATE TABLE `task_category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `cate_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `task_task_category_nameKey`(`cate_name`) USING BTREE COMMENT '分类名称'
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task_category
-- ----------------------------
INSERT INTO `task_category` VALUES (51, '刷刷抖音');
INSERT INTO `task_category` VALUES (46, '学习');
INSERT INTO `task_category` VALUES (48, '打扫房间');
INSERT INTO `task_category` VALUES (50, '打游戏');
INSERT INTO `task_category` VALUES (43, '洗漱');
INSERT INTO `task_category` VALUES (47, '浇花');
INSERT INTO `task_category` VALUES (45, '聚餐');
INSERT INTO `task_category` VALUES (44, '跑步');
INSERT INTO `task_category` VALUES (49, '面试');

SET FOREIGN_KEY_CHECKS = 1;
