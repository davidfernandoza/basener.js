'use strict'

class ErrorString {
	constructor() {
		this.ERR400 = {
			status: 400,
			name: 'Bad Request',
			code: 'ERR400',
			message: 'Consulta incorrecta'
		}
		this.ERR401 = {
			status: 401,
			name: 'Unauthorized',
			code: 'ERR401',
			message: 'No autorizado para solicitar recursos'
		}
		this.ERR403 = {
			status: 403,
			name: 'Forbidden',
			code: 'ERR403',
			message: 'No existen los permisos suficientes'
		}

		this.ERR404 = {
			status: 404,
			name: 'Not Found',
			code: 'ERR404',
			message: 'Recurso no encontrado'
		}

		this.ERR500 = {
			status: 500,
			name: 'Internal Server Error',
			code: 'ERR500',
			message: 'Error interno del servidor'
		}
	}
}

module.exports = ErrorString
