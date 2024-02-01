import styled from "styled-components";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const Wrapper = styled.div`
  margin: 35px auto;
  text-align: left;
  @media screen and (max-width: 796px) {
    margin: 18px auto;
  }
`;

export const CartContainer = styled.div`
  max-width: 980px;
  margin: auto;
  position: relative;
  padding: 0 10px 16px;
  min-height: 320px;
  color: #282c3f;
  min-width: 400px;
`;
export const LeftSection = styled.div`
  display: inline-block;
  padding: 32px 20px 0 0;
  width: 62%;
  border-right: 1px solid #eaeaec;
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 796px) {
    max-height: none;
    width: 100%;
    display: block;
    overflow-y: visible;
    overflow-x: visible;
  }
`;

export const CartList = styled.div``;
export const CartItemContainer = styled.div`
  margin-bottom: 10px;
  position: relative;
  .item-container {
    background: #fff;
    font-size: 14px;
    border: 1px solid #eaeaec;
    border-radius: 4px;
    position: relative;
    padding: 12px 12px 0;
  }
  .leftItem {
    position: absolute;
  }
  .rightItem {
    padding-left: 12px;
    position: relative;
    min-height: 148px;
    margin-left: 111px;
    margin-bottom: 12px;
  }
  .productBrand {
    font-weight: 700;
    margin-bottom: 6px;
  }
  .productDescription {
    font-family: "Assistant", sans-serif;
    line-height: 16px;
  }
  .productPrice {
    margin: 10px 0px;
  }
  .discountedPrice {
    color: #282c3f;
  }
  .originalPrice {
    text-decoration: line-through;
    color: #94969f;
    padding: 0 5px;
  }
  .percentageOff {
    color: #ff905a;
  }
  .clearIcon {
    position: absolute;
    top: 13px;
    right: 13px;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
  .size-quantity {
    display: inline-block;
    white-space: nowrap;
    padding: 2px 8px;
    background: #f5f5f6;
    color: #282c3f;
    font-family: whitney Semibold;
    font-weight: 500;
    cursor: pointer;
    margin-right: 12px;
    border-radius: 2px;
    line-height: 16px;
    text-align: center;
  }
`;
export const NavLink = styled(Link)`
  text-decoration: none;
`;
export const Img = styled.img`
  width: 111px;
  height: 148px;
`;

export const RightSection = styled.div`
  vertical-align: top;
  display: inline-block;
  width: 32%;
  padding: 14px 0 0 16px;
  background-color: #fff;
  @media screen and (max-width: 796px) {
    display: block;
    width: 100%;
    padding: 10px 20px;
    margin: 5px 0 0 0;
    position: sticky;
    bottom: 0;
    left: 0%;
  }
`;

export const StyledArrowDropDownIcon = styled(ArrowDropDownIcon)`
  color: #282c3f;
  cursor: pointer;
  margin-left: 1px;
  position: relative;
  top: 2%;
`;
export const PriceContainer = styled.div`
  display: block;
  margin: 20px 0;

  .priceBlock-base-priceHeader {
    font-family: "Whitney Semibold";
    font-size: 12px;
    font-weight: 500;
    margin: 24px 0 16px;
    color: #535766;
  }

  .priceBreakUp-base-orderSummary {
    font-size: 14px;
    font-size: 500;
  }
  .priceDetail-base-row {
    font-family: "Whitney";
    margin-bottom: 12px;
    line-height: 16px;
  }
  .priceDetail-base-value {
    float: right;
  }
  .priceDetail-base-discount {
    color: #03a685;
  }
  .priceDetail-base-action {
    font-size: 14px;
    color: #ff3f6c;
    cursor: pointer;
  }
  .priceDetail-base-striked {
    text-decoration: line-through;
  }
  .priceDetail-base-total {
    font-family: "Whitney Semibold";
    font-weight: 500;
    font-size: 15px;
    padding-top: 16px;
    border-top: 1px solid #eaeaec;
    color: #3e4152;
    line-height: 16px;
  }
`;
export const PlaceOrderButton = styled.button`
  width: 100%;
  background-color: #ff3f6c;
  color: #ffffff;
  letter-spacing: 1px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 2px;
  border-width: 0px;
  padding: 10px 16px;
  cursor: pointer;
  text-align: center;
`;

export const SizeOverlayWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 13;
`;

export const StyledClearIcon = styled(ClearIcon)`
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
`;
export const SizeOverlayContainer = styled.div`
  width: 417px;
  top: 50%;
  transform: translateY(-50%);
  padding: 24px;
  border: 1px solid #d4d5d9;
  position: relative;
  overflow: hidden;
  margin: auto;
  background-color: #eaeaec;
  border-radius: 4px;

  .dialogs-base-productRow {
    padding-bottom: 16px;
    border-bottom: 1px solid #eaeaec;
  }

  .dialogs-base-productImage {
    float: left;
  }
  .dialogs-base-productDetails {
    margin-left: 76px;
  }
  .dialogs-base-brandName {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .dialogs-base-productName {
    font-size: 16px;
  }
  .dialogs-base-price {
    margin-top: 16px;
  }

  .inlinePriceComponent-base-price {
    color: #282c3f;
  }
  .original-price {
    font-family: "Whitney Semibold";
    font-size: 500;
  }
  .strick-original-price {
    font-family: "Whitney Light";
    color: #94969f;
    padding: 0 4px;
    text-decoration: line-through;
  }
  .discount-percentage {
    font-family: "Whitney Light";
    color: #f16565;
  }
`;

export const SizeAndQuantityImage = styled.img`
  width: 60px;
  height: 80px;
  background: rgba(244, 255, 249);
`;

// Empty Cart Design

export const EmptyBagWrapper = styled.div`
  min-height: 420px;
  padding-top: 50px;
  .empty-bag-base-container {
    min-height: 450px;
    position: relative;
    background-color: #fff;
  }
  .empty-bag-sub-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    height: 400px;
    text-align: center;
  }

  .emptyCart-base-emptyBagImage {
    margin-bottom: 10px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
  .emptyCart-base-emptyText {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 2px;
  }
  .emptyCart-base-emptyDesc {
    font-size: 14px;
    color: #7e818c;
  }
  .emptyCart-base-addFromWishlist {
    text-align: center;
    margin-top: 25px;
    font-size: 14px;
  }
  .emptyCart-base-addFromWishlist .emptyCart-base-wishlistButton {
    background: #fff;
    color: #ff3f6c;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid #ff3f6c;
    display: inline-block;
    text-align: center;
  }

  .button-base-button {
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    padding: 10px;
    background: #ff3f6c;
    cursor: pointer;
    text-align: center !important;
    border: none;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;
export const EmptyBagContainer = styled.div`
  margin: 24px auto;
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 650px;
  }
`;
