const Brand = require("../models/Brand");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const createBrand = async (brandBody) => {
  return Brand.create(brandBody);
};
const getBrandById = async (id) => {
  return Brand.findById(id);
};

const getAllBrand = async () => {
  return Brand.find();
};
const deleteBrandById = async (brandId) => {
  return Brand.findByIdAndDelete(brandId);
};

const updateBrand = async (id, brandBody) => {
  const brand = await getBrandById(id);
  if (!brand) throw new ApiError(httpStatus.NOT_FOUND, "Brand not found");
  return Brand.findByIdAndUpdate(id, { $set: brandBody }, { new: true });
};
module.exports = { createBrand, deleteBrandById, updateBrand, getAllBrand };
