import React from "react";
import styled from "styled-components";
import { data } from "./MobileNavbarData";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

import CloseIcon from "@mui/icons-material/Close";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { fetchUserById, logOutUser } from "../../redux/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { isFulfilled } from "@reduxjs/toolkit";
import LocalStorageService from "../../api/localStorage";
import { fetchCartItems } from "../../redux/features/cart/cartSlice";

const Nav = styled.div`
  width: 100%;

  @media (min-width: 860px) {
    display: none;
  }
`;
const AppNav = styled.div`
  background-color: #fff;
  color: #333;
  position: fixed;
  max-width: 400px;
  top: 0px;
  width: 100%;
  height: 100vh;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transform: ${({ openMobileNavbar }) =>
    openMobileNavbar ? "translateX(0%)" : "translateX(-100%)"};
  display: flex;
  flex-direction: column;
  will-change: transform;
  z-index: 120;
  pointer-events: auto;
  transition: transform 0.2s ease;
  overflow-y: scroll;
`;

const UserProfile = styled.div`
  position: relative;
  padding: 22px 20px 4px;
  font-weight: 700;
  background: #3f3947;
  .sidebar-close {
    position: absolute;
    top: 5px;
    right: 6px;
    margin: 18px;
    cursor: pointer;
  }
  .user-image {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    background: #fff;
    margin-bottom: 5px;
    text-align: center;
  }
  .user-image svg {
    margin-top: 7px;
  }
`;
const SideBarcon = styled.div`
  position: relative;
  background-color: #fff;
`;

const SideBarNav = styled.div`
  background: #fff;
  border-bottom: 1px solid #eaeaec;
  padding-bottom: 15px;
  margin-bottom: 5px;

  .user-authentication{
    font-size: 16px;
    text-decoration: none;
    color: #3e4152;
    display: block;
    padding:14px 20px;
    cursor: pointer;
  }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${({ open }) => (open ? "block" : "none")};
  overflow: hidden;
  height: 100%;
  width: 100%;
`;
const MobileNav = ({ handleMobileNav, openMobileNavbar }) => {
  const dispatch = useDispatch();
  const refreshToken = LocalStorageService.getRefreshToken();
  const { currentUser } = useSelector((state) => ({ ...state.user }));
  const handleLogout = async () => {
    const action = await dispatch(logOutUser({ refreshToken }));
    if(isFulfilled(action)) {
      localStorage.clear();
      dispatch(fetchCartItems());
    }
  };
  return (
    <Nav>
      <Overlay
        onClick={() => handleMobileNav()}
        open={openMobileNavbar}
      ></Overlay>
      <AppNav openMobileNavbar={openMobileNavbar}>
        <UserProfile>
          <div className="sidebar-close" onClick={() => handleMobileNav()}>
            <CloseIcon sx={{ color: "#fff" }} />
          </div>
          <Link to="/my/dashboard">
            <div className="user-image">
              <svg width="36" height="36" viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd">
                  <path d="M0 0h24v24H0z" opacity="0.05"></path>
                  <path
                    fill="#282C3F"
                    d="M5.808 18.004l8.895-.039c-.304-1.27-1.778-1.775-3.036-1.97a.5.5 0 01-.423-.49l-.012-1.071a3.94 3.94 0 01-.977.126 3.97 3.97 0 01-.981-.127l.007 1.063a.5.5 0 01-.426.499c-.843.125-2.695.563-3.047 2.01zm1.448-7.444c0 1.654 1.345 3 2.999 3a3.003 3.003 0 002.998-3v-1.5c0-1.654-1.345-3-2.998-3a3.003 3.003 0 00-2.999 3v1.5zm4.983 4.52c2.275.462 3.52 1.653 3.52 3.383a.497.497 0 01-.497.496L5.252 19H5.25a.497.497 0 01-.5-.494c0-1.716 1.31-2.975 3.529-3.425l-.008-1.052a4 4 0 01-2.014-3.468v-1.5c0-2.206 1.793-4 3.998-4a4.003 4.003 0 013.998 4v1.5a4 4 0 01-2.026 3.475l.012 1.046zM16.252 6a.5.5 0 010-1h2.498a.5.5 0 010 1h-2.498zm2.498 3a.5.5 0 010 1h-2.498a.5.5 0 010-1h2.498zm0 4a.5.5 0 010 1h-2.498a.5.5 0 010-1h2.498z"
                  ></path>
                </g>
              </svg>
            </div>
          </Link>
        </UserProfile>
        <SideBarcon>
          <SideBarNav>
            {data?.map((item, index) => (
              <SideBar
                item={item}
                key={index}
                handleMobileNav={handleMobileNav}
              />
            ))}
           {currentUser?<div className="user-authentication" onClick={()=>{handleLogout();handleMobileNav()}}>Logout</div> :<Link className="user-authentication" to="/login" onClick={() => handleMobileNav()}>Login</Link>}
          </SideBarNav>
        </SideBarcon>
      </AppNav>
    </Nav>
  );
};

export default MobileNav;
