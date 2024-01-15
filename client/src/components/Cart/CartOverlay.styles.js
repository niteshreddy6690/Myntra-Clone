import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${({ isSetSize }) => (isSetSize ? "block" : "none")};
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export const SizeOverlayWrapper = styled.div`
  z-index: 13;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  display: ${({ isSetSize }) => (isSetSize ? "block" : "none")};
`;

export const StyledClearIcon = styled(ClearIcon)`
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
`;
export const SizeOverlayContainer = styled.div`
  width: 417px;
  padding: 24px;
  border: 1px solid #d4d5d9;
  position: relative;
  overflow: hidden;
  margin: auto;
  background-color: #fff;
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

export const SubmitSizeButton = styled.div`
  width: 100%;
  height: 40px;
  background-color: #ff3e6c;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
  font-weight: 700;
`;
