import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../../redux/actions';
import './SearchBox.css';
export default function SearchBox() {
	const dispatch = useDispatch();
	const allDogs = useSelector((state) => state.allDogs);
	const filteredDogs = useSelector((state) => state.filteredDogs);

	const [searchInput, setSearchInput] = useState('');

	const onHandleChange = (e) => {
		console.log(e.target.value);
		setSearchInput(e.target.value);
	};
	const onHandleClick = (e) => {
		dispatch(setSearch(searchInput, allDogs, filteredDogs));
	};
	return (
		<div className="search-box">
			<input
				type="text"
				value={searchInput}
				onChange={onHandleChange}
				className="search"
			></input>
			{!!searchInput.length && (
				<span
					className="close"
					onClick={() => {
						setSearchInput('');
						dispatch(setSearch('', allDogs, filteredDogs));
					}}
				>
					&times;
				</span>
			)}
			<div className="search-icon" onClick={onHandleClick}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
				</svg>
			</div>
		</div>
	);
}
