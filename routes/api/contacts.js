const express = require('express')
const router = express.Router()

const { contacts: ctrl } = require('../../controllers')
const { controllerWrapper, validation } = require('../../middlewares')
const { contactJoiSchema } = require('../../shemas')

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:id', controllerWrapper(ctrl.getById))

router.post('/', validation(contactJoiSchema), controllerWrapper(ctrl.add))

router.delete('/:id', controllerWrapper(ctrl.removeById))

router.put(
  '/:id',
  validation(contactJoiSchema),
  controllerWrapper(ctrl.updateById),
)

module.exports = router
