'use strict'
const bcrypt = require('bcrypt')
const { morphism } = require('morphism')

class Controller {
	#doneString = null

	constructor(EntityRepository, EntityDto, StringHelper, Config, DoneString) {
		this.entityRepository = EntityRepository
		this.entityDto = EntityDto

		if (Config) {
			this.config = Config
			this.app = StringHelper.capitalize(Config.APP_NAME)
		}

		// Singleton manual
		if (!this.#doneString) {
			this.#doneString = DoneString
		}
	}

	async getAttribute(attribut, match, transaction, addSubDto) {
		transaction = !transaction ? null : transaction
		addSubDto = !addSubDto ? false : true
		let entity = await this.entityRepository.getAttributes(
			attribut,
			match,
			transaction,
			addSubDto
		)
		return entity
	}

	async getAllAttribute(attribut, match, transaction, addSubDto) {
		transaction = !transaction ? null : transaction
		addSubDto = !addSubDto ? false : true
		let entity = await this.entityRepository.getAllAttributes(
			attribut,
			match,
			transaction,
			addSubDto
		)
		return entity
	}

	async getAll(req, res) {
		const addSubDto = !req.addSubDto ? true : req.addSubDto
		const transaction = !req.transaction ? null : req.transaction
		let entities = await this.entityRepository.getAll(transaction, addSubDto)
		if (req.return || transaction) return entities
		await this.response(res, entities, 'DON200L', addSubDto)
	}

	async get(req, res) {
		const { id } = req.params
		const addSubDto = !req.addSubDto ? true : req.addSubDto
		const transaction = !req.transaction ? null : req.transaction
		let entity = await this.entityRepository.get(id, transaction, addSubDto)
		if (req.return || transaction) return entity
		await this.response(res, entity, 'DON200', addSubDto)
	}

	async create(req, res) {
		const { body } = req
		const addSubDto = !req.addSubDto ? false : req.addSubDto
		const transaction = !req.transaction ? null : req.transaction
		let created = await this.entityRepository.create(
			body,
			transaction,
			addSubDto
		)
		if (req.return || transaction) return created
		await this.response(res, created, 'DON201', addSubDto)
	}

	async update(req, res) {
		const { body } = req
		const { id } = req.params
		const addSubDto = !req.addSubDto ? false : req.addSubDto
		const transaction = !req.transaction ? null : req.transaction
		const dto = !req.dto ? null : req.dto

		const updated = await this.entityRepository.update(
			id,
			body,
			dto,
			transaction,
			addSubDto
		)
		if (req.return || transaction) return updated
		await this.response(res, updated, 'DON204', addSubDto)
	}

	async delete(req, res) {
		const { id } = req.params
		const transaction = !req.transaction ? null : req.transaction
		const deleted = await this.entityRepository.delete(id, transaction)
		await this.response(res, deleted, 'DON204', false)
	}

	async deleteForAttribute(attribut, match, transaction) {
		transaction = !transaction ? null : transaction
		return await this.entityRepository.deleteForAttribute(
			attribut,
			match,
			transaction
		)
	}

	async password(req, res) {
		let { password } = req.body
		const id = req.id
		const transaction = !req.transaction ? null : req.transaction
		const round = parseInt(this.config.ENCRYPTION_SALT)
		const salt = await bcrypt.genSalt(round)
		password = await bcrypt.hash(password, salt)
		const updated = await this.entityRepository.password(id, { password })
		if (req.return || transaction) return updated
		await this.response(res, updated, 'DON204', false)
	}

	// ----------------------------------------------------------------------

	// Funcion que responde al cliente
	async response(res, entity, code, addSubDto, typeDto) {
		/*
		 * Atributo no encontrado
		 */

		if (!entity) {
			this.#doneString.DON404.payload = entity
			return res
				.status(this.#doneString.DON404.status)
				.send(this.#doneString.DON404)
		}

		// Respuesta WEB
		if (code == 'OK') {
			entity.app = this.app
			return res.render(entity.page, entity)
		}

		// Atributo OK
		else if (code == 'DON200' || code == 'DON201' || code == 'DON200L') {
			addSubDto = !addSubDto ? null : addSubDto
			const dto = !typeDto
				? await this.entityDto.api(addSubDto)
				: await this.entityDto[typeDto](addSubDto)
			if (code == 'DON200L') {
				entity = entity.map(item => morphism(dto, item))
				code = 'DON200'
			} else {
				entity = morphism(dto, entity)
			}
		}

		this.#doneString[code].payload = entity
		return res
			.status(this.#doneString[code].status)
			.send(this.#doneString[code])
	}
}

module.exports = Controller
