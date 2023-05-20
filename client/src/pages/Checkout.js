import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import NavBarForCartAndPayment from "../components/Navbar/NavBarForCartAndPayment";
import { useSelector, useDispatch } from "react-redux";
import { request } from "../api/axios";
import {
  fetchCartItems,
  removeCartItem,
} from "../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { fetchUserAddress } from "../redux/features/address/addressSlice";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import styled from "styled-components";

const AddressContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto 24px;
  display: flex;
  justify-content: flex-start;
`;

const AddressLeftSection = styled.div`
  width: 67.5%;
  vertical-align: top;
  padding-right: 35px;
  padding-top: 12px;

  .addressList-base-titleContainer {
    margin-bottom: 12px;
    height: 45px;
  }
  .addressList-base-title {
    float: left;
    font-weight: 700;
    color: #282c3f;
    font-size: 18px;
    margin: 12px 0;
  }

  .addressList-base-addAddressButton {
    text-transform: uppercase;
    color: #282c3f;
    float: right;
    font-size: 12px;
    font-weight: 700;
    margin: 7px 0 6px;
    padding: 8px 16px 7px;
    border-radius: 4px;
    border: 1px solid #282c3f;
    cursor: pointer;
  }
  .addressList-base-defaultTitle {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    margin: 12px 0 16px;
    color: #535766;
  }
  .defaultAddressBlock {
    font-size: 12px;
    border: 1px solid #eaeaec;
    margin-bottom: 8px;
    vertical-align: top;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
  }
  .addressBlocks-base-serviceable {
    box-shadow: 0 0 4px rgba(40, 44, 63, 0.2);
  }
  .addressBlocks-base-radioIcon {
    fill: #ff3f6c;
  }
  .addressBlocks-base-radioIconNotSelected {
    fill: #535766;
  }
  svg:not(:root) {
    overflow: hidden;
  }

  .addressBlocks-base-radioIconNotSelected {
    position: absolute;
    left: 20px;
    top: 20px;
  }
  .addressBlocks-base-radioIcon {
    position: absolute;
    left: 20px;
    top: 20px;
  }
  .addressInnerBlock {
    padding: 19px 16px 0 48px;
  }
  .addressDetails-base-desktopAddressTitle {
    display: flex;
    align-items: baseline;
  }
  .addressDetails-base-desktopAddressTitle .addressDetails-base-name {
    font-weight: 700;
    font-size: 14px;
    color: #282c3a;
    text-transform: capitalize;
    word-break: break-all;
  }
  .addressDetails-base-addressType {
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 20px;
    color: #03a685;
    font-weight: 700;
    border: 1px solid #03a685;
    margin-left: 8px;
    line-height: 12px;
    text-transform: uppercase;
  }

  .addressDetails-base-addressField {
    word-break: break-all;
  }
  .addressBlocks-base-addressDetail {
    margin-top: 12px !important;
    font-size: 14px;
  }
  .addressDetails-base-mobile {
    margin: 12px 0 16px;
  }
  input {
    outline: none;
  }
`;

const AddressCenterSection = styled.div`
  border-right: 1px solid #eaeaec;
`;

const AddressRightSection = styled.div`
  margin-left: 20px;
  width: 32.5%;
  vertical-align: top;
  padding-top: 8px;
  .deliveryTitle {
    margin: 20px 0px;
    text-transform: uppercase;
    font-weight: 700;
  }
  .deliveryItems {
    border-bottom: 1px dashed #eaeaec;
    padding-bottom: 12px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
  }
  .deliveryTime {
    margin-left: 25px;
  }

  .priceContainer {
    margin-top: 30px;
    /* text-transform: uppercase; */
  }
  .priceContainer .price-heading {
    text-transform: uppercase;
    font-weight: 700;
  }
  .priceContainer .priceInnerContainer {
    padding: 20px 0px 0px 0px;
  }
  .priceDetail-base-row {
    margin-bottom: 12px;
    line-height: 16px;
    /* font-weight: 600; */
    text-transform: capitalize;
  }
  .priceDetail-base-value {
    float: right;
  }
  .priceDetail-base-discount {
    float: right;
    color: #03a685;
  }
  .priceDetail-base-striked {
    text-decoration: line-through;
  }
  .priceDetail-base-total {
    font-weight: 700;
    font-size: 15px;
    padding-top: 16px;
    border-top: 1px solid #eaeaec;
    color: #3e4152;
    line-height: 16px;
  }
  .addressDesktop-base-continueBtn {
    margin-top: 20px;
  }
  .button-base-button {
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    padding: 10px;
    background: #ff3f6c;
    cursor: pointer;
    text-align: center;
    border: none;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartItem } = useSelector((state) => ({
    ...state.cart,
  }));

  const { isLoading, isError, userAddresses, userAddress } = useSelector(
    (state) => ({
      ...state.address,
    })
  );

  const [selectedAddress, setSelectedAddress] = useState(null);

  console.log(cartItems);
  console.log(userAddresses);
  const [prices, setPrices] = useState({
    actualTotal: 0,
    totalMRP: 0,
    discountedMRP: 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getCart = async () => {
      try {
        dispatch(fetchCartItems());
        dispatch(fetchUserAddress());

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
  }, []);

  useEffect(() => {
    if (cartItem) {
      setPrices({
        actualTotal: cartItems?.actualTotal,
        totalMRP: cartItems?.totalMRP,
        discountedMRP: cartItems?.discountedMRP,
      });
    }
  }, [cartItems]);

  const defaultAddr = useMemo(
    () => userAddresses?.filter((data) => data.isDefault == true),
    [userAddresses]
  );
  const otherAddr = useMemo(
    () => userAddresses?.filter((data) => data.isDefault == false),
    [userAddresses]
  );

  useEffect(() => {
    setSelectedAddress(defaultAddr ? defaultAddr[0]?._id : null);
  }, [defaultAddr]);
  const orderItems = useMemo(
    () =>
      cartItems?.cart?.items.map((item) => {
        return {
          productId: item?.productId._id,
          payablePrice: item?.productId.price,
          purchasedQty: item?.quantity,
          selectedSize: item?.size,
        };
      }),
    [cartItems]
  );
  console.log("Default Address", defaultAddr);
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  //   const initPayment = (data) => {
  //     const options = {
  //       key: "YOUR_RAZORPAY_KEY",
  //       amount: data.amount,
  //       currency: data.currency,
  //       name: "nitesh S",
  //       description: "Test Transaction",
  //       order_id: data.id,
  //       handler: async (response) => {
  //         try {
  //           const verifyUrl = "http://localhost:8080/api/payment/verify";
  //           const { data } = await axios.post(verifyUrl, response);
  //           console.log(data);
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       },
  //     };
  //     const rzp1 = new window.Razorpay(options);
  //     rzp1.open();
  //   };

  //   const handlePayment = async () => {
  //     try {
  //       const res = await loadScript(
  //         "https://checkout.razorpay.com/v1/checkout.js"
  //       );

  //       if (!res) {
  //         alert("Razorpay SDK failed to load. Are you online?");
  //         return;
  //       }

  //       const orderUrl = "http://localhost:8080/api/payment/orders";
  //       const { data } = await axios.post(orderUrl, { amount: 2000 });
  //       console.log(data);
  //       initPayment(data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(
      "http://localhost:8080/api/payment/orders",
      { amount: prices.totalMRP }
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    console.log("result.data", result.data.data);
    const { amount, id: order_id, currency } = result.data.data;

    const options = {
      key: "rzp_test_AgwP7BCvtP0uGq", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Myntra Clone",
      description: "Test Transaction",
      order_id: order_id,
      prefill: {
        name: "Myntra Clone",
        email: "myntraClone@example.com",
        contact: "9999999999",
      },
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:8080/api/payment/verify",
          data
        );
        console.log("result", result);
        if (result) {
          const createdOrder = await request.post(
            "http://localhost:8080/api/order/addOrder",
            {
              addressId: selectedAddress,
              totalAmount: prices?.totalMRP,
              items: orderItems,
              paymentStatus: "completed",
              paymentId: result?.paymentId,
            }
          );
          console.log("createdOrder", createdOrder);
        }

        // alert(result.data.msg);
      },
      notes: {
        address: "Myntra Clone payments office Dummy",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const handleClickAddress = (id) => {
    setSelectedAddress(id);
  };
  console.log("selectedAddress", selectedAddress);

  if (cartItems?.cart?.items <= 0 || !cartItems) {
    return navigate("/");
  }
  return (
    <div>
      <NavBarForCartAndPayment />
      <AddressContainer>
        <AddressLeftSection>
          <div className="addressList-base-titleContainer">
            <div className="addressList-base-title">
              Select Delivery Address
            </div>
            <div className="addressList-base-addAddressButton">
              Add New Address
            </div>
          </div>
          <div>
            {defaultAddr?.length > 0
              ? defaultAddr?.map((addr, index) => (
                  <>
                    <div className="addressList-base-defaultTitle">
                      Default Address
                    </div>
                    <div
                      className="defaultAddressBlock"
                      onClick={() => handleClickAddress(addr?._id)}
                    >
                      <div className="addressInnerBlock">
                        {Boolean(selectedAddress == addr?._id) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            className="addressBlocks-base-radioIcon"
                          >
                            <g fillRule="evenodd">
                              <path d="M8 14.933A6.941 6.941 0 0 1 1.067 8 6.941 6.941 0 0 1 8 1.067 6.941 6.941 0 0 1 14.933 8 6.941 6.941 0 0 1 8 14.933M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8"></path>
                              <path d="M8 3.429a4.571 4.571 0 1 0 0 9.143 4.571 4.571 0 0 0 0-9.143"></path>
                            </g>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            className="addressBlocks-base-radioIconNotSelected"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 14.933A6.941 6.941 0 0 1 1.067 8 6.941 6.941 0 0 1 8 1.067 6.941 6.941 0 0 1 14.933 8 6.941 6.941 0 0 1 8 14.933M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8"
                            ></path>
                          </svg>
                        )}
                        <div htmlFor="defaultAddress">
                          <div className="addressDetails-base-desktopAddressTitle">
                            <div className="addressDetails-base-name">
                              {addr?.name}
                            </div>
                            <div className="addressDetails-base-addressType">
                              {addr?.addressType}
                            </div>
                          </div>
                          <div className="addressBlocks-base-addressDetail">
                            {addr?.streetAddress}
                          </div>
                          <span>{`${addr?.city},${addr?.state} - ${addr?.pinCode}`}</span>
                          <div className="addressDetails-base-mobile">
                            Mobile: <span>{addr?.mobileNumber}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              : null}
          </div>
          <div className="addressList-base-defaultTitle">Other Address</div>
          <>
            {otherAddr?.length > 0
              ? otherAddr?.map((addr, index) => (
                  <>
                    <div
                      className="defaultAddressBlock"
                      onClick={() => handleClickAddress(addr?._id)}
                    >
                      <div className="addressInnerBlock">
                        {Boolean(selectedAddress == addr?._id) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            className="addressBlocks-base-radioIcon"
                          >
                            <g fillRule="evenodd">
                              <path d="M8 14.933A6.941 6.941 0 0 1 1.067 8 6.941 6.941 0 0 1 8 1.067 6.941 6.941 0 0 1 14.933 8 6.941 6.941 0 0 1 8 14.933M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8"></path>
                              <path d="M8 3.429a4.571 4.571 0 1 0 0 9.143 4.571 4.571 0 0 0 0-9.143"></path>
                            </g>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            className="addressBlocks-base-radioIconNotSelected"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 14.933A6.941 6.941 0 0 1 1.067 8 6.941 6.941 0 0 1 8 1.067 6.941 6.941 0 0 1 14.933 8 6.941 6.941 0 0 1 8 14.933M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8"
                            ></path>
                          </svg>
                        )}
                        <div htmlFor="defaultAddress">
                          <div className="addressDetails-base-desktopAddressTitle">
                            <div className="addressDetails-base-name">
                              {addr.name}
                            </div>
                            <div className="addressDetails-base-addressType">
                              {addr.addressType}
                            </div>
                          </div>
                          <div className="addressBlocks-base-addressDetail">
                            {addr.streetAddress}
                          </div>
                          <span>{`${addr.city},${addr.state} - ${addr.pinCode}`}</span>
                          <div className="addressDetails-base-mobile">
                            Mobile: <span>{addr?.mobileNumber}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              : null}
          </>

          {/* <button className="App-link" onClick={displayRazorpay}>
            Pay ₹500
          </button> */}
        </AddressLeftSection>
        <AddressCenterSection />
        <AddressRightSection>
          <div className="deliveryTitle">Delivery Estimates</div>
          {cartItems?.cart?.items?.map((item, i) => (
            <div className="deliveryItems">
              <img src={item?.productId?.images[0]} style={{ width: "40px" }} />
              <div className="deliveryTime">
                Estimated delivery by 20 june 2023
              </div>
            </div>
          ))}

          <div className="priceContainer">
            <div className="price-heading">{`PRICE DETAILS (${cartItems?.cart?.items?.length} Items)`}</div>
            <div className="priceInnerContainer">
              <div className="priceDetail-base-row">
                <span>Total MRP </span>
                <span className="priceDetail-base-value">
                  ₹{prices?.actualTotal}
                </span>
              </div>
              <div className="priceDetail-base-row">
                <span>Discount on MRP</span>
                <span className="priceDetail-base-discount">
                  {prices.discountedMRP > 0 ? `-₹${prices.discountedMRP}` : "0"}
                </span>
              </div>
              <div className="priceDetail-base-row">
                <span>Convenience Fee</span>
                <span className="priceDetail-base-value">
                  <span className="priceDetail-base-striked">₹99</span>
                  <span className="priceDetail-base-discount">FREE</span>
                </span>
              </div>
              <div className="priceDetail-base-total">
                <span>Total Amount</span>
                <div className="priceDetail-base-value">
                  ₹{prices?.totalMRP}
                </div>
              </div>
            </div>
            <div
              className="addressDesktop-base-continueBtn"
              onClick={displayRazorpay}
            >
              <div className="button-base-button">Continue</div>
            </div>
          </div>
        </AddressRightSection>
      </AddressContainer>
    </div>
  );
};

export default Checkout;
