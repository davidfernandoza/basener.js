'use strict'

const { Router } = require('express')

module.exports = ({ UsersAuth, AuthRequest, TokenAuth }) => {
	/*
	 * Rutas de las autentificaciones:
	 * -------------------------
	 * Middlewares:
	 */
	const requestPublic = AuthRequest.public.bind(AuthRequest)
	const user = UsersAuth
	const token = TokenAuth
	const router = Router()
	router.post('/login', requestPublic, user.login.bind(user))
	router.post('/logout', requestPublic, token.delete.bind(token))
	// router.post(
	// 	'/forgot-password',
	// 	requestPublic,
	// 	user.forgotPassword.bind(UsersAuth)
	// )

	return router
}
