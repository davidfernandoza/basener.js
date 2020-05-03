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

	router.get('/:token', controller.index.bind(controller))
	router.post('/:token', controller.password.bind(controller))

	return router
}
