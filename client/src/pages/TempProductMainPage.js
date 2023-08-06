import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import axios from "axios";
import Similar from "../components/ViewSimilar/Similar";
import Checkbox from "./Checkbox";
// import Carousel from "nuka-carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { request } from "../api/axios";
import LazyComponent from "../components/LazyComponent";
import LazyImage from "../components/LazyImage";

// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// import required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

const RUl = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* align-items: stretch;
  align-content: stretch; */
  margin: 0 -10px 0 3px;
  column-gap: 2%;
  width: 100%;
  justify-content: flex-start;
  padding: 0px;
  list-style: none;
`;

const RLi = styled.li`
  width: 210px;
  height: 360px;
  position: relative;
  text-align: left;
  vertical-align: top;
  overflow: hidden;
  display: inline-block;
  box-sizing: border-box;
  margin: 0 10px 30px;
  cursor: pointer;

  /* &hover .wishlistContainer {
    display: block;
    height: 50px;
  } */

  &:hover {
    box-shadow: 0 2px 16px 4px rgb(40 44 63 / 7%);
  }
`;
const NavLink = styled(Link)`
  display: block;
  text-decoration: none;
  width: inherit;
  height: inherit;
`;
const ImageSliderContainer = styled.div`
  position: relative;
  width: 250px;
  height: 300px;
  /* background-color: white; */
`;
const ProductSliderContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: block;
`;
const SwiperCarousel = styled(Swiper)`
  width: 210px;
  /* background-color: #ff3f6c; */
  height: 350px;
  /* position: relative; */

  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 15px;
    left: 0;
    width: 210px;
  }
  .swiper-wrapper {
    width: 210px;
    height: 280px;
  }

  .swiper-pagination {
    z-index: 3;
    position: absolute;
    top: 275px;
    height: 30px;
    padding-bottom: 20px;
    left: 0;
    text-align: center;
    background-color: #fff;
    transform: ${({ isHover }) =>
      isHover ? "translateY(-20px)" : "translateY(10px)"};
    transition: transform 0.2s ease-in-out;
  }

  .swiper-pagination-bullet {
    background: #d4d5d9;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background-color: #ff3f6c;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }
`;
const Image = styled.img`
  background-color: #f5f5f5;

  width: 210px;
  height: 280px;
`;

const ViewSimilar = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 5;
  top: 215px;
  right: 14px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #dadade;
  transition: all 0.2s ease-in-out;
  border-radius: 50%;
  text-align: center;
  will-change: contents;
  background-color: #ffffff;
  color: #000;
  font-size: 12px;
  line-height: 28px;

  .myntraweb-sprite {
    background: url(https://constant.myntassets.com/web/assets/img/MyntraWebSprite_27_01_2021.png);
    background-size: 1404px 105px;
    display: inline-block;
  }
  span,
  .first {
    background-size: 6000% 486.36%;
    background-position: 10.4% 71%;
    width: 20px;
    height: 20px;
  }
  .image-grid-similarColorsIcon {
    vertical-align: middle;
    text-align: center;
  }
  .image-grid-iconText {
    font-weight: 500;
    color: #ff517b;
    vertical-align: middle;
    visibility: hidden;
    margin-left: 5px;
    font-size: 14px;
  }
  .second {
    font-size: 12px;
    margin-top: 0 !important;
    margin-left: 5px !important;
  }
  &:hover {
    border-radius: 42px;
    width: 120px;
    text-align: left;
    padding-left: 13px;
    transition: width 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

    .image-grid-iconText {
      font-weight: 700;
      color: #ff517b;
      vertical-align: middle;
      visibility: visible;
      margin-left: 10px;
      font-size: 12px;
    }
  }
`;
const WishlistContainer = styled.div`
  color: black;
  display: block;
  position: absolute;
  z-index: 5;
  left: 0;
  top: 270px;
  background: #fff;
  width: 100%;
  height: 40px;
  padding: 0px 10px;
  box-sizing: border-box;
  cursor: default;
  transition: all 0.2s ease-in-out;
`;
const WishListDivWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 0px;
  margin: 5px 0px 0px 0px;
  font-size: 12px;
  border: 1px solid #d4d5d9;
  border-radius: 2px;
  background: red;
  transition: transform 0.2s ease-in-out;
  color: ${({ isWishlist }) => (isWishlist ? "#FFF" : "#282c3f")};
  background-color: ${({ isWishlist }) =>
    isWishlist ? "rgb(83, 87, 102)" : "#fff"};

  &:hover {
    cursor: pointer;
    border: ${({ isWishlist }) =>
      isWishlist ? "1px solid #d4d5d9" : "1px solid #535766"};
  }
`;
const WishlistSpan = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-family: "Assistant";
  font-weight: 700;
  margin-left: 5px;
  letter-spacing: 0.3px;
  font-size: 12px;
  z-index: 1000;
`;

const RatingContainer = styled.div`
  font-family: "Assistant";
  z-index: 2;
  position: absolute;
  left: 10px;
  top: 255px;
  color: #000;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 2px;
  padding: 0 0 0 4px;
  background-color: hsla(0, 0%, 100%, 0.8);
  /* .user-review-starIcon {
    background-color: #72bfbc;
  } */
  span {
    margin-right: 4px;
  }
  .product-ratingsCount {
    display: flex;
    padding-right: 4px;
  }
  .startIcon {
    margin: 2px 5px 0 0;
  }
  .product-separator {
    font-size: 10px;
    margin: 1px 5px 0 -2px;
  }
`;
const ProductMetaInfo = styled.div`
  position: relative;
  z-index: 5;
  background: #fff;
  padding: 0 10px;
  padding-top: 10px;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

const ProductSizeContainer = styled.h4`
  font-family: Whitney book;
  font-size: 14px;
  color: #535665;
  line-height: 1;
  display: ${({ isHover }) => (isHover ? "block" : "none")};
  margin-top: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0;
  margin-bottom: 5px;
  font-weight: 400;
`;
const ProductHeader3 = styled.h3`
  font-family: Whitney Semibold;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  color: #282c3f;
  margin-top: 0;
  text-transform: capitalize;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: ${({ isHover }) => (isHover ? "0" : "1")};
`;
const ProductHeader4 = styled.h4`
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
  display: ${({ isHover }) => (isHover ? "none" : "block")};
`;

const ProductPriceContainer = styled.div`
  font-family: Whitney;
  font-size: 16px;
  line-height: 15px;
  margin: 10px 0 6px;
  white-space: nowrap;
  font-size: 14px;
  color: #282c3f;
  font-weight: 500;
`;
const ProductDiscountedPrice = styled.span`
  font-size: 14px;
  font-family: Whitney Semibold;
  font-size: 16px;
  color: #282c3f;
  font-weight: 500;
`;
const ProductOriginalPrice = styled.span`
  text-decoration: line-through;
  color: #7e818c;
  font-weight: 400;
  margin-left: 5px;
  font-size: 12px;
`;
const ProductDiscountPercentage = styled.span`
  color: #ff905a;
  font-family: Whitney Light;
  font-weight: 500;
  font-size: 12px;
  margin-left: 5px;
`;

const ProductCarousel = ({ product, open, handelClick, wishlistProducts }) => {
  const [isHover, setHover] = useState(false);
  const [isWishlist, setWishlist] = useState(false);
  const swiperRef = React.useRef([]);
  const onInit = function (Swiper) {
    swiperRef.current = Swiper;
  };

  const handelAddToWishlist = async (id) => {
    const res = await request.post("http://localhost:8080/api/wishlist/", {
      id,
    });
    if (res) setWishlist(true);
  };

  const handleMouseEnter = () => {
    if (wishlistProducts?.includes(product._id)) {
      setWishlist(true);
    }
    if (swiperRef.current) {
      setHover(true);
      swiperRef.current.autoplay.start();
    }
  };
  const handleMouseLeave = () => {
    if (swiperRef.current) {
      setHover(false);
      swiperRef.current.autoplay.stop();
      swiperRef.current.slideTo(1);
    }
  };
  // useEffect(() => {
  //   if (wishlistProducts && wishlistProducts?.includes(product._id)) {
  //     console.log("Product exist in wishlist");
  //     // setWishlist(true);
  //   }
  // });

  useEffect(() => {
    // swiperRef.current.autoplay.stop();
    // console.log(Swiper);
    swiperRef.current.params.autoplay.delay = 2000;
  }, []);

  return (
    <>
      {/* <Similar open={open} handelClick={handelClick} /> */}
      <RLi
        key={product.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NavLink
          target="_blank"
          to={`/${product.gender.toLowerCase()}/${product.brand
            .replaceAll(" ", "-")
            .toLowerCase()}/${product.description
            .replaceAll(" ", "-")
            .toLowerCase()}/${product._id}/buy`}
        >
          <SwiperCarousel
            initialSlide={0}
            speed={400}
            onInit={onInit}
            spaceBetween={0}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            loop={true}
            modules={[Autoplay, Pagination]}
            isHover={isHover}
          >
            <ImageSliderContainer>
              <ProductSliderContainer>
                {product.images.map((image, i) => (
                  <SwiperSlide key={i}>
                    {/* <LazyComponent key={`${image.name}-${i}`}>
                      <Image
                        data-src={`${image.url}&tr=w-250,h-320`}
                        alt={image.name}
                        height="320px"
                        width="250px"
                        loading="lazy"
                        key={`${image.name}-${i}`}
                      />
                    </LazyComponent> */}
                    <LazyImage
                      src={`${image.url}&tr=w-250,h-320`}
                      alt={image?.name}
                      height="320px"
                      width="250px"
                      loading="lazy"
                      key={`${image?.name}-${i}`}
                      placeholderSrc={`${image?.url}&tr=w-50,h-50,bl-20,q-50:w-250,h-320`}
                      blurHashUrl={image?.blurHashUrl}
                    />
                  </SwiperSlide>
                ))}
              </ProductSliderContainer>
            </ImageSliderContainer>

            {product?.productRating > 0 && (
              <RatingContainer>
                <span>{product?.productRating}</span>
                <span className="startIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                  >
                    <path
                      fill="#14958f"
                      fill-rule="evenodd"
                      d="M6 9.644l2.867 1.821c.464.296.743.093.623-.45L8.724 7.56l2.581-2.657c.384-.395.25-.716-.306-.716H7.686L6.374.93c-.206-.513-.542-.512-.748 0L4.314 4.187H1.001c-.553 0-.687.324-.306.716L3.276 7.56l-.766 3.455c-.12.544.165.742.623.45L6 9.645z"
                    ></path>
                  </svg>
                </span>
                {product?.noOfRatings > 0 && (
                  <div class="product-ratingsCount">
                    <div class="product-separator">|</div>
                    {product?.noOfRatings}
                  </div>
                )}
              </RatingContainer>
            )}
            <ProductMetaInfo>
              <ProductHeader3 isHover={isHover}>{product.brand}</ProductHeader3>
              <ProductHeader4 isHover={isHover}>
                {product.description}
              </ProductHeader4>
              <ProductSizeContainer isHover={isHover}>
                Size :
                {product.size?.map((size, index) => (
                  <span key={index} style={{ color: `#535665` }}>
                    {(index ? ", " : "") + ` ${size}`}
                  </span>
                ))}
              </ProductSizeContainer>
              <ProductPriceContainer>
                <span>
                  <ProductDiscountedPrice>
                    {`Rs. ${product.mrp}`}
                  </ProductDiscountedPrice>
                </span>
                {product.discountPercentage > 0 ? (
                  <>
                    <ProductOriginalPrice>{`Rs.${product.price}`}</ProductOriginalPrice>
                    <ProductDiscountPercentage>
                      {`(${product.discountPercentage}%OFF)`}
                    </ProductDiscountPercentage>
                  </>
                ) : null}
              </ProductPriceContainer>
            </ProductMetaInfo>
            {/* </div> */}
          </SwiperCarousel>
        </NavLink>

        {isHover ? (
          <WishlistContainer isHover={isHover} className="wishlistContainer">
            <WishListDivWrapper
              isHover={isHover}
              onClick={() => handelAddToWishlist(product._id)}
              isWishlist={isWishlist}
            >
              {isWishlist ? (
                <FavoriteRoundedIcon
                  style={{
                    fontSize: "20px",
                    color: "red",
                  }}
                />
              ) : (
                <FavoriteIcon
                  style={{
                    fontSize: "20px",
                  }}
                />
              )}
              <WishlistSpan>
                {isWishlist ? `wishlisted` : `wishlist`}
              </WishlistSpan>
            </WishListDivWrapper>
          </WishlistContainer>
        ) : null}
        {
          <ViewSimilar onClick={() => handelClick(open)}>
            <span className="myntraweb-sprite  first image-grid-similarColorsIcon sprites-similarProductsIcon"></span>
            <span className="image-grid-iconText second">VIEW SIMILAR</span>
          </ViewSimilar>
        }
      </RLi>
    </>
  );
};

const TempProductMainPage = ({
  products,
  wishlistProducts,
  handelClick,
  open,
}) => {
  return (
    <div>
      <RUl>
        {products?.map((product, i) => (
          <ProductCarousel
            product={product}
            key={i}
            handelClick={handelClick}
            open={open}
            wishlistProducts={wishlistProducts}
          />
        ))}
        {/* <RLi></RLi>
        <RLi></RLi> */}
      </RUl>
    </div>
  );
};

export default TempProductMainPage;
