import React, { useEffect, useState } from 'react';
import './Filter.css';
import { useDispatch, useSelector } from 'react-redux';
import { applyFilters, setFilters } from '../../../redux/actions';
export default function Filter(props) {
	const dispatch = useDispatch();
	const temperaments = useSelector((state) => state.temperaments);
	const [tempFilter, setTempFilter] = useState('');
	const [source, setSource] = useState('');
	const filters = useSelector((state) => state.filters);
	const allDogs = useSelector((state) => state.allDogs);
	const filteredDogs = useSelector((state) => state.filteredDogs);
	const onHandleSelect = (e) => {
		setTempFilter(e.target.value);
	};
	const onHandleSelectSource = (e) => {
		setSource(e.target.value);
	};
	useEffect(() => {
		dispatch(setFilters(filters, tempFilter, 'temperament'));
	}, [tempFilter]);
	useEffect(() => {
		dispatch(setFilters(filters, source, 'source'));
	}, [source]);
	useEffect(() => {
		dispatch(applyFilters(filters, allDogs, filteredDogs));
	}, [filters]);
	switch (props.type) {
		case 'temperaments':
			return (
				<div className="filter">
					<p>Filter by temperament:</p>
					<select
						defaultValue="default"
						name="temperament-filter"
						onChange={onHandleSelect}
					>
						<option value="default" hidden>
							Choose temperament...
						</option>
						<option value="">Show all</option>
						{temperaments?.map((temperament) => (
							<option value={temperament} key={temperament}>
								{temperament}
							</option>
						))}
					</select>
				</div>
			);
		case 'source':
			return (
				<div className="filter">
					<p>Filter by source:</p>
					<select
						defaultValue="default"
						name="temperament-filter"
						onChange={onHandleSelectSource}
					>
						<option value="default" hidden>
							Choose source...
						</option>
						<option value="">Show all</option>
						<option value="API">API</option>
						<option value="DB">DB</option>
					</select>
				</div>
			);
		default:
			return null;
	}
}
