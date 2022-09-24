/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-23 10:49:28
 * @LastEditTime: 2022-09-23 22:04:21
 * @LastEditors: liutq
 * @Reference:
 */
import { runInAction, makeAutoObservable } from 'mobx';
import { http } from '../utils';
export default class UserStore {
	userInfo = {};
	constructor() {
		makeAutoObservable(this);
	}
	getUserInfo = async () => {
		// 调用数据获取接口
		const res = await http.get('/user/profile');
		// 这里和token是一样的，异步操作得到的结果需要包裹一下
		runInAction(() => {
			this.userInfo = res.data;
		});
	};
}
