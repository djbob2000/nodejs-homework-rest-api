const CreateError = require("http-errors");
const { User } = require("../../models");
require("dotenv").config();
const { BASE_URL } = process.env;
const sendEmail = require("../../utils/sendEmail");

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw CreateError(401, "Email not found");
  }
  if (user.verify) {
    throw CreateError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Verification email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Verify my e-mail</a>`,
  };

  await sendEmail(verifyEmail);
  res.status(200).json({ message: "Verification email sent" });
};
module.exports = resendVerificationEmail;
