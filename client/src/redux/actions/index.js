import axios from 'axios';
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

export const setPagination = (dogs, pagination) => (dispatch) => {
	let paginationConfig = {
		actualDogs: dogs.slice(
			pagination.actualPage * pagination.dogsPerPage,
			pagination.actualPage * pagination.dogsPerPage + pagination.dogsPerPage
		),
		next: dogs.slice(
			(pagination.actualPage + 1) * pagination.dogsPerPage,
			(pagination.actualPage + 2) * pagination.dogsPerPage
		),
		prev: dogs.slice(
			(pagination.actualPage - 1) * pagination.dogsPerPage,
			pagination.actualPage * pagination.dogsPerPage
		),
	};

	if (dogs.length > 1) {
		paginationConfig.totalPages = Math.floor(
			(dogs.length - 1) / pagination.dogsPerPage
		);
	} else {
		paginationConfig.totalPages = Math.floor(
			dogs.length / pagination.dogsPerPage
		);
	}

	dispatch({ type: SET_PAGINATION, payload: paginationConfig });
};

export const nextPage = (dogs, pagination) => (dispatch) => {
	let nextConfig = {
		actualDogs: pagination.next,
		actualPage: pagination.actualPage + 1,
		next: dogs.slice(
			(pagination.actualPage + 2) * pagination.dogsPerPage,
			(pagination.actualPage + 3) * pagination.dogsPerPage
		),
		prev: pagination.actualDogs,
	};
	dispatch({ type: NEXT_PAGE, payload: nextConfig });
};
export const prevPage = (dogs, pagination) => (dispatch) => {
	let prevConfig = {
		actualDogs: pagination.prev,
		actualPage: pagination.actualPage - 1,
		next: pagination.actualDogs,
		prev: dogs.slice(
			(pagination.actualPage - 2) * pagination.dogsPerPage,
			(pagination.actualPage - 1) * pagination.dogsPerPage
		),
	};
	dispatch({ type: PREV_PAGE, payload: prevConfig });
};

export const setSort = (sortType, dogs) => (dispatch) => {
	if (dogs.length)
		dogs = dogs?.map((dog) => {
			let max_weight = Number(dog.weight?.split(' - ')[1]);
			if (isNaN(max_weight)) max_weight = Number(dog.weight?.split(' - ')[0]);
			if (isNaN(max_weight)) max_weight = 0;
			return {
				...dog,
				max_weight: max_weight,
			};
		});
	switch (sortType) {
		case 'ASC':
			dispatch({
				type: SET_SORT,
				payload: {
					dogs: dogs.sort((a, b) => {
						if (a.max_weight > b.max_weight) return 1;
						else return -1;
					}),
				},
			});
			break;
		case 'DES':
			dispatch({
				type: SET_SORT,
				payload: {
					dogs: dogs.sort((a, b) => {
						if (a.max_weight < b.max_weight) return 1;
						else return -1;
					}),
				},
			});
			break;
		case 'AZ':
			dispatch({
				type: SET_SORT,
				payload: {
					dogs: dogs.sort((a, b) => {
						if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
						else return -1;
					}),
				},
			});
			break;
		case 'ZA':
			dispatch({
				type: SET_SORT,
				payload: {
					dogs: dogs.sort((a, b) => {
						if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
						else return -1;
					}),
				},
			});
			break;
		default:
			break;
		//no ordenar
	}
	//aca antes iba dispatch?
};

export const setFilters = (filters, filter, filtertype) => (dispatch) => {
	filters = { ...filters, [filtertype]: filter };
	dispatch({
		type: SET_FILTERS,
		payload: filters,
	});
};

export const applyFilters =
	(filters, dogs, filteredDogs, pagination) => (dispatch) => {
		filteredDogs = filteredDogs.map((dog) => {
			if (dog.temperament === undefined) dog.temperament = '';
			return dog;
		});
		if (filters.source === '' || filters.temperament === '') {
			filteredDogs = dogs;
		}
		if (filters.source !== '') {
			if (filters.source === 'API') {
				filteredDogs = dogs.filter((dog) => typeof dog.id === 'number');
			}
			if (filters.source === 'DB') {
				filteredDogs = dogs.filter((dog) => typeof dog.id === 'string');
			}
		}

		if (filters.temperament !== '') {
			filteredDogs = filteredDogs.filter((dog) =>
				dog.temperament.includes(filters.temperament)
			);
		}
		dispatch({
			type: APPLY_FILTERS,
			payload: filteredDogs,
		});
		dispatch(setPagination(filteredDogs, pagination));
	};

/* export const setSearch = (search, dogs, filteredDogs) => (dispatch) => {
	console.log(search, dogs, filteredDogs);
	filteredDogs = dogs.filter((dog) =>
		dog.name.toLowerCase().includes(search.trim().toLowerCase())
	);
	dispatch({
		type: SET_SEARCH,
		payload: filteredDogs,
	});
}; */

export const setSearch = (search) => async (dispatch) => {
	const response = await axios.get(`http://localhost:3001/dogs?name=${search}`);
	dispatch({
		type: SET_SEARCH,
		payload: response.data,
	});
};

export const clearDetails = () => (dispatch) => {
	dispatch({
		type: CLEAR_DETAILS,
		payload: {},
	});
};
