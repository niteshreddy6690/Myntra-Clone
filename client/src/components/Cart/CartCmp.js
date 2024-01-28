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
import emptyBag from "../../Assets/Images/empty-bag.webp";
import CartOverlay from "./CartOverlay";
import CartQuantityOverlay from "./CartQuantityOverlay";

const CartCmp = ({
  products,
  prices,
  handelDelete,
  handelUpdateSizeAndQuantity,
  disableSizeModal = false,
}) => {
  const [isSetSize, SetSize] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSetQty, SetQty] = useState(false);

  const handelSetSize = (_product) => {
    //
    setSelectedProduct(_product);
    SetSize(!isSetSize);
  };
  const handelSelectQty = (_product) => {
    //
    setSelectedProduct(_product);
    SetQty(!isSetQty);
  };
  //
  return (
    <>
      {products && products.cart?.items?.length > 0 ? (
        <Wrapper>
          <CartContainer>
            <LeftSection>
              <CartList>
                {products?.cart?.items?.map((product, i) => (
                  <div key={i}>
                    <CartItemContainer>
                      <div className="item-container">
                        <div className="leftItem">
                          <NavLink
                            target="_blank"
                            to={`/${product?.productId?.gender?.toLowerCase()}/${product?.productId?.brand
                              .replaceAll(" ", "-")
                              .toLowerCase()}/${product?.productId?.description
                              .replaceAll(" ", "-")
                              .toLowerCase()}/${product?.productId._id}/buy`}
                          >
                            <Img
                              src={product?.productId?.images[0]?.url}
                              alt={product?.productId?.images[0]?.name}
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
                              {`₹${Math.trunc(
                                product?.productId?.mrp * product?.quantity
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
                                  height: "16px",
                                  width: "16px",
                                  fontSize: "18px",
                                }}
                              />
                            </div>
                            <div
                              className="size-quantity"
                              onClick={() => handelSelectQty(product)}
                            >
                              <span>{`Qty: ${product?.quantity}`}</span>
                              <StyledArrowDropDownIcon
                                style={{
                                  height: "16px",
                                  width: "16px",
                                  fontSize: "18px",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className="clearIcon"
                          onClick={() => handelDelete(product._id)}
                        >
                          <ClearIcon style={{ fontSize: "16px" }} />
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
                  PRICE DETAILS
                  {products.length > 1
                    ? `(${products?.cart?.items.length} items)`
                    : `(${products?.cart?.items.length} item)`}
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
              handelUpdateSizeAndQuantity={handelUpdateSizeAndQuantity}
              // handelSelectSize={handelSelectSize}
            />
          ) : null}

          {isSetQty ? (
            <CartQuantityOverlay
              isSetQty={isSetQty}
              handelSelectQty={handelSelectQty}
              product={selectedProduct}
              handelUpdateSizeAndQuantity={handelUpdateSizeAndQuantity}
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
