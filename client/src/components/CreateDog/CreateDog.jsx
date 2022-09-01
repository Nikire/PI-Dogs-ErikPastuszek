import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	getAllTemperaments,
	postNewDog,
	setLoading,
} from '../../redux/actions';
import Spinner from '../Spinner/Spinner';
import './CreateDog.css';
import PatitaSVG from './PatitaSVG/PatitaSVG';
export default function CreateDog(props) {
	let history = useHistory();
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.loading);
	const temperaments = useSelector((state) => state.temperaments);
	const checkValidate = () => {
		let errors = {
			name: false,
			height_min: false,
			height_max: false,
			weight_min: false,
			weight_max: false,
			lifespan_min: false,
			lifespan_max: false,
			image: false,
		};
		let isValidated = true;
		if (
			!info.name.match('.*\\d+.*') &&
			info.name.length > 0 &&
			info.name.length <= 30
		) {
			errors = { ...errors, name: false };
		} else {
			errors = { ...errors, name: true };
			isValidated = false;
		}
		if (
			info.height_min >= 15 &&
			info.height_min <= 89 &&
			info.height_min < info.height_max
		) {
			errors = { ...errors, height_min: false };
		} else {
			errors = { ...errors, height_min: true };
			isValidated = false;
		}
		if (info.height_max <= 90 && info.height_min < info.height_max) {
			errors = { ...errors, height_max: false };
		} else {
			errors = { ...errors, height_max: true };
			isValidated = false;
		}
		if (
			info.weight_min >= 2 &&
			info.weight_min <= 89 &&
			info.weight_min < info.weight_max
		) {
			errors = { ...errors, weight_min: false };
		} else {
			errors = { ...errors, weight_min: true };
			isValidated = false;
		}
		if (info.weight_max < 90 && info.weight_min < info.weight_max) {
			errors = { ...errors, weight_max: false };
		} else {
			errors = { ...errors, weight_max: true };
			isValidated = false;
		}
		if (info.lifespan_min || info.lifespan_max) {
			if (
				info.lifespan_min >= 5 &&
				info.lifespan_min <= 19 &&
				Number(info.lifespan_min) < Number(info.lifespan_max)
			) {
				errors = { ...errors, lifespan_min: false };
			} else {
				errors = { ...errors, lifespan_min: true };
				isValidated = false;
			}
			if (
				info.lifespan_max <= 20 &&
				Number(info.lifespan_min) < Number(info.lifespan_max)
			) {
				errors = { ...errors, lifespan_max: false };
			} else {
				errors = { ...errors, lifespan_max: true };
				isValidated = false;
			}
		}

		if (
			(typeof info.image === 'string' &&
				info.image.match(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i)) ||
			info.image.length === 0
		) {
			errors = { ...errors, image: false };
		} else {
			errors = { ...errors, image: true };
			isValidated = false;
		}
		setError(errors);
		return isValidated;
	};

	const onHandleDelete = (e) => {
		setSelectedTemperaments(
			selectedTemperaments.filter(
				(temp) => temp !== e.target.innerHTML.split(' <b>✖</b>').join('')
			)
		);
	};

	const onHandleSelect = (e) => {
		if (
			selectedTemperaments.length <= 6 &&
			!selectedTemperaments.includes(e.target.value)
		) {
			//si es menor a 7 incluido,y si no incluye a el temperamento en el array agrega al array
			setError({ ...error, temperaments: false });
			setSelectedTemperaments([...selectedTemperaments, e.target.value]);
		} else {
			setError({ ...error, temperaments: true }); //si no se cumplen las condiciones de verificación, tira error
		}
	};
	const onHandleChange = (e) => {
		setInfo({ ...info, [e.target.name]: e.target.value });
	};
	const onHandleSubmit = (e) => {
		e.preventDefault();
		if (checkValidate()) {
			dispatch(postNewDog({ ...info, temperaments: selectedTemperaments })); //si está validado dispachar el form
			history.push('../Home');
		}
	};
	const [selectedTemperaments, setSelectedTemperaments] = useState([]);
	const [error, setError] = useState({
		name: false,
		height_min: false,
		height_max: false,
		weight_min: false,
		weight_max: false,
		lifespan_min: false,
		lifespan_max: false,
		image: false,
	});
	const [info, setInfo] = useState({
		name: '',
		height_min: 0,
		height_max: 0,
		weight_min: 0,
		weight_max: 0,
		/*  lifespan_min: 0,
		lifespan_max: 0, */
		image: '',
	});

	useEffect(() => {
		props.activeNowNav();
		dispatch(setLoading(true));
		!temperaments.length
			? dispatch(getAllTemperaments())
			: dispatch(setLoading(false));
	}, [dispatch, temperaments]);

	return loading ? (
		<Spinner />
	) : (
		<div className="outerBox">
			<div className="bigBox">
				<PatitaSVG />
				<form className="formBox" onSubmit={onHandleSubmit}>
					<h1>Create Dog Breed</h1>
					<div className="form-section">
						<h4>*Name:</h4>
						<input
							name="name"
							className="form-input-text"
							type="text"
							placeholder="Insert name..."
							value={info.name}
							onChange={onHandleChange}
						/>
					</div>
					<div className="form-section">
						<h4>*Height (Cm):</h4>
						<label htmlFor="height-min">Min </label>
						<input
							name="height_min"
							className="form-input-number small"
							type="number"
							placeholder="height..."
							value={info.height_min}
							onChange={onHandleChange}
						/>
						<label htmlFor="height_max">MAX </label>
						<input
							name="height_max"
							className="form-input-number small"
							type="number"
							placeholder="height..."
							value={info.height_max}
							onChange={onHandleChange}
						/>
					</div>
					<div className="form-section">
						<h4>*Weight (Kg):</h4>
						<label htmlFor="weight_min">MIN </label>
						<input
							name="weight_min"
							className="form-input-number small"
							type="number"
							placeholder="weight..."
							value={info.weight_min}
							onChange={onHandleChange}
						/>
						<label htmlFor="weight_max">MAX </label>
						<input
							name="weight_max"
							className="form-input-number small"
							type="number"
							placeholder="weight..."
							value={info.weight_max}
							onChange={onHandleChange}
						/>
					</div>
					<div className="form-section">
						<h4>*Life-span (years):</h4>
						<label htmlFor="lifespan_min">MIN </label>
						<input
							name="lifespan_min"
							className="form-input-number small"
							type="number"
							placeholder="lifespan..."
							value={info.lifespan_min}
							onChange={onHandleChange}
						/>
						<label htmlFor="lifespan_max">MAX </label>
						<input
							name="lifespan_max"
							className="form-input-number small"
							type="number"
							placeholder="lifespan..."
							value={info.lifespan_max}
							onChange={onHandleChange}
						/>
					</div>
					<div className="form-section">
						<h4>Image:</h4>
						<input
							name="image"
							className="form-input-text large"
							type="text"
							placeholder="image..."
							value={info.image}
							onChange={onHandleChange}
						/>
					</div>
					<div className="form-section">
						<h4>Temperaments:</h4>
						<select
							defaultValue="default"
							name="temperaments"
							onChange={onHandleSelect}
						>
							<option value="default" hidden>
								Choose temperaments...
							</option>
							{temperaments?.map((temperament) => (
								<option value={temperament} key={temperament}>
									{temperament}
								</option>
							))}
						</select>
					</div>

					<div className="form-section">
						{selectedTemperaments?.map((temp) => (
							<p
								value={temp}
								key={temp}
								onClick={onHandleDelete}
								className="temperament-div"
							>
								{temp} <b>✖</b>
							</p>
						))}
					</div>

					<button
						className="mainBtn"
						style={{ fontFamily: 'DynaPuff, cursive' }}
					>
						Create new dog breed
					</button>
					<p className="error" hidden={error.name ? false : true}>
						*The name must have a maximum of 30 characters and must not contain
						numbers
					</p>
					<p className="error" hidden={error.height_min ? false : true}>
						*The minimum height must be greater than 15cm and not greater than
						the maximum height
					</p>
					<p className="error" hidden={error.height_max ? false : true}>
						*The maximum height must not be greater than 90cm and greater than
						the minimum height
					</p>
					<p className="error" hidden={error.weight_min ? false : true}>
						*The minimum weight must be between 2 and 89 kg and not exceed the
						maximum weight
					</p>
					<p className="error" hidden={error.weight_max ? false : true}>
						*The maximum weight allowed is 90kg and must not be less than the
						minimum weight
					</p>
					<p className="error" hidden={error.lifespan_min ? false : true}>
						*The minimum life expectancy is 6 years and should not be greater
						than the maximum
					</p>
					<p className="error" hidden={error.lifespan_max ? false : true}>
						*The maximum life expectancy is 20 years and must not be less than
						the minimum
					</p>
					<p className="error" hidden={error.image ? false : true}>
						*The image is expected to be either empty or to be a valid link
					</p>
					<p className="error" hidden={error.temperaments ? false : true}>
						*It can have a maximum of 7 temperaments and must also not be
						repeated
					</p>
				</form>
			</div>
		</div>
	);
}
