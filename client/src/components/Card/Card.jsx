import React from 'react';
import './Card.css';

export default function Card(props) {
	return (
		<div className="card">
			<h4>{props.name}</h4>
			<img src={props.img} alt={props.name} />
			<p>{props.temperament}</p>
			<span>{props.weight} Kg</span>
		</div>
	);
}
