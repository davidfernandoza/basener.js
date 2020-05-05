'use strict'
const { Router } = require('express')

/*
 * Rutas de los ForgotPassword:
 */

module.exports = ({ ForgotPasswordController, ForgotPasswordRequest }) => {
	const router = Router()

	/*
	 * Request:
	 */
	const requestPublic = ForgotPasswordRequest.public.bind(ForgotPasswordRequest)
	const requestPhone = ForgotPasswordRequest.phone.bind(ForgotPasswordRequest)

	/*
	 * Controller:
	 */
	const controller = ForgotPasswordController

	/*
	 * -----------------------------------------------------------------------------------*
	 * POST:
	 */

	router.post('/email', requestPublic, controller.create.bind(controller))
	router.post('/phone', requestPhone, controller.create.bind(controller))

	return router
}
