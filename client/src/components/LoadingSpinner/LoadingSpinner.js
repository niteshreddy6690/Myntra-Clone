import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgb(240, 240, 240);
`;

const Container = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const LoadingSpinner = ({ loading }) => {
  return (
    <Wrapper>
      <Container>
        <ClipLoader
          color="#ff3f6c"
          cssOverride={{
            background: "#ffffff",
            color: "#ff3f6c",
            fontSize: "12px",
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
