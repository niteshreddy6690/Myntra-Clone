// const { response } = require("express");
const Address = require("../models/Address");
const userService = require("../services/userServices");
const catchAsync = require("../utils/catchAsync");

exports.addAddress = catchAsync(async (req, res) => {
  const {
    name,
    mobileNumber,
    pinCode,
    locality,
    streetAddress,
    city,
    state,
    landmark,
    addressType,
    isDefault,
  } = req.body;

  const { id } = req.user;

  const user = await userService.getUserById(id);
  console.log("user", user);

  const addressUser = await Address.findOne({ user: id });
  console.log("addressUser", addressUser);

  if (!addressUser) {
    console.log("user exist with no address");
    const addressData = new Address({
      userId: user.id,
      address: [
        {
          name,
          mobileNumber,
          pinCode,
          locality,
          streetAddress,
          city,
          state,
          landmark,
          addressType,
          isDefault,
        },
      ],
    });
    const address_data = await addressData.save();
    res.status(200).json({ addressData: address_data });
  } else {
    console.log("user exist with address");
    addressUser.address.push({
      name,
      mobileNumber,
      pinCode,
      locality,
      streetAddress,
      city,
      state,
      landmark,
      addressType,
      isDefault,
    });
    const address_data = await addressUser.save();
    res.status(200).json({ addressData: address_data });
  }
});

exports.editAddress = catchAsync(async (req, res) => {
  const {
    addressId,
    name,
    mobileNumber,
    pinCode,
    locality,
    streetAddress,
    addressType,
    city,
    state,
    landmark,
    isDefault,
  } = req.body;
  const { id } = req.user;
  let addr = await Address.findOne({ userId: id }).populate("address");
  if (addr) {
    var addrIndex = addr?.address.findIndex(
      (address) => address._id == addressId
    );
    console.log("itemIndex", addrIndex);

    if (addrIndex !== -1) {
      addr.address[addrIndex].name = name;
      addr.address[addrIndex].mobileNumber = mobileNumber;
      addr.address[addrIndex].pinCode = pinCode;
      addr.address[addrIndex].locality = locality;
      addr.address[addrIndex].streetAddress = streetAddress;
      addr.address[addrIndex].city = city;
      addr.address[addrIndex].state = state;
      addr.address[addrIndex].addressType = addressType;
      addr.address[addrIndex].landmark = landmark;
      addr.address[addrIndex].isDefault = isDefault;
    }
  }
  const savedAddr = await addr.save();
  console.log("address", addr?.address);
  res.send(addr?.address[addrIndex]);
});
