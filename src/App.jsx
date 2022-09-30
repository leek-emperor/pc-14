/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-09-21 09:30:55
 * @LastEditTime: 2022-09-28 16:37:27
 * @LastEditors: liutq
 * @Reference:
 */

import { unstable_HistoryRouter as HistoryRouer, Route, Routes } from 'react-router-dom';
import './index.scss';
import { AuthComponent } from './components/AuthComponent';
import { history } from './utils/history';

// 导入必要组件
import { lazy, Suspense } from 'react';
// 按需导入路由组件
const Login = lazy(() => import('./pages/Login'));
const Layout = lazy(() => import('./pages/Layout'));
const Home = lazy(() => import('./pages/Home'));
const Article = lazy(() => import('./pages/Article'));
const Publish = lazy(() => import('./pages/Publish'));

function App() {
	return (
		<HistoryRouer history={history}>
			<Suspense
				fallback={
					<div
						style={{
							textAlign: 'center',
							marginTop: 200,
						}}
					>
						loading...
					</div>
				}
			>
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
			</Suspense>
		</HistoryRouer>
	);
}

export default App;
