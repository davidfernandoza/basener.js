'use strict'
// const axios = require('axios')
const { join } = require('path')
const { ErrorString } = require(join(__dirname, '../strings'))
let errorObject = {}
let code = 'ERR500'
let detail = null

class ErrorHandleMiddleware {
	constructor({ Config }) {
		this.config = Config
		this.errorString = ErrorString
		this.optionAxios = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Token-APP': Config.ERROR_HANDLER_TOKEN
			}
		}
		this.apiUrl = Config.ERROR_HANDLER_API
	}

	async index(error, req, res, next) {
		if (error.message.length === 6) {
			code = error.message
		} else {
			// Validacion de objeto
			try {
				const objError = JSON.parse(error.message)

				// Refactorizado de campos a mostrar por error 400
				if (objError.status) {
					code = objError.status

					// Mapeo de errores en sequelice
					if (objError.package == 'sequelize') {
						detail = objError.errors.map(item => {
							const message = item.message.split('.')
							return {
								message: message[1],
								path: item.path
							}
						})
					} else {
						detail = objError.errors
					}
				}
			} catch (error) {
				error
			}
		}

		// Validar si el codigo que trae el error es valido
		if (this.errorString[code] == undefined) {
			code = 'ERR500'
		}

		// Enviar errores 500 a un servidor
		if (code == 'ERR500') {
			this.optionAxios.data = {
				name: error.name,
				message: error.message,
				stack: error.stack
			}
			try {
				console.error(error)

				// await axios(this.apiUrl, this.optionAxios)
			} catch (error) {
				error
			}
		}

		errorObject.status = this.errorString[code].status
		errorObject.name = this.errorString[code].name
		errorObject.message = this.errorString[code].message
		errorObject.code = this.errorString[code].code
		if (detail) errorObject.detail = detail

		res.status(errorObject.status)
		res.json(errorObject)
		next(error.message)
	}
}
module.exports = ErrorHandleMiddleware
