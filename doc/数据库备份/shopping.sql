/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50714
Source Host           : 127.0.0.1:3306
Source Database       : takeoff

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-04-10 10:28:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for shopping
-- ----------------------------
DROP TABLE IF EXISTS `shopping`;
CREATE TABLE `shopping` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增长',
  `user` varchar(255) NOT NULL COMMENT '用户名',
  `daid` varchar(255) NOT NULL COMMENT '商品id',
  `price` float(10,2) NOT NULL COMMENT '价格',
  `quantity` int(11) NOT NULL COMMENT '数量',
  `classify` varchar(255) DEFAULT NULL COMMENT '属性',
  `size` varchar(255) DEFAULT NULL COMMENT '大小，颜色',
  `times` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shopping
-- ----------------------------
