'use strict'
// const bcrypt = require('bcrypt')

module.exports = {
	up: async queryInterface => {
		return queryInterface.bulkInsert(
			'forgot_password',
			[
				{
					users_id: 1,
					token: 'sihjd9fihsdsihjd9fihsd89azd',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					users_id: 2,
					token: 'sihjd9fihsd89azsdf0988sd2',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					users_id: 3,
					token: 'sihjd9fihsd89azsdf0988sd1',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					users_id: 4,
					token: 'sihjd9fihsd89azsdf0988sd4',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					users_id: 5,
					token: 'sihjd9fihsd89azsdf0988sd5',
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
