/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-25 15:02:49
 * @LastEditTime: 2022-09-25 16:14:29
 * @LastEditors: liutq
 * @Reference:
 */
import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '../utils';
class ChannelStore {
	channelList = [];
	constructor() {
		makeAutoObservable(this);
	}
	loadChannelList = async () => {
		const res = await http.get('/channels');
		runInAction(() => {
			this.channelList = res.data.channels;
		});
	};
}

export default ChannelStore;
