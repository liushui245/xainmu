/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50714
Source Host           : 127.0.0.1:3306
Source Database       : takeoff

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-04-10 10:28:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for login
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增长',
  `user` varchar(50) NOT NULL COMMENT '用户名',
  `pass` varchar(50) NOT NULL DEFAULT '' COMMENT '密码',
  `starttimes` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  `finallytimes` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后上线时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login
-- ----------------------------
