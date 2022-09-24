/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-21 10:16:01
 * @LastEditTime: 2022-09-23 22:03:20
 * @LastEditors: liutq
 * @Reference:
 */
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Layout, Menu, Popconfirm } from 'antd';
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './index.scss';
import { useStore } from '../../store';
const { Header, Sider } = Layout;

function GeekLayout() {
	// 解决刷新高亮问题
	const { pathname } = useLocation();

	// 使用useNavigate实现二级路由的跳转，当然也可以直接用link包裹
	const navigate = useNavigate();
	const click = e => {
		navigate(e.key);
	};

	// 右上角显示用户信息，调用mobx中的数据
	const { userStore, loginStore } = useStore();
	useEffect(() => {
		userStore.getUserInfo();
	}, [userStore]);

	// 退出登录
	const confirm = () => {
		loginStore.loginOut();
		navigate('/login');
	};
	return (
		<Layout>
			<Header className="header">
				<div className="logo" />
				<div className="user-info">
					<span className="user-name">{userStore.userInfo.name}</span>
					<span className="user-logout">
						<Popconfirm
							onConfirm={confirm}
							title="是否确认退出？"
							okText="退出"
							cancelText="取消"
						>
							<LogoutOutlined /> 退出
						</Popconfirm>
					</span>
				</div>
			</Header>
			<Layout>
				<Sider width={200} className="site-layout-background">
					{/* <Menu
						mode="inline"
						theme="dark"
						defaultSelectedKeys={['/']}
						style={{ height: '100%', borderRight: 0 }}
					>
						<Menu.Item icon={<HomeOutlined />} key="/" onClick={click}>
							数据概览
						</Menu.Item>
						<Menu.Item icon={<DiffOutlined />} key="/article" onClick={click}>
							内容管理
						</Menu.Item>
						<Menu.Item icon={<EditOutlined />} key="/publish" onClick={click}>
							发布文章
						</Menu.Item>
					</Menu> */}
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={['/']}
						selectedKeys={pathname}
						items={[
							{
								key: '/',
								icon: <HomeOutlined />,
								label: '数据概览',
							},
							{
								key: '/article',
								icon: <DiffOutlined />,
								label: '内容管理',
							},
							{
								key: '/publish',
								icon: <EditOutlined />,
								label: '发布文章',
							},
						]}
						onClick={click}
					/>
				</Sider>
				<Layout className="layout-content" style={{ padding: 20 }}>
					{/* 二级路由的出口 */}
					<Outlet />
				</Layout>
			</Layout>
		</Layout>
	);
}
export default observer(GeekLayout);
