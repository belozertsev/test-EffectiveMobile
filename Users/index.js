const config = require('../config')

const express = require('express')
const usersApp = express()

const router = require('./routers/apiRouter')

usersApp.use(express.json())
usersApp.use('/api', router)
usersApp.get('/', (req, res) => res.json({service: 'Users', message: 'redirect your request to /api'}))

usersApp.listen(config.USERS_SERVICE_PORT, () => console.log('Users service started on port: ' + config.USERS_SERVICE_PORT))
