const { DatabaseSync } = require('node:sqlite')
const path = require('path')

const DB_PATH = path.join(__dirname, '..', '..', 'database.db')

const openDatabase = () => {
	const db = new DatabaseSync(DB_PATH)

	db.exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL UNIQUE,
			password TEXT NOT NULL,
			email TEXT NOT NULL UNIQUE,
			firstName TEXT NOT NULL,
			lastName TEXT NOT NULL
		)
	`)

	return db
}

module.exports = openDatabase
