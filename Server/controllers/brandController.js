const Brand = require("../models/Brand");
const brandService = require("../services/brandServices");
const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const createBrand = catchAsync(async (req, res) => {
  req.body.createdBy = req.user.id;
  const brand = await brandService.createBrand(req.body);
  res.status(httpStatus.OK).json(brand);
});
const deleteBrand = catchAsync(async (req, res) => {
  const deletedBrand = await brandService.deleteBrandById(req.params.id);
  res.status(httpStatus.OK).json(deletedBrand);
});

const updateBrand = catchAsync(async (req, res) => {
  const updatedBrandData = await brandService.updateBrand(
    req.params.id,
    req.body
  );
  res.status(httpStatus.OK).json(updatedBrandData);
});
const getAllBrand = catchAsync(async (req, res) => {
  const allBrandData = await brandService.getAllBrand();
  if (!allBrandData) throw new ApiError(httpStatus.NOT_FOUND, "No brand found");
  res.status(httpStatus.OK).json(allBrandData);
});
module.exports = { createBrand, updateBrand, deleteBrand, getAllBrand };
