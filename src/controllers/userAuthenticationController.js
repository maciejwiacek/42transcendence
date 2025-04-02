const openDatabase = require('../models/database')
const {
	validateUserCredentials,
} = require('../services/userAuthenticationServices')
const Password = require('../services/passwordService')
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
		return res.status(200).send({ success, message, user })
	} else {
		return res.status(400).send({ success, message })
	}
}

module.exports = {
	registrationHandler,
	loginHandler,
}
