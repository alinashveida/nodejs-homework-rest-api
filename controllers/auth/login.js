const { User } = require('../../models/user')
const { BadRequest, NotFound } = require('http-errors')
const jwt = require('jsonwebtoken')

const { SEKRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw new NotFound(`Email ${email} is not found`)
    // res.status(404).json({
    //   status: 'error',
    //   code: 404,
    //   message: `Email ${email} is not found`,
    // })
    // return
  }

  if (!user.comparePassword(password)) {
    throw new BadRequest('Invalid password ')
  }

  const payload = {
    _id: user._id,
  }

  const token = jwt.sign(payload, SEKRET_KEY)
  await User.findByIdAndUpdate(user._id, { token })
  // const token = user.createToken()
  res.json({
    status: 'succes',
    code: 200,
    data: {
      token,
    },
  })
}

module.exports = login
