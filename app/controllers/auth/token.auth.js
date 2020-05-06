'use strict'
const { join } = require('path')
const moment = require('moment')
const Controller = require(join(__dirname, '../controller'))

/*
 * Cotrolador que genera un token de autentificación nuevo.
 * Crea un token en la lista negra con el antiguo token
 */
class TokenAuth extends Controller {
	constructor({
		TokenBlackListRepository,
		TokenBlackListDto,
		StringHelper,
		DoneString,
		JWTService
	}) {
		super(TokenBlackListRepository, TokenBlackListDto, StringHelper, DoneString)
		this.JWTServices = JWTService
		this.tokenBlackListRepository = TokenBlackListRepository
	}

	// Nuevo token
	async create(req, res) {
		const { id, rol } = req
		const { http_auth_token } = req.headers
		const newToken = await this.JWTServices.create(id, rol)
		if (newToken.status === 200) {
			const oldToken = {
				token: http_auth_token
			}
			const created = await this.tokenBlackListRepository.create(oldToken)
			await this.tokenBlackListRepository.delete(
				moment().subtract(7, 'days').toISOString()
			)
			if (created) {
				return await super.response(res, newToken.payload, 'DON200')
			}
		}
		await super.response(res, null, 'DON404')
	}

	// Eliminar token (logout)
	async delete(req, res) {
		const { http_auth_token } = req.headers
		const token = await this.JWTServices.decode(http_auth_token)
		if (token.status === 200) {
			const oldToken = {
				token: http_auth_token
			}
			const created = await this.tokenBlackListRepository.create(oldToken)
			this.tokenBlackListRepository.delete(
				moment().subtract(7, 'days').toISOString()
			)
			if (created) {
				await super.response(res, null, 'DON204')
				return true
			}
		}
		await super.response(res, null, 'DON404')
	}
}

module.exports = TokenAuth
