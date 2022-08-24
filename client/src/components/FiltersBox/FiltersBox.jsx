import React from 'react';
import './FiltersBox.css';
import Filter from './Filter/Filter';
import SortFilter from './SortFilter/SortFilter';
export default function Filters() {
	return (
		<div className="filtersContainer">
			<Filter type="temperaments" />
			<Filter type="source" />
			<SortFilter type="name" />
			<SortFilter type="weight" />
		</div>
	);
}
