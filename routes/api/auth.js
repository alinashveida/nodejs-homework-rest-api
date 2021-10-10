const express = require('express')
const router = express.Router()

const { userJoiSchema } = require('../../models/user')
const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')

router.post(
  '/users/signup',
  validation(userJoiSchema),
  controllerWrapper(ctrl.signup),
)

router.post(
  '/users/login',
  validation(userJoiSchema),
  controllerWrapper(ctrl.login),
)

router.get('/users/logout', authenticate, controllerWrapper(ctrl.logout))

router.get('/users/current', authenticate, controllerWrapper(ctrl.current))

router.patch(
  'users/avatars',
  authenticate,
  upload.single('avatar'),
  controllerWrapper(ctrl.updateAvatar),
)

module.exports = router
