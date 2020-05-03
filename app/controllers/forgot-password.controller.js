'use strict'
const { join } = require('path')
const Controller = require(join(__dirname, './controller'))

class ForgotPasswordController extends Controller {
	#config = {}
	#string = {}
	constructor({
		ForgotPasswordRepository,
		ForgotPasswordDto,
		Config,
		StringHelper
	}) {
		super(ForgotPasswordRepository, ForgotPasswordDto, Config)
		this.#config = Config
		this.#string = StringHelper
	}

	// Vista
	async index(req, res) {
		const { token } = req.params
		const app = this.#string.capitalize(this.#config.APP_NAME)
		const recoverPassword = await super.getAttribute('token', token)

		// Existencia de token de recuperacion
		if (!recoverPassword) {
			return res.render('403', {
				title: '403',
				app: app
			})
		} else {
			return res.render('recover-password', {
				title: 'Recuperar Contraseña',
				app: app,
				base: `${this.#config.BASE_URL}:${this.#config.PORT}`,
				token: token
			})
		}
	}

	// Metodo que crea la contraseña
	async password(req, res) {
		const { password } = req.body
		// return res.redirect(301, '/ok')
		return res.redirect(301, '/error')
	}
}

module.exports = ForgotPasswordController
