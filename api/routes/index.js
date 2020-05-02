'use strict'
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const { Router } = require('express')
require('express-async-errors')

module.exports = ({ ErrorHandleMiddleware, UsersRoutes, AuthRoutes }) => {
	const router = Router()
	const apiRoute = Router()

	// Parsear la peticion
	apiRoute
		.use(cors())
		.use(helmet())
		.use(bodyParser.urlencoded({ extended: false }))
		.use(bodyParser.json())
		.use(compression())

	// registrar las rutas
	apiRoute.use('/auth', AuthRoutes)
	apiRoute.use('/users', UsersRoutes)
	router.use('/api', apiRoute)

	// Not Found 404
	router.use(() => {
		throw new Error('ERR404')
	})

	//  Manejador de errores
	router.use(ErrorHandleMiddleware.index.bind(ErrorHandleMiddleware))

	return router
}
