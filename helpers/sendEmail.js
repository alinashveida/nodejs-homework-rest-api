const sgMail = require("@sendgrid/mail");
require('dotenv').config

const { SENDGRID_KEY } = process.env

sgMail.setApiKey(SENDGRID_KEY)

const sendEmail = async (data) => {
  const email = { ...data, from: 'shvejda_az14@nuwm.edu.ua' }
  await sgMail.send(data)
}



module.exports = sendEmail
