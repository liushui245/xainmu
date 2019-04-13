/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50714
Source Host           : 127.0.0.1:3306
Source Database       : takeoff

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-04-10 10:27:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for commodity
-- ----------------------------
DROP TABLE IF EXISTS `commodity`;
CREATE TABLE `commodity` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `daid` varchar(255) NOT NULL COMMENT '唯一名称数字，字母',
  `title` varchar(255) NOT NULL COMMENT '名字表头',
  `price` float(10,2) NOT NULL COMMENT '价格',
  `imgpath` varchar(255) NOT NULL COMMENT '图片路径',
  `lable` varchar(255) DEFAULT NULL COMMENT '右上角的便签',
  `pick` varchar(255) DEFAULT NULL COMMENT '甄选',
  `times` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commodity
-- ----------------------------
