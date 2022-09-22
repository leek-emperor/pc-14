/*
 * @Descripto
 * @Author: liutq
 * @Date: 2022-09-22 15:12:43
 * @LastEditTime: 2022-09-22 15:18:09
 * @LastEditors: liutq
 * @Reference:
 */
// 封装ls存取token
// token的key
const key = 'pc-key';

const setToken = token => {
	return window.localStorage.setItem(key, token);
};

const getToken = () => {
	return window.localStorage.getItem(key);
};

const removeToken = () => {
	return window.localStorage.removeItem(key);
};

export { setToken, getToken, removeToken };
