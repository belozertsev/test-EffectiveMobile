const historyController = require('./historyController')
const db = require('../database/pool')

const sanitizeCredentials = ({ username, password, email }) => {
	return { username: username.toLowerCase().replaceAll(' ', ''), password, email }
}

const isEmailValid = (email) => {
	const emailRegexp = /\S+@\S+\.\S+/
	return emailRegexp.test(email)
}

const select = async (req, res) => {
	const result = await db.query('SELECT id, username FROM users')
	res.status(200).json({ users: result.rows })
}

const create = async (req, res) => {
	try {
		const { email, username, password } = sanitizeCredentials({ email: req.body.email, username: req.body.username, password: req.body.password })
		if (!isEmailValid(email)) return res.status(400).json({ message: 'Email не соответсвует регулярному выражению' })

		const queryString = 'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id, username'
		const result = await db.query(queryString, [email, username, password])

		if (result.rowCount === 1) {
			res.status(201).json({ username: result.rows })
			historyController.send(result.rows[0].id, 'user creation', 'null', result.rows[0].username)
		}
		else res.status(400).json({ message: 'Не удалось создать нового пользователя' })

	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Не удалось создать нового пользователя' })
	}
}

const update = async (req, res) => {
	try {
		const { email, username, password } = req.body
		if (!(email && username && password)) return res.status(403).json({ message: 'Тело запроса должно содержать поля email, username, password' })

		const { new_username, new_password } = req.body
		if (!(new_username || new_password)) return res.status(403).json({ message: 'Тело запроса должно хотя бы одно из полей {new_username, new_password}' })
		
		const candidate = await db.query('SELECT id, username, password FROM users WHERE email=$1 LIMIT 1', [email])
		if (candidate.rows[0].password !== password) return res.status(403).json({ message: 'Неверные данные для авторизации' })
		
		const result = await db.query('UPDATE users SET username=$1, password=$2 WHERE email=$3', [new_username || username, new_password || password, email])

		if (result.rowCount === 1) {
			res.status(201).json({ message: 'Информация о пользователе обновлена' })
			if (new_username) historyController.send(candidate.rows[0].id, 'username change', candidate.rows[0].username, new_username)
			if (new_password) historyController.send(candidate.rows[0].id, 'password change', candidate.rows[0].password, new_password)
		}
		else res.status(500).json({ message: 'Не удалось обновить данные пользователя' })

	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Internal server error' })
	}
}

module.exports = { select, create, update }
