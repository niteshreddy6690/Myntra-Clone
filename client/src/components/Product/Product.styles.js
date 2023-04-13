import styled, { keyframes, css } from "styled-components";

export const TopDiv = styled.div`
  box-sizing: content-box;
  max-height: 750px;
  margin-top: 10px;
  /* @media (min-width: 980px) {
    margin-top: 50px;
  } */
`;
export const Div = styled.div``;
export const Main = styled.main`
  max-width: 1600px;
  min-width: 1128px;
  margin: 0 auto;
  position: relative;
  min-height: 700px;
  padding-bottom: 15px;
  padding-left: 28px;
  padding-right: 28px;
  /* background-color: green; */

  @media (min-width: 980px) {
    min-height: 910px;
    min-width: 980px;
  }
`;
export const ImageContainer = styled.div`
  float: left;
  width: 58%;
`;
export const ImageContainer1 = styled.div`
  width: 49.5%;
  float: left;
  margin-bottom: 1%;
  position: relative;
  &:nth-child(2n) {
    margin-left: 1%;
  }
`;
export const ImageContainer2 = styled.div`
  height: 0;
  padding-top: 133.33333333333331%;
  overflow: hidden;
  position: relative;
  border: 1px solid #f5f5f6;
  &:hover {
    cursor: crosshair;
    cursor: url(https://constant.myntassets.com/web/assets/img/6d2dbca4-700f-4822-9759-5c92b8280de21536988731120-Zoom-icon-1x.png),
      crosshair;
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
  @media (min-width: 980px) {
    min-height: 820px;
    width: 42%;
    float: left;
    padding: 0 0 0 30px;
    box-sizing: border-box;
  }
  @media (min-width: 600px) {
    margin-top: 0;
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
  font-weight: 500;
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
  width: 90%;
  margin: 30px 10px 0 0;
`;
export const AddToBagButton = styled.button`
  box-sizing: border-box;
  border-radius: 0;
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
  width: 100%;
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
  margin-top: 10px;
  padding: 5px 30px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  min-height: 22px;
  border-radius: 0;
  padding: 12px 15px;
  font-weight: 600;
  cursor: pointer;
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
  }
  .ugc-iconContainer {
    margin: 0 5px;
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
    margin-left: 5px;
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
