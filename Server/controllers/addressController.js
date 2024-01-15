// const { response } = require("express");
const Address = require("../models/Address");
const userService = require("../services/userServices");
const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");

const addAddress = catchAsync(async (req, res) => {
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

  const addressUser = await Address.findOne({ userId: id });

  if (!addressUser) {
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

const editAddress = catchAsync(async (req, res) => {
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

  //
  const { id } = req.user;
  let addr = await Address.findOne({ userId: id }).populate("address");

  if (addr) {
    var addrIndex = addr?.address.findIndex(
      (address) => address._id == addressId
    );

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
    Address.updateMany(
      { userId: id },
      { $set: { "address.$[elem].isDefault": false } },
      {
        arrayFilters: [
          { "elem._id": { $ne: mongoose.Types.ObjectId(addressId) } },
        ],
      }
    )
      .then(async (result) => {})
      .catch((error) => {
        console.error(error);
        return res.status(400).send({ error });
      });
  }
  const savedAddr = await addr.save();

  // res.send(addr?.address[addrIndex]);
  res.send(savedAddr);
});

const getAddress = catchAsync(async (req, res) => {
  const { id } = req.user;
  const addr = await Address.findOne({ userId: id }).populate("address");
  //
  res.send(addr);
});

const deleteAddress = catchAsync(async (req, res) => {
  const { addressId } = req.body;

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

module.exports = { addAddress, editAddress, getAddress, deleteAddress };
