'use strict'
const { Router } = require('express')

module.exports = ({ ForgotPasswordWebRoutes }) => {
	const router = Router()

	// registrar las rutas
	router.use('/forgot-password', ForgotPasswordWebRoutes)
	return router
}
