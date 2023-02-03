const User = require("../models/User");

const ApiError = require("../utils/ApiError");
// exports.userById = async (user_Id) => {
//   const user = await User.findOne({ _id: user_Id });
//   return user;
// };

const getUserById = async (id) => {
  return User.findById(id);
};

const getUserByPhoneNumber = async (phone) => {
  return User.findOne({ phoneNumber: phone });
};
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  const { email, password, name, gender, isExistingUser } = updateBody;
  if (!user) {
    throw new ApiError("404", "User not found");
  }
  if (email) {
    const userEmail = await getUserByEmail(email);

    if (userEmail) {
      throw new ApiError(400, "User Email is Already Exists");
    }
  }

  const DOB = new Date(updateBody.DOB);
  console.log(DOB);
  if (user.phonenumber) {
    Object.assign(user, {
      email,
      password,
      name,
      gender,
      DOB,
      isExistingUser: true,
    });
    await user.save();
    return user;
  }
};
module.exports = {
  getUserById,
  updateUserById,
  getUserByPhoneNumber,
  getUserByEmail,
};
