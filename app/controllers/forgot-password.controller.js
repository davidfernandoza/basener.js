'use strict'
const { join } = require('path')
const Controller = require(join(__dirname, './controller'))

class ForgotPasswordController extends Controller {
	constructor({
		ForgotPasswordRepository,
		ForgotPasswordDto,
		Config,
		StringHelper
	}) {
		super(ForgotPasswordRepository, ForgotPasswordDto, StringHelper, Config)
	}

	// Vista
	async index(req, res) {
		const { token } = req.params
		const recoverPassword = await super.getAttribute('token', token)

		// Existencia de token de recuperacion
		if (!recoverPassword) {
			throw new Error('403')
		} else {
			const objecWeb = {
				page: 'recover-password',
				title: 'Recuperar Contraseña',
				token: token
			}
			return await super.response(res, objecWeb, 'OK')
		}
	}
}

module.exports = ForgotPasswordController
