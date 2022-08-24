import React, { useEffect, useState } from 'react';
import './SortFilter.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../../redux/actions';
export default function Filter(props) {
	const [input, setInput] = useState('');
	const dispatch = useDispatch();
	const filteredDogs = useSelector((state) => state.filteredDogs);
	const onHandleChange = (e) => {
		setInput(e.target.value);
	};
	useEffect(() => {
		dispatch(setSort(input, filteredDogs));
	}, [input]);

	switch (props.type) {
		case 'name':
			return (
				<div className="sortFilter">
					<label>Sort by name:</label>
					<div>
						<input
							onChange={onHandleChange}
							type="radio"
							name="sort"
							value="AZ"
						/>
						<label className="bold">Az</label>
						<input
							onChange={onHandleChange}
							type="radio"
							name="sort"
							value="ZA"
						/>
						<label className="bold">Za</label>
					</div>
				</div>
			);
		case 'weight':
			return (
				<div className="sortFilter">
					<label>Sort by weight:</label>
					<div>
						<input
							onChange={onHandleChange}
							type="radio"
							name="sort"
							value="DES"
						/>
						<label className="bold">DES</label>
						<input
							onChange={onHandleChange}
							type="radio"
							name="sort"
							value="ASC"
						/>
						<label className="bold">ASC</label>
					</div>
				</div>
			);
		default:
			return null;
	}
}
