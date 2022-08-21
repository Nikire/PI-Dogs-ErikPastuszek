import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './CreateDog.css';
import PatitaSVG from './PatitaSVG/PatitaSVG';
export default function CreateDog(props) {
	const dispatch = useDispatch();
	useEffect(() => {
		props.activeNowNav();
	}, [dispatch]);
	return (
		<div className="outerBox">
			<div className="bigBox">
				<PatitaSVG />
				<form className="formBox">
					<h1>Create Dog Breed</h1>
					<div className="form-section">
						<h4>Name:</h4>
						<label for="name">NAME</label>
						<input
							name="name"
							className="form-input-text"
							type="text"
							placeholder="Insert name..."
						/>
					</div>
					<div className="form-section">
						<h4>Height:</h4>
						<label htmlFor="height-min">MIN </label>
						<input
							name="height-min"
							className="form-input-text small"
							type="text"
							placeholder="height..."
						/>
						<label for="height-max">MAX </label>
						<input
							name="height-max"
							className="form-input-text small"
							type="text"
							placeholder="height..."
						/>
					</div>
					<div className="form-section">
						<h4>Weight:</h4>
						<label for="weight-min">MIN </label>
						<input
							name="weight-min"
							className="form-input-text small"
							type="text"
							placeholder="weight..."
						/>
						<label for="weight-max">MAX </label>
						<input
							name="weight-max"
							className="form-input-text small"
							type="text"
							placeholder="weight..."
						/>
					</div>
					<div className="form-section">
						<h4>Life-span:</h4>
						<label for="lifespan-min">MIN </label>
						<input
							name="lifespan-min"
							className="form-input-text small"
							type="text"
							placeholder="lifespan..."
						/>
						<label for="lifespan-max">MAX </label>
						<input
							name="lifespan-max"
							className="form-input-text small"
							type="text"
							placeholder="lifespan..."
						/>
					</div>
					<div className="form-section">
						<h4>Image:</h4>
						<input
							name="image"
							className="form-input-text large"
							type="text"
							placeholder="image..."
						/>
					</div>
					<button
						className="mainBtn"
						style={{ fontFamily: 'DynaPuff, cursive' }}
					>
						Create new dog breed
					</button>
				</form>
			</div>
		</div>
	);
}
