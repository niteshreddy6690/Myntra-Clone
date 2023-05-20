import React, { useEffect, useState } from "react";
import {
  Wrapper,
  CartContainer,
  LeftSection,
  RightSection,
  CartList,
  CartItemContainer,
  NavLink,
  Img,
  PriceContainer,
  PlaceOrderButton,
  SizeOverlayWrapper,
  SizeOverlayContainer,
  SizeAndQuantityImage,
  StyledClearIcon,
  StyledArrowDropDownIcon,
  EmptyBagWrapper,
  EmptyBagContainer,
} from "./Cart.styles";
// import format from "indian-number-format";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import images1 from "../../Assets/Images/Men/MenD1.jpeg";
import images2 from "../../Assets/Images/Men/MenD2.jpeg";
import images3 from "../../Assets/Images/Men/MenD3.jpeg";
import images4 from "../../Assets/Images/Men/MenD4.jpeg";
import images5 from "../../Assets/Images/Men/MenD5.jpeg";
import images6 from "../../Assets/Images/Men/MenD6.jpeg";
import emptyBag from "../../Assets/Images/empty-bag.webp";

import axios from "axios";
import CartOverlay from "./CartOverlay";

// const products = [
//   {
//     id: "1",
//     brand: "HRX by Hrithik Roshan",
//     Gender: ["men"],
//     Desc: "Rapid Dry Training T-shirt",
//     img: [images2, images1, images3, images4, images5, images6],
//     size: ["S", "L", "M"],
//     OriginalPrice: "1999",
//     discountPercentage: "60",
//     inStock: true,
//   },
//   {
//     id: "1",
//     brand: "HRX by Hrithik Roshan",
//     Gender: ["men"],
//     Desc: "Rapid Dry Training T-shirt",
//     img: [images2, images1, images3, images4, images5, images6],
//     size: ["S", "L", "M"],
//     OriginalPrice: "1999",
//     discountPercentage: "60",
//     inStock: true,
//   },
//   {
//     id: "1",
//     brand: "HRX by Hrithik Roshan",
//     Gender: ["men"],
//     Desc: "Rapid Dry Training T-shirt",
//     img: [images2, images1, images3, images4, images5, images6],
//     size: ["S", "L", "M"],
//     OriginalPrice: "1999",
//     discountPercentage: "60",
//     inStock: true,
//   },
//   {
//     id: "1",
//     brand: "HRX by Hrithik Roshan",
//     Gender: ["men"],
//     Desc: "Rapid Dry Training T-shirt",
//     img: [images2, images1, images3, images4, images5, images6],
//     size: ["S", "L", "M"],
//     OriginalPrice: "1999",
//     discountPercentage: "60",
//     inStock: true,
//   },
//   {
//     id: "1",
//     brand: "HRX by Hrithik Roshan",
//     Gender: ["men"],
//     Desc: "Rapid Dry Training T-shirt",
//     img: [images2, images1, images3, images4, images5, images6],
//     size: ["S", "L", "M"],
//     OriginalPrice: "1999",
//     discountPercentage: "60",
//     inStock: true,
//   },
// ];
const CartCmp = ({
  products,
  prices,
  handelDelete,
  handelUpdateSizeAndQuantity,
  disableSizeModal = false,
}) => {
  // console.log(products);
  const [isSetSize, SetSize] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSetQty, SetQty] = useState(false);
  // useEffect(() => {
  //   SetSize(!disableSizeModal);
  // }, [disableSizeModal, isSetSize]);

  const handelSetSize = (_product) => {
    setSelectedProduct(_product);
    SetSize(!isSetSize);
  };

  const handelSelectQty = (_product) => {
    setSelectedProduct(_product);
    isSetQty(!isSetQty);
  };

  console.log("Products.. in cartcmp", products);
  return (
    <>
      {products && products.cart?.items.length > 0 ? (
        <Wrapper>
          <CartContainer>
            <LeftSection>
              <CartList>
                {products?.cart?.items?.map((product, i) => (
                  <div key={i}>
                    <CartItemContainer>
                      <div className="item-container">
                        <div className="leftItem">
                          <NavLink to={"/"}>
                            <Img
                              src={product?.productId?.images[0]}
                              alt={product?.productId?.brand}
                            />
                          </NavLink>
                        </div>
                        <div className="rightItem">
                          <div className="productInfo">
                            <div className="productBrand">
                              {product?.productId?.brand}
                            </div>
                            <div className="productDescription">
                              {product?.productId?.description}
                            </div>
                          </div>
                          <div className="productPrice">
                            <span className="discountedPrice">
                              {`₹${Math.round(
                                (product?.productId?.price -
                                  product?.productId?.price *
                                    (product?.productId?.discountPercentage /
                                      100)) *
                                  product?.quantity
                              )}`}
                            </span>
                            <span className="originalPrice">{`₹${
                              product?.productId?.price * product?.quantity
                            }`}</span>
                            <span className="percentageOff">{`${product?.productId?.discountPercentage}% OFF`}</span>
                          </div>
                          <div>
                            <div
                              className="size-quantity"
                              onClick={() => handelSetSize(product)}
                            >
                              <span>{`Size: ${product?.size}`}</span>
                              <StyledArrowDropDownIcon
                                style={{
                                  height: "14px",
                                  width: "14px",
                                  fontSize: "16px",
                                }}
                              />
                            </div>
                            <div
                              className="size-quantity"
                              onClick={() => handelSelectQty()}
                            >
                              <span>{`Qty: ${product?.quantity}`}</span>
                              <StyledArrowDropDownIcon
                                style={{
                                  height: "14px",
                                  width: "14px",
                                  fontSize: "16px",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className="clearIcon"
                          onClick={() => handelDelete(product._id)}
                        >
                          <ClearIcon />
                        </div>
                      </div>
                    </CartItemContainer>
                  </div>
                ))}
              </CartList>
            </LeftSection>
            <RightSection>
              <PriceContainer>
                <div className="priceBlock-base-priceHeader">
                  PRICE DETAILS{" "}
                  {products.length > 1
                    ? `(${products.length} items)`
                    : `(${products.length} item)`}
                </div>
                <div className="priceBreakUp-base-orderSummary">
                  <div className="priceDetail-base-row">
                    <span>Total MRP </span>
                    <span className="priceDetail-base-value">{`₹${prices.actualTotal}`}</span>
                  </div>
                  <div className="priceDetail-base-row">
                    <span>Discount on MRP</span>
                    <span className="priceDetail-base-value priceDetail-base-discount">{`-₹${prices.discountedMRP}`}</span>
                  </div>
                  <div className="priceDetail-base-row">
                    <span>Coupon Discount</span>
                    <span className="priceDetail-base-value priceDetail-base-action">
                      Apply Coupon
                    </span>
                  </div>
                  <div className="priceDetail-base-row">
                    <span>Convenience Fee</span>
                    <span className="priceDetail-base-value">
                      <span className="priceDetail-base-striked">₹99</span>
                      <span className="priceDetail-base-discount">FREE</span>
                    </span>
                  </div>
                  <div className="priceDetail-base-total">
                    <span>Total Amount</span>
                    <span className="priceDetail-base-value ">
                      {`₹${prices.totalMRP}`}
                    </span>
                  </div>
                </div>
              </PriceContainer>
              <div>
                <NavLink to={"/checkout/payment"} style={{ color: "white" }}>
                  <PlaceOrderButton>PLACE ORDER</PlaceOrderButton>
                </NavLink>
              </div>
            </RightSection>
          </CartContainer>

          {selectedProduct ? (
            <CartOverlay
              handelSetSize={handelSetSize}
              product={selectedProduct}
              isSetSize={isSetSize}
              isSetQty={isSetQty}
              handelUpdateSizeAndQuantity={handelUpdateSizeAndQuantity}
              // handelSelectSize={handelSelectSize}
            />
          ) : null}
        </Wrapper>
      ) : (
        <>
          <EmptyBagWrapper>
            <EmptyBagContainer>
              <div className="empty-bag-base-container">
                <div className="empty-bag-sub-container">
                  <div className="emptyCart-base-emptyBagImage">
                    <img
                      src={emptyBag}
                      style={{
                        background: "none",
                        height: "165px",
                        width: "146px",
                      }}
                    />
                  </div>
                  <div className="emptyCart-base-emptyText">
                    Hey, it feels so light!
                  </div>
                  <div className="emptyCart-base-emptyDesc">
                    There is nothing in your bag. Let's add some items.
                  </div>
                  <div className="emptyCart-base-addFromWishlist">
                    <NavLink
                      to={"/wishlist"}
                      className="button-base-button emptyCart-base-wishlistButton"
                    >
                      ADD ITEMS FROM WISHLIST
                    </NavLink>
                  </div>
                </div>
              </div>
            </EmptyBagContainer>
          </EmptyBagWrapper>
        </>
      )}
    </>
  );
};
export default CartCmp;
