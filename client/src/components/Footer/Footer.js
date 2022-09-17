import React from "react";
import styled from "styled-components";

const ChildStyledComponent = styled.div`
  position: absolute;
  background-color: green;
  display: none;
  top: 50px;
  left: 20px;
  width: 100%;
  height: 100px;
  margin: 20px;
`;
const ParentComponent = styled.div`
  box-sizing: border-box;
  margin: 10px;
  width: 100%;
  height: 100%;
  font-size: 16px;
  line-height: 10px;
  position: relative;
  cursor: pointer;

  &:hover > div {
    display: block;
    background-color: yellowgreen;
  }
`;

const Footer = () => {
  return (
    <>
      <ParentComponent>
        <span>Hover Me</span>
      </ParentComponent>
      <ChildStyledComponent>
        now the component display components is Changed to block
      </ChildStyledComponent>
    </>
  );
};

export default Footer;
