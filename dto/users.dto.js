'use strict'
const { join } = require('path')
const Dto = require(join(__dirname, './dto'))

class UsersDto extends Dto {
	constructor() {
		const schema = {
			id: 'id',
			// table_id: 'table_id',
			name: 'name',
			lastname: 'lastname',
			email: 'email',
			password: 'password',
			rol: 'rol',
			birthday: 'birthday',
			range: 'range',
			phone: 'phone',
			status: 'status',
			biography: 'biography'
		}
		super(schema)
	}

	// Para el auth
	async api(addSubDto) {
		const schema = await super.api(addSubDto)
		schema.auth_token = 'token'
		delete schema.password
		return schema
	}

	async repository(addSubDto) {
		this.schema.password = 'password'
		return super.repository(addSubDto)
	}
}

module.exports = UsersDto
