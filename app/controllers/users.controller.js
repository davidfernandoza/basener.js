'use strict'
const { join } = require('path')
const bcrypt = require('bcrypt')
const Controller = require(join(__dirname, './controller'))

class UsersController extends Controller {
	#sequelize = {}
	#JWTService = {}
	#forgotPasswordRepository = {}

	constructor({
		UsersRepository,
		UsersDto,
		Config,
		StringHelper,
		DB,
		JWTService,
		ForgotPasswordRepository
	}) {
		super(UsersRepository, UsersDto, StringHelper, Config)
		this.#JWTService = JWTService
		this.#forgotPasswordRepository = ForgotPasswordRepository

		// paquete para transacciones
		this.#sequelize = DB.sequelize
	}

	async create(req, res) {
		const { password } = req.body
		const round = parseInt(this.config.ENCRYPTION_SALT)
		const salt = await bcrypt.genSalt(round)
		req.body.password = await bcrypt.hash(password, salt)
		return super.create(req, res)
	}

	// WEB ------------------------------------------------------------

	// Metodo que crea la contraseña
	async recoverPassword(req, res) {
		const { token } = req.params
		const responseToken = await this.#JWTService.decode(token)
		if (responseToken.status != 200) throw new Error('403')

		try {
			// Cambio de password
			req.id = responseToken.payload.id
			req.transaction = await this.#sequelize.transaction()
			await super.password(req)

			// Eliminacion de token para el cambio del password
			await this.#forgotPasswordRepository.delete(token, req.transaction)
			await req.transaction.commit()
			const objecWeb = {
				page: '200',
				title: 'Contraseña Cambiada',
				message: 'Contraseña Cambiada'
			}
			return await super.response(res, objecWeb, 'OK')
		} catch (error) {
			await req.transaction.rollback()
			throw new Error('500')
		}
	}
}

module.exports = UsersController
