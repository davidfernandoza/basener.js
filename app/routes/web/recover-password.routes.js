'use strict'
const { Router } = require('express')

/*
 * Rutas de los ForgotPassword:
 */

module.exports = ({
	ForgotPasswordController,
	ForgotPasswordRequest,
	UsersController
}) => {
	const router = Router()

	/*
	 * Request (validadores):
	 */
	const password = ForgotPasswordRequest.password.bind(ForgotPasswordRequest)

	/*
	 * Controller:
	 */
	const controller = ForgotPasswordController
	const users = UsersController

	/*
	 * -----------------------------------------------------------------------------------*
	 * GET:
	 */

	router.get('/:token', controller.index.bind(controller))
	router.patch('/:token', password, users.recoverPassword.bind(users))

	return router
}
