'use strict'
const { Router } = require('express')

/*
 * Rutas de los Users:
 */

module.exports = ({
	UsersController,
	UsersRequest,
	AuthMiddleware,
	TokenAuth,
	AdminPolitic,
	BasicPolitic
}) => {
	const router = Router()

	/*
	 * Request (Validadores):
	 */
	const requestPrivate = UsersRequest.private.bind(UsersRequest)
	const requestPublic = UsersRequest.public.bind(UsersRequest)
	const requestNewToken = UsersRequest.newToken.bind(UsersRequest)
	const requestPassword = UsersRequest.password.bind(UsersRequest)
	const requestUpdate = UsersRequest.update.bind(UsersRequest)

	/*
	 * Politics:
	 */
	const politics = [
		AdminPolitic.validate.bind(AdminPolitic),
		BasicPolitic.validate.bind(BasicPolitic)
	]

	/*
	 * Middlewares:
	 */
	const auth = AuthMiddleware.compare.bind(AuthMiddleware)

	/*
	 * Controller:
	 */
	const controller = UsersController
	const newToken = TokenAuth.create.bind(TokenAuth)

	/*
	 * -----------------------------------------------------------------------------------*
	 * GET:
	 */
	router.get(
		'/',
		requestPublic,
		auth,
		politics,
		controller.getAll.bind(controller)
	)

	router.get(
		'/:id',
		requestPrivate,
		auth,
		politics,
		controller.get.bind(controller)
	)

	/*
	 * -----------------------------------------------------------------------------------*
	 * POST:
	 */
	router.post(
		'/',
		requestPrivate,
		auth,
		politics,
		controller.create.bind(controller)
	)

	router.post('/new-token', requestNewToken, auth, politics, newToken)

	/*
	 * -----------------------------------------------------------------------------------*
	 * PUT:
	 */
	router.put(
		'/:id',
		requestUpdate,
		auth,
		politics,
		controller.update.bind(controller)
	)

	/*
	 * -----------------------------------------------------------------------------------*
	 * PATCH:
	 */
	router.patch(
		'/new-password',
		requestPassword,
		auth,
		politics,
		controller.password.bind(controller)
	)

	/*
	 * -----------------------------------------------------------------------------------*
	 * DELETE:
	 */
	router.delete(
		'/:id',
		requestPrivate,
		auth,
		politics,
		controller.delete.bind(controller)
	)

	return router
}
