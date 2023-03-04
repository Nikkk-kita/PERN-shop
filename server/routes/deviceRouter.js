const { Router } = require('express')
const checkRole = require('../middleware/checkRoleMiddleware')
const DeviceController = require('../controllers/deviceController')

const router = new Router()

router.post('/', checkRole("ADMIN"), DeviceController.create)
router.get('/', DeviceController.getAll)
router.get('/:id', DeviceController.getOne)
router.delete('/:id', checkRole("ADMIN"), DeviceController.deleteOne)


module.exports = router