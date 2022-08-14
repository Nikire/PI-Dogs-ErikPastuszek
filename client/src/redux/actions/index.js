import axios from 'axios';
import {
	GET_ALL_DOGS,
	GET_API_DOGS,
	GET_DB_DOGS,
	SET_LOADING,
	SET_PAGINATION,
	NEXT_PAGE,
	PREV_PAGE,
	SEARCH_DOG_DETAILS,
} from '../actionTypes';

export const getAPIDogs = () => async (dispatch) => {
	console.log(process.env.API_KEY);
	dispatch(setLoading(true));
	try {
		const response = await axios.get(
			'https://api.thedogapi.com/v1/breeds?api_key=dd843e55-b70e-4abd-bae3-d2adf4fd8faf'
		);
		dispatch({ type: GET_API_DOGS, payload: response.data });
	} catch (err) {
		dispatch(setLoading(false));
		console.log(err);
	}
	dispatch(setLoading(false));
};

export const getDBDogs = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await axios.get('https://localhost:3001/dogs');
		dispatch({ type: GET_DB_DOGS, payload: response.data });
	} catch (err) {
		dispatch(setLoading(false));
		console.log(err);
	}
	dispatch(setLoading(false));
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

export const searchDogDetails = (id) => (dispatch) => {
	dispatch({ type: SEARCH_DOG_DETAILS, payload: id });
};
