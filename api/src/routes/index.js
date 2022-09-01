const { Router } = require('express');
const { Op } = require('sequelize');
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
		let dbDogs = await Dog.findAll({
			include: {
				model: Temperament,
				attributes: ['name'],
				through: { attributes: [] },
			},
		});
		let response = await getApiDogs();
		response = response.map((responseDog) => ({
			id: responseDog.id,
			name: responseDog.name,
			lifespan: responseDog.life_span,
			temperament: responseDog.temperament,
			weight: responseDog.weight.metric,
			height: responseDog.height.metric,
			image: responseDog.image.url, //MODIFICAR DESPUES EN EL FRONT LOS DATOS QUE TOMA DE LA IMG
		}));
		dbDogs = dbDogs.map((dbDog) => ({
			id: dbDog.dataValues.id,
			name: dbDog.dataValues.name,
			height: dbDog.dataValues.height,
			weight: dbDog.dataValues.weight,
			lifespan: dbDog.dataValues.lifespan,
			image: dbDog.dataValues.image,
			temperament: dbDog.dataValues.temperaments
				.map((temp) => temp.name)
				.join(', '),
		}));
		let allDogs = response.concat(dbDogs);
		if (name) {
			allDogs = allDogs.filter((dog) =>
				dog.name.toLowerCase().includes(name.trim().toLowerCase())
			);
		}
		if (allDogs.length === 0)
			res.status(404).json({ msg: 'Dog breeds not found!' });
		else res.status(200).json(allDogs);
	} catch (err) {
		res.status(400).json(err.message);
	}
});
//GET PARAMS
router.get('/dogs/:id', async (req, res) => {
	const { id } = req.params;
	try {
		let findedDog = {};

		if (isNaN(Number(id))) {
			findedDog = await Dog.findAll({
				where: {
					id: { [Op.eq]: id },
				},
				include: {
					model: Temperament,
					attributes: ['name'],
					through: { attributes: [] },
				},
			});
			findedDog = findedDog[0];
			findedDog = {
				id: findedDog.dataValues.id,
				name: findedDog.dataValues.name,
				height: findedDog.dataValues.height,
				weight: findedDog.dataValues.weight,
				lifespan: findedDog.dataValues.lifespan,
				image: findedDog.dataValues.image,
				temperament: findedDog.dataValues.temperaments
					.map((temp) => temp.name)
					.join(', '),
			};
		} else {
			findedDog = await getApiDogs();
			findedDog = findedDog.find((dog) => dog.id === Number(id));
			findedDog = {
				id: findedDog.id,
				name: findedDog.name,
				height: findedDog.height.metric,
				weight: findedDog.weight.metric,
				lifespan: findedDog.life_span,
				image: findedDog.image.url,
				temperament: findedDog.temperament,
			};
		}
		res.status(200).json(findedDog);
	} catch (error) {
		console.log(error);
		res.status(404).json({ msg: 'Dog breed not found!' });
	}
});
//POST
router.post('/dogs', async (req, res) => {
	const { name, height, weight, lifespan, image, temperaments } = req.body;
	try {
		const dogPost = await Dog.create({ name, height, weight, lifespan, image }); //<-----------FALTAN LAS VALIDACIONES
		const temperament = await Temperament.findAll({
			where: { name: temperaments },
		});
		dogPost.addTemperament(temperament);
		res.status(200).json(dogPost);
	} catch (err) {
		res.status(400).json(err.message);
	}
});
//----------------TEMPERAMENTS------------------
router.get('/temperaments', async (req, res) => {
	try {
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
		res.status(200).json(temperamentsDb);
	} catch (err) {
		res.status(400).json(err.message);
	}
});
module.exports = router;
