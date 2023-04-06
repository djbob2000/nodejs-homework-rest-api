require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { from: EMAIL_FROM, ...data };

  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
