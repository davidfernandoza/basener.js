'use strict'

module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	CSRF_TOKEN: process.env.CSRF_TOKEN,
	BASE_URL: process.env.BASE_URL,
	BASE_API: process.env.BASE_API,
	ENCRYPTION_KEY_TOKEN: process.env.ENCRYPTION_KEY_TOKEN,
	ENCRYPTION_SALT: process.env.ENCRYPTION_SALT,
	HANDLER_ERROR_TOKEN: process.env.HANDLER_ERROR_TOKEN,
	HANDLER_ERROR_API: process.env.HANDLER_ERROR_API,

	DB: {
		username: process.env.DB_USER_TEST,
		password: process.env.DB_PASS_TEST,
		database: process.env.DB_DATABASE_TEST,
		host: process.env.DB_HOST_TEST,
		dialect: process.env.DB_DIAL_TEST
	},
	ROL: {
		ATTRIBUTE: process.env.ROL_ATTRIBUTE,
		BASIC: process.env.ROL_BASIC,
		ADMIN: process.env.ROL_ADMIN
	}
}
