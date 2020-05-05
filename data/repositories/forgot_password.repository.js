'use strict'
const { join } = require('path')
const Repository = require(join(__dirname, './repository'))
const moment = require('moment')
const { Op } = require('sequelize')
const { morphism } = require('morphism')

class ForgotPasswordRepository extends Repository {
	constructor({ DB, ForgotPasswordDto, Config }) {
		super(DB, ForgotPasswordDto, Config, 'forgot_password')
		this.db = DB
	}

	async delete(token, transaction) {
		try {
			const date = moment().toISOString()
			const result = await this.db[this.entity].destroy({
				where: {
					[Op.or]: [{ token: token }, { expiration: { [Op.lt]: date } }]
				},
				transaction: transaction
			})
			if (result == 0) return null
			return result
		} catch (error) {
			await super.errorHandle(error)
		}
	}

	async getAttributes(attribut, match, transaction, addSubDto) {
		try {
			const date = moment().toISOString()
			const dto = await this.entityDto.repository(addSubDto)
			const entity = await this.db[this.entity].findOne({
				where: {
					[Op.and]: [{ [attribut]: match }, { expiration: { [Op.gte]: date } }]
				},
				transaction: transaction
			})
			await this.delete(null)
			if (!entity) return null
			return morphism(dto, entity)
		} catch (error) {
			await this.errorHandle(error)
		}
	}
}
module.exports = ForgotPasswordRepository
