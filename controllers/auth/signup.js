const { User } = require('../../models')
const { Conflict } = require('http-errors')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
    // res.status(409).json({
    //   Status: 'Conflict',
    //   code: 409,
    //   message: 'Email in use',
    // })

    // return
  }

  const newUser = new User({ email })
  newUser.setPassword(password)

  await newUser.save()
  res.status(201).json({
    status: 200,
    message: 'Succes register',
  })
}

module.exports = signup
