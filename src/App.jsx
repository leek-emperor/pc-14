/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-21 09:30:55
 * @LastEditTime: 2022-09-22 16:07:48
 * @LastEditors: liutq
 * @Reference:
 */

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './index.scss';
import Layout from './pages/Layout';
import Login from './pages/Login';
import { AuthComponent } from './components/AuthComponent';
function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					{/* 路由path和组件的对应关系 */}
					<Route path="/" element={<Navigate to="layout" />}></Route>
					{/* 路由鉴权 */}
					<Route
						path="/layout"
						element={
							<AuthComponent>
								<Layout />
							</AuthComponent>
						}
					></Route>
					<Route path="/login" element={<Login />}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
