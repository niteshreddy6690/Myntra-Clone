const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Address = require("../models/Address");
const catchAsync = require("../utils/catchAsync");
const cartService = require("../services/cartServices");

const createOrder = catchAsync(async (req, res) => {
  console.log("calling add order");
  const userId = req.user.id;
  let cart = await cartService.cart(userId);
  console.log("cart", cart);
  if (!cart || cart?.items.length < 1) {
    return res.status(404).send({
      message: "No Products Found in the cart or You have No active Cart",
    });
  }

  const { addressId, totalAmount, items, paymentStatus } = req.body;
  const orderStatus = [
    {
      type: "ordered",
      date: new Date(),
      isCompleted: true,
    },
    // {
    //   type: "packed",
    //   isCompleted: false,
    // },
    // {
    //   type: "shipped",
    //   isCompleted: false,
    // },
    // {
    //   type: "delivered",
    //   isCompleted: false,
    // },
  ];

  console.log("req.body", req.body);
  const order = await Order.create({
    addressId,
    totalAmount,
    items,
    paymentStatus,
    user: userId,
    orderStatus,
  });
  // const createOrder = order.save();
  if (!order) {
    return res.status(400).json({ message: "Failed to create Order" });
  }

  const updatedCart = await Cart.findOneAndUpdate(
    { user: userId, status: "active" },
    { status: "ordered" },
    { new: true }
  );
  if (!updatedCart)
    return res.status(400).json({ message: "Failed to Update Cart" });
  res.status(201).json({ order, updatedCart });

  // const items = cart?.items?.map((item) => {
  //   return {
  //     productId: item.productId._id,
  //     payablePrice: item.productId.price,
  //     purchasedQty: item.quantity,
  //   };
  // });

  // console.log("cart", cart);
});

exports.addOrder = (req, res) => {
  console.log("calling add order");

  // Cart.deleteOne({ user: req.user._id }).exec((error, result) => {
  //   console.log("req.user", req.user);
  //   if (error) return res.status(400).json({ error });
  //   if (result) {
  //     req.body.user = req.user._id;
  //     req.body.orderStatus = [
  //       {
  //         type: "ordered",
  //         date: new Date(),
  //         isCompleted: true,
  //       },
  //       {
  //         type: "packed",
  //         isCompleted: false,
  //       },
  //       {
  //         type: "shipped",
  //         isCompleted: false,
  //       },
  //       {
  //         type: "delivered",
  //         isCompleted: false,
  //       },
  //     ];
  //     const order = new Order(req.body);
  //     order.save((error, order) => {
  //       if (error) return res.status(400).json({ error });
  //       if (order) {
  //         res.status(201).json({ order });
  //       }
  //     });
  //   }
  // });
};

const getOrders = catchAsync(async (req, res) => {
  Order.find({ user: req.user.id })
    .select("_id paymentStatus orderStatus items")
    .populate({
      path: "items.productId",
      model: "Product",
      populate: {
        path: "reviews",
        model: "Review",
      },
    })
    .sort("-updatedAt")
    .exec((error, orders) => {
      if (error) return res.status(400).json({ error });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
});

// exports.getOrder = (req, res) => {
//   Order.findOne({ _id: req.body.orderId })
//     .populate("items.productId", "_id name productPictures")
//     .lean()
//     .exec((error, order) => {
//       if (error) return res.status(400).json({ error });
//       if (order) {
//         Address.findOne({
//           user: req.user._id,
//         }).exec((error, address) => {
//           if (error) return res.status(400).json({ error });
//           order.address = address.address.find(
//             (adr) => adr._id.toString() == order.addressId.toString()
//           );
//           res.status(200).json({
//             order,
//           });
//         });
//       }
//     });
// };

module.exports = { createOrder, getOrders };
