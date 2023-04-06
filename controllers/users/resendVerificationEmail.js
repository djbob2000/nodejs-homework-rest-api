const { Unauthorized } = require("http-errors");
const { User } = require("../../models");
require("dotenv").config();
const { BASE_URL } = process.env;
const sendEmail = require("../../utils/sendEmail");

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Email not found");
  }
  if (user.verify) {
    throw new Unauthorized("Email already verified");
  }
  const verifyEmail = {
    to: email,
    subject: "Verification email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Verify my e-mail</a>`,
  };

  await sendEmail(verifyEmail);
  res.json({ message: "Successfully resubmitted verification email" });
};
module.exports = resendVerificationEmail;
