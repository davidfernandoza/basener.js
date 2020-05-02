'use strict'
module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define(
		'users',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				isNumeric: true
			},
			// table_id: {
			// 	type: DataTypes.INTEGER,
			// 	allowNull: false,
			// 	unique: true,
			// 	isNumeric: true
			// },
			name: { type: DataTypes.STRING, allowNull: false },
			lastname: { type: DataTypes.STRING, allowNull: false },
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: { isEmail: true }
			},
			password: { type: DataTypes.STRING, allowNull: false },
			rol: { type: DataTypes.ENUM('ADMIN', 'BASIC'), allowNull: false },
			birthday: { type: DataTypes.DATE, allowNull: false },
			range: { type: DataTypes.DOUBLE, allowNull: false, isNumeric: true },
			status: { type: DataTypes.BOOLEAN, allowNull: false },
			biography: { type: DataTypes.TEXT, allowNull: false }
		},
		{
			timestamps: true,
			tableName: 'users',
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	)

	// users.associate = function (models) {
	// 	/*
	// 	 * Un users se registra en muchos table (1:M)
	// 	 */
	// 	models.users.hasMany(models.table, {
	// 		foreignKey: 'users_id', // a donde va
	// 		sourceKey: 'id', // de donde se obtiene
	// 		as: 'table'
	// 	})

	// 	// Un users tiene un table (1:1)
	// 	models.users.belongsTo(models.table, {
	// 		foreignKey: 'table_id', // a donde llega
	// 		targetKey: 'id', // de donde viene
	// 		as: 'table'
	// 	})

	// 	// Un users tiene muchas table (1:M)
	// 	models.users.belongsToMany(models.table, {
	// 		through: models.users_table, // Tabla pivote
	// 		foreignKey: 'users_id', // a donde va
	// 		sourceKey: 'id', // de donde se obtiene
	// 		as: 'table'
	// 	})

	// 	// Un users tiene un table (1:1)
	// 	models.users.hasOne(models.table, {
	// 		foreignKey: 'users_id', // a donde va
	// 		sourceKey: 'id', // de donde se obtiene
	// 		as: 'table'
	// 	})
	// }

	return users
}
