import styled from "styled-components";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
// import { height } from "@mui/system";

export const NavbarContainer = styled.div`
  box-sizing: border-box;
  font-family: Whitney;
  font-family: Assistant;
  max-width: 100%;
  height: 80px;
  display: block;
  color: #000;
  top: 0;
  position: sticky;
  right: 0;
  left: 0;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);
  @media (min-width: 1536px) {
    width: 100%;
  }
  @media (min-width: 1280px) {
    width: 100%;
  }
  @media (min-width: 1024px) {
    width: 100%;
  }
`;
export const NavContainer = styled.div`
  box-sizing: border-box;
  height: inherit;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-left: 1.8rem;
  margin-right: 1.8rem;
  /* z-index: 10; */
  /* @media (min-width: 1536px) {
    display: grid;
  }
  @media (min-width: 1280px) {
    display: grid;
  }
  @media (min-width: 1024px) {
    display: flex;
  } */
`;

export const GridItemOne = styled.div`
  font-family: Whitney;
  text-transform: uppercase;
  margin: 0;
  display: flex;
  gap: 0px;
  align-items: center;
  list-style: none;
  padding: 0;
  height: inherit;
  font-size: 14px;
  letter-spacing: 0.3px;
  /* width: 75%; */

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;
export const LogoContainer = styled.div`
  margin: 0 0px 0 0px;
`;
export const Img = styled.img`
  box-sizing: border-box;
  width: ${({ width }) => (width ? width : "3rem")};
  height: ${({ height }) => (height ? height : "auto")}; ;
`;

export const NavbarLink = styled(Link)`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  /* font-family: Whitney Semibold; */
  font-family: Assistant;
  align-items: center;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  height: 80px;
  color: #282c3f;
  padding: 0 17px;
  letter-spacing: 0.3px;
  text-decoration: none;
  border-bottom: ${({ $active }) => ($active ? "4px solid" : "4px solid")};
  border-bottom-color: ${({ $active, color }) => ($active ? color : "#fff")};
`;

export const Overlay = styled.div`
  /* position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${({ open }) => (open ? "block" : "none")};
  overflow: hidden;
  height: 100%; */

  position: fixed;
  top: 80px;
  left: 0;
  z-index: -10;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: calc(100vh);
  overflow-x: hidden;
  transition: width 0.5s linear;
`;
export const StyledSubLinksContainer = styled.div`
  z-index: -8;
  width: 60vw;
  height: 450px;
  background: #fff;
  position: absolute;
  top: 80px;
  left: 80px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);
  column-gap: 10px;
  align-content: space-around;
  justify-content: space-between;
  align-items: flex-start;
  transition: left 2s ease-out, width 2s ease-out;
`;
export const SubLinksGroup = styled(Link)`
  display: block;
  font-size: 14px;
  margin: 2.5px 0;
  text-decoration: none;
  text-transform: capitalize;
  color: ${({ color }) => (color ? color : "#000")};
  padding: 12px 0 2px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 25px;
  font-weight: 600;
  transition: all 6s linear;
`;
export const NavSubLinks = styled(Link)`
  box-sizing: border-box;
  text-decoration: none;
  text-transform: none;
  color: #282c3f;
  font-family: "Whitney Book", "sans-serif";
  line-height: 23px;
  font-weight: 500;
  display: block;
  font-size: 14px;
  margin: 2px 0;
  text-decoration: none;
  &:hover {
    color: #282c3f;
    font-weight: 600;
    font-size: 15px;
  }
`;
export const Span = styled.span`
  font-size: 10px;
  top: -0.4rem;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
  text-transform: uppercase;
  display: inline;
  width: 23px;
  height: 12px;
  margin: 0 0 5px -10px;
  font-family: Whitney Semibold;
  font-size: 10px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #ff3f6c;
  content: "new";
`;
export const StdNavbarLink = styled(Link)`
  box-sizing: border-box;
  display: flex;
  font-family: Whitney;
  font-family: Assistant;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 700;
  height: 80px;
  color: #282c3f;
  padding: 0 15px;
  text-decoration: none;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? "4px solid" : "4px solid")};
  border-bottom-color: ${({ active, color }) => (active ? color : "#fff")};
`;

export const StdContainer = styled.div`
  display: ${({ active }) => (active ? "block" : "none")};
  width: 545px;
  height: 454px;
  background-color: #fff;
  position: absolute;
  top: 81px;
  box-shadow: inset 0 0 8px rgb(0 0 0 / 10%);
  pointer-events: auto;
  transition: width 6s linear;

  .desktop-YourDailyInspiration {
    display: block;
    width: 320px;
    height: 22px;
    margin: 9.5px 110px 0 110px;
    font-family: Whitney;
    font-size: 16px;
    line-height: 1.38;
    font-weight: 300;
    text-align: center;
    color: #535766;
    text-transform: none;
  }
  .desktop-exploreStudioBtn {
    min-width: 164px;
    height: 40px;
    display: flex;
    font-family: Whitney;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 16px 174px 0 174px;
    border-radius: 2px;
    border: 1px solid #d4d5d8;
    background-color: #fff;
    text-decoration: none;
  }
  .StudioLabel {
    min-width: 109px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.43;
    text-align: center;
    color: #282c3f;
    height: 20px;
    text-decoration: none;
    outline: none;
    flex-grow: 0;
  }
`;

export const StdImg = styled.img`
  margin: 20px;
  width: ${({ width }) => (width ? width : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
  border-style: none;
`;
export const GridItemTwo = styled.div`
  box-sizing: border-box;
  font-family: Whitney;
  float: right;
  font-weight: 500;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  margin: 0%;
  padding: 0%;
  height: inherit;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 0.3px;
  color: #282c3f;
  border-bottom: none;
  text-transform: uppercase;
  @media (min-width: 768px) {
    font-size: 14px;
  }
  .desktop-userTitle {
    color: #282c3f;
    font-size: 12px;
    text-transform: none;
    font-weight: 600;
  }
  svg {
    /* /* display: block; */
    /* vertical-align: center; */
    color: #282c3f;
  }
`;

export const SearchContainer = styled.div`
  border: 0.1px solid lightGray;
  display: block;
  align-items: center;
  margin: 20px 20px 20px 40px;
  position: relative;
  height: 40px;
  width: 70%;
  text-align: center;
  border-radius: 5px;
  background: ${({ isFocus }) => (isFocus ? "#fff" : "#f5f5f6")};
  line-height: 24px;
  font-size: 14px;
  overflow: hidden;
`;

export const Input = styled.input`
  box-sizing: content-box;
  font-family: Whitney Light;
  float: right;
  font-size: 14px;
  height: 40px;
  width: 90%;
  color: #696e89;
  margin: 0%;
  padding: 0%;
  outline: 0;
  border: none;
  border-radius: 5px;
  background: #f5f5f6;
  &:focus {
    background: #fff;
  }
`;

export const SearchButton = styled.button`
  float: left;
  outline: none;
  border: none;
  cursor: pointer;
  color: gray;
  height: inherit;
  width: 40px;
  text-align: center;
  padding: 8px 0 2px;
  background: transparent;
`;

// export const GridItemThree = styled.div`
//   display: flex;
//   float: left;
//   line-height: 0;
//   height: 40px;
//   margin: 20px 30px 0 10px;
// `;
export const SvgImageContainer = styled.div`
  box-sizing: content-box;
  margin: 0%;
  width: 40px;
  height: inherit;
  position: relative;
  top: 0;
  padding: 0 10px;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 5px solid transparent;
  height: calc(80px - 5px);

  &:hover {
    border-bottom: 5px solid #ee5f73;
    height: calc(80px - 5px);
  }

  .desktop-userTitle {
    color: #000;
    text-align: center;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%) !important;
    font-size: 12px;
    font-weight: 600;
    display: inline-block;
    padding-top: 10px;
    line-height: 6px;
  }
  .profile-dropdown {
    box-sizing: border-box;
    width: 300px;
    height: 450px;
    left: -115px;
    top: calc(85px - 5px);
    position: absolute;
    padding: 25px 20px 15px;
    z-index: 9;
    box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);
    transition: opacity 0.2s ease-out, visibility 0.2s ease-out;
    background-color: #fff;
    color: #515465;
    border: 1px solid #f5f5f6;
    visibility: hidden;
    opacity: 0;
    font-size: 16px;
    font-weight: none;
    text-transform: none;
    text-align: start;

    /* width: 200px;
    height: 500px;
    position: absolute;
    top: 60px;
    left: -20px;
    background-color: orange;  */

    .desktop-infoEmail,
    .desktop-infoTitle {
      font-size: 14px;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 10px;
      height: 14px;
      color: #515465;
    }
    .desktop-infoTitle {
      font-weight: 500;
      height: 14px;
    }
    .desktop-infoEmail {
      height: 14px;
      color: #515465;
    }

    .desktop-getInLinks {
      display: inline-block;
      font-family: Whitney;
      width: 100%;
      padding: 10px 0;
      border-top: 1px solid #eaeaec;
      font-size: 16px;
      font-weight: 400;
      margin: 5px 0 0 5px;
    }
    .desktop-getUserInLinks {
      border: none;
    }
    .desktop-linkButton:first-child {
      margin: 0 5px 6px 0;
    }

    .desktop-linkButton {
      display: inline-block;
      font-size: 16px;
      padding: 4px 16px;
      margin: 10px 10px 0 0;
      border: 1px solid #eaeaec;
      border-radius: 2px;
      text-align: center;
      text-transform: uppercase;
      font-size: 14px;
      color: #ff3f6c;
      font-weight: 600;
    }
    a {
      text-decoration: none;
      color: #282c3f;
    }
    a {
      background-color: transparent;
    }
    .desktop-linkButton:hover {
      border: 1px solid #ff3f6c;
    }
    .desktop-infoSection {
      margin: 0;
      cursor: pointer;
      text-align: start;
    }

    .desktop-info {
      font-weight: 400;
      font-size: 14px;
      color: #515465;
    }
    .desktop-infoSection:hover {
      font-weight: 500;
      color: #000;
    }
    .desktop-superscriptTag {
      box-sizing: content-box;
      padding: 5px;
      width: 25px;
      height: 15px;
      background: #ff3f6c !important;
      border: 1px solid #ff3f6c !important;
      color: #fff;
      font-weight: 900;
      margin: 0px 0 0px 5px;
      font-size: 12px;
      -webkit-transform: skewX(-10deg);
      transform: skewX(-10deg);
      display: inline-block;
      border-radius: 2px;
    }
  }

  &:hover .profile-dropdown {
    visibility: visible;
    opacity: 1;
  }
`;

export const SvgNavbarLink = styled(Link)``;

export const BadgeNotification = styled(Badge)`
  min-width: 18px;
  line-height: 1;
  padding: 0 6px;
  height: 18px;
  background-color: red;
  color: #fff;
  top: 0px;
  right: -3px;
`;
