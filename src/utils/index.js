/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-21 10:03:46
 * @LastEditTime: 2022-09-22 15:18:41
 * @LastEditors: liutq
 * @Reference:
 */

// 先把所有的工具函数导出的模块在这里导入
// 然后再统一导出
import { http } from './http';
import { getToken, setToken, removeToken } from './token';

export { http, setToken, getToken, removeToken };
