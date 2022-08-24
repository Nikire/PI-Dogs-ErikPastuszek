import axios from 'axios';
import {
	GET_ALL_DOGS,
	SET_LOADING,
	SET_PAGINATION,
	NEXT_PAGE,
	PREV_PAGE,
	SEARCH_DOG_DETAILS,
	GET_ALL_TEMPERAMENTS,
} from '../actionTypes';

export const getAllDogs = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await axios.get('http://localhost:3001/dogs');
		dispatch({ type: GET_ALL_DOGS, payload: response.data });
	} catch (err) {
		dispatch(setLoading(false));
		console.log(err);
	}
	dispatch(setLoading(false));
};

export const getAllTemperaments = () => async (dispatch) => {
	try {
		const response = await axios.get('http://localhost:3001/temperaments');
		dispatch({ type: GET_ALL_TEMPERAMENTS, payload: response.data });
	} catch (err) {
		console.log(err);
	}
};

export const searchDogDetails = (id) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await axios.get(`http://localhost:3001/dogs/${id}`);
		console.log(response.data);
		dispatch({ type: SEARCH_DOG_DETAILS, payload: response.data });
	} catch (err) {
		dispatch(setLoading(false));
		console.log(err);
	}
	dispatch(setLoading(false));
};

export const postNewDog = (dog) => async (dispatch) => {
	if (!dog.image) {
		dog.image =
			'https://previews.123rf.com/images/danilobiancalana/danilobiancalana1303/danilobiancalana130300058/18516625-un-peque%C3%B1o-perro-confundido.jpg';
	}
	let doggie = {
		name: dog.name,
		image: dog.image,
		temperaments: dog.temperaments, //<---------- tiene que devolver una string con los nombres,no un array
		height: `${dog.height_min} - ${dog.height_max}`,
		weight: `${dog.weight_min} - ${dog.weight_max}`,
		lifespan: `${dog.lifespan_min} - ${dog.lifespan_max} years`,
	};

	await axios
		.post('http://localhost:3001/dogs', doggie)
		.then(() => {
			dispatch(getAllDogs());
			alert('Dog breed created succesfully!');
		})
		.catch((e) => {
			alert('Error trying to create dog breed:' + e.message);
		});
};

export const setLoading = (loading_status) => (dispatch) => {
	dispatch({ type: SET_LOADING, payload: loading_status });
};

export const setPagination = (dogs) => (dispatch) => {
	dispatch({ type: SET_PAGINATION, payload: dogs });
};

export const nextPage = (dogs) => (dispatch) => {
	dispatch({ type: NEXT_PAGE, payload: dogs });
};
export const prevPage = (dogs) => (dispatch) => {
	dispatch({ type: PREV_PAGE, payload: dogs });
};
