import React from "react";
import styled from "styled-components";
import Banner from "../Assets/Images/al_banner.png";
import createAccount from "../Assets/Images/create-account.png";
import { Link } from "react-router-dom";
const FixedBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  background: red;
  background: linear-gradient(to bottom right, #feedf6, #fcf0e2);
`;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: hidden;
`;
const Wrapper = styled.div`
  position: relative;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  min-height: 600px;
  height: calc(100% - 10%);
  background-color: #ffffff;
  text-align: center;
`;

const Container = styled.div`
  padding: 50px;

  .heading {
    margin: 10px 0px;
    margin-top: 70px;
    font-size: 24px;
    color: #191d21;
    text-align: start;
  }
  .notifymessage {
    color: #808080;
    font-size: 14px;
    text-align: start;
  }
  .alSeperator {
    color: #d4d5d9;
    position: relative;
    overflow: hidden;
    text-align: center;
    margin-top: 40px;
    span {
      color: black;
      letter-spacing: 0.02em;
    }
  }
  .alSeperator::after {
    margin-left: -60%;
    text-align: right;
    position: absolute;
    top: 51%;
    overflow: hidden;
    width: 50%;
    height: 1px;
    content: "\A0";
    background-color: #bfc0c6;
    opacity: 0.4;
  }
  .alSeperator::before {
    position: absolute;
    top: 51%;
    overflow: hidden;
    margin-left: 10%;
    text-align: left;
    width: 50%;
    height: 1px;
    content: "\A0";
    background-color: #bfc0c6;
    opacity: 0.4;
  }
  .signupContent {
    padding: 24px 0 0;
  }
  .linkPageHeading {
    margin: 0 0 20px;
    color: #282c3f;
    font-size: 20px;
    font-weight: 500;
  }
  .linkPageCreate {
    color: #282c3f;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    border: 1px solid #d4d5d9;
    padding: 10px;
    border-radius: 2px;
    margin: 20px 0 0;
    display: block;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    img {
      width: 18px;
      height: 18px;
      position: relative;
      bottom: 1px;
      margin: 0 10px;
      vertical-align: middle;
      display: inline-block;
    }
  }
`;
const Image = styled.img`
  width: 300px;
`;
const AccountLink = () => {
  return (
    <>
      <FixedBackground></FixedBackground>
      <Main>
        <Wrapper>
          <Container>
            <Image src={Banner} />
            <h2 className="heading">Already have an Account?</h2>
            <p className="notifymessage">
              Your mobile number can be used on one Myntra Account only
            </p>

            <div className="alSeperator">
              <span>OR</span>
            </div>

            <div className="signupContent">
              <Link className="linkPageCreate" to="/createaccount">
                <img src={createAccount} alt="create Account" />
                <span>Create New Account</span>
              </Link>
            </div>
          </Container>
        </Wrapper>
      </Main>
    </>
  );
};

export default AccountLink;
