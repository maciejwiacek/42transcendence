const fastify = require('fastify')()
const fjwt = require('@fastify/jwt')
const fCookie = require('@fastify/cookie')

const gameChatRoutes = require('./src/routes/gameChat')
const privateChatRoutes = require('./src/routes/privateChat')
const userAuthenticationRoutes = require('./src/routes/userAuthentication')

fastify.register(require('@fastify/websocket'), {
	options: { clientTracking: true },
})

fastify.register(fjwt, { secret: 'supersecret' })

fastify.addHook('preHandler', (req, res, next) => {
	req.jwt = fastify.jwt
	return next()
})

fastify.register(fCookie, {
	secret: 'supersecret',
	hook: 'preHandler',
})

fastify.register(userAuthenticationRoutes) // /register /login /logout
fastify.register(gameChatRoutes) // /gameChat/gameId
fastify.register(privateChatRoutes) // /privateChat/userId

fastify.listen({ port: 3000 }, (err) => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})
