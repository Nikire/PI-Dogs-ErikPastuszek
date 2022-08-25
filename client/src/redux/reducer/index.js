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
		case SET_PAGINATION: // PAYLOAD -> ALLDOGS //cambiar a filteredDogs
			let paginationConfig = {
				actualDogs: action.payload.slice(
					state.pagination.actualPage * state.pagination.dogsPerPage,
					state.pagination.actualPage * state.pagination.dogsPerPage +
						state.pagination.dogsPerPage
				),
				next: action.payload.slice(
					(state.pagination.actualPage + 1) * state.pagination.dogsPerPage,
					(state.pagination.actualPage + 2) * state.pagination.dogsPerPage
				),
				prev: action.payload.slice(
					(state.pagination.actualPage - 1) * state.pagination.dogsPerPage,
					state.pagination.actualPage * state.pagination.dogsPerPage
				),
			};

			if (action.payload.length > 1) {
				paginationConfig.totalPages = Math.floor(
					(action.payload.length - 1) / state.pagination.dogsPerPage
				);
			} else {
				paginationConfig.totalPages = Math.floor(
					action.payload.length / state.pagination.dogsPerPage
				);
			}
			return {
				...state,
				pagination: {
					...state.pagination,
					...paginationConfig,
				},
			};
		case NEXT_PAGE:
			let nextConfig = {
				actualDogs: state.pagination.next,
				actualPage: state.pagination.actualPage + 1,
				next: action.payload.slice(
					(state.pagination.actualPage + 2) * state.pagination.dogsPerPage,
					(state.pagination.actualPage + 3) * state.pagination.dogsPerPage
				),
				prev: state.pagination.actualDogs,
			};
			return {
				...state,
				pagination: {
					...state.pagination,
					...nextConfig,
				},
			};
		case PREV_PAGE:
			let prevConfig = {
				actualDogs: state.pagination.prev,
				actualPage: state.pagination.actualPage - 1,
				next: state.pagination.actualDogs,
				prev: action.payload.slice(
					(state.pagination.actualPage - 2) * state.pagination.dogsPerPage,
					(state.pagination.actualPage - 1) * state.pagination.dogsPerPage
				),
			};
			return {
				...state,
				pagination: {
					...state.pagination,
					...prevConfig,
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
		default:
			return state;
	}
};

export default rootReducer;
