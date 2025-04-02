const userAuthController = require('../controllers/userAuthenticationController')

async function userAuthenticationRoutes(fastify) {
	fastify.post('/register', userAuthController.registrationHandler)
	fastify.post('/login', userAuthController.loginHandler)
}

module.exports = userAuthenticationRoutes
