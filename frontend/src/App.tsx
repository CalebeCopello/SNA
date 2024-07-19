import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/index/Index';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Index />}
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
