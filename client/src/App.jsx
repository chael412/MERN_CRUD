import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/Home/home';
import About from './routes/About/About';
import Header from './components/Header';
import Footer from './components/Footer';
import AddNote from './routes/Home/AddNote';
import EditNote from './routes/Home/EditNote';

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/add_note'
						element={<AddNote />}
					/>
					<Route
						path='/edit_note/:id'
						element={<EditNote />}
					/>
					<Route
						path='/about'
						element={<About />}
					/>
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
