'use strict'
const { join } = require('path')
const Politic = require(join(__dirname, './politic'))

class BasicPolitic extends Politic {
	constructor({ Config }) {
		const rol = Config.ROL.BASIC
		const authRol = Config.ROL.ATTRIBUTE
		const baseUrl = Config.BASE_API
		const permissions = {
			clients: {
				subRoutes: [
					{
						route: '/',
						method: 'GET',
						status: 'disable'
					},
					{
						route: '/:id',
						method: 'GET',
						status: 'unique'
					},
					{
						route: '/',
						method: 'POST',
						status: 'enable'
					},
					{
						route: '/new-token',
						method: 'POST',
						status: 'unique'
					},
					{
						route: '/:id',
						method: 'PUT',
						status: 'unique'
					},
					{
						route: '/new-password',
						method: 'PATCH',
						status: 'unique'
					},
					{
						route: '/:id',
						method: 'DELETE',
						status: 'unique'
					}
				]
			},
			auth: {
				subRoutes: 'all',
				status: 'enable'
			}
		}
		super(rol, authRol, baseUrl, permissions)
	}

	async validate(req, res, next) {
		const permissions = await super.validate(req)
		if (permissions.status === 200) next()
		else if (permissions.status === 403) throw new Error('ERR403')
		else if (permissions.status === 404) throw new Error('ERR404')
		else throw new Error(permissions.message)
	}
}

module.exports = BasicPolitic
