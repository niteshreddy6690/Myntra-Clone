import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const Wrapper = styled.div`
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const Container = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 1px 1px 10px #d9d9d9, -1px -1px 10px #d9d9d9;
`;

const LoadingSpinner = ({ loading }) => {
  if (!loading) {
    return null;
  }
  return (
    <Wrapper>
      <Container>
        <ClipLoader
          color="#ff3f6c"
          cssOverride={{
            background: "#ffffff",
            color: "#ff3f6c",
            fontSize: "12px",
            position: "absolute",
            top: "12.5%",
            left: "12.5%",
            display: "flex",
            transform: "translate(-50%,-50%)",
            width: "30px",
            height: "30px",
          }}
          loading={loading}
        />
      </Container>
    </Wrapper>
  );
};

export default LoadingSpinner;
