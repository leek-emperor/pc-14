/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-21 09:30:55
 * @LastEditTime: 2022-09-21 10:41:58
 * @LastEditors: liutq
 * @Reference:
 */
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './pages/Layout';
import { Button } from 'antd';
function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Button type="primary">Button</Button>
				<Routes>
					{/* 路由path和组件的对应关系 */}
					<Route path="/" element={<Navigate to="layout" />}></Route>
					<Route path="/layout" element={<Layout />}></Route>
					<Route path="/login" element={<Login />}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
