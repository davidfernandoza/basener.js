'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			// table_id: {
			// 	type: Sequelize.INTEGER,
			// 	allowNull: false,
			// 	references: { model: 'table', key: 'id' },
			// 	onUpdate: 'cascade',
			// 	onDelete: 'cascade'
			// },
			name: { type: Sequelize.STRING, allowNull: false },
			lastname: { type: Sequelize.STRING, allowNull: false },
			email: { type: Sequelize.STRING, allowNull: false, unique: true },
			password: { type: Sequelize.STRING, allowNull: false },
			rol: { type: Sequelize.ENUM('ADMIN', 'BASIC'), allowNull: false },
			birthday: { type: Sequelize.DATE, allowNull: false },
			range: { type: Sequelize.FLOAT, allowNull: false },
			phone: { type: Sequelize.STRING, allowNull: false, unique: true },
			status: { type: Sequelize.BOOLEAN, allowNull: false },
			biography: { type: Sequelize.TEXT, allowNull: false },
			created_at: { allowNull: false, type: Sequelize.DATE },
			updated_at: { allowNull: false, type: Sequelize.DATE }
		})
	},
	down: queryInterface => {
		return queryInterface.dropTable('users')
	}
}
