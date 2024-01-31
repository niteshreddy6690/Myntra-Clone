import React, { Children } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MyOrders from "./MyOrders";
import OverView from "./OverView";
import ProfileEdit from "./ProfileEdit";
import MyAddress from "./MyAddress";
import Profile from "./Profile";
import { useSelector, useDispatch } from "react-redux";

const MainContainerWrapper = styled.div`
  font-family: "Assistant";
  margin: 0 2%;

  @media (min-width: 780px) {
    margin: 30px 2%;
    min-height: 650px;
    background-color: white;
  }
`;

const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 980px;
  /* 
  @media (min-width: 780px) {
    margin: 10% 5%;
    min-height: 650px;
    background-color: white;
  } */
`;

const Account = styled.div`
  border-bottom: 1px solid #d4d5d9;
  padding: 15px 0px;
  font-size: 12px;

  .account-heading {
    font-size: 18px;
    font-weight: 700;
  }
`;

const Sidebar = styled.div`
  vertical-align: top;
  border-right: 1px solid #d4d5d9;
  text-align: left;
  padding: 0px 25px 0px 0px;
  font-size: 15px;
  display: none;
  width: 25%;

  @media (min-width: 768px) {
    display: inline-block;
  }
  .segment-segment:first-child {
    border-top: none;
  }
  .segment-segment {
    border-top: 1px solid #d4d5d9;
    padding: 20px 0px;
    width: 100%;
    text-decoration: none;
  }

  .segment-heading {
    color: #7e818c;
    font-size: 12px;
    text-transform: uppercase;
    padding: 10px 0px;
  }
  .segment-link {
    display: block;
    margin: 5px 0px;
    color: black;
    text-decoration: none;
  }
  .active {
    color: #14cda8;
    font-weight: 700;
  }
`;

const PageComponents = styled.div`
  padding: 10px;
  width: 100%;
  display: inline-block;
  margin: 5px;

  @media screen and (min-width: 768px) {
    width: 70%;
    display: inline-block;
  }
`;
const MyMainPage = () => {
  let location = useLocation();

  const { currentUser } = useSelector((state) => ({ ...state.user }));

  return (
    <>
      <Navbar />
      <MainContainerWrapper>
        <MainContainer>
          <Account>
            <div className="account-heading"> Account</div>
            <div>{currentUser ? currentUser?.name : "Myntra user"}</div>
          </Account>
          <Sidebar>
            <div className="segment-segment">
              <NavLink
                to="/my/dashboard"
                className={({ isActive }) =>
                  isActive ? "active segment-link" : "segment-link"
                }
              >
                Overview
              </NavLink>
            </div>
            <div className="segment-segment">
              <div className="segment-heading">ORDERS</div>
              <NavLink
                to="/my/orders"
                className={({ isActive }) =>
                  isActive ? "active segment-link" : "segment-link"
                }
              >
                Orders &amp; Returns
              </NavLink>
            </div>

            <div className="segment-segment">
              <div className="segment-heading">CREDITS</div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active segment-link" : "segment-link"
                }
              >
                MynCash
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active segment-link" : "segment-link"
                }
              >
                Myntra Credit
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active segment-link" : "segment-link"
                }
              >
                MynCash
              </NavLink>
            </div>

            <div className="segment-segment">
              <div className="segment-heading">ACCOUNT</div>
              <NavLink to="/my/profile" className="segment-link">
                Profile
              </NavLink>
              <NavLink to="/" className="segment-link">
                Saved Cards
              </NavLink>
              <NavLink to="/" className="segment-link">
                Saved VPA
              </NavLink>
              <NavLink to="/my/address" className="segment-link">
                Addresses
              </NavLink>
              <NavLink to="/" className="segment-link">
                Myntra Insider
              </NavLink>
            </div>
            <div className="segment-segment">
              <div className="segment-heading">LEGAL</div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active segment-link" : "segment-link"
                }
              >
                Terms of Use
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active segment-link" : "segment-link"
                }
              >
                Privacy Policy
              </NavLink>
            </div>
          </Sidebar>
          <PageComponents>
            {location.pathname === "/my/orders" ? <MyOrders /> : null}
            {location.pathname === "/my/dashboard" ? <OverView /> : null}
            {location.pathname === "/my/profile/edit" ? <ProfileEdit /> : null}
            {location.pathname === "/my/address" ? <MyAddress /> : null}
            {location.pathname === "/my/profile" ? <Profile /> : null}
          </PageComponents>
        </MainContainer>
      </MainContainerWrapper>
    </>
  );
};

export default MyMainPage;
