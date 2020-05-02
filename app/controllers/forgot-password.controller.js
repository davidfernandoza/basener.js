'use strict'
const { join } = require('path')
const Controller = require(join(__dirname, './controller'))

class ForgotPasswordController extends Controller {
	constructor({ ForgotPasswordRepository, ForgotPasswordDto, Config }) {
		super(ForgotPasswordRepository, ForgotPasswordDto, Config)
	}

	async index(req, res) {
		res.render('forgot-password', {})
	}
}

module.exports = ForgotPasswordController
