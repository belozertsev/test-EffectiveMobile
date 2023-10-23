const config = require("../../config")
const fetch = require('node-fetch')

const send = async (userId, action, old_value, new_value) => {
	const response = await fetch(`http://${config.HISTORY_SERVICE_HOST}:${config.HISTORY_SERVICE_PORT}/api`, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			userId,
			action,
			old_value,
			new_value,
			time_stamp: new Date().toISOString(),

			token: 'access token'
		})
	})
	console.log(await response.json())
}

module.exports = { send }
