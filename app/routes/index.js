'use strict'
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const { Router } = require('express')
require('express-async-errors')

module.exports = ({
	AuthRoutes,
	ErrorHandleMiddleware,
	ForgotPasswordRoutes,
	UsersRoutes,
	Config,
	StringHelper
}) => {
	const routers = Router()
	const apiRoute = Router()
	const app = StringHelper.capitalize(Config.APP_NAME)

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
	apiRoute.use('/forgot-password', ForgotPasswordRoutes)
	routers.use('/api', apiRoute)

	// Home
	routers.use('/', (req, res, next) => {
		const urlArray = req.path.split('/')
		if (urlArray[1] == '') {
			return res.render('home', {
				title: 'Home',
				app: app
			})
		} else {
			next()
		}
	})

	// Not Found 404
	routers.use((req, res) => {
		const urlArray = req.path.split('/')

		// WEB
		if (urlArray[1] != 'api') {
			res.render('404', {
				title: '404',
				app: app,
				base: `${Config.BASE_URL}:${Config.PORT}`
			})
		}
		// API
		else {
			throw new Error('ERR404')
		}
	})

	//  Manejador de errores
	routers.use(ErrorHandleMiddleware.index.bind(ErrorHandleMiddleware))

	return routers
}