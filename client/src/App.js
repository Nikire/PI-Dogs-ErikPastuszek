import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CreateDog from './components/CreateDog/CreateDog';
import DogDetail from './components/DogDetail/DogDetail';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Nav from './components/Nav/Nav';
import SoftNotFound from './components/SoftNotFound/SoftNotFound';

function App() {
	const [showNav, setShowNav] = useState(false);

	const activeNowNav = (bool) => {
		setShowNav(true);
		if (bool !== undefined) setShowNav(bool);
	};

	return (
		<div className="App">
			{showNav && <Nav />}
			<Switch>
				<Route exact path="/">
					<Landing activeNowNav={activeNowNav} />
				</Route>
				<Route exact path="/home">
					<Home activeNowNav={activeNowNav} />
				</Route>
				<Route exact path="/home/create">
					<CreateDog activeNowNav={activeNowNav} />
				</Route>
				<Route exact path="/home/:id">
					<DogDetail activeNowNav={activeNowNav} />
				</Route>
				<Route path="*" component={SoftNotFound} />
			</Switch>
		</div>
	);
}

export default App;
