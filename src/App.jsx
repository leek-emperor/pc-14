/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-21 09:30:55
 * @LastEditTime: 2022-09-21 15:29:29
 * @LastEditors: liutq
 * @Reference:
 */
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login';
function App() {
	return (
		<BrowserRouter>
			<div className="App">
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
