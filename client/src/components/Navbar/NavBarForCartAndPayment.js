import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MyntraLogo from "../../Assets/Images/Myntra.png";
import { Link, useLocation, NavLink } from "react-router-dom";
const NavBarWrapper = styled.div`
  font-size: 14px;
  font-weight: 600;
`;
const NavBarContainer = styled.div`
  width: 100%;
  position: fixed;
  box-sizing: border-box;
  font-family: Assistant;
  text-align: center;
  max-width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f6;

  .imageLogo {
    width: 40px;
    height: 30px;
    /* display: inline-block;
    background-position: center;
    background-size: contain; */
  }

  .checkout-steps {
    /* margin: 0 0 0 34%; */
    width: 40%;
    color: #696b79;
    padding: 0;
    text-align: center;
    display: inline-block;
    line-height: 20px;
    @media screen and (max-width:620px) {
      width:60%;
      font-size: 14px;
      margin: 0%;
    }
    @media screen and (max-width:450px) {
      width:80%;
      font-size: 10px;
    }
    @media screen and (max-width:320px) {
      display: none;
    }
  }
  .checkout-steps li {
    display: inline-block;
    /* letter-spacing: 3px; */
  }
  .step {
    text-transform: uppercase;
  }
  .checkout-steps .step2 {
    margin: 0 5px 0 6px;
  }
  .checkout-steps .active {
    color: #20bd99;
    border-bottom: 2px solid #20bd99;
  }
  .checkout-steps .step1 {
    margin: 0 5px 0 0;
  }
  .checkout-steps .divider {
    display: inline-block;
    border-top: 1px dashed #696b79;
    height: 4px;
    width: 10%;
  }
  .secureContainer {
    max-height: 78px;
    letter-spacing: 3px;
    color: #535766;
    display: flex;
   width:230px;
    @media screen and (max-width:640px) {
      display:none;
    }
  }
  .secureContainer .secureIcon {
    margin: 0px 5px 0 0;
  }
  .secureContainer .secure {
    width: 120px;
    display: inline;
    margin-top: 5px;
  }
`;
const BannerAnnouncement=styled.div`
width: 100%;
padding: 10px 0;
background-color: #ff3f6c;
color: #fff;
text-align: center;
font-size: 10px;
font-weight: 700;
@media screen and (min-width: 720px) {
  font-size: 12px;
  padding: 10px 0;
}
@media screen and (min-width: 1024px) {
  font-size: 14px;
  padding: 10px 0;
}
`

const NavBarForCartAndPayment = () => {
  let location = useLocation();
  return (
    <NavBarWrapper>
      <NavBarContainer>
        <div style={{ margin: "0px 60px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "80px",
            }}
          >
            <div>
              <NavLink to="/">
                <img className="imageLogo" src={MyntraLogo} />
              </NavLink>
            </div>
            <ol className="checkout-steps">
              <Link
                style={{ color: "#696b79" }}
                to={
                  location.pathname == "/checkout/payment"
                    ? "/checkout/cart"
                    : ""
                }
              >
                <li
                  className={
                    location.pathname == "/checkout/cart"
                      ? " active step step2"
                      : "step step2"
                  }
                >
                  BAG
                </li>
              </Link>
              <li className="divider"></li>
              <li
                className={
                  location.pathname == "/checkout/payment"
                    ? " active step step2"
                    : "step step2"
                }
              >
                ADDRESS
              </li>
              <li className="divider"></li>
              <li className="step step3">PAYMENT</li>
            </ol>
            <div className="secureContainer">
          <span  className="secureIcon">    <img
                src="https://constant.myntassets.com/checkout/assets/img/sprite-secure.png"
               
                width="26"
                height="28"
              /></span>
              <span className="secure">100% SECURE</span>
            </div>
          </div>
        </div>
      </NavBarContainer>
      <BannerAnnouncement ><h3>This Application built only Education Purpose only, All the credit go to Myntra © 2024 www.myntra.com. All rights reserved.</h3> </BannerAnnouncement>
    </NavBarWrapper>
  );
};

export default NavBarForCartAndPayment;
