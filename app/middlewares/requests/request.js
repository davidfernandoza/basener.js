'use strict'

class Request {
	constructor(SchemaBody, JoiValidator, CSRF) {
		this.codeError = 'ERR400'
		this.package = 'joi'
		this.csrfToken = CSRF
		this.joiValidator = JoiValidator
		this.schemaBody = SchemaBody
		this.schemaAuth = {
			http_auth_token: JoiValidator.string().min(80).max(225).required()
		}
		this.schemaCsrf = {
			http_csrf_token: JoiValidator.any().valid(this.csrfToken).required()
		}
	}

	// Metodo estandar para validaciones privadas
	async private(req, res, next) {
		const header = await this.header(req)
		if (header != true) await this.errorHandle(header)
		else if (req.method != 'GET' && req.method != 'DELETE') {
			const body = await this.body(req, this.schemaBody)
			if (body != true) await this.errorHandle(body)
		}
		next()
	}

	// Metodo estandar para validaciones publicas.
	async public(req, res, next) {
		const header = await this.header(req, 'csrf')
		if (header != true) await this.errorHandle(header)
		else if (req.method != 'GET' && req.method != 'DELETE') {
			const body = await this.body(req, this.schemaBody)
			if (body != true) await this.errorHandle(body)
		}
		next()
	}

	// Validaciones
	// ----------------------------------------------------

	// Validacion de cabecera
	async header(req, type) {
		try {
			let rules = {}
			if (!type) {
				rules = {
					http_csrf_token: this.schemaCsrf.http_csrf_token,
					http_auth_token: this.schemaAuth.http_auth_token
				}
			} else {
				if (type == 'auth') {
					rules = this.schemaAuth
				} else {
					rules = this.schemaCsrf
				}
			}
			const schema = this.joiValidator.object(rules).unknown(true)
			await schema.validateAsync(req.headers, { abortEarly: false })
			return true
		} catch (error) {
			return error
		}
	}

	// Validacion de cuerpo
	async body(req, rules) {
		try {
			const schema = this.joiValidator.object(rules).unknown(true)
			await schema.validateAsync(req.body, { abortEarly: false })
			return true
		} catch (error) {
			return error
		}
	}

	async errorHandle(error) {
		const objecError = {}
		objecError.errors = error.details.map(item => {
			let message = item.message.replace(/"/g, '')
			let path = item.path[0].replace(/http_auth_token/g, 'Auth')
			path = path.replace(/http_csrf_token/g, 'Token')
			message = message.replace(/http_auth_token/g, 'Auth')
			message = message.replace(/http_csrf_token/g, 'Token')
			message = message.replace(/\[/g, '')
			message = message.replace(/\]/g, '')
			message = message.replace(new RegExp(this.csrfToken, 'g'), 'Correct')

			return {
				message: message,
				path: path
			}
		})
		objecError.status = this.codeError
		objecError.package = this.package
		throw new Error(JSON.stringify(objecError))
	}
}
module.exports = Request
