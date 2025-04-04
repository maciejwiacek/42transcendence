const validateUsername = (username) => {
	return username.length < 3 || username.length > 20
}

const validatePassword = (password) => {
	return (
		password.length < 8 ||
		!/[A-Z]/.test(password) ||
		!/[a-z]/.test(password) ||
		!/[0-9]/.test(password) ||
		!/[!@#$%^&*]/.test(password)
	)
}

const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return !emailRegex.test(email)
}

const validateDuplicates = (username, email, db) => {
	const checkUser = db
		.prepare(`SELECT * FROM users WHERE username = ? OR email = ?`)
		.get(username, email)

	return checkUser
}

const validateUserCredentials = (username, password, email, db) => {
	if (validateUsername(username)) {
		return {
			success: false,
			message: 'Username must be between 3 and 20 characters',
		}
	}

	if (validatePassword(password)) {
		return {
			success: false,
			message:
				'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
		}
	}

	if (validateEmail(email)) {
		return {
			success: false,
			message: 'Invalid email format',
		}
	}

	if (validateDuplicates(username, email, db)) {
		return {
			success: false,
			message: 'Username or email already exists',
		}
	}

	return { success: true }
}

module.exports = {
	validateUserCredentials,
}
