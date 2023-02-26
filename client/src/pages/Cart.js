import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import CartCmp from "../components/Cart/CartCmp";
import { useSelector, useDispatch } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItems,
  removeCartItem,
} from "../redux/features/cart/cartSlice";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { isLoading, isError, cartItems, cartItem } = useSelector((state) => ({
    ...state.cart,
  }));
  // const [cartItems, setCartItems] = useState([]);
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
    dispatch(removeCartItem({ productId, toast }));
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

        // const cartProducts = await axios.get(
        //   "http://localhost:8080/api/carts/"
        // );

        // console.log(cartProducts?.data?.cart?.items);

        console.log("cartite", cartItems);
        // setCartItems(cartItems?.data?.cart?.items);
      } catch (error) {
        console.log(error);
      }
    };
    getCart();

    console.log("cart Products", cartItems);
  }, [deleteProduct, updatedSizes]);

  useEffect(() => {
    if (cartItem) {
      setPrices({
        actualTotal: cartItems?.actualTotal,
        totalMRP: cartItems?.totalMRP,
        discountedMRP: cartItems?.discountedMRP,
      });
    }
  }, [cartItems]);
  return (
    <div>
      <Navbar />
      <ToastContainer
        style={{ position: "absolute", top: "90px", right: "0px" }}
        toastStyle={{
          backgroundColor: "#171830",
          width: "250px",
          height: "20px",
          color: "white",
          zIndex: "100",
        }}
      />

      {isLoading ? (
        <LoadingSpinner loading={isLoading} />
      ) : (
        <CartCmp
          disableSizeModal={disableSizeModal}
          products={cartItems}
          prices={prices}
          handelDelete={handelDelete}
          handelUpdateSizeAndQuantity={handelUpdateSizeAndQuantity}
        />
      )}
    </div>
  );
};

export default Cart;
