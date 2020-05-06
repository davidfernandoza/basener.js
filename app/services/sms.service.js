'use strict'
const twilio = require('twilio')
let config = null

class SmsService {
	#clientTwilio

	constructor({ Config }) {
		if (!config) {
			config = Config
			this.#clientTwilio = new twilio(config.SMS.ID, config.SMS.TOKEN)
		}
	}

	async send(smsOptios) {
		try {
			smsOptios.from = !smsOptios.from ? config.SMS.PHONE : smsOptios.from
			await this.#clientTwilio.messages.create(smsOptios)
			return true
		} catch (error) {
			return false
		}
	}
}
module.exports = SmsService
