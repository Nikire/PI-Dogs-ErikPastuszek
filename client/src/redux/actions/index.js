import axios from 'axios';
import {
	GET_ALL_DOGS,
	SET_LOADING,
	SET_PAGINATION,
	NEXT_PAGE,
	PREV_PAGE,
	SEARCH_DOG_DETAILS,
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
