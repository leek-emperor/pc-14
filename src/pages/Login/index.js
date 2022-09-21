/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-21 10:15:52
 * @LastEditTime: 2022-09-21 15:09:12
 * @LastEditors: liutq
 * @Reference:
 */
import React from 'react';
import { Card } from 'antd';
import logo from '@/assets/logo.png';
import './index.scss';
export default function Login() {
	return (
		<div className="login">
			<Card className="login-container">
				<img className="login-logo" src={logo} alt="" />
			</Card>
		</div>
	);
}
