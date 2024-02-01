import React, { useEffect, useState } from "react";
import NavBarForCartAndPayment from "../components/Navbar/NavBarForCartAndPayment";
import CartCmp from "../components/Cart/CartCmp";
import { useSelector, useDispatch } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import { request } from "../api/axios";

import {
  fetchCartItems,
  removeCartItem,
  updateSizeAndQuantityOfProductInBag,
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
  };

  const handelUpdateSizeAndQuantity = async (
    productId,
    selectedSize,
    productGId,
    productQnt
  ) => {
    try {
      // const updatedSizeAndQuantity = await request.post(
      //   "/carts/update",
      //   { productId, selectedSize, productGId,productQnt}

      // );
      // if(updatedSizeAndQuantity){
      // getCart()
      // }
      // SetUpdatedSize(updatedSizeAndQuantity.data);

      //
      dispatch(
        updateSizeAndQuantityOfProductInBag({
          productId,
          selectedSize,
          productGId,
          productQnt,
        })
      ).then((res) => {
        getCart();
      });
    } catch (error) {}
  };

  const getCart = async () => {
    try {
      dispatch(fetchCartItems());
    } catch (error) {}
  };
  useEffect(() => {
    getCart();
  }, [dispatch]);

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
      <NavBarForCartAndPayment />
      <ToastContainer
        style={{
          position: "absolute",
          top: "90px",
          right: "0px",
          width: "300px",
          left: "unset",
        }}
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
