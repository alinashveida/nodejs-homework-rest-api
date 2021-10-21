// const { User } = require('../../models')
// const { NotFound } = require('http-errors')

// const current = async (req, res) => {
//   const { _id } = req.user
//   const user = await User.findById(_id)

//   if (!user) {
//     throw new NotFound('Not authorized')
//   }

//   res.status(200).json({
//     status: 'succes',
//     code: 200,
//     email: user.email,
//     subscription: user.subscription,
//   })
// }

const current = async (req, res) => {
  const { email, subscription } = req.user
  res.json({
    status: 'success',
    code: 200,
    user: {
      email,
      subscription,
    },
  })
}

module.exports = current
