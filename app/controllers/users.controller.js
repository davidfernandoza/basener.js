'use strict'
const { join } = require('path')
const bcrypt = require('bcrypt')
const Controller = require(join(__dirname, './controller'))

class UsersController extends Controller {
	constructor({ UsersRepository, UsersDto, Config, StringHelper, DoneString }) {
		super(UsersRepository, UsersDto, StringHelper, Config, DoneString)
	}

	async create(req, res) {
		const { password } = req.body
		const round = parseInt(this.config.ENCRYPTION_SALT)
		const salt = await bcrypt.genSalt(round)
		req.body.password = await bcrypt.hash(password, salt)
		return super.create(req, res)
	}
}

module.exports = UsersController
