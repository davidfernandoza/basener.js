'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')

class JWTService {
	#config = {}

	constructor({ Config }) {
		this.#config = Config
	}

	//  Metodo para crear el Token
	async create(id, rol, token) {
		let payload

		if (!id || !rol) return { status: 403, payload: null }
		// Para la seguridad de WebHooks
		else if (token) {
			payload = {
				sub: id,
				rol: rol,
				token: token,
				iat: moment().unix(),
				exp: moment().add(6, 'minutes').unix()
			}
		}
		// seguridad de usuario
		else {
			payload = {
				sub: id,
				rol: rol,
				iat: moment().unix(),
				exp: moment().add(7, 'days').unix()
			}
		}
		const Token = jwt.encode(payload, this.#config.ENCRYPTION_KEY_TOKEN)
		return { status: 200, payload: { token: Token } }
	}

	// Metodo que decodifica el Token:
	decode(Token) {
		try {
			/*
			 * status true -> no verifica la firma del Token
			 * status false -> si verifica la firma del Token
			 */
			const payload = jwt.decode(
				Token,
				this.#config.ENCRYPTION_KEY_TOKEN,
				false
			)
			const data = {
				id: payload.sub,
				rol: payload.rol
			}

			data.token = !payload.token ? null : payload.token
			return { status: 200, payload: data }
		} catch (err) {
			if (err.message == 'Token expired') {
				return { status: 401, payload: null }
			}
			return { status: 403, payload: null }
		}
	}
}

module.exports = JWTService
