import React from 'react';
import './Filter.css';

export default function Filter(props) {
	switch (props.type) {
		case 'temperaments':
			return <div className="filter">ESTO ES TEMPERAMENTS</div>;
		case 'source':
			return <div className="filter">ESTO ES SOURCE</div>;
		default:
			return null;
	}
}
