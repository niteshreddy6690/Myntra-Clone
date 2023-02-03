import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";

export const Overlay = styled.div`
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

export const Wrapper = styled.div`
  width: 40%;
  max-width: 500px;
  position: fixed;
  z-index: 101;
  top: 0;
  right: 0;
  overflow: hidden;
  background-color: #fff;
  overflow-y: scroll;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  height: 100%;
  transition: transform 0.3s ease-in-out;
`;

export const SimilarContainer = styled.div`
  position: relative;
  width: 100%;

  .results-similarItemContainer {
    width: 100%;
  }
`;

export const SimilarHeader = styled.div`
  font-family: Whitney Semibold;
  margin: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  color: #282c3f;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-align: center;
`;
export const Icon = styled.div`
  position: absolute;
  top: 37px;
  right: 30px;
  width: 14px !important;
  height: 15px;
  justify-content: center;
  cursor: pointer;
`;
export const ClearIconX = styled(ClearIcon)``;

export const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  align-content: stretch;
  width: 100%;
  margin: 0;
  padding-left: 0;
  justify-content: space-between;
  list-style: none;
  flex-wrap: wrap;
  margin: 0 -10px 0 0px;
`;

export const Li = styled.li`
  display: block;
  overflow: hidden;
  margin: 0 0 30px;
  width: 210px;
  &:hover {
    box-shadow: 0 2px 16px 4px rgb(40 44 63 / 7%);
  }
`;
export const SimilarContent = styled.div`
  padding: 0 24px 24px;
`;
export const SimilarHeaderContainer = styled.div`
  padding: 20px;
`;

export const NavLink = styled(Link)`
  list-style: none;
  text-decoration: none;
  color: #282c3f;
  background-color: transparent;
  cursor: pointer;
  display: block;

  .image-Container {
    position: relative;
    width: 210px;
    height: 280px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const ProductMetaInfo = styled.div`
  position: relative;
  z-index: 3;
  background: #fff;
  padding: 0 10px;
  height: 100%;
  margin-top: 12px;
  box-sizing: border-box;
  overflow: hidden;
`;

export const ProductHeader3 = styled.h3`
  font-family: Whitney Semibold;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  color: #282c3f;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  /* display: ${({ isHover }) => (isHover ? "none" : "block")}; */
`;
export const ProductHeader4 = styled.h4`
  color: #535766;
  font-family: Whitney Book;
  font-size: 14px;
  line-height: 1;
  margin-bottom: 0;
  margin-top: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
  display: block;
`;
export const ProductPriceContainer = styled.div`
  font-family: Whitney Semibold;
  font-size: 16px;
  line-height: 15px;
  margin: 10px 0 6px;
  white-space: nowrap;
  font-size: 14px;
  color: #282c3f;
  font-weight: 500;
`;
export const ProductDiscountedPrice = styled.span`
  font-size: 14px;
  font-family: Whitney Semibold;
  font-size: 16px;
  color: #282c3f;
  font-weight: 500;
`;
export const ProductOriginalPrice = styled.span`
  text-decoration: line-through;
  color: #7e818c;
  font-weight: 400;
  margin-left: 5px;
  font-size: 12px;
`;
export const ProductDiscountPercentage = styled.span`
  color: #ff905a;
  font-family: Whitney Book;
  font-weight: 500;
  font-size: 12px;
  margin-left: 5px;
`;
