'use strict'
const { join } = require('path')
const Request = require(join(__dirname, './request'))
const { ErrorString } = require(join(__dirname, '../../strings'))
let passwordRule = {}
let body = {}
class ForgotPasswordRequest extends Request {
	#config = {}
	#errorString = {}

	constructor({ JoiValidator, Config }) {
		body = {
			email: JoiValidator.string()
				.email({ ignoreLength: true })
				.min(8)
				.max(100)
				.required()
		}

		passwordRule = {
			password: JoiValidator.string().min(8).max(60).required(),
			confirmPassword: JoiValidator.any()
				.valid(JoiValidator.ref('password'))
				.required(),
			csrfToken: JoiValidator.string().min(40).max(255).required()
		}
		super(body, JoiValidator, Config.CSRF_TOKEN)
		this.#config = Config
		this.#errorString = new ErrorString()
	}

	// -------------------------------------------------------------------------

	async password(req, res, next) {
		if (req.method == 'POST') {
			const bodyRes = await super.body(req, passwordRule) // validacion de cuerpo
			if (bodyRes != true)
				return res.render('recover-password', {
					page: 'recover-password',
					title: 'Recuperar Contraseña',
					token: req.body.csrfToken,
					messageError: this.#errorString.ERR400.message
				})

			// Validacion CSRF WEB
			req.csrfToken = req.body.csrfToken
			const validate = await super.header(req, 'web')
			if (!validate) throw new Error('403')
		}
		next()
	}
}
module.exports = ForgotPasswordRequest
