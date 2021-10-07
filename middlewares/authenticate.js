const { User } = require('../models')
const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized1',
    })
    return
  }

  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized2',
    })
    return
  }
  const { SECRET_KEY } = process.env

  try {
    const { _id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(_id)
    if (!user.token) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized3',
      })
      return
    }

    req.user = user

    next()
  } catch (error) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized4',
    })
  }
}

module.exports = authenticate
