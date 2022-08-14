import React from 'react';
import { useEffect } from 'react';
import { getAPIDogs, setPagination } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import CardsContainer from '../CardsContainer/CardsContainer';
import Filters from '../Filters/Filters';
import Nav from '../Nav/Nav';
import Spinner from '../Spinner/Spinner';
import Pagination from '../Pagination/Pagination';
import './Home.css';
export default function Home() {
	const apiDogs = useSelector((state) => state.API_Dogs);
	const loading = useSelector((state) => state.isLoading);
	const pagination = useSelector((state) => state.pagination);
	const dispatch = useDispatch();
	useEffect(() => {
		!apiDogs.length && dispatch(getAPIDogs());
		apiDogs.length && pagination.actualDogs && dispatch(setPagination(apiDogs)); // <- aca debería usarse all dogs
	}, [dispatch, apiDogs]);

	return (
		<div>
			<Nav />
			{loading ? (
				<Spinner />
			) : (
				<div className="container">
					<Filters />
					<Pagination />
					<CardsContainer />
				</div>
			)}
		</div>
	);
}
