'use strict'
const { Router } = require('express')

/*
 * Rutas de los ForgotPassword:
 */

module.exports = ({
	ForgotPasswordController,
	ForgotPasswordRequest,
	AdminPolitic,
	BasicPolitic
}) => {
	const router = Router()

	/*
	 * Request:
	 */
	const requestPublic = ForgotPasswordRequest.public.bind(ForgotPasswordRequest)

	/*
	 * Politics:
	 */
	const politics = [
		AdminPolitic.validate.bind(AdminPolitic),
		BasicPolitic.validate.bind(BasicPolitic)
	]

	/*
	 * Controller:
	 */
	const controller = ForgotPasswordController

	/*
	 * -----------------------------------------------------------------------------------*
	 * GET:
	 */

	router.get(
		'/:token',
		requestPublic,
		politics,
		controller.get.bind(controller)
	)

	return router
}
