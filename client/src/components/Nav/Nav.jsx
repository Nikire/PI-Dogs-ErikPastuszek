import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox/SearchBox';
import CreateDogButt from './CreateDogButt/CreateDogButt';
import Logo from './Logo/Logo';
export default function Nav() {
	return (
		<header>
			<nav>
				<Link to="/home">
					<Logo />
				</Link>
				<SearchBox />
				<Link to="/home/create" style={{ textDecoration: 'none' }}>
					<CreateDogButt />
				</Link>
			</nav>
		</header>
	);
}
