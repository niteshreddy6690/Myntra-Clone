import { red } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SubLinkWrapper = styled.div`
  z-index: -8;
  width: 60vw;
  height: 450px;
  background: #fff;
  position: absolute;
  top: 80px;
  left: 80px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);
  column-gap: 10px;
  align-content: space-around;
  justify-content: space-between;
  align-items: flex-start;
  transition: left 2s ease-out, width 2s ease-out;
`;
export const SubLinksGroup = styled(Link)`
  display: block;
  font-size: 14px;
  margin: 2.5px 0;
  text-decoration: none;
  text-transform: capitalize;
  color: ${({ color }) => (color ? color : "#000")};
  padding: 12px 0 2px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 25px;
  font-weight: 600;
  transition: all 6s linear;
`;
const NavSubLinks = styled(Link)`
  box-sizing: border-box;
  text-decoration: none;
  text-transform: none;
  color: #282c3f;
  font-family: "Assistant"
  line-height: 23px;
  font-weight: 500;
  display: block;
  font-size: 14px;
  margin: 2px 0;
  text-decoration: none;
  &:hover {
    color: #282c3f;
    font-weight: 600;
    font-size: 15px;
  }
`;    
const Men = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "500px",
        height: "500px",
        backgroundColor: "red",
        position: "absolute",
        top: "80px",
        left: "80px",
      }}
    >
      <div style={{ color: "white" }}>Men</div>
    </div>
  );
};

export default Men;
