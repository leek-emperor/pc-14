/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-21 10:15:52
 * @LastEditTime: 2022-09-23 20:22:10
 * @LastEditors: liutq
 * @Reference:
 */
import React from 'react';
import { Button, Checkbox, Form, Input, Card, message } from 'antd';
// 样式和素材
import './index.scss';
import logo from '../../assets/logo.png';
// 导入store
import { useStore } from '../../store';
// 导入导航函数
import { useNavigate } from 'react-router-dom';
export default function Login() {
	// mobx的状态
	const { loginStore } = useStore();
	const navigate = useNavigate();
	const onFinish = async value => {
		// 给将手机号和验证码传到后端
		try {
			await loginStore.getToken({
				mobile: value.phone,
				code: value.password,
			});
			// 跳转到首页
			navigate('/');
			// 提示用户
			message.success('登录成功');
		} catch (e) {
			message.error(e.response.status + '  ' + e.response.data.message);
		}
	};
	return (
		<div className="login">
			<Card className="login-container">
				<img className="login-logo" src={logo} alt="" />
				<Form
					/*导入需要的触发事件，在下方validateTrigger使用 */
					validateTrigger={['onBlur']}
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Form.Item
						name="phone"
						rules={[
							{
								required: true,
								message: '请输入手机号',
							},
							{
								pattern: /^1[3-9]\d{9}$/,
								message: '请输入正确的手机号',
								validateTrigger: 'onBlur',
							},
						]}
					>
						<Input size="large" placeholder="请输入手机号" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: '请输入验证码',
							},
							{
								len: 6,
								message: '请输入六位验证码',
								validateTrigger: 'onBlur',
							},
						]}
					>
						<Input size="large" placeholder="请输入验证码" />
					</Form.Item>
					<Form.Item name="remember" valuePropName="checked">
						<Checkbox className="login-checkbox-label">
							我已阅读并同意「用户协议」和「隐私条款」
						</Checkbox>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" size="large" block>
							登录
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
}
