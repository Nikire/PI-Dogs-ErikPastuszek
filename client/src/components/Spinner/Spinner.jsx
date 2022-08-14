import React from 'react';
import './Spinner.css';
export default function Spinner() {
	return (
		<div className="screen">
			<div className="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
