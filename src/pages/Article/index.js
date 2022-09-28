/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-23 09:40:32
 * @LastEditTime: 2022-09-26 14:40:10
 * @LastEditors: liutq
 * @Reference:
 */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	message,
	Card,
	Breadcrumb,
	Form,
	Button,
	Radio,
	DatePicker,
	Select,
	Table,
	Tag,
	Space,
} from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import img404 from '../../assets/error.png';
import './index.scss';
import { http } from '../../utils/http';
import { useStore } from '../../store';
import { observer } from 'mobx-react-lite';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
	// 频道列表管理
	const {
		channelStore: { channelList },
	} = useStore();
	// 文章列表
	// 文章的删除功能
	const delArticle = async data => {
		try {
			await http.delete(`/mp/articles/${data.id}`);
			message.success('删除成功');
			// 刷新一下列表
			setParams({
				...params,
				page: 1,
			});
		} catch (error) {
			message.error(error.response.status + ' ' + error.response.statusText);
		}
	};
	// 文章列表格式管理

	// 跳转文章编辑操作
	const navigate = useNavigate();
	const goPublish = data => {
		navigate(`/publish?id=${data.id}`);
	};
	const columns = [
		{
			title: '封面',
			dataIndex: 'cover',
			width: 120,
			render: cover => {
				return <img src={cover.images || img404} width={80} height={60} alt="" />;
			},
		},
		{
			title: '标题',
			dataIndex: 'title',
			width: 220,
		},
		{
			title: '状态',
			dataIndex: 'status',
			render: data => <Tag color="green">审核通过</Tag>,
		},
		{
			title: '发布时间',
			dataIndex: 'pubdate',
		},
		{
			title: '阅读数',
			dataIndex: 'read_count',
		},
		{
			title: '评论数',
			dataIndex: 'comment_count',
		},
		{
			title: '点赞数',
			dataIndex: 'like_count',
		},
		{
			title: '操作',
			render: data => {
				return (
					<Space size="middle">
						<Button
							type="primary"
							shape="circle"
							icon={<EditOutlined />}
							onClick={() => goPublish(data)}
						/>
						<Button
							type="primary"
							danger
							shape="circle"
							icon={<DeleteOutlined />}
							onClick={() => delArticle(data)}
						/>
					</Space>
				);
			},
		},
	];

	// 文章列表数据管理
	const [article, setArticleList] = useState({
		list: [],
		count: 0,
	});

	// 每页只渲染10个数据，参数管理
	const [params, setParams] = useState({
		page: 1,
		per_page: 10,
	});

	// 发送接口请求
	// 如果这个请求写到useEffect外面
	// 那么每次组件更新都会使得函数初始化，避免性能损失
	useEffect(() => {
		const fetchArticleList = async () => {
			const res = await http.get('/mp/articles', { params });
			const { results, total_count } = res.data;
			setArticleList({
				list: results,
				count: total_count,
			});
		};
		fetchArticleList();
	}, [params]);

	const onFinish = value => {
		const { date, status, channel_id } = value;
		console.log(1, channel_id);

		// 数据处理
		const _params = {};
		if (status !== -1) {
			_params.status = status;
		}
		if (channel_id) {
			_params.channel_id = channel_id;
		}
		if (date) {
			_params.begin_pudate = date[0].format('YYYY-MM-DD');
			_params.end_pudate = date[1].format('YYYY-MM-DD');
		}
		// 修改params数据 引起接口的重新发送
		setParams({ ...params, ..._params });
	};

	// 修改page数
	const pageChange = page => {
		setParams({
			...params,
			page,
		});
	};

	// 写死的文章数据
	// const data = [
	// 	{
	// 		id: '01',
	// 		comment_count: 0,
	// 		cover: {
	// 			images: 'http://geek.itheima.net/resources/images/12.jpg',
	// 		},
	// 		like_count: 0,
	// 		pubdate: '2019-03-11 09:00:00',
	// 		read_count: 2,
	// 		status: 2,
	// 		title: '测试1',
	// 	},
	// 	{
	// 		id: '02',
	// 		comment_count: 0,
	// 		cover: {
	// 			images: 'http://geek.itheima.net/resources/images/15.jpg',
	// 		},
	// 		like_count: 0,
	// 		pubdate: '2019-03-11 09:00:00',
	// 		read_count: 2,
	// 		status: 2,
	// 		title: '测试2',
	// 	},
	// ];
	return (
		<div>
			{/* 筛选区 */}
			<Card
				title={
					<Breadcrumb separator=">">
						<Breadcrumb.Item>
							<Link to="/">首页</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>内容管理</Breadcrumb.Item>
					</Breadcrumb>
				}
				style={{ marginBottom: 20 }}
			>
				<Form onFinish={onFinish} initialValues={{ status: null }}>
					<Form.Item label="状态" name="status">
						<Radio.Group>
							<Radio value={-1}>全部</Radio>
							<Radio value={0}>草稿</Radio>
							<Radio value={1}>待审核</Radio>
							<Radio value={2}>审核通过</Radio>
							<Radio value={3}>审核失败</Radio>
						</Radio.Group>
					</Form.Item>

					<Form.Item label="频道" name="channel_id">
						<Select placeholder="请选择文章频道" style={{ width: 120 }}>
							{channelList.map(channel => (
								<Option key={channel.id} value={channel.id}>
									{channel.name}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label="日期" name="date">
						{/* 传入locale属性 控制中文显示*/}
						<RangePicker locale={locale}></RangePicker>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
							筛选
						</Button>
					</Form.Item>
				</Form>
			</Card>
			{/* 文章列表区 */}
			<Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
				<Table
					rowKey="id"
					columns={columns}
					dataSource={[...article.list]}
					pagination={{
						pageSize: params.per_page,
						total: article.count,
						onChange: pageChange,
					}}
				/>
			</Card>
		</div>
	);
};

export default observer(Article);
