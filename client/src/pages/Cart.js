import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import CartCmp from "../components/Cart/CartCmp";
import { useSelector, useDispatch } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems } from "../redux/featuers/cart/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [deleteProduct, SetDeleteProduct] = useState({});
  const [updatedSizes, SetUpdatedSize] = useState(null);
  const [disableSizeModal, setDisableSizeModal] = useState(false);

  const [prices, setPrices] = useState({
    actualTotal: 0,
    totalMRP: 0,
    discountedMRP: 0,
  });

  const dispatch = useDispatch();
  const handelDelete = async (productId) => {
    try {
      const deletedProduct = await axios.post(
        "http://localhost:8080/api/carts/delete",
        { productId }
      );
      SetDeleteProduct(deletedProduct.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // const handelMoveToWishlist = async (id) => {
  //   const res = await axios.post("http://localhost:8080/api/wishlist/");
  //   console.log("result", res);
  // };
  const handelUpdateSizeAndQuantity = async (
    productId,
    selectedSize,
    productGId,
    selectedQuantity
  ) => {
    try {
      console.log("Selected Size in cart Page", selectedSize);
      console.log("Product Id", productId);
      console.log("Product GID", productGId);

      if (selectedSize) {
        const updatedsizeAndQuantity = await axios.post(
          "http://localhost:8080/api/carts/update",
          { productId, selectedSize, productGId }
        );
        SetUpdatedSize(updatedsizeAndQuantity.data);

        console.log(updatedsizeAndQuantity);
      }

      if (selectedQuantity) {
      }
      // setDisableSizeModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  // const handelUpdateQuantity = async (req, res) => {};

  useEffect(() => {
    const getCart = async () => {
      try {
        dispatch(fetchCartItems());
        const cartProducts = await axios.get(
          "http://localhost:8080/api/carts/"
        );

        // console.log(cartProducts?.data?.cart?.items);

        console.log("cartite", cartProducts?.data?.cart?.items);
        setCartItems(cartProducts?.data?.cart?.items);

        setPrices({
          actualTotal: cartProducts?.data?.actualTotal,
          totalMRP: cartProducts?.data?.totalMRP,
          discountedMRP: cartProducts.data.discountedMRP,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getCart();

    console.log("cart Products", cartItems);
  }, [deleteProduct, updatedSizes]);

  return (
    <div>
      <Navbar />
      <CartCmp
        disableSizeModal={disableSizeModal}
        products={cartItems}
        prices={prices}
        handelDelete={handelDelete}
        handelUpdateSizeAndQuantity={handelUpdateSizeAndQuantity}
        // handelSelectSize={handelSelectSize}
      />
    </div>
  );
};

export default Cart;
