'use strict'

module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	APP_NAME: process.env.APP_NAME,
	PORT: process.env.PORT,
	CSRF_TOKEN: process.env.CSRF_TOKEN,
	DOMAIN: process.env.DOMAIN,
	BASE_URL: process.env.BASE_URL,
	BASE_API: process.env.BASE_API,
	ENCRYPTION_KEY_TOKEN: process.env.ENCRYPTION_KEY_TOKEN,
	ENCRYPTION_SALT: process.env.ENCRYPTION_SALT,
	HANDLER_ERROR_TOKEN: process.env.HANDLER_ERROR_TOKEN,
	HANDLER_ERROR_API: process.env.HANDLER_ERROR_API,
	TOKEN_TIME_MINUTES: process.env.TOKEN_TIME_MINUTES,

	DB: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIAL,
		loggin: false,
		operatorsAliases: false
	},
	ROL: {
		ATTRIBUTE: process.env.ROL_ATTRIBUTE,
		BASIC: process.env.ROL_BASIC,
		ADMIN: process.env.ROL_ADMIN
	},
	MAIL: {
		HOST: process.env.MAIL_HOST,
		PORT: process.env.MAIL_PORT,
		USER: process.env.MAIL_USER,
		PASSWORD: process.env.MAIL_PASSWORD,
		SECURE: process.env.MAIL_SECURE,
		TLS: process.env.MAIL_TLS,
		EMAIL: process.env.MAIL_EMAIL
	},
	SMS: {
		ID: process.env.SMS_TWILIO_ID,
		TOKEN: process.env.SMS_TWILIO_TOKEN,
		PHONE: process.env.SMS_TWILIO_PHONE
	}
}
