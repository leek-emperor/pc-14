/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-24 10:02:20
 * @LastEditTime: 2022-09-24 18:14:33
 * @LastEditors: liutq
 * @Reference:
 */
import React, { useEffect, useRef } from 'react';
// 以下是按需引入echarts
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	BarChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer,
]);
export default function Bar({ title, xData, yData, style }) {
	const domRef = useRef();
	// 执行chartInit函数
	useEffect(() => {
		const chartInit = () => {
			// 基于准备好的dom，初始化echarts实例
			const myChart = echarts.init(domRef.current);
			// 绘制图表
			myChart.setOption({
				title: {
					text: title,
				},
				tooltip: {},
				xAxis: {
					data: xData,
				},
				yAxis: {},
				series: [
					{
						name: '销量',
						type: 'bar',
						data: yData,
					},
				],
			});
		};
		chartInit();
	}, [title, xData, yData, style]);
	return (
		<div>
			{/* echarts的挂载节点 */}
			<div ref={domRef} style={style}></div>
		</div>
	);
}
