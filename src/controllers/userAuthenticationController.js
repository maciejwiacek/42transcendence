const User = require('../models/userModel')

const registrationHandler = async (req, res) => {
	const { username, password, email, firstName, lastName } = req.body

	console.log('Registration data:', req.body)
	const user = new User(username, password, email, firstName, lastName)

	const { success, message } = await user.register()

	if (success) {
		return res.status(200).send({ success, message })
	} else {
		return res.status(400).send({ success, message })
	}
}

const loginHandler = async (req, res) => {
	const { username, password } = req.body

	const { success, message, user } = await User.login(username, password)
	if (success) {
		const payload = {
			userId: user.id,
			username: user.username,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		}
		const token = req.jwt.sign(payload, { expiresIn: '1h' })
		res.setCookie('access_token', token, {
			path: '/',
			httpOnly: true,
			secure: true,
		})
		return res.status(200).send({ success, message, user })
	} else {
		return res.status(400).send({ success, message })
	}
}

module.exports = {
	registrationHandler,
	loginHandler,
}
