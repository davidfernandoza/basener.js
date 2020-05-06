'use strict'
const { join } = require('path')
const Auth = require(join(__dirname, './auth'))

class UsersAuth extends Auth {
	constructor({ UsersController, UsersDto, JWTService, DoneString }) {
		const dataUser = {
			attribute: 'email', //username
			rol: 'user'
		}
		super(UsersController, UsersDto, JWTService, dataUser, DoneString)
	}
}

module.exports = UsersAuth
