import React, { useEffect } from "react";
import styled from "styled-components";

// const ConfirmAndDeleteAddrModal = () => {
//   return <div>ConfirmAndDeleteAddrModal</div>;
// };

const ConfirmDeleteModalWrapper = styled.div`
  background: rgba(0, 0, 0, 0.69);
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 11;
`;

const ConfirmDeleteModalContainer = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  height: 150px;
  width: 350px;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 12;

  .dialog-title {
    padding: 20px 0 0 16px;
    font-size: 16px;
    font-weight: 700;
  }
  .dialog-content {
    margin: 10px 10px 35px 15px;
    word-wrap: break-word;
    font-size: 14px;
    color: #7e818c;
  }
  .dialog-buttonsContainer {
    border-top: 0.5px solid #eaeaec;
    position: relative;
  }
  .dialog-buttonBlock {
    cursor: pointer;
    text-transform: uppercase;
    display: inline-block;
    width: 50%;
    text-align: center;
    padding: 15px 0px;
  }
  .dialog-button1 {
    color: #ff3f6c;
  }

  .dialog-button {
    font-weight: 600;
    display: inline-block;
  }
  /* @media (min-width: 780px) {
    position: absolute;
    top: 35%;
    left: 38%;
    width: 350px;
  } */
`;
const ConfirmAndDeleteAddrModal = ({ handleShowModal, callDeleteApi }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  return (
    <>
      <ConfirmDeleteModalWrapper onClick={handleShowModal} />
      <ConfirmDeleteModalContainer>
        <div className="dialog-title">Delete Confirmation</div>
        <div className="dialog-content">
          Are you sure you want to delete this address?
        </div>
        <div className="dialog-buttonsContainer">
          <div className="dialog-buttonBlock">
            <div
              className="dialog-button dialog-button0"
              onClick={handleShowModal}
            >
              Cancel
            </div>
            <div className="dialog-buttonDivider"></div>
          </div>
          <div className="dialog-buttonBlock">
            <div
              className="dialog-button dialog-button1"
              onClick={() => callDeleteApi()}
            >
              Delete
            </div>
          </div>
        </div>
      </ConfirmDeleteModalContainer>
    </>
  );
};
export default ConfirmAndDeleteAddrModal;
