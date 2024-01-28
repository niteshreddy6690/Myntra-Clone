import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const EditContainerModalWrapper = styled.div`
  background: rgba(0, 0, 0, 0.69);
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 11;
`;
const EditContainerModal = styled.div`
  position: fixed;
  background-color: #f5f5f6;
  text-align: left;
  box-sizing: border-box;
  color: #535766;
  overflow-y: scroll;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 75%;
  height: 75%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 20;

  @media screen and (min-width: 768px) {
    height: 75%;
    width: 450px;
  }
  @media screen and (min-height: 780px) {
    height: 750px;
  }
  input {
    accent-color: #ff3f6c;
    caret-color: #ff3f6c;
  }
  .addAddressModal-cardFields {
    overflow: auto;
    height: 84%;
  }
  .addAddressModal-card {
    margin: 10px 0px;
    background-color: white;
    padding: 10px 20px;
    border: 0px;
  }

  .addAddressModal-modalHeading {
    background-color: white;
    font-weight: 700;
    padding: 15px;
    text-transform: uppercase;
    border-bottom: 1px solid #d4d5d9;
  }

  .myInput-inputRow {
    position: relative;
    margin: 40px 0px 0px 0px;
  }
  .myInput-inputRow .myInput-md {
    margin: 30px 0px 0px 0px;
  }

  .myInput-inputRow .myInput-labelTop {
    /* display: block; */
    position: absolute;
    font-size: 12px;
    top: -20px;
    left: 0px;
    pointer-events: none;
    color: #94969f;
  }

  .myInput-inputRow input[type="text"],
  .myInput-inputRow input[type="password"],
  .myInput-inputRow input[type="number"],
  .myInput-inputRow input[type="tel"] {
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
  .addAddressModal-pinCodeAndState {
    /* margin: 5px 0; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .addAddressModal-horizontalSeparator {
    height: 1px;
    border-top: 1px solid #eaeaec;
    width: 100%;
    margin: 16px 0 16px;
  }
  .addAddressModal-buttons {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #d4d5d9;
    background-color: white;
  }
  .addAddressModal-buttons .addAddressModal-button {
    cursor: pointer;
    text-align: center;
    display: inline-block;
    width: 50%;
    padding: 15px;
    text-transform: uppercase;
    font-weight: 800;
  }

  .addAddressModal-buttons .addAddressModal-button:last-child {
    color: white;
    background-color: #ff3f6c;
  }

  .addAddressModal-buttons .addAddressModal-button {
    cursor: pointer;
    text-align: center;
    display: inline-block;
    width: 50%;
    padding: 15px;
    text-transform: uppercase;
    font-weight: 700;
  }
`;
const ErrorParagraph = styled.p`
  color: #ff5a5a;
  margin: 3px 0px;
  font-size: 12px;
  letter-spacing: 0.5px;
`;
const EditAddressModal = ({
  handleShowEditModal,
  callEditApi,
  editedAddress,
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
    defaultValues: {
      addressId: editedAddress?.addressId,
      name: editedAddress?.name,
      mobileNumber: editedAddress?.mobileNumber,
      pinCode: editedAddress?.pinCode,
      state: editedAddress?.state,
      city: editedAddress?.city,
      addressType: editedAddress?.addressType,
      locality: editedAddress?.locality,
      streetAddress: editedAddress?.streetAddress,
      landmark: editedAddress?.landmark,
      isDefault: editedAddress?.isDefault,
    },
  });

  const [editedAddressModal, setEditedAddressModal] = useState({});

  useEffect(() => {
    // // console.log(editedAddress);
    // setEditedAddressModal(editedAddress);
    reset({
      addressId: editedAddress?.addressId,
      name: editedAddress?.name,
      mobileNumber: editedAddress?.mobileNumber,
      pinCode: editedAddress?.pinCode,
      state: editedAddress?.state,
      city: editedAddress?.city,
      addressType: editedAddress?.addressType,
      locality: editedAddress?.locality,
      streetAddress: editedAddress?.streetAddress,
      landmark: editedAddress?.landmark,
      isDefault: editedAddress?.isDefault,
    });
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  // useEffect(() => {
  //   setEditedAddressModal(editedAddress);
  // }, []);

  const onSubmit = (data) => {
    callEditApi(data);
  };
  // const handleChangeEditAddress = (e) => {
  //   e.persist();
  //   const { name, value, type, checked } = e.target;
  //   setEditedAddressModal((prev) => {
  //     return { ...prev, [name]: type === "checkbox" ? checked : value };
  //   });
  // };

  // const isDefaultAddress = watch("isDefault");

  return (
    <>
      <EditContainerModalWrapper onClick={handleShowEditModal} />
      <EditContainerModal>
        <div className="addAddressModal-modalHeading">Edit Address</div>
        <div className="addAddressModal-cardFields">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="addAddressModal-card">
              <div className="myInput-inputRow myInput-md">
                <label htmlFor="name" className="myInput-labelTop">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  // onChange={handleChangeEditAddress}
                  // value={editedAddressModal?.name || ""}
                  {...register("name", {
                    required: "Please enter your name",
                  })}
                  className="input"
                />
                <ErrorParagraph>{errors?.name?.message}</ErrorParagraph>
              </div>
              <div className="myInput-inputRow myInput-md">
                <label htmlFor="mobileNumber" className="myInput-labelTop">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  // value={editedAddressModal?.mobileNumber || ""}
                  // onChange={handleChangeEditAddress}
                  name="mobileNumber"
                  className="input"
                  maxLength="10"
                  {...register("mobileNumber", {
                    required: "Please enter your phone number",
                    pattern: {
                      value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                      message: "Please enter valid phone number",
                    },
                  })}
                />
                <ErrorParagraph>{errors?.mobileNumber?.message}</ErrorParagraph>
              </div>
            </div>
            <div className="addAddressModal-card ">
              <div className="addAddressModal-pinCodeAndState">
                <div className="addAddressModal-eachBlock">
                  <div className="myInput-inputRow myInput-md addAddressModal-addressInput">
                    <label htmlFor="pincode" className="myInput-labelTop">
                      Pincode *
                    </label>
                    <input
                      type="tel"
                      name="pinCode"
                      // value={editedAddressModal?.pinCode || ""}
                      maxLength="6"
                      // onChange={handleChangeEditAddress}
                      className="input"
                      {...register("pinCode", {
                        required: "Please enter your area pin code",
                        pattern: {
                          value: /^[1-9][0-9]{5}$/,
                          message: "Please enter valid area pin code",
                        },
                      })}
                    />
                    <ErrorParagraph>{errors?.pinCode?.message}</ErrorParagraph>
                  </div>
                </div>
                <div className="addAddressModal-eachBlock">
                  <div className="myInput-inputRow myInput-md addAddressModal-addressInput">
                    <label htmlFor="state" className="myInput-labelTop">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      // value={editedAddressModal?.state || ""}
                      // onChange={handleChangeEditAddress}
                      {...register("state", {
                        required: "Please enter your state",
                      })}
                      className="input"
                    />
                    <ErrorParagraph>{errors?.state?.message}</ErrorParagraph>
                  </div>
                </div>
              </div>
              <div className="myInput-inputRow myInput-md">
                <label htmlFor="streetAddress" className="myInput-labelTop">
                  Address (House No, Building, Street, Area) *
                </label>
                <input
                  type="tel"
                  // value={editedAddressModal?.streetAddress || ""}
                  // onChange={handleChangeEditAddress}
                  {...register("streetAddress", {
                    required: "Please enter your street Address",
                  })}
                  name="streetAddress"
                  className="input"
                />
                <ErrorParagraph>
                  {errors?.streetAddress?.message}
                </ErrorParagraph>
              </div>
              <div className="myInput-inputRow myInput-md">
                <label htmlFor="locality" className="myInput-labelTop">
                  Locality/ Town *
                </label>
                <input
                  type="tel"
                  // value={editedAddressModal?.locality || ""}
                  // onChange={handleChangeEditAddress}
                  {...register("locality", {
                    required: "Please enter your street Locality/Town",
                  })}
                  name="locality"
                  className="input"
                />
                <ErrorParagraph>{errors?.locality?.message}</ErrorParagraph>
              </div>
              <div className="myInput-inputRow myInput-md">
                <label htmlFor="city" className="myInput-labelTop">
                  City/ District *
                </label>
                <input
                  type="text"
                  // value={editedAddressModal?.city || ""}
                  // onChange={handleChangeEditAddress}
                  {...register("city", {
                    required: "Please enter your City/District",
                  })}
                  name="city"
                  className="input"
                />
                <ErrorParagraph>{errors?.city?.message}</ErrorParagraph>
              </div>
            </div>
            <div className="addAddressModal-card">
              <div style={{ color: "#94969F" }}>Type of Address *</div>
              <div style={{ display: "flex" }}>
                <div style={{ margin: "10px 10px 10px 0px" }}>
                  <input
                    type="radio"
                    value="home"
                    id="home"
                    name="addressType"
                    // onChange={handleChangeEditAddress}
                    // checked={Boolean(editedAddressModal?.addressType == "home")}
                    {...register("addressType", {
                      required: "Please select your address type",
                    })}
                  />
                  <label htmlFor="home" style={{ margin: "0px 10px" }}>
                    Home
                  </label>
                </div>
                <div style={{ margin: "10px 10px 10px 0px" }}>
                  <input
                    type="radio"
                    value="work"
                    id="work"
                    name="addressType"
                    // onChange={handleChangeEditAddress}
                    // checked={Boolean(editedAddressModal?.addressType == "work")}
                    {...register("addressType", {
                      required: "Please select your address type",
                    })}
                  />
                  <label htmlFor="work" style={{ margin: "0px 10px" }}>
                    Work
                  </label>
                </div>
                <ErrorParagraph>{errors?.addressType?.message}</ErrorParagraph>
              </div>
              <div className="addAddressModal-horizontalSeparator"></div>
              <div>
                <input
                  type="checkbox"
                  className="input"
                  name="isDefault"
                  // value={isSubscribed}
                  // onChange={handleChangeEditAddress}
                  // checked={Boolean(isDefaultAddress)}
                  // defaultChecked={isDefaultAddress}

                  {...register("isDefault")}
                />
                <span style={{ margin: "0px 15px" }}>
                  Make this as my default address
                </span>
              </div>
            </div>
            <div className="addAddressModal-buttons">
              <div
                className="addAddressModal-button"
                onClick={handleShowEditModal}
              >
                Cancel
              </div>
              <button
                className="addAddressModal-button"
                type="submit"
                // onClick={() => callEditApi(editedAddressModal)}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </EditContainerModal>
    </>
  );
};

export default EditAddressModal;
