import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
  width: 450px;
  height:80%;
  transform: translate(-50%, -50%);
  background: #f5f5f6;
  z-index: 13;
  overflow: hidden;

  @media screen and (min-width: 768px) {
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
    visibility: hidden;
    height: 20px;
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
  const [addAddress, setAddAddress] = useState({});
  const dispatch = useDispatch();

  const handleChangeEditAddress = (e) => {
    e.persist();
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
          <form>
            <div className="addressModalCards">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={addAddress?.name || ""}
                  onChange={handleChangeEditAddress}
                />
                <label className="placeholderAlternative">Name *</label>
                <div className="myInput-error"></div>
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="mobileNumber"
                  maxLength="10"
                  value={addAddress?.mobileNumber || ""}
                  onChange={handleChangeEditAddress}
                />
                <label className="placeholderAlternative">
                  Mobile Number *
                </label>
                <div className="myInput-error"></div>
              </div>
            </div>
            <div className="addressModalCards">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="form-group">
                  <input
                    type="tel"
                    name="pinCode"
                    maxLength="6"
                    value={addAddress?.pinCode || ""}
                    onChange={handleChangeEditAddress}
                  />
                  <label className="placeholderAlternative">Pincode *</label>
                  <div className="myInput-error"></div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="state"
                    value={addAddress?.state || ""}
                    onChange={handleChangeEditAddress}
                  />
                  <label className="placeholderAlternative">State *</label>
                  <div className="myInput-error"></div>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="streetAddress"
                  value={addAddress?.streetAddress || ""}
                  onChange={handleChangeEditAddress}
                />
                <label className="placeholderAlternative">
                  Address (House No,Building,Street,Area)*
                </label>
                <div className="myInput-error"></div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="locality"
                  value={addAddress?.locality || ""}
                  onChange={handleChangeEditAddress}
                />
                <label className="placeholderAlternative">
                  Locality/ Town *
                </label>
                <div className="myInput-error"></div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="city"
                  value={addAddress?.city || ""}
                  onChange={handleChangeEditAddress}
                />
                <label className="placeholderAlternative">
                  City/ District *
                </label>
                <div className="myInput-error"></div>
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
                    onChange={handleChangeEditAddress}
                    checked={Boolean(addAddress?.addressType == "home")}
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
                    onChange={handleChangeEditAddress}
                    checked={Boolean(addAddress?.addressType == "work")}
                  />
                  <label htmlFor="work" style={{ margin: "0px 10px" }}>
                    Work
                  </label>
                </div>
              </div>
              <div className="addAddressModal-horizontalSeparator"></div>
              <div>
                <input
                  type="checkbox"
                  className="input"
                  name="isDefault"
                  // value={""}
                  onChange={handleChangeEditAddress}
                  checked={Boolean(addAddress?.isDefault)}
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
              <div
                className="addAddress-buttons"
                onClick={() => addAddrApiCall(addAddress)}
              >
                Save
              </div>
            </div>
          </form>
        </div>
      </AddAddressContainer>
    </>
  );
};

export default AddAddressModal;
