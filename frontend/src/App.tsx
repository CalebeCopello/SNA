import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/index/Index';
import Login from './pages/login/Login';
import './App.css';

function App() {
	// document.body.classList.add('gruvboxDark')
	document.body.classList.add('rosePineMoon')
	// document.body.classList.add('gruvbox')
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
						path='*'
						element={<div>404</div>}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
