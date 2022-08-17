const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//----------------DOGS-------------------
//GET CON QUERY
router.get('/dogs', async (req, res) => {
	let resultado = 'peticion a la api y a la db';
	const { query } = req.query;
	if (query)
		if (Object.keys(query).length > 0)
			resultado = 'peticion a la api y a la db con query';
	//ACA HAGO EL LLAMADO A TODOS LOS PERROS, A LOS DE LA API Y A LOS DE LA DB

	res.json(resultado.data);
});
//GET CON PARAMS
router.get('/dogs/:id', (req, res) => {
	let resultado = 'peticion a la api y a la db con ID particular';
	const { params } = req.params;
	//ACA HAGO EL LLAMADO A TODOS LOS PERROS, A LOS DE LA API Y A LOS DE LA DB
	res.json(resultado);
});
//POST PERROS
router.post('/dogs', (req, res) => {
	const { name, height, weight, lifespan } = req.body;
	//ACA HAGO EL LLAMADO A TODOS LOS PERROS, A LOS DE LA API Y A LOS DE LA DB
	let resultado = 'post a la DB de un perro';
	res.json(resultado);
});
//<-------------- TENES QUE BUSCAR EN SEQUELIZE COMO HACER LA PETICION A LA DB ------------->
//----------------TEMPERAMENTS------------------

module.exports = router;
