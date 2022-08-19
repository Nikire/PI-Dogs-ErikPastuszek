import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import './CardsContainer.css';

export default function CardsContainer() {
	const actualDogs = useSelector((state) => state.pagination.actualDogs);
	return (
		<div className="cardsContainer">
			{actualDogs?.map((dog) => (
				<Link to={`/home/${dog.id}`} key={dog.id} className="link">
					<Card
						id={dog.id}
						key={dog.name + dog.id}
						name={dog.name}
						img={dog.image}
						temperament={dog.temperament}
						weight={dog.weight}
					/>
				</Link>
			))}
		</div>
	);
}
