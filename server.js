const fastify = require('fastify')()
const gameChatRoutes = require('./src/routes/gameChat')
const privateChatRoutes = require('./src/routes/privateChat')

fastify.register(require('@fastify/websocket'), {
	options: { clientTracking: true },
})

fastify.register(gameChatRoutes) // /gameChat/gameId
fastify.register(privateChatRoutes) // /privateChat/userId

fastify.listen({ port: 3000 }, (err) => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})
