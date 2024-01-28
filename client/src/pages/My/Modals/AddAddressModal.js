import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { request } from "../../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserAddress,
  addNewUserAddress,
} from "../../../redux/features/address/addressSlice";
// const AddAddressModal = () => {
//   return <div>AddAddressModal</div>;
// };

const AddAddressWrapper = styled.div`
  background: rgba(0, 0, 0, 0.69);
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 11;
`;

const AddAddressContainer = styled.div`
  position: fixed;
  background-color: red;
  text-align: left;
  box-sizing: border-box;
  color: #535766;
  overflow-y: scroll;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 75%;
  transform: translate(-50%, -50%);
  background: #f5f5f6;
  z-index: 20;
  overflow: hidden;

  @media screen and (min-width: 768px) {
    height: 75%;
    width: 450px;
  }
  @media screen and (min-height: 780px) {
    height: 750px;
  }

  .addAddressModal-heading {
    font-weight: 700;
    background: #fff;
    width: 100%;
    padding: 20px;
    text-transform: uppercase;
    border-bottom: 1px solid #d4d5d9;
  }
  .addAddressModal-bodyContainer {
    height: 84%;
    overflow: auto;
  }

  .addressModalCards {
    margin: 10px 0px;
    background-color: white;
    padding: 20px;
    border: 0px;

    @media (min-width: 780px) {
      top: 15%;
      left: 35%;
      height: auto;
      max-width: 450px;
      border-radius: 0px;
      -webkit-box-shadow: 0 0 4px rgba(40, 44, 63, 0.08);
      -moz-box-shadow: 0 0 4px rgba(40, 44, 63, 0.08);
      box-shadow: 0 0 4px rgba(40, 44, 63, 0.08);
      border: 1px solid #eaeaec;
    }
  }

  input {
    outline: none;
    accent-color: #ff3f6c;
    caret-color: #ff3f6c;
  }
  input[type="text"],
  input[type="password"],
  input[type="number"],
  input[type="tel"] {
    width: 100%;
    border: 0px;
    border-bottom: 1px solid #d4d5d9;
    color: #282c3f;
    outline: none;
    padding-bottom: 5px;
    -webkit-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
  .form-group input[type="text"]:focus,
  .form-group input[type="password"]:focus,
  .form-group input[type="number"]:focus,
  .form-group input[type="tel"]:focus {
    border-bottom: 1px solid #14cda8;
  }

  .form-group myInput-error input[type="text"]:focus .myInput-error,
  .form-group input[type="password"]:focus .myInput-error,
  .form-group input[type="number"]:focus .myInput-error,
  .form-group input[type="tel"]:focus .myInput-error {
    border-bottom: 1px solid #ff5a5a;
  }

  /* input[type="text"] {
    width: 100%;
    border: 0px;
    border-bottom: 1px solid #d4d5d9;
    color: #282c3f;
    outline: none;
    padding-bottom: 5px;
    -webkit-transition: all 0.4s ease-in-out;
  } */

  .form-group {
    margin: 30px 0px 0px 0px;
    position: relative;
  }
  .form-group .placeholderAlternative {
    color: #94969f;
    top: 0;
    left: 0;
    font-size: 15px;
    position: absolute;
    pointer-events: none;
  }

  .form-group input:focus ~ .placeholderAlternative {
    transition: 0.5s;
    top: -15px;
    /* background-color: #fff; */
    padding: 0 2px;
    font-size: 12px;
    color: #282c3f;
    position: absolute;
    color: #14cda8;
  }

  input:not([value=""]) ~ .placeholderAlternative {
    transition: 0.2s;
    top: -15px;
    background-color: #fff;
    padding: 0 2px;
    font-size: 12px;
    color: #282c3f;
    position: absolute;
  }
  .myInput-error {
    /* visibility: hidden; */
    margin: 2px 0px 0px 0px;
    color: #ff5a5a;
    font-size: 12px;
  }
  .addAddressModal-horizontalSeparator {
    height: 1px;
    border-top: 1px solid #eaeaec;
    width: 100%;
    margin: 16px 0 16px;
  }
  .addAddress-buttonContainer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: white;
  }
  .addAddress-buttons {
    cursor: pointer;
    text-align: center;
    display: inline-block;
    width: 50%;
    padding: 15px;
    text-transform: uppercase;
    font-weight: 700;
    border: 1px solid #eaeaec;
  }

  .addAddress-buttons:nth-child(2) {
    background-color: #ff3f6c;
    color: white;
  }
`;
const AddAddressModal = ({
  handleShowAddAddressModal,
  addAddrApiCall,
  callApi,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    getValues,
    watch,
  } = useForm({
    mode: "all",
  });

  const [addAddress, setAddAddress] = useState({});
  const dispatch = useDispatch();

  const handleChangeEditAddress = (e) => {
    // e.persist();
    const { name, value, type, checked } = e.target;
    setAddAddress((prev) => {
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const onSubmit = (data) => {
    // console.log("data: ", data);
    addAddrApiCall(data);
  };

  const name = watch("name");
  const mobileNumber = watch("mobileNumber");

  // const addAddrApiCall = async () => {
  //
  //   dispatch(addNewUserAddress({ addAddress }));

  //   // const myAddress = await request.post("/address/add", addAddress);

  //   // if (myAddress) {
  //   //   handleShowAddAddressModal();
  //   //   callApi();
  //   // }
  // };
  return (
    <>
      <AddAddressWrapper onClick={handleShowAddAddressModal} />
      <AddAddressContainer>
        <div className="addAddressModal-heading">Add New Address</div>
        <div className="addAddressModal-bodyContainer">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="addressModalCards">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={name || ""}
                  autoFocus={true}
                  // onChange={handleChangeEditAddress}

                  {...register("name", {
                    required: "Please enter your name",
                  })}
                />
                <label className="placeholderAlternative">Name *</label>
                <p className="myInput-error">{errors?.name?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="mobileNumber"
                  maxLength="10"
                  value={mobileNumber || ""}
                  // onChange={handleChangeEditAddress}
                  {...register("mobileNumber", {
                    required: "Please enter your phone number",
                    pattern: {
                      value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                      message: "Please enter valid phone number",
                    },
                  })}
                />
                <label className="placeholderAlternative">
                  Mobile Number *
                </label>
                <p className="myInput-error">{errors?.mobileNumber?.message}</p>
              </div>
            </div>
            <div className="addressModalCards">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="form-group">
                  <input
                    type="tel"
                    name="pinCode"
                    maxLength="6"
                    // value={addAddress?.pinCode || ""}
                    // onChange={handleChangeEditAddress}
                    {...register("pinCode", {
                      required: "Please enter your area pin code",
                      pattern: {
                        value: /^[1-9][0-9]{5}$/,
                        message: "Please enter valid area pin code",
                      },
                    })}
                  />
                  <label className="placeholderAlternative">Pincode *</label>
                  <p className="myInput-error">{errors?.pinCode?.message}</p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="state"
                    {...register("state", {
                      required: "Please enter your state",
                    })}
                    // value={addAddress?.state || ""}
                    // onChange={handleChangeEditAddress}
                  />
                  <label className="placeholderAlternative">State *</label>
                  <p className="myInput-error">{errors?.state?.message}</p>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="streetAddress"
                  // value={addAddress?.streetAddress || ""}
                  // onChange={handleChangeEditAddress}
                  {...register("streetAddress", {
                    required: "Please enter your street Address",
                  })}
                />
                <label className="placeholderAlternative">
                  Address (House No,Building,Street,Area)*
                </label>
                <p className="myInput-error">
                  {errors?.streetAddress?.message}
                </p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="locality"
                  // value={addAddress?.locality || ""}
                  // onChange={handleChangeEditAddress}
                  {...register("locality", {
                    required: "Please enter your street Locality/Town",
                  })}
                />
                <label className="placeholderAlternative">
                  Locality/ Town *
                </label>
                <p className="myInput-error">{errors?.locality?.message}</p>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="city"
                  // value={addAddress?.city || ""}
                  // onChange={handleChangeEditAddress}
                  {...register("city", {
                    required: "Please enter your City/District",
                  })}
                />
                <label className="placeholderAlternative">
                  City/ District *
                </label>
                <p className="myInput-error">{errors?.city?.message}</p>
              </div>
            </div>
            <div className="addressModalCards">
              <div style={{ color: "#94969F" }}>Type of Address *</div>
              <div style={{ display: "flex" }}>
                <div style={{ margin: "15px 10px 10px 0px" }}>
                  <input
                    type="radio"
                    value="home"
                    id="home"
                    name="addressType"
                    // onChange={handleChangeEditAddress}
                    // checked={Boolean(addAddress?.addressType == "home")}
                    {...register("addressType", {
                      required: "Please select your address type",
                    })}
                  />
                  <label htmlFor="home" style={{ margin: "0px 10px" }}>
                    Home
                  </label>
                </div>
                <div style={{ margin: "15px 10px 10px 0px" }}>
                  <input
                    type="radio"
                    value="work"
                    id="work"
                    name="addressType"
                    {...register("addressType", {
                      required: "Please select your address type",
                    })}
                    // onChange={handleChangeEditAddress}
                    // checked={Boolean(addAddress?.addressType === "work")}
                  />
                  <label htmlFor="work" style={{ margin: "0px 10px" }}>
                    Work
                  </label>
                </div>
              </div>
              <p className="myInput-error">{errors?.addressType?.message}</p>
              <div className="addAddressModal-horizontalSeparator"></div>
              <div>
                <input
                  type="checkbox"
                  className="input"
                  name="isDefault"
                  // value={""}
                  // onChange={handleChangeEditAddress}
                  // checked={Boolean(addAddress?.isDefault)}
                />
                <span style={{ margin: "0px 15px" }}>
                  Make this as my default address
                </span>
              </div>
            </div>
            <div className="addAddress-buttonContainer">
              <div
                className="addAddress-buttons"
                onClick={handleShowAddAddressModal}
              >
                Cancel
              </div>
              <button
                className="addAddress-buttons"
                // onClick={() => addAddrApiCall(addAddress)}

                type="submit"
              >
                Save
              </button>
            </div>
          </form>
          {/* <DevTool control={control} /> */}
        </div>
      </AddAddressContainer>
    </>
  );
};

export default AddAddressModal;
