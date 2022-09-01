import {
	GET_ALL_DOGS,
	SET_LOADING,
	SET_PAGINATION,
	NEXT_PAGE,
	PREV_PAGE,
	SEARCH_DOG_DETAILS,
	GET_ALL_TEMPERAMENTS,
	SET_SORT,
	SET_FILTERS,
	APPLY_FILTERS,
	SET_SEARCH,
	CLEAR_DETAILS,
} from '../actionTypes';

const initialState = {
	allDogs: [],
	temperaments: [],
	dogDetails: {},
	filteredDogs: [],
	filters: {
		source: '',
		temperament: '',
	},
	isLoading: false,
	pagination: {
		totalPages: 0,
		dogsPerPage: 8,
		actualDogs: [],
		actualPage: 0,
		next: [],
		prev: [],
	},
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_DOGS:
			return {
				...state,
				allDogs: action.payload,
				filteredDogs: action.payload,
				filters: { source: '', temperament: '' },
			};
		case SEARCH_DOG_DETAILS:
			return {
				...state,
				dogDetails: action.payload,
			};
		case SET_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		case SET_PAGINATION: //payload: pagination
			return {
				...state,
				pagination: {
					...state.pagination,
					...action.payload,
				},
			};
		case NEXT_PAGE: //payload: pagination
			return {
				...state,
				pagination: {
					...state.pagination,
					...action.payload,
				},
			};
		case PREV_PAGE: //payload: pagination
			return {
				...state,
				pagination: {
					...state.pagination,
					...action.payload,
				},
			};
		case GET_ALL_TEMPERAMENTS:
			return {
				...state,
				temperaments: action.payload,
			};
		case SET_SORT:
			return {
				...state,
				filteredDogs: action.payload.dogs,
				pagination: { ...state.pagination, actualPage: 0 },
			};
		case SET_FILTERS:
			return {
				...state,
				filters: action.payload,
			};
		case APPLY_FILTERS:
			return {
				...state,
				filteredDogs: action.payload,
				pagination: { ...state.pagination, actualPage: 0 },
			};
		case SET_SEARCH:
			return {
				...state,
				filteredDogs: action.payload,
				pagination: { ...state.pagination, actualPage: 0 },
			};
		case CLEAR_DETAILS:
			return {
				...state,
				dogDetails: action.payload,
			};
		default:
			return state;
	}
};

export default rootReducer;
