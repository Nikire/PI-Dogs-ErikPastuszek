import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
export default function Landing() {
	return (
		<div className="landing">
			<Link to="/home" style={{ textDecoration: 'none' }}>
				<h1 className="goHome">Doggies</h1>
			</Link>
		</div>
	);
}
