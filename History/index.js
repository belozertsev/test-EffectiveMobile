const config = require('../config')

const express = require('express')
const usersApp = express()

const router = require('./routers/apiRouter')
const authMiddleware = require('./middlewares/authMiddleware')

usersApp.use(express.json())
usersApp.use('/api', authMiddleware, router)
usersApp.get('/', (req, res) => res.json({ service: 'History', message: 'redirect your request to /api' }))

usersApp.listen(config.HISTORY_SERVICE_PORT, () => console.log('History service started on port: ' + config.HISTORY_SERVICE_PORT))
