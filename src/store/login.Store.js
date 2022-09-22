/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-22 14:19:10
 * @LastEditTime: 2022-09-22 15:55:06
 * @LastEditors: liutq
 * @Reference:
 */

// login模块
import { makeAutoObservable } from 'mobx';
import { http, setToken, getToken } from '../utils';
class LoginStore {
	token = getToken() || '';
	constructor() {
		// 响应式
		makeAutoObservable(this);
	}
	getToken = async ({ mobile, code }) => {
		// 调用登录接口
		const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
			mobile,
			code,
		});
		// 在对象内存入token
		this.token = res.data.token;
		// 在ls中存入token
		setToken(this.token);
	};
}

export default LoginStore;
