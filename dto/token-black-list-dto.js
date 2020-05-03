'use strict'
const { join } = require('path')
const Dto = require(join(__dirname, './dto'))

class TokenBlackListDto extends Dto {
	constructor() {
		const schema = {
			id: 'id',
			token: 'token:',
			created_at: 'created_at'
		}
		super(schema)
	}
}

module.exports = TokenBlackListDto
