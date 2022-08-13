import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox/SearchBox';
import CreateDog from './CreateDog/CreateDog';
export default function Nav() {
	return (
		<header>
			<nav>
				<Link to="/home">ACA VA UN LOGO</Link>
				<SearchBox />
				<CreateDog />
			</nav>
		</header>
	);
}
