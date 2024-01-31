import styled, { keyframes, css } from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";

export const TopDiv = styled.div`
  box-sizing: content-box;
  margin-top: 20px;
`;
export const Div = styled.div``;
export const Main = styled.main`
  /* max-width: 1600px;
  min-width: 1128px; */
  margin: 0 auto;
  position: relative;
  padding-bottom: 15px;
  padding-left: 28px;
  padding-right: 28px;
  display: flex;
  max-width: 1600px;
  @media screen and (max-width: 1024px) {
    display: block;
    width: 100%;
    padding-left: 18px;
    padding-right: 18px;
  }
`;
export const ImageContainer = styled.div`
  width: 58%;
  @media screen and (max-width: 1024px) {
    width: 100%;
    margin: 0 5px;
  }
`;
export const ImageContainer1 = styled.div`
  float: left;
  overflow: hidden;
  margin-bottom: 1%;
  position: relative;
  width: 49%;
  height: 610px;
  min-height: 350px;
  min-width: 200px;
  &:nth-child(2n) {
    margin-left: 1%;
  }
  @media screen and (max-width: 680px) {
    height: 450px;
    width: 49.5%;
  }
  @media screen and (max-width: 530px) {
    width: 100%;
    height: 450px;
    &:nth-child(2n) {
      margin-left: 0%;
    }
  }
`;
export const ImageContainer2 = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  border: 1px solid #f5f5f6;

  &:hover {
    cursor: crosshair;
    cursor: url(https://constant.myntassets.com/web/assets/img/6d2dbca4-700f-4822-9759-5c92b8280de21536988731120-Zoom-icon-1x.png),
      crosshair;
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    top: 0;
    left: 0;
    z-index: 2;
    transition: transform 0.4s;

    &:hover {
      transform: scale(1.04);
    }
    @media screen and (max-width: 565px) {
      object-fit: cover;

      &:hover {
        transform: none;
        cursor: default;
      }
    }
    @media screen and (max-width: 360px) {
      object-fit: fill;
      &:hover {
        transform: none;
        cursor: default;
      }
    }
  }
`;
export const Img = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  transition: transform 0.4s;
  &:hover {
    transform: scale(1.04);
  }
`;
export const DescriptionContainer = styled.div`
  text-align: start;
  font-family: "Whitney";
  font-size: 600;
  padding-left: 30px;
  clear: both;
  @media (max-width: 1200px) {
    min-width: 350px;
    width: 40%;
    padding: 0 0 0 30px;
  }
  @media screen and (max-width: 1024px) {
    position: relative;
    padding-top: 10px;
    width: 100%;
    padding-left: 5px;
    /* padding:0; */
  }
`;
export const TitleAndPriceContainer = styled.div`
  padding: 0 0 10px;
  @media (min-width: 600px) {
    margin-right: 0;
  }
`;

export const OverallRatingContainer = styled.div`
  .index-overallRatingContainer {
    width: auto;
    border-bottom: 1px solid #d4d5d9;
  }
  .index-overallRating {
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    /* height: 20px; */
    padding: 5px;
    border: 1px solid #eaeaec;
    border-radius: 2px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    color: #282c3f;
  }
  .index-overallRating:hover {
    border: 1px solid #535766;
  }

  span {
    margin-left: 5px;
  }
  .index-separator {
    margin-top: -2px;
    color: #d4d5d9;
    width: 1px;
  }
  .index-overallRating .index-ratingsCount {
    font-weight: 400;
    color: #535766;
    width: fit-content;
  }
`;

export const HeaderTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  color: #282c3f;
  padding: 0 20px 0 0;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
`;

export const HeaderName = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  font-family: "Whitney book", sans-serif;
  color: #535665;
  padding: 5px 20px 14px 0;
  font-size: 20px;
  opacity: 0.8;
  font-weight: 500;
`;

export const DiscountedPriceContainer = styled.p`
  color: #696e79;
  font-size: 14px;
  margin-top: 14px;
  margin-bottom: 5px;
  display: inline-block;
`;

export const DiscountedPriceSpan = styled.span`
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  color: #282c3f;
  margin-right: 12px;
`;

export const OriginalPriceSpan = styled.span`
  height: 22px;
  font-family: "Whitney Light", sans-serif;
  opacity: 0.8;
  font-size: 20px;
  line-height: 1.2;
  color: #282c3f;
  margin-right: 12px;
  text-decoration: line-through;
`;

export const PercentageOffSpan = styled.span`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: #ff905a;
`;
export const TaxInfo = styled.p`
  font-size: 16px;
  margin: 0 0 10px;
`;
export const TaxInfoSpan = styled.span`
  color: #03a685;
  font-weight: 500;
  font-size: 14px;
  display: block;
  margin: 5px 10px 0 0;
`;

// Size Section Styles
const Shake = keyframes`
 0% { transform: translateX(0) }
 25% { transform: translateX(10px) }
 50% { transform: translateX(-10px) }
 75% { transform: translateX(10px) }
 100% { transform: translateX(0) }
 `;

export const SizeContainer = styled.div`
  margin: 10px 0 24px;
`;

export const SizeMessage = styled.span`
  font-family: "Whitney";
  color: #f16565;
  font-size: 16px;
  margin-top: 15px;
  display: ${({ isNotSizeSelected }) => (isNotSizeSelected ? "block" : "none")};
`;
export const SelectSizeContainer = styled.div`
  margin: 0 0 15px;
  position: relative;
  line-height: 1;
`;
export const SelectSizeHeader = styled.header`
  /* font-family: "Whitney"; */
  text-transform: uppercase;
  display: inline-block;
  font-size: 16px;
  margin: 0;
  font-weight: 600;
`;

export const SelectSizeSpan = styled.span`
  outline: 0;
  background-color: transparent;
  border: 0;
  letter-spacing: 0.5px;
  text-align: right;
  padding: 0 0 5px;
  color: #ff3e6c;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 0;
  margin-left: 15px;
`;

export const SelectSizeButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  position: relative;
  font-size: 13px;
  box-sizing: border-box;
  animation: ${({ isNotSizeSelected }) =>
    isNotSizeSelected
      ? css`
          ${Shake} .5s 1 ease-in-out;
        `
      : css`none`};
`;

export const SelectSizeButtonContainer = styled.div`
  margin: 10px 10px 10px 0;
`;
export const SelectSizeButtonContainer1 = styled.div`
  position: relative;
`;
export const SizeButton = styled.button`
  background-color: #fff;
  border: ${({ selectedSize }) =>
    selectedSize ? "1px solid #ff3e6c" : "1px solid #bfc0c6"};
  border-radius: 50px;
  padding: 0;
  min-width: 50px;
  height: 50px;
  text-align: center;
  cursor: ${({ NoSize }) => (NoSize ? "default" : "pointer")};
  color: ${({ NoSize, selectedSize }) =>
    NoSize ? "#bfc0c6" : selectedSize ? "#ff3e6c" : "#282c3f"};
  flex: 0 0 auto;
  position: relative;
  &:hover {
    border: ${({ NoSize }) =>
      NoSize ? "1px solid #bfc0c6" : "1px solid #ff3e6c"};
  }
  &:active {
    border: ${({ NoSize }) =>
      NoSize ? "1px solid #bfc0c6" : "1px solid #ff3e6c"};
  }
`;

export const SizeButtonText = styled.p`
  margin: 0;
  font-size: 14px;
  padding: 0 8px;
  font-weight: 600;
`;
export const NoSizeSpan = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #d5d6d9;
  transform: rotate(-45deg);
`;

export const AddAndWhish = styled.div`
  display: flex;
  width: 100%;
  margin: 30px 10px 0 0;
`;
export const AddToBagButton = styled.button`
  border-radius: 5px;
  padding: 12px 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 108px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background-color: #ff3e6c;
  border: 1px solid #ff3e6c;
  color: #fff;
  flex: 3;
  text-align: center;
  /* width: 100%; */
  margin-right: 3%;
  text-transform: uppercase;
  @media (min-width: 980px) {
    text-align: center;
    padding: 15px 0;
  }
  @media (min-width: 980px) {
    margin-top: 0;
    border-radius: 4px;
  }
  @media (min-width: 360px) {
    min-width: 108px;
  }
  @media (min-width: 320px) {
    min-width: 88px;
  }
`;

export const GoToBag = styled(Link)`
  border-radius: 5px;
  padding: 12px 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 108px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background-color: #ff3e6c;
  border: 1px solid #ff3e6c;
  color: #fff;
  flex: 3;
  text-align: center;
  /* width: 100%; */
  margin-right: 3%;
  text-transform: uppercase;
  @media (min-width: 980px) {
    text-align: center;
    padding: 15px 0;
  }
  @media (min-width: 980px) {
    margin-top: 0;
    border-radius: 4px;
  }
  @media (min-width: 360px) {
    min-width: 108px;
  }
  @media (min-width: 320px) {
    min-width: 88px;
  }
`;

export const WishListButton = styled.button`
  border-radius: 3px;
  outline: 0;
  margin: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  min-height: 22px;
  border-radius: 0;
  padding: 15px 15px;
  font-weight: 600;
  width: 300px;
  cursor: pointer;
  border-radius: 4px;
  flex: 2;
  border: 1px solid #d4d5d9;
  background-color: ${({ productInWishlist }) =>
    productInWishlist ? "#535766;" : "#fff"};
  letter-spacing: 0.4px;
  color: ${({ productInWishlist }) => (productInWishlist ? "#FFF" : "#282c3f")};
  text-transform: uppercase;
  @media (min-width: 980px) {
    text-align: center;
    padding: 15px 0;
  }
  /* @media (min-width: 980px) {
    margin-top: 0;
    
  } */
  @media (min-width: 360px) {
    min-width: 108px;
  }
  @media (min-width: 320px) {
    min-width: 88px;
  }
`;

export const ReviewContainer = styled.div`
  margin-bottom: 15px;

  .ugc-iconContainer {
    margin: 0 5px;
  }
  .user-review-main {
    position: relative;
  }

  .user-review-showRating {
    padding-left: 35px;
  }
  .user-review-showRating {
    padding-left: 35px;
  }
  .user-review-main .user-review-starWrapper {
    position: absolute;
    top: 3px;
    left: 0;
  }

  /* .user-review-main
    .user-review-starWrapper
    .user-review-starRating .user-review-fourStars {
    background-color: #14958f;
  } */

  .user-review-main
    .user-review-starWrapper
    .user-review-starRating[data-rating="1"] {
    background-color: #f16565;
  }

  .user-review-main
    .user-review-starWrapper
    .user-review-starRating[data-rating="2"] {
    background-color: #fcb301;
  }

  .user-review-main
    .user-review-starWrapper
    .user-review-starRating[data-rating="4"],
  .user-review-main
    .user-review-starWrapper
    .user-review-starRating[data-rating="3"] {
    background-color: #72bfbc;
  }

  .user-review-main
    .user-review-starWrapper
    .user-review-starRating[data-rating="5"] {
    background-color: #14958f;
  }

  .user-review-main .user-review-starWrapper .user-review-starRating {
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    position: relative;
    height: 14px;
    width: 22px;
    line-height: 14px;
    display: block;
    padding-left: 4px;
    border-radius: 1px;
    box-sizing: border-box;
  }

  .user-review-starIcon {
    position: absolute;
    top: 1px;
    left: 10px;
  }

  .user-review-main .user-review-reviewTextWrapper {
    font-size: 16px;
    color: #282c3f;
    line-height: 20px;
  }
  .user-review-footer {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    color: #565a63;
    font-size: 14px;
    margin-top: 14px;
  }

  .user-review-showRating {
    padding-left: 35px;
  }
  .user-review-footer .user-review-left span:first-child:after {
    content: "|";
    width: 15px;
    display: inline-block;
    text-align: center;
  }
`;
export const UserReviewWrapper = styled.div`
  border-bottom: 1px solid #eaeaec;
  padding: 18px 0;
  margin: 0;
  position: relative;

  .user-review-votes .user-review-thumb {
    display: inline-block;
    margin-left: 30px;
  }
  .user-review-thumb svg {
    display: inline-block;
  }
  .user-review-thumbIcon {
    margin: 0 8px;
    cursor: pointer;
    vertical-align: text-bottom;
  }
  .user-review-thumbsDown {
    position: relative;
    top: -3px;
  }

  .user-review-rotate180 {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
`;

export const DetailedReviewContainer = styled.div`
  font-family: Assistant, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica, Arial, sans-serif;
  margin-top: 40px;
  padding: 20px 0;
  border-bottom: 1px solid #d4d5d9;
  border-top: 1px solid #d4d5d9;

  .review-header {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    width: 100%;
    padding-bottom: 7px;
    color: #282c3f;
    display: inline-block;
  }
  .ugc-iconContainer {
    margin: 0 5px;
    display: inline-block;
  }
  .index-flexRow {
    display: flex;
    flex-direction: row;
  }
  .index-margin22 {
    margin-top: 22px;
  }
  .index-flexColumn {
    display: flex;
    flex-direction: column;
  }
  .index-averageRating {
    font-size: 48px;
    color: #282c3f;
  }
  .index-countDesc {
    margin-top: 12px;
    font-size: 14px;
    font-weight: 400;
    color: #282c3f;
  }
  .index-separator {
    margin-left: 34px;
    height: 96px;
    border-left: 1.2px solid #eaeaec;
  }
  .index-detailedRatingContainer .index-flexRow {
    display: flex;
    flex-direction: row;
  }

  .index-flexRow .index-averageRating .startIcon {
    margin: 22px 0 0 10px;
  }
  .index-rating {
    display: flex;
    font-size: 14px;
    color: #a9abb3;
    width: 30px;
    justify-content: space-around;
    align-items: center;
  }
  .index-ratingBarContainer {
    margin-left: 46px;
    height: 18px;
  }

  .index-ratingBarContainer .index-rating {
    display: flex;
    font-size: 14px;
    color: #a9abb3;
  }
  .index-ratingBarContainer progress {
    border: none;
    margin: auto 0;
    width: 120px;
    height: 4px;
    background: #f5f5f6;
  }
  progress::-webkit-progress-value {
    background: #f5f5f6;
  }

  progress {
    vertical-align: baseline;
  }

  .index-ratingBarContainer progress[data-rating="4"]::-webkit-progress-value,
  .index-ratingBarContainer progress[data-rating="5"]::-webkit-progress-value {
    background: #14958f;
  }
  .index-ratingBarContainer .index-count {
    font-size: 12px;
    color: #282c3f;
    margin-left: 9px;
  }
  .index-ratingBarContainer progress[data-rating="3"]::-webkit-progress-value {
    background: #72bfbc;
  }
  .index-ratingBarContainer progress[data-rating="2"]::-webkit-progress-value {
    background: #fcb301;
  }
  .index-ratingBarContainer progress[data-rating="1"]::-webkit-progress-value {
    background: #f16565;
  }

  /* progress {
    color: lightblue;
  }

  progress::-moz-progress-bar {
    background: lightblue;
  }

  progress::-webkit-progress-value {
    background: #14958f;
  } */

  progress::-webkit-progress-bar {
    background: #f5f5f6;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  background-color: #fff;
  max-width: 1600px;
  margin: 0 auto;
  padding: 10px 20px;

  .similar-heading {
    padding: 5px;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 0;
    color: #282c3f;
    margin: 25px 0 24px;

    @media (min-width: 980px) {
      padding-left: 0;
    }
  }
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
  justify-content: flex-start;
  list-style: none;
  flex-wrap: wrap;

  li:nth-child(odd) {
    margin-right: 5px;
  }

  @media screen and (min-width: 768px) {
    column-gap: 4%;
    margin: 0 -10px 0 0px;

    li:nth-child(odd) {
      margin-right: 0px;
    }
  }
`;

export const Li = styled.li`
  display: block;
  overflow: hidden;
  margin: 0 0 30px;
  width: 48%;

  @media screen and (min-width: 768px) {
    width: 210px;
  }

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
export const IndexCrossLinkContainer = styled.div`
  display: inline-block;
  margin: 35px 0 50px;
  width: 100%;
  text-align: center;
`;

export const MoreProductsNavLink = styled(Link)`
  display: inline-block;
  list-style: none;
  text-decoration: none;
  padding: 15px 25px;
  cursor: pointer;
  color: #ff3e6c;
  font-size: 14px;
  font-weight: 700;
  margin-right: 16px;
  text-transform: uppercase;
  border: 1px solid #7e818c;
  border-radius: 25px;
  &:hover {
    border: 1px solid #ff3e6c;
  }
  .index-arrow {
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-left: 10px;
    border: solid #ff3e6c;
    border-width: 2px 2px 0 0;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    margin-bottom: 1px;
  }
`;
