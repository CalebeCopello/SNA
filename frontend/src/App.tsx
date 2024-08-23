import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from './pages/index/Index';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Fof from './pages/fof/Fof';
import Profile from './pages/profile/Profile';
import Appearance from './pages/appearance/Appearance'

import './App.css';

function App() {
	// document.body.classList.add('gruvboxDark')
	// document.body.classList.add('rosePineMoon')
	document.body.classList.add('gruvbox')
	document.body.classList.add('bg-background')
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
						element={<Profile />}
					/>
					<Route
						path='/appearance'
						element={<Appearance />}
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
