module.exports = (req, res, next) => {
	// Здесь может быть любая логика проверки авторизации
	if (req.headers.token !== 'access token')
		return res.status(403).json({ error: 'Доступ к сервису запрещен' })

	next()
}
