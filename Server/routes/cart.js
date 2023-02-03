// const router = require("express").Router();
// const Cart = require("../models/Cart");
// const Product = require("../models/Product");

// router.post("/add", async (req, res) => {
//   const {
//     quantity = 1,
//     price,
//     brand,
//     description,
//     categories,
//     gender,
//     images,
//     size,
//     discountPercentage,
//   } = req.body;

//   //   63859800151a7545682f4c9d
//   const productId = req.body._id;
//   const userId = "63859800151a7545682f4c9d";
//   try {
//     // const product = await Product.findById(productId);
//     let cart = await Cart.findOne({ userId });
//     if (cart) {
//       //cart exists for user
//       let itemIndex = cart.products.findIndex((p) => p.productId == productId);
//       if (itemIndex > -1) {
//         //product exists in the cart, update the quantity
//         if (quantity == undefined) {
//           quantity = 1;
//         }
//         let productItem = cart.products[itemIndex];
//         productItem.quantity = productItem.quantity + quantity;
//         cart.products[itemIndex] = productItem;
//       } else {
//         //product does not exists in cart, add new item
//         cart.products.push({
//           productId,
//           quantity,
//           price,
//           brand,
//           description,
//           categories,
//           gender,
//           images,
//           size,
//           discountPercentage,
//         });
//       }
//       cart = await cart.save();
//       let total = cart.products.reduce((preValue, currentValue) => {
//         return (
//           preValue +
//           (currentValue.price -
//             currentValue.price * (currentValue.discountPercentage / 100)) *
//             currentValue.quantity
//         );
//       }, 0);
//       console.log(total);
//       return res.status(201).json({ cart, total });
//     } else {
//       //no cart for user, create new cart
//       const newCart = await Cart.create({
//         userId,
//         products: [
//           {
//             productId,
//             quantity,
//             price,
//             brand,
//             description,
//             categories,
//             gender,
//             images,
//             size,
//             discountPercentage,
//           },
//         ],
//       });
//       return res.status(201).send(newCart);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // //GET ALL

// router.get("/", async (req, res) => {
//   try {
//     const carts = await Cart.find();
//     console.log(carts[0].products);

//     let totalMRP = carts[0].products.reduce((preValue, currentValue) => {
//       return Math.round(
//         preValue +
//           (currentValue.price -
//             currentValue.price * (currentValue.discountPercentage / 100)) *
//             currentValue.quantity
//       );
//     }, 0);
//     let actualTotal = carts[0].products.reduce((preValue, currentValue) => {
//       return Math.round(preValue + currentValue.price * currentValue.quantity);
//     }, 0);

//     const discountedMRP = Math.round(actualTotal - totalMRP);
//     console.log("Discounted Price", discountedMRP);
//     console.log("Final Total", totalMRP);
//     // console.log(carts[0].products);
//     res.status(200).json({ carts, actualTotal, totalMRP, discountedMRP });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.post("/delete", async (req, res) => {
//   const { productId } = req.body;
//   const userId = "63859800151a7545682f4c9d";
//   let cart = await Cart.findOne({ userId });
//   try {
//     let itemIndex = cart.products.findIndex((p) => p.productId == productId);
//     var deletedProduct;
//     if (itemIndex >= 0) {
//       deletedProduct = cart.products[itemIndex];
//       cart.products.splice(itemIndex, 1);
//       cart = await cart.save();
//     } else {
//       console.log("no product found");
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   console.log("cart", Cart);
//   console.log("deletedProduct", deletedProduct);

//   res.status(200).json({ deletedProduct });
// });
// module.exports = router;
