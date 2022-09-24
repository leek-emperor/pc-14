/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-22 14:19:10
 * @LastEditTime: 2022-09-23 22:01:40
 * @LastEditors: liutq
 * @Reference:
 */

// login模块
import { runInAction, makeAutoObservable } from 'mobx';
import { http, setToken, getToken, removeToken } from '../utils';

class LoginStore {
	token = getToken() || '';
	constructor() {
		// 响应式
		makeAutoObservable(this);
	}
	getToken = async ({ mobile, code }) => {
		// 调用登录接口
		const res = await http.post('/authorizations', {
			mobile,
			code,
		});
		// 在对象内存入token
		// 因为上面使用了异步操作得到了res，所以需要单独处理一下赋值
		// 1、可以使用runInAction进行包裹
		// 2、也可以在外侧class内定义一个方法，将token作为参数传入
		// 	进行this.token的赋值
		runInAction(() => {
			this.token = res.data.token;
		});
		// 在ls中存入token
		setToken(this.token);
	};
	loginOut = () => {
		this.token = '';
		removeToken();
	};
}

export default LoginStore;
