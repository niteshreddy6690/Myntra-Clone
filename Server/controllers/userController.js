const userService = require("../services/userServices");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const User = require("../models/User");



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
  const updatedUser = await userService.updateUserById(id, req.body);
  res.status(httpStatus.OK).send(updatedUser);
});

const getUserStats = catchAsync(async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: { _id: "$month", total: { $sum: 1 } },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = {
  getUser,
  getUsers,
  updateUser,
  getUserStats,
  getUserByPhoneNo,
};
