import React from "react";

import styled, { keyframes, css } from "styled-components";

const fade = keyframes`
from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

const MainPane = styled.div`
  position: absolute;
  top: 80px;
  left: 120px;
  height: 440px;
  width: 1135px;
  display: block;
  text-align: left;
  transition: all 0.3s ease-out;
  z-index: 1;
  background-color: #fff;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1);
  animation: ${fade} 1s ease-in-out;
  .desktop-categoryContainer {
    width: 1110px;
    padding: 0 10px 10px 15px;
    transition: all 0.2s ease-out;

    .desktop-oddColumnsContent {
      float: left;
      display: block;
      position: relative;
      height: 436px;
      padding-top: 4px;
    }
    .desktop-navBlock {
      display: block;
      position: relative;
      float: left;
      width: 216px;
      margin: 0;
      padding: 0;
    }
    .desktop-navBlock > li {
      padding-left: 25px;
    }

    .desktop-hrLine {
      width: 140px;
      height: 1px;
      margin: 12px 0 0 25px;
      background-color: #eaeaec;
    }

    .desktop-evenColumnContent {
      background-color: rgba(245, 245, 246, 0.4);
    }

    .desktop-oddColumnContent {
      float: left;
      display: block;
      position: relative;
      height: 436px;
      padding-top: 4px;
    }
  }
`;

const HomeLiving = () => {
  return (
    <MainPane>
      <div>HomeLiving</div>
    </MainPane>
  );
};

export default HomeLiving;
