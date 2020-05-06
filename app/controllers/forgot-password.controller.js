'use strict'
const { join } = require('path')
const Controller = require(join(__dirname, './controller'))
const moment = require('moment')

class ForgotPasswordController extends Controller {
	#usersController = {}
	#sequelize = {}
	#JWTService = {}
	#forgotPasswordRepository = {}
	#mailService = {}
	#smsString = {}
	#smsService = {}

	constructor({
		ForgotPasswordRepository,
		ForgotPasswordDto,
		UsersController,
		StringHelper,
		MailService,
		DoneString,
		SmsService,
		JWTService,
		SmsString,
		Config,
		DB
	}) {
		super(
			ForgotPasswordRepository,
			ForgotPasswordDto,
			StringHelper,
			Config,
			DoneString
		)
		this.#usersController = UsersController
		this.#JWTService = JWTService
		this.#forgotPasswordRepository = ForgotPasswordRepository
		this.#smsService = SmsService
		this.#mailService = MailService
		this.#smsString = SmsString

		// paquete para transacciones en sequelize
		this.#sequelize = DB.sequelize
	}

	// Muestra la Vista
	async index(req, res) {
		const { token } = req.params
		const recoverPassword = await super.getAttribute('token', token)

		// Existencia de token de recuperacion
		if (!recoverPassword) {
			throw new Error('403')
		} else {
			const cretedCsrfToken = await this.#JWTService.create(
				recoverPassword.id,
				null,
				this.config.CSRF_TOKEN
			)
			const objecWeb = {
				page: 'recover-password',
				title: 'Recuperar Contraseña',
				csrfToken: cretedCsrfToken.payload.token
			}
			return await super.response(res, objecWeb, 'OK')
		}
	}

	// --------------------------------------------------------------------

	// Creacion de requerimiento de cambio de contraseña
	async create(req, res) {
		const user = await this.getForType(req)
		if (!user) throw new Error('ERR404')

		const cretedToken = await this.#JWTService.create(
			user.id,
			null,
			this.config.CSRF_TOKEN
		)

		req.body = {
			users_id: user.id,
			token: cretedToken.payload.token,
			expiration: moment()
				.add(parseInt(this.config.TOKEN_TIME_MINUTES), 'minutes')
				.toISOString()
		}
		await super.deleteForAttribute('users_id', user.id)
		await super.create(req, res)
		const send = await this[user.sendType](cretedToken.payload.token, user)

		if (!send) throw new Error('ERR404')
		return await super.response(res, {}, 'DON204')
	}

	//  -------------------------------------------------------------

	// Metodo que crea la contraseña - WEB
	async recoverPassword(req, res) {
		const { token } = req.params
		const responseToken = await this.#JWTService.decode(token)

		// validacion de token
		if (responseToken.status != 200) throw new Error('403')
		if (responseToken.payload.token != this.config.CSRF_TOKEN)
			throw new Error('403')

		try {
			// Cambio de password
			req.id = responseToken.payload.id // id de usuario
			req.transaction = await this.#sequelize.transaction()
			await this.#usersController.password(req)

			// Eliminacion de token para el cambio del password
			const deleted = await this.#forgotPasswordRepository.delete(
				token,
				req.transaction
			)
			if (!deleted) throw new Error('403')
			await req.transaction.commit()

			const objecWeb = {
				page: '200',
				title: 'Contraseña Cambiada',
				message: 'Contraseña Cambiada'
			}
			return await super.response(res, objecWeb, 'OK')
		} catch (error) {
			await req.transaction.rollback()
			if (error.message == '403') {
				throw new Error('403')
			} else {
				throw new Error('500')
			}
		}
	}

	//  ------------------------------------------------------------

	async getForType(req) {
		let user = null
		req.return = true

		// tipo de envio de mensaje
		if (req.path == '/email') {
			const { email } = req.body
			user = await this.#usersController.getAttribute('email', email)
			if (user) user.sendType = 'sendEmail'
		} else {
			const { phone } = req.body
			user = await this.#usersController.getAttribute('phone', phone)
			if (user) user.sendType = 'sendSms'
		}

		return user
	}

	// ----------------------------------------------------------------

	async sendEmail(token, user) {
		const optionMail = {
			from: `${this.app} Server <${this.config.MAIL.EMAIL}>`,
			to: user.email,
			subject: `${this.app.toUpperCase()} - ¿Olvidaste tu contraseña?`,
			template: 'forgot-password-email',
			context: {
				url: `${this.config.BASE_URL}/recover-password/${token}`,
				app: this.app,
				appUp: this.app.toUpperCase()
			}
		}

		return await this.#mailService.send(optionMail)
	}

	async sendSms(token, user) {
		// await this.#smsService

		let message = this.#smsString.MSG01.message.replace(/#1/g, this.app)
		message = message.replace(
			/#2/g,
			`${this.config.DOMAIN}/recover-password/${token}`
		)
		const optionSms = {
			to: user.phone,
			body: message
		}

		return await this.#smsService.send(optionSms)
	}
}

module.exports = ForgotPasswordController
