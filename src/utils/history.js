/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-23 20:24:49
 * @LastEditTime: 2022-09-23 20:24:50
 * @LastEditors: liutq
 * @Reference:
 */

// 这个包其实就是实现路由跳转的，需要npm i --save history下载
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export { history };
