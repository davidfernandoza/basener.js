'use strict'
const { morphism } = require('morphism')
/*
 * Manejador de consultas a la base de datos
 */
class Repository {
	constructor(db, entityDto, config, entity) {
		this.db = db
		this.entity = entity
		this.entityDto = entityDto
		this.codeError = 'ERR400'
		this.package = 'sequelize'
		this.config = config
		this.string = {
			ATEX: 'The attribute #1 already exists',
			ATNE: 'Attribute #1 does not exist',
			PRNE: 'Wrong parameters'
		}
	}

	async getAll(transaction, addSubDto) {
		try {
			const dto = await this.entityDto.repository(addSubDto)
			const entities = await this.db[this.entity].findAll({
				transaction: transaction
			})
			if (entities.length === 0) return null
			return entities.map(item => morphism(dto, item))
		} catch (error) {
			await this.errorHandle(error)
		}
	}

	async get(id, transaction, addSubDto) {
		try {
			const dto = await this.entityDto.repository(addSubDto)
			const entity = await this.db[this.entity].findOne({
				where: { id },
				transaction: transaction
			})
			if (!entity) return null
			return morphism(dto, entity)
		} catch (error) {
			await this.errorHandle(error)
		}
	}

	async getAttributes(attribut, match, transaction, addSubDto) {
		try {
			const dto = await this.entityDto.repository(addSubDto)
			const entity = await this.db[this.entity].findOne({
				where: { [attribut]: match },
				transaction: transaction
			})
			if (!entity) return null
			return morphism(dto, entity)
		} catch (error) {
			await this.errorHandle(error)
		}
	}

	async create(entity, transaction, addSubDto) {
		try {
			/*
			 * Por lo general el addSubDto viene en false en el create
			 * ya que solo se usa para generar JSON con sub-objetos en
			 * las consultas, y cuando se guarda en una tabla en general
			 * no se guardan sub-JSON
			 */

			const dto = await this.entityDto.repository(addSubDto)
			entity = morphism(dto, entity)
			const created = await this.db[this.entity].create(entity, {
				transaction: transaction
			})
			return morphism(dto, created)
		} catch (error) {
			await this.errorHandle(error)
		}
	}

	async update(id, entity, dto, transaction, addSubDto) {
		try {
			if (!dto) {
				dto = await this.entityDto.repository(addSubDto)
			}
			entity.id = id
			entity = morphism(dto, entity)
			entity = await this.deleteAts(entity)
			const result = await this.db[this.entity].update(entity, {
				where: { id },
				transaction: transaction
			})
			if (result[0] == 0) return null
			return result[0]
		} catch (error) {
			await this.errorHandle(error)
		}
	}

	async patch(id, entity, dto, transaction) {
		try {
			entity = morphism(dto, entity)
			entity = await this.deleteAts(entity)
			const result = await this.db[this.entity].update(entity, {
				where: { id },
				transaction: transaction
			})
			if (result[0] == 0) return null
			return result[0]
		} catch (error) {
			await this.errorHandle(error)
		}
	}

	async delete(id, transaction) {
		try {
			const result = await this.db[this.entity].destroy({
				where: { id },
				transaction: transaction
			})
			if (result == 0) return null
			return result
		} catch (error) {
			await this.errorHandle(error)
		}
	}

	async deleteForAttribute(attribute, mach, transaction) {
		try {
			const result = await this.db[this.entity].destroy({
				where: { [attribute]: mach },
				transaction: transaction
			})
			if (result == 0) return null
			return result
		} catch (error) {
			await this.errorHandle(error)
		}
	}

	async deleteAts(entity) {
		delete entity.created_at
		delete entity.updated_at
		return entity
	}

	// Manejador de errores
	async errorHandle(error) {
		const objecError = JSON.parse(JSON.stringify(error))
		if (Object.entries(objecError).length === 0) {
			throw new Error(error)
		} else {
			let message = ''
			let path = ''

			/*
			 * Procesamiento de respuesta de la base de datos
			 */
			if (objecError.name == 'SequelizeUniqueConstraintError') {
				/*
				 * Postgres
				 * Seleccionar mensaje de error por codigo SQL
				 */
				if (this.config.DB.dialect == 'postgres') {
					if (objecError.parent.code == '23503') {
						message = this.string.ATNE
					}
					if (objecError.parent.code == '23505') {
						message = this.string.ATEX
					} else {
						throw new Error(error)
					}
					let arraySplit = objecError.parent.detail.split(')=(')
					arraySplit = arraySplit[0].split('(')
					path = arraySplit[1]
				}

				message = message.replace('#1', path)
				objecError.errors = [
					{
						message: `table.${message}`,
						path: path
					}
				]
			} else if (objecError.name == 'SequelizeDatabaseError') {
				/*
				 * Postgres
				 * Seleccionar mensaje de error por codigo SQL
				 */
				if (this.config.DB.dialect == 'postgres') {
					/*
					 * Parametros de url erroneo
					 */
					if (objecError.parent.code == '22P02') {
						objecError.errors = [
							{
								message: `table.${this.string.PRNE}`,
								path: 'Params'
							}
						]
					} else {
						throw new Error(error)
					}
				}
			}

			objecError.status = this.codeError
			objecError.package = this.package
			throw new Error(JSON.stringify(objecError))
		}
	}
}
module.exports = Repository
