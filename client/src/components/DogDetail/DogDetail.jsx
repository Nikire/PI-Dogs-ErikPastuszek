import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchDogDetails } from '../../redux/actions';
import Spinner from '../Spinner/Spinner';
import NotFound from '../NotFound/NotFound';
import './DogDetail.css';
export default function DogDetail(props) {
	const params = useParams();
	const dispatch = useDispatch();
	const dogDetails = useSelector((state) => state.dogDetails);
	const loading = useSelector((state) => state.isLoading);
	useEffect(() => {
		props.activeNowNav();
		dispatch(searchDogDetails(params.id));
	}, [dispatch]);

	return (
		<div className="details">
			{loading ? (
				<Spinner />
			) : Object.keys(dogDetails).length !== 0 ? (
				<div className="detailsBoxBox">
					<h1>{dogDetails?.name}</h1>
					<div className="detailsBox">
						<img
							className="imgDetails detailComponent"
							src={dogDetails?.image}
							alt={dogDetails?.name}
						/>
						<ul className="detailComponent borderDescription">
							<li>
								<h3>Temperament :</h3>
								<p>{dogDetails?.temperament}</p>
							</li>
							<li>
								<h3>Height :</h3>
								<p>{dogDetails?.height} Cm</p>
							</li>
							<li>
								<h3>Weight :</h3>
								<p>{dogDetails?.weight} Kg</p>
							</li>
							<li>
								<h3>Life span:</h3>
								<p>{dogDetails?.lifespan}</p>
							</li>
						</ul>
					</div>
				</div>
			) : (
				<NotFound />
			)}
		</div>
	);
}
