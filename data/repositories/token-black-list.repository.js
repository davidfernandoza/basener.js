'use strict'
const { join } = require('path')
const Repository = require(join(__dirname, './repository'))
const { Op } = require('sequelize')

class TokenBlackListRepository extends Repository {
	constructor({ DB, TokenBlackListDto, Config }) {
		super(DB, TokenBlackListDto, Config, 'token_black_list')
		this.db = DB
	}

	get(token) {
		return this.db[this.entity].findOne({ where: { token } })
	}

	async delete(date) {
		await this.db[this.entity].destroy({
			where: { created_at: { [Op.lte]: date } }
		})
	}
}
module.exports = TokenBlackListRepository
