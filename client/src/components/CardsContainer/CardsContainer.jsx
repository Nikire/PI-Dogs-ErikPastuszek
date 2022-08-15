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
				//ACA IRÍA UN LINK
				<Link to={`/home/${dog.id}`} className="link">
					<Card
						id={dog.id}
						key={dog.name + dog.id} //Existen dogs con el mismo ID, por lo que le agrego el nombre y lo transformo como una key unica.
						name={dog.name}
						img={dog.image.url}
						temperament={dog.temperament}
						weight={dog.weight.metric}
					/>
				</Link>
				//ACA TERMINARIA EL LINK
			))}
		</div>
	);
}
