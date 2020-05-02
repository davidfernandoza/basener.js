'use strict'

const { Router } = require('express')

module.exports = ({
	AuthRequest,
	ForgotPasswordController,
	TokenAuth,
	UsersAuth
}) => {
	/*
	 * Rutas de las autentificaciones:
	 * -------------------------
	 * Middlewares:
	 */
	const requestPublic = AuthRequest.public.bind(AuthRequest)
	const user = UsersAuth
	const forgotPassword = ForgotPasswordController
	const token = TokenAuth
	const router = Router()
	router.post('/login', requestPublic, user.login.bind(user))
	router.post('/logout', requestPublic, token.delete.bind(token))
	router.post(
		'/forgot-password',
		requestPublic,
		forgotPassword.create.bind(forgotPassword)
	)

	return router
}
