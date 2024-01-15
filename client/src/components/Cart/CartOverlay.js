import React, { useState, useEffect } from "react";

import {
  SizeOverlayWrapper,
  SizeOverlayContainer,
  SizeAndQuantityImage,
  StyledClearIcon,
  Overlay,
  SelectSizeButtonContainer,
  SelectSizeButtonContainer1,
  SizeButton,
  SizeButtonText,
  NoSizeSpan,
  SelectSizeButtonWrapper,
  SubmitSizeButton,
} from "./CartOverlay.styles";
const PreDefinedSize = ["S", "L", "M", "XL", "XXL"];
const SizeComponent = ({
  size,
  activeSizes,
  selectedSize,
  handelSelectSize,
  handelSelectedSize,
}) => {
  if (activeSizes?.includes(size)) {
    return (
      <SelectSizeButtonContainer>
        <SelectSizeButtonContainer1>
          {selectedSize === size ? (
            <SizeButton
              onClick={() => handelSelectedSize(size)}
              selectedSize={selectedSize}
            >
              <SizeButtonText>{size}</SizeButtonText>
            </SizeButton>
          ) : (
            <SizeButton onClick={() => handelSelectedSize(size)}>
              <SizeButtonText>{size}</SizeButtonText>
            </SizeButton>
          )}
        </SelectSizeButtonContainer1>
      </SelectSizeButtonContainer>
    );
  } else {
    return (
      <SelectSizeButtonContainer>
        <SelectSizeButtonContainer1>
          <SizeButton NoSize={true}>
            <SizeButtonText>{size}</SizeButtonText>
            <NoSizeSpan></NoSizeSpan>
          </SizeButton>
        </SelectSizeButtonContainer1>
      </SelectSizeButtonContainer>
    );
  }
};

const CartOverlay = ({
  product,
  handelSetSize,
  isSetSize,
  isSetQty,
  handelUpdateSizeAndQuantity,
}) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const handelSelectedSize = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    setSelectedSize(product?.size);
  }, []);


  return (
    <div>
      <Overlay onClick={() => handelSetSize()} isSetSize={isSetSize}></Overlay>
      <SizeOverlayWrapper isSetSize={isSetSize}>
        <SizeOverlayContainer>
          <StyledClearIcon onClick={() => handelSetSize()} />
          <div>
            <div className="dialogs-base-productRow">
              <div className="dialogs-base-productImage">
                <SizeAndQuantityImage
                  src={product?.productId?.images[0]?.url}
                  alt={product?.productId?.images[0]?.name}
                />
              </div>
              <div className="dialogs-base-productDetails">
                <div>{product?.productId?.brand}</div>
                <div className="dialogs-base-productName">
                  {product?.productId?.description}
                </div>
                <div className="dialogs-base-price">
                  <span className="original-price">
                    {`₹${Math.round(
                      (product?.productId?.price -
                        product?.productId?.price *
                          (product?.productId?.discountPercentage / 100)) *
                        product?.quantity
                    )}`}
                  </span>
                  <span
                    className="
                                strick-original-price"
                  >{`₹${product?.productId?.price}`}</span>
                  <span className="discount-percentage">{`${product?.productId?.discountPercentage}% OFF`}</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px" }}>
            Select Size
          </div>
          {isSetSize ? (
            <SelectSizeButtonWrapper>
              {PreDefinedSize?.map((size, i) => (
                <SizeComponent
                  key={i}
                  size={size}
                  activeSizes={product?.productId?.size}
                  selectedSize={selectedSize}
                  handelSelectSize={handelSetSize}
                  handelSelectedSize={handelSelectedSize}
                />
              ))}
            </SelectSizeButtonWrapper>
          ) : null}
          <SubmitSizeButton
            onClick={() => {
              handelUpdateSizeAndQuantity(
                product?.productId?._id,
                selectedSize,
                product?._id,
                null
              );
              handelSetSize();
            }}
          >
            <div
              style={{
                color: "#FFF",
                fontSize: "16px",
                textTransform: "uppercase",
              }}
            >
              Done
            </div>
          </SubmitSizeButton>
        </SizeOverlayContainer>
      </SizeOverlayWrapper>
    </div>
  );
};

export default CartOverlay;
