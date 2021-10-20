const { User } = require('../../models')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const {nanoid} = require("nanoid");
const { sendEmail } = require('../../helpers')


const signup = async (req, res) => {
  const { email, password } = req.body

 
  const user = await User.findOne({ email})
  if (user) {
    throw new Conflict('Email in use')
  }
   const verifyToken = nanoid()

  const newUser = new User({ email , verifyToken})
  newUser.setPassword(password)
  newUser.avatarURL = gravatar.url(email)

  await newUser.save()

  const data = {
    to: email,
    subject: "Подтверждения регистрации на сайте",
    html:`
    <a href="http://localhost:3000/api/auth/users/verify/${verifyToken} target="_blank">Подтвердить почту</a>`

  }

   await sendEmail(data)
  res.status(201).json({
    status: 200,
    message: 'Succes register',
    data: {
      verifyToken,
    },
  })
}

module.exports = signup
