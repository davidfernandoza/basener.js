'use strict'

class AuthMiddleware {
	constructor({ JWTService, TokenBlackListRepository, UsersRepository }) {
		this.JWTServices = JWTService
		this.tokenBlackListRepository = TokenBlackListRepository
		this.usersRepository = UsersRepository
	}

	async compare(req, res, next) {
		if (!req.headers.http_auth_token) throw new Error('ERR401')

		const authToken = req.headers.http_auth_token

		// Consultar lista negra de tokens
		const invalid_token = await this.tokenBlackListRepository.get(authToken)

		if (invalid_token != null) throw new Error('ERR401')
		else {
			let responseToken = await this.JWTServices.decode(authToken)
			if (responseToken.status === 401 || responseToken.status === 403) {
				throw new Error('ERR401')
			} else {
				/*
				 * Validar si el usuario existe
				 */
				if (responseToken.payload.rol == 'user') {
					if (!(await this.usersRepository.get(responseToken.payload.id)))
						throw new Error('ERR401')
				}
				req.id = responseToken.payload.id
				req.rol = responseToken.payload.rol
				next()
			}
		}
	}
}

module.exports = AuthMiddleware
