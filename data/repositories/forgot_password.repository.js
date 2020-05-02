'use strict'
const { join } = require('path')
const Repository = require(join(__dirname, './repository'))

class ForgotPasswordRepository extends Repository {
	constructor({ DB, ForgotPasswordDto, Config }) {
		super(DB, ForgotPasswordDto, Config, 'forgot_password')
		this.db = DB
	}
	// Aqui van las consultas especializadas
}
module.exports = ForgotPasswordRepository
