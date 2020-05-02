'use strict'
const { join } = require('path')
const Request = require(join(__dirname, './request'))

class ForgotPasswordRequest extends Request {
	constructor({ JoiValidator, Config }) {
		const body = {
			users_id: JoiValidator.number()
				.integer()
				.min(0)
				.max(99999999990)
				.required(),
			token: JoiValidator.string().min(8).max(225).required()
		}
		super(body, JoiValidator, Config.CSRF_TOKEN)
	}
}
module.exports = ForgotPasswordRequest
