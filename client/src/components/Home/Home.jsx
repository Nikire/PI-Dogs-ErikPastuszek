import React from 'react';
import CardsContainer from '../CardsContainer/CardsContainer';
import Filters from '../Filters/Filters';
import Nav from '../Nav/Nav';
import './Home.css';
export default function Home() {
	return (
		<div>
			<Nav />
			<Filters />
			<CardsContainer />
		</div>
	);
}
