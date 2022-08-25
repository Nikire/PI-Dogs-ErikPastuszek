import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
export default function SoftNotFound(props) {
	const history = useHistory();
	const redirect = () => setTimeout(() => history.push('../home'), 3000);
	useEffect(() => {
		props.activeNowNav();
		redirect();
	}, []);
	return (
		<div className="soft-not-found">
			<h1>Route not found, redirecting to home in 3 seconds...</h1>
		</div>
	);
}
