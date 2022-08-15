import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox/SearchBox';
import CreateDog from './CreateDog/CreateDog';
import Logo from './Logo/Logo';
export default function Nav() {
	return (
		<header>
			<nav>
				<Link to="/home">
					<Logo />
				</Link>
				<SearchBox />
				<CreateDog />
			</nav>
		</header>
	);
}
