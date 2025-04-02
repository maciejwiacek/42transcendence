const fastify = require('fastify')()
const gameChatRoutes = require('./src/routes/gameChat')
const privateChatRoutes = require('./src/routes/privateChat')
const userAuthenticationRoutes = require('./src/routes/userAuthentication')
const Password = require('./src/services/passwordService')

fastify.register(require('@fastify/websocket'), {
	options: { clientTracking: true },
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
