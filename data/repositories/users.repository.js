'use strict'
const { join } = require('path')
const Repository = require(join(__dirname, './repository'))

class UsersRepository extends Repository {
	constructor({ DB, UsersDto, Config }) {
		super(DB, UsersDto, Config, 'users')
		this.db = DB
	}

	async password(id, password) {
		return await super.update(id, password, { password: 'password' })
	}
}
module.exports = UsersRepository
