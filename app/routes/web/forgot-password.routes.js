'use strict'
const { Router } = require('express')

/*
 * Rutas de los ForgotPassword:
 */

module.exports = ({ ForgotPasswordController }) => {
	const router = Router()

	/*
	 * Controller:
	 */
	const controller = ForgotPasswordController

	/*
	 * -----------------------------------------------------------------------------------*
	 * GET:
	 */

	router.get('/', controller.index.bind(controller))

	return router
}
