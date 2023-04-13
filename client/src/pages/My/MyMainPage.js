import React, { Children } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MyOrders from "./MyOrders";
import OverView from "./OverView";
import ProfileEdit from "./ProfileEdit";

const MainContainerWrapper = styled.div`
  font-family: "Assistant";

  /* margin: 0 auto; */
  margin-top: 30px;
  /* display: flex;
  justify-content: center; */
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

  @media (min-width: 780px) {
    display: block;
  }
`;

const Sidebar = styled.div`
  vertical-align: top;
  border-right: 1px solid #d4d5d9;
  text-align: left;
  padding: 0px 25px 0px 0px;
  font-size: 15px;

  @media (min-width: 780px) {
    display: inline-block;
  }
  .segment-segment:first-child {
    border-top: none;
  }
  .segment-segment {
    border-top: 1px solid #d4d5d9;
    padding: 20px 0px;
    width: 145px;
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
  width: 71%;
  display: inline-block;
  margin: 5px;
`;
const MyMainPage = () => {
  let location = useLocation();

  console.log("location", location);
  return (
    <>
      <Navbar />
      <MainContainerWrapper>
        <MainContainer>
          <Account>
            <div className="account-heading"> Account</div>
            <div>Nitesh S</div>
          </Account>
          <Sidebar>
            <div className="segment-segment">
              <NavLink
                to="/my/dashboard"
                // className="segment-link"
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
                to="/my/coupons"
                className={({ isActive }) =>
                  isActive ? "active segment-link" : "segment-link"
                }
              >
                MynCash
              </NavLink>
              <NavLink
                to="/my/myntracredit"
                className={({ isActive }) =>
                  isActive ? "active segment-link" : "segment-link"
                }
              >
                Myntra Credit
              </NavLink>
              <NavLink
                to="/my/myntrapoints"
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
              <NavLink to="/my/savedcards" className="segment-link">
                Saved Cards
              </NavLink>
              <NavLink to="/my/savedvpa" className="segment-link">
                Saved VPA
              </NavLink>
              <NavLink to="/my/address" className="segment-link">
                Addresses
              </NavLink>
              <NavLink to="/myntrainsider?cache=false" className="segment-link">
                Myntra Insider
              </NavLink>
            </div>
            <div className="segment-segment">
              <div className="segment-heading">LEGAL</div>
              <NavLink
                to="/termsofuse"
                className={({ isActive }) =>
                  isActive ? "active segment-link" : "segment-link"
                }
              >
                Terms of Use
              </NavLink>
              <NavLink
                to="/privacypolicy"
                className={({ isActive }) =>
                  isActive ? "active segment-link" : "segment-link"
                }
              >
                Privacy Policy
              </NavLink>
            </div>
          </Sidebar>
          <PageComponents>
            {location.pathname == "/my/orders" ? <MyOrders /> : null}
            {location.pathname == "/my/dashboard" ? <OverView /> : null}
            {location.pathname == "/my/profile/edit" ? <ProfileEdit /> : null}
          </PageComponents>
        </MainContainer>
      </MainContainerWrapper>
    </>
  );
};

export default MyMainPage;
