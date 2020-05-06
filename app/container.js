'use strict'

/* -----------------------------------------------------*/
/* System: 																							*/
/*------------------------------------------------------*/
const { join } = require('path')
const { asClass, asFunction, asValue, createContainer } = require('awilix')
const JoiValidator = require('@hapi/joi')
const StartUp = require(join(__dirname, './startup'))
const Server = require(join(__dirname, './server'))
const RoutesApi = require(join(__dirname, './routes'))
const RoutesWeb = require(join(__dirname, './routes/web'))
const Config = require(join(__dirname, '../config/env'))
const DB = require(join(__dirname, '../data/models'))
const container = createContainer()

/* -----------------------------------------------------*/
/* Helpers:																							*/
/*------------------------------------------------------*/
const { StringHelper } = require(join(__dirname, '../helpers'))

/* -----------------------------------------------------*/
/* Routes: 																							*/
/*------------------------------------------------------*/
const UsersRoutes = require(join(__dirname, './routes/users.routes'))
const AuthRoutes = require(join(__dirname, './routes/auth.routes'))
const ForgotPasswordRoutes = require(join(
	__dirname,
	'./routes/forgot-password.routes'
))

/* -----------------------------------------------------*/
/* Routes Web: 																							*/
/*------------------------------------------------------*/
const RecoverPasswordWebRoutes = require(join(
	__dirname,
	'./routes/web/recover-password.routes'
))

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
const { ForgotPasswordRequest, UsersRequest, AuthRequest } = require(join(
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
const { ForgotPasswordController, UsersController } = require(join(
	__dirname,
	'./controllers'
))

/* -----------------------------------------------------*/
/* Repositories: 																				*/
/*------------------------------------------------------*/
const {
	ForgotPasswordRepository,
	UsersRepository,
	TokenBlackListRepository
} = require(join(__dirname, '../data/repositories'))

/* -----------------------------------------------------*/
/* DTOS: 																								*/
/*------------------------------------------------------*/
const { ForgotPasswordDto, UsersDto, TokenBlackListDto } = require(join(
	__dirname,
	'../dto'
))

/* -----------------------------------------------------*/
/* Services: 																						*/
/*------------------------------------------------------*/
const { JWTService, SmsService, MailService } = require(join(
	__dirname,
	'./services'
))

/* -----------------------------------------------------*/
/* Strings: 																						*/
/*------------------------------------------------------*/
const { DoneString, ErrorString, SmsString } = require(join(
	__dirname,
	'../helpers/strings'
))


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
		RoutesApi: asFunction(RoutesApi).singleton(),
		RoutesWeb: asFunction(RoutesWeb).singleton()
	})
	.register({
		AuthRoutes: asFunction(AuthRoutes).singleton(),
		ForgotPasswordRoutes: asFunction(ForgotPasswordRoutes).singleton(),
		UsersRoutes: asFunction(UsersRoutes).singleton()
	})
	.register({
		RecoverPasswordWebRoutes: asFunction(RecoverPasswordWebRoutes).singleton()
	})

	/*
	 * Helpers:
	 */
	.register({
		StringHelper: asClass(StringHelper).singleton()
	})

	/*
	 * Strings:
	 */
	.register({
		DoneString: asClass(DoneString).singleton(),
		ErrorString: asClass(ErrorString).singleton(),
		SmsString: asClass(SmsString).singleton()
	})

	/*
	 * Services:
	 */
	.register({
		MailService: asClass(MailService).singleton(),
		JWTService: asClass(JWTService).singleton(),
		SmsService: asClass(SmsService).singleton()
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
		ForgotPasswordController: asClass(ForgotPasswordController).singleton(),
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
		AuthRequest: asClass(AuthRequest).singleton(),
		ForgotPasswordRequest: asClass(ForgotPasswordRequest).singleton(),
		UsersRequest: asClass(UsersRequest).singleton()
	})

	/*
	 * Repositories:
	 */
	.register({
		ForgotPasswordRepository: asClass(ForgotPasswordRepository).singleton(),
		UsersRepository: asClass(UsersRepository).singleton(),
		TokenBlackListRepository: asClass(TokenBlackListRepository).singleton()
	})

	/*
	 * DTOS:
	 */
	.register({
		ForgotPasswordDto: asClass(ForgotPasswordDto).singleton(),
		UsersDto: asClass(UsersDto).singleton(),
		TokenBlackListDto: asClass(TokenBlackListDto).singleton()
	})

module.exports = container
