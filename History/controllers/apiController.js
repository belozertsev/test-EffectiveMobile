const config = require('../../config')
const db = require('../database/pool')

const get = async (req, res) => {
	const userId = parseInt(req.query.userId)
	const pageSize = req.query.pageSize || config.HISTORY_SERVICE_PAGE_SIZE
	const page = req.query.page || 1
	const offset = (page - 1) * pageSize

	try {
		const query = `SELECT * FROM events ${userId ? 'WHERE user_id = $3' : ''} ORDER BY time_stamp LIMIT $1 OFFSET $2`
		const result = await db.query(query, userId ? [pageSize, offset, userId] : [pageSize, offset])
		res.json(result.rows)

	} catch (error) {
		console.log(error.message)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

const log = async (req, res) => {
	const { userId, action, old_value, new_value, time_stamp } = req.body
	if (!(userId && action && old_value && new_value && time_stamp))
		return res.status(400).send('Body must containt keys: userId, action, old_value, new_value, time_stamp')

	try {
		if (!['username change', 'password change', 'user creation'].includes(action))
			return res.status(403).json({ message: 'Поле action имеет недопустимое значение' })

		const result = await db.query(
			'INSERT INTO events (user_id, action, old_value, new_value, time_stamp) VALUES ($1, $2, $3, $4, $5)',
			[userId, action, old_value, new_value, time_stamp])

		if (result.rowCount === 1) return res.status(201).json({ message: 'Event is logged' })
		
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

module.exports = { get, log }
