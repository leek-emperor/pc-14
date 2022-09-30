/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-23 09:41:15
 * @LastEditTime: 2022-09-28 15:13:09
 * @LastEditors: liutq
 * @Reference:
 */
import { message, Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useSearchParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.scss';
import { useStore } from '../../store';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { http } from '../../utils';
const { Option } = Select;
const Publish = () => {
	// 给form一个ref
	const formRef = useRef();
	// 获取频道列表
	const {
		channelStore: { channelList },
	} = useStore();

	// 上传相关
	// 存放上传图片的列表
	const [fileList, setFileList] = useState([]);
	// 图片的暂存仓库
	const cacheImgList = useRef();
	const onUploadChange = res => {
		// 这里可以优化一下，因为上传是一个异步操作
		// 所以这setFileList调用了三次
		const formatList = res.fileList.map(file => {
			// 上传完毕 做数据处理
			if (file.response) {
				return {
					url: file.response.data.url,
				};
			}
			// 否则在上传中时，不做处理
			return file;
		});
		setFileList(formatList);
		// 同时把图片存入仓库一份
		cacheImgList.current = formatList;
	};

	// 切换图片模式
	// 图片数目
	const [imgCount, setImageCount] = useState(1); // 默认一个图
	const radioChange = e => {
		setImageCount(e.target.value);
		// 调用仓库
		// 另外一种，使用e.target.value，这个1和3的逻辑就不是反的
		// 下面的imgCount没有更新，所以1和3的逻辑是反的
		if (imgCount === 1) {
			// 在这里的时候，imgCount其实是从1变到3，所以暂时还是1
			setFileList(cacheImgList.current);
		} else if (imgCount === 3) {
			// 同理，这里是3切换到1，这里必须判断current是否存在
			// 不能直接写三元判断符
			if (cacheImgList.current) {
				const img = cacheImgList.current[0];
				setFileList([img]);
			}
		}
	};
	//编辑功能
	// 文案匹配，根据id
	const [params] = useSearchParams();
	const articleId = params.get('id');
	// 数据回填 id调用接口 1、表单回填 2、暂存列表 3、upload组件FileList
	useEffect(() => {
		if (articleId) {
			const loadDetail = async () => {
				const res = await http.get(`/mp/articles/${articleId}`);
				// 表单数据回填
				const { cover, ...formValue } = res.data;
				formRef.current.setFieldsValue({ ...formValue, type: cover.type });
				const imageList = cover.images.map(item => {
					return {
						url: item,
					};
				});
				setFileList(imageList);
				// 暂存列表页存一份，也要设置最大的显示图片数
				setImageCount(cover.type);
				cacheImgList.current = imageList;
			};
			loadDetail();
		}
	}, [articleId]);
	// 提交表单
	const onFinish = async values => {
		// 数据的二次处理 重点是处理cover字段
		const { channel_id, content, title, type } = values;
		const params = {
			channel_id,
			content,
			title,
			type,
			cover: {
				type: type,
				images: type ? fileList.map(item => item.url) : null,
			},
		};
		if (articleId) {
			await http.put(`/mp/articles/${articleId}?draft=false`, params);
		} else {
			await http.post('/mp/articles?draft=false', params);
		}
		// 清空表单，图片使用setFileList清除
		formRef.current.resetFields();
		setFileList([]);
		message.success(`${articleId ? '更新成功' : '发布成功'}`);
	};
	return (
		<div className="publish">
			<Card
				title={
					<Breadcrumb separator=">">
						<Breadcrumb.Item>
							<Link to="/home">首页</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>{articleId ? '更新文章' : '发布文章'}</Breadcrumb.Item>
					</Breadcrumb>
				}
			>
				<Form
					ref={formRef}
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ type: 1 }}
					onFinish={onFinish}
				>
					<Form.Item
						label="标题"
						name="title"
						rules={[{ required: true, message: '请输入文章标题' }]}
					>
						<Input placeholder="请输入文章标题" style={{ width: 400 }} />
					</Form.Item>
					<Form.Item
						label="频道"
						name="channel_id"
						rules={[{ required: true, message: '请选择文章频道' }]}
					>
						<Select placeholder="请选择文章频道" style={{ width: 400 }}>
							{channelList.map(channel => (
								<Option key={channel.id} value={channel.id}>
									{channel.name}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label="封面">
						<Form.Item name="type">
							<Radio.Group onChange={radioChange}>
								<Radio value={1}>单图</Radio>
								<Radio value={3}>三图</Radio>
								<Radio value={0}>无图</Radio>
							</Radio.Group>
						</Form.Item>
						{imgCount > 0 && (
							<Upload
								name="image"
								listType="picture-card"
								className="avatar-uploader"
								showUploadList
								action="http://geek.itheima.net/v1_0/upload"
								fileList={fileList}
								onChange={onUploadChange}
								maxCount={imgCount}
							>
								<div style={{ marginTop: 8 }}>
									<PlusOutlined />
								</div>
							</Upload>
						)}
					</Form.Item>
					<Form.Item
						label="内容"
						name="content"
						rules={[{ required: true, message: '请输入文章内容' }]}
					>
						<ReactQuill theme="snow" />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 4 }}>
						<Space>
							<Button size="large" type="primary" htmlType="submit">
								{articleId ? '更新文章' : '发布文章'}
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default observer(Publish);
