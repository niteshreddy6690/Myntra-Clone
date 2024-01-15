import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import NavBarForCartAndPayment from "../components/Navbar/NavBarForCartAndPayment";
import { useSelector, useDispatch } from "react-redux";
import { request } from "../api/axios";
import { fetchCartItems } from "../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import styled from "styled-components";

import {
  fetchUserAddress,
  addNewUserAddress,
} from "../redux/features/address/addressSlice";
import AddAddressModal from "./My/Modals/AddAddressModal";
import EditAddressModal from "./My/Modals/EditAddressModal";
import { isFulfilled } from "@reduxjs/toolkit";

const AddressContainer = styled.div`
  box-sizing: border-box;
  max-width: 980px;
  padding: 0 24px;
  display: flex;
  justify-content: flex-start;
  min-width: 400px;
  @media screen and (max-width: 796px) {
    width: 100%;
    display: block;
    padding: 24px;
  }
`;

const AddressLeftSection = styled.div`
  width: 67.5%;
  vertical-align: top;
  padding-right: 35px;
  padding-top: 12px;
  @media screen and (max-width: 796px) {
    width: 100%;
    padding: 12px 0 0 0;
  }

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

  .addressInnerBlock .addressBlock-base-btns {
    position: relative;
    margin: 16px 0;
  }
  .addressInnerBlock .addressBlock-base-btns button {
    border: 1px solid black;
    padding: 5px 10px;
  }
  .addressInnerBlock .addressBlock-base-btns-none {
    display: none;
  }
  .addressInnerBlock .addressBlock-base-btns .addressBlock-base-remove {
    color: #282c3f;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.5px;
    background: transparent;
    cursor: pointer;
    border: 1px solid #282c3f;
    border-radius: 4px;
    padding: 6.5px 16px;
  }

  .addressInnerBlock .addressBlock-base-btns .addressBlock-base-edit {
    color: #282c3f;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.5px;
    background: transparent;
    cursor: pointer;
    border: 1px solid #282c3f;
    border-radius: 4px;
    padding: 6.5px 16px;
    margin-left: 16px;
  }
  .bottom-add-newAddress {
    width: 100%;
    border: 1px dashed #d4d5d9;
    box-shadow: 0 0 4px rgba(40, 44, 63, 0.08);
    cursor: pointer;
  }
  .bottom-add-newAddress .addNewAddress-text {
    padding: 15px 25px;
    font-size: 16px;
    font-weight: 700;
    color: #ff3f6c;
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
  position: relative;
  @media screen and (max-width: 796px) {
    margin: 0;
    width: 100%;
    display: block;
  }
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
    margin: 30px 0px;
    padding: 12px 0 0 0;
    background-color: #fff;
    text-transform: uppercase;

    @media screen and (max-width: 796px) {
      margin: 0;
      width: 100%;
      position: sticky;
      bottom: 0;
      left: 0;
    }
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

  const today = new Date();
  const weekFromNow = new Date();
  weekFromNow.setDate(today.getDate() + 7);

  const { isLoading, isError, userAddresses, userAddress } = useSelector(
    (state) => ({
      ...state.address,
    })
  );

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedAddress, setEditedAddress] = useState({});
  const [currentAddr, setCurrentAddr] = useState(0);

  const [prices, setPrices] = useState({
    actualTotal: 0,
    totalMRP: 0,
    discountedMRP: 0,
  });

  const dispatch = useDispatch();

  const getCart = async () => {
    try {
      dispatch(fetchCartItems());
      dispatch(fetchUserAddress());
    } catch (error) {}
  };

  useEffect(() => {
    getCart();
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

  const addAddrApiCall = async (addAddress) => {
    const action = await dispatch(addNewUserAddress({ addAddress }));
    if (isFulfilled(action)) {
      setShowAddAddressModal((showAddAddressModal) => !showAddAddressModal);
    }
  };

  useEffect(() => {
    setSelectedAddress(defaultAddr ? defaultAddr[0]?._id : null);
  }, [defaultAddr]);

  const orderItems = useMemo(
    () =>
      cartItems?.cart?.items?.map((item) => {
        return {
          productId: item?.productId._id,
          payablePrice: item?.productId.price,
          purchasedQty: item?.quantity,
          selectedSize: item?.size,
        };
      }),
    [cartItems]
  );

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

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await request.post("/payment/orders", {
      amount: prices.totalMRP,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

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

        const result = await request.post("payment/verify", data);
        if (result) {
          const orderCreated = await request.post("/order/addOrder", {
            addressId: selectedAddress,
            totalAmount: prices?.totalMRP,
            items: orderItems,
            paymentStatus: "completed",
            paymentId: result?.paymentId,
          });

          if (orderCreated) navigate("/my/orders");
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

  const handleClick = (index) => {
    setCurrentAddr(index);
  };

  const handleClickAddress = (id) => {
    setSelectedAddress(id);
  };

  const handleShowEditModal = () => {
    setShowEditModal(!showEditModal);
  };
  const handleSetEditAddress = (addr) => {
    setEditedAddress({
      addressId: addr?._id,
      name: addr?.name,
      mobileNumber: addr?.mobileNumber,
      pinCode: addr?.pinCode,
      locality: addr?.locality,
      streetAddress: addr?.streetAddress,
      city: addr?.city,
      state: addr?.state,
      landmark: addr?.landmark,
      addressType: addr?.addressType,
      isDefault: addr?.isDefault,
    });
  };

  const callEditApi = async (data) => {
    const myAddress = await request.put("address/edit", data);
    if (myAddress) {
      handleShowEditModal();
      getCart();
    }
  };
  const callDeleteApi = async () => {
    const deletedAddress = await request.put("address/", {
      addressId: selectedAddress,
    });
    if (deletedAddress) {
      getCart();
    }
  };
  const handleShowAddAddressModal = () => {
    setShowAddAddressModal(!showAddAddressModal);
  };
  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }
  if (cartItems?.cart?.items <= 0 || !cartItems) {
    return navigate("/");
  }

  return (
    <div>
      <NavBarForCartAndPayment />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AddressContainer>
          <AddressLeftSection>
            <div className="addressList-base-titleContainer">
              <div className="addressList-base-title">
                Select Delivery Address
              </div>
              <div
                className="addressList-base-addAddressButton"
                onClick={handleShowAddAddressModal}
              >
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
                        onClick={() => {
                          handleClickAddress(addr?._id);
                          handleClick(index);
                        }}
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
                            <div
                              className={
                                currentAddr == index
                                  ? "addressBlock-base-btns"
                                  : "addressBlock-base-btns-none"
                              }
                            >
                              {" "}
                              <button
                                className="addressBlock-base-remove"
                                onClick={callDeleteApi}
                              >
                                Remove
                              </button>{" "}
                              <button
                                className="addressBlock-base-edit"
                                onClick={() => {
                                  handleShowEditModal();
                                  handleSetEditAddress(addr);
                                }}
                              >
                                Edit
                              </button>
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
                        onClick={() => {
                          handleClickAddress(addr?._id);
                          handleClick(index + 1);
                        }}
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
                            <div
                              className={
                                currentAddr == index + 1
                                  ? "addressBlock-base-btns"
                                  : "addressBlock-base-btns-none"
                              }
                            >
                              {" "}
                              <button
                                className="addressBlock-base-remove"
                                onClick={callDeleteApi}
                              >
                                Remove
                              </button>{" "}
                              <button
                                className="addressBlock-base-edit"
                                onClick={() => {
                                  handleShowEditModal();
                                  handleSetEditAddress(addr);
                                }}
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                : null}
            </>
            <div
              className="bottom-add-newAddress"
              onClick={handleShowAddAddressModal}
            >
              <div className="addNewAddress-text"> + Add New Address</div>
            </div>
          </AddressLeftSection>
          <AddressCenterSection />
          <AddressRightSection>
            <div className="deliveryTitle">Delivery Estimates</div>
            {cartItems?.cart?.items?.map((item, i) => (
              <div className="deliveryItems">
                <img
                  src={item?.productId?.images[0].url}
                  style={{ width: "40px" }}
                  alt={item?.productId?.images[0].url}
                />
                <div className="deliveryTime">
                  {`
                Estimated delivery by  ${moment(
                  today.getTime() +
                    1 +
                    Math.random() * (weekFromNow.getTime() - today.getTime())
                ).format("Do MMM YYYY")}`}
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
                    {prices.discountedMRP > 0
                      ? `-₹${prices.discountedMRP}`
                      : "0"}
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
          {showEditModal && (
            <EditAddressModal
              handleShowEditModal={handleShowEditModal}
              editedAddress={editedAddress}
              callEditApi={callEditApi}
            />
          )}
          {showAddAddressModal && (
            <AddAddressModal
              handleShowAddAddressModal={handleShowAddAddressModal}
              addAddrApiCall={addAddrApiCall}
            />
          )}
        </AddressContainer>
      </div>
    </div>
  );
};

export default Checkout;
