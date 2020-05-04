'use strict'
const { join } = require('path')
const Controller = require(join(__dirname, './controller'))

class ForgotPasswordController extends Controller {
	#config = {}
	#string = {}
	#app = ''

	constructor({
		ForgotPasswordRepository,
		ForgotPasswordDto,
		Config,
		StringHelper
	}) {
		super(ForgotPasswordRepository, ForgotPasswordDto, StringHelper, Config)
		this.#config = Config
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
				base: `${this.#config.BASE_URL}:${this.#config.PORT}`,
				token: token
			}
			return await super.response(res, objecWeb, 'OK')
		}
	}

	// Metodo que crea la contraseña
	async password(req, res) {
		const { password } = req.body
		const objecWeb = {
			page: '200',
			title: 'Contraseña Cambiada',
			message: 'Contraseña Cambiada'
		}
		return await super.response(res, objecWeb, 'OK')

		// return
		// res.redirect('back')
	}
}

module.exports = ForgotPasswordController
