import React, { useEffect } from "react";
import "./Test.css";
import { useRef } from "react";
import styled from "styled-components";

const Div = styled.div`
  .hello {
    width: 500px;
    position: fixed;
    overflow: hidden;
    overflow-y: scroll;
    background: red;
    height: 100%;
  }
  .child {
    width: 400px;
    height: 300px;
    background: lightblue;
    margin: 20px;
  }
`;
const Test = () => {
  // const inputref = useRef(null);

  // useEffect(() => {
  //   console.log(inputref.current);
  // }, []);

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
