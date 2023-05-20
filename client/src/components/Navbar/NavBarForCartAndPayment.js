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
    float: right;
    letter-spacing: 3px;
    color: #535766;
  }
  .secureContainer .secureIcon {
    margin: -7px 5px 0 0;
  }
  .secureContainer .secure {
    float: right;
    display: inline-block;
  }
  .secure {
    margin-left: 10px;
  }
`;

const NavBarForCartAndPayment = () => {
  let location = useLocation();
  console.log(location);
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
              <img
                src="https://constant.myntassets.com/checkout/assets/img/sprite-secure.png"
                className="secureIcon"
                width="26"
                height="28"
              />
              <div className="secure">100% SECURE</div>
            </div>
          </div>
        </div>
      </NavBarContainer>
    </NavBarWrapper>
  );
};

export default NavBarForCartAndPayment;
