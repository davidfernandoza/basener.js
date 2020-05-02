'use strict'
const { join } = require('path')
const Request = require(join(__dirname, './request'))
let body = {}
let passwordRule = {}

class UsersRequest extends Request {
	constructor({ JoiValidator, Config }) {
		body = {
			// table_id: JoiValidator.number()
			// 	.integer()
			// 	.min(0)
			// 	.max(99999999990)
			// 	.required(),
			name: JoiValidator.string().min(8).max(225).required(),
			lastname: JoiValidator.string().min(8).max(225).required(),
			email: JoiValidator.string()
				.email({ ignoreLength: true })
				.min(8)
				.max(100)
				.required(),
			password: JoiValidator.string().min(8).max(225).required(),
			rol: JoiValidator.any().valid('ADMIN', 'BASIC').required(),
			birthday: JoiValidator.date().required(),
			range: JoiValidator.number().required(),
			status: JoiValidator.boolean().required(),
			biography: JoiValidator.string().min(8).allow('').optional()
		}

		// Reglas para el cambio de pasword
		passwordRule = {
			password: JoiValidator.string().min(8).max(45).required()
		}

		super(body, JoiValidator, Config.CSRF_TOKEN)
	}

	async update(req, res, next) {
		delete body.password
		const header = await super.header(req)
		if (header != true) await super.errorHandle(header)
		else if (req.method != 'GET' && req.method != 'DELETE') {
			const bodyRes = await super.body(req, body)
			if (bodyRes != true) await super.errorHandle(bodyRes)
		}
		next()
	}

	async password(req, res, next) {
		const header = await super.header(req)
		if (header != true) await super.errorHandle(header)
		else if (req.method != 'GET' && req.method != 'DELETE') {
			const bodyRes = await super.body(req, passwordRule)
			if (bodyRes != true) await super.errorHandle(bodyRes)
		}
		next()
	}

	async newToken(req, res, next) {
		const header = await super.header(req)
		if (header != true) await super.errorHandle(header)
		next()
	}
}
module.exports = UsersRequest
