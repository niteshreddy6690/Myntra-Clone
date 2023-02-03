const { response } = require("express");
const Address = require("../models/Address");
const userService = require("../services/userServices");
exports.addAddress = async (req, res) => {
  const {
    userId,
    name,
    mobileNumber,
    pinCode,
    locality,
    address,
    cityDistrictTown,
    state,
    landmark,
    alternatePhone,
    addressType,
  } = req.body;

  const { user_Id } = req.body;

  const user = await userService.userById(user_Id);
  console.log("user", user);

  const addressUser = await Address.findOne({ user: user_Id });
  console.log("addressUser", addressUser);

  if (!addressUser) {
    console.log("user exist with no address");
    const addresData = new Address({
      user: user,
      address: [
        {
          name,
          mobileNumber,
          pinCode,
          locality,
          address,
          cityDistrictTown,
          state,
          landmark,
          alternatePhone,
          addressType,
        },
      ],
    });
    const address_data = await addresData.save();
    res.status(200).json({ addressdata: address_data });
  } else {
    console.log("user exist with address");
    addressUser.address.push({
      name,
      mobileNumber,
      pinCode,
      locality,
      address,
      cityDistrictTown,
      state,
      landmark,
      alternatePhone,
      addressType,
    });
    await addressUser.save();
  }
};
