const { User } = require('../../models')
const { NotFound } = require('http-errors')

const current = async (req, res) => {
  const { _id } = req.user
  const user = await User.findById(_id)

  if (!user) {
    throw new NotFound('Not authorized')
  }

  res.status(200).json({
    status: 'succes',
    code: 200,
    email: user.email,
    subscription: user.subscription,
  })
}

module.exports = current
