const controller = require('../controllers/apiController')
const router = new require('express').Router()

router.get('/', controller.select)
router.post('/', controller.create)
router.put('/', controller.update)

module.exports = router
