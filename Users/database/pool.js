const config = require('../../config')
const Pool = require('pg').Pool

const pool = new Pool({
	user: config.USERS_SERVICE_DB_USERNAME,
	password: config.USERS_SERVICE_DB_PASSWORD,
	host: config.USERS_SERVICE_DB_HOST,
	port: config.USERS_SERVICE_DB_PORT,
	database: config.USERS_SERVICE_DB,
	// max: 20,
	// idleTimeoutMillis: 30000,
	// connectionTimeoutMillis: 2000,
})

module.exports = pool
