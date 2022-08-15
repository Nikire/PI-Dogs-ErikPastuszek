import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchDogDetails, getAPIDogs } from '../../redux/actions';
import Spinner from '../Spinner/Spinner';
import './DogDetail.css';
export default function DogDetail(props) {
	const params = useParams();
	const dispatch = useDispatch();
	const apiDogs = useSelector((state) => state.API_Dogs);
	const dogDetails = useSelector((state) => state.dogDetails);
	const loading = useSelector((state) => state.isLoading);
	useEffect(() => {
		props.activeNowNav();
		!apiDogs.length && dispatch(getAPIDogs());
		dispatch(searchDogDetails(params.id));
	}, [dispatch, apiDogs]);

	return (
		<div className="details">
			{loading ? (
				<Spinner />
			) : (
				<div className="detailsBoxBox">
					<h1>{dogDetails?.name}</h1>
					<div className="detailsBox">
						<img
							className="imgDetails detailComponent"
							src={dogDetails?.image?.url}
							alt={dogDetails?.name}
						/>
						<ul className="detailComponent borderDescription">
							<li>
								<h3>Temperament :</h3>
								<p>{dogDetails?.temperament}</p>
							</li>
							<li>
								<h3>Height :</h3>
								<p>{dogDetails?.height?.metric} Cm</p>
							</li>
							<li>
								<h3>Weight :</h3>
								<p>{dogDetails?.weight?.metric} Kg</p>
							</li>
							<li>
								<h3>Life span:</h3>
								<p>{dogDetails?.life_span}</p>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}
