const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('dog', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		height: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		weight: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lifespan: {
			type: DataTypes.STRING,
		},
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});
};
