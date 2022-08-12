import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
export default function Landing() {
	return (
		<div className="landing">
			Landing
			<Link to="/home">Gotta catch 'em all</Link>
		</div>
	);
}
