const Joi = require('joi')

const contactJoiSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.number().min(1).required(),
})

module.exports = contactJoiSchema
