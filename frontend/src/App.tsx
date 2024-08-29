import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import Index from './pages/index/Index';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Fof from './pages/fof/Fof';
import Profile from './pages/profile/Profile';
import Appearance from './pages/appearance/Appearance';
import Search from './pages/search/Search';

import './App.css';

function App() {
	const theme = useAppSelector((state) => state.theme.value);
	document.body.className= '';
	document.body.classList.add(theme);
	document.body.classList.add('bg-background');
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Index />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/signup'
						element={<Signup />}
					/>
					<Route
						path='/profile'
						element={<ProtectedRoute children={<Profile />}/>}
					/>
					<Route
						path='/appearance'
						element={<ProtectedRoute children={<Appearance />}/>}
					/>
					<Route
						path='/search'
						element={<ProtectedRoute children={<Search />}/>}
					/>
					<Route
						path='*'
						element={<Fof />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
