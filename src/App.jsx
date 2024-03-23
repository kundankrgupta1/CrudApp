import './App.css'
import AllRoutes from './Components/AllRoutes';
import { BrowserRouter } from 'react-router-dom';

function App() {


	return (
		<>
			<BrowserRouter>
				<AllRoutes />
			</BrowserRouter>
		</>
	)
}

export default App
