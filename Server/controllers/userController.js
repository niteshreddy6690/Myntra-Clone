const userService = require("../services/userServices");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const getUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }
  res.status(httpStatus.OK).send(user);
});

const getUserByPhoneNo = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ phonenumber: req.params.id });
  res.status(200).json({
    success: true,
    user,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  if (!users) {
    throw new ApiError(httpStatus.NOT_FOUND, "users not found");
  }
  res.status(httpStatus.OK).send(users);
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.user;
  // console.log("id", id);
  console.log("req.body", req.body);
  const updatedUser = await userService.updateUserById(id, req.body);
  console.log("updatedUser", updatedUser);
  res.status(httpStatus.OK).send(updatedUser);
});
module.exports = {
  getUser,
  getUsers,
  updateUser,
};
