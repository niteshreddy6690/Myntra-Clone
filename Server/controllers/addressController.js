// const { response } = require("express");
const Address = require("../models/Address");
const userService = require("../services/userServices");
const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");

exports.addAddress = catchAsync(async (req, res) => {
  console.log("Add Address ************************************************");
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
  let address_data;

  const user = await userService.getUserById(id);
  console.log("user", user);

  const addressUser = await Address.findOne({ userId: id });
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
          isDefault: true,
        },
      ],
    });
    address_data = await addressData.save();
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

    if (isDefault) {
      Address.updateMany(
        { userId: id },
        { $set: { "address.$[].isDefault": false } }
      )
        .then(async (result) => {
          console.log(result);
          console.log(`${result.nModified} documents updated`);
          address_data = await addressUser.save();
        })
        .catch((error) => {
          console.error(error);
          return res.status(400).send({ error });
        });
    } else {
      address_data = await addressUser.save();
    }
    // const address_data = await addressUser.save();
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
  console.log("calling  edit address", req.body);
  // console.log("isDefault", isDefault);
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

  if (isDefault) {
    console.log("Inside the default address");
    Address.updateMany(
      { userId: id },
      { $set: { "address.$[elem].isDefault": false } },
      {
        arrayFilters: [
          { "elem._id": { $ne: mongoose.Types.ObjectId(addressId) } },
        ],
      }
    )
      .then(async (result) => {
        if (result.nModified) console.log(result);
        console.log(`${result.nModified} documents updated`);
      })
      .catch((error) => {
        console.error(error);
        return res.status(400).send({ error });
      });
  }
  const savedAddr = await addr.save();
  console.log("address", savedAddr);
  // res.send(addr?.address[addrIndex]);
  res.send(savedAddr);
});

exports.getAddress = catchAsync(async (req, res) => {
  const { id } = req.user;
  const addr = await Address.findOne({ userId: id }).populate("address");
  // console.log(addr);
  res.send(addr);
});

exports.deleteAddress = catchAsync(async (req, res) => {
  const { addressId } = req.body;
  console.log("calling delete", req.body);
  const { id } = req.user;
  const removedAddress = await Address.findOneAndUpdate(
    { userId: id },
    { $pull: { address: { _id: addressId } } },
    { new: true }
  );
  if (!removedAddress)
    return res.status(404).send({ message: "Address not found" });

  res.status(200).send(removedAddress);
});
