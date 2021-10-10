const { User } = require('../../models')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }

  const newUser = new User({ email })
  newUser.setPassword(password)
  newUser.avatarURL = gravatar.url(email)

  await newUser.save()
  res.status(201).json({
    status: 200,
    message: 'Succes register',
  })
}

module.exports = signup
