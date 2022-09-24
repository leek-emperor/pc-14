/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-21 09:30:55
 * @LastEditTime: 2022-09-23 21:53:55
 * @LastEditors: liutq
 * @Reference:
 */

import { unstable_HistoryRouter as HistoryRouer, Route, Routes } from 'react-router-dom';
import './index.scss';
import Layout from './pages/Layout';
import Login from './pages/Login';
import { AuthComponent } from './components/AuthComponent';
import Home from './pages/Home';
import Article from './pages/Article';
import Publish from './pages/Publish';
import { history } from './utils/history';
function App() {
	return (
		<HistoryRouer history={history}>
			<div className="App">
				<Routes>
					{/* 路由path和组件的对应关系 */}
					{/* 路由鉴权 */}
					<Route
						path="/"
						element={
							<AuthComponent>
								<Layout />
							</AuthComponent>
						}
					>
						<Route index element={<Home />}></Route>
						<Route path="article" element={<Article />}></Route>
						<Route path="publish" element={<Publish />}></Route>
					</Route>
					<Route path="/login" element={<Login />}></Route>
				</Routes>
			</div>
		</HistoryRouer>
	);
}

export default App;
