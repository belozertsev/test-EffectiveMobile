const controller = require('../controllers/apiController')
const router = new require('express').Router()

router.get('/', controller.get)
router.post('/', controller.log)

module.exports = router
