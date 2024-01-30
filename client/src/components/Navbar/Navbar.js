import React, { useState, useEffect } from "react";
import useDebounce from "../useDebounce";
import {
  NavbarWrapper,
  MobileNavBarContainer,
  NavContainer,
  GridItemOne,
  NavbarLink,
  LogoContainer,
  Img,
  GridItemTwo,
  SearchWrapper,
  SearchContainer,
  SearchDropDown,
  SearchButton,
  Input,
  Span,
  SvgImageContainer,
  SvgImageContainer1,
  SvgNavbarLink,
  StdNavbarLink,
  StdContainer,
  StdImg,
  Overlay,
  BadgeNotification,
  BannerAnnouncement,
} from "./NavStyles";
import SearchIcon from "@mui/icons-material/Search";
import MyntraLogo from "../../Assets/Images/Myntra.png";
import stdLogo from "../../Assets/Images/studio-logo-new.svg";
import StudioImg from "../../Assets/Images/sudio-nav-banner.png";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems } from "../../redux/features/cart/cartSlice";
import { isFulfilled } from "@reduxjs/toolkit";
import { fetchUserById, logOutUser } from "../../redux/features/user/userSlice";
import LocalStorageService from "../../api/localStorage";
import jwt_decode from "jwt-decode";
import { request } from "../../api/axios";
import MobileNav from "../MobileMenu/MobileNav";
import Men from "../SubMenu/Men";
import Women from "../SubMenu/Women";
import Kids from "../SubMenu/Kids";
import HomeLiving from "../SubMenu/HomeLiving";
import Beauty from "../SubMenu/Beauty";
import { useNavigate, useLocation } from "react-router-dom";

const NavItem = ({ to, color, name, children }) => {
  const [ishover, setHover] = useState(false);

  const handleMouseHover = (booleanValue) => {
    setHover(booleanValue);
  };
  return (
    <>
      <NavbarLink
        to={to}
        color={color}
        onMouseOver={() => handleMouseHover(true)}
        onMouseOut={() => handleMouseHover(false)}
        $active={ishover}
      >
        {name}
        {/* <div className="subcategories">{children}</div> */}

        {ishover ? children : null}
      </NavbarLink>
      {ishover ? <Overlay /> : null}
    </>
  );
};

const Navbar = () => {
  const [isFocus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const [stdHover, setStdHover] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchDropdownBrand, setSearchDropdownBrand] = useState(null);
  const [searchDropdownCategory, setSearchDropdownCategory] = useState(null);
  const [openMobileNavbar, setOpenMobileNavbar] = useState(false);

  // const debouceSearchTerm = useDebounce(searchText, 300);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const refreshToken = LocalStorageService.getRefreshToken();
  const { currentUser } = useSelector((state) => ({ ...state.user }));
  const cart = useSelector((state) => state.cart.cartItems);

  const noOfCartItems = cart?.cart?.items.reduce(
    (accum, item) => accum + item.quantity,
    0
  );

  const searchApiCall = async () => {
    const data = await request.get(
      `products/search/autosuggest?q=${searchText}`
    );

    if (data?.data?.searchBrand.length > 0) {
      setSearchDropdownBrand(data?.data?.searchBrand);
    }

    if (data?.data?.searchCategory.length > 0) {
      setSearchDropdownCategory(data?.data?.searchCategory);
    }
  };
  useEffect(() => {
    let handler;
    if (searchText.length > 2) {
      handler = setTimeout(() => {
        searchApiCall();
      }, 800);
    } else {
      setSearchDropdownCategory([]);
      setSearchDropdownBrand([]);
    }

    return () => {
      clearInterval(handler);
    };
  }, [searchText]);

  const apiCall = async (decoded) => {
    const action = await dispatch(fetchUserById({ id: decoded.id }));
    if (localStorage.getItem("user")?._id || isFulfilled(action)) {
      dispatch(fetchCartItems());
    }
  };
  useEffect(() => {
    const token = LocalStorageService.getAccessToken();
    if (token) {
      var decoded = jwt_decode(token);
      if (decoded) {
        if (window.location.pathname !== "/login") {
          apiCall(decoded);
        }
      }
    }
  }, [dispatch]);

  const handleKeyPress = async (event) => {
    if (event?.key === "Enter") {
      setFocus(false);
      const { name, value } = event?.target;
      const params = new URLSearchParams({ [name]: value });
      navigate({
        pathname: "/" + value,
        search: "rawQuery" + params.toString(),
      });
    }
  };
  const onClickSearch = (event) => {
    const params = new URLSearchParams({ [""]: searchText });
    navigate({
      pathname: "/" + searchText,
      search: "rawQuery" + params.toString(),
    });
  };
  const handleLogout = async () => {
    const action = await dispatch(logOutUser({ refreshToken }));
    if (isFulfilled(action)) {
      localStorage.clear();
      dispatch(fetchCartItems());
    }
  };
  const handleMobileNav = () => {
    setOpenMobileNavbar(!openMobileNavbar);
  };

  return (
    <NavbarWrapper>
      <MobileNavBarContainer>
        <div
          style={{
            height: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{ margin: "0px 6px", cursor: "pointer" }}
            onClick={() => handleMobileNav()}
          >
            <MenuIcon sx={{ fontSize: "30px" }} />
          </span>
          <span style={{ margin: "0px 5px" }}>
            <Link to="/">
              <Img
                src={MyntraLogo}
                alt="Myntra Logo"
                style={{ width: "34px", height: "26px" }}
              />
            </Link>
          </span>
        </div>
        <div className="MobileNavHeader-actions">
          {location?.pathname == "/wishlist" ? null : (
            <div>
              <Link to="/wishlist">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  fontWeight="600"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                </svg>
              </Link>
            </div>
          )}
          <div className="bag">
            <Link to="/checkout/cart">
              <BadgeNotification badgeContent={noOfCartItems} color="primary">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  fontWeight="600"
                >
                  <path d="m8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z"></path>
                </svg>
              </BadgeNotification>
            </Link>
          </div>
        </div>
      </MobileNavBarContainer>
      <MobileNav
        handleMobileNav={handleMobileNav}
        openMobileNavbar={openMobileNavbar}
      />
      <NavContainer>
        <GridItemOne>
          <LogoContainer>
            <NavbarLink to="/">
              <Img src={MyntraLogo} alt="Myntra Logo" />
            </NavbarLink>
          </LogoContainer>
          <NavItem to={"/shop/men"} color="#ff3f6c" name="Men">
            <Men />
          </NavItem>
          <NavItem to={"/shop/women"} color="#fb56c1" name="Women">
            <Women />
          </NavItem>
          <NavItem to={"/shop/women"} color="#f26a10" name="Kids">
            <Kids />
          </NavItem>
          <NavItem to={"/shop/women"} color="#f2c210" name="Home & Living">
            <HomeLiving />
          </NavItem>
          <NavItem to={"/shop/women"} color="#0db7af" name="Beauty">
            <Beauty />
          </NavItem>
          <StdNavbarLink
            to={"/studio"}
            color={"#ff3f6c"}
            onMouseOver={() => setStdHover(true)}
            onMouseOut={() => setStdHover(false)}
            $active={stdHover}
          >
            <span>studio</span>
            <StdContainer active={stdHover}>
              <StdImg
                src={stdLogo}
                width={"103.1px"}
                height={"29.5px"}
                style={{ margin: " 20px 220.9px 0 221px" }}
              />
              <span className="desktop-YourDailyInspiration">
                Your daily inspiration for everything fashion
              </span>
              <StdImg
                src={StudioImg}
                width={"514px"}
                height={"274px"}
                style={{ margin: "27px 16px 0 15px" }}
              />
              <>
                <a href="/studio" className="desktop-exploreStudioBtn">
                  <span className="StudioLabel">Explore Studio</span>
                  <IoIosArrowForward style={{ color: "#282c3f" }} />
                </a>
              </>
            </StdContainer>
          </StdNavbarLink>
          {stdHover ? <Overlay /> : null}
          <Span>New</Span>
        </GridItemOne>
        <SearchWrapper>
          <SearchContainer isFocus={isFocus}>
            <SearchButton onClick={(e) => onClickSearch(e)}>
              <SearchIcon
                style={{ color: "#6c6c6c", transform: "scale(.8)" }}
              />
            </SearchButton>
            <Input
              placeholder="Search for products, brands and more"
              type="text"
              value={searchText}
              onFocus={() => setFocus(true)}
              onBlur={() => setTimeout(() => setFocus(false), 500)}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
              tabIndex={1}
            />
          </SearchContainer>
          {searchDropdownCategory?.length > 0 ||
          searchDropdownBrand?.length > 0 ? (
            <SearchDropDown isFocus={isFocus}>
              {searchDropdownCategory?.length > 0 ? (
                <>
                  <div
                    className="CategorySection"
                    style={{
                      padding: "5px 0 5px 10px",
                    }}
                  >
                    Categories
                  </div>

                  {searchDropdownCategory?.map((category, i) => (
                    <Link
                      className="SearchDropdownResults"
                      to={`/${category?.namepath}`}
                      target="_blank"
                      key={i}
                      // onMouseDown={(e) => e.preventDefault()}
                    >
                      <div>{category?.namepath.replace("-", " ")}</div>
                    </Link>
                  ))}
                </>
              ) : null}
              {searchDropdownBrand?.length > 0 ? (
                <>
                  <div
                    className="CategorySection"
                    style={{
                      padding: "5px 0 5px 10px",
                    }}
                  >
                    Brand
                  </div>

                  {searchDropdownBrand?.map((brand, i) => (
                    <Link
                      className="SearchDropdownResults"
                      to={`/${brand}?rawQuery=${brand}`}
                      target="_blank"
                      key={i}
                      // onMouseDown={(e) => e.preventDefault()}
                    >
                      {brand}
                    </Link>
                  ))}
                </>
              ) : null}
            </SearchDropDown>
          ) : null}
          <SearchDropDown />
        </SearchWrapper>
        <GridItemTwo>
          <SvgImageContainer
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            name="profile"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              fontWeight="600"
            >
              <path d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path>
            </svg>
            <span className="desktop-userTitle">Profile</span>
            <div className="profile-dropdown">
              {currentUser ? (
                <>
                  <div className="desktop-infoTitle">
                    Hello {currentUser ? currentUser?.name : " myntra user"}
                  </div>
                  <div className="desktop-infoEmail">
                    {currentUser?.phonenumber}
                  </div>
                </>
              ) : (
                <>
                  <div className="desktop-infoTitle">Welcome</div>
                  <span className="desktop-infoEmail">
                    To access account and manage orders
                  </span>
                  <div className="desktop-getUserInLinks desktop-getInLinks">
                    <a
                      href="/login"
                      data-track="login"
                      className="desktop-linkButton"
                    >
                      login / Signup
                    </a>
                  </div>
                </>
              )}
              <div className="desktop-getInLinks">
                <a href="/my/orders" className="desktop-info">
                  <div className="desktop-infoSection">Orders</div>
                </a>
                <a
                  href="/wishlist"
                  data-track="coupons"
                  className="desktop-info"
                >
                  <div className="desktop-infoSection">Wishlist</div>
                </a>
                <a href="/" data-track="coupons" className="desktop-info">
                  <div className="desktop-infoSection">Gift Cards</div>
                </a>
                <a href="/" className="desktop-info">
                  <div className="desktop-infoSection">Contact Us</div>
                </a>
                <a href="/" data-track="coupons" className="desktop-info">
                  <div className="desktop-infoSection">
                    Myntra Insider
                    <span className="desktop-superscriptTag">New</span>
                  </div>
                </a>
              </div>
              <div className="desktop-getInLinks">
                <a href="/my/orders" className="desktop-info">
                  <div className="desktop-infoSection">Myntra Credits</div>
                </a>
                <a
                  href="/wishlist"
                  data-track="coupons"
                  className="desktop-info"
                >
                  <div className="desktop-infoSection">Coupons</div>
                </a>
                <a href="/" data-track="coupons" className="desktop-info">
                  <div className="desktop-infoSection">Saved Cards</div>
                </a>
                <a href="/" className="desktop-info">
                  <div className="desktop-infoSection">Saved VPA</div>
                </a>
                <a href="/my/address" className="desktop-info">
                  <div className="desktop-infoSection">Saved Address</div>
                </a>
              </div>
              {currentUser || JSON.parse(localStorage.getItem("user"))?._id ? (
                <div className="desktop-accActions">
                  <a
                    href="/my/profile/edit"
                    data-track="edit_profile"
                    className="desktop-info"
                  >
                    <div className="desktop-accInfoSection"> Edit Profile </div>
                  </a>
                  <div data-track="logout" className="desktop-info">
                    <div
                      className="desktop-accInfoSection"
                      onClick={handleLogout}
                    >
                      Logout
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </SvgImageContainer>

          {location?.pathname === "/wishlist" ? null : (
            <SvgNavbarLink to={currentUser ? "/wishlist" : "/login"}>
              <SvgImageContainer1>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  fontWeight="600"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                </svg>
                <span className="desktop-userTitle">Wishlist</span>
              </SvgImageContainer1>
            </SvgNavbarLink>
          )}

          <SvgNavbarLink to="/checkout/cart">
            <SvgImageContainer1>
              <BadgeNotification badgeContent={noOfCartItems} color="primary">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  fontWeight="600"
                >
                  <path d="m8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z"></path>
                </svg>
              </BadgeNotification>
              <span className="desktop-userTitle">Bag</span>
            </SvgImageContainer1>
          </SvgNavbarLink>
        </GridItemTwo>
      </NavContainer>
      <BannerAnnouncement>
        <h3>
          This Application built only Education Purpose only, All the credit go
          to Myntra © 2024 www.myntra.com. All rights reserved.
        </h3>
      </BannerAnnouncement>
    </NavbarWrapper>
  );
};

export default Navbar;
