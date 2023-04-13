import React from "react";
import MyMainPage from "./MyMainPage";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

//Import Images

import defaultProfile from "../../Assets/png/default-Profile.png";
import profileOrder from "../../Assets/png/profile-orders.png";
import collectionWishlist from "../../Assets/png/profile-collections.png";
import myntraCredit from "../../Assets/png/profile-myntra-credit.png";
import myntraCash from "../../Assets/png/profile-myntrapoints.png";
import myntraSavedCards from "../../Assets/png/profile-cards.png";
import savedVpa from "../../Assets/png/upiIcon.png";
import savedAddress from "../../Assets/png/profile-address.png";
import coupons from "../../Assets/png/profile-coupons.png";
import profileDetains from "../../Assets/png/profile-edit.png";

const Person = styled.div`
  margin-bottom: 35px;
  padding-bottom: unset;
  background-color: white;
  box-sizing: border-box;

  .person-background {
    position: relative;
    background: #f5f5f6;
    height: 180px;
    padding: 25px 30px;
  }
  .person-infoWrapper {
    text-align: center;
  }
  .person-imageHolder {
    height: 130px;
    width: 130px;
    float: left;
    display: inline;
  }
`;

const PersonInfo = styled.div`
  height: 130px;
  width: auto;
  display: inline;
  position: absolute;
  text-align: left;
  left: 180px;
  right: 30px;
  display: none;
  @media (min-width: 780px) {
    display: block;
  }

  .person-editProfile {
    float: right;
    cursor: pointer;
    border: 1px solid #3e4152;
    padding: 4px 8px;
    border-radius: 2px;
    color: #3e4152;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 700;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.6);
  }
  .person-info {
    position: absolute;
    left: 0;
    top: 50%;
    right: 0;
  }
`;

const DashboardData = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
  flex-wrap: wrap;
  /* height: 400px; */
`;

const DashboardSquares = styled.div`
  margin: 5px;
  border: 0.5px solid #eaeaec;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 30%;
  &::after {
    content: "";
    display: block;
    margin-top: 100%;
  }
  &:hover {
    background-color: #f5f5f6;
  }
`;
const LinkContent = styled.div`
  .link-image {
    width: 32px;
    /* margin: auto; */
  }
  .link-labels {
    width: 100%;
  }
  .link-label {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 4px;
  }
  .link-subLabel {
    font-size: 12px;
    color: #94969f;
    margin: 0 5px;
  }
`;
const OverView = () => {
  return (
    <div>
      <Person>
        <div className="person-background">
          <div className="person-infoWrapper">
            <img src={defaultProfile} className="person-imageHolder" />
          </div>
          <PersonInfo>
            <NavLink className="person-editProfile" to="/my/profile/edit">
              Edit Profile
            </NavLink>
            <div className="person-info">
              <div className="person-name"></div>
              <div>niteshreddy6690@gmail.com</div>
            </div>
          </PersonInfo>
        </div>
      </Person>
      <DashboardData>
        <DashboardSquares>
          <NavLink to="/my/orders">
            <LinkContent>
              <img src={profileOrder} className="link-image" />
              <div className="link-labels">
                <div className="link-label">Orders</div>
                <div className="link-subLabel">Check your order status</div>
              </div>
            </LinkContent>
          </NavLink>
        </DashboardSquares>
        <DashboardSquares>
          <NavLink to="/wishlist">
            <LinkContent>
              <img src={collectionWishlist} className="link-image" />
              <div className="link-labels">
                <div className="link-label">Collection &amp; Wishlist</div>
                <div className="link-subLabel">
                  All your curated products collection
                </div>
              </div>
            </LinkContent>
          </NavLink>
        </DashboardSquares>
        <DashboardSquares>
          <NavLink to="/my/myntracredit">
            <LinkContent>
              <img src={myntraCredit} className="link-image" />
              <div className="link-labels">
                <div className="link-label">Myntra Credit </div>
                <div className="link-subLabel">
                  Manage all your refunds and gift cards
                </div>
              </div>
            </LinkContent>
          </NavLink>
        </DashboardSquares>
        <DashboardSquares>
          <NavLink to="/my/myntrapoints">
            <LinkContent>
              <img src={myntraCash} className="link-image" />
              <div className="link-labels">
                <div className="link-label">MynCash </div>
                <div className="link-subLabel">
                  Earn MynCash as you shop and use them in checkout
                </div>
              </div>
            </LinkContent>
          </NavLink>
        </DashboardSquares>
        <DashboardSquares>
          <NavLink to="/my/savedcards">
            <LinkContent>
              <img src={myntraSavedCards} className="link-image" />
              <div className="link-labels">
                <div className="link-label">Saved Cards</div>
                <div className="link-subLabel">
                  Save your cards for faster checkout
                </div>
              </div>
            </LinkContent>
          </NavLink>
        </DashboardSquares>
        <DashboardSquares>
          <NavLink to="/my/savedvpa">
            <LinkContent>
              <img src={savedVpa} className="link-image" />
              <div className="link-labels">
                <div className="link-label">Saved VPA</div>
                <div className="link-subLabel">View your saved VPA</div>
              </div>
            </LinkContent>
          </NavLink>
        </DashboardSquares>
        <DashboardSquares>
          <NavLink to="/my/address">
            <LinkContent>
              <img src={savedAddress} className="link-image" />
              <div className="link-labels">
                <div className="link-label">Addresses</div>
                <div className="link-subLabel">
                  Save addresses for a hassle-free checkout
                </div>
              </div>
            </LinkContent>
          </NavLink>
        </DashboardSquares>
        <DashboardSquares>
          <NavLink to="/my/coupons">
            <LinkContent>
              <img src={coupons} className="link-image" />
              <div className="link-labels">
                <div className="link-label">Coupons</div>
                <div className="link-subLabel">
                  Manage coupons for additional discounts
                </div>
              </div>
            </LinkContent>
          </NavLink>
        </DashboardSquares>
        <DashboardSquares>
          <NavLink to="/my/profile/edit">
            <LinkContent>
              <img src={profileDetains} className="link-image" />
              <div className="link-labels">
                <div className="link-label">Profile Details</div>
                <div className="link-subLabel">
                  Change your profile details & password
                </div>
              </div>
            </LinkContent>
          </NavLink>
        </DashboardSquares>
      </DashboardData>
    </div>
  );
};

export default OverView;
