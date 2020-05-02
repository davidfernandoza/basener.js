'use strict'
const { join } = require('path')
const bcrypt = require('bcrypt')
const { morphism } = require('morphism')
const { DoneString } = require(join(__dirname, '../../strings'))

class Auth {
	constructor(EntityController, EntityDto, JWTService, DataEntity) {
		this.entityController = EntityController
		this.dataEntity = DataEntity
		this.JWTServices = JWTService
		this.entityDto = EntityDto
		this.doneString = new DoneString()
	}

	async login(req, res) {
		const { identity, password } = req.body
		const dataEntity = await this.entityController.getAttribute(
			this.dataEntity.attribute,
			identity
		)
		if (!dataEntity) throw new Error('ERR401')

		// Comparar el password del usuario o jugador
		const result = await bcrypt.compare(password, dataEntity.password)
		if (!result) throw new Error('ERR401')
		const authToken = await this.JWTServices.create(
			dataEntity.id,
			this.dataEntity.rol
		)

		if (authToken.status != 200) throw new Error('ERR401')
		dataEntity.token = authToken.payload.token
		const dto = await this.entityDto.api()
		const entity = morphism(dto, dataEntity)
		this.doneString.DON200.payload = entity
		return res
			.status(this.doneString.DON200.status)
			.send(this.doneString.DON200)
	}
}

module.exports = Auth
