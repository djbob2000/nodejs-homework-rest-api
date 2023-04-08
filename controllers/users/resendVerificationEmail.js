const CreateError = require("http-errors");
const { User } = require("../../models");
require("dotenv").config();
const { BASE_URL } = process.env;
const sendEmail = require("../../utils/sendEmail");

const resendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(CreateError(400, "missing required field email"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(CreateError(401, "Email not found"));
  }
  if (user.verify) {
    return next(CreateError(400, "Verification has already been passed"));
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
