'use strict'
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

class MailService {
	#logo = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/539628_520652/logo.png'
	#config = {}

	constructor({ Config }) {
		this.#config = Config
	}

	async send(emailOptios) {
		try {
			const transporter = nodemailer.createTransport({
				host: this.#config.MAIL.HOST,
				port: parseInt(this.#config.MAIL.PORT),
				secure: this.#config.MAIL.SECURE == 'false' ? false : true,
				auth: {
					user: this.#config.MAIL.USER,
					pass: this.#config.MAIL.PASSWORD
				},
				tls: {
					rejectUnauthorized: this.#config.MAIL.TLS == 'false' ? false : true
				}
			})

			const handlebarOptions = {
				viewEngine: {
					extName: '.hbs',
					partialsDir: 'views/layouts/partials',
					layoutsDir: 'views/templates',
					defaultLayout: 'main.hbs'
				},
				viewPath: 'views/templates',
				extName: '.hbs'
			}

			// Templates Engine
			transporter.use('compile', hbs(handlebarOptions))
			emailOptios.context.logo = this.#logo
			await transporter.sendMail(emailOptios)

			return true
		} catch (error) {
			return false
		}
	}
}
module.exports = MailService
