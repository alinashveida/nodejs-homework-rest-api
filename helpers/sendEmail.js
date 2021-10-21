const sgMail = require('@sendgrid/mail')
require('dotenv').config

const { SENDGRID_KEY } = process.env
const { MAIL } = process.env

sgMail.setApiKey(SENDGRID_KEY)

const sendEmail = async (data) => {
  const email = { ...data, from: MAIL }
  await sgMail.send(email)
}

module.exports = sendEmail
