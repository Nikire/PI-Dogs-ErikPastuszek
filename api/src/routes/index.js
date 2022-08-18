const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getApiDogs, getApiTemperaments } = require('./functions');
const router = Router();
const { Dog, Temperament } = require('../db.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//----------------DOGS-------------------
//GET QUERY
router.get('/dogs', async (req, res) => {
	const { name } = req.query;
	try {
		let dbDogs = await Dog.findAll();
		let response = await getApiDogs();
		response = response.map((responseDog) => ({
			id: responseDog.id,
			name: responseDog.name,
			lifespan: responseDog.life_span,
			temperament: responseDog.temperament,
			image: responseDog.image.url, //MODIFICAR DESPUES EN EL FRONT LOS DATOS QUE TOMA DE LA IMG
		}));
		dbDogs = dbDogs.map((dbDog) => ({
			id: dbDog.dataValues.id,
			name: dbDog.dataValues.name,
			height: dbDog.dataValues.height,
			weight: dbDog.dataValues.weight,
			lifespan: dbDog.dataValues.lifespan,
			image: dbDog.dataValues.image,
		}));
		let allDogs = response.concat(dbDogs);
		if (name) {
			allDogs = allDogs.filter((dog) =>
				dog.name.toLowerCase().includes(name.toLowerCase())
			);
		}
		if (allDogs.length === 0)
			res.status(404).json({ msg: 'Dog breeds not found!' });
		else res.status(200).json(allDogs);
	} catch (err) {
		res.json(err.message);
	}
});
//GET PARAMS
router.get('/dogs/:id', async (req, res) => {
	const { id } = req.params;
	try {
		let findedDog = {};

		if (typeof id === 'string') {
			findedDog = await Dog.findAll();
			findedDog = findedDog.map((dog) => ({
				id: dog.dataValues.id,
				name: dog.dataValues.name,
				height: dog.dataValues.height,
				weight: dog.dataValues.weight,
				lifespan: dog.dataValues.lifespan,
				image: dog.dataValues.image,
			}));
		} else {
			findedDog = await getApiDogs();
			findedDog = findedDog.find((dog) => dog.id === Number(id));
			findedDog = findedDog.map((dog) => ({
				id: dog.dataValues.id,
				name: dog.dataValues.name,
				height: dog.dataValues.height,
				weight: dog.dataValues.weight,
				lifespan: dog.dataValues.lifespan,
				image: dog.dataValues.image,
			}));
		}
		if (Object.keys(findedDog).length === 0)
			res.status(404).json({ msg: 'Dog breed not found!' });
		else res.status(200).json(findedDog);
	} catch (error) {
		res.json(error.message);
	}
});
//POST
router.post('/dogs', async (req, res) => {
	const { name, height, weight, lifespan } = req.body;
	let dogPost = { name, height, weight, lifespan }; //<-----------FALTAN LAS VALIDACIONES
	Dog.create(dogPost);
	res.json(dogPost);
});
//----------------TEMPERAMENTS------------------
router.get('/temperaments', async (req, res) => {
	let temperamentsDb = await Temperament.findAll({
		attributes: ['name'],
	});
	if (temperamentsDb.length === 0) {
		temperamentsDb = await getApiTemperaments();
		temperamentsDb.forEach((temp) => {
			Temperament.create({ name: temp });
		});
	} else {
		temperamentsDb = temperamentsDb.map((temp) => temp.name);
	}

	res.json(temperamentsDb);
});
module.exports = router;
