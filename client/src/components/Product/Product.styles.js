import styled from "styled-components";

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
  font-family: "Whitney Semibold";
  font-size: 500;
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
  font-family: "Whitney Light", sans-serif;
  color: #535665;
  padding: 5px 20px 14px 0;
  font-size: 20px;
  opacity: 0.8;
  font-weight: 400;
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

export const SizeContainer = styled.div`
  margin: 10px 0 24px;
`;
export const SelectSizeContainer = styled.div`
  margin: 0 0 10px;
  position: relative;
  line-height: 1;
`;
export const SelectSizeHeader = styled.header`
  /* font-family: "Whitney"; */
  text-transform: uppercase;
  display: inline-block;
  font-size: 16px;
  margin: 0;
  font-weight: 500;
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
  font-weight: 500;
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
`;
export const SelectSizeButtonContainer = styled.div`
  margin: 10px 10px 10px 0;
`;
export const SelectSizeButtonContainer1 = styled.div`
  position: relative;
`;
export const SizeButton = styled.button`
  background-color: #fff;
  border: 1px solid #bfc0c6;
  border-radius: 50px;
  padding: 0;
  min-width: 50px;
  height: 50px;
  text-align: center;
  cursor: ${({ NoSize }) => (NoSize ? "default" : "pointer")};
  color: ${({ NoSize }) => (NoSize ? "#bfc0c6" : "#282c3f")};
  flex: 0 0 auto;
  position: relative;
  &:hover {
    border: ${({ NoSize }) =>
      NoSize ? "1px solid #bfc0c6" : "1px solid #ff3e6c"};
  }
`;
export const SizeButtonText = styled.p`
  font-family: "Whitney Semibold";
  margin: 0;
  font-size: 14px;
  padding: 0 8px;
  font-weight: 500;
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
