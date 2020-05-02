'use strict'
const express = require('express')
const morgan = require('morgan')

class Server {
	/*
	 * Se le pasa las configuraciones de entorno y las rutas por DI
	 * Monta el servidor con el metodo start.
	 */
	constructor({ Config, Routes, RoutesWeb }) {
		this.config = Config
		this.express = express()
		this.express.use(morgan('dev'))
		this.express.set('view engine', 'pug')
		this.express.use(RoutesWeb)
		this.express.use(Routes)
	}

	async start() {
		return new Promise((resolve, reject) => {
			try {
				const http = this.express.listen(this.config.PORT, () => {
					const { port } = http.address()
					resolve({ PORT: port })
				})
			} catch (error) {
				reject(error)
			}
		})
	}
}

module.exports = Server
