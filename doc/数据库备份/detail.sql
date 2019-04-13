/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50714
Source Host           : 127.0.0.1:3306
Source Database       : takeoff

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-04-10 10:28:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for detail
-- ----------------------------
DROP TABLE IF EXISTS `detail`;
CREATE TABLE `detail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增长',
  `daid` varchar(50) NOT NULL COMMENT '唯一名称数字，字母',
  `shop` varchar(100) NOT NULL COMMENT '店名称',
  `title` varchar(150) NOT NULL COMMENT '名字',
  `price` float(10,2) NOT NULL COMMENT '价格',
  `explain` varchar(255) NOT NULL COMMENT '说明',
  `hint` varchar(255) NOT NULL COMMENT '提示',
  `maximg` varchar(255) NOT NULL COMMENT '大图',
  `minimg` varchar(255) NOT NULL COMMENT '小图","    分隔',
  `magnifying` varchar(255) NOT NULL COMMENT '放大镜图片","  分隔',
  `comdetails` varchar(255) NOT NULL COMMENT '商品详情图片,","   分隔',
  `specifcation` varchar(255) NOT NULL COMMENT '规格参数',
  `times` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of detail
-- ----------------------------
