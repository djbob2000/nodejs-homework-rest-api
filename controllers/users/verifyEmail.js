const CreateError = require("http-errors");
const catchAsync = require("../../utils/catchAsync");
const { User } = require("../../models");

const verifyEmail = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw CreateError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({ message: "Verification successful" });
});

module.exports = verifyEmail;
