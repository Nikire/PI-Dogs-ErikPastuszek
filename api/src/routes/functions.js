const axios = require('axios');
require('dotenv').config();

const getApiDogs = async () => {
	const apiDogs = await axios.get(
		`https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
	);
	return apiDogs.data;
};

const getApiTemperaments = async () => {
	const apiTemperaments = await axios
		.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`)
		.then((response) => response.data);
	//FILTRO TODAS LOS TEMPERAMENTOS EN UN ARRAY;
	let filteredTemperaments = [];
	apiTemperaments.forEach((dog) => {
		let temperaments = dog.temperament?.split(', ');
		temperaments?.forEach((temperament) => {
			if (!filteredTemperaments.includes(temperament))
				filteredTemperaments.push(temperament);
		});
	});
	return filteredTemperaments;
};

module.exports = {
	getApiDogs,
	getApiTemperaments,
};
