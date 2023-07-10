import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import menImage from "../Assets/Images/Men/Men1.webp";

const CustomToast = ({ closeToast }) => {
  return (
    <div style={{ color: "white", textAlign: "center" }}>
      <span
        style={{
          color: "white",
          textAlign: "center",
          margin: "auto 0px ",
          fontSize: "24px",
        }}
      >
        Added to Bag
      </span>
    </div>
  );
};
const Toast = () => {
  const notify = () => {
    toast("Added to Bag", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      icon: ({ theme, type }) => (
        <img
          src={menImage}
          style={{ height: "30px", width: "30px", objectFit: "center" }}
        />
      ),
    });
  };
  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer
        style={{ position: "absolute", top: "90px", right: "0px" }}
        toastStyle={{
          backgroundColor: "#282c3f",
          width: "200px",
          height: "20px",
          color: "white",
        }}
      />
    </div>
  );
};

export default Toast;
