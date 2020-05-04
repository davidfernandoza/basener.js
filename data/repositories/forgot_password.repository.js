'use strict'
const { join } = require('path')
const Repository = require(join(__dirname, './repository'))

class ForgotPasswordRepository extends Repository {
	constructor({ DB, ForgotPasswordDto, Config }) {
		super(DB, ForgotPasswordDto, Config, 'forgot_password')
		this.db = DB
	}

	async delete(token, transaction) {
		try {
			const result = await this.db[this.entity].destroy({
				where: { token },
				transaction: transaction
			})
			if (result == 0) return null
			return result
		} catch (error) {
			await super.errorHandle(error)
		}
	}
}
module.exports = ForgotPasswordRepository
