import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";

const Div = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DisplayMessage = styled.div`
  font-weight: 800;
  font-size: 25px;
`;
const Studio = () => {
  return (
    <>
      <Navbar />
      <Div>
        <DisplayMessage>Feature Coming Soon....!</DisplayMessage>
      </Div>
    </>
  );
};

export default Studio;
