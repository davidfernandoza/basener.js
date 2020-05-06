'use strict'
const bcrypt = require('bcrypt')

module.exports = {
	up: async queryInterface => {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash('123456789', salt)

		return queryInterface.bulkInsert(
			'users',
			[
				{
					// table_id: 1,
					name: 'Name Ipsum 1',
					lastname: 'Lastname Ipsum 1',
					email: 'uupjhfx_1@gmail.com',
					password: hash,
					rol: 'ADMIN',
					birthday: '2020-04-29T06:16:44.848Z',
					range: 220831.66666666666,
					phone: '+573893279841',
					status: true,
					biography:
						'Lorem Ipsum 1 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					// table_id: 2,
					name: 'Name Ipsum 2',
					lastname: 'Lastname Ipsum 2',
					email: 'jjdnezc_2@gmail.com',
					password: hash,
					rol: 'ADMIN',
					birthday: '2020-04-29T06:16:44.853Z',
					range: 168686.33333333334,
					phone: '+573893279842',
					status: true,
					biography:
						'Lorem Ipsum 2 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					// table_id: 3,
					name: 'Name Ipsum 3',
					lastname: 'Lastname Ipsum 3',
					email: 'nvntlku_3@gmail.com',
					password: hash,
					rol: 'BASIC',
					birthday: '2020-05-05T06:16:44.853Z',
					range: 217569,
					phone: '+573893279843',
					status: true,
					biography:
						'Lorem Ipsum 3 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					// table_id: 4,
					name: 'Name Ipsum 4',
					lastname: 'Lastname Ipsum 4',
					email: 'zijbkel_4@gmail.com',
					password: hash,
					rol: 'ADMIN',
					birthday: '2020-05-06T06:16:44.854Z',
					range: 5102.666666666667,
					phone: '+573893279844',
					status: true,
					biography:
						'Lorem Ipsum 4 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					// table_id: 5,
					name: 'Name Ipsum 5',
					lastname: 'Lastname Ipsum 5',
					email: 'ekcmtmm_5@gmail.com',
					password: hash,
					rol: 'BASIC',
					birthday: '2020-04-30T06:16:44.854Z',
					range: 304684,
					phone: '+573893279845',
					status: true,
					biography:
						'Lorem Ipsum 5 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					// table_id: 6,
					name: 'Name Ipsum 6',
					lastname: 'Lastname Ipsum 6',
					email: 'lqkvaik_6@gmail.com',
					password: hash,
					rol: 'ADMIN',
					birthday: '2020-04-25T06:16:44.854Z',
					range: 127897.66666666667,
					phone: '+573893279846',
					status: true,
					biography:
						'Lorem Ipsum 6 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					// table_id: 7,
					name: 'Name Ipsum 7',
					lastname: 'Lastname Ipsum 7',
					email: 'ibbdnzp_7@gmail.com',
					password: hash,
					rol: 'ADMIN',
					birthday: '2020-05-04T06:16:44.854Z',
					range: 103232,
					phone: '+573893279847',
					status: true,
					biography:
						'Lorem Ipsum 7 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					// table_id: 8,
					name: 'Name Ipsum 8',
					lastname: 'Lastname Ipsum 8',
					email: 'vdtbicc_8@gmail.com',
					password: hash,
					rol: 'BASIC',
					birthday: '2020-05-01T06:16:44.855Z',
					range: 134943.33333333334,
					phone: '+573893279848',
					status: true,
					biography:
						'Lorem Ipsum 8 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					// table_id: 9,
					name: 'Name Ipsum 9',
					lastname: 'Lastname Ipsum 9',
					email: 'ymjrper_9@gmail.com',
					password: hash,
					rol: 'ADMIN',
					birthday: '2020-04-29T06:16:44.855Z',
					range: 200741.33333333334,
					phone: '+573893279849',
					status: true,
					biography:
						'Lorem Ipsum 9 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				},
				{
					// table_id: 10,
					name: 'Name Ipsum 10',
					lastname: 'Lastname Ipsum 10',
					email: 'puemfok_10@gmail.com',
					password: hash,
					rol: 'ADMIN',
					birthday: '2020-04-30T06:16:44.855Z',
					range: 190952,
					phone: '+573893279810',
					status: true,
					biography:
						'Lorem Ipsum 10 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString()
				}
			],
			{}
		)
	},
	down: queryInterface => {
		return queryInterface.bulkDelete('users', null, {})
	}
}
