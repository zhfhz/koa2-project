-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        8.0.17 - MySQL Community Server - GPL
-- 服务器OS:                        Win64
-- HeidiSQL 版本:                  10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for ding_app
CREATE DATABASE IF NOT EXISTS `ding_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ding_app`;

-- Dumping structure for table ding_app.t_access
CREATE TABLE IF NOT EXISTS `t_access` (
  `id` int(11) NOT NULL COMMENT 'access_id',
  `path` varchar(255) NOT NULL DEFAULT '' COMMENT '存在路径代表可读，存在按钮代表代表增删改',
  `comment` varchar(255) NOT NULL DEFAULT '' COMMENT '说明',
  `insert_able` int(1) NOT NULL DEFAULT '0' COMMENT '可增',
  `delete_able` int(1) NOT NULL DEFAULT '0' COMMENT '可删',
  `update_able` int(1) NOT NULL DEFAULT '0' COMMENT '可写',
  `query_able` int(1) NOT NULL DEFAULT '0' COMMENT '可读',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='可配置权限最小单位';

-- Data exporting was unselected.

-- Dumping structure for table ding_app.t_book
CREATE TABLE IF NOT EXISTS `t_book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '标题',
  `content` text NOT NULL,
  `type` int(1) NOT NULL COMMENT '0：article，1：book',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '下载地址',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `operator_id` int(11) NOT NULL COMMENT '操作人',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='员工手册表';

-- Data exporting was unselected.

-- Dumping structure for table ding_app.t_role
CREATE TABLE IF NOT EXISTS `t_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '角色名称',
  `access_id` int(11) DEFAULT NULL COMMENT '权限id',
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `role_accessid_fk_access_id` (`access_id`),
  CONSTRAINT `role_accessid_fk_access_id` FOREIGN KEY (`access_id`) REFERENCES `t_access` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='角色定义';

-- Data exporting was unselected.

-- Dumping structure for table ding_app.t_user
CREATE TABLE IF NOT EXISTS `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增序列',
  `dd_id` varchar(50) NOT NULL COMMENT '企业钉钉内部的userid',
  `name` varchar(20) NOT NULL COMMENT '姓名',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `avatar` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `userid` (`dd_id`),
  KEY `dd_id` (`dd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='存储角色信息';

-- Data exporting was unselected.

-- Dumping structure for table ding_app.t_user_role
CREATE TABLE IF NOT EXISTS `t_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_role_roleid_fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`id`),
  CONSTRAINT `user_role_roleid_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户角色关联表';

-- Data exporting was unselected.

-- Dumping structure for table ding_app.t_vote
CREATE TABLE IF NOT EXISTS `t_vote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `form_data` text NOT NULL COMMENT '投票表单JSON数据：[{type:''single|multi'',options:[{text:'''',value:''''}]}]',
  `name` varchar(50) DEFAULT NULL COMMENT '投票标题',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  `operator_id` int(11) DEFAULT NULL COMMENT '操作人ID',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='投票表';

-- Data exporting was unselected.

-- Dumping structure for table ding_app.t_vote_stastics
CREATE TABLE IF NOT EXISTS `t_vote_stastics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `t_vote_id` int(11) DEFAULT NULL,
  `question_num` int(11) DEFAULT NULL COMMENT '题号',
  `question` varchar(255) DEFAULT NULL COMMENT '题目',
  `answer` text COMMENT '答案',
  `dd_id` int(11) DEFAULT NULL COMMENT '投票人ID',
  PRIMARY KEY (`id`),
  KEY `t_vote_id` (`t_vote_id`),
  KEY `dd_id` (`dd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='投票统计';

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
