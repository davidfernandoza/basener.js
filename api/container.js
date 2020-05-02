'use strict'

/* -----------------------------------------------------*/
/* System: 																							*/
/*------------------------------------------------------*/
const { join } = require('path')
const { asClass, asFunction, asValue, createContainer } = require('awilix')
const JoiValidator = require('@hapi/joi')
const StartUp = require(join(__dirname, './startup'))
const Server = require(join(__dirname, './server'))
const Routes = require(join(__dirname, './routes'))
const Config = require(join(__dirname, '../config/env'))
const DB = require(join(__dirname, '../data/models'))
const container = createContainer()

/* -----------------------------------------------------*/
/* Routes: 																							*/
/*------------------------------------------------------*/
const UsersRoutes = require(join(__dirname, './routes/users.routes'))
const AuthRoutes = require(join(__dirname, './routes/auth.routes'))

/* -----------------------------------------------------*/
/* Middlewares: 																				*/
/*------------------------------------------------------*/
const { AuthMiddleware, ErrorHandleMiddleware } = require(join(
	__dirname,
	'./middlewares'
))

/* -----------------------------------------------------*/
/* Politics: 																						*/
/*------------------------------------------------------*/
const { AdminPolitic, BasicPolitic } = require(join(
	__dirname,
	'./middlewares/politics'
))

/* -----------------------------------------------------*/
/* Requests: 																						*/
/*------------------------------------------------------*/
const { UsersRequest, AuthRequest } = require(join(
	__dirname,
	'./middlewares/requests'
))

/* -----------------------------------------------------*/
/* Auth:				 																				*/
/*------------------------------------------------------*/
const { UsersAuth, TokenAuth } = require(join(__dirname, './controllers/auth'))

/* -----------------------------------------------------*/
/* Controllers: 																				*/
/*------------------------------------------------------*/
const { UsersController } = require(join(__dirname, './controllers'))

/* -----------------------------------------------------*/
/* Repositories: 																				*/
/*------------------------------------------------------*/
const { UsersRepository, TokenBlackListRepository } = require(join(
	__dirname,
	'../data/repositories'
))

/* -----------------------------------------------------*/
/* DTOS: 																								*/
/*------------------------------------------------------*/
const { UsersDto, TokenBlackListDto } = require(join(__dirname, '../dto'))

/* -----------------------------------------------------*/
/* Services: 																						*/
/*------------------------------------------------------*/
const { JWTService } = require(join(__dirname, './services'))

/* -----------------------------------------------------*/
/* Registers for inyections:	 													*/
/*------------------------------------------------------*/
container

	/*
	 * System:
	 */
	.register({
		App: asClass(StartUp).singleton(),
		Server: asClass(Server).singleton(),
		Config: asValue(Config),
		DB: asValue(DB)
	})

	/*
	 * Routes:
	 */
	.register({
		Routes: asFunction(Routes).singleton()
	})
	.register({
		UsersRoutes: asFunction(UsersRoutes).singleton(),
		AuthRoutes: asFunction(AuthRoutes).singleton()
	})

	/*
	 * Services:
	 */
	.register({
		JWTService: asClass(JWTService).singleton()
	})

	/*
	 * Auth:
	 */
	.register({
		TokenAuth: asClass(TokenAuth).singleton(),
		UsersAuth: asClass(UsersAuth).singleton()
	})

	/*
	 * Controllers:
	 */
	.register({
		UsersController: asClass(UsersController).singleton()
	})

	/*
	 * Middlewares:
	 */
	.register({
		AuthMiddleware: asClass(AuthMiddleware).singleton(),
		ErrorHandleMiddleware: asClass(ErrorHandleMiddleware).singleton()
	})

	/*
	 * Politics:
	 */
	.register({
		AdminPolitic: asClass(AdminPolitic).singleton(),
		BasicPolitic: asClass(BasicPolitic).singleton()
	})

	/*
	 * Requests:
	 */
	.register({
		JoiValidator: asValue(JoiValidator)
	})
	.register({
		UsersRequest: asClass(UsersRequest).singleton(),
		AuthRequest: asClass(AuthRequest).singleton()
	})

	/*
	 * Repositories:
	 */
	.register({
		UsersRepository: asClass(UsersRepository).singleton(),
		TokenBlackListRepository: asClass(TokenBlackListRepository).singleton()
	})

	/*
	 * DTOS:
	 */
	.register({
		UsersDto: asClass(UsersDto).singleton(),
		TokenBlackListDto: asClass(TokenBlackListDto).singleton()
	})

module.exports = container
