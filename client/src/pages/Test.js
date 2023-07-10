import React, { useEffect } from "react";
import "./Test.css";
import { useRef } from "react";
import styled from "styled-components";

const Div = styled.div`
  .hello {
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    border: 1px solid red;
    overflow: hidden;
  }
  .child {
    background: lightblue;
    /* margin: 20px; */
  }
  .child:nth-child(odd) {
    background: orange;
    border: 1px solid black;
    height: 20px;
    min-width: 200px;
    flex: 1 1 0%;
  }
  .child:nth-child(even) {
    background: blue;
    border: 1px solid black;
    height: 20px;
    flex: 1 0 0%;
    min-width: 200px;
  }
`;
const Test = () => {
  return (
    <Div>
      <div className="hello">
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
      </div>
    </Div>
  );
};

export default Test;
