'use strict'
const { join } = require('path')
const Repository = require(join(__dirname, './repository'))

class TokenBlackListRepository extends Repository {
	constructor({ DB, TokenBlackListDto, Config }) {
		super(DB, TokenBlackListDto, Config, 'token_black_list')
		this.db = DB
	}

	get(token) {
		return this.db[this.entity].findOne({ where: { token } })
	}
}
module.exports = TokenBlackListRepository
