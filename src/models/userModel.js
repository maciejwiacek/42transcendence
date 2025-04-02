const openDatabase = require('./database')
const Password = require('../services/passwordService')
const {
	validateUserCredentials,
} = require('../services/userAuthenticationServices')

class User {
	constructor(username, password, email, firstName, lastName) {
		this.username = username
		this.password = password
		this.email = email
		this.firstName = firstName
		this.lastName = lastName
	}

	async register() {
		const db = openDatabase()

		const isValid = validateUserCredentials(
			this.username,
			this.password,
			this.email,
			db
		)

		if (!isValid.success) {
			return { success: false, message: isValid.message }
		}

		try {
			const hashPassword = await Password.hashPassword(this.password)

			const stmt = db.prepare(
				`INSERT INTO users (username, password, email, firstName, lastName) VALUES (?, ?, ?, ?, ?)`
			)
			stmt.run(
				this.username,
				hashPassword,
				this.email,
				this.firstName,
				this.lastName
			)

			return { success: true, message: 'User registered successfully' }
		} catch (err) {
			return { success: false, message: err }
		} finally {
			db.close()
		}
	}

	static async login(username, password) {
		const db = openDatabase()

		try {
			const stmt = db.prepare(`SELECT * FROM users WHERE username = ?`)
			const user = stmt.get(username)

			if (!user) {
				return { success: false, message: 'User not found' }
			}

			const isValidPassword = await Password.comparePassword(
				password,
				user.password
			)

			if (!isValidPassword) {
				return { success: false, message: 'Invalid password' }
			}

			return { success: true, message: 'Login successful', user }
		} catch (err) {
			return { success: false, message: 'Internal server error' }
		} finally {
			db.close()
		}
	}
}

module.exports = User
