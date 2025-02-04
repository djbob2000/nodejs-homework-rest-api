const { User } = require("../../models");
const catchAsync = require("../../utils/catchAsync");

const logout = catchAsync(async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
});

module.exports = logout;
