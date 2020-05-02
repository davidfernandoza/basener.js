'use strict'
// const bcrypt = require('bcrypt')

module.exports = {
	up: async queryInterface => {
		return queryInterface.bulkInsert(
			'forgot_password',
			[
				{
					users_id: 1,
					token: 'Token Ipsum 1',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					users_id: 2,
					token: 'Token Ipsum 2',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					users_id: 3,
					token: 'Token Ipsum 3',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					users_id: 4,
					token: 'Token Ipsum 4',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					users_id: 5,
					token: 'Token Ipsum 5',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				}
			],
			{}
		)
	},
	down: queryInterface => {
		return queryInterface.bulkDelete('forgot_password', null, {})
	}
}
