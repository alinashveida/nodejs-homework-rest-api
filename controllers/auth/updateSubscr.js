const { User } = require('../../models')
const { sendSucces } = require('../../helpers')
const { BadRequest } = require('http-errors')

const updateSubscr = async (req, res) => {
  const { _id } = req.user
  const { subscription } = req.body
  if (
    subscription === 'starter' ||
    subscription === 'pro' ||
    subscription === 'business'
  ) {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { subscription },
      {
        new: true,
      },
    )

    sendSucces(res, { updatedUser })
  }

  throw (
    (new BadRequest(`subscription  is not found`),
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `subscription  is not found`,
    }))
  )
}

module.exports = updateSubscr
