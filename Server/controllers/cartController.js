const cartService = require("../services/cartServices");
const Product = require("../models/Product");

const addItemToCart = async (req, res) => {
  const userId = req.user.id;

  const { productId, size, quantity = 1, gId } = req.body;

  try {
    let cart = await cartService.cart(userId);
    let productDetails = await Product.findById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid request",
      });
    }
    //--If Cart Exists ----
    if (cart) {
      //---- check if index exists ----
      const indexFound = cart.items.findIndex(
        (item) => item.productId.id == productId && item.size == size
      );

      //------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
      if (indexFound !== -1 && quantity <= 0) {
        cart.items.splice(indexFound, 1);
        if (cart.items.length == 0) {
          // cart.subTotal = 0;
        } else {
          cart.subTotal = cart.items
            .map((item) => item.total)
            .reduce((acc, next) => acc + next);
        }
      }
      //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
      else if (indexFound !== -1) {
        const sameSize = cart.items[indexFound].size == size;
        if (sameSize) {
          cart.items[indexFound].quantity =
            cart.items[indexFound].quantity + quantity;
          // cart.items[indexFound].total =
          //   cart.items[indexFound].quantity * productDetails.price;
          cart.items[indexFound].price = productDetails.price;
          //
        } else {
          cart.items.push({
            productId: productId,
            quantity: quantity,
            size: size,
          });
        }
      }
      //----Check if Quantity is Greater than 0 then add item to items Array ----
      else if (quantity > 0) {
        cart.items.push({
          productId: productId,
          quantity: quantity,
          size: size,
        });
      }
      //----if quantity of price is 0 throw the error -------
      else {
        return res.status(400).json({
          type: "Invalid",
          msg: "Invalid request",
        });
      }
      let data = await cart.save();
      res.status(200).json({ data, productDetails });
    }
    //------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
    else {
      const cartData = {
        user: userId,
        items: [
          {
            productId: productId,
            quantity: quantity,
            size: size,
          },
        ],
      };
      cart = await cartService.addItem(cartData);
      let data = await cart.save();
      res.json(data);
    }
  } catch (err) {
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      err: err,
    });
  }
};

const getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    let cart = await cartService.cart(userId);
    if (!cart) {
      return res.status(400).json({
        type: "Invalid",
        msg: "Cart Not Found",
      });
    }
    const totalMRP = cart.items.reduce((preValue, currentValue) => {
      return Math.round(
        preValue + currentValue?.productId?.mrp * currentValue?.quantity
      );
    }, 0);
    let actualTotal = cart.items.reduce((preValue, currentValue) => {
      return Math.round(
        preValue + currentValue.productId.price * currentValue.quantity
      );
    }, 0);
    const discountedMRP = Math.round(actualTotal - totalMRP);
    res.status(200).json({ cart, totalMRP, actualTotal, discountedMRP });
  } catch (err) {
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      err: err,
    });
  }
};

const emptyCart = async (req, res) => {
  try {
    let cart = await cartRepository.cart();
    cart.items = [];
    let data = await cart.save();
    res.status(200).json({
      type: "success",
      mgs: "Cart Has been emptied",
      data: data,
    });
    z;
  } catch (err) {
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      err: err,
    });
  }
};

const deleteItemInCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  let cart = await cartService.cart(userId);
  try {
    const itemIndex = cart.items.findIndex((item) => item.id == productId);
    var deletedProduct;
    if (itemIndex >= 0) {
      deletedProduct = cart.items[itemIndex];
      cart.items.splice(itemIndex, 1);
      cart = await cart.save();
      if (cart.items.length > 0) {
        let deletedCart = await cartService.cart(cart.id);
      }
    } else {
    }
  } catch (err) {}

  res.status(200).json({ deletedProduct });
};

const updateCartItemSizeAndQuantity = async (req, res) => {
  const { productId, selectedSize, productGId, productQnt } = req.body;
  const userId = req.user.id;
  var cart = await cartService.cart(userId);

  try {
    if (cart) {
      const CartProductItemIndex = cart.items.findIndex(
        (item) => item.id == productGId
      );
      if (selectedSize) {
        const indexFoundForSameSelectedSize = cart.items.findIndex(
          (item) => item.productId.id == productId && item.size == selectedSize
        );
        if (
          indexFoundForSameSelectedSize > -1 &&
          CartProductItemIndex > -1 &&
          CartProductItemIndex != indexFoundForSameSelectedSize
        ) {
          cart.items[indexFoundForSameSelectedSize].size = selectedSize;
          cart.items[indexFoundForSameSelectedSize].quantity =
            cart.items[CartProductItemIndex].quantity +
            cart.items[indexFoundForSameSelectedSize].quantity;
          cart.items.splice(CartProductItemIndex, 1);
        } else {
          cart.items[CartProductItemIndex].size = selectedSize;
        }
      }

      if (productQnt) {
        cart.items[CartProductItemIndex].quantity = productQnt;
      }

      let data = await cart.save();
      res.status(200).json({ data });
    }
  } catch (error) {}
};

module.exports = {
  addItemToCart,
  updateCartItemSizeAndQuantity,
  deleteItemInCart,
  emptyCart,
  getCart,
};
