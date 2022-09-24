/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-23 09:40:05
 * @LastEditTime: 2022-09-24 10:24:24
 * @LastEditors: liutq
 * @Reference:
 */
import React from 'react';
import Bar from '../../components/Bar';

export default function Home() {
	return (
		<div>
			{/* 渲染Bar组件 */}
			<Bar
				title={'主流框架使用满意度1'}
				xData={['react', 'vue', 'angular']}
				yData={[30, 40, 50]}
				style={{ width: '500px', height: '400px' }}
			/>
			<Bar
				title={'主流框架使用满意度2'}
				xData={['react', 'vue', 'angular']}
				yData={[60, 70, 80]}
				style={{ width: '300px', height: '200px' }}
			/>
		</div>
	);
}
