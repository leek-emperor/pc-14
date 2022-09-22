/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-21 10:01:23
 * @LastEditTime: 2022-09-22 14:53:19
 * @LastEditors: liutq
 * @Reference:
 */
// 把所有模块统一处理
import React from 'react';
import LoginStore from './login.Store';
class RootStore {
	constructor() {
		this.loginStore = new LoginStore();
	}
}

// 实例化
const rootStore = new RootStore();
const context = React.createContext(rootStore);

const useStore = () => React.useContext(context);
export { useStore };
