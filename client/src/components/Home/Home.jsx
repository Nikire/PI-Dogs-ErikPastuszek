import React from 'react';
import { useEffect } from 'react';
import {
	getAllDogs,
	getAllTemperaments,
	setPagination,
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import CardsContainer from '../CardsContainer/CardsContainer';
import Filters from '../Filters/Filters';
import Spinner from '../Spinner/Spinner';
import Pagination from '../Pagination/Pagination';
import './Home.css';
export default function Home(props) {
	const allDogs = useSelector((state) => state.allDogs);
	const loading = useSelector((state) => state.isLoading);
	const pagination = useSelector((state) => state.pagination);
	const temperaments = useSelector((state) => state.temperaments);

	const dispatch = useDispatch();
	useEffect(() => {
		props.activeNowNav();
		!allDogs.length && dispatch(getAllDogs());
		allDogs.length && pagination.actualDogs && dispatch(setPagination(allDogs));
		!temperaments.length && dispatch(getAllTemperaments());
	}, [dispatch, allDogs]);

	return (
		<div>
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
