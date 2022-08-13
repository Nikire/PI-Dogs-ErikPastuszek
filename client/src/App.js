import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import SoftNotFound from './components/SoftNotFound/SoftNotFound';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route path="/home" component={Home} />
				<Route path="*" component={SoftNotFound} />
			</Switch>
		</div>
	);
}

export default App;
