'use strict'

class DoneString {
	constructor() {
		this.DON200 = {
			status: 200,
			name: 'Ok',
			message: 'Recurso entregado con exito'
		}
		this.DON201 = {
			status: 201,
			name: 'Created',
			message: 'Recurso creado con exito'
		}
		this.DON204 = {
			status: 204,
			name: 'No Content',
			message: 'Recurso eliminado/editado con exito'
		}
		this.DON404 = {
			status: 404,
			name: 'Not Found',
			message: 'Recurso no encontrado'
		}
	}
}

module.exports = DoneString
