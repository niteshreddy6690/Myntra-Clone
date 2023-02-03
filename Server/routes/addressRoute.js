const Address = require("../models/Address");
const router = require("express").Router();
const addressController = require("../Controllers/addressController");

router.post("/add", addressController.addAddress);

module.exports = router;
