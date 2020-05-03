'use strict'
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const { Router } = require('express')

module.exports = ({ RecoverPasswordWebRoutes, Config, StringHelper }) => {
	const router = Router()
	const app = StringHelper.capitalize(Config.APP_NAME)

	// registrar las rutas
	router
		.use(cors())
		.use(helmet())
		.use(bodyParser.urlencoded({ extended: false }))
		.use(bodyParser.json())
		.use(compression())

	router.use('/recover-password', RecoverPasswordWebRoutes)

	// Respuesta ok
	router.use('/ok', (req, res) => {
		return res.render('ok', {
			title: 'Ok',
			app: app,
			message: 'OK'
		})
	})

	// Respuesta 500
	router.use('/error', (req, res) => {
		return res.render('500', {
			title: '500',
			app: app
		})
	})

	return router
}
