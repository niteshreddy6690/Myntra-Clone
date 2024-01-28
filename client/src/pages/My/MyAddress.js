import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { request } from "../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserAddress,
  addNewUserAddress,
} from "../../redux/features/address/addressSlice";
import AddAddressModal from "./Modals/AddAddressModal";
import ConfirmAndDeleteAddrModal from "./Modals/ConfirmAndDeleteAddrModal";
import EditAddressModal from "./Modals/EditAddressModal";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { isFulfilled } from "@reduxjs/toolkit";

const AddressContainer = styled.div`
  background-color: white;
  font-size: 14px;
  position: relative;
  .page-fullWidthComponent {
    @media (min-width: 780px) {
      padding: 10px;
      width: 71%;
      display: inline-block;
      margin: 5px;
    }
  }

  .addAddressBar-heading {
    @media (min-width: 780px) {
      display: inline-block;
      font-size: 18px;
      font-weight: 700;
      margin-top: 8px;
    }
  }

  .addAddressBar-card {
    display: block;
    /* -webkit-box-shadow: 0px 1px 3px rgba(40, 44, 63, 0.3);
    -moz-box-shadow: 0px 1px 3px rgba(40, 44, 63, 0.3); */
    box-shadow: 0px 1px 3px rgba(40, 44, 63, 0.3);
    background-color: white;
    padding: 17px 10px px;
    margin-bottom: 10px;
    color: #696e79;
    @media (min-width: 780px) {
      -webkit-box-shadow: 0px 0px 0px;
      -moz-box-shadow: 0px 0px 0px;
      box-shadow: 0px 0px 0px;
      display: inline-block;
      float: right;
      border: 0.5px solid #d4d5d9;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      text-transform: uppercase;
      font-weight: 700;
      color: #526cd0;
      padding: 12px;
      text-align: center;
      width: 180px;
      margin: auto;
      cursor: pointer;
    }
  }

  .addressList-addressSegmentation {
    font-weight: 700;
    font-size: 13px;
    margin: 16px 0px 8px 12px;
    text-transform: uppercase;

    @media (min-width: 780px) {
      margin: 24px 0px 8px 0px;
    }
  }

  .addressAccordian-addressAccordian.addressAccordian-myAddress {
    -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
    margin-bottom: 12px;
  }
  .addressAccordian-addressAccordian.addressAccordian-myAddress {
    margin-bottom: 10px;
  }
  .addressAccordian-addressAccordian {
    background-color: white;
    margin-bottom: 6px;
    color: #696e79;
    display: block;
  }

  .addressAccordian-mobile {
    margin: 10px 0px;
  }
  .addressAccordian-addressAccordian.addressAccordian-myAddress
    .addressAccordian-address {
    width: 100%;
  }

  .addressAccordian-addressAccordian .addressAccordian-address {
    display: inline-block;
    padding: 12px;
    word-break: break-word;
  }
  .addressAccordian-addressAccordian
    .addressAccordian-address
    .addressAccordian-nameComponent {
    margin-bottom: 8px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -moz-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -moz-box-align: start;
    -ms-flex-align: start;
  }

  .addressAccordian-addressAccordian
    .addressAccordian-address
    .addressAccordian-nameComponent
    .addressAccordian-name {
    font-size: 14px;
    font-weight: 800;
    margin-bottom: 5px;
    text-transform: capitalize;
    width: -webkit-calc(100% - 60px);
    width: -moz-calc(100% - 60px);
    width: calc(100% - 60px);
  }
  .addressAccordian-addressAccordian
    .addressAccordian-address
    .addressAccordian-nameComponent
    .addressAccordian-addressType {
    background-color: #f5f5f6;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    text-transform: uppercase;
    width: 50px;
    font-size: 11px;
    font-weight: 800;
    text-align: center;
    padding: 3px;
  }
  .addressAccordian-makeDefaultText-notVisible {
    display: none !important;
  }
  .addressAccordian-makeDefaultText {
    cursor: pointer;
    display: block;
    color: #14cda8;
    margin: 15px 0px 5px 0px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 700;
  }
`;

const EditAndRemoveContainer = styled.div`
  width: 100%;
  display: ${({ isSelected }) => (isSelected ? "block" : "none")};
  color: #526cd0;
  border-top: 1px solid #eaeaec;
  position: relative;

  .addressAccordian-buttonDivider {
    border-left: 1px solid #c8c8c8;
    width: 1px;
    height: 30px;
    position: absolute;
    left: 50%;
    top: 8px;
    z-index: 2;
  }
  .addressAccordian-button {
    display: inline-block;
    cursor: pointer;
    width: 50%;
    text-transform: uppercase;
    padding: 14px 14px;
    text-align: center;
    font-weight: 700;
  }
`;

const MyAddress = () => {
  const [address, setAddress] = useState([]);
  const [currentAddr, setCurrentAddr] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [deletedAddress, setDeletedAddress] = useState(null);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedAddress, setEditedAddress] = useState({});
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  const { userAddresses, isLoading } = useSelector((state) => ({
    ...state.address,
  }));

  const dispatch = useDispatch();

  // const ConfirmEditAddrModal = ({
  //   handleShowEditModal,
  //   callEditApi,
  //   editedAddress,
  // }) => {
  //   const [editedAddressModal, setEditedAddressModal] = useState({});

  //   useEffect(() => {
  //     setEditedAddressModal(editedAddress);
  //     document.body.style.overflowY = "hidden";
  //     return () => {
  //       document.body.style.overflowY = "scroll";
  //     };
  //   }, []);
  //   // useEffect(() => {
  //   //   setEditedAddressModal(editedAddress);
  //   // }, []);
  //   const handleChangeEditAddress = (e) => {
  //     e.persist();
  //     const { name, value, type, checked } = e.target;
  //     setEditedAddressModal((prev) => {
  //       return { ...prev, [name]: type === "checkbox" ? checked : value };
  //     });
  //   };

  //

  //   return (
  //     <>
  //       <EditContainerModalWrapper onClick={handleShowEditModal} />
  //       <EditContainerModal>
  //         <div className="addAddressModal-modalHeading">Edit Address</div>
  //         <div className="addAddressModal-cardFields">
  //           <form>
  //             <div className="addAddressModal-card">
  //               <div className="myInput-inputRow myInput-md">
  //                 <label htmlFor="name" className="myInput-labelTop">
  //                   Name *
  //                 </label>
  //                 <input
  //                   type="text"
  //                   name="name"
  //                   onChange={handleChangeEditAddress}
  //                   value={editedAddressModal?.name || ""}
  //                   className="input"
  //                 />
  //               </div>
  //               <div className="myInput-inputRow myInput-md">
  //                 <label htmlFor="mobileNumber" className="myInput-labelTop">
  //                   Mobile Number *
  //                 </label>
  //                 <input
  //                   type="tel"
  //                   value={editedAddressModal?.mobileNumber || ""}
  //                   onChange={handleChangeEditAddress}
  //                   name="mobileNumber"
  //                   className="input"
  //                 />
  //               </div>
  //             </div>
  //             <div className="addAddressModal-card ">
  //               <div className="addAddressModal-pinCodeAndState">
  //                 <div className="addAddressModal-eachBlock">
  //                   <div className="myInput-inputRow myInput-md addAddressModal-addressInput">
  //                     <label htmlFor="pincode" className="myInput-labelTop">
  //                       Pincode *
  //                     </label>
  //                     <input
  //                       type="tel"
  //                       name="pinCode"
  //                       value={editedAddressModal?.pinCode}
  //                       maxLength="6"
  //                       onChange={handleChangeEditAddress}
  //                       className="input"
  //                     />

  //                     <div className=""></div>
  //                     <div className="myInput-error"></div>
  //                   </div>
  //                 </div>
  //                 <div className="addAddressModal-eachBlock">
  //                   <div className="myInput-inputRow myInput-md addAddressModal-addressInput">
  //                     <label for="state" className="myInput-labelTop">
  //                       State *
  //                     </label>
  //                     <input
  //                       type="text"
  //                       name="state"
  //                       value={editedAddressModal?.state || ""}
  //                       onChange={handleChangeEditAddress}
  //                       className="input"
  //                     />

  //                     <div className="myInput-error"></div>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="myInput-inputRow myInput-md">
  //                 <label htmlFor="streetAddress" className="myInput-labelTop">
  //                   Address (House No, Building, Street, Area) *
  //                 </label>
  //                 <input
  //                   type="tel"
  //                   value={editedAddressModal?.streetAddress || ""}
  //                   onChange={handleChangeEditAddress}
  //                   name="streetAddress"
  //                   className="input"
  //                 />
  //               </div>
  //               <div className="myInput-inputRow myInput-md">
  //                 <label htmlFor="locality" className="myInput-labelTop">
  //                   Locality/ Town *
  //                 </label>
  //                 <input
  //                   type="tel"
  //                   value={editedAddressModal?.locality || ""}
  //                   onChange={handleChangeEditAddress}
  //                   name="locality"
  //                   className="input"
  //                 />
  //               </div>
  //               <div className="myInput-inputRow myInput-md">
  //                 <label htmlFor="city" className="myInput-labelTop">
  //                   City/ District *
  //                 </label>
  //                 <input
  //                   type="text"
  //                   value={editedAddressModal?.city || ""}
  //                   onChange={handleChangeEditAddress}
  //                   name="city"
  //                   className="input"
  //                 />
  //               </div>
  //             </div>
  //             <div className="addAddressModal-card">
  //               <div style={{ color: "#94969F" }}>Type of Address *</div>
  //               <div style={{ display: "flex" }}>
  //                 <div style={{ margin: "10px 10px 10px 0px" }}>
  //                   <input
  //                     type="radio"
  //                     value="home"
  //                     id="home"
  //                     name="addressType"
  //                     onChange={handleChangeEditAddress}
  //                     checked={Boolean(
  //                       editedAddressModal?.addressType == "home"
  //                     )}
  //                   />
  //                   <label htmlFor="home" style={{ margin: "0px 10px" }}>
  //                     Home
  //                   </label>
  //                 </div>
  //                 <div style={{ margin: "10px 10px 10px 0px" }}>
  //                   <input
  //                     type="radio"
  //                     value="work"
  //                     id="work"
  //                     name="addressType"
  //                     onChange={handleChangeEditAddress}
  //                     checked={Boolean(
  //                       editedAddressModal?.addressType == "work"
  //                     )}
  //                   />
  //                   <label htmlFor="work" style={{ margin: "0px 10px" }}>
  //                     Work
  //                   </label>
  //                 </div>
  //               </div>
  //               <div className="addAddressModal-horizontalSeparator"></div>
  //               <div>
  //                 <input
  //                   type="checkbox"
  //                   className="input"
  //                   name="isDefault"
  //                   // value={isSubscribed}
  //                   onChange={handleChangeEditAddress}
  //                   checked={Boolean(editedAddressModal?.isDefault)}
  //                 />
  //                 <span style={{ margin: "0px 15px" }}>
  //                   Make this as my default address
  //                 </span>
  //               </div>
  //             </div>
  //           </form>
  //         </div>
  //         <div className="addAddressModal-buttons">
  //           <div
  //             className="addAddressModal-button"
  //             onClick={handleShowEditModal}
  //           >
  //             Cancel
  //           </div>
  //           <div
  //             className="addAddressModal-button"
  //             onClick={() => callEditApi(editedAddressModal)}
  //           >
  //             Save
  //           </div>
  //         </div>
  //       </EditContainerModal>
  //     </>
  //   );
  // };

  // const ConfirmDeleteAddrModal = ({ handleShowModal }) => {
  //   useEffect(() => {
  //     document.body.style.overflowY = "hidden";
  //     return () => {
  //       document.body.style.overflowY = "scroll";
  //     };
  //   }, []);
  //   return (
  //     <>
  //       <ConfirmDeleteModalWrapper onClick={handleShowModal} />
  //       <ConfirmDeleteModalContainer>
  //         <div className="dialog-title">Delete Confirmation</div>
  //         <div className="dialog-content">
  //           Are you sure you want to delete this address?
  //         </div>
  //         <div className="dialog-buttonsContainer">
  //           <div className="dialog-buttonBlock">
  //             <div
  //               className="dialog-button dialog-button0"
  //               onClick={handleShowModal}
  //             >
  //               Cancel
  //             </div>
  //             <div className="dialog-buttonDivider"></div>
  //           </div>
  //           <div className="dialog-buttonBlock">
  //             <div
  //               className="dialog-button dialog-button1"
  //               onClick={() => callDeleteApi()}
  //             >
  //               Delete
  //             </div>
  //           </div>
  //         </div>
  //       </ConfirmDeleteModalContainer>
  //     </>
  //   );
  // };

  // const AddAddressModal = ({ handleShowAddAddressModal }) => {
  //   useEffect(() => {
  //     document.body.style.overflowY = "hidden";
  //     return () => {
  //       document.body.style.overflowY = "scroll";
  //     };
  //   }, []);
  //   return (
  //     <>
  //       <AddAddressWrapper onClick={handleShowAddAddressModal} />
  //       <AddAddressContainer>
  //         <div>Hello this is Add Address Modal</div>
  //       </AddAddressContainer>
  //     </>
  //   );
  // };

  // const callApi = async () => {
  //   const myAddress = await request.get("http://localhost:8080/api/address/");
  //   return myAddress;
  // };
  async function callApi() {
    //
    // const myAddress = await request.get("http://localhost:8080/api/address/");
    // setAddress(myAddress.data.address);
    dispatch(fetchUserAddress());
  }
  useEffect(() => {
    callApi();
  }, [deletedAddress]);

  useEffect(() => {
    setAddress(userAddresses);
  }, [userAddresses]);

  const addAddrApiCall = async (addAddress) => {
    const action = await dispatch(addNewUserAddress({ addAddress }));
    if (isFulfilled(action)) {
      setShowAddAddressModal((showAddAddressModal) => !showAddAddressModal);
    }
  };
  const callEditApi = async (data) => {
    const myAddress = await request.put("address/edit", data);
    if (myAddress) {
      handleShowEditModal();
      callApi();
    }
  };
  const defaultAddr = useMemo(
    () => address?.filter((data) => data.isDefault == true),
    [address]
  );
  const otherAddr = useMemo(
    () => address?.filter((data) => data.isDefault == false),
    [address]
  );

  const handleClick = (index) => {
    setCurrentAddr(index);
  };

  const callDeleteApi = async () => {
    const deletedAddress = await request.put("address/", {
      addressId: selectedAddress,
    });
    if (deletedAddress) {
      setShowConfirmDeleteModal(false);
      setDeletedAddress(deletedAddress);
    }
  };
  const setAddressId = (id) => {
    setSelectedAddress(id);
  };

  const handleShowModal = () => {
    setShowConfirmDeleteModal(!showConfirmDeleteModal);
  };
  const handleShowEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const handleMakeDefault = async (addr) => {
    const {
      _id,
      name,
      addressType,
      streetAddress,
      locality,
      pinCode,
      city,
      state,
      mobileNumber,
      landmark,
    } = addr;
    const updatedAddress = await request.put("address/edit", {
      addressId: _id,
      name,
      addressType,
      streetAddress,
      locality,
      pinCode,
      city,
      state,
      mobileNumber,
      landmark,
      isDefault: true,
    });
    if (updatedAddress) {
      callApi();
    }
  };

  const handleShowAddAddressModal = () => {
    setShowAddAddressModal(!showAddAddressModal);
  };

  if (isLoading) return <LoadingSpinner loading={isLoading} />;
  return (
    <AddressContainer className="page-fullWidthComponent">
      <div style={{ padding: "15px" }}>
        <span className="addAddressBar-heading">Saved Address</span>
        <div className="addAddressBar-card" onClick={handleShowAddAddressModal}>
          <div>+ Add New Address</div>
        </div>
      </div>
      <div>
        <div>
          {defaultAddr?.map((addr, index = 0) => (
            <div key={index}>
              <div className="addressList-addressSegmentation">
                Default Address
              </div>
              <div
                className="addressAccordian-addressAccordian addressAccordian-myAddress"
                onClick={() => handleClick(index)}
              >
                <div className="addressAccordian-address">
                  <div className="addressAccordian-nameComponent">
                    <span className="addressAccordian-name">{addr.name}</span>
                    <span className="addressAccordian-addressType">
                      {addr?.addressType}
                    </span>
                  </div>
                  <div>{addr?.streetAddress}</div>
                  <div>{addr?.locality}</div>
                  <div>
                    {addr?.city} - {addr?.pinCode}
                  </div>
                  <div className="addressAccordian-addressDetails">
                    <div>{addr?.state}</div>
                    <div className="addressAccordian-mobile">
                      {addr?.mobileNumber}
                    </div>
                  </div>
                </div>
                <EditAndRemoveContainer
                  className="addressAccordian-buttons"
                  isSelected={currentAddr == index}
                >
                  <div
                    className="addressAccordian-button"
                    onClick={() => {
                      handleShowEditModal();
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
                    }}
                  >
                    EDIT
                  </div>
                  <div className="addressAccordian-buttonDivider"></div>
                  <div
                    className="addressAccordian-button"
                    onClick={() => {
                      handleShowModal();
                      setAddressId(addr._id);
                    }}
                  >
                    REMOVE
                  </div>
                </EditAndRemoveContainer>
              </div>
            </div>
          ))}
          <div className="addressList-addressSegmentation">Other Address</div>
          {otherAddr?.map((addr, index) => (
            <div key={index}>
              <div
                className="addressAccordian-addressAccordian addressAccordian-myAddress"
                onClick={() => handleClick(index + 1)}
                // isSelected={currentAddr === index}
              >
                <div className="addressAccordian-address">
                  <div className="addressAccordian-nameComponent">
                    <span className="addressAccordian-name">{addr.name}</span>
                    <span className="addressAccordian-addressType">
                      {addr?.addressType}
                    </span>
                  </div>
                  <div>{addr?.streetAddress}</div>
                  <div>{addr?.locality}</div>
                  <div>
                    {addr?.city} - {addr?.pinCode}
                  </div>
                  <div className="addressAccordian-addressDetails">
                    <div>{addr?.state}</div>
                    <div className="addressAccordian-mobile">
                      {addr?.mobileNumber}
                    </div>
                    {addr?.isDefault ? null : (
                      <span
                        className={
                          currentAddr == index + 1
                            ? "addressAccordian-makeDefaultText"
                            : "addressAccordian-makeDefaultText-notVisible"
                        }
                        onClick={() => handleMakeDefault(addr)}
                      >
                        Make This Default
                      </span>
                    )}
                  </div>
                </div>
                <EditAndRemoveContainer
                  className="addressAccordian-buttons"
                  isSelected={currentAddr == index + 1}
                >
                  <div
                    className="addressAccordian-button"
                    onClick={() => {
                      handleShowEditModal();
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
                    }}
                  >
                    EDIT
                  </div>
                  <div className="addressAccordian-buttonDivider"></div>
                  <div
                    className="addressAccordian-button"
                    onClick={() => {
                      handleShowModal();
                      setAddressId(addr._id);
                    }}
                  >
                    REMOVE
                  </div>
                </EditAndRemoveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showConfirmDeleteModal && (
        <ConfirmAndDeleteAddrModal
          callDeleteApi={callDeleteApi}
          handleShowModal={handleShowModal}
        />
      )}
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
          callApi={callApi}
        />
      )}
    </AddressContainer>
  );
};

export default MyAddress;
