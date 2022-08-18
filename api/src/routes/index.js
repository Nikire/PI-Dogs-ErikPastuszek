const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getApiDogs, getApiTemperaments } = require('./functions');
const router = Router();
const { Dog, Temperament } = require('../db.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//----------------DOGS-------------------
//GET CON QUERY
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
			allDogs = allDogs.filter(
				(dog) => dog.name.toLowerCase() === name.toLowerCase()
			); //USAR REGEX EN UN FUTURO PARA HACER UN "PARECIDO"
		}
		//ACA HAGO EL LLAMADO A TODOS LOS PERROS, A LOS DE LA API Y A LOS DE LA DB
		res.json(allDogs);
	} catch (err) {
		res.json(err.message);
	}
});
//GET CON PARAMS
router.get('/dogs/:id', async (req, res) => {
	const { id } = req.params;
	try {
		let findedDog = await getApiDogs();
		findedDog = findedDog.find((dog) => dog.id === Number(id));
		res.json(findedDog);
	} catch (error) {
		res.json(error.message);
	}
});
//POST PERROS
router.post('/dogs', async (req, res) => {
	const { name, height, weight, lifespan } = req.body;
	let dogPost = { name, height, weight, lifespan };
	Dog.create(dogPost);
	res.json(dogPost);
});
//<-------------- TENES QUE BUSCAR EN SEQUELIZE COMO HACER LA PETICION A LA DB ------------->
//----------------TEMPERAMENTS------------------
router.get('/temperaments', async (req, res) => {
	//const response = SENTENCIA SEQUELIZE
	//ACA FALTA LA CONDICION DE QUE SI YA ESTÁ EN LA DB NO HACE FALTA ASIGNARLE A RESPONSE LA DE LOS API
	const response = await getApiTemperaments();
	res.json(response);
});
module.exports = router;
